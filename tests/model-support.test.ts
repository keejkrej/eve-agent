import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { oauthErrorHtml, oauthSuccessHtml } from "../src/models/oauth/oauth-page.js";
import { getCredential, setCredential } from "../src/models/auth-store.ts";
import { resolveCustomModel, withAuthorizedFetch } from "../src/models/providers.ts";

async function isolatedHome(): Promise<void> {
  process.env.EVE_AGENT_HOME = await mkdtemp(path.join(os.tmpdir(), "eve-agent-model-"));
}

test("resolves OAuth and Ollama selections to AI SDK v4 models", async () => {
  await isolatedHome();
  await setCredential("chatgpt", { type: "oauth", access: "chat-token", refresh: "refresh", expires: Date.now() + 600_000, accountId: "acct-1" });
  await setCredential("xai", { type: "oauth", access: "xai-token", refresh: "refresh", expires: Date.now() + 600_000 });
  await setCredential("ollama-cloud", { type: "api_key", key: "ollama-key" });

  const cases = [
    ["chatgpt/gpt-5.6-sol", "openai.responses", "gpt-5.6-sol"],
    ["xai/grok-code-fast-1", "xai.chat", "grok-code-fast-1"],
    ["ollama-cloud/gpt-oss:120b", "ollama-cloud.chat", "gpt-oss:120b"],
  ] as const;
  for (const [reference, provider, modelId] of cases) {
    const selection = await resolveCustomModel(reference);
    assert.ok(selection && typeof selection === "object");
    assert.equal(selection.model.specificationVersion, "v4");
    assert.equal(selection.model.provider, provider);
    assert.equal(selection.model.modelId, modelId);
    assert.ok(selection.modelContextWindowTokens);
  }
  const fast = await resolveCustomModel("chatgpt/gpt-5.6-sol", { priority: true });
  assert.ok(fast && typeof fast === "object");
  assert.equal((fast.modelOptions as any).providerOptions.openai.serviceTier, "priority");
  assert.equal((fast.modelOptions as any).providerOptions.gateway.serviceTier, "priority");
  assert.equal(await resolveCustomModel("gateway"), null);
  assert.equal(await resolveCustomModel("anthropic/claude-opus-4.8"), "anthropic/claude-opus-4.8");
});

test("ChatGPT transport injects OAuth identity and required Codex body fields", async () => {
  await isolatedHome();
  await setCredential("chatgpt", { type: "oauth", access: "secret-access", refresh: "refresh", expires: Date.now() + 600_000, accountId: "acct-42" });
  const originalFetch = globalThis.fetch;
  let captured: { input?: string; init?: RequestInit } = {};
  globalThis.fetch = async (input, init) => {
    captured = { input: String(input), init };
    return new Response("ok", { status: 200 });
  };
  try {
    const response = await withAuthorizedFetch("chatgpt")("https://chatgpt.com/backend-api/codex/responses", {
      method: "POST",
      headers: { "content-type": "application/json", "x-existing": "yes" },
      body: JSON.stringify({
        model: "gpt-5.6-sol",
        stream: true,
        previous_response_id: "resp_unpersisted",
        input: [
          { role: "developer", content: "You are a coding agent." },
          { role: "user", content: [{ type: "input_text", text: "Hello" }] },
          { id: "msg_unpersisted", role: "assistant", content: [{ type: "output_text", text: "Hi" }] },
          { id: "rs_unpersisted", type: "reasoning", encrypted_content: "encrypted", summary: [] },
        ],
      }),
    });
    assert.equal(response.status, 200);
    const headers = new Headers(captured.init?.headers);
    assert.equal(headers.get("authorization"), "Bearer secret-access");
    assert.equal(headers.get("chatgpt-account-id"), "acct-42");
    assert.equal(headers.get("x-existing"), "yes");
    const body = JSON.parse(String(captured.init?.body));
    assert.equal(body.store, false);
    assert.equal(body.previous_response_id, undefined);
    assert.deepEqual(body.include, ["reasoning.encrypted_content"]);
    assert.equal(body.instructions, "You are a coding agent.");
    assert.deepEqual(body.input, [
      { role: "user", content: [{ type: "input_text", text: "Hello" }] },
      { role: "assistant", content: [{ type: "output_text", text: "Hi" }] },
      { type: "reasoning", encrypted_content: "encrypted", summary: [] },
    ]);
  } finally { globalThis.fetch = originalFetch; }
});

test("xAI transport refreshes once and retries a 401", async () => {
  await isolatedHome();
  await setCredential("xai", { type: "oauth", access: "old-access", refresh: "old-refresh", expires: Date.now() + 600_000 });
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; authorization: string | null }> = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    const authorization = new Headers(init?.headers).get("authorization");
    calls.push({ url, authorization });
    if (url.includes("auth.x.ai/oauth2/token")) {
      return Response.json({ access_token: "new-access", refresh_token: "new-refresh", expires_in: 3600 });
    }
    if (authorization === "Bearer old-access") return new Response("expired", { status: 401 });
    return Response.json({ ok: true });
  };
  try {
    const response = await withAuthorizedFetch("xai")("https://api.x.ai/v1/chat/completions", { method: "POST", body: "{}" });
    assert.equal(response.status, 200);
    assert.deepEqual(calls.map((call) => call.authorization), ["Bearer old-access", null, "Bearer new-access"]);
    const stored = await getCredential("xai");
    assert.equal(stored?.type === "oauth" ? stored.access : undefined, "new-access");
  } finally { globalThis.fetch = originalFetch; }
});


test("ChatGPT transport refreshes OAuth and updates the account identity after a 401", async () => {
  await isolatedHome();
  await setCredential("chatgpt", {
    type: "oauth",
    access: "old-access",
    refresh: "old-refresh",
    expires: Date.now() + 600_000,
    accountId: "old-account",
  });
  const jwtPayload = Buffer.from(JSON.stringify({
    "https://api.openai.com/auth": { chatgpt_account_id: "new-account" },
  })).toString("base64url");
  const refreshedJwt = `header.${jwtPayload}.signature`;
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; authorization: string | null; account: string | null }> = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    const headers = new Headers(init?.headers);
    calls.push({ url, authorization: headers.get("authorization"), account: headers.get("chatgpt-account-id") });
    if (url.includes("auth.openai.com/oauth/token")) {
      return Response.json({ access_token: refreshedJwt, refresh_token: "new-refresh", expires_in: 3600 });
    }
    if (headers.get("authorization") === "Bearer old-access") return new Response("expired", { status: 401 });
    return new Response("ok", { status: 200 });
  };
  try {
    const response = await withAuthorizedFetch("chatgpt")("https://chatgpt.com/backend-api/codex/responses", {
      method: "POST",
      body: JSON.stringify({ input: [] }),
    });
    assert.equal(response.status, 200);
    assert.equal(calls.length, 3);
    assert.deepEqual(calls[2], {
      url: "https://chatgpt.com/backend-api/codex/responses",
      authorization: `Bearer ${refreshedJwt}`,
      account: "new-account",
    });
  } finally { globalThis.fetch = originalFetch; }
});


test("OAuth loopback pages use only Eve Agent branding", () => {
  const pages = [oauthSuccessHtml("Done"), oauthErrorHtml("Failed", "details")];
  for (const page of pages) {
    assert.match(page, /Eve Agent/);
    assert.doesNotMatch(page, /Prime|butterfly|earendil/i);
  }
});

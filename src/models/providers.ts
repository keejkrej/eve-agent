import { createOpenAI } from "@ai-sdk/openai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { LanguageModel } from "ai";
import { getAccessToken, getApiKey, refreshAfterUnauthorized } from "./auth-store.js";

export const DEFAULT_MODELS = {
  chatgpt: "gpt-5.6-sol",
  xai: "grok-code-fast-1",
  "ollama-cloud": "gpt-oss:120b",
} as const;

export type ModelSelection = {
  model: LanguageModel;
  modelContextWindowTokens?: number;
  modelOptions?: Record<string, unknown>;
};

function parseSelection(value: string): { provider: string; modelId: string } | null {
  const slash = value.indexOf("/");
  if (slash <= 0 || slash === value.length - 1) return null;
  return { provider: value.slice(0, slash), modelId: value.slice(slash + 1) };
}

export function withAuthorizedFetch(provider: "chatgpt" | "xai"): typeof fetch {
  return async (input, init) => {
    const credentials = await getAccessToken(provider);
    const prepare = (access: string, accountIdValue?: unknown): RequestInit => {
      const requestHeaders = input instanceof Request ? input.headers : undefined;
      const headers = new Headers(init?.headers ?? requestHeaders);
      headers.set("authorization", `Bearer ${access}`);
      let nextInit = { ...init, headers };
      if (provider === "chatgpt") {
        const accountId = typeof accountIdValue === "string" ? accountIdValue : undefined;
        if (!accountId) throw new Error("ChatGPT OAuth credential is missing its account ID; log in again");
        headers.set("chatgpt-account-id", accountId);
        headers.set("originator", "pi");
        headers.set("openai-beta", "responses=experimental");
        headers.set("accept", "text/event-stream");
        if (typeof init?.body === "string") {
          const body = JSON.parse(init.body) as Record<string, unknown>;
          body.store = false;
          delete body.previous_response_id;
          body.include = Array.from(new Set([...(Array.isArray(body.include) ? body.include : []), "reasoning.encrypted_content"]));
          if (Array.isArray(body.input)) {
            body.input = body.input.map((item) => {
              if (typeof item !== "object" || item === null || Array.isArray(item) || !("id" in item)) return item;
              const { id: _unpersistedItemId, ...inlineItem } = item as Record<string, unknown>;
              return inlineItem;
            });
          }
          // ChatGPT's Codex endpoint expects the system prompt in `instructions`,
          // unlike the public Responses API which also accepts system/developer input items.
          if (Array.isArray(body.input)) {
            const instructionItems = body.input.filter((item) => {
              const role = typeof item === "object" && item !== null ? (item as { role?: unknown }).role : undefined;
              return role === "system" || role === "developer";
            }) as Array<{ content?: unknown }>;
            const instructionText = instructionItems.flatMap((item) => {
              if (typeof item.content === "string") return [item.content];
              if (!Array.isArray(item.content)) return [];
              return item.content.flatMap((part) =>
                typeof part === "object" && part !== null && typeof (part as { text?: unknown }).text === "string"
                  ? [(part as { text: string }).text]
                  : [],
              );
            });
            if (instructionText.length > 0 && typeof body.instructions !== "string") {
              body.instructions = instructionText.join("\n\n");
            }
            body.input = body.input.filter((item) => {
              const role = typeof item === "object" && item !== null ? (item as { role?: unknown }).role : undefined;
              return role !== "system" && role !== "developer";
            });
          }
          nextInit = { ...nextInit, body: JSON.stringify(body) };
        }
      }
      return nextInit;
    };

    let response = await fetch(input, prepare(credentials.access, credentials.accountId));
    if (response.status === 401) {
      const refreshed = await refreshAfterUnauthorized(provider, credentials.access);
      response = await fetch(input, prepare(refreshed.access, refreshed.accountId));
    }
    return response;
  };
}

export async function resolveCustomModel(
  value: string | undefined,
  settings: { priority?: boolean } = {},
): Promise<ModelSelection | string | null> {
  if (!value || value === "gateway") return null;
  const parsed = parseSelection(value);
  if (!parsed) throw new Error(`Invalid model reference ${value}; expected provider/model-id`);

  if (parsed.provider === "chatgpt" || parsed.provider === "openai-codex") {
    const provider = createOpenAI({
      baseURL: "https://chatgpt.com/backend-api/codex",
      apiKey: "oauth-managed-by-eve-agent",
      fetch: withAuthorizedFetch("chatgpt"),
    });
    return {
      model: provider.responses(parsed.modelId),
      modelContextWindowTokens: 400_000,
      modelOptions: {
        providerOptions: {
          openai: {
            store: false,
            include: ["reasoning.encrypted_content"],
            reasoningSummary: "auto",
            serviceTier: settings.priority ? "priority" : "default",
          },
          ...(settings.priority ? { gateway: { serviceTier: "priority" } } : {}),
        },
      },
    };
  }

  if (parsed.provider === "xai") {
    const provider = createOpenAICompatible({
      name: "xai",
      baseURL: "https://api.x.ai/v1",
      apiKey: "oauth-managed-by-eve-agent",
      fetch: withAuthorizedFetch("xai"),
    });
    return { model: provider.chatModel(parsed.modelId), modelContextWindowTokens: 256_000 };
  }

  if (parsed.provider === "ollama-cloud") {
    const provider = createOpenAICompatible({
      name: "ollama-cloud",
      baseURL: "https://ollama.com/v1",
      apiKey: await getApiKey("ollama-cloud"),
    });
    return { model: provider.chatModel(parsed.modelId), modelContextWindowTokens: 131_072 };
  }

  // Any other provider/model reference remains a Vercel AI Gateway model id.
  return value;
}

import { chmod, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { refreshOpenAICodexToken } from "./oauth/openai-codex.js";
import { refreshXaiToken } from "./oauth/xai.js";
import type { OAuthCredentials } from "./oauth/types.js";

export type AuthProvider = "chatgpt" | "xai" | "ollama-cloud";
export type StoredCredential =
  | ({ type: "oauth" } & OAuthCredentials)
  | { type: "api_key"; key: string };

type AuthFile = { version: 1; providers: Partial<Record<AuthProvider, StoredCredential>> };
export type ReasoningLevel = "provider-default" | "none" | "minimal" | "low" | "medium" | "high" | "xhigh";
export type ConfigFile = { version: 1; model?: string; reasoning?: ReasoningLevel; priority?: boolean };

function homeDirectory(): string {
  return process.env.EVE_AGENT_HOME?.trim() || path.join(os.homedir(), ".config", "eve-agent");
}
export function authFilePath(): string { return path.join(homeDirectory(), "auth.json"); }
export function configFilePath(): string { return path.join(homeDirectory(), "config.json"); }

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try { return JSON.parse(await readFile(file, "utf8")) as T; }
  catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw new Error(`Cannot read ${file}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function writePrivateJson(file: string, value: unknown): Promise<void> {
  const directory = path.dirname(file);
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await chmod(directory, 0o700).catch(() => undefined);
  const temporary = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, file);
  await chmod(file, 0o600).catch(() => undefined);
}

export async function readAuth(): Promise<AuthFile> {
  return readJson(authFilePath(), { version: 1, providers: {} });
}
export async function setCredential(provider: AuthProvider, credential: StoredCredential | undefined): Promise<void> {
  const auth = await readAuth();
  if (credential) auth.providers[provider] = credential;
  else delete auth.providers[provider];
  await writePrivateJson(authFilePath(), auth);
}
export async function getCredential(provider: AuthProvider): Promise<StoredCredential | undefined> {
  return (await readAuth()).providers[provider];
}
export async function readConfig(): Promise<ConfigFile> {
  return readJson(configFilePath(), { version: 1 });
}
export async function writeConfig(config: ConfigFile): Promise<void> {
  await writePrivateJson(configFilePath(), { ...config, version: 1 });
}
export async function setSelectedModel(model: string | undefined): Promise<void> {
  const config = await readConfig();
  if (model) config.model = model;
  else delete config.model;
  await writeConfig(config);
}

const refreshes = new Map<AuthProvider, Promise<OAuthCredentials>>();
async function refreshCredential(provider: "chatgpt" | "xai", credential: OAuthCredentials): Promise<OAuthCredentials> {
  const existing = refreshes.get(provider);
  if (existing) return existing;
  const refresh = (async () => {
    const updated = provider === "chatgpt"
      ? await refreshOpenAICodexToken(credential.refresh)
      : await refreshXaiToken(credential);
    await setCredential(provider, { type: "oauth", ...updated });
    return updated;
  })().finally(() => refreshes.delete(provider));
  refreshes.set(provider, refresh);
  return refresh;
}

export async function getAccessToken(provider: "chatgpt" | "xai"): Promise<OAuthCredentials> {
  const credential = await getCredential(provider);
  if (!credential || credential.type !== "oauth") {
    throw new Error(`Not logged in to ${provider}. Run: eve-agent login ${provider}`);
  }
  if (Date.now() < credential.expires - 60_000) return credential;
  return refreshCredential(provider, credential);
}

export async function refreshAfterUnauthorized(
  provider: "chatgpt" | "xai",
  rejectedAccessToken: string,
): Promise<OAuthCredentials> {
  const credential = await getCredential(provider);
  if (!credential || credential.type !== "oauth") {
    throw new Error(`Not logged in to ${provider}. Run: eve-agent login ${provider}`);
  }
  // Another concurrent request may already have rotated the token.
  if (credential.access !== rejectedAccessToken && Date.now() < credential.expires - 60_000) return credential;
  return refreshCredential(provider, credential);
}

export async function getApiKey(provider: "ollama-cloud"): Promise<string> {
  const envKey = process.env.OLLAMA_API_KEY?.trim();
  if (envKey) return envKey;
  const credential = await getCredential(provider);
  if (!credential || credential.type !== "api_key" || !credential.key) {
    throw new Error("Ollama Cloud is not configured. Run: eve-agent login ollama-cloud");
  }
  return credential.key;
}

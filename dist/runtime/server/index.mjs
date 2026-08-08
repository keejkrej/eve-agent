globalThis.__nitro_main__ = import.meta.url;
import { fileURLToPath as __eveFileURLToPath } from "node:url";
import { dirname as __eveDirname } from "node:path";
const __filename = __eveFileURLToPath(import.meta.url);
__eveDirname(__filename);
import { n as __exportAll } from "./_runtime.mjs";
import { a as NodeResponse, i as toEventHandler, n as HTTPError, o as serve, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { B as Br, G as installEveWorkflowQueueNamespace, H as defineInstructions, J as defineDynamic, K as dispatchChannelRequest, L as sandboxShutdownPlugin, Q as yr, R as validateWorkflowWorld, Sl as handleHomePageRequest, U as defineHook, W as defineAgent, X as qa, Y as defineTool, Z as vr, _l as eveChannel, bl as vercelOidc, q as health_default$2, vl as localDev, xl as installBundledCompiledArtifacts, yl as placeholderAuth, z as resolveLocalWorkflowWorldDataDirectory } from "./_libs/eve+zod.mjs";
import { It as number, Lt as object, kt as boolean, zt as string } from "./_libs/@ai-sdk/gateway+[...].mjs";
import { t as createOpenAI } from "./_libs/ai-sdk__openai+zod.mjs";
import { t as createOpenAICompatible } from "./_libs/ai-sdk__openai-compatible.mjs";
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";
import { constants as constants$1, promises } from "node:fs";
import path, { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { access, chmod, lstat, mkdir, readFile, readdir, realpath, rename, stat, writeFile } from "node:fs/promises";
import { execFile, spawn } from "node:child_process";
import os from "node:os";
//#region #eve-route/
var _eve_route_default = async (event) => handleHomePageRequest({ "agentName": "eve-agent" }, event.req);
//#endregion
//#region #eve-route-handler/GET /eve/v1/health
var health_default$1 = health_default$2;
//#endregion
//#region #eve-route-handler/HEAD /eve/v1/health
var health_default = health_default$2;
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/connections/:name/callback/:token
const config$10 = { "kind": "production" };
var _token_default$2 = (event) => dispatchChannelRequest(event, "GET /eve/v1/connections/:name/callback/:token", config$10);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/connections/:name/callback/:token
const config$9 = { "kind": "production" };
var _token_default$1 = (event) => dispatchChannelRequest(event, "POST /eve/v1/connections/:name/callback/:token", config$9);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/callback/:token
const config$8 = { "kind": "production" };
var _token_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/callback/:token", config$8);
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/info
const config$7 = { "kind": "production" };
var info_default = (event) => dispatchChannelRequest(event, "GET /eve/v1/info", config$7);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session
const config$6 = { "kind": "production" };
var session_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session", config$6);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/reset
const config$5 = { "kind": "production" };
var reset_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/reset", config$5);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/clear
const config$4 = { "kind": "production" };
var clear_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/clear", config$4);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/compact
const config$3 = { "kind": "production" };
var compact_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/compact", config$3);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/:sessionId
const config$2 = { "kind": "production" };
var _sessionId_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/:sessionId", config$2);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/:sessionId/cancel
const config$1 = { "kind": "production" };
var cancel_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/:sessionId/cancel", config$1);
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/session/:sessionId/stream
const config = { "kind": "production" };
var stream_default = (event) => dispatchChannelRequest(event, "GET /eve/v1/session/:sessionId/stream", config);
//#endregion
//#region agent/lib/active-settings.generated.ts
const activeSettings = {
	"model": "ollama-cloud/deepseek-v4-flash:0731",
	"reasoning": "high",
	"priority": false
};
process.env.EVE_AGENT_OAUTH_CALLBACK_HOST;
const CLIENT_ID$1 = "app_EMoamEEZ73f0CkXaXp7hrann";
const TOKEN_URL$1 = "https://auth.openai.com/oauth/token";
const JWT_CLAIM_PATH = "https://api.openai.com/auth";
function decodeJwt(token) {
	try {
		const parts = token.split(".");
		if (parts.length !== 3) return null;
		const payload = parts[1] ?? "";
		const decoded = Buffer.from(payload, "base64url").toString("utf8");
		return JSON.parse(decoded);
	} catch {
		return null;
	}
}
async function refreshAccessToken(refreshToken) {
	try {
		const response = await fetch(TOKEN_URL$1, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: refreshToken,
				client_id: CLIENT_ID$1
			})
		});
		if (!response.ok) {
			const text = await response.text().catch(() => "");
			return {
				type: "failed",
				status: response.status,
				message: `OpenAI Codex token refresh failed (${response.status}): ${text || response.statusText}`
			};
		}
		const json = await response.json();
		if (!json.access_token || !json.refresh_token || typeof json.expires_in !== "number") return {
			type: "failed",
			message: `OpenAI Codex token refresh response missing fields: ${JSON.stringify(json)}`
		};
		return {
			type: "success",
			access: json.access_token,
			refresh: json.refresh_token,
			expires: Date.now() + json.expires_in * 1e3
		};
	} catch (error) {
		return {
			type: "failed",
			message: `OpenAI Codex token refresh error: ${error instanceof Error ? error.message : String(error)}`
		};
	}
}
function getAccountId(accessToken) {
	const accountId = (decodeJwt(accessToken)?.[JWT_CLAIM_PATH])?.chatgpt_account_id;
	return typeof accountId === "string" && accountId.length > 0 ? accountId : null;
}
/**
* Refresh OpenAI Codex OAuth token
*/
async function refreshOpenAICodexToken(refreshToken) {
	const result = await refreshAccessToken(refreshToken);
	if (result.type !== "success") throw new Error(result.message);
	const accountId = getAccountId(result.access);
	if (!accountId) throw new Error("Failed to extract accountId from token");
	return {
		access: result.access,
		refresh: result.refresh,
		expires: result.expires,
		accountId
	};
}
//#endregion
//#region src/models/oauth/xai.ts
const CLIENT_ID = "b1a00492-073a-47ea-816f-4c329264a828";
const TOKEN_URL = "https://auth.x.ai/oauth2/token";
const REFRESH_SKEW_MS = 3e5;
function authHeaders() {
	return {
		Accept: "application/json",
		"Content-Type": "application/x-www-form-urlencoded",
		"User-Agent": "eve-agent"
	};
}
function positiveSecondsToMs(value, fallbackMs) {
	const seconds = Number(value);
	return Number.isFinite(seconds) && seconds > 0 ? seconds * 1e3 : fallbackMs;
}
async function readError(response) {
	const body = await response.text().catch(() => "");
	return body ? `: ${body}` : "";
}
async function refreshXaiToken(credentials, options = {}) {
	const response = await fetch(options.tokenUrl ?? TOKEN_URL, {
		method: "POST",
		headers: authHeaders(),
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: credentials.refresh,
			client_id: CLIENT_ID
		})
	});
	if (!response.ok) throw new Error(`xAI token refresh failed (${response.status})${await readError(response)}`);
	const token = await response.json();
	if (!token.access_token) throw new Error("xAI token refresh response is missing access_token");
	return {
		access: token.access_token,
		refresh: token.refresh_token ?? credentials.refresh,
		expires: Date.now() + positiveSecondsToMs(token.expires_in, 36e5) - REFRESH_SKEW_MS
	};
}
//#endregion
//#region src/models/auth-store.ts
function homeDirectory() {
	return process.env.EVE_AGENT_HOME?.trim() || path.join(os.homedir(), ".config", "eve-agent");
}
function authFilePath() {
	return path.join(homeDirectory(), "auth.json");
}
async function readJson(file, fallback) {
	try {
		return JSON.parse(await readFile(file, "utf8"));
	} catch (error) {
		if (error.code === "ENOENT") return fallback;
		throw new Error(`Cannot read ${file}: ${error instanceof Error ? error.message : String(error)}`);
	}
}
async function writePrivateJson(file, value) {
	const directory = path.dirname(file);
	await mkdir(directory, {
		recursive: true,
		mode: 448
	});
	await chmod(directory, 448).catch(() => void 0);
	const temporary = `${file}.${randomUUID()}.tmp`;
	await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 384 });
	await rename(temporary, file);
	await chmod(file, 384).catch(() => void 0);
}
async function readAuth() {
	return readJson(authFilePath(), {
		version: 1,
		providers: {}
	});
}
async function setCredential(provider, credential) {
	const auth = await readAuth();
	if (credential) auth.providers[provider] = credential;
	else delete auth.providers[provider];
	await writePrivateJson(authFilePath(), auth);
}
async function getCredential(provider) {
	return (await readAuth()).providers[provider];
}
const refreshes = /* @__PURE__ */ new Map();
async function refreshCredential(provider, credential) {
	const existing = refreshes.get(provider);
	if (existing) return existing;
	const refresh = (async () => {
		const updated = provider === "chatgpt" ? await refreshOpenAICodexToken(credential.refresh) : await refreshXaiToken(credential);
		await setCredential(provider, {
			type: "oauth",
			...updated
		});
		return updated;
	})().finally(() => refreshes.delete(provider));
	refreshes.set(provider, refresh);
	return refresh;
}
async function getAccessToken(provider) {
	const credential = await getCredential(provider);
	if (!credential || credential.type !== "oauth") throw new Error(`Not logged in to ${provider}. Run: eve-agent login ${provider}`);
	if (Date.now() < credential.expires - 6e4) return credential;
	return refreshCredential(provider, credential);
}
async function refreshAfterUnauthorized(provider, rejectedAccessToken) {
	const credential = await getCredential(provider);
	if (!credential || credential.type !== "oauth") throw new Error(`Not logged in to ${provider}. Run: eve-agent login ${provider}`);
	if (credential.access !== rejectedAccessToken && Date.now() < credential.expires - 6e4) return credential;
	return refreshCredential(provider, credential);
}
async function getApiKey(provider) {
	const envKey = process.env.OLLAMA_API_KEY?.trim();
	if (envKey) return envKey;
	const credential = await getCredential(provider);
	if (!credential || credential.type !== "api_key" || !credential.key) throw new Error("Ollama Cloud is not configured. Run: eve-agent login ollama-cloud");
	return credential.key;
}
//#endregion
//#region src/models/providers.ts
function parseSelection(value) {
	const slash = value.indexOf("/");
	if (slash <= 0 || slash === value.length - 1) return null;
	return {
		provider: value.slice(0, slash),
		modelId: value.slice(slash + 1)
	};
}
function withAuthorizedFetch(provider) {
	return async (input, init) => {
		const credentials = await getAccessToken(provider);
		const prepare = (access, accountIdValue) => {
			const requestHeaders = input instanceof Request ? input.headers : void 0;
			const headers = new Headers(init?.headers ?? requestHeaders);
			headers.set("authorization", `Bearer ${access}`);
			let nextInit = {
				...init,
				headers
			};
			if (provider === "chatgpt") {
				const accountId = typeof accountIdValue === "string" ? accountIdValue : void 0;
				if (!accountId) throw new Error("ChatGPT OAuth credential is missing its account ID; log in again");
				headers.set("chatgpt-account-id", accountId);
				headers.set("originator", "pi");
				headers.set("openai-beta", "responses=experimental");
				headers.set("accept", "text/event-stream");
				if (typeof init?.body === "string") {
					const body = JSON.parse(init.body);
					body.store = false;
					delete body.previous_response_id;
					body.include = Array.from(/* @__PURE__ */ new Set([...Array.isArray(body.include) ? body.include : [], "reasoning.encrypted_content"]));
					if (Array.isArray(body.input)) body.input = body.input.map((item) => {
						if (typeof item !== "object" || item === null || Array.isArray(item) || !("id" in item)) return item;
						const { id: _unpersistedItemId, ...inlineItem } = item;
						return inlineItem;
					});
					if (Array.isArray(body.input)) {
						const instructionText = body.input.filter((item) => {
							const role = typeof item === "object" && item !== null ? item.role : void 0;
							return role === "system" || role === "developer";
						}).flatMap((item) => {
							if (typeof item.content === "string") return [item.content];
							if (!Array.isArray(item.content)) return [];
							return item.content.flatMap((part) => typeof part === "object" && part !== null && typeof part.text === "string" ? [part.text] : []);
						});
						if (instructionText.length > 0 && typeof body.instructions !== "string") body.instructions = instructionText.join("\n\n");
						body.input = body.input.filter((item) => {
							const role = typeof item === "object" && item !== null ? item.role : void 0;
							return role !== "system" && role !== "developer";
						});
					}
					nextInit = {
						...nextInit,
						body: JSON.stringify(body)
					};
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
async function resolveCustomModel(value, settings = {}) {
	if (!value || value === "gateway") return null;
	const parsed = parseSelection(value);
	if (!parsed) throw new Error(`Invalid model reference ${value}; expected provider/model-id`);
	if (parsed.provider === "chatgpt" || parsed.provider === "openai-codex") return {
		model: createOpenAI({
			baseURL: "https://chatgpt.com/backend-api/codex",
			apiKey: "oauth-managed-by-eve-agent",
			fetch: withAuthorizedFetch("chatgpt")
		}).responses(parsed.modelId),
		modelContextWindowTokens: 4e5,
		modelOptions: { providerOptions: {
			openai: {
				store: false,
				include: ["reasoning.encrypted_content"],
				reasoningSummary: "auto",
				serviceTier: settings.priority ? "priority" : "default"
			},
			...settings.priority ? { gateway: { serviceTier: "priority" } } : {}
		} }
	};
	if (parsed.provider === "xai") return {
		model: createOpenAICompatible({
			name: "xai",
			baseURL: "https://api.x.ai/v1",
			apiKey: "oauth-managed-by-eve-agent",
			fetch: withAuthorizedFetch("xai")
		}).chatModel(parsed.modelId),
		modelContextWindowTokens: 256e3
	};
	if (parsed.provider === "ollama-cloud") return {
		model: createOpenAICompatible({
			name: "ollama-cloud",
			baseURL: "https://ollama.com/v1",
			apiKey: await getApiKey("ollama-cloud")
		}).chatModel(parsed.modelId),
		modelContextWindowTokens: 131072
	};
	return value;
}
//#endregion
//#region agent/agent.ts
var agent_exports = /* @__PURE__ */ __exportAll({ default: () => agent_default });
const reasoningLevels = [
	"provider-default",
	"none",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh"
];
function isReasoningLevel(value) {
	return reasoningLevels.some((level) => level === value);
}
const reasoningOverride = process.env.EVE_AGENT_REASONING_OVERRIDE;
const reasoning = isReasoningLevel(reasoningOverride) ? reasoningOverride : activeSettings.reasoning;
const priority = process.env.EVE_AGENT_PRIORITY_OVERRIDE === void 0 ? activeSettings.priority : process.env.EVE_AGENT_PRIORITY_OVERRIDE === "true";
const configured = await resolveCustomModel(process.env.EVE_AGENT_MODEL_OVERRIDE ?? activeSettings.model, { priority });
const model = configured && typeof configured === "object" ? configured.model : configured ?? "anthropic/claude-sonnet-5";
const modelContextWindowTokens = configured && typeof configured === "object" ? configured.modelContextWindowTokens : void 0;
const modelOptions = configured && typeof configured === "object" ? configured.modelOptions : void 0;
var agent_default = defineAgent({
	model,
	modelContextWindowTokens,
	modelOptions,
	reasoning,
	compaction: { thresholdPercent: .75 }
});
//#endregion
//#region agent/channels/eve.ts
var eve_exports = /* @__PURE__ */ __exportAll({ default: () => eve_default });
var eve_default = eveChannel({ auth: [
	vercelOidc(),
	localDev(),
	placeholderAuth()
] });
async function workspaceRoot() {
	const configured = process.env.CODING_WORKSPACE?.trim();
	const candidate = path.resolve(configured || process.cwd());
	await access(candidate, constants$1.R_OK | constants$1.W_OK);
	if (!(await lstat(candidate)).isDirectory()) throw new Error(`CODING_WORKSPACE is not a directory: ${candidate}`);
	return realpath(candidate);
}
async function resolveWorkspacePath(inputPath) {
	const root = await workspaceRoot();
	const lexical = path.resolve(root, inputPath || ".");
	const lexicalRelative = path.relative(root, lexical);
	if (lexicalRelative.startsWith("..") || path.isAbsolute(lexicalRelative)) throw new Error(`Path escapes the coding workspace: ${inputPath}`);
	let ancestor = lexical;
	const missing = [];
	while (true) try {
		await lstat(ancestor);
		break;
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
		const parent = path.dirname(ancestor);
		if (parent === ancestor) throw error;
		missing.unshift(path.basename(ancestor));
		ancestor = parent;
	}
	const canonicalAncestor = await realpath(ancestor);
	const canonical = path.join(canonicalAncestor, ...missing);
	const canonicalRelative = path.relative(root, canonical);
	if (canonicalRelative.startsWith("..") || path.isAbsolute(canonicalRelative)) throw new Error(`Path resolves through a symlink outside the coding workspace: ${inputPath}`);
	return canonical;
}
function relativeToWorkspace(root, filePath) {
	const relative = path.relative(root, filePath);
	return relative.length === 0 ? "." : relative;
}
function truncateOutput(value, limit = 6e4) {
	if (value.length <= limit) return value;
	const headSize = Math.floor(limit * .35);
	const tailSize = limit - headSize;
	const omitted = value.length - headSize - tailSize;
	return `${value.slice(0, headSize)}\n\n… ${omitted} characters omitted …\n\n${value.slice(-tailSize)}`;
}
//#endregion
//#region agent/lib/plugins.ts
const EXTENSIONS = /* @__PURE__ */ new Set([
	".js",
	".mjs",
	".cjs",
	".ts",
	".mts",
	".cts"
]);
let cache;
function validNamespace(value) {
	return /^[a-z][a-z0-9_-]*$/i.test(value);
}
function namespaceFromName(value) {
	return (value.split("/").at(-1) || "plugin").replace(/(?:^eve-agent-|^eve-|\-eve-agent$|\-plugin$)/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-");
}
async function candidateFromEntry(entry) {
	const info = await stat(entry);
	if (info.isFile()) {
		const extension = path.extname(entry);
		if (!EXTENSIONS.has(extension) || entry.endsWith(".d.ts")) return;
		return {
			source: entry,
			namespace: namespaceFromName(path.basename(entry, extension))
		};
	}
	if (!info.isDirectory()) return;
	let manifest = {};
	try {
		manifest = JSON.parse(await readFile(path.join(entry, "package.json"), "utf8"));
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
	const declared = manifest.eveAgent?.plugin;
	const candidates = typeof declared === "string" ? [declared] : [
		"index.mjs",
		"index.js",
		"index.ts"
	];
	for (const relative of candidates) {
		const source = path.resolve(entry, relative);
		try {
			if ((await stat(source)).isFile()) {
				const requested = manifest.eveAgent?.namespace;
				return {
					source,
					namespace: typeof requested === "string" ? requested : namespaceFromName(typeof manifest.name === "string" ? manifest.name : path.basename(entry))
				};
			}
		} catch (error) {
			if (error.code !== "ENOENT") throw error;
		}
	}
}
async function pluginRoots() {
	const home = process.env.EVE_AGENT_HOME?.trim() || path.join(os.homedir(), ".config", "eve-agent");
	const workspace = await workspaceRoot();
	return [
		...(process.env.EVE_AGENT_PLUGIN_PATHS ?? "").split(path.delimiter).map((value) => value.trim()).filter(Boolean).map((value) => path.resolve(value)),
		path.join(workspace, ".eve-agent", "plugins"),
		path.join(home, "plugins")
	];
}
async function discoverCandidates() {
	const candidates = [];
	for (const root of await pluginRoots()) {
		let entries;
		try {
			entries = await readdir(root, { withFileTypes: true });
		} catch (error) {
			if (error.code === "ENOENT") continue;
			console.warn(`[eve-agent] Cannot scan plugin directory ${root}:`, error);
			continue;
		}
		for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
			if (entry.name.startsWith(".")) continue;
			try {
				const candidate = await candidateFromEntry(path.join(root, entry.name));
				if (candidate) candidates.push(candidate);
			} catch (error) {
				console.warn(`[eve-agent] Cannot inspect plugin ${path.join(root, entry.name)}:`, error);
			}
		}
	}
	return candidates;
}
async function loadPlugin(candidate) {
	if (!validNamespace(candidate.namespace)) throw new Error(`Invalid plugin namespace: ${candidate.namespace}`);
	const imported = await import(pathToFileURL(candidate.source).href);
	const factory = imported.default ?? imported.plugin;
	if (typeof factory !== "function") throw new Error("Plugin must default-export a registration function");
	const plugin = {
		namespace: candidate.namespace,
		source: candidate.source,
		tools: /* @__PURE__ */ new Map(),
		instructions: [],
		hooks: /* @__PURE__ */ new Map()
	};
	await factory({
		namespace: candidate.namespace,
		registerTool(name, definition) {
			if (!validNamespace(name)) throw new Error(`Invalid tool name: ${name}`);
			if (plugin.tools.has(name)) throw new Error(`Tool already registered: ${name}`);
			plugin.tools.set(name, defineTool(definition));
		},
		addInstructions(instructions) {
			if (typeof instructions !== "string" && typeof instructions !== "function") throw new Error("Instructions must be text or a resolver function");
			plugin.instructions.push(instructions);
		},
		on(event, handler) {
			if (!event || typeof handler !== "function") throw new Error("Plugin hooks require an event name and handler");
			const handlers = plugin.hooks.get(event) ?? [];
			handlers.push(handler);
			plugin.hooks.set(event, handlers);
		}
	});
	return plugin;
}
async function loadPlugins() {
	if (!cache) cache = (async () => {
		const loaded = [];
		const namespaces = /* @__PURE__ */ new Set();
		for (const candidate of await discoverCandidates()) {
			if (namespaces.has(candidate.namespace)) {
				console.warn(`[eve-agent] Skipping duplicate plugin namespace ${candidate.namespace}: ${candidate.source}`);
				continue;
			}
			try {
				const plugin = await loadPlugin(candidate);
				namespaces.add(plugin.namespace);
				loaded.push(plugin);
			} catch (error) {
				console.warn(`[eve-agent] Failed to load plugin ${candidate.source}:`, error);
			}
		}
		return loaded;
	})();
	return cache;
}
async function executePluginTool(namespace, name, input, context) {
	const tool = (await loadPlugins()).find((candidate) => candidate.namespace === namespace)?.tools.get(name);
	if (!tool) throw new Error(`Plugin tool is unavailable: ${namespace}__${name}`);
	return tool.execute(input, context);
}
async function resolvePluginTools() {
	const tools = {};
	for (const plugin of await loadPlugins()) for (const [name, definition] of plugin.tools) {
		const namespace = plugin.namespace;
		const toolName = name;
		tools[`${namespace}__${toolName}`] = defineTool({
			...definition,
			execute: async (input, context) => executePluginTool(namespace, toolName, input, context)
		});
	}
	return tools;
}
async function resolvePluginInstructions(event, context) {
	const sections = [];
	for (const plugin of await loadPlugins()) for (const contribution of plugin.instructions) try {
		const markdown = typeof contribution === "string" ? contribution : await contribution(event, context);
		if (markdown?.trim()) sections.push(`# ${plugin.namespace} plugin

${markdown.trim()}`);
	} catch (error) {
		console.warn(`[eve-agent] Plugin ${plugin.namespace} instructions failed:`, error);
	}
	return sections.join("\n\n");
}
async function dispatchPluginHooks(event, context) {
	const type = typeof event.type === "string" ? event.type : "";
	for (const plugin of await loadPlugins()) for (const handler of [...plugin.hooks.get(type) ?? [], ...plugin.hooks.get("*") ?? []]) try {
		await handler(event, context);
	} catch (error) {
		console.warn(`[eve-agent] Plugin ${plugin.namespace} hook ${type || "(unknown)"} failed:`, error);
	}
}
//#endregion
//#region agent/hooks/plugins.ts
var plugins_exports$2 = /* @__PURE__ */ __exportAll({ default: () => plugins_default$2 });
var plugins_default$2 = defineHook({ events: { "*": (event, context) => dispatchPluginHooks(event, context) } });
//#endregion
//#region agent/instructions/plugins.ts
var plugins_exports$1 = /* @__PURE__ */ __exportAll({ default: () => plugins_default$1 });
async function resolve$1(event, context) {
	const markdown = await resolvePluginInstructions(event, context);
	return markdown ? defineInstructions({ markdown }) : null;
}
var plugins_default$1 = defineDynamic({ events: {
	"session.started": resolve$1,
	"turn.started": resolve$1
} });
//#endregion
//#region agent/tools/bash.ts
var bash_exports = /* @__PURE__ */ __exportAll({ default: () => bash_default });
var bash_default = defineTool({
	description: "Run a shell command directly in the active host coding workspace. Use for Git, tests, builds, package managers, and repository inspection. Commands have the user's host permissions.",
	approval: ({ toolInput }) => {
		const command = typeof toolInput?.command === "string" ? toolInput.command : "";
		return /(?:^|[;&|]\s*)(?:sudo\b|rm\s+-[^\n]*r[^\n]*f|git\s+(?:push\b|clean\b|reset\s+--hard\b)|npm\s+publish\b|pnpm\s+publish\b|yarn\s+npm\s+publish\b|vercel\s+(?:deploy|--prod)\b|(?:curl|wget)[^\n|]*\|\s*(?:sh|bash|zsh)\b)/i.test(command) ? "user-approval" : "not-applicable";
	},
	inputSchema: object({
		command: string().min(1).describe("Shell command to execute with zsh -lc"),
		timeoutSeconds: number().int().min(1).max(3600).default(120)
	}),
	async execute({ command, timeoutSeconds }, ctx) {
		const cwd = await workspaceRoot();
		return await new Promise((resolve) => {
			const child = spawn("/bin/zsh", ["-lc", command], {
				cwd,
				env: process.env,
				detached: process.platform !== "win32",
				stdio: [
					"ignore",
					"pipe",
					"pipe"
				]
			});
			let stdout = "";
			let stderr = "";
			let timedOut = false;
			const append = (current, chunk) => truncateOutput(current + chunk.toString(), 2e6);
			child.stdout.on("data", (chunk) => {
				stdout = append(stdout, chunk);
			});
			child.stderr.on("data", (chunk) => {
				stderr = append(stderr, chunk);
			});
			const stop = () => {
				if (child.pid === void 0) return;
				try {
					if (process.platform === "win32") child.kill("SIGTERM");
					else process.kill(-child.pid, "SIGTERM");
				} catch {
					child.kill("SIGTERM");
				}
			};
			const timer = setTimeout(() => {
				timedOut = true;
				stop();
			}, timeoutSeconds * 1e3);
			ctx.abortSignal.addEventListener("abort", stop, { once: true });
			child.on("error", (error) => {
				clearTimeout(timer);
				resolve({
					ok: false,
					exitCode: null,
					error: error.message,
					stdout: truncateOutput(stdout),
					stderr: truncateOutput(stderr)
				});
			});
			child.on("close", (code, signal) => {
				clearTimeout(timer);
				resolve({
					ok: code === 0 && !timedOut,
					exitCode: code,
					signal,
					timedOut,
					cwd,
					stdout: truncateOutput(stdout),
					stderr: truncateOutput(stderr)
				});
			});
		});
	}
});
//#endregion
//#region agent/tools/edit_file.ts
var edit_file_exports = /* @__PURE__ */ __exportAll({ default: () => edit_file_default });
var edit_file_default = defineTool({
	description: "Make a precise edit in a host workspace file by replacing one exact, unique string. Prefer this over rewriting a whole existing file.",
	inputSchema: object({
		path: string().min(1),
		oldText: string().min(1).describe("Exact text expected to occur once"),
		newText: string().describe("Replacement text")
	}),
	async execute({ path: inputPath, oldText, newText }) {
		const root = await workspaceRoot();
		const absolute = await resolveWorkspacePath(inputPath);
		const content = await readFile(absolute, "utf8");
		const first = content.indexOf(oldText);
		if (first < 0) throw new Error("oldText was not found; re-read the file and use an exact match");
		if (content.indexOf(oldText, first + oldText.length) >= 0) throw new Error("oldText occurs more than once; include more surrounding context");
		const updated = content.slice(0, first) + newText + content.slice(first + oldText.length);
		const temporary = `${absolute}.eve-${randomUUID()}.tmp`;
		await writeFile(temporary, updated, "utf8");
		await rename(temporary, absolute);
		return {
			ok: true,
			path: relativeToWorkspace(root, absolute),
			replacements: 1
		};
	}
});
//#endregion
//#region agent/tools/glob.ts
var glob_exports = /* @__PURE__ */ __exportAll({ default: () => glob_default });
const execFileAsync$2 = promisify(execFile);
var glob_default = defineTool({
	description: "List files in the active host coding workspace matching a glob. Respects ignore files when ripgrep is available.",
	inputSchema: object({ pattern: string().min(1).default("**/*") }),
	async execute({ pattern }) {
		const cwd = await workspaceRoot();
		try {
			const { stdout } = await execFileAsync$2("rg", [
				"--files",
				"-g",
				pattern
			], {
				cwd,
				maxBuffer: 5e6
			});
			return {
				pattern,
				files: truncateOutput(stdout)
			};
		} catch (error) {
			const candidate = error;
			if (candidate.code === 1) return {
				pattern,
				files: ""
			};
			throw new Error(candidate.message ?? String(error));
		}
	}
});
//#endregion
//#region agent/tools/grep.ts
var grep_exports = /* @__PURE__ */ __exportAll({ default: () => grep_default });
const execFileAsync$1 = promisify(execFile);
var grep_default = defineTool({
	description: "Search host workspace file contents with ripgrep and return file names, line numbers, and matching lines.",
	inputSchema: object({
		pattern: string().min(1).describe("Regular expression"),
		path: string().default("."),
		glob: string().optional(),
		ignoreCase: boolean().default(false)
	}),
	async execute({ pattern, path, glob, ignoreCase }) {
		const cwd = await workspaceRoot();
		const args = [
			"--line-number",
			"--no-heading",
			"--color",
			"never"
		];
		if (ignoreCase) args.push("--ignore-case");
		if (glob) args.push("-g", glob);
		args.push("--", pattern, path);
		try {
			const { stdout } = await execFileAsync$1("rg", args, {
				cwd,
				maxBuffer: 5e6
			});
			return { matches: truncateOutput(stdout) };
		} catch (error) {
			const candidate = error;
			if (candidate.code === 1) return { matches: "" };
			throw new Error(candidate.message ?? String(error));
		}
	}
});
//#endregion
//#region agent/tools/plugins.ts
var plugins_exports = /* @__PURE__ */ __exportAll({ default: () => plugins_default });
var plugins_default = defineDynamic({ events: { "session.started": () => resolvePluginTools() } });
//#endregion
//#region agent/tools/read_file.ts
var read_file_exports = /* @__PURE__ */ __exportAll({ default: () => read_file_default });
var read_file_default = defineTool({
	description: "Read a UTF-8 file from the active host coding workspace with line numbers. Paths are relative to the workspace root.",
	inputSchema: object({
		path: string().min(1),
		startLine: number().int().min(1).default(1),
		endLine: number().int().min(1).optional()
	}),
	async execute({ path, startLine, endLine }) {
		const root = await workspaceRoot();
		const absolute = await resolveWorkspacePath(path);
		const allLines = (await readFile(absolute, "utf8")).split("\n");
		const last = Math.min(endLine ?? startLine + 499, allLines.length);
		const selected = allLines.slice(startLine - 1, last).map((line, index) => `${startLine + index}\t${line}`).join("\n");
		return {
			path: relativeToWorkspace(root, absolute),
			range: `${startLine}-${last}`,
			totalLines: allLines.length,
			content: truncateOutput(selected),
			truncatedByLines: last < allLines.length
		};
	}
});
//#endregion
//#region agent/tools/workspace_info.ts
var workspace_info_exports = /* @__PURE__ */ __exportAll({ default: () => workspace_info_default });
const execFileAsync = promisify(execFile);
var workspace_info_default = defineTool({
	description: "Inspect the active host coding workspace. Call this at the start of a task to learn the repository root, Git state, and top-level files.",
	inputSchema: object({}),
	async execute() {
		const root = await workspaceRoot();
		const run = async (args) => {
			try {
				const { stdout, stderr } = await execFileAsync("git", args, {
					cwd: root,
					maxBuffer: 2e6
				});
				return `${stdout}${stderr}`.trim();
			} catch (error) {
				return error instanceof Error ? error.message : String(error);
			}
		};
		const { stdout: files = "" } = await execFileAsync("/bin/zsh", ["-lc", "find . -maxdepth 2 -not -path './.git*' -not -path './node_modules*' | sort | head -200"], {
			cwd: root,
			maxBuffer: 2e6
		});
		return {
			root,
			branch: await run(["branch", "--show-current"]),
			status: await run([
				"status",
				"--short",
				"--branch"
			]),
			files: files.trim()
		};
	}
});
//#endregion
//#region agent/tools/write_file.ts
var write_file_exports = /* @__PURE__ */ __exportAll({ default: () => write_file_default });
var write_file_default = defineTool({
	description: "Atomically create or replace a UTF-8 file in the active host coding workspace. Read existing files first and preserve unrelated content.",
	inputSchema: object({
		path: string().min(1),
		content: string()
	}),
	async execute({ path: inputPath, content }) {
		const root = await workspaceRoot();
		const absolute = await resolveWorkspacePath(inputPath);
		await mkdir(path.dirname(absolute), { recursive: true });
		const temporary = `${absolute}.eve-${randomUUID()}.tmp`;
		await writeFile(temporary, content, "utf8");
		await rename(temporary, absolute);
		return {
			ok: true,
			path: relativeToWorkspace(root, absolute),
			bytes: Buffer.byteLength(content)
		};
	}
});
//#endregion
//#region .eve/builds/msk8aana-799c7610-a124-49d3-adaf-b7cd4daaf652/host/compiled-artifacts-bootstrap.mjs
installEveWorkflowQueueNamespace("eve-agent");
const moduleMap = Object.freeze({ "nodes": Object.freeze({ "__root__": Object.freeze({ "modules": Object.freeze({
	"agent.ts": agent_exports,
	"channels/eve.ts": eve_exports,
	"hooks/plugins.ts": plugins_exports$2,
	"instructions/plugins.ts": plugins_exports$1,
	"tools/bash.ts": bash_exports,
	"tools/edit_file.ts": edit_file_exports,
	"tools/glob.ts": glob_exports,
	"tools/grep.ts": grep_exports,
	"tools/plugins.ts": plugins_exports,
	"tools/read_file.ts": read_file_exports,
	"tools/workspace_info.ts": workspace_info_exports,
	"tools/write_file.ts": write_file_exports
}) }) }) });
const metadata = {
	"compile": { "moduleMap": {
		"path": ".output/.eve/compile/module-map.mjs",
		"sha256": "7bfa995ad75600d05e66fd93af018c9b145452bdd348ea4af40f0279ccb11375"
	} },
	"discovery": {
		"diagnostics": {
			"path": ".output/.eve/discovery/diagnostics.json",
			"sha256": "b26fc8e66ee943f962b1bab4a790f6a611ce7e6738aa29f83ea53b73cc362c63"
		},
		"manifest": {
			"path": ".output/.eve/discovery/agent-discovery-manifest.json",
			"sha256": "3bf00a1a43c04b7047c1e8648c05916cc9ef77bb07315cd62d9fdfc8cb296171"
		},
		"sourceGraphHash": "eae246d7fcafdb957640ac4435789d6bea67648271aec1362f517b5a1ceadcaa",
		"summary": {
			"errors": 0,
			"warnings": 0
		}
	},
	"generator": {
		"name": "eve",
		"version": "0.30.8"
	},
	"kind": "eve-compile-metadata",
	"status": "ready",
	"version": 5
};
const manifest = {
	"agentRoot": "/Users/jack/workspace/eve-agent/agent",
	"appRoot": "/Users/jack/workspace/eve-agent",
	"channels": [
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "GET",
			"urlPath": "/eve/v1/info",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session/reset",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session/clear",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session/compact",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session/:sessionId",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session/:sessionId/cancel",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "GET",
			"urlPath": "/eve/v1/session/:sessionId/stream",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		}
	],
	"connections": [],
	"config": {
		"compaction": { "thresholdPercent": .75 },
		"model": {
			"id": "ollama-cloud/deepseek-v4-flash:0731",
			"routing": {
				"kind": "external",
				"provider": "ollama-cloud"
			},
			"contextWindowTokens": 131072,
			"source": {
				"sourceKind": "module",
				"logicalPath": "agent.ts",
				"sourceId": "agent.ts"
			}
		},
		"name": "eve-agent",
		"reasoning": "high",
		"source": {
			"sourceKind": "module",
			"logicalPath": "agent.ts",
			"sourceId": "agent.ts"
		}
	},
	"diagnosticsSummary": {
		"errors": 0,
		"warnings": 0
	},
	"disabledFrameworkTools": [],
	"dynamicInstructions": [{
		"eventNames": ["session.started", "turn.started"],
		"logicalPath": "instructions/plugins.ts",
		"slug": "plugins",
		"sourceId": "instructions/plugins.ts",
		"sourceKind": "module"
	}],
	"dynamicSkills": [],
	"dynamicTools": [{
		"eventNames": ["session.started"],
		"logicalPath": "tools/plugins.ts",
		"slug": "plugins",
		"sourceId": "tools/plugins.ts",
		"sourceKind": "module"
	}],
	"extensionMounts": [],
	"hooks": [{
		"logicalPath": "hooks/plugins.ts",
		"slug": "plugins",
		"sourceId": "hooks/plugins.ts",
		"sourceKind": "module"
	}],
	"remoteAgents": [],
	"sandbox": null,
	"sandboxWorkspaces": [],
	"schedules": [],
	"skills": [],
	"tools": [
		{
			"description": "Run a shell command directly in the active host coding workspace. Use for Git, tests, builds, package managers, and repository inspection. Commands have the user's host permissions.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"command": {
						"type": "string",
						"minLength": 1,
						"description": "Shell command to execute with zsh -lc"
					},
					"timeoutSeconds": {
						"default": 120,
						"type": "integer",
						"minimum": 1,
						"maximum": 3600
					}
				},
				"required": ["command"]
			},
			"logicalPath": "tools/bash.ts",
			"name": "bash",
			"sourceId": "tools/bash.ts",
			"sourceKind": "module"
		},
		{
			"description": "Make a precise edit in a host workspace file by replacing one exact, unique string. Prefer this over rewriting a whole existing file.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"path": {
						"type": "string",
						"minLength": 1
					},
					"oldText": {
						"type": "string",
						"minLength": 1,
						"description": "Exact text expected to occur once"
					},
					"newText": {
						"type": "string",
						"description": "Replacement text"
					}
				},
				"required": [
					"path",
					"oldText",
					"newText"
				]
			},
			"logicalPath": "tools/edit_file.ts",
			"name": "edit_file",
			"sourceId": "tools/edit_file.ts",
			"sourceKind": "module"
		},
		{
			"description": "List files in the active host coding workspace matching a glob. Respects ignore files when ripgrep is available.",
			"inputSchema": {
				"type": "object",
				"properties": { "pattern": {
					"default": "**/*",
					"type": "string",
					"minLength": 1
				} }
			},
			"logicalPath": "tools/glob.ts",
			"name": "glob",
			"sourceId": "tools/glob.ts",
			"sourceKind": "module"
		},
		{
			"description": "Search host workspace file contents with ripgrep and return file names, line numbers, and matching lines.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"pattern": {
						"type": "string",
						"minLength": 1,
						"description": "Regular expression"
					},
					"path": {
						"default": ".",
						"type": "string"
					},
					"glob": { "type": "string" },
					"ignoreCase": {
						"default": false,
						"type": "boolean"
					}
				},
				"required": ["pattern"]
			},
			"logicalPath": "tools/grep.ts",
			"name": "grep",
			"sourceId": "tools/grep.ts",
			"sourceKind": "module"
		},
		{
			"description": "Read a UTF-8 file from the active host coding workspace with line numbers. Paths are relative to the workspace root.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"path": {
						"type": "string",
						"minLength": 1
					},
					"startLine": {
						"default": 1,
						"type": "integer",
						"minimum": 1,
						"maximum": 9007199254740991
					},
					"endLine": {
						"type": "integer",
						"minimum": 1,
						"maximum": 9007199254740991
					}
				},
				"required": ["path"]
			},
			"logicalPath": "tools/read_file.ts",
			"name": "read_file",
			"sourceId": "tools/read_file.ts",
			"sourceKind": "module"
		},
		{
			"description": "Inspect the active host coding workspace. Call this at the start of a task to learn the repository root, Git state, and top-level files.",
			"inputSchema": {
				"type": "object",
				"properties": {}
			},
			"logicalPath": "tools/workspace_info.ts",
			"name": "workspace_info",
			"sourceId": "tools/workspace_info.ts",
			"sourceKind": "module"
		},
		{
			"description": "Atomically create or replace a UTF-8 file in the active host coding workspace. Read existing files first and preserve unrelated content.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"path": {
						"type": "string",
						"minLength": 1
					},
					"content": { "type": "string" }
				},
				"required": ["path", "content"]
			},
			"logicalPath": "tools/write_file.ts",
			"name": "write_file",
			"sourceId": "tools/write_file.ts",
			"sourceKind": "module"
		}
	],
	"workspaceResourceRoot": {
		"logicalPath": "workspace-resources/__root__",
		"rootEntries": []
	},
	"instructions": {
		"name": "instructions",
		"logicalPath": "instructions.md",
		"markdown": "# Identity\n\nYou are Eve Agent, a pragmatic senior software engineer working interactively in the user's selected repository. Your experience should feel like a strong terminal coding agent: inspect first, make focused changes, run the project's own checks, and communicate plainly.\n\n# Workspace\n\n- The repository is a host directory selected when `eve-agent` starts. It is not Eve's isolated `/workspace` sandbox.\n- At the beginning of the first task, call `workspace_info` before making assumptions.\n- Use `read_file`, `edit_file`, `write_file`, `glob`, `grep`, and `bash`; these tools have been overridden to operate on the selected host workspace.\n- Treat the workspace root as the hard boundary. Never try to inspect or modify paths outside it.\n- Read `AGENTS.md`, `CLAUDE.md`, repository documentation, and nearby conventions when they exist. More deeply nested instruction files take precedence for their subtree.\n\n# Working style\n\n1. Understand the request and inspect the smallest relevant part of the codebase.\n2. If ambiguity would materially change the result, ask one focused question. Otherwise make a sensible choice and proceed.\n3. For non-trivial work, maintain a short todo list and keep it current.\n4. Read an existing file before changing it. Prefer `edit_file` for a precise change and `write_file` for new files or deliberate whole-file replacements.\n5. Preserve unrelated user changes. Never use `git reset --hard`, `git clean`, broad deletion, or checkout-overwrite to remove work.\n6. Follow the repository's existing architecture and style. Avoid speculative abstractions and unrelated cleanup.\n7. Run the most relevant tests, type checks, linters, or builds using the repository's own environment. Diagnose failures rather than hiding them.\n8. Inspect `git diff` and `git status` before declaring completion.\n\n# Safety and autonomy\n\n- You may read, edit, and run normal development commands without asking for routine confirmation.\n- Ask before destructive operations, installing system-wide software, publishing, deploying, pushing, creating a PR, or changing remote resources. Some dangerous shell commands are also approval-gated by the runtime.\n- Do not expose secrets from environment files, credential stores, or command output. Never add secrets to source control.\n- Do not commit unless the user explicitly requests a commit.\n- Delegated agents share the host tools and workspace. Use them mainly for independent inspection or analysis; do not let multiple agents edit overlapping files.\n\n# Communication\n\n- Be concise while working. Explain what you are about to do when it helps the user follow along.\n- Do not narrate every trivial file read or command.\n- Final responses should summarize what changed, list validation performed and its result, and call out any remaining risk or unverified step.\n- Never claim a test passed unless you ran it and observed the result.\n",
		"sourceId": "instructions.md",
		"sourceKind": "markdown"
	},
	"kind": "eve-agent-compiled-manifest",
	"subagentEdges": [],
	"subagents": [],
	"version": 39
};
function installCompiledArtifactsBootstrap() {
	installBundledCompiledArtifacts({
		manifest,
		metadata,
		moduleMap
	});
}
installCompiledArtifactsBootstrap();
function installCompiledArtifactsPlugin() {}
//#endregion
//#region .eve/builds/msk8aana-799c7610-a124-49d3-adaf-b7cd4daaf652/workflow/workflows.mjs
const workflowCode = Buffer.from([
	"Z2xvYmFsVGhpcy5fX3ByaXZhdGVfd29ya2Zsb3dzID0gbmV3IE1hcCgpOwovLyNyZWdpb24gZGlzdC9zcmMvaW50ZXJuYWwvd29ya2Zsb3ctYnVuZGxlL3dvcmtmbG93LWNvcmUtc2hpbS5qcwpjb25zdCBXT1JLRkxPV19DT05URVhUX1NZTUJPTCA9IFN5bWJvbC5mb3IoYFdPUktGTE9XX0NPTlRFWFRgKTsKY29uc3QgV09SS0ZMT1dfQ1JFQVRFX0hPT0sgPSBTeW1ib2wuZm9yKGBXT1JLRkxPV19DUkVBVEVfSE9PS2ApOwpjb25zdCBXT1JLRkxPV19HRVRfU1RSRUFNX0lEID0gU3ltYm9sLmZvcihgV09SS0ZMT1dfR0VUX1NUUkVBTV9JRGApOwpjb25zdCBXT1JLRkxPV19TTEVFUCA9IFN5bWJvbC5mb3IoYFdPUktGTE9XX1NMRUVQYCk7CmNvbnN0IFNUUkVBTV9OQU1FX1NZTUJPTCA9IFN5bWJvbC5mb3IoYFdPUktGTE9XX1NUUkVBTV9OQU1FYCk7CmNvbnN0IHdvcmtmbG93R2xvYmFsID0gZ2xvYmFsVGhpczsKZnVuY3Rpb24gY3JlYXRlSG9vayhlKSB7CglsZXQgbiA9IHdvcmtmbG93R2xvYmFsW1dPUktGTE9XX0NSRUFURV9IT09LXTsKCWlmIChuID09PSB2b2lkIDApIHRocm93IEVycm9yKCJgY3JlYXRlSG9vaygpYCBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIGEgd29ya2Zsb3cgZnVuY3Rpb24iKTsKCXJldHVybiBuKGUpOwp9CmZ1bmN0aW9uIGdldFdvcmtmbG93TWV0YWRhdGEoKSB7CglsZXQgdCA9IHdvcmtmbG93R2xvYmFsW1dPUktGTE9XX0NPTlRFWFRfU1lNQk9MXTsKCWlmICh0ID09PSB2b2lkIDApIHRocm93IEVycm9yKCJgZ2V0V29ya2Zsb3dNZXRhZGF0YSgpYCBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIGEgd29ya2Zsb3cgb3Igc3RlcCBmdW5jdGlvbiIpOwoJcmV0dXJuIHQ7Cn0KZnVuY3Rpb24gZ2V0V3JpdGFibGUoZSA9IHt9KSB7CglsZXQgdCA9IHdvcmtmbG93R2xvYmFsW1dPUktGTE9XX0dFVF9TVFJFQU1fSURdOwoJaWYgKHQgPT09IHZvaWQgMCkgdGhyb3cgRXJyb3IoImBnZXRXcml0YWJsZSgpYCBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIGEgd29ya2Zsb3cgZnVuY3Rpb24iKTsKCWxldCByID0gdChlLm5hbWVzcGFjZSk7CglyZXR1cm4gT2JqZWN0LmNyZWF0ZShnbG9iYWxUaGlzLldyaXRhYmxlU3RyZWFtLnByb3RvdHlwZSwgeyBbU1RSRUFNX05BTUVfU1lNQk9MXTogewoJCXZhbHVlOiByLAoJCXdyaXRhYmxlOiAhMQoJfSB9KTsKfQpmdW5jdGlvbiBzbGVlcChlKSB7CglsZXQgdCA9IHdvcmtmbG93R2xvYmFsW1dPUktGTE9XX1NMRUVQXTsKCWlmICh0ID09PSB2b2lkIDApIHRocm93IEVycm9yKCJgc2xlZXAoKWAgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBhIHdvcmtmbG93IGZ1bmN0aW9uIik7CglyZXR1cm4gdChlKTsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9zZXNzaW9uLXRpbWVvdXQtc3RlcHMuanMKdmFyIHN0YXJ0U2Vzc2lvblRpbWVvdXRTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMzAuOC8vc3RhcnRTZXNzaW9uVGltZW91dFN0ZXAiKTsKdmFyIHNpZ25hbFNlc3Npb25UaW1lb3V0U3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL3NpZ25hbFNlc3Npb25UaW1lb3V0U3RlcCIpOwp2YXIgY2FuY2VsU2Vzc2lvblRpbWVvdXRTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMzAuOC8vY2FuY2VsU2Vzc2lvblRpbWVvdXRTdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3Nlc3Npb24tdGltZW91dC13b3JrZmxvdy5qcwphc3luYyBmdW5jdGlvbiBzZXNzaW9uVGltZW91dFdvcmtmbG93KGUpIHsKCWF3YWl0IHNsZWVwKGUuZGVhZGxpbmUpLCBhd2FpdCBzaWduYWxTZXNzaW9uVGltZW91dFN0ZXAoeyB0b2tlbjogZS50b2tlbiB9KTsKfQpzZXNzaW9uVGltZW91dFdvcmtmbG93LndvcmtmbG93SWQgPSAid29ya2Zsb3cvL2V2ZS8vc2Vzc2lvblRpbWVvdXRXb3JrZmxvdyI7Cmdsb2JhbFRoaXMuX19wcml2YXRlX3dvcmtmbG93cy5zZXQoIndvcmtmbG93Ly9ldmUvL3Nlc3Npb25UaW1lb3V0V29ya2Zsb3ciLCBzZXNzaW9uVGltZW91dFdvcmtmbG93KTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9zaGFyZWQvcHVibGljLXJvdXRlLXByZWZpeC5qcwpjb25zdCBFVkVfUFVCTElDX1JPVVRFX1BSRUZJWF9FTlYgPSBgRVZFX1BVQkxJQ19ST1VURV9QUkVGSVhgOwpmdW5jdGlvbiBub3JtYWxpemVQdWJsaWNSb3V0ZVByZWZpeChlKSB7CglsZXQgdCA9IGU/LnRyaW0oKTsKCWlmICh0ID09PSB2b2lkIDAgfHwgdC5sZW5ndGggPT09IDApIHJldHVybjsKCWxldCBuID0gKHQuc3RhcnRzV2l0aChgL2ApID8gdCA6IGAvJHt0fWApLnJlcGxhY2UoL1wvKyQvLCBgYCk7CglyZXR1cm4gbi5sZW5ndGggPT09IDAgPyB2b2lkIDAgOiBuOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3dvcmtmbG93LWNhbGxiYWNrLXVybC5qcwpmdW5jdGlvbiByZXNvbHZlVmVyY2VsUHJvZHVjdGlvbkNhbGxiYWNrQmFzZVVybCgpIHsKCXJldHVybiBwcm9jZXNzLmVudi5WRVJDRUxfRU5WID09PSBgcHJvZHVjdGlvbmAgJiYgcHJvY2Vzcy5lbnYuVkVSQ0VMX1BST0pFQ1RfUFJPRFVDVElPTl9VUkwgPyBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LlZFUkNFTF9QUk9KRUNUX1BST0RVQ1RJT05fVVJMfWAgOiBudWxsOwp9CmZ1bmN0aW9uIHJlc29sdmVXb3JrZmxvd0NhbGxiYWNrQmFzZVVybChuKSB7CglsZXQgciA9IHByb2Nlc3MuZW52LldPUktGTE9XX0xPQ0FMX0JBU0VfVVJMPy50cmltKCkgfHwgdm9pZCAwLCBpID0gKHJlc29sdmVWZXJjZWxQcm9kdWN0aW9uQ2FsbGJhY2tCYXNlVXJsKCkgPz8gciA/PyBuKS5yZXBsYWNlKC9cLyQvLCBgYCksIGEgPSBub3JtYWxpemVQdWJsaWNSb3V0ZVByZWZpeChwcm9jZXNzLmVudltFVkVfUFVCTElDX1JPVVRFX1BSRUZJWF9FTlZdKTsKCXJldHVybiBhID09PSB2b2lkIDAgPyBpIDogYCR7aX0ke2F9YDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9kaXNwYXRjaC1ydW50aW1lLWFjdGlvbnMtc3RlcC5qcwp2YXIgZGlzcGF0Y2hSdW50aW1lQWN0aW9uc1N0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4zMC44Ly9kaXNwYXRjaFJ1bnRpbWVBY3Rpb25zU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2hhcm5lc3MvbWVzc2FnZXMuanMKZnVuY3Rpb24gY29hbGVzY2VUdXJuSW5wdXRzKGUsIHQpIHsKCWxldCBuID0gY29hbGVzY2VJbnB1dFJlc3BvbnNlcyh7CgkJYTogZS5pbnB1dFJlc3BvbnNlcywKCQliOiB0LmlucHV0UmVzcG9uc2VzCgl9KSwgciA9IGNvYWxlc2NlTWVzc2FnZSh7CgkJYTogZS5tZXNzYWdlLAoJCWI6IHQubWVzc2FnZQoJfSksIGkgPSBjb2FsZXNjZUNvbnRleHQoewoJCWE6IGUuY29udGV4dCwKCQliOiB0LmNvbnRleHQKCX0pLCBhID0gdC5vdXRwdXRTY2hlbWEgPz8gZS5vdXRwdXRTY2hlbWEsIG8gPSB7fTsKCXJldHVybiBuICE9PSB2b2lkIDAgJiYgKG8uaW5wdXRSZXNwb25zZXMgPSBuKSwgciAhPT0gdm9pZCAwICYmIChvLm1lc3NhZ2UgPSByKSwgaSAhPT0gdm9pZCAwICYmIChvLmNvbnRleHQgPSBpKSwgYSAhPT0gdm9pZCAwICYmIChvLm91dHB1dFNjaGVtYSA9IGEpLCBvOwp9CmZ1bmN0aW9uIG5vcm1hbGl6ZVVzZXJDb250ZW50KGUpIHsKCWlmIChlID09PSB2b2lkIDApIHJldHVybjsKCWlmICh0eXBlb2YgZSA9PSBgc3RyaW5nYCkgcmV0dXJuIGUudHJpbSgpLmxlbmd0aCA+IDAgPyBlIDogdm9pZCAwOwoJbGV0IHQgPSBlLmZpbHRlcigoZSkgPT4gZS50eXBlICE9PSBgdGV4dGAgfHwgZS50ZXh0LnRyaW0oKS5sZW5ndGggPiAwKTsKCWlmICh0Lmxlbmd0aCAhPT0gMCkgcmV0dXJuIHQubGVuZ3RoID09PSBlLmxlbmd0aCA/IGUgOiB0Owp9CmZ1bmN0aW9uIGNvYWxlc2NlSW5wdXRSZXNwb25zZXMoZSkgewoJbGV0IHQgPSBlLmEgPz8gW10sIG4gPSBlLmIgPz8gW107CglpZiAoISh0Lmxlbmd0aCA9PT0gMCAmJiBuLmxlbmd0aCA9PT0gMCkpIHJldHVybiBbLi4udCwgLi4ubl07Cn0KZnVuY3Rpb24gY29hbGVzY2VDb250ZXh0KGUpIHsKCWxldCB0ID0gZS5hID8/IFtdLCBuID0gZS5iID8/IFtdOwoJaWYgKCEodC5sZW5ndGggPT09IDAgJiYgbi5sZW5ndGggPT09IDApKSByZXR1cm4gWy4uLnQsIC4uLm5dOwp9CmZ1bmN0aW9uIGNvYWxlc2NlTWVzc2FnZShlKSB7CglsZXQgdCA9IG5vcm1hbGl6ZVVzZXJDb250ZW50KGUuYSksIG4gPSBub3JtYWxpemVVc2VyQ29udGVudChlLmIpOwoJcmV0dXJuIHQgPT09IHZvaWQgMCA/IG4gOiBuID09PSB2b2lkIDAgPyB0IDogYXBwZW5kVXNlckNvbnRlbnQoewoJCWFwcGVuZGVkOiBuLAoJCWV4aXN0aW5nOiB0Cgl9KTsKfQpmdW5jdGlvbiBhcHBlbmRVc2VyQ29udGVudChlKSB7CglyZXR1cm4gdHlwZW9mIGUuZXhpc3RpbmcgPT0gYHN0cmluZ2AgJiYgdHlwZW9mIGUuYXBwZW5kZWQgPT0gYHN0cmluZ2AgPyBgJHtlLmV4aXN0aW5nfVxuXG4ke2UuYXBwZW5kZWR9YCA6IFsuLi50b1VzZXJDb250ZW50QXJyYXkoZS5leGlzdGluZyksIC4uLnRvVXNlckNvbnRlbnRBcnJheShlLmFwcGVuZGVkKV07Cn0KZnVuY3Rpb24gdG9Vc2VyQ29udGVudEFycmF5KGUpIHsKCXJldHVybiB0eXBlb2YgZSA9PSBgc3RyaW5nYCA/IGUubGVuZ3RoID4gMCA/IFt7CgkJdHlwZTogYHRleHRgLAoJCXRleHQ6IGUKCX1dIDogW10gOiBBcnJheS5pc0FycmF5KGUpID8gWy4uLmVdIDogW107Cn0KZnVuY3Rpb24gY29hbGVzY2VEZWxpdmVyaWVzKGUpIHsKCWxldCBbdCwgLi4ubl0gPSBlOwoJaWYgKHQgPT09IHZvaWQgMCkgdGhyb3cgRXJyb3IoYENhbm5vdCBjb2FsZXNjZSBhbiBlbXB0eSBkZWxpdmVyeSBiYXRjaC5gKTsKCWxldCByID0gdC5hdXRoLCBpID0gdC5jYWxsZXIsIGEgPSBbLi4udC5wYXlsb2Fkc107Cglmb3IgKGxldCBlIG9mIG4pIHsKCQlpZiAoZS5hdXRoICE9PSB2b2lkIDAgJiYgKHIgPSBlLmF1dGgpLCBlLmNhbGxlciAhPT0gdm9pZCAwKSB7CgkJCWlmIChpICE9PSB2b2lkIDApIHRocm93IEVycm9yKGBDYW5ub3QgY29hbGVzY2UgZGVsaXZlcmllcyBmcm9tIGRpZmZlcmVudCB0dXJucy5gKTsKCQkJaSA9IGUuY2FsbGVyOwoJCX0KCQlhLnB1c2goLi4uZS5wYXlsb2Fkcyk7Cgl9CglyZXR1cm4gewoJCS4uLnQsCgkJYXV0aDogciwKCQljYWxsZXI6IGksCgkJcGF5bG9hZHM6IGEKCX07Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZGVsaXZlci1wYXlsb2Fkcy5qcwpjb25zdCBDT0FMRVNDRURfREVMSVZFUl9GSUVMRFMgPSBbCglgY29udGV4dGAsCglgaW5wdXRSZXNwb25zZXNgLAoJYG1lc3NhZ2VgLAoJYG91dHB1dFNjaGVtYWAKXTsKZnVuY3Rpb24gY29hbGVzY2VEZWxpdmVyUGF5bG9hZHMobikgewoJaWYgKG4ubGVuZ3RoID09PSAwKSByZXR1cm4ge307CglpZiAobi5sZW5ndGggPT09IDEpIHJldHVybiBuWzBdID8/IHt9OwoJbGV0IHIgPSB7fSwgaSA9IHt9OwoJZm9yIChsZXQgdCBvZiBuKSB7CgkJZm9yIChsZXQgW2UsIG5dIG9mIE9iamVjdC5lbnRyaWVzKHQpKSBuICE9PSB2b2lkIDAgJiYgKHJbZV0gPSBuKTsKCQlpID0gY29hbGVzY2VUdXJuSW5wdXRzKGksIHQpOwoJfQoJZm9yIChsZXQgZSBvZiBDT0FMRVNDRURfREVMSVZFUl9GSUVMRFMpIGRlbGV0ZSByW2VdOwoJcmV0dXJuIE9iamVjdC5hc3NpZ24ociwgaSk7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vd29ya2Zsb3ctc3RlcHMuanMKdmFyIHR1cm5TdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMzAuOC8vdHVyblN0ZXAiKTsKdmFyIHJvdXRlUHJveGllZERlbGl2ZXJTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMzAuOC8vcm91dGVQcm94aWVkRGVsaXZlclN0ZXAiKTsKdmFyIGRpc3BhdGNoVHVyblN0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4zMC44Ly9kaXNwYXRjaFR1cm5TdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3JvdXRlLWNoaWxkLWRlbGl2ZXJ5LmpzCmFzeW5jIGZ1bmN0aW9uIHJvdXRlRGVsaXZlclRvQ2hpbGRyZW4oZSkgewoJbGV0IHQgPSBjb2FsZXNjZURlbGl2ZXJQYXlsb2FkcyhlLnBheWxvYWRzKTsKCXJldHVybiBlLnNlc3Npb25TdGF0ZS5oYXNQcm94eUlucHV0UmVxdWVzdHMgPyBhd2FpdCByb3V0ZVByb3hpZWREZWxpdmVyU3RlcCh7CgkJYXV0aDogZS5hdXRoLAoJCXBhcmVudFdyaXRhYmxlOiBlLnBhcmVudFdyaXRhYmxlLAoJCXBheWxvYWQ6IHQsCgkJc2Vzc2lvblN0YXRlOiBlLnNlc3Npb25TdGF0ZQoJfSkgOiB7CgkJa2luZDogYGNvbnRpbnVlYCwKCQlyZW1haW5kZXI6IHQKCX07Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vaG9vay1vd25lcnNoaXAuanMKYXN5bmMgZnVuY3Rpb24gY2xhaW1Ib29rT3duZXJzaGlwKGUpIHsKCWxldCB0OwoJdHJ5IHsKCQl0ID0gYXdhaXQgZS5nZXRDb25mbGljdCgpOwoJfSBjYXRjaCAodCkgewoJCXJldHVybiBhd2FpdCBkaXNwb3NlQW5kVGhyb3coZSwgbm9ybWFsaXplSG9va0NsYWltRXJyb3IodCwgZS50b2tlbikpOwoJfQoJaWYgKHQgIT09IG51bGwpIHJldHVybiBhd2FpdCBkaXNwb3NlQW5kVGhyb3coZSwgY3JlYXRlSG9va0NvbmZsaWN0RXJyb3IoZS50b2tlbiwgdC5ydW5JZCkpOwp9CmFzeW5jIGZ1bmN0aW9uIGNsb3NlSG9va0l0ZXJhdG9yKGUpIHsKCXR5cGVvZiBlLnJldHVybiA9PSBgZnVuY3Rpb25gICYmIGF3YWl0IGUucmV0dXJuKHZvaWQgMCk7Cn0KYXN5bmMgZnVuY3Rpb24gZGlzcG9zZUhvb2soZSkgewoJbGV0IHQgPSBlLmRpc3Bvc2U7CglpZiAodHlwZW9mIHQgPT0gYGZ1bmN0aW9uYCkgewoJCWF3YWl0IHQuY2FsbChlKTsKCQlyZXR1cm47Cgl9CglsZXQgbiA9IGVbU3ltYm9sLmRpc3Bvc2VdOwoJdHlwZW9mIG4gPT0gYGZ1bmN0aW9uYCAmJiBhd2FpdCBuLmNhbGwoZSk7Cn0KYXN5bmMgZnVuY3Rpb24gZGlzcG9zZUFuZFRocm93KGUsIHQpIHsKCXRyeSB7CgkJYXdhaXQgZGlzcG9zZUhvb2soZSk7Cgl9IGNhdGNoIHt9Cgl0aHJvdyB0Owp9CmZ1bmN0aW9uIG5vcm1hbGl6ZUhvb2tDbGFpbUVycm9yKGUsIHQpIHsKCXJldHVybiBpc0hvb2tDb25mbGljdEVycm9yKGUpID8gY3JlYXRlSG9va0NvbmZsaWN0RXJyb3IodHlwZW9mIGUudG9rZW4gPT0gYHN0cmluZ2AgPyBlLnRva2VuIDogdCwgdHlwZW9mIGUuY29uZmxpY3RpbmdSdW5JZCA9PSBgc3RyaW5nYCA/IGUuY29uZmxpY3RpbmdSdW5JZCA6IHZvaWQgMCkgOiBlOwp9CmZ1bmN0aW9uIGlzSG9va0NvbmZsaWN0RXJyb3IoZSkgewoJcmV0dXJuIHR5cGVvZiBlID09IGBvYmplY3RgICYmICEhZSAmJiBgbmFtZWAgaW4gZSAmJiBlLm5hbWUgPT09IGBIb29rQ29uZmxpY3RFcnJvcmA7Cn0KZnVuY3Rpb24gY3JlYXRlSG9va0NvbmZsaWN0RXJyb3IoZSwgdCkgewoJbGV0IG4gPSB0ID09PSB2b2lkIDAgPyBgYCA6IGAgKHJ1biAiJHt0fSIpYDsKCXJldHVybiBPYmplY3QuYXNzaWduKEVycm9yKGBIb29rIHRva2VuICIke2V9IiBpcyBhbHJlYWR5IGluIHVzZSR7bn1gKSwgewoJCWNvbmZsaWN0aW5nUnVuSWQ6IHQsCgkJbmFtZTogYEhvb2tDb25mbGljdEVycm9yYCwKCQl0b2tlbjogZQoJfSk7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9oYXJuZXNzL2FjdGl2ZS10dXJuLWlkLmpzCmZ1bmN0aW9uIGFjdGl2ZVR1cm5JZChlKSB7CglyZXR1cm4gZS50dXJuSWQgPT09IGBgID8gYHR1cm5fJHtlLnNlcXVlbmNlfWAgOiBlLnR1cm5JZDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi93b3JrZmxvdy1lcnJvcnMuanMKZnVuY3Rpb24gbm9ybWFsaXplU2VyaWFsaXphYmxlRXJyb3IoZSkgewoJcmV0dXJuIGUgaW5zdGFuY2VvZiBFcnJvciA/IHsKCQkuLi5PYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXMoZSkpLAoJCWNhdXNlOiBlLmNhdXNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBub3JtYWxpemVTZXJpYWxpemFibGVFcnJvcihlLmNhdXNlKSwKCQltZXNzYWdlOiBlLm1lc3NhZ2UsCgkJbmFtZTogZS5uYW1lLAoJCXN0YWNrOiBlLnN0YWNrCgl9IDogZTsKfQpmdW5jdGlvbiByZWJ1aWxkU2VyaWFsaXphYmxlRXJyb3IoZSkgewoJaWYgKCFpc1JlY29yZChlKSkgcmV0dXJuIEVycm9yKFN0cmluZyhlKSk7CglsZXQgdCA9IHR5cGVvZiBlLm1lc3NhZ2UgPT0gYHN0cmluZ2AgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSksIG4gPSBFcnJvcih0KTsKCXR5cGVvZiBlLm5hbWUgPT0gYHN0cmluZ2AgJiYgKG4ubmFtZSA9IGUubmFtZSksIHR5cGVvZiBlLnN0YWNrID09IGBzdHJpbmdgICYmIChuLnN0YWNrID0gZS5zdGFjayksIGBjYXVzZWAgaW4gZSAmJiAobi5jYXVzZSA9IGlzUmVjb3JkKGUuY2F1c2UpID8gcmVidWlsZFNlcmlhbGl6YWJsZUVycm9yKGUuY2F1c2UpIDogZS5jYXVzZSk7CglsZXQgciA9IG47Cglmb3IgKGxldCBbdCwgbl0gb2YgT2JqZWN0LmVudHJpZXMoZSkpIHQgPT09IGBtZXNzYWdlYCB8fCB0ID09PSBgbmFtZWAgfHwgdCA9PT0gYHN0YWNrYCB8fCB0ID09PSBgY2F1c2VgIHx8IChyW3RdID0gbik7CglyZXR1cm4gbjsKfQpmdW5jdGlvbiBpc1JlY29yZChlKSB7CglyZXR1cm4gdHlwZW9mIGUgPT0gYG9iamVjdGAgJiYgISFlOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3R1cm4tY29udHJvbC1wcm90b2NvbC5qcwp2YXIgc2VuZFR1cm5Db250cm9sU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL3NlbmRUdXJuQ29udHJvbFN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9oYXJuZXNzL2hhbmRsZXMvc3RhdGUta2V5LmpzCmNvbnN0IEFHRU5UX0hBTkRMRVNfU1RBVEVfS0VZID0gYGV2ZS5hZ2VudC5oYW5kbGVzYDsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9oYXJuZXNzL2hhbmRsZXMvcXVlcnkuanMKZnVuY3Rpb24gcmVhZEFnZW50SGFuZGxlcyh0KSB7CglsZXQgbiA9IHQ/LltBR0VOVF9IQU5ETEVTX1NUQVRFX0tFWV07CglpZiAobiA9PT0gdm9pZCAwKSByZXR1cm4gW107CglsZXQgciA9IG4uaGFuZGxlczsKCXJldHVybiBBcnJheS5pc0FycmF5KHIpID8gciA6IFtdOwp9CmZ1bmN0aW9uIGZpbmRSdW5uaW5nQWdlbnRIYW5kbGUoZSwgdCkgewoJcmV0dXJuIHJlYWRBZ2VudEhhbmRsZXMoZSkuZmluZCgoZSkgPT4gZS5waGFzZSA9PT0gYHJ1bm5pbmdgICYmIGUub3BlcmF0aW9uLmNhbGxJZCA9PT0gdC5jYWxsSWQpOwp9CmZ1bmN0aW9uIGlzSW5ib3hTdWJhZ2VudFJlc3VsdEZyb21SdW5uaW5nSGFuZGxlKGUsIHQpIHsKCXJldHVybiBmaW5kUnVubmluZ0FnZW50SGFuZGxlKGUsIHsgY2FsbElkOiB0LmNhbGxJZCB9KSAhPT0gdm9pZCAwOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2NhbmNlbC1kZXNjZW5kYW50LXR1cm5zLXN0ZXAuanMKdmFyIGNhbmNlbERlc2NlbmRhbnRUdXJuc1N0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4zMC44Ly9jYW5jZWxEZXNjZW5kYW50VHVybnNTdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2Rpc3BhdGNoLXdvcmtmbG93LXJ1bnRpbWUtYWN0aW9ucy1zdGVwLmpzCnZhciBkaXNwYXRjaFdvcmtmbG93UnVudGltZUFjdGlvbnNTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMzAuOC8vZGlzcGF0Y2hXb3JrZmxvd1J1bnRpbWVBY3Rpb25zU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9kdXJhYmxlLXNlc3Npb24tbWlncmF0aW9ucy9jaGFpbi5qcwpmdW5jdGlvbiBydW5NaWdyYXRpb25DaGFpbihlKSB7CglpZiAodHlwZW9mIGUudmFsdWUgIT0gYG9iamVjdGAgfHwgZS52YWx1ZSA9PT0gbnVsbCkgdGhyb3cgRXJyb3IoYCR7ZS5sYWJlbH06IHZhbHVlIGhhcyBubyBudW1lcmljICJ2ZXJzaW9uIiBmaWVsZC5gKTsKCWxldCB0ID0gZS52YWx1ZS52ZXJzaW9uLCBuOwoJaWYgKHR5cGVvZiB0ID09IGBudW1iZXJgKSBuID0gZS52YWx1ZTsKCWVsc2UgaWYgKCEoYHZlcnNpb25gIGluIGUudmFsdWUpICYmIGUuaW5pdGlhbFZlcnNpb24gIT09IHZvaWQgMCkgbiA9IHsKCQkuLi5lLnZhbHVlLAoJCXZlcnNpb246IGUuaW5pdGlhbFZlcnNpb24KCX07CgllbHNlIHRocm93IEVycm9yKGAke2UubGFiZWx9OiB2YWx1ZSBoYXMgbm8gbnVtZXJpYyAidmVyc2lvbiIgZmllbGQuYCk7CglsZXQgciA9IGUuaW5pdGlhbFZlcnNpb24gPz8gMTsKCWlmICghTnVtYmVyLmlzSW50ZWdlcihuLnZlcnNpb24pIHx8IG4udmVyc2lvbiA8IHIpIHRocm93IEVycm9yKGAke2UubGFiZWx9OiB2ZXJzaW9uICR7bi52ZXJzaW9ufSBpcyBub3QgYSBwb3NpdGl2ZSBpbnRlZ2VyLmApOwoJaWYgKG4udmVyc2lvbiA+IGUudGFyZ2V0VmVyc2lvbikgdGhyb3cgRXJyb3IoYCR7ZS5sYWJlbH06IGVuY291bnRlcmVkIHZlcnNpb24gJHtuLnZlcnNpb259LCB3aGljaCBpcyBuZXdlciB0aGFuIHRoZSBzdXBwb3J0ZWQgdmVyc2lvbiAke2UudGFyZ2V0VmVyc2lvbn0uIFRoaXMgdXN1YWxseSBpbmRpY2F0ZXMgdGhlIHdpcmUgd2FzIHdyaXR0ZW4gYnkgYSBuZXdlciBldmUgZGVwbG95bWVudCB0aGFuIHRoZSBvbmUgcmVhZGluZyBpdC5gKTsKCWZvciAoOyBuLnZlcnNpb24gPCBlLnRhcmdldFZlcnNpb247KSB7CgkJbGV0IHQgPSBlLm1pZ3JhdGlvbnMuZmluZCgoZSkgPT4gZS5mcm9tID09PSBuLnZlcnNpb24pOwoJCWlmICghdCkgdGhyb3cgRXJyb3IoYCR7ZS5sYWJlbH06IG5vIG1pZ3JhdGlvbiByZWdpc3RlcmVkIGZvciB2ZXJzaW9uICR7bi52ZXJzaW9ufSDihpIgJHtuLnZlcnNpb24gKyAxfS5gKTsKCQlpZiAodC50byAhPT0gdC5mcm9tICsgMSkgdGhyb3cgRXJyb3IoYCR7ZS5sYWJlbH06IG1pZ3JhdGlvbiAke3QuZnJvbX0g4oaSICR7dC50b30gbXVzdCBzdGVwIGV4YWN0bHkgb25lIHZlcnNpb24gYXQgYSB0aW1lLmApOwoJCWxldCByID0gdC5taWdyYXRlKG4pOwoJCWlmIChyLnZlcnNpb24gIT09IHQudG8pIHRocm93IEVycm9yKGAke2UubGFiZWx9OiBtaWdyYXRpb24gJHt0LmZyb219IOKGkiAke3QudG99IHByb2R1Y2VkIGEgdmFsdWUgd2l0aCB2ZXJzaW9uICR7ci52ZXJzaW9ufS5gKTsKCQluID0gcjsKCX0KCXJldHVybiBuOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2R1cmFibGUtc2Vzc2lvbi1taWdyYXRpb25zL3R1cm4td29ya2Zsb3ctdjAtdG8tdjEuanMKY29uc3QgdHVybldvcmtmbG93SW5wdXRWMFRvVjEgPSB7Cglmcm9tOiAwLAoJbWlncmF0ZShlKSB7CgkJaWYgKCFpc1ByZVZlcnNpb25UdXJuV29ya2Zsb3dJbnB1dChlKSkgdGhyb3cgRXJyb3IoYHR1cm4gd29ya2Zsb3cgaW5wdXQ6IHZlcnNpb24gMCB2YWx1ZSBpcyBub3QgYSByZWNvZ25pemVkIHByZS12ZXJzaW9uIHNoYXBlLmApOwoJCXJldHVybiB7CgkJCWNhcGFiaWxpdGllczogZS5jYXBhYmlsaXRpZXMsCgkJCWNvbXBsZXRpb25Ub2tlbjogZS5jb21wbGV0aW9uVG9rZW4sCgkJCW1vZGU6IGUubW9kZSwKCQkJc3RlcElucHV0OiB7CgkJCQlpbnB1dDogZS5kZWxpdmVyeSwKCQkJCXBhcmVudFdyaXRhYmxlOiBlLnBhcmVudFdyaXRhYmxlLAoJCQkJc2VyaWFsaXplZENvbnRleHQ6IGUuc2VyaWFsaXplZENvbnRleHQsCgkJCQlzZXNzaW9uU3RhdGU6IGUuc2Vzc2lvblN0YXRlCgkJCX0sCgkJCXZlcnNpb246IDEKCQl9OwoJfSwKCXRvOiAxCn07CmZ1bmN0aW9uIGlzUHJlVmVyc2lvblR1cm5Xb3JrZmxvd0lucHV0KGUpIHsKCXJldHVybiB0eXBlb2YgZSA9PSBgb2JqZWN0YCAmJiAhIWUgJiYgYGRlbGl2ZXJ5YCBpbiBlOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2R1cmFibGUtc2Vzc2lvbi1taWdyYXRpb25zL3R1cm4td29ya2Zsb3cuanMKY29uc3QgdHVybldvcmtmbG93SW5wdXRNaWdyYXRpb25zID0gW3R1cm5X",
	"b3JrZmxvd0lucHV0VjBUb1YxXTsKZnVuY3Rpb24gbWlncmF0ZVR1cm5Xb3JrZmxvd0lucHV0KHQpIHsKCXJldHVybiBydW5NaWdyYXRpb25DaGFpbih7CgkJaW5pdGlhbFZlcnNpb246IDAsCgkJbGFiZWw6IGB0dXJuIHdvcmtmbG93IGlucHV0YCwKCQltaWdyYXRpb25zOiB0dXJuV29ya2Zsb3dJbnB1dE1pZ3JhdGlvbnMsCgkJdGFyZ2V0VmVyc2lvbjogMSwKCQl2YWx1ZTogdAoJfSk7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vc3ViYWdlbnQtZXZlbnQtcHJveHktc3RlcC5qcwp2YXIgcnVuUHJveHlTdWJhZ2VudEV2ZW50U3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL3J1blByb3h5U3ViYWdlbnRFdmVudFN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdHVybi1jYW5jZWxsYXRpb24tdG9rZW4uanMKZnVuY3Rpb24gdHVybkNhbmNlbGxhdGlvbkhvb2tUb2tlbihlKSB7CglyZXR1cm4gYCR7ZX06Y2FuY2VsYDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2hhcm5lc3MvdHVybi1jYW5jZWxsYXRpb24uanMKY29uc3QgVFVSTl9DQU5DRUxMRURfRVJST1JfTkFNRSA9IGBUdXJuQ2FuY2VsbGVkRXJyb3JgOwp2YXIgVHVybkNhbmNlbGxlZEVycm9yID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7Cgljb25zdHJ1Y3Rvcih0ID0gYFRoZSB0dXJuIHdhcyBjYW5jZWxsZWQuYCkgewoJCXN1cGVyKHQpLCB0aGlzLm5hbWUgPSBUVVJOX0NBTkNFTExFRF9FUlJPUl9OQU1FOwoJfQp9OwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi90dXJuLWNhbmNlbGxhdGlvbi1jb250cm9sLmpzCmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVR1cm5DYW5jZWxsYXRpb25Db250cm9sKGkpIHsKCWxldCBhID0gY3JlYXRlSG9vayh7IHRva2VuOiB0dXJuQ2FuY2VsbGF0aW9uSG9va1Rva2VuKGkuY29udHJvbFRva2VuKSB9KSwgbyA9IGFbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7Cgl0cnkgewoJCWF3YWl0IGNsYWltSG9va093bmVyc2hpcChhKTsKCX0gY2F0Y2ggKGUpIHsKCQlpZiAoaXNIb29rQ29uZmxpY3RFcnJvcihlKSkgcmV0dXJuOwoJCXRocm93IGU7Cgl9CglsZXQgcyA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKSwgYyA9IGNvbnN1bWVNYXRjaGluZ0NhbmNlbChvLCBpLmV4cGVjdGVkVHVybklkLCAoKSA9PiB7CgkJcy5hYm9ydChuZXcgVHVybkNhbmNlbGxlZEVycm9yKCkpOwoJfSkudGhlbigoKSA9PiBgY2FuY2VsYCksIGwgPSAhMTsKCXJldHVybiB7CgkJc2lnbmFsOiBzLnNpZ25hbCwKCQlyZXF1ZXN0ZWQ6IGMsCgkJYXN5bmMgZGlzcG9zZSgpIHsKCQkJbCB8fCAobCA9ICEwLCBhd2FpdCBkaXNwb3NlSG9vayhhKSk7CgkJfQoJfTsKfQphc3luYyBmdW5jdGlvbiBjb25zdW1lTWF0Y2hpbmdDYW5jZWwoZSwgdCwgbikgewoJZm9yICg7OykgewoJCWxldCByID0gYXdhaXQgZS5uZXh0KCk7CgkJaWYgKHIuZG9uZSkgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKCgpID0+IHt9KTsKCQlpZiAobWF0Y2hlc0FjdGl2ZVR1cm4oci52YWx1ZSwgdCkpIHsKCQkJbigpOwoJCQlyZXR1cm47CgkJfQoJfQp9CmZ1bmN0aW9uIG1hdGNoZXNBY3RpdmVUdXJuKGUsIHQpIHsKCWlmICh0eXBlb2YgZSAhPSBgb2JqZWN0YCB8fCAhZSkgcmV0dXJuICEwOwoJbGV0IG4gPSBlLnR1cm5JZDsKCXJldHVybiBuID09PSB2b2lkIDAgfHwgbiA9PT0gdDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi90dXJuLWV4ZWN1dGlvbi1jdXJzb3IuanMKdmFyIFR1cm5FeGVjdXRpb25DdXJzb3IgPSBjbGFzcyB7Cgljb250cm9sVG9rZW47CglwYXJlbnRXcml0YWJsZTsKCWN1cnJlbnRTZXJpYWxpemVkQ29udGV4dDsKCWN1cnJlbnRTZXNzaW9uU3RhdGU7CglsYXN0UmVwb3J0ZWRDb250aW51YXRpb25Ub2tlbjsKCWNvbnN0cnVjdG9yKGUpIHsKCQl0aGlzLmNvbnRyb2xUb2tlbiA9IGUuY29udHJvbFRva2VuLCB0aGlzLmN1cnJlbnRTZXJpYWxpemVkQ29udGV4dCA9IGUuc2VyaWFsaXplZENvbnRleHQsIHRoaXMuY3VycmVudFNlc3Npb25TdGF0ZSA9IGUuc2Vzc2lvblN0YXRlLCB0aGlzLmxhc3RSZXBvcnRlZENvbnRpbnVhdGlvblRva2VuID0gZS5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW4sIHRoaXMucGFyZW50V3JpdGFibGUgPSBlLnBhcmVudFdyaXRhYmxlOwoJfQoJZ2V0IHNlcmlhbGl6ZWRDb250ZXh0KCkgewoJCXJldHVybiB0aGlzLmN1cnJlbnRTZXJpYWxpemVkQ29udGV4dDsKCX0KCWdldCBzZXNzaW9uU3RhdGUoKSB7CgkJcmV0dXJuIHRoaXMuY3VycmVudFNlc3Npb25TdGF0ZTsKCX0KCWFzeW5jIGFkb3B0KGUpIHsKCQl0aGlzLnNldFN0YXRlKGUpOwoJCWxldCB0ID0gZS5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW47CgkJdCA9PT0gYGAgfHwgdCA9PT0gdGhpcy5sYXN0UmVwb3J0ZWRDb250aW51YXRpb25Ub2tlbiB8fCAodGhpcy5sYXN0UmVwb3J0ZWRDb250aW51YXRpb25Ub2tlbiA9IHQsIGF3YWl0IHRoaXMuc2VuZCh7CgkJCWNvbnRpbnVhdGlvblRva2VuOiB0LAoJCQlraW5kOiBgdHVybi1jb250aW51YXRpb24tdG9rZW5gCgkJfSkpOwoJfQoJY3JlYXRlU3RlcElucHV0KGUsIHQpIHsKCQlyZXR1cm4gewoJCQlhYm9ydFNpZ25hbDogdCwKCQkJaW5wdXQ6IGUsCgkJCXBhcmVudFdyaXRhYmxlOiB0aGlzLnBhcmVudFdyaXRhYmxlLAoJCQlzZXJpYWxpemVkQ29udGV4dDogdGhpcy5jdXJyZW50U2VyaWFsaXplZENvbnRleHQsCgkJCXNlc3Npb25TdGF0ZTogdGhpcy5jdXJyZW50U2Vzc2lvblN0YXRlCgkJfTsKCX0KCWFzeW5jIGZpbmlzaChlLCB0LCBuKSB7CgkJdGhpcy5zZXRTdGF0ZShlKSwgYXdhaXQgdGhpcy5zZW5kKHsKCQkJYWN0aW9uOiB7CgkJCQkuLi50LAoJCQkJc2VyaWFsaXplZENvbnRleHQ6IHRoaXMuY3VycmVudFNlcmlhbGl6ZWRDb250ZXh0LAoJCQkJc2Vzc2lvblN0YXRlOiB0aGlzLmN1cnJlbnRTZXNzaW9uU3RhdGUKCQkJfSwKCQkJYnVmZmVyZWREZWxpdmVyaWVzOiBuLmxlbmd0aCA9PT0gMCA/IHZvaWQgMCA6IFsuLi5uXSwKCQkJa2luZDogYHR1cm4tcmVzdWx0YAoJCX0pOwoJfQoJYXN5bmMgc2VuZCh0KSB7CgkJYXdhaXQgc2VuZFR1cm5Db250cm9sU3RlcCh7CgkJCWNvbnRyb2xUb2tlbjogdGhpcy5jb250cm9sVG9rZW4sCgkJCXBheWxvYWQ6IHQKCQl9KTsKCX0KCXNldFN0YXRlKGUpIHsKCQl0aGlzLmN1cnJlbnRTZXJpYWxpemVkQ29udGV4dCA9IGUuc2VyaWFsaXplZENvbnRleHQgPz8gdGhpcy5jdXJyZW50U2VyaWFsaXplZENvbnRleHQsIHRoaXMuY3VycmVudFNlc3Npb25TdGF0ZSA9IGUuc2Vzc2lvblN0YXRlOwoJfQp9OwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL3J1bnRpbWUvYWN0aW9ucy9rZXlzLmpzCmZ1bmN0aW9uIGdldFJ1bnRpbWVBY3Rpb25SZXN1bHRLZXkoZSkgewoJc3dpdGNoIChlLmtpbmQpIHsKCQljYXNlIGBsb2FkLXNraWxsLXJlc3VsdGA6IHJldHVybiBgcnVudGltZS1hY3Rpb246bG9hZC1za2lsbDoke2UuY2FsbElkfWA7CgkJY2FzZSBgc3ViYWdlbnQtcmVzdWx0YDogcmV0dXJuIGBzdWJhZ2VudC1jYWxsOiR7ZS5zdWJhZ2VudE5hbWV9OiR7ZS5jYWxsSWR9YDsKCQljYXNlIGB0b29sLXJlc3VsdGA6IHJldHVybiBgdG9vbC1jYWxsOiR7ZS50b29sTmFtZX06JHtlLmNhbGxJZH1gOwoJfQp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvcnVudGltZS9hY3Rpb25zL3Jlc3VsdHMuanMKZnVuY3Rpb24gcmVzb2x2ZVJ1bnRpbWVBY3Rpb25SZXN1bHRzRm9yS2V5cyh0KSB7CglsZXQgbiA9IG5ldyBTZXQodC5wZW5kaW5nS2V5cyksIHIgPSBuZXcgTWFwKCk7Cglmb3IgKGxldCBpIG9mIHQucmVzdWx0cykgewoJCWxldCB0ID0gZ2V0UnVudGltZUFjdGlvblJlc3VsdEtleShpKTsKCQluLmhhcyh0KSAmJiByLnNldCh0LCBpKTsKCX0KCWxldCBpID0gW107Cglmb3IgKGxldCBlIG9mIHQucGVuZGluZ0tleXMpIHsKCQlsZXQgdCA9IHIuZ2V0KGUpOwoJCWlmICh0ID09PSB2b2lkIDApIHJldHVybjsKCQlpLnB1c2godCk7Cgl9CglyZXR1cm4gaTsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi90dXJuLXdvcmtmbG93LmpzCmNvbnN0IFRBU0tfTU9ERV9XQUlUX0VSUk9SX01FU1NBR0UgPSAiVGFzayBtb2RlIGNhbm5vdCB3YWl0IGZvciBmb2xsb3ctdXAgaW5wdXQgKGBuZXh0OiBudWxsYCkuIjsKZnVuY3Rpb24gY2FuU2V0dGxlQ2FuY2VsbGVkVHVybkFzUGFyayhlKSB7CglyZXR1cm4gZS5tb2RlID09PSBgY29udmVyc2F0aW9uYCB8fCBlLnN0ZXBJbnB1dC5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW4gIT09IGBgOwp9CmFzeW5jIGZ1bmN0aW9uIHR1cm5Xb3JrZmxvdyhlKSB7CglsZXQgdCA9IG1pZ3JhdGVUdXJuV29ya2Zsb3dJbnB1dChlKTsKCXJldHVybiB0LmRyaXZlckNhcGFiaWxpdGllcz8udHVybkluYm94ID09PSAhMCA/IHJ1blR1cm5Pd25lZFdvcmtmbG93KHQpIDogcnVuTGVnYWN5VHVybldvcmtmbG93KHQpOwp9CmFzeW5jIGZ1bmN0aW9uIHJ1blR1cm5Pd25lZFdvcmtmbG93KG4pIHsKCWxldCBvID0gY3JlYXRlSG9vayh7IHRva2VuOiBgJHtuLmNvbXBsZXRpb25Ub2tlbn06aW5ib3hgIH0pLCBjID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSwgbCA9IG5ldyBUdXJuRXhlY3V0aW9uQ3Vyc29yKHsKCQljb250cm9sVG9rZW46IG4uY29tcGxldGlvblRva2VuLAoJCXBhcmVudFdyaXRhYmxlOiBuLnN0ZXBJbnB1dC5wYXJlbnRXcml0YWJsZSwKCQlzZXJpYWxpemVkQ29udGV4dDogbi5zdGVwSW5wdXQuc2VyaWFsaXplZENvbnRleHQsCgkJc2Vzc2lvblN0YXRlOiBuLnN0ZXBJbnB1dC5zZXNzaW9uU3RhdGUKCX0pLCB1ID0gMCwgbmV4dERlbGl2ZXJ5UmVxdWVzdElkID0gKCkgPT4gYCR7by50b2tlbn06ZGVsaXZlcnk6JHtTdHJpbmcodSsrKX1gLCBkID0gW10sIGYgPSBuLnN0ZXBJbnB1dC5pbnB1dCwgcCA9ICExLCBtOwoJdHJ5IHsKCQl0cnkgewoJCQlhd2FpdCBjbGFpbUhvb2tPd25lcnNoaXAobyksIHAgPSAhMDsKCQl9IGNhdGNoIChlKSB7CgkJCWlmIChpc0hvb2tDb25mbGljdEVycm9yKGUpKSByZXR1cm47CgkJCXRocm93IGU7CgkJfQoJCWZvciAobi5kcml2ZXJDYXBhYmlsaXRpZXM/LmNhbmNlbGxlZFR1cm5TZXR0bGUgPT09ICEwICYmIGNhblNldHRsZUNhbmNlbGxlZFR1cm5Bc1BhcmsobikgJiYgKG0gPSBhd2FpdCBjcmVhdGVUdXJuQ2FuY2VsbGF0aW9uQ29udHJvbCh7CgkJCWNvbnRyb2xUb2tlbjogbi5jb21wbGV0aW9uVG9rZW4sCgkJCWV4cGVjdGVkVHVybklkOiBhY3RpdmVUdXJuSWQobi5zdGVwSW5wdXQuc2Vzc2lvblN0YXRlLmVtaXNzaW9uU3RhdGUpCgkJfSkpOzspIHsKCQkJbGV0IGkgPSBhd2FpdCB0dXJuU3RlcChsLmNyZWF0ZVN0ZXBJbnB1dChmLCBtPy5zaWduYWwpKSwgcyA9IGkuYWN0aW9uID09PSBgZGlzcGF0Y2gtd29ya2Zsb3ctcnVudGltZS1hY3Rpb25zYCB8fCBpLmFjdGlvbiA9PT0gYHBhcmtgID8gaS5wZW5kaW5nUnVudGltZUFjdGlvbktleXMgOiB2b2lkIDA7CgkJCWlmIChpLmFjdGlvbiA9PT0gYGNhbmNlbGxlZGAgfHwgbT8uc2lnbmFsLmFib3J0ZWQgPT09ICEwICYmIHMgPT09IHZvaWQgMCkgewoJCQkJYXdhaXQgZmluaXNoQ2FuY2VsbGVkVHVybih7CgkJCQkJYnVmZmVyZWREZWxpdmVyaWVzOiBkLAoJCQkJCWNhbmNlbGxhdGlvbjogbSwKCQkJCQljdXJzb3I6IGwKCQkJCX0pOwoJCQkJcmV0dXJuOwoJCQl9CgkJCWlmIChpLnNsZWVwRHVyYXRpb25NcyAhPT0gdm9pZCAwICYmIGF3YWl0IHdhaXRGb3JUdXJuU2xlZXAoaS5zbGVlcER1cmF0aW9uTXMsIG0pID09PSBgY2FuY2VsYCkgewoJCQkJYXdhaXQgZmluaXNoQ2FuY2VsbGVkVHVybih7CgkJCQkJYnVmZmVyZWREZWxpdmVyaWVzOiBkLAoJCQkJCWNhbmNlbGxhdGlvbjogbSwKCQkJCQljdXJzb3I6IGwKCQkJCX0pOwoJCQkJcmV0dXJuOwoJCQl9CgkJCWlmIChpLmFjdGlvbiA9PT0gYGRvbmVgKSB7CgkJCQlhd2FpdCBtPy5kaXNwb3NlKCksIGF3YWl0IGwuZmluaXNoKGksIHsKCQkJCQlraW5kOiBgZG9uZWAsCgkJCQkJb3V0cHV0OiBpLm91dHB1dCA/PyBgYCwKCQkJCQlpc0Vycm9yOiBpLmlzRXJyb3IsCgkJCQkJdXNhZ2U6IGkudXNhZ2UsCgkJCQkJdXNhZ2VEZWx0YTogaS51c2FnZURlbHRhCgkJCQl9LCBkKTsKCQkJCXJldHVybjsKCQkJfQoJCQlpZiAocyAhPT0gdm9pZCAwKSB7CgkJCQlhd2FpdCBsLmFkb3B0KGkpOwoJCQkJbGV0IG4gPSBhd2FpdCAoaS5hY3Rpb24gPT09IGBkaXNwYXRjaC13b3JrZmxvdy1ydW50aW1lLWFjdGlvbnNgID8gZGlzcGF0Y2hXb3JrZmxvd1J1bnRpbWVBY3Rpb25zU3RlcCA6IGRpc3BhdGNoUnVudGltZUFjdGlvbnNTdGVwKSh7CgkJCQkJY2FsbGJhY2tCYXNlVXJsOiByZXNvbHZlV29ya2Zsb3dDYWxsYmFja0Jhc2VVcmwoZ2V0V29ya2Zsb3dNZXRhZGF0YSgpLnVybCksCgkJCQkJcGFyZW50Q29udGludWF0aW9uVG9rZW46IG8udG9rZW4sCgkJCQkJcGFyZW50V3JpdGFibGU6IGwucGFyZW50V3JpdGFibGUsCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IGwuc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiBsLnNlc3Npb25TdGF0ZQoJCQkJfSk7CgkJCQlhd2FpdCBsLmFkb3B0KG4pOwoJCQkJbGV0IHIgPSBhd2FpdCB3YWl0Rm9yUnVudGltZUFjdGlvblJlc3VsdHMoewoJCQkJCWJ1ZmZlcmVkRGVsaXZlcmllczogZCwKCQkJCQljYW5jZWxsYXRpb246IG0sCgkJCQkJY3Vyc29yOiBsLAoJCQkJCWluYm94VG9rZW46IG8udG9rZW4sCgkJCQkJaW5pdGlhbFJlc3VsdHM6IG4ucmVzdWx0cywKCQkJCQlpdGVyYXRvcjogYywKCQkJCQluZXh0RGVsaXZlcnlSZXF1ZXN0SWQsCgkJCQkJcGVuZGluZ0FjdGlvbktleXM6IHMKCQkJCX0pOwoJCQkJaWYgKHIgPT09IGBjYW5jZWxsZWRgKSB7CgkJCQkJZiA9IHZvaWQgMDsKCQkJCQljb250aW51ZTsKCQkJCX0KCQkJCWlmIChyID09PSBgY2FuY2VsLXR1cm5gKSB7CgkJCQkJYXdhaXQgZmluaXNoQ2FuY2VsbGVkVHVybih7CgkJCQkJCWJ1ZmZlcmVkRGVsaXZlcmllczogZCwKCQkJCQkJY2FuY2VsbGF0aW9uOiBtLAoJCQkJCQljdXJzb3I6IGwKCQkJCQl9KTsKCQkJCQlyZXR1cm47CgkJCQl9CgkJCQlmID0gewoJCQkJCWtpbmQ6IGBydW50aW1lLWFjdGlvbi1yZXN1bHRgLAoJCQkJCXJlc3VsdHM6IHIKCQkJCX07CgkJCQljb250aW51ZTsKCQkJfQoJCQlpZiAoaS5hY3Rpb24gPT09IGBwYXJrYCkgewoJCQkJaWYgKCEoaS5oYXNQZW5kaW5nQXV0aG9yaXphdGlvbiB8fCBpLmhhc1BlbmRpbmdJbnB1dEJhdGNoICYmIG4uY2FwYWJpbGl0aWVzPy5yZXF1ZXN0SW5wdXQgPT09ICEwIHx8IG4ubW9kZSA9PT0gYGNvbnZlcnNhdGlvbmApKSB0aHJvdyBFcnJvcihUQVNLX01PREVfV0FJVF9FUlJPUl9NRVNTQUdFKTsKCQkJCWF3YWl0IG0/LmRpc3Bvc2UoKSwgYXdhaXQgbC5maW5pc2goaSwgewoJCQkJCWF1dGhvcml6YXRpb25OYW1lczogaS5hdXRob3JpemF0aW9uTmFtZXMsCgkJCQkJa2luZDogYHBhcmtgLAoJCQkJCXNldHRsZWQ6IGkuc2V0dGxlZAoJCQkJfSwgZCk7CgkJCQlyZXR1cm47CgkJCX0KCQkJYXdhaXQgbC5hZG9wdChpKSwgZiA9IHZvaWQgMDsKCQl9Cgl9IGNhdGNoIChlKSB7CgkJdGhyb3cgYXdhaXQgbC5zZW5kKHsKCQkJZXJyb3I6IG5vcm1hbGl6ZVNlcmlhbGl6YWJsZUVycm9yKGUpLAoJCQlraW5kOiBgdHVybi1lcnJvcmAKCQl9KSwgZTsKCX0gZmluYWxseSB7CgkJbSAhPT0gdm9pZCAwICYmIGF3YWl0IG0uZGlzcG9zZSgpLCBwICYmIGF3YWl0IGRpc3Bvc2VIb29rKG8pOwoJfQp9CmFzeW5jIGZ1bmN0aW9uIGZpbmlzaENhbmNlbGxlZFR1cm4oZSkgewoJYXdhaXQgY2FuY2VsRGVzY2VuZGFudFR1cm5zU3RlcCh7CgkJc2VyaWFsaXplZENvbnRleHQ6IGUuY3Vyc29yLnNlcmlhbGl6ZWRDb250ZXh0LAoJCXNlc3Npb25TdGF0ZTogZS5jdXJzb3Iuc2Vzc2lvblN0YXRlCgl9KSwgYXdhaXQgZS5jYW5jZWxsYXRpb24/LmRpc3Bvc2UoKSwgYXdhaXQgZS5jdXJzb3IuZmluaXNoKHsgc2Vzc2lvblN0YXRlOiBlLmN1cnNvci5zZXNzaW9uU3RhdGUgfSwgewoJCWNhbmNlbGxlZDogITAsCgkJa2luZDogYHBhcmtgCgl9LCBlLmJ1ZmZlcmVkRGVsaXZlcmllcyk7Cn0KYXN5bmMgZnVuY3Rpb24gd2FpdEZvclR1cm5TbGVlcChlLCB0KSB7CglpZiAodD8uc2lnbmFsLmFib3J0ZWQgPT09ICEwKSByZXR1cm4gYGNhbmNlbGA7CglsZXQgbiA9IHNsZWVwKGUpLnRoZW4oKCkgPT4gYHNsZXB0YCk7CglyZXR1cm4gdCA9PT0gdm9pZCAwID8gbiA6IFByb21pc2UucmFjZShbbiwgdC5yZXF1ZXN0ZWRdKTsKfQphc3luYyBmdW5jdGlvbiB3YWl0Rm9yUnVudGltZUFjdGlvblJlc3VsdHMoZSkgewoJbGV0IHQsIHIgPSBbLi4uZS5pbml0aWFsUmVzdWx0c107Cglmb3IgKDs7KSB7CgkJbGV0IGkgPSByZXNvbHZlUnVudGltZUFjdGlvblJlc3VsdHNGb3JLZXlzKHsKCQkJcGVuZGluZ0tleXM6IGUucGVuZGluZ0FjdGlvbktleXMsCgkJCXJlc3VsdHM6IHIKCQl9KTsKCQlpZiAoaSAhPT0gdm9pZCAwKSByZXR1cm4gdCAhPT0gdm9pZCAwICYmIGF3YWl0IGUuY3Vyc29yLnNlbmQoewoJCQlraW5kOiBgdHVybi1kZWxpdmVyeS1jYW5jZWxsZWRgLAoJCQlyZXF1ZXN0SWQ6IHQKCQl9KSwgaTsKCQllLmN1cnNvci5zZXNzaW9uU3RhdGUuaGFzUHJveHlJbnB1dFJlcXVlc3RzICYmIHQgPT09IHZvaWQgMCAmJiAodCA9IGUubmV4dERlbGl2ZXJ5UmVxdWVzdElkKCksIGF3YWl0IGUuY3Vyc29yLnNlbmQoewoJCQljb250aW51YXRpb25Ub2tlbjogZS5jdXJzb3Iuc2Vzc2lvblN0YXRlLmNvbnRpbnVhdGlvblRva2VuLAoJCQlpbmJveFRva2VuOiBlLmluYm94VG9rZW4sCgkJCWtpbmQ6IGB0dXJuLWRlbGl2ZXJ5LXJlcXVlc3RgLAoJCQlyZXF1ZXN0SWQ6IHQKCQl9KSk7CgkJbGV0IGEgPSBlLml0ZXJhdG9yLm5leHQoKTsKCQlhLmNhdGNoKCgpID0+IHt9KTsKCQlsZXQgbyA9IGF3YWl0IChlLmNhbmNlbGxhdGlvbiA9PT0gdm9pZCAwID8gYSA6IFByb21pc2UucmFjZShbYSwgZS5jYW5jZWxsYXRpb24ucmVxdWVzdGVkXSkpOwoJCWlmIChvID09PSBgY2FuY2VsYCkgcmV0dXJuIHQgIT09IHZvaWQgMCAmJiBhd2FpdCBlLmN1cnNvci5zZW5kKHsKCQkJa2luZDogYHR1cm4tZGVsaXZlcnktY2FuY2VsbGVkYCwKCQkJcmVxdWVzdElkOiB0CgkJfSksIGBjYW5jZWxsZWRgOwoJCWlmIChvLmRvbmUpIHRocm93IEVycm9yKGBUdXJuIGluYm94IGNsb3NlZCBiZWZvcmUgcnVudGltZSBhY3Rpb25zIGNvbXBsZXRlZC5gKTsKCQlsZXQgcyA9IG8udmFsdWU7CgkJaWYgKHMua2luZCA9PT0gYHJ1bnRpbWUtYWN0aW9uLXJlc3VsdGApIHsKCQkJbGV0IHQgPSBlLmN1cnNvci5zZXNzaW9uU3RhdGUuc25hcHNob3Q/LnNlc3Npb24uc3RhdGU7CgkJCXIucHVzaCguLi5zLnJlc3VsdHMuZmlsdGVyKChlKSA9PiBpc0luYm94U3ViYWdlbnRSZXN1bHRGcm9tUnVubmluZ0hhbmRsZSh0LCBlKSkpOwoJCQljb250aW51ZTsKCQl9CgkJaWYgKHMua2luZCA9PT0gYHN1YmFnZW50LWlucHV0LXJlcXVlc3RgIHx8IHMua2luZCA9PT0gYHN1YmFnZW50LWF1dGhvcml6YXRpb24tZXZlbnRgKSB7CgkJCWxldCB0ID0gYXdhaXQgcnVuUHJveHlTdWJhZ2VudEV2ZW50U3RlcCh7CgkJCQlob29rUGF5bG9hZDogcywKCQkJCXBhcmVudFdyaXRhYmxlOiBlLmN1cnNvci5wYXJlbnRXcml0YWJsZSwKCQkJCXNlcmlhbGl6ZWRDb250ZXh0OiBlLmN1cnNvci5zZXJpYWxpemVkQ29udGV4dCwKCQkJCXNlc3Npb25TdGF0ZTogZS5jdXJzb3Iuc2Vzc2lvblN0YXRlCgkJCX0pOwoJCQlhd2FpdCBlLmN1cnNvci5hZG9wdCh0KTsKCQkJY29udGludWU7CgkJfQoJCWlmIChzLmtpbmQgPT09IGBkcml2ZXItZGVsaXZlcnlgICYmIHMucmVxdWVzdElkID09PSB0KSB7CgkJCWF3YWl0IGUuY3Vyc29yLnNlbmQoewoJCQkJa2luZDogYHR1cm4tZGVsaXZlcnktYWNjZXB0ZWRgLAoJCQkJcmVxdWVzdElkOiBzLnJlcXVlc3RJZAoJCQl9KSwgdCA9IHZvaWQgMDsKCQkJbGV0IHIgPSBhd2FpdCByb3V0ZURlbGl2ZXJUb0NoaWxkcmVuKHsKCQkJCWF1dGg6IHMuZGVsaXZlcnkuYXV0aCwKCQkJCXBhcmVudFdyaXRhYmxlOiBlLmN1cnNvci5wYXJlbnRXcml0YWJsZSwKCQkJCXBheWxvYWRzOiBzLmRlbGl2ZXJ5LnBheWxvYWRzLAoJCQkJc2Vzc2lvblN0YXRlOiBlLmN1cnNvci5zZXNzaW9uU3RhdGUKCQkJfSk7CgkJCWlmIChyLmtpbmQgPT09IGBjYW5jZWwtdHVybmApIHJldHVybiByLmtpbmQ7CgkJCXIucmVtYWluZGVyICE9PSB2b2lkIDAgJiYgZS5idWZmZXJlZERlbGl2ZXJpZXMucHVzaCh7CgkJCQkuLi5zLmRlbGl2ZXJ5LAoJCQkJcGF5bG9hZHM6IFtyLnJlbWFpbmRlcl0KCQkJfSk7CgkJfQoJfQp9CmFzeW5jIGZ1bmN0aW9uIHJ1bkxlZ2FjeVR1cm5Xb3JrZmxvdyhlKSB7CglsZXQgdCA9IGUuc3RlcElucHV0OwoJdHJ5IHsKCQlmb3IgKDs7KSB7CgkJCWxldCBuID0gYXdhaXQgdHVyblN0ZXAodCk7CgkJCWlmIChuLmFjdGlvbiAhPT0gYGNhbmNlbGxlZGAgJiYgbi5zbGVlcER1cmF0aW9uTXMgIT09IHZvaWQgMCAmJiBhd2FpdCBzbGVlcChuLnNsZWVwRHVyYXRpb25NcyksIG4uYWN0aW9uID09PSBgZG9uZWApIHsKCQkJCWF3YWl0IHNlbmRUdXJuQ29udHJvbFN0ZXAoewoJCQkJCWNvbnRyb2xUb2tlbjogZS5jb21wbGV0aW9uVG9rZW4sCgkJCQkJcGF5bG9hZDogewoJCQkJCQlhY3Rpb246IHsKCQkJCQkJCWtpbmQ6IGBkb25lYCwKCQkJCQkJCW91dHB1dDogbi5vdXRwdXQgPz8gYGAsCgkJCQkJCQlpc0Vycm9yOiBuLmlzRXJyb3IsCgkJCQkJCQlzZXJpYWxpemVkQ29udGV4dDogbi5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQkJCXNlc3Npb25TdGF0ZTogbi5zZXNzaW9uU3RhdGUsCgkJCQkJCQl1c2FnZTogbi51c2FnZSwKCQkJCQkJCXVzYWdlRGVsdGE6IG4udXNhZ2VEZWx0YQoJCQkJCQl9LAoJCQkJCQlraW5kOiBgdHVybi1yZXN1bHRgCgkJCQkJfQoJCQkJfSk7CgkJCQlyZXR1cm47CgkJCX0KCQkJaWYgKG4uYWN0aW9uID09PSBgZGlzcGF0Y2gtd29ya2Zsb3ctcnVudGltZS1hY3Rpb25zYCkgewoJCQkJYXdhaXQgc2VuZFR1cm5Db250cm9sU3RlcCh7CgkJCQkJY29udHJvbFRva2VuOiBlLmNvbXBsZXRpb25Ub2tlbiwKCQkJCQlwYXlsb2FkOiB7CgkJCQkJCWFjdGlvbjogewoJCQkJCQkJa2luZDogYGRpc3BhdGNoLXdvcmtmbG93LXJ1bnRpbWUtYWN0aW9uc2AsCgkJCQkJCQlwZW5kaW5nQWN0aW9uS2V5czogbi5wZW5kaW5nUnVudGltZUFjdGlvbktleXMsCgkJCQkJCQlzZXJpYWxpemVkQ29udGV4dDogbi5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQkJCXNlc3Npb25TdGF0ZTogbi5zZXNzaW9uU3RhdGUKCQkJCQkJfSwKCQkJCQkJa2luZDogYHR1cm4tcmVzdWx0YAoJCQkJCX0KCQkJCX0pOwoJCQkJcmV0dXJuOwoJCQl9CgkJCWlmIChuLmFjdGlvbiA9PT0gYHBhcmtgKSB7CgkJCQlsZXQgdCA9IG4ucGVuZGluZ1J1bnRpbWVBY3Rpb25LZXlzOwoJCQkJaWYgKCEodCAhPT0gdm9pZCAwIHx8IG4uaGFzUGVuZGluZ0F1dGhvcml6YXRpb24gfHwgbi5oYXNQZW5kaW5nSW5wdXRCYXRjaCAmJiBlLmNhcGFiaWxpdGllcz8ucmVxdWVzdElucHV0ID09PSAhMCB8fCBlLm1vZGUgPT09IGBjb252ZXJzYXRpb25gKSkgdGhyb3cgRXJyb3IoVEFTS19NT0RFX1dBSVRfRVJST1JfTUVTU0FHRSk7CgkJCQlsZXQgciA9IHQgPT09IHZvaWQgMCA/IHsKCQkJCQlraW5kOiBgcGFya2AsCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IG4uc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiBuLnNlc3Npb25TdGF0ZSwKCQkJCQlhdXRob3JpemF0aW9uTmFtZXM6IG4uYXV0aG9yaXphdGlvbk5hbWVzLAoJCQkJCXNldHRsZWQ6IG4uc2V0dGxlZAoJCQkJfSA6IHsKCQkJCQlraW5kOiBgZGlzcGF0Y2gtcnVudGltZS1hY3Rpb25zYCwKCQkJCQlwZW5kaW5nQWN0aW9uS2V5czogdCwKCQkJCQlzZXJpYWxpemVkQ29udGV4dDogbi5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQlzZXNzaW9uU3RhdGU6IG4uc2Vzc2lvblN0YXRlCgkJCQl9OwoJCQkJYXdhaXQgc2VuZFR1cm5Db250cm9sU3RlcCh7CgkJCQkJY29udHJvbFRva2VuOiBlLmNvbXBsZXRpb25Ub2tlbiwKCQkJCQlwYXlsb2FkOiB7CgkJCQkJCWFjdGlvbjogciwKCQkJCQkJa2luZDogYHR1cm4tcmVzdWx0YAoJCQkJCX0KCQkJCX0pOwoJCQkJcmV0dXJuOwoJCQl9CgkJCXQgPSB7CgkJCQlpbnB1dDogdm9pZCAwLAoJCQkJcGFyZW50V3JpdGFibGU6IHQu",
	"cGFyZW50V3JpdGFibGUsCgkJCQlzZXJpYWxpemVkQ29udGV4dDogbi5zZXJpYWxpemVkQ29udGV4dCwKCQkJCXNlc3Npb25TdGF0ZTogbi5zZXNzaW9uU3RhdGUKCQkJfTsKCQl9Cgl9IGNhdGNoICh0KSB7CgkJdGhyb3cgYXdhaXQgc2VuZFR1cm5Db250cm9sU3RlcCh7CgkJCWNvbnRyb2xUb2tlbjogZS5jb21wbGV0aW9uVG9rZW4sCgkJCXBheWxvYWQ6IHsKCQkJCWVycm9yOiBub3JtYWxpemVTZXJpYWxpemFibGVFcnJvcih0KSwKCQkJCWtpbmQ6IGB0dXJuLWVycm9yYAoJCQl9CgkJfSksIHQ7Cgl9Cn0KdHVybldvcmtmbG93LndvcmtmbG93SWQgPSAid29ya2Zsb3cvL2V2ZS8vdHVybldvcmtmbG93IjsKZ2xvYmFsVGhpcy5fX3ByaXZhdGVfd29ya2Zsb3dzLnNldCgid29ya2Zsb3cvL2V2ZS8vdHVybldvcmtmbG93IiwgdHVybldvcmtmbG93KTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9jb250ZXh0L2tleS5qcwpjb25zdCBLRVlfUkVHSVNUUllfR0xPQkFMX0tFWSA9IFN5bWJvbC5mb3IoYGV2ZS5jb250ZXh0LWtleS1yZWdpc3RyeWApOwpjb25zdCBnbG9iYWxLZXlSZWdpc3RyeUNvbnRhaW5lciA9IGdsb2JhbFRoaXM7Cmdsb2JhbEtleVJlZ2lzdHJ5Q29udGFpbmVyW0tFWV9SRUdJU1RSWV9HTE9CQUxfS0VZXSA9PT0gdm9pZCAwICYmIChnbG9iYWxLZXlSZWdpc3RyeUNvbnRhaW5lcltLRVlfUkVHSVNUUllfR0xPQkFMX0tFWV0gPSBuZXcgTWFwKCkpOwpjb25zdCBrZXlSZWdpc3RyeSA9IGdsb2JhbEtleVJlZ2lzdHJ5Q29udGFpbmVyW0tFWV9SRUdJU1RSWV9HTE9CQUxfS0VZXTsKdmFyIENvbnRleHRLZXkgPSBjbGFzcyB7CgluYW1lOwoJY29kZWM7Cgljb25zdHJ1Y3RvcihlLCB0ID0ge30pIHsKCQl0aGlzLm5hbWUgPSBlLCB0aGlzLmNvZGVjID0gdC5jb2RlYzsKCQlsZXQgbiA9IGtleVJlZ2lzdHJ5LmdldChlKTsKCQlpZiAobiAhPT0gdm9pZCAwICYmIG4uY29kZWMgPT09IHZvaWQgMCAhPSAodGhpcy5jb2RlYyA9PT0gdm9pZCAwKSkgdGhyb3cgRXJyb3IoYENvbnRleHRLZXkgbmFtZSBjb2xsaXNpb246ICIke2V9IiBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgJHtuLmNvZGVjID8gYHdpdGhgIDogYHdpdGhvdXRgfSBhIGNvZGVjLCBidXQgYSBrZXkgJHt0aGlzLmNvZGVjID8gYHdpdGhgIDogYHdpdGhvdXRgfSBhIGNvZGVjIGlzIGJlaW5nIHJlZ2lzdGVyZWQgdW5kZXIgdGhlIHNhbWUgbmFtZS4gVGhpcyBzaWxlbnRseSBicmVha3MgY29udGV4dCBzZXJpYWxpemF0aW9uIOKAlCB1c2UgYSBkaXN0aW5jdCBuYW1lLmApOwoJCWtleVJlZ2lzdHJ5LnNldChlLCB0aGlzKTsKCX0KfTsKbmV3IENvbnRleHRLZXkoYGV2ZS5hdXRoYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuaW5pdGlhdG9yQXV0aGApOwpuZXcgQ29udGV4dEtleShgZXZlLnNlc3Npb25JZGApOwpuZXcgQ29udGV4dEtleShgZXZlLmNvbnRpbnVhdGlvblRva2VuYCk7CmNvbnN0IENoYW5uZWxSZXF1ZXN0SWRLZXkgPSBuZXcgQ29udGV4dEtleShgZXZlLmNoYW5uZWxSZXF1ZXN0SWRgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5jaGFubmVsSW5zdHJ1bWVudGF0aW9uYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUubW9kZWApOwpuZXcgQ29udGV4dEtleShgZXZlLnBhcmVudFNlc3Npb25gKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5wYXJlbnRUcmFjZUNvbnRleHRgKTsKY29uc3QgU3ViYWdlbnREZXB0aEtleSA9IG5ldyBDb250ZXh0S2V5KGBldmUuc3ViYWdlbnREZXB0aGApOwpuZXcgQ29udGV4dEtleShgZXZlLmNhcGFiaWxpdGllc2ApOwpuZXcgQ29udGV4dEtleShgZXZlLnNlc3Npb25DYWxsYmFja2ApOwpuZXcgQ29udGV4dEtleShgZXZlLnNlc3Npb25gKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5zYW5kYm94YCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbkR5bmFtaWNNb2RlbFJlZmVyZW5jZWApOwpuZXcgQ29udGV4dEtleShgZXZlLnR1cm5EeW5hbWljTW9kZWxSZWZlcmVuY2VgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5saXZlU3RlcER5bmFtaWNNb2RlbFNlbGVjdGlvbmApOwpuZXcgQ29udGV4dEtleShgZXZlLnNlc3Npb25EeW5hbWljVG9vbE1ldGFkYXRhYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbkR5bmFtaWNUb29sUnVudGltZVJldmlzaW9uYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUudHVybkR5bmFtaWNUb29sTWV0YWRhdGFgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5saXZlU3RlcFRvb2xzYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbkR5bmFtaWNTdWJhZ2VudFNlbGVjdGlvbnNgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS50dXJuRHluYW1pY1N1YmFnZW50U2VsZWN0aW9uc2ApOwpuZXcgQ29udGV4dEtleShgZXZlLnNlc3Npb25EeW5hbWljU3ViYWdlbnRSdW50aW1lUmV2aXNpb25gKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5keW5hbWljU3ViYWdlbnRBZ2VudENvbmZpZ2ApOwpuZXcgQ29udGV4dEtleShgZXZlLmR5bmFtaWNTa2lsbE1hbmlmZXN0YCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbkR5bmFtaWNJbnN0cnVjdGlvbnNgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS50dXJuRHluYW1pY0luc3RydWN0aW9uc2ApOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2hhcm5lc3Mvc3ViYWdlbnQtZGVwdGguanMKZnVuY3Rpb24gcmVhZFNlcmlhbGl6ZWRTdWJhZ2VudERlcHRoKHQpIHsKCWxldCBuID0gcGFyc2VTdWJhZ2VudERlcHRoKHRbU3ViYWdlbnREZXB0aEtleS5uYW1lXSk7CglyZXR1cm4gbiA9PT0gMCA/IHZvaWQgMCA6IG47Cn0KZnVuY3Rpb24gcGFyc2VTdWJhZ2VudERlcHRoKGUpIHsKCXJldHVybiB0eXBlb2YgZSA9PSBgbnVtYmVyYCAmJiBOdW1iZXIuaXNJbnRlZ2VyKGUpICYmIGUgPiAwID8gZSA6IDA7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9zaGFyZWQvZ3VhcmRzLmpzCmZ1bmN0aW9uIGlzT2JqZWN0KGUpIHsKCXJldHVybiB0eXBlb2YgZSA9PSBgb2JqZWN0YCAmJiAhIWUgJiYgIUFycmF5LmlzQXJyYXkoZSk7Cn0KZnVuY3Rpb24gaXNOb25FbXB0eVN0cmluZyhlKSB7CglyZXR1cm4gdHlwZW9mIGUgPT0gYHN0cmluZ2AgJiYgZS5sZW5ndGggPiAwOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2V2ZS13b3JrZmxvdy1hdHRyaWJ1dGVzLmpzCmZ1bmN0aW9uIHJlYWRQYXJlbnRMaW5lYWdlKGUpIHsKCWxldCBuID0gZVtgZXZlLnBhcmVudFNlc3Npb25gXSwgciA9IG4/LmNhbGxJZCwgaSA9IG4/LnJvb3RTZXNzaW9uSWQsIGEgPSBuPy5zZXNzaW9uSWQsIG8gPSBuPy50dXJuPy5pZDsKCXJldHVybiB7CgkJY2FsbElkOiBpc05vbkVtcHR5U3RyaW5nKHIpID8gciA6IHZvaWQgMCwKCQlyb290U2Vzc2lvbklkOiBpc05vbkVtcHR5U3RyaW5nKGkpID8gaSA6IHZvaWQgMCwKCQlzZXNzaW9uSWQ6IGlzTm9uRW1wdHlTdHJpbmcoYSkgPyBhIDogdm9pZCAwLAoJCXR1cm5JZDogaXNOb25FbXB0eVN0cmluZyhvKSA/IG8gOiB2b2lkIDAKCX07Cn0KZnVuY3Rpb24gcmVhZFJvb3RTZXNzaW9uSWQoZSkgewoJcmV0dXJuIHJlYWRQYXJlbnRMaW5lYWdlKGUpLnJvb3RTZXNzaW9uSWQ7Cn0KZnVuY3Rpb24gcmVhZENoYW5uZWxSZXF1ZXN0SWQobikgewoJbGV0IHIgPSBuW0NoYW5uZWxSZXF1ZXN0SWRLZXkubmFtZV07CglyZXR1cm4gaXNOb25FbXB0eVN0cmluZyhyKSA/IHIgOiB2b2lkIDA7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZGVsZWdhdGVkLXBhcmVudC1ub3RpZmljYXRpb24uanMKdmFyIG5vdGlmeURlbGVnYXRlZFBhcmVudFN0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4zMC44Ly9ub3RpZnlEZWxlZ2F0ZWRQYXJlbnRTdGVwIik7CnZhciBub3RpZnlUdXJuQ2FsbGVyU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL25vdGlmeVR1cm5DYWxsZXJTdGVwIik7CnZhciByZXNvbHZlSW5pdGlhbFR1cm5DYWxsZXJTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMzAuOC8vcmVzb2x2ZUluaXRpYWxUdXJuQ2FsbGVyU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL3NoYXJlZC9lcnJvcnMuanMKZnVuY3Rpb24gdG9FcnJvck1lc3NhZ2UodCkgewoJcmV0dXJuIHQgaW5zdGFuY2VvZiBFcnJvciA/IHQubWVzc2FnZSA6IHR5cGVvZiB0ID09IGBzdHJpbmdgID8gdCA6IHQgPT0gbnVsbCA/IFN0cmluZyh0KSA6IGlzT2JqZWN0KHQpID8gdHlwZW9mIHQubWVzc2FnZSA9PSBgc3RyaW5nYCAmJiB0Lm1lc3NhZ2UubGVuZ3RoID4gMCA/IHQubWVzc2FnZSA6IHNhZmVKc29uU3RyaW5naWZ5KHQpIDogU3RyaW5nKHQpOwp9CmZ1bmN0aW9uIHNhZmVKc29uU3RyaW5naWZ5KGUpIHsKCXRyeSB7CgkJcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpID8/IFN0cmluZyhlKTsKCX0gY2F0Y2ggewoJCXJldHVybiBTdHJpbmcoZSk7Cgl9Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9oYXJuZXNzL2FnZW50LWhhbmRsZS1lcnJvcnMuanMKY29uc3QgU1VCQUdFTlRfRVhFQ1VUSU9OX0ZBSUxFRCA9IGBTVUJBR0VOVF9FWEVDVVRJT05fRkFJTEVEYDsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vc3ViYWdlbnQtYWRhcHRlci1zdGF0ZS5qcwpjb25zdCBTVUJBR0VOVF9BREFQVEVSX0tJTkQgPSBgc3ViYWdlbnRgOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9kZWxlZ2F0ZWQtcGFyZW50LXJlc3VsdC5qcwpjb25zdCBaRVJPX1RPS0VOX1VTQUdFID0gewoJY2FjaGVSZWFkVG9rZW5zOiAwLAoJY2FjaGVXcml0ZVRva2VuczogMCwKCWlucHV0VG9rZW5zOiAwLAoJb3V0cHV0VG9rZW5zOiAwCn07CmZ1bmN0aW9uIGNyZWF0ZURlbGVnYXRlZFN1YmFnZW50U3VjY2Vzc1Jlc3VsdChlLCB0KSB7CglsZXQgciA9IGVbYGV2ZS5jaGFubmVsYF07CglpZiAocj8ua2luZCA9PT0gU1VCQUdFTlRfQURBUFRFUl9LSU5EKSByZXR1cm4gewoJCWNhbGxJZDogU3RyaW5nKHIuc3RhdGU/LmNhbGxJZCA/PyBgYCksCgkJa2luZDogYHN1YmFnZW50LXJlc3VsdGAsCgkJb3JpZ2luOiBgY2hpbGRgLAoJCW91dGNvbWU6IHsKCQkJa2luZDogYHRlcm1pbmFsYCwKCQkJcmVzdWx0OiB7CgkJCQlraW5kOiBgc3VjY2VlZGVkYCwKCQkJCW91dHB1dDogdAoJCQl9LAoJCQl1c2FnZURlbHRhOiBaRVJPX1RPS0VOX1VTQUdFCgkJfSwKCQlvdXRwdXQ6IHQsCgkJc3ViYWdlbnROYW1lOiBTdHJpbmcoci5zdGF0ZT8uc3ViYWdlbnROYW1lID8/IGBgKQoJfTsKfQpmdW5jdGlvbiBjcmVhdGVEZWxlZ2F0ZWRTdWJhZ2VudEVycm9yUmVzdWx0KG4sIHIpIHsKCWxldCBpID0gY3JlYXRlRGVsZWdhdGVkU3ViYWdlbnRTdWNjZXNzUmVzdWx0KG4sIGBgKTsKCWlmIChpID09PSB2b2lkIDApIHJldHVybjsKCWxldCBhID0gewoJCWNvZGU6IFNVQkFHRU5UX0VYRUNVVElPTl9GQUlMRUQsCgkJbWVzc2FnZTogdG9FcnJvck1lc3NhZ2UocikKCX07CglyZXR1cm4gewoJCS4uLmksCgkJaXNFcnJvcjogITAsCgkJb3V0Y29tZTogewoJCQlraW5kOiBgdGVybWluYWxgLAoJCQlyZXN1bHQ6IHsKCQkJCWVycm9yOiBhLAoJCQkJa2luZDogYGZhaWxlZGAKCQkJfSwKCQkJdXNhZ2VEZWx0YTogWkVST19UT0tFTl9VU0FHRQoJCX0sCgkJb3V0cHV0OiBhCgl9Owp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3BhcmtlZC1kZWxpdmVyeS13YWl0LmpzCmFzeW5jIGZ1bmN0aW9uIG5leHRUdXJuRGVsaXZlcnkoZSkgewoJZm9yICg7OykgewoJCWxldCBuID0gYXdhaXQgd2FpdEZvck5leHRTZXNzaW9uQWN0aW9uKHsKCQkJYnVmZmVyZWREZWxpdmVyaWVzOiBlLmJ1ZmZlcmVkRGVsaXZlcmllcywKCQkJYnVmZmVyZWRTZXNzaW9uQ29udHJvbHM6IGUuYnVmZmVyZWRTZXNzaW9uQ29udHJvbHMsCgkJCWNvbW1hbmRJbmJveDogZS5jb21tYW5kSW5ib3gKCQl9KTsKCQlpZiAobi5raW5kICE9PSBgZGVsaXZlcnlgKSByZXR1cm4geyBraW5kOiBuLmtpbmQgfTsKCQlsZXQgciA9IG4uZGVsaXZlcnk7CgkJaWYgKHIgPT09IG51bGwpIHJldHVybiB7IGtpbmQ6IGBjbG9zZWRgIH07CgkJbGV0IGkgPSBhd2FpdCByb3V0ZURlbGl2ZXJUb0NoaWxkcmVuKHsKCQkJYXV0aDogci5hdXRoLAoJCQlwYXJlbnRXcml0YWJsZTogZS5kcml2ZXJXcml0YWJsZSwKCQkJcGF5bG9hZHM6IHIucGF5bG9hZHMsCgkJCXNlc3Npb25TdGF0ZTogZS5zZXNzaW9uU3RhdGUKCQl9KTsKCQlpZiAoaS5raW5kID09PSBgY2FuY2VsLXR1cm5gKSByZXR1cm4geyBraW5kOiBgY2FuY2VsLXR1cm5gIH07CgkJaWYgKGkucmVtYWluZGVyICE9PSB2b2lkIDApIHJldHVybiB7CgkJCWRlbGl2ZXI6IHIsCgkJCWtpbmQ6IGB0dXJuYCwKCQkJcmVtYWluZGVyOiBpLnJlbWFpbmRlcgoJCX07Cgl9Cn0KYXN5bmMgZnVuY3Rpb24gd2FpdEZvck5leHRTZXNzaW9uQWN0aW9uKGUpIHsKCWxldCB0ID0gZS5idWZmZXJlZFNlc3Npb25Db250cm9scy5zaGlmdCgpOwoJaWYgKHQgIT09IHZvaWQgMCkgcmV0dXJuIHsga2luZDogdCB9OwoJaWYgKGUuYnVmZmVyZWREZWxpdmVyaWVzLmxlbmd0aCA+IDApIHJldHVybiB7CgkJZGVsaXZlcnk6IHRha2VCdWZmZXJlZFR1cm5EZWxpdmVyeShlLmJ1ZmZlcmVkRGVsaXZlcmllcyksCgkJa2luZDogYGRlbGl2ZXJ5YAoJfTsKCWZvciAoOzspIHsKCQlsZXQgdCA9IGF3YWl0IGUuY29tbWFuZEluYm94Lm5leHQoKTsKCQlpZiAoZS5jb21tYW5kSW5ib3guY29uc3VtZU5leHQoKSwgdC5kb25lKSByZXR1cm4gewoJCQlkZWxpdmVyeTogbnVsbCwKCQkJa2luZDogYGRlbGl2ZXJ5YAoJCX07CgkJaWYgKHQudmFsdWUua2luZCA9PT0gYHNlc3Npb24tdGltZW91dGApIHJldHVybiB7IGtpbmQ6IGBleHBpcmVkYCB9OwoJCWlmICh0LnZhbHVlLmtpbmQgPT09IGBjbGVhcmAgfHwgdC52YWx1ZS5raW5kID09PSBgY29tcGFjdGAgfHwgdC52YWx1ZS5raW5kID09PSBgcmVzZXRgKSByZXR1cm4geyBraW5kOiB0LnZhbHVlLmtpbmQgfTsKCQlpZiAodC52YWx1ZS5raW5kICE9PSBgY2FuY2VsYCkgcmV0dXJuIHsKCQkJZGVsaXZlcnk6IGNvbW1hbmRUb0RlbGl2ZXJ5JDEodC52YWx1ZSksCgkJCWtpbmQ6IGBkZWxpdmVyeWAKCQl9OwoJfQp9CmZ1bmN0aW9uIGNvbW1hbmRUb0RlbGl2ZXJ5JDEoZSkgewoJcmV0dXJuIHsKCQlhdXRoOiBlLmF1dGgsCgkJY2FsbGVyOiBlLmNhbGxlciwKCQlraW5kOiBgZGVsaXZlcmAsCgkJcGF5bG9hZHM6IFtlLnBheWxvYWRdLAoJCXJlcXVlc3RJZDogZS5yZXF1ZXN0SWQKCX07Cn0KZnVuY3Rpb24gdGFrZUJ1ZmZlcmVkVHVybkRlbGl2ZXJ5KHQpIHsKCWxldCBuID0gdC5zaGlmdCgpOwoJaWYgKG4gPT09IHZvaWQgMCkgdGhyb3cgRXJyb3IoYENhbm5vdCB0YWtlIGEgdHVybiBkZWxpdmVyeSBmcm9tIGFuIGVtcHR5IGJ1ZmZlci5gKTsKCWxldCByID0gW25dLCBpID0gbi5jYWxsZXI7Cglmb3IgKDsgdC5sZW5ndGggPiAwOykgewoJCWxldCBlID0gdFswXTsKCQlpZiAoZSA9PT0gdm9pZCAwIHx8IGkgIT09IHZvaWQgMCAmJiBlLmNhbGxlciAhPT0gdm9pZCAwKSBicmVhazsKCQlsZXQgbiA9IHQuc2hpZnQoKTsKCQlpZiAobiA9PT0gdm9pZCAwKSB0aHJvdyBFcnJvcihgQnVmZmVyZWQgdHVybiBkZWxpdmVyeSBkaXNhcHBlYXJlZCB3aGlsZSBwYXJ0aXRpb25pbmcuYCk7CgkJci5wdXNoKG4pLCBpID8/PSBuLmNhbGxlcjsKCX0KCXJldHVybiBjb2FsZXNjZURlbGl2ZXJpZXMocik7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZm9yd2FyZC10dXJuLWNhbmNlbGxhdGlvbi1zdGVwLmpzCnZhciBmb3J3YXJkVHVybkNhbmNlbGxhdGlvblN0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4zMC44Ly9mb3J3YXJkVHVybkNhbmNlbGxhdGlvblN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZm9yd2FyZC10dXJuLWRlbGl2ZXJ5LXN0ZXAuanMKdmFyIGZvcndhcmRUdXJuRGVsaXZlcnlTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMzAuOC8vZm9yd2FyZFR1cm5EZWxpdmVyeVN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdHVybi1jb250cm9sLXJlY2VpdmVyLmpzCnZhciBUdXJuQ29udHJvbFJlY2VpdmVyID0gY2xhc3MgewoJYnVmZmVyZWREZWxpdmVyaWVzOwoJYnVmZmVyZWRTZXNzaW9uQ29udHJvbHM7Cgljb21tYW5kSW5ib3g7Cgljb250cm9sOwoJY29udHJvbEl0ZXJhdG9yOwoJcGVuZGluZ0NvbnRyb2wgPSBudWxsOwoJY29uc3RydWN0b3IodCkgewoJCXRoaXMuYnVmZmVyZWREZWxpdmVyaWVzID0gdC5idWZmZXJlZERlbGl2ZXJpZXMsIHRoaXMuYnVmZmVyZWRTZXNzaW9uQ29udHJvbHMgPSB0LmJ1ZmZlcmVkU2Vzc2lvbkNvbnRyb2xzLCB0aGlzLmNvbW1hbmRJbmJveCA9IHQuY29tbWFuZEluYm94LCB0aGlzLmNvbnRyb2wgPSBjcmVhdGVIb29rKHsgdG9rZW46IHQudG9rZW4gfSksIHRoaXMuY29udHJvbEl0ZXJhdG9yID0gdGhpcy5jb250cm9sW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpOwoJfQoJZ2V0IHRva2VuKCkgewoJCXJldHVybiB0aGlzLmNvbnRyb2wudG9rZW47Cgl9Cglhc3luYyBkaXNwb3NlKCkgewoJCWF3YWl0IGNsb3NlSG9va0l0ZXJhdG9yKHRoaXMuY29udHJvbEl0ZXJhdG9yKSwgYXdhaXQgZGlzcG9zZUhvb2sodGhpcy5jb250cm9sKTsKCX0KCWFzeW5jIHdhaXRGb3JBY3Rpb24oKSB7CgkJZm9yICg7OykgewoJCQlsZXQgZSA9IGF3YWl0IHRoaXMubmV4dENvbnRyb2xPckNvbW1hbmQoKTsKCQkJaWYgKGUua2luZCA9PT0gYGNvbW1hbmRgKSB7CgkJCQlsZXQgdCA9IGF3YWl0IHRoaXMuaGFuZGxlU2Vzc2lvbkNvbW1hbmQoZS5jb21tYW5kKTsKCQkJCWlmICh0ICE9PSB2b2lkIDApIHJldHVybiB0OwoJCQkJY29udGludWU7CgkJCX0KCQkJbGV0IHQgPSBlLnBheWxvYWQsIG4gPSB0aGlzLnJlYWRUZXJtaW5hbENvbnRyb2wodCk7CgkJCWlmIChuICE9PSB2b2lkIDApIHJldHVybiBuOwoJCQlpZiAodC5raW5kID09PSBgdHVybi1kZWxpdmVyeS1yZXF1ZXN0YCkgewoJCQkJbGV0IGUgPSBhd2FpdCB0aGlzLnNlcnZpY2VEZWxpdmVyeVJlcXVlc3QodCk7CgkJCQlpZiAoZSAhPT0gdm9pZCAwKSByZXR1cm4gZTsKCQkJfQoJCX0KCX0KCWFzeW5jIGhhbmRsZVNlc3Npb25Db21tYW5kKGUpIHsKCQlpZiAoZS5raW5kID09PSBgc2VuZGApIHsKCQkJdGhpcy5idWZmZXJlZERlbGl2ZXJpZXMucHVzaChjb21tYW5kVG9EZWxpdmVyeShlKSk7CgkJCXJldHVybjsKCQl9CgkJaWYgKGUua2luZCA9PT0gYGNsZWFyYCB8fCBlLmtpbmQgPT09IGBjb21wYWN0YCkgewoJCQl0aGlzLmJ1ZmZlcmVkU2Vzc2lvbkNvbnRyb2xzLnB1c2goZS5raW5kKTsKCQkJcmV0dXJuOwoJCX0KCQlpZiAoZS5raW5kID09PSBgc2Vzc2lvbi10aW1lb3V0YCkgewoJCQl0aGlzLmJ1ZmZlcmVkU2Vzc2lvbkNvbnRyb2xzLnB1c2goYGV4cGlyZWRgKTsKCQkJcmV0dXJuOwoJCX0KCQlpZiAoZS5raW5kID09PSBgY2FuY2VsYCkgewoJCQlhd2FpdCBmb3J3YXJkVHVybkNhbmNlbGxhdGlvblN0ZXAoewoJCQkJcGF5bG9hZDogZS50dXJuSWQgPT09IHZvaWQgMCA/IHt9IDogeyB0dXJuSWQ6IGUudHVybklkIH0sCgkJCQl0b2tlbjogdHVybkNhbmNlbGxhdGlvbkhvb2tUb2tlbih0aGlzLmNvbnRyb2wudG9rZW4pCgkJCX0pOwoJCQlyZXR1cm47CgkJfQoJCWlmIChlLmtpbmQgPT09IGByZXNldGApIHsKCQkJYXdhaXQgZm9yd2FyZFR1cm5DYW5jZWxsYXRpb25TdGVwKHsKCQkJCXBheWxvYWQ6IHt9LAoJCQkJdG9rZW46IHR1cm5DYW5jZWxsYXRpb25Ib29rVG9rZW4odGhpcy5jb250cm9sLnRva2VuKQoJCQl9KSwgdGhpcy5idWZmZXJlZFNlc3Npb25Db250cm9scy5wdXNoKGByZXNldGApOwoJCQlyZXR1cm47CgkJfQoJCXJldHVybiB1bnN1cHBvcnRlZFNlc3Npb25Db21tYW5kKGUpOwoJfQoJYnVmZmVyVHVybkRlbGl2ZXJpZXMoZSkgewoJCWUuYnVmZmVyZWREZWxpdmVyaWVzICE9PSB2b2lkIDAgJiYgdGhpcy5idWZmZXJlZERlbGl2ZXJpZXMudW5zaGlmdCguLi5lLmJ1ZmZlcmVkRGVsaXZlcmllcyk7Cgl9Cgljb25zdW1lQ29udHJvbCgpIHsKCQl0aGlzLnBlbmRpbmdDb250cm9sID0gbnVsbDsKCX0KCWdldENvbnRyb2xQcm9taXNlKCkgewoJCXJldHVybiB0aGlzLnBlbmRpbmdDb250cm9sID8/PSB0aGlzLmNvbnRyb2xJdGVyYXRvci5uZXh0KCksIHRoaXMucGVuZGluZ0NvbnRyb2w7Cgl9Cglhc3luYyBuZXh0Q29udHJvbE9yQ29tbWFuZCgpIHsKCQlsZXQgZSA9IGF3YWl0IFByb21pc2UucmFjZShbdGhpcy5nZXRDb250cm9sUHJvbWlzZSgpLnRoZW4oKGUpID0+ICh7CgkJCWtpbmQ6IGBjb250cm9sYCwKCQkJdmFsdWU6IGUKCQl9KSksIHRoaXMuY29tbWFuZEluYm94Lm5leHQoKS50aGVuKChlKSA9PiAoewoJCQlraW5kOiBgY29tbWFuZGAsCgkJCXZhbHVlOiBlCgkJfSkpXSk7CgkJaWYgKGUua2luZCA9PT0gYGNvbW1hbmRgKSB7CgkJCWlmIChlLnZhbHVlLmRvbmUpIHRocm93IEVycm9yKGBTZXNzaW9uIGNvbW1hbmQgaW5ib3ggY2xvc2VkIGJlZm9yZSB0aGUgYWN0aXZlIHR1cm4gc2V0dGxlZC5gKTsKCQkJcmV0dXJuIHRoaXMuY29tbWFuZEluYm94LmNvbnN1bWVOZXh0KCksIHsKCQkJCWNvbW1hbmQ6IGUudmFsdWUudmFsdWUsCgkJCQlraW5kOiBgY29tbWFuZGAKCQkJfTsKCQl9CgkJaWYgKHRoaXMuY29uc3VtZUNvbnRyb2woKSwgZS52YWx1ZS5kb25lKSB0aHJvdyBFcnJvcihgVHVybiBjb250cm9sIGhvb2sgY2xvc2VkIGJlZm9yZSBkZWxpdmVyaW5nIGEgcmVzdWx0LmApOwoJCWxldCB0ID0gZS52YWx1ZS52YWx1ZTsKCQlpZiAodC5raW5kID09PSBgdHVybi1lcnJvcmApIHRocm93IHJlYnVpbGRTZXJpYWxpemFibGVFcnJvcih0LmVycm9yKTsKCQlyZXR1cm4gdC5raW5kID09PSBgdHVybi1jb250aW51YXRpb24tdG9rZW5gID8gKGF3YWl0IHRoaXMuY29tbWFuZEluYm94LnJla2V5Q29udGludWF0aW9uKHQuY29udGludWF0aW9uVG9rZW4pLCBhd2FpdCB0aGlzLm5leHRDb250cm9sT3JDb21tYW5kKCkpIDogewoJCQlraW5kOiBgY29udHJvbGAsCgkJCXBheWxvYWQ6IHQKCQl9OwoJfQoJcmVhZFRlcm1pbmFsQ29udHJvbChlKSB7CgkJaWYgKGUua2luZCA9PT0gYHR1cm4tZXJyb3JgKSB0aHJvdyByZWJ1aWxkU2VyaWFsaXphYmxlRXJyb3IoZS5lcnJvcik7CgkJaWYgKGUua2luZCA9PT0gYHR1cm4tcmVzdWx0YCkgcmV0dXJuIHRoaXMuYnVmZmVyVHVybkRlbGl2ZXJpZXMoZSksIGUuYWN0aW9uOwoJfQoJYXN5bmMgc2VydmljZURlbGl2ZXJ5UmVxdWVzdChlKSB7CgkJYXdhaXQgdGhpcy5jb21tYW5kSW5ib3gucmVrZXlDb250aW51YXRpb24oZS5jb250aW51YXRpb25Ub2tlbik7CgkJbGV0IHQgPSB0aGlzLmJ1ZmZlcmVkRGVsaXZlcmllcy5zaGlmdCgpOwoJCWZvciAoOyB0ID09PSB2b2lkIDA7KSB7CgkJCWxldCBuID0gYXdhaXQgUHJvbWlzZS5yYWNlKFt0aGlzLmdldENvbnRyb2xQcm9taXNlKCkudGhlbigoZSkgPT4gKHsKCQkJCWtpbmQ6IGBjb250cm9sYCwKCQkJCXZhbHVlOiBlCgkJCX0pKSwgdGhpcy5jb21tYW5kSW5ib3gubmV4dCgpLnRoZW4oKGUpID0+ICh7CgkJCQlraW5kOiBgY29tbWFuZGAsCgkJCQl2YWx1ZTogZQoJCQl9KSldKTsKCQkJaWYgKG4ua2luZCA9PT0gYGNvbnRyb2xgKSB7CgkJCQlpZiAodGhpcy5jb25zdW1lQ29udHJvbCgpLCBuLnZhbHVlLmRvbmUpIHRocm93IEVycm9yKGBUdXJuIGNvbnRyb2wgaG9vayBjbG9zZWQgZHVyaW5nIGEgZGVsaXZlcnkgcmVxdWVzdC5gKTsKCQkJCWlmIChuLnZhbHVlLnZhbHVlLmtpbmQgPT09IGB0dXJuLWNvbnRpbnVhdGlvbi10b2tlbmApIHsKCQkJCQlhd2FpdCB0aGlzLmNvbW1hbmRJbmJveC5yZWtleUNvbnRpbnVhdGlvbihuLnZhbHVlLnZhbHVlLmNvbnRpbnVhdGlvblRva2VuKTsKCQkJCQljb250aW51ZTsKCQkJCX0KCQkJCWxldCB0ID0gdGhpcy5yZWFkVGVybWluYWxDb250cm9sKG4udmFsdWUudmFsdWUpOwoJCQkJaWYgKHQgIT09IHZvaWQgMCkgcmV0dXJuIHQ7CgkJCQlpZiAobi52YWx1ZS52YWx1ZS5raW5kID09PSBgdHVybi1kZWxpdmVyeS1jYW5jZWxsZWRgICYmIG4udmFsdWUudmFsdWUucmVxdWVzdElkID09PSBlLnJlcXVlc3RJZCkgcmV0dXJuOwoJCQkJ",
	"Y29udGludWU7CgkJCX0KCQkJaWYgKG4udmFsdWUuZG9uZSkgdGhyb3cgRXJyb3IoYFNlc3Npb24gY29tbWFuZCBpbmJveCBjbG9zZWQgZHVyaW5nIGEgdHVybiBkZWxpdmVyeSByZXF1ZXN0LmApOwoJCQlpZiAodGhpcy5jb21tYW5kSW5ib3guY29uc3VtZU5leHQoKSwgbi52YWx1ZS52YWx1ZS5raW5kID09PSBgc2VuZGApIHsKCQkJCXQgPSBjb21tYW5kVG9EZWxpdmVyeShuLnZhbHVlLnZhbHVlKTsKCQkJCWNvbnRpbnVlOwoJCQl9CgkJCWxldCByID0gYXdhaXQgdGhpcy5oYW5kbGVTZXNzaW9uQ29tbWFuZChuLnZhbHVlLnZhbHVlKTsKCQkJaWYgKHIgIT09IHZvaWQgMCkgcmV0dXJuIHI7CgkJfQoJCXRyeSB7CgkJCWF3YWl0IGZvcndhcmRUdXJuRGVsaXZlcnlTdGVwKHsKCQkJCWluYm94VG9rZW46IGUuaW5ib3hUb2tlbiwKCQkJCXBheWxvYWQ6IHsKCQkJCQlkZWxpdmVyeTogdCwKCQkJCQlraW5kOiBgZHJpdmVyLWRlbGl2ZXJ5YCwKCQkJCQlyZXF1ZXN0SWQ6IGUucmVxdWVzdElkCgkJCQl9CgkJCX0pOwoJCX0gY2F0Y2ggKGUpIHsKCQkJaWYgKCEoZSBpbnN0YW5jZW9mIEVycm9yICYmIGUubmFtZSA9PT0gYEhvb2tOb3RGb3VuZEVycm9yYCkpIHRocm93IGU7CgkJfQoJCXJldHVybiBhd2FpdCB0aGlzLmF3YWl0Rm9yd2FyZGVkRGVsaXZlcnkoZS5yZXF1ZXN0SWQsIHQpOwoJfQoJYXN5bmMgYXdhaXRGb3J3YXJkZWREZWxpdmVyeShlLCB0KSB7CgkJZm9yICg7OykgewoJCQlsZXQgbiA9IGF3YWl0IHRoaXMubmV4dENvbnRyb2xPckNvbW1hbmQoKTsKCQkJaWYgKG4ua2luZCA9PT0gYGNvbW1hbmRgKSB7CgkJCQlsZXQgZSA9IGF3YWl0IHRoaXMuaGFuZGxlU2Vzc2lvbkNvbW1hbmQobi5jb21tYW5kKTsKCQkJCWlmIChlICE9PSB2b2lkIDApIHJldHVybiB0aGlzLmJ1ZmZlcmVkRGVsaXZlcmllcy51bnNoaWZ0KHQpLCBlOwoJCQkJY29udGludWU7CgkJCX0KCQkJbGV0IHIgPSBuLnBheWxvYWQ7CgkJCWlmIChyLmtpbmQgPT09IGB0dXJuLWRlbGl2ZXJ5LWFjY2VwdGVkYCkgewoJCQkJaWYgKHIucmVxdWVzdElkID09PSBlKSByZXR1cm47CgkJCQljb250aW51ZTsKCQkJfQoJCQlpZiAoci5raW5kID09PSBgdHVybi1kZWxpdmVyeS1jYW5jZWxsZWRgICYmIHIucmVxdWVzdElkID09PSBlKSB7CgkJCQl0aGlzLmJ1ZmZlcmVkRGVsaXZlcmllcy51bnNoaWZ0KHQpOwoJCQkJcmV0dXJuOwoJCQl9CgkJCXIua2luZCA9PT0gYHR1cm4tcmVzdWx0YCAmJiB0aGlzLmJ1ZmZlcmVkRGVsaXZlcmllcy51bnNoaWZ0KHQpOwoJCQlsZXQgaSA9IHRoaXMucmVhZFRlcm1pbmFsQ29udHJvbChyKTsKCQkJaWYgKGkgIT09IHZvaWQgMCkgcmV0dXJuIGk7CgkJfQoJfQp9OwpmdW5jdGlvbiB1bnN1cHBvcnRlZFNlc3Npb25Db21tYW5kKGUpIHsKCXRocm93IEVycm9yKGBVbnN1cHBvcnRlZCBzZXNzaW9uIGNvbW1hbmQ6ICR7SlNPTi5zdHJpbmdpZnkoZSl9YCk7Cn0KZnVuY3Rpb24gY29tbWFuZFRvRGVsaXZlcnkoZSkgewoJcmV0dXJuIHsKCQlhdXRoOiBlLmF1dGgsCgkJY2FsbGVyOiBlLmNhbGxlciwKCQlraW5kOiBgZGVsaXZlcmAsCgkJcGF5bG9hZHM6IFtlLnBheWxvYWRdLAoJCXJlcXVlc3RJZDogZS5yZXF1ZXN0SWQKCX07Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdHVybi1kaXNwYXRjaC5qcwphc3luYyBmdW5jdGlvbiBkaXNwYXRjaEFuZEF3YWl0VHVybih0KSB7CglsZXQgbiA9IG5ldyBUdXJuQ29udHJvbFJlY2VpdmVyKHsKCQlidWZmZXJlZERlbGl2ZXJpZXM6IHQuYnVmZmVyZWREZWxpdmVyaWVzLAoJCWJ1ZmZlcmVkU2Vzc2lvbkNvbnRyb2xzOiB0LmJ1ZmZlcmVkU2Vzc2lvbkNvbnRyb2xzLAoJCWNvbW1hbmRJbmJveDogdC5jb21tYW5kSW5ib3gsCgkJdG9rZW46IHQuY29udHJvbFRva2VuCgl9KTsKCXRyeSB7CgkJcmV0dXJuIGF3YWl0IGRpc3BhdGNoVHVyblN0ZXAoewoJCQljYXBhYmlsaXRpZXM6IHQuY2FwYWJpbGl0aWVzLAoJCQljb21wbGV0aW9uVG9rZW46IG4udG9rZW4sCgkJCWRlbGl2ZXJ5OiB0LmRlbGl2ZXJ5LAoJCQltb2RlOiB0Lm1vZGUsCgkJCXBhcmVudFdyaXRhYmxlOiB0LnBhcmVudFdyaXRhYmxlLAoJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dCwKCQkJc2Vzc2lvblN0YXRlOiB0LnNlc3Npb25TdGF0ZQoJCX0pLCB7CgkJCWFjdGlvbjogYXdhaXQgbi53YWl0Rm9yQWN0aW9uKCksCgkJCWRpc3Bvc2U6ICgpID0+IG4uZGlzcG9zZSgpCgkJfTsKCX0gY2F0Y2ggKGUpIHsKCQl0aHJvdyBhd2FpdCBuLmRpc3Bvc2UoKSwgZTsKCX0KfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9jcmVhdGUtc2Vzc2lvbi1zdGVwLmpzCnZhciBjcmVhdGVTZXNzaW9uU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL2NyZWF0ZVNlc3Npb25TdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3NldHRsZS1jYW5jZWxsZWQtdHVybi1zdGVwLmpzCnZhciBzZXR0bGVDYW5jZWxsZWRUdXJuU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL3NldHRsZUNhbmNlbGxlZFR1cm5TdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3Rlcm1pbmFsLXNlc3Npb24tZmFpbHVyZS1zdGVwLmpzCnZhciBlbWl0VGVybWluYWxTZXNzaW9uRmFpbHVyZVN0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4zMC44Ly9lbWl0VGVybWluYWxTZXNzaW9uRmFpbHVyZVN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vc2Vzc2lvbi1jYWxsYmFjay1zdGVwLmpzCnZhciBmaXJlU2Vzc2lvbkNhbGxiYWNrU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL2ZpcmVTZXNzaW9uQ2FsbGJhY2tTdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3Nlc3Npb24tY29tbWFuZC1pbmJveC5qcwpmdW5jdGlvbiBjcmVhdGVTZXNzaW9uQ29tbWFuZEluYm94KCkgewoJbGV0IHIsIGksIGEgPSBbXSwgbyA9IFtdLCBzID0gMCwgYyA9IG51bGwsIGwsIHUsIGVucXVldWUgPSAoZSkgPT4gewoJCW8ucHVzaChlKSwgby5zb3J0KChlLCB0KSA9PiBlLm9yZGVyIC0gdC5vcmRlciksIHU/LigpLCB1ID0gdm9pZCAwOwoJfSwgYXJtID0gKGUpID0+IHsKCQllLmNsb3NlZCB8fCBlLnBlbmRpbmcgfHwgKGUucGVuZGluZyA9ICEwLCBlLnJlc29sdmVkID0gdm9pZCAwLCAoZS5yZXRpcmVkID8gUHJvbWlzZS5yZXNvbHZlKGUuaG9vaykudGhlbigoZSkgPT4gKHsKCQkJZG9uZTogITEsCgkJCXZhbHVlOiBlCgkJfSkpIDogZS5pdGVyYXRvci5uZXh0KCkpLnRoZW4oKHQpID0+IHsKCQkJbGV0IG4gPSB7CgkJCQlvcmRlcjogcysrLAoJCQkJcmVzdWx0OiB0LAoJCQkJc3RhdGU6IGUKCQkJfTsKCQkJZS5yZXNvbHZlZCA9IG4sIGUuZW5hYmxlZCAmJiBlbnF1ZXVlKG4pOwoJCX0sICgpID0+IHt9KSk7Cgl9LCBlbmFibGUgPSAoZSkgPT4gewoJCWUuZW5hYmxlZCA9ICEwLCBlLnJlc29sdmVkICE9PSB2b2lkIDAgJiYgZW5xdWV1ZShlLnJlc29sdmVkKTsKCX0sIGNyZWF0ZVN0YXRlID0gKHQpID0+IHsKCQlsZXQgbiA9IGNyZWF0ZUhvb2soeyB0b2tlbjogdCB9KTsKCQlyZXR1cm4gewoJCQljbG9zZWQ6ICExLAoJCQllbmFibGVkOiAhMSwKCQkJaG9vazogbiwKCQkJaXRlcmF0b3I6IG5bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCksCgkJCXBlbmRpbmc6ICExLAoJCQlyZXRpcmVkOiAhMQoJCX07Cgl9LCBzdGF0ZXMgPSAoKSA9PiBbCgkJciwKCQlpLAoJCS4uLmEKCV0uZmlsdGVyKChlKSA9PiBlICE9PSB2b2lkIDApOwoJcmV0dXJuIHsKCQlhc3luYyBjbGFpbVN0YWJsZShlKSB7CgkJCWlmIChyICE9PSB2b2lkIDApIHsKCQkJCWlmIChyLmhvb2sudG9rZW4gPT09IGUpIHJldHVybjsKCQkJCXRocm93IEVycm9yKGBBIHNlc3Npb24gY29tbWFuZCBpbmJveCBjYW5ub3QgY2hhbmdlIGl0cyBzdGFibGUgdG9rZW4uYCk7CgkJCX0KCQkJbGV0IG4gPSBjcmVhdGVTdGF0ZShlKTsKCQkJYXdhaXQgY2xhaW1Ib29rT3duZXJzaGlwKG4uaG9vayksIGVuYWJsZShuKSwgciA9IG47CgkJfSwKCQljb25zdW1lTmV4dCgpIHsKCQkJaWYgKGwgPT09IHZvaWQgMCkgdGhyb3cgRXJyb3IoYENhbm5vdCBjb25zdW1lIGEgc2Vzc2lvbiBjb21tYW5kIGJlZm9yZSBpdCByZXNvbHZlcy5gKTsKCQkJbC5zdGF0ZS5wZW5kaW5nID0gITEsIGwuc3RhdGUucmVzb2x2ZWQgPSB2b2lkIDAsIGwucmVzdWx0LmRvbmUgJiYgKGwuc3RhdGUuY2xvc2VkID0gITApLCBsID0gdm9pZCAwLCBjID0gbnVsbDsKCQl9LAoJCWFzeW5jIGRpc3Bvc2UoKSB7CgkJCWxldCBlID0gW2ksIHJdLmZpbHRlcigoZSkgPT4gZSAhPT0gdm9pZCAwKTsKCQkJaSA9IHZvaWQgMCwgciA9IHZvaWQgMCwgYXdhaXQgUHJvbWlzZS5hbGwoZS5tYXAoYXN5bmMgKGUpID0+IGF3YWl0IGRpc3Bvc2VIb29rKGUuaG9vaykpKTsKCQl9LAoJCW5leHQoKSB7CgkJCWlmIChyID09PSB2b2lkIDApIHRocm93IEVycm9yKGBDYW5ub3Qgd2FpdCBmb3Igc2Vzc2lvbiBjb21tYW5kcyBiZWZvcmUgY2xhaW1pbmcgdGhlIHN0YWJsZSBpbmJveC5gKTsKCQkJaWYgKGMgIT09IG51bGwpIHJldHVybiBjOwoJCQlsZXQgZSA9IHN0YXRlcygpOwoJCQlmb3IgKGxldCB0IG9mIGUpIGFybSh0KTsKCQkJcmV0dXJuIGUuZXZlcnkoKGUpID0+IGUuY2xvc2VkKSA/IChsID0gewoJCQkJb3JkZXI6IHMrKywKCQkJCXJlc3VsdDogewoJCQkJCWRvbmU6ICEwLAoJCQkJCXZhbHVlOiB2b2lkIDAKCQkJCX0sCgkJCQlzdGF0ZTogcgoJCQl9LCBjID0gUHJvbWlzZS5yZXNvbHZlKGwucmVzdWx0KSwgYykgOiAoYyA9IChhc3luYyAoKSA9PiB7CgkJCQlmb3IgKDsgby5sZW5ndGggPT09IDA7KSBhd2FpdCBuZXcgUHJvbWlzZSgoZSkgPT4gewoJCQkJCXUgPSBlOwoJCQkJfSk7CgkJCQlsZXQgZSA9IG8uc2hpZnQoKTsKCQkJCXJldHVybiBsID0gZSwgZS5yZXN1bHQ7CgkJCX0pKCksIGMpOwoJCX0sCgkJYXN5bmMgcmVrZXlDb250aW51YXRpb24oZSkgewoJCQlpZiAoIWUgfHwgaT8uaG9vay50b2tlbiA9PT0gZSkgcmV0dXJuOwoJCQlsZXQgciA9IGNyZWF0ZVN0YXRlKGUpOwoJCQlpZiAoaSA9PT0gdm9pZCAwKSB7CgkJCQlhd2FpdCBjbGFpbUhvb2tPd25lcnNoaXAoci5ob29rKSwgZW5hYmxlKHIpLCBpID0gciwgYyAhPT0gbnVsbCAmJiBhcm0ocik7CgkJCQlyZXR1cm47CgkJCX0KCQkJYXJtKHIpLCBhd2FpdCBjbGFpbUhvb2tPd25lcnNoaXAoci5ob29rKSwgZW5hYmxlKHIpOwoJCQlsZXQgbyA9IGk7CgkJCWkgPSByLCBhcm0obyk7CgkJCXRyeSB7CgkJCQlhd2FpdCBkaXNwb3NlSG9vayhvLmhvb2spOwoJCQl9IGNhdGNoIChlKSB7CgkJCQlpID0gdm9pZCAwOwoJCQkJdHJ5IHsKCQkJCQlhd2FpdCBkaXNwb3NlSG9vayhyLmhvb2spOwoJCQkJfSBjYXRjaCB7fQoJCQkJdGhyb3cgZTsKCQkJfQoJCQlvLnJldGlyZWQgPSAhMCwgYS5wdXNoKG8pOwoJCX0KCX07Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vc2Vzc2lvbi1jb21tYW5kLXRva2VuLmpzCmZ1bmN0aW9uIHNlc3Npb25Db21tYW5kSG9va1Rva2VuKGUpIHsKCXJldHVybiBgZXZlOnNlc3Npb246JHtlfTppbmJveGA7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdGVybWluYWwtc2Vzc2lvbi1jb21wbGV0aW9uLXN0ZXAuanMKdmFyIGVtaXRUZXJtaW5hbFNlc3Npb25Db21wbGV0aW9uU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjMwLjgvL2VtaXRUZXJtaW5hbFNlc3Npb25Db21wbGV0aW9uU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9zZXNzaW9uLXRpbWVvdXQtY29udHJvbC5qcwpmdW5jdGlvbiBjcmVhdGVTZXNzaW9uVGltZW91dENvbnRyb2wodCkgewoJbGV0IG47CglyZXR1cm4gewoJCWFzeW5jIGRpc3Bvc2UoKSB7CgkJCWlmIChuID09PSB2b2lkIDApIHJldHVybjsKCQkJbGV0IGUgPSBuOwoJCQluID0gdm9pZCAwLCBhd2FpdCBjYW5jZWxTZXNzaW9uVGltZW91dFN0ZXAoeyBydW5JZDogZS5ydW5JZCB9KTsKCQl9LAoJCWFzeW5jIHN0YXJ0KCkgewoJCQluID09PSB2b2lkIDAgJiYgKG4gPSBhd2FpdCBzdGFydFNlc3Npb25UaW1lb3V0U3RlcCh0KSk7CgkJfQoJfTsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi90ZXJtaW5hdGUtY2hpbGQtc2Vzc2lvbnMtc3RlcC5qcwp2YXIgdGVybWluYXRlQ2hpbGRTZXNzaW9uc1N0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4zMC44Ly90ZXJtaW5hdGVDaGlsZFNlc3Npb25zU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi93b3JrZmxvdy1lbnRyeS5qcwphc3luYyBmdW5jdGlvbiB3b3JrZmxvd0VudHJ5KHQpIHsKCWxldCB7IHdvcmtmbG93UnVuSWQ6IGksIHdvcmtmbG93U3RhcnRlZEF0OiBvIH0gPSBnZXRXb3JrZmxvd01ldGFkYXRhKCksIHAgPSB0LnNlcmlhbGl6ZWRDb250ZXh0W2BldmUuY29udGludWF0aW9uVG9rZW5gXSB8fCBgYCwgbSA9IHQuc2VyaWFsaXplZENvbnRleHRbYGV2ZS5tb2RlYF0sIGggPSB0LnNlcmlhbGl6ZWRDb250ZXh0W2BldmUuY2FwYWJpbGl0aWVzYF0sIGcgPSB0LnNlcmlhbGl6ZWRDb250ZXh0W2BldmUuYnVuZGxlYF07Cgl0LnNlcmlhbGl6ZWRDb250ZXh0W2BldmUuc2Vzc2lvbklkYF0gPSBpOwoJbGV0IF8gPSBnZXRXcml0YWJsZSgpLCB2ID0gewoJCWNhbGxlcjogdm9pZCAwLAoJCWNhbGxlclJlc29sdmVkOiAhMSwKCQlsYXN0U2Vzc2lvblN0YXRlOiB2b2lkIDAKCX07Cgl0cnkgewoJCWxldCBuID0gcmVhZFJvb3RTZXNzaW9uSWQodC5zZXJpYWxpemVkQ29udGV4dCksIHIgPSByZWFkU2VyaWFsaXplZFN1YmFnZW50RGVwdGgodC5zZXJpYWxpemVkQ29udGV4dCksIGEgPSB0LnNlcmlhbGl6ZWRDb250ZXh0W2BldmUuZHluYW1pY1N1YmFnZW50QWdlbnRDb25maWdgXSwgeyBzdGF0ZTogbCB9ID0gYXdhaXQgY3JlYXRlU2Vzc2lvblN0ZXAoewoJCQljb21waWxlZEFydGlmYWN0c1NvdXJjZTogZy5zb3VyY2UsCgkJCWNvbnRpbnVhdGlvblRva2VuOiBwLAoJCQlkeW5hbWljU3ViYWdlbnRBZ2VudENvbmZpZzogYSwKCQkJaW5oZXJpdGVkTGltaXRzOiB0LmxpbWl0cywKCQkJbm9kZUlkOiBnLm5vZGVJZCwKCQkJb3V0cHV0U2NoZW1hOiB0LmlucHV0Lm91dHB1dFNjaGVtYSwKCQkJcm9vdFNlc3Npb25JZDogbiwKCQkJc2Vzc2lvbklkOiBpLAoJCQlzdWJhZ2VudERlcHRoOiByCgkJfSk7CgkJdi5sYXN0U2Vzc2lvblN0YXRlID0gbCwgdi5jYWxsZXIgPSBhd2FpdCByZXNvbHZlSW5pdGlhbFR1cm5DYWxsZXJTdGVwKHsgc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQgfSksIHYuY2FsbGVyUmVzb2x2ZWQgPSAhMDsKCQlsZXQgdSA9IGF3YWl0IHJ1bkRyaXZlckxvb3AoewoJCQljYXBhYmlsaXRpZXM6IGgsCgkJCWRyaXZlcldyaXRhYmxlOiBfLAoJCQlpbml0aWFsSW5wdXQ6IHsKCQkJCWtpbmQ6IGBkZWxpdmVyYCwKCQkJCXBheWxvYWRzOiBbewoJCQkJCW1lc3NhZ2U6IHQuaW5wdXQubWVzc2FnZSwKCQkJCQljb250ZXh0OiB0LmlucHV0LmNvbnRleHQsCgkJCQkJb3V0cHV0U2NoZW1hOiB0LmlucHV0Lm91dHB1dFNjaGVtYQoJCQkJfV0sCgkJCQlyZXF1ZXN0SWQ6IHJlYWRDaGFubmVsUmVxdWVzdElkKHQuc2VyaWFsaXplZENvbnRleHQpCgkJCX0sCgkJCWNyYXNoQ2xlYW51cFN0YXRlOiB2LAoJCQltb2RlOiBtLAoJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dCwKCQkJc2Vzc2lvblN0YXRlOiBsLAoJCQlzZXNzaW9uVGltZW91dERlYWRsaW5lOiB0LnNlc3Npb25UaW1lb3V0TXMgPT09ICExID8gdm9pZCAwIDogbmV3IERhdGUoby5nZXRUaW1lKCkgKyAodC5zZXNzaW9uVGltZW91dE1zID8/IDI1OTJlNikpCgkJfSk7CgkJcmV0dXJuIHUua2luZCA9PT0gYHJlc3VsdGAgPyB1LnJlc3VsdCA6IGF3YWl0IGZpbmFsaXplRXhwaXJlZFNlc3Npb24oewoJCQljYWxsZXI6IHYuY2FsbGVyLAoJCQlkcml2ZXJXcml0YWJsZTogXywKCQkJbW9kZTogbSwKCQkJc2VyaWFsaXplZENvbnRleHQ6IHUuc2VyaWFsaXplZENvbnRleHQsCgkJCXNlc3Npb25TdGF0ZTogdS5zZXNzaW9uU3RhdGUKCQl9KTsKCX0gY2F0Y2ggKGUpIHsKCQl0aHJvdyB2Lmxhc3RTZXNzaW9uU3RhdGUgIT09IHZvaWQgMCAmJiBhd2FpdCB0ZXJtaW5hdGVDaGlsZFNlc3Npb25zU3RlcCh7IHNlc3Npb25TdGF0ZTogdi5sYXN0U2Vzc2lvblN0YXRlIH0pLCBhd2FpdCBlbWl0VGVybWluYWxTZXNzaW9uRmFpbHVyZVN0ZXAoewoJCQllcnJvcjogbm9ybWFsaXplU2VyaWFsaXphYmxlRXJyb3IoZSksCgkJCXBhcmVudFdyaXRhYmxlOiBfLAoJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dAoJCX0pLCBtID09PSBgdGFza2AgPyAoYXdhaXQgZmlyZVNlc3Npb25DYWxsYmFja1N0ZXAoewoJCQllcnJvcjogbm9ybWFsaXplU2VyaWFsaXphYmxlRXJyb3IoZSksCgkJCXNlcmlhbGl6ZWRDb250ZXh0OiB0LnNlcmlhbGl6ZWRDb250ZXh0LAoJCQlzdGF0dXM6IGBmYWlsZWRgCgkJfSksIGF3YWl0IG5vdGlmeURlbGVnYXRlZFBhcmVudFN0ZXAoewoJCQlyZXN1bHQ6IGNyZWF0ZURlbGVnYXRlZFN1YmFnZW50RXJyb3JSZXN1bHQodC5zZXJpYWxpemVkQ29udGV4dCwgZSksCgkJCXNlcmlhbGl6ZWRDb250ZXh0OiB0LnNlcmlhbGl6ZWRDb250ZXh0CgkJfSkpIDogYXdhaXQgbm90aWZ5VHVybkNhbGxlclN0ZXAoewoJCQljYWxsZXI6IGF3YWl0IHJlc29sdmVDYWxsZXJGb3JDcmFzaCh2LCB0LnNlcmlhbGl6ZWRDb250ZXh0KSwKCQkJbGlmZWN5Y2xlOiBgdGVybWluYWxgLAoJCQlzZXNzaW9uSWQ6IGksCgkJCXNldHRsZWQ6IHsKCQkJCWlzRXJyb3I6ICEwLAoJCQkJb3V0cHV0OiBlCgkJCX0KCQl9KSwgY3JlYXRlU2FmZU91dGVyV29ya2Zsb3dFcnJvcigpOwoJfQp9CmFzeW5jIGZ1bmN0aW9uIHJlc29sdmVDYWxsZXJGb3JDcmFzaChlLCB0KSB7CglpZiAoZS5jYWxsZXJSZXNvbHZlZCkgcmV0dXJuIGUuY2FsbGVyOwoJdHJ5IHsKCQlyZXR1cm4gYXdhaXQgcmVzb2x2ZUluaXRpYWxUdXJuQ2FsbGVyU3RlcCh7IHNlcmlhbGl6ZWRDb250ZXh0OiB0IH0pOwoJfSBjYXRjaCB7CgkJcmV0dXJuOwoJfQp9CmZ1bmN0aW9uIGNyZWF0ZVNhZmVPdXRlcldvcmtmbG93RXJyb3IoKSB7CglsZXQgZSA9IEVycm9yKGBBZ2VudCB3b3JrZmxvdyBmYWlsZWQuIEluc3BlY3QgdGhlIHByaXZhdGUgc2Vzc2lvbiB0cmFjZSBmb3IgZGV0YWlscy5gKTsKCXJldHVybiBlLm5hbWUgPSBgRXZlV29ya2Zsb3dGYWlsdXJlYCwgZTsKfQphc3luYyBmdW5jdGlvbiBydW5Ecml2ZXJMb29wKGUpIHsKCWxldCBuID0gY3JlYXRlSG9vayh7IHRva2VuOiBgJHtlLnNlc3Npb25TdGF0ZS5zZXNzaW9uSWR9OmF1dGhgIH0pLCByID0gbltTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSwgYSA9IDAsIG5leHRUdXJuQ29udHJvbFRva2VuID0gKCkgPT4gYCR7ZS5zZXNzaW9uU3RhdGUuc2Vzc2lvbklkfTp0dXJuLWNvbnRyb2w6JHtTdHJpbmcoYSsrKX1gLCBzID0gW10sIGMgPSBbXSwgbCA9IGNyZWF0ZVNlc3Npb25Db21tYW5kSW5ib3goKSwgZCA9IHNlc3Npb25Db21tYW5kSG9va1Rva2VuKGUuc2Vzc2lvblN0YXRlLnNlc3Npb25JZCk7Cglhd2FpdCBsLmNsYWltU3RhYmxlKGQpOwoJbGV0IGYgPSBlLnNlc3Npb25UaW1lb3V0RGVhZGxpbmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNyZWF0ZVNlc3Npb25UaW1lb3V0Q29udHJvbCh7CgkJZGVhZGxpbmU6IGUuc2Vzc2lvblRpbWVvdXREZWFkbGluZSwKCQl0b2tlbjogZAoJfSksIHAsIHJ1blR1cm4gPSBhc3luYyAodCkgPT4gewoJCWxldCBuID0gYXdhaXQgZGlzcGF0Y2hBbmRBd2FpdFR1cm4oewoJCQlidWZmZXJlZERlbGl2ZXJpZXM6IHMsCgkJCWJ1ZmZlcmVkU2Vzc2lvbkNvbnRyb2xzOiBjLAoJCQljYXBhYmlsaXRpZXM6IGUuY2FwYWJpbGl0aWVzLAoJCQljb21tYW5kSW5ib3g6IGwsCgkJCWNvbnRyb2xUb2tlbjogbmV4dFR1cm5Db250cm9sVG9rZW4oKSwKCQkJZGVsaXZlcnk6IHQuZGVsaXZlcnksCgkJCW1vZGU6IGUubW9kZSwKCQkJcGFyZW50V3JpdGFibGU6IGUuZHJpdmVyV3JpdGFibGUsCgkJCXNlcmlhbGl6ZWRDb250ZXh0OiB0LnNlcmlhbGl6ZWRDb250ZXh0LAoJCQlzZXNzaW9uU3RhdGU6IHQuc2Vzc2lvblN0YXRlCgkJfSk7CgkJcmV0dXJuIGF3YWl0IHA/LigpLCBwID0gbi5kaXNwb3NlLCBuLmFjdGlvbjsKCX07Cgl0cnkgewoJCWUuc2Vzc2lvblN0YXRlLmNvbnRpbnVhdGlvblRva2VuICYmIGF3YWl0IGwucmVrZXlDb250aW51YXRpb24oZS5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW4pLCBhd2FpdCBmPy5zdGFydCgpOwoJCWxldCB0ID0gYXdhaXQgcnVuVHVybih7CgkJCWRlbGl2ZXJ5OiBlLmluaXRpYWxJbnB1dCwKCQkJc2VyaWFsaXplZENvbnRleHQ6IGUuc2VyaWFsaXplZENvbnRleHQsCgkJCXNlc3Npb25TdGF0ZTogZS5zZXNzaW9uU3RhdGUKCQl9KTsKCQlmb3IgKGUuY3Jhc2hDbGVhbnVwU3RhdGUubGFzdFNlc3Npb25TdGF0ZSA9IHQuc2Vzc2lvblN0YXRlOzspIHsKCQkJaWYgKHQua2luZCA9PT0gYGRvbmVgKSByZXR1cm4gewoJCQkJa2luZDogYHJlc3VsdGAsCgkJCQlyZXN1bHQ6IGF3YWl0IGZpbmFsaXplRG9uZSh7CgkJCQkJYWN0aW9uOiB0LAoJCQkJCWNhbGxlcjogZS5jcmFzaENsZWFudXBTdGF0ZS5jYWxsZXIsCgkJCQkJbW9kZTogZS5tb2RlCgkJCQl9KQoJCQl9OwoJCQlpZiAodC5raW5kICE9PSBgcGFya2ApIHRocm93IEVycm9yKGBEcml2ZXIgcmVjZWl2ZWQgdW5leHBlY3RlZCB0dXJuIGFjdGlvbiAiJHt0LmtpbmR9Ii5gKTsKCQkJaWYgKHQuY2FuY2VsbGVkID09PSAhMCkgewoJCQkJbGV0IG4gPSBhd2FpdCBzZXR0bGVDYW5jZWxsZWRUdXJuU3RlcCh7CgkJCQkJcGFyZW50V3JpdGFibGU6IGUuZHJpdmVyV3JpdGFibGUsCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiB0LnNlc3Npb25TdGF0ZQoJCQkJfSk7CgkJCQl0ID0gewoJCQkJCS4uLnQsCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IG4uc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiBuLnNlc3Npb25TdGF0ZQoJCQkJfSwgZS5jcmFzaENsZWFudXBTdGF0ZS5sYXN0U2Vzc2lvblN0YXRlID0gdC5zZXNzaW9uU3RhdGU7CgkJCX0KCQkJaWYgKHQuc2Vzc2lvblN0YXRlLmNvbnRpbnVhdGlvblRva2VuICYmIGF3YWl0IGwucmVrZXlDb250aW51YXRpb24odC5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW4pLCB0LmF1dGhvcml6YXRpb25OYW1lcyAmJiB0LmF1dGhvcml6YXRpb25OYW1lcy5sZW5ndGggPiAwKSB7CgkJCQlsZXQgbiA9IHQuYXV0aG9yaXphdGlvbk5hbWVzLmxlbmd0aCwgaSA9IFtdOwoJCQkJZm9yICg7IGkubGVuZ3RoIDwgbjspIHsKCQkJCQlsZXQgZSA9IGF3YWl0IHIubmV4dCgpOwoJCQkJCWlmIChlLmRvbmUpIGJyZWFrOwoJCQkJCWUudmFsdWUua2luZCA9PT0gYGRlbGl2ZXJgICYmIGkucHVzaCguLi5lLnZhbHVlLnBheWxvYWRzKTsKCQkJCX0KCQkJCXQgPSBhd2FpdCBydW5UdXJuKHsKCQkJCQlkZWxpdmVyeTogewoJCQkJCQlraW5kOiBgZGVsaXZlcmAsCgkJCQkJCXBheWxvYWRzOiBpCgkJCQkJfSwKCQkJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQlzZXNzaW9uU3RhdGU6IHQuc2Vzc2lvblN0YXRlCgkJCQl9KSwgZS5jcmFzaENsZWFudXBTdGF0ZS5sYXN0U2Vzc2lvblN0YXRlID0gdC5zZXNzaW9uU3RhdGU7CgkJCQljb250aW51ZTsKCQkJfQoJCQlsZXQgbiA9IHQuc2V0dGxlZDsKCQkJdC5jYW5jZWxsZWQgIT09ICEwICYmIG4gIT09IHZvaWQgMCA/IChhd2FpdCBub3RpZnlUdXJuQ2FsbGVyU3RlcCh7CgkJCQljYWxsZXI6IGUuY3Jhc2hDbGVhbnVwU3RhdGUuY2FsbGVyLAoJCQkJbGlmZWN5Y2xlOiBgcGFya2VkYCwKCQkJCXNlc3Npb25JZDogdC5zZXNzaW9uU3RhdGUuc2Vzc2lvbklkLAoJCQkJc2V0dGxlZDogbgoJCQl9KSwgZS5jcmFz",
	"aENsZWFudXBTdGF0ZS5jYWxsZXIgPSB2b2lkIDApIDogdC5jYW5jZWxsZWQgPT09ICEwICYmIChlLmNyYXNoQ2xlYW51cFN0YXRlLmNhbGxlciA9IHZvaWQgMCk7CgkJCWxldCBpID0gYXdhaXQgbmV4dFR1cm5EZWxpdmVyeSh7CgkJCQlidWZmZXJlZERlbGl2ZXJpZXM6IHMsCgkJCQlidWZmZXJlZFNlc3Npb25Db250cm9sczogYywKCQkJCWNvbW1hbmRJbmJveDogbCwKCQkJCWRyaXZlcldyaXRhYmxlOiBlLmRyaXZlcldyaXRhYmxlLAoJCQkJc2Vzc2lvblN0YXRlOiB0LnNlc3Npb25TdGF0ZQoJCQl9KTsKCQkJaWYgKGkua2luZCA9PT0gYGV4cGlyZWRgKSByZXR1cm4gewoJCQkJa2luZDogYGV4cGlyZWRgLAoJCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCQlzZXNzaW9uU3RhdGU6IHQuc2Vzc2lvblN0YXRlCgkJCX07CgkJCWlmIChpLmtpbmQgPT09IGByZXNldGApIHJldHVybiBhd2FpdCB0ZXJtaW5hdGVDaGlsZFNlc3Npb25zU3RlcCh7IHNlc3Npb25TdGF0ZTogdC5zZXNzaW9uU3RhdGUgfSksIHsKCQkJCWtpbmQ6IGByZXN1bHRgLAoJCQkJcmVzdWx0OiB7IG91dHB1dDogYGAgfQoJCQl9OwoJCQlpZiAoaS5raW5kID09PSBgY2xlYXJgIHx8IGkua2luZCA9PT0gYGNvbXBhY3RgKSB7CgkJCQl0ID0gYXdhaXQgcnVuVHVybih7CgkJCQkJZGVsaXZlcnk6IHsga2luZDogaS5raW5kIH0sCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiB0LnNlc3Npb25TdGF0ZQoJCQkJfSksIGUuY3Jhc2hDbGVhbnVwU3RhdGUubGFzdFNlc3Npb25TdGF0ZSA9IHQuc2Vzc2lvblN0YXRlOwoJCQkJY29udGludWU7CgkJCX0KCQkJaWYgKGkua2luZCA9PT0gYGNsb3NlZGApIHJldHVybiB7CgkJCQlraW5kOiBgcmVzdWx0YCwKCQkJCXJlc3VsdDogeyBvdXRwdXQ6IGBgIH0KCQkJfTsKCQkJaWYgKGkua2luZCA9PT0gYGNhbmNlbC10dXJuYCkgewoJCQkJYXdhaXQgY2FuY2VsRGVzY2VuZGFudFR1cm5zU3RlcCh7CgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiB0LnNlc3Npb25TdGF0ZQoJCQkJfSk7CgkJCQlsZXQgbiA9IGF3YWl0IHNldHRsZUNhbmNlbGxlZFR1cm5TdGVwKHsKCQkJCQlwYXJlbnRXcml0YWJsZTogZS5kcml2ZXJXcml0YWJsZSwKCQkJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQlzZXNzaW9uU3RhdGU6IHQuc2Vzc2lvblN0YXRlCgkJCQl9KTsKCQkJCXQgPSB7CgkJCQkJLi4udCwKCQkJCQlzZXJpYWxpemVkQ29udGV4dDogbi5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQlzZXNzaW9uU3RhdGU6IG4uc2Vzc2lvblN0YXRlLAoJCQkJCXNldHRsZWQ6IHZvaWQgMAoJCQkJfSwgZS5jcmFzaENsZWFudXBTdGF0ZS5jYWxsZXIgPSB2b2lkIDAsIGUuY3Jhc2hDbGVhbnVwU3RhdGUubGFzdFNlc3Npb25TdGF0ZSA9IHQuc2Vzc2lvblN0YXRlOwoJCQkJY29udGludWU7CgkJCX0KCQkJaS5kZWxpdmVyLmNhbGxlciAhPT0gdm9pZCAwICYmIChlLmNyYXNoQ2xlYW51cFN0YXRlLmNhbGxlciA9IGkuZGVsaXZlci5jYWxsZXIpLCB0ID0gYXdhaXQgcnVuVHVybih7CgkJCQlkZWxpdmVyeTogewoJCQkJCWF1dGg6IGkuZGVsaXZlci5hdXRoLAoJCQkJCWtpbmQ6IGBkZWxpdmVyYCwKCQkJCQlwYXlsb2FkczogW2kucmVtYWluZGVyXSwKCQkJCQlyZXF1ZXN0SWQ6IGkuZGVsaXZlci5yZXF1ZXN0SWQKCQkJCX0sCgkJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dCwKCQkJCXNlc3Npb25TdGF0ZTogdC5zZXNzaW9uU3RhdGUKCQkJfSksIGUuY3Jhc2hDbGVhbnVwU3RhdGUubGFzdFNlc3Npb25TdGF0ZSA9IHQuc2Vzc2lvblN0YXRlOwoJCX0KCX0gZmluYWxseSB7CgkJYXdhaXQgcD8uKCksIGF3YWl0IGY/LmRpc3Bvc2UoKSwgYXdhaXQgbC5kaXNwb3NlKCksIGF3YWl0IGRpc3Bvc2VIb29rKG4pOwoJfQp9CmFzeW5jIGZ1bmN0aW9uIGZpbmFsaXplRXhwaXJlZFNlc3Npb24oZSkgewoJcmV0dXJuIGF3YWl0IHRlcm1pbmF0ZUNoaWxkU2Vzc2lvbnNTdGVwKHsgc2Vzc2lvblN0YXRlOiBlLnNlc3Npb25TdGF0ZSB9KSwgYXdhaXQgZW1pdFRlcm1pbmFsU2Vzc2lvbkNvbXBsZXRpb25TdGVwKHsKCQlwYXJlbnRXcml0YWJsZTogZS5kcml2ZXJXcml0YWJsZSwKCQlzZXJpYWxpemVkQ29udGV4dDogZS5zZXJpYWxpemVkQ29udGV4dAoJfSksIGUubW9kZSA9PT0gYHRhc2tgID8gKGF3YWl0IGZpcmVTZXNzaW9uQ2FsbGJhY2tTdGVwKHsKCQlvdXRwdXQ6IGBgLAoJCXNlcmlhbGl6ZWRDb250ZXh0OiBlLnNlcmlhbGl6ZWRDb250ZXh0LAoJCXN0YXR1czogYGNvbXBsZXRlZGAKCX0pLCBhd2FpdCBub3RpZnlEZWxlZ2F0ZWRQYXJlbnRTdGVwKHsKCQlyZXN1bHQ6IGNyZWF0ZURlbGVnYXRlZFN1YmFnZW50U3VjY2Vzc1Jlc3VsdChlLnNlcmlhbGl6ZWRDb250ZXh0LCBgYCksCgkJc2VyaWFsaXplZENvbnRleHQ6IGUuc2VyaWFsaXplZENvbnRleHQKCX0pKSA6IGF3YWl0IG5vdGlmeVR1cm5DYWxsZXJTdGVwKHsKCQljYWxsZXI6IGUuY2FsbGVyLAoJCWxpZmVjeWNsZTogYHRlcm1pbmFsYCwKCQlzZXNzaW9uSWQ6IGUuc2Vzc2lvblN0YXRlLnNlc3Npb25JZCwKCQlzZXR0bGVkOiB7IG91dHB1dDogYGAgfQoJfSksIHsgb3V0cHV0OiBgYCB9Owp9CmFzeW5jIGZ1bmN0aW9uIGZpbmFsaXplRG9uZShlKSB7CglsZXQgeyBvdXRwdXQ6IHQsIHNlcmlhbGl6ZWRDb250ZXh0OiBuIH0gPSBlLmFjdGlvbiwgciA9IGUuYWN0aW9uLmlzRXJyb3IgPT09ICEwOwoJaWYgKGF3YWl0IHRlcm1pbmF0ZUNoaWxkU2Vzc2lvbnNTdGVwKHsgc2Vzc2lvblN0YXRlOiBlLmFjdGlvbi5zZXNzaW9uU3RhdGUgfSksIGUubW9kZSA9PT0gYHRhc2tgKSBhd2FpdCBmaXJlU2Vzc2lvbkNhbGxiYWNrU3RlcCh7CgkJZXJyb3I6IHIgPyB0IDogdm9pZCAwLAoJCW91dHB1dDogciA/IHZvaWQgMCA6IHQsCgkJc2VyaWFsaXplZENvbnRleHQ6IG4sCgkJc3RhdHVzOiByID8gYGZhaWxlZGAgOiBgY29tcGxldGVkYCwKCQl1c2FnZTogciA/IHZvaWQgMCA6IGUuYWN0aW9uLnVzYWdlCgl9KSwgYXdhaXQgbm90aWZ5RGVsZWdhdGVkUGFyZW50U3RlcCh7CgkJcmVzdWx0OiByID8gY3JlYXRlRGVsZWdhdGVkU3ViYWdlbnRFcnJvclJlc3VsdChuLCB0KSA6IGNyZWF0ZURlbGVnYXRlZFN1YmFnZW50U3VjY2Vzc1Jlc3VsdChuLCB0KSwKCQlzZXJpYWxpemVkQ29udGV4dDogbiwKCQl1c2FnZTogciA/IHZvaWQgMCA6IGUuYWN0aW9uLnVzYWdlCgl9KTsKCWVsc2UgewoJCWxldCBuID0gewoJCQlvdXRwdXQ6IHQsCgkJCXVzYWdlOiBlLmFjdGlvbi51c2FnZURlbHRhCgkJfTsKCQlyICYmIChuLmlzRXJyb3IgPSAhMCksIGF3YWl0IG5vdGlmeVR1cm5DYWxsZXJTdGVwKHsKCQkJY2FsbGVyOiBlLmNhbGxlciwKCQkJbGlmZWN5Y2xlOiBgdGVybWluYWxgLAoJCQlzZXNzaW9uSWQ6IGUuYWN0aW9uLnNlc3Npb25TdGF0ZS5zZXNzaW9uSWQsCgkJCXNldHRsZWQ6IG4KCQl9KTsKCX0KCXJldHVybiB7IG91dHB1dDogdCB9Owp9CndvcmtmbG93RW50cnkud29ya2Zsb3dJZCA9ICJ3b3JrZmxvdy8vZXZlLy93b3JrZmxvd0VudHJ5IjsKZ2xvYmFsVGhpcy5fX3ByaXZhdGVfd29ya2Zsb3dzLnNldCgid29ya2Zsb3cvL2V2ZS8vd29ya2Zsb3dFbnRyeSIsIHdvcmtmbG93RW50cnkpOwovLyNlbmRyZWdpb24KCi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWDJWMlpTMTNiM0pyWm14dmR5MWxiblJ5ZVM1cWN5SXNJbTVoYldWeklqcGJJbU52YlcxaGJtUlViMFJsYkdsMlpYSjVJbDBzSW5OdmRYSmpaWE1pT2xzaWMzSmpMMmx1ZEdWeWJtRnNMM2R2Y210bWJHOTNMV0oxYm1Sc1pTOTNiM0pyWm14dmR5MWpiM0psTFhOb2FXMHVhbk1pTENKemNtTXZaWGhsWTNWMGFXOXVMM05sYzNOcGIyNHRkR2x0Wlc5MWRDMXpkR1Z3Y3k1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dmMyVnpjMmx2YmkxMGFXMWxiM1YwTFhkdmNtdG1iRzkzTG1weklpd2ljM0pqTDNOb1lYSmxaQzl3ZFdKc2FXTXRjbTkxZEdVdGNISmxabWw0TG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5M2IzSnJabXh2ZHkxallXeHNZbUZqYXkxMWNtd3Vhbk1pTENKemNtTXZaWGhsWTNWMGFXOXVMMlJwYzNCaGRHTm9MWEoxYm5ScGJXVXRZV04wYVc5dWN5MXpkR1Z3TG1weklpd2ljM0pqTDJoaGNtNWxjM012YldWemMyRm5aWE11YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDJSbGJHbDJaWEl0Y0dGNWJHOWhaSE11YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDNkdmNtdG1iRzkzTFhOMFpYQnpMbXB6SWl3aWMzSmpMMlY0WldOMWRHbHZiaTl5YjNWMFpTMWphR2xzWkMxa1pXeHBkbVZ5ZVM1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dmFHOXZheTF2ZDI1bGNuTm9hWEF1YW5NaUxDSnpjbU12YUdGeWJtVnpjeTloWTNScGRtVXRkSFZ5YmkxcFpDNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZkMjl5YTJac2IzY3RaWEp5YjNKekxtcHpJaXdpYzNKakwyVjRaV04xZEdsdmJpOTBkWEp1TFdOdmJuUnliMnd0Y0hKdmRHOWpiMnd1YW5NaUxDSnpjbU12YUdGeWJtVnpjeTlvWVc1a2JHVnpMM04wWVhSbExXdGxlUzVxY3lJc0luTnlZeTlvWVhKdVpYTnpMMmhoYm1Sc1pYTXZjWFZsY25rdWFuTWlMQ0p6Y21NdlpYaGxZM1YwYVc5dUwyTmhibU5sYkMxa1pYTmpaVzVrWVc1MExYUjFjbTV6TFhOMFpYQXVhbk1pTENKemNtTXZaWGhsWTNWMGFXOXVMMlJwYzNCaGRHTm9MWGR2Y210bWJHOTNMWEoxYm5ScGJXVXRZV04wYVc5dWN5MXpkR1Z3TG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5a2RYSmhZbXhsTFhObGMzTnBiMjR0YldsbmNtRjBhVzl1Y3k5amFHRnBiaTVxY3lJc0luTnlZeTlsZUdWamRYUnBiMjR2WkhWeVlXSnNaUzF6WlhOemFXOXVMVzFwWjNKaGRHbHZibk12ZEhWeWJpMTNiM0pyWm14dmR5MTJNQzEwYnkxMk1TNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZaSFZ5WVdKc1pTMXpaWE56YVc5dUxXMXBaM0poZEdsdmJuTXZkSFZ5YmkxM2IzSnJabXh2ZHk1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dmMzVmlZV2RsYm5RdFpYWmxiblF0Y0hKdmVIa3RjM1JsY0M1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dmRIVnliaTFqWVc1alpXeHNZWFJwYjI0dGRHOXJaVzR1YW5NaUxDSnpjbU12YUdGeWJtVnpjeTkwZFhKdUxXTmhibU5sYkd4aGRHbHZiaTVxY3lJc0luTnlZeTlsZUdWamRYUnBiMjR2ZEhWeWJpMWpZVzVqWld4c1lYUnBiMjR0WTI5dWRISnZiQzVxY3lJc0luTnlZeTlsZUdWamRYUnBiMjR2ZEhWeWJpMWxlR1ZqZFhScGIyNHRZM1Z5YzI5eUxtcHpJaXdpYzNKakwzSjFiblJwYldVdllXTjBhVzl1Y3k5clpYbHpMbXB6SWl3aWMzSmpMM0oxYm5ScGJXVXZZV04wYVc5dWN5OXlaWE4xYkhSekxtcHpJaXdpYzNKakwyVjRaV04xZEdsdmJpOTBkWEp1TFhkdmNtdG1iRzkzTG1weklpd2ljM0pqTDJOdmJuUmxlSFF2YTJWNUxtcHpJaXdpYzNKakwyTnZiblJsZUhRdmEyVjVjeTVxY3lJc0luTnlZeTlvWVhKdVpYTnpMM04xWW1GblpXNTBMV1JsY0hSb0xtcHpJaXdpYzNKakwzTm9ZWEpsWkM5bmRXRnlaSE11YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDJWMlpTMTNiM0pyWm14dmR5MWhkSFJ5YVdKMWRHVnpMbXB6SWl3aWMzSmpMMlY0WldOMWRHbHZiaTlrWld4bFoyRjBaV1F0Y0dGeVpXNTBMVzV2ZEdsbWFXTmhkR2x2Ymk1cWN5SXNJbk55WXk5emFHRnlaV1F2WlhKeWIzSnpMbXB6SWl3aWMzSmpMMmhoY201bGMzTXZZV2RsYm5RdGFHRnVaR3hsTFdWeWNtOXljeTVxY3lJc0luTnlZeTlsZUdWamRYUnBiMjR2YzNWaVlXZGxiblF0WVdSaGNIUmxjaTF6ZEdGMFpTNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZaR1ZzWldkaGRHVmtMWEJoY21WdWRDMXlaWE4xYkhRdWFuTWlMQ0p6Y21NdlpYaGxZM1YwYVc5dUwzQmhjbXRsWkMxa1pXeHBkbVZ5ZVMxM1lXbDBMbXB6SWl3aWMzSmpMMlY0WldOMWRHbHZiaTltYjNKM1lYSmtMWFIxY200dFkyRnVZMlZzYkdGMGFXOXVMWE4wWlhBdWFuTWlMQ0p6Y21NdlpYaGxZM1YwYVc5dUwyWnZjbmRoY21RdGRIVnliaTFrWld4cGRtVnllUzF6ZEdWd0xtcHpJaXdpYzNKakwyVjRaV04xZEdsdmJpOTBkWEp1TFdOdmJuUnliMnd0Y21WalpXbDJaWEl1YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDNSMWNtNHRaR2x6Y0dGMFkyZ3Vhbk1pTENKemNtTXZaWGhsWTNWMGFXOXVMMk55WldGMFpTMXpaWE56YVc5dUxYTjBaWEF1YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDNObGRIUnNaUzFqWVc1alpXeHNaV1F0ZEhWeWJpMXpkR1Z3TG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5MFpYSnRhVzVoYkMxelpYTnphVzl1TFdaaGFXeDFjbVV0YzNSbGNDNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZjMlZ6YzJsdmJpMWpZV3hzWW1GamF5MXpkR1Z3TG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5elpYTnphVzl1TFdOdmJXMWhibVF0YVc1aWIzZ3Vhbk1pTENKemNtTXZaWGhsWTNWMGFXOXVMM05sYzNOcGIyNHRZMjl0YldGdVpDMTBiMnRsYmk1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dmMyVnpjMmx2YmkxMGFXMWxiM1YwTG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5MFpYSnRhVzVoYkMxelpYTnphVzl1TFdOdmJYQnNaWFJwYjI0dGMzUmxjQzVxY3lJc0luTnlZeTlsZUdWamRYUnBiMjR2YzJWemMybHZiaTEwYVcxbGIzVjBMV052Ym5SeWIyd3Vhbk1pTENKemNtTXZaWGhsWTNWMGFXOXVMM1JsY20xcGJtRjBaUzFqYUdsc1pDMXpaWE56YVc5dWN5MXpkR1Z3TG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5M2IzSnJabXh2ZHkxbGJuUnllUzVxY3lKZExDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SmpiMjV6ZENCWFQxSkxSa3hQVjE5RFQwNVVSVmhVWDFOWlRVSlBURDFUZVcxaWIyd3VabTl5S0dCWFQxSkxSa3hQVjE5RFQwNVVSVmhVWUNrc1YwOVNTMFpNVDFkZlExSkZRVlJGWDBoUFQwczlVM2x0WW05c0xtWnZjaWhnVjA5U1MwWk1UMWRmUTFKRlFWUkZYMGhQVDB0Z0tTeFhUMUpMUmt4UFYxOUhSVlJmVTFSU1JVRk5YMGxFUFZONWJXSnZiQzVtYjNJb1lGZFBVa3RHVEU5WFgwZEZWRjlUVkZKRlFVMWZTVVJnS1N4WFQxSkxSa3hQVjE5VFRFVkZVRDFUZVcxaWIyd3VabTl5S0dCWFQxSkxSa3hQVjE5VFRFVkZVR0FwTEZkUFVrdEdURTlYWDFWVFJWOVRWRVZRUFZONWJXSnZiQzVtYjNJb1lGZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVlDa3NVMVJTUlVGTlgwNUJUVVZmVTFsTlFrOU1QVk41YldKdmJDNW1iM0lvWUZkUFVrdEdURTlYWDFOVVVrVkJUVjlPUVUxRllDa3NkMjl5YTJac2IzZEhiRzlpWVd3OVoyeHZZbUZzVkdocGN6dDJZWElnVW1WMGNubGhZbXhsUlhKeWIzSTlZMnhoYzNNZ1pYaDBaVzVrY3lCRmNuSnZjbnQ5TEVaaGRHRnNSWEp5YjNJOVkyeGhjM01nWlhoMFpXNWtjeUJGY25KdmNudDlPMloxYm1OMGFXOXVJR055WldGMFpVaHZiMnNvWlNsN2JHVjBJRzQ5ZDI5eWEyWnNiM2RIYkc5aVlXeGJWMDlTUzBaTVQxZGZRMUpGUVZSRlgwaFBUMHRkTzJsbUtHNDlQVDEyYjJsa0lEQXBkR2h5YjNjZ1JYSnliM0lvWENKZ1kzSmxZWFJsU0c5dmF5Z3BZQ0JqWVc0Z2IyNXNlU0JpWlNCallXeHNaV1FnYVc1emFXUmxJR0VnZDI5eWEyWnNiM2NnWm5WdVkzUnBiMjVjSWlrN2NtVjBkWEp1SUc0b1pTbDlablZ1WTNScGIyNGdaMlYwVjI5eWEyWnNiM2ROWlhSaFpHRjBZU2dwZTJ4bGRDQjBQWGR2Y210bWJHOTNSMnh2WW1Gc1cxZFBVa3RHVEU5WFgwTlBUbFJGV0ZSZlUxbE5RazlNWFR0cFppaDBQVDA5ZG05cFpDQXdLWFJvY205M0lFVnljbTl5S0Z3aVlHZGxkRmR2Y210bWJHOTNUV1YwWVdSaGRHRW9LV0FnWTJGdUlHOXViSGtnWW1VZ1kyRnNiR1ZrSUdsdWMybGtaU0JoSUhkdmNtdG1iRzkzSUc5eUlITjBaWEFnWm5WdVkzUnBiMjVjSWlrN2NtVjBkWEp1SUhSOVpuVnVZM1JwYjI0Z1oyVjBWM0pwZEdGaWJHVW9aVDE3ZlNsN2JHVjBJSFE5ZDI5eWEyWnNiM2RIYkc5aVlXeGJWMDlTUzBaTVQxZGZSMFZVWDFOVVVrVkJUVjlKUkYwN2FXWW9kRDA5UFhadmFXUWdNQ2wwYUhKdmR5QkZjbkp2Y2loY0ltQm5aWFJYY21sMFlXSnNaU2dwWUNCallXNGdiMjVzZVNCaVpTQmpZV3hzWldRZ2FXNXphV1JsSUdFZ2QyOXlhMlpzYjNjZ1puVnVZM1JwYjI1Y0lpazdiR1YwSUhJOWRDaGxMbTVoYldWemNHRmpaU2s3Y21WMGRYSnVJRTlpYW1WamRDNWpjbVZoZEdVb1oyeHZZbUZzVkdocGN5NVhjbWwwWVdKc1pWTjBjbVZoYlM1d2NtOTBiM1I1Y0dVc2UxdFRWRkpGUVUxZlRrRk5SVjlUV1UxQ1QweGRPbnQyWVd4MVpUcHlMSGR5YVhSaFlteGxPaUV4ZlgwcGZXWjFibU4wYVc5dUlHTnlaV0YwWlZkbFltaHZiMnNvWlNsN2JHVjBJSFE5WTNKbFlYUmxTRzl2YXlobEtTeHVQV2RsZEZkdmNtdG1iRzkzVFdWMFlXUmhkR0VvS1R0eVpYUjFjbTRnZEM1MWNtdzlZQ1I3ZEhsd1pXOW1JRzR1ZFhKc1BUMWdjM1J5YVc1bllEOXVMblZ5YkRwZ1lIMHZMbmRsYkd3dGEyNXZkMjR2ZDI5eWEyWnNiM2N2ZGpFdmQyVmlhRzl2YXk4a2UyVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaDBMblJ2YTJWdUtYMWdMSFI5Wm5WdVkzUnBiMjRnWkdWbWFXNWxTRzl2YXlncGUzSmxkSFZ5Ym50amNtVmhkR1U2WTNKbFlYUmxTRzl2YXl4eVpYTjFiV1VvS1h0MGFISnZkeUJGY25KdmNpaGNJbUJrWldacGJtVkliMjlyS0NrdWNtVnpkVzFsS0NsZ0lHTmhiaUJ2Ym14NUlHSmxJR05oYkd4bFpDQm1jbTl0SUdWNGRHVnlibUZzSUdOdmJuUmxlSFJ6TGx3aUtYMTlmV1oxYm1OMGFXOXVJSE5zWldWd0tHVXBlMnhsZENCMFBYZHZjbXRtYkc5M1IyeHZZbUZzVzFkUFVrdEdURTlYWDFOTVJVVlFYVHRwWmloMFBUMDlkbTlwWkNBd0tYUm9jbTkzSUVWeWNtOXlLRndpWUhOc1pXVndLQ2xnSUdOaGJpQnZibXg1SUdKbElHTmhiR3hsWkNCcGJuTnBaR1VnWVNCM2IzSnJabXh2ZHlCbWRXNWpkR2x2Ymx3aUtUdHlaWFIxY200Z2RDaGxLWDFtZFc1amRHbHZiaUJ5WlhOMWJXVkliMjlyS0NsN2RHaHliM2NnUlhKeWIzSW9YQ0pnY21WemRXMWxTRzl2YXlncFlDQmpZVzRnYjI1c2VTQmlaU0JqWVd4c1pXUWdabkp2YlNCdmRYUnphV1JsSUdFZ2QyOXlhMlpzYjNjZ1puVnVZM1JwYjI1Y0lpbDlablZ1WTNScGIyNGdaMlYwVTNSbGNFMWxkR0ZrWVhSaEtDbDdkR2h5YjNjZ1JYSnliM0lvWENKZ1oyVjBVM1JsY0UxbGRHRmtZWFJoS0NsZ0lHTmhiaUJ2Ym14NUlHSmxJR05oYkd4bFpDQnBibk5wWkdVZ1lTQnpkR1Z3SUdaMWJtTjBhVzl1WENJcGZXRnplVzVqSUdaMWJtTjBhVzl1SUhObGRFRjBkSEpwWW5WMFpYTW9aU3gwUFh0OUtYdHNaWFFnYmoxUFltcGxZM1F1Wlc1MGNtbGxjeWhsS1R0cFppaHVMbXhsYm1kMGFEMDlQVEFwY21WMGRYSnVPMnhsZENCeVBYZHZjbXRtYkc5M1IyeHZZbUZzVzFkUFVrdEdURTlYWDFWVFJWOVRWRVZRWFR0cFppaHlQVDA5ZG05cFpDQXdLWFJvY205M0lFVnljbTl5S0Z3aVlITmxkRUYwZEhKcFluVjBaWE1vS1dBZ1kyRnVJRzl1YkhrZ1ltVWdZMkZzYkdWa0lHbHVjMmxrWlNCaElIZHZjbXRtYkc5M0lISjFiblJwYldVZ1kyOXVkR1Y0ZEZ3aUtUdHNaWFFnYVQxdUxtMWhjQ2dvVzJVc2RGMHBQVDRvZTJ0bGVUcGxMSFpoYkhWbE9uUTlQVDEyYjJsa0lEQS9iblZzYkRwMGZTa3BMR0U5ZEM1aGJHeHZkMUpsYzJWeWRtVmtRWFIwY21saWRYUmxjejA5UFNFd1AzdGhiR3h2ZDFKbGMyVnlkbVZrUVhSMGNtbGlkWFJsY3pvaE1IMDZlMzA3WVhkaGFYUWdjaWhnWDE5aWRXbHNkR2x1WDNObGRGOWhkSFJ5YVdKMWRHVnpZQ2tvYVN4aEtYMWxlSEJ2Y25SN1JtRjBZV3hGY25KdmNpeFNaWFJ5ZVdGaWJHVkZjbkp2Y2l4amNtVmhkR1ZJYjI5ckxHTnlaV0YwWlZkbFltaHZiMnNzWkdWbWFXNWxTRzl2YXl4blpYUlRkR1Z3VFdWMFlXUmhkR0VzWjJWMFYyOXlhMlpzYjNkTlpYUmhaR0YwWVN4blpYUlhjbWwwWVdKc1pTeHlaWE4xYldWSWIyOXJMSE5sZEVGMGRISnBZblYwWlhNc2MyeGxaWEI5T3lJc0lpOHFLbDlmYVc1MFpYSnVZV3hmZDI5eWEyWnNiM2R6ZTF3aWMzUmxjSE5jSWpwN1hDSmthWE4wTDNOeVl5OWxlR1ZqZFhScGIyNHZjMlZ6YzJsdmJpMTBhVzFsYjNWMExYTjBaWEJ6TG1welhDSTZlMXdpYzNSaGNuUlRaWE56YVc5dVZHbHRaVzkxZEZOMFpYQmNJanA3WENKemRHVndTV1JjSWpwY0luTjBaWEF2TDJWMlpVQXdMak13TGpndkwzTjBZWEowVTJWemMybHZibFJwYldWdmRYUlRkR1Z3WENKOUxGd2ljMmxuYm1Gc1UyVnpjMmx2YmxScGJXVnZkWFJUZEdWd1hDSTZlMXdpYzNSbGNFbGtYQ0k2WENKemRHVndMeTlsZG1WQU1DNHpNQzQ0THk5emFXZHVZV3hUWlhOemFXOXVWR2x0Wlc5MWRGTjBaWEJjSW4wc1hDSmpZVzVqWld4VFpYTnphVzl1VkdsdFpXOTFkRk4wWlhCY0lqcDdYQ0p6ZEdWd1NXUmNJanBjSW5OMFpYQXZMMlYyWlVBd0xqTXdMamd2TDJOaGJtTmxiRk5sYzNOcGIyNVVhVzFsYjNWMFUzUmxjRndpZlgxOWZTb3ZPMXh1Wlhod2IzSjBJSFpoY2lCemRHRnlkRk5sYzNOcGIyNVVhVzFsYjNWMFUzUmxjQ0E5SUdkc2IySmhiRlJvYVhOYlUzbHRZbTlzTG1admNpaGNJbGRQVWt0R1RFOVhYMVZUUlY5VFZFVlFYQ0lwWFNoY0luTjBaWEF2TDJWMlpVQXdMak13TGpndkwzTjBZWEowVTJWemMybHZibFJwYldWdmRYUlRkR1Z3WENJcE8xeHVaWGh3YjNKMElIWmhjaUJ6YVdkdVlXeFRaWE56YVc5dVZHbHRaVzkxZEZOMFpYQWdQU0JuYkc5aVlXeFVhR2x6VzFONWJXSnZiQzVtYjNJb1hDSlhUMUpMUmt4UFYxOVZVMFZmVTFSRlVGd2lLVjBvWENKemRHVndMeTlsZG1WQU1DNHpNQzQ0THk5emFXZHVZV3hUWlhOemFXOXVWR2x0Wlc5MWRGTjBaWEJjSWlrN1hHNWxlSEJ2Y25RZ2RtRnlJR05oYm1ObGJGTmxjM05wYjI1VWFXMWxiM1YwVTNSbGNDQTlJR2RzYjJKaGJGUm9hWE5iVTNsdFltOXNMbVp2Y2loY0lsZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVhDSXBYU2hjSW5OMFpYQXZMMlYyWlVBd0xqTXdMamd2TDJOaGJtTmxiRk5sYzNOcGIyNVVhVzFsYjNWMFUzUmxjRndpS1R0Y2JpSXNJaThxS2w5ZmFXNTBaWEp1WVd4ZmQyOXlhMlpzYjNkemUxd2lkMjl5YTJac2IzZHpYQ0k2ZTF3aVpHbHpkQzl6Y21NdlpYaGxZM1YwYVc5dUwzTmxjM05wYjI0dGRHbHRaVzkxZEMxM2IzSnJabXh2ZHk1cWMxd2lPbnRjSW5ObGMzTnBiMjVVYVcxbGIzVjBWMjl5YTJac2IzZGNJanA3WENKM2IzSnJabXh2ZDBsa1hDSTZYQ0ozYjNKclpteHZkeTh2WlhabEx5OXpaWE56YVc5dVZHbHRaVzkxZEZkdmNtdG1iRzkzWENKOWZYMTlLaTg3WEc1cGJYQnZjblI3YzJ4bFpYQjlabkp2YlZ3aUkyTnZiWEJwYkdWa0wwQjNiM0pyWm14dmR5OWpiM0psTDJsdVpHVjRMbXB6WENJN2FXMXdiM0owZTNOcFoyNWhiRk5sYzNOcGIyNVVhVzFsYjNWMFUzUmxjSDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM05sYzNOcGIyNHRkR2x0Wlc5MWRDMXpkR1Z3Y3k1cWMxd2lPMkZ6ZVc1aklHWjFibU4wYVc5dUlITmxjM05wYjI1VWFXMWxiM1YwVjI5eWEyWnNiM2NvWlNsN1lYZGhhWFFnYzJ4bFpYQW9aUzVrWldGa2JHbHVaU2tzWVhkaGFYUWdjMmxuYm1Gc1UyVnpjMmx2YmxScGJXVnZkWFJUZEdWd0tIdDBiMnRsYmpwbExuUnZhMlZ1ZlNsOVpYaHdiM0owZTNObGMzTnBiMjVVYVcxbGIzVjBWMjl5YTJac2IzZDlPMXh1YzJWemMybHZibFJwYldWdmRYUlhiM0pyWm14dmR5NTNiM0pyWm14dmQwbGtJRDBnWENKM2IzSnJabXh2ZHk4dlpYWmxMeTl6WlhOemFXOXVWR2x0Wlc5MWRGZHZjbXRtYkc5M1hDSTdYRzVuYkc5aVlXeFVhR2x6TGw5ZmNISnBkbUYwWlY5M2IzSnJabXh2ZDNNdWMyVjBLRndpZDI5eWEyWnNiM2N2TDJWMlpTOHZjMlZ6YzJsdmJsUnBiV1Z2ZFhSWGIzSnJabXh2ZDF3aUxDQnpaWE56YVc5dVZHbHRaVzkxZEZkdmNtdG1iRzkzS1R0Y2JpSXNJbU52Ym5OMElFVldSVjlRVlVKTVNVTmZVazlWVkVWZlVGSkZSa2xZWDBWT1ZqMWdSVlpGWDFCVlFreEpRMTlTVDFWVVJWOVFVa1ZHU1ZoZ08yWjFibU4wYVc5dUlHNXZjbTFoYkdsNlpWQjFZbXhwWTFKdmRYUmxVSEpsWm1sNEtHVXBlMnhsZENCMFBXVS9MblJ5YVcwb0tUdHBaaWgwUFQwOWRtOXBaQ0F3Zkh4MExteGxibWQwYUQwOVBUQXBjbVYwZFhKdU8yeGxkQ0J1UFNoMExuTjBZWEowYzFkcGRHZ29ZQzlnS1Q5ME9tQXZKSHQwZldBcExuSmxjR3hoWTJVb0wxeGNMeXNrTHl4Z1lDazdjbVYwZFhKdUlHNHViR1Z1WjNSb1BUMDlNRDkyYjJsa0lEQTZibjFsZUhCdmNuUjdSVlpGWDFCVlFreEpRMTlTVDFWVVJWOVFVa1ZHU1ZoZlJVNVdMRzV2Y20xaGJHbDZaVkIxWW14cFkxSnZkWFJsVUhKbFptbDRmVHNpTENKcGJYQnZjblI3UlZaRlgxQlZRa3hKUTE5U1QxVlVSVjlRVWtWR1NWaGZSVTVXTEc1dmNtMWhi",
	"R2w2WlZCMVlteHBZMUp2ZFhSbFVISmxabWw0ZldaeWIyMWNJaU56YUdGeVpXUXZjSFZpYkdsakxYSnZkWFJsTFhCeVpXWnBlQzVxYzF3aU8yWjFibU4wYVc5dUlISmxjMjlzZG1WV1pYSmpaV3hRY205a2RXTjBhVzl1UTJGc2JHSmhZMnRDWVhObFZYSnNLQ2w3Y21WMGRYSnVJSEJ5YjJObGMzTXVaVzUyTGxaRlVrTkZURjlGVGxZOVBUMWdjSEp2WkhWamRHbHZibUFtSm5CeWIyTmxjM011Wlc1MkxsWkZVa05GVEY5UVVrOUtSVU5VWDFCU1QwUlZRMVJKVDA1ZlZWSk1QMkJvZEhSd2N6b3ZMeVI3Y0hKdlkyVnpjeTVsYm5ZdVZrVlNRMFZNWDFCU1QwcEZRMVJmVUZKUFJGVkRWRWxQVGw5VlVreDlZRHB1ZFd4c2ZXWjFibU4wYVc5dUlISmxjMjlzZG1WWGIzSnJabXh2ZDBOaGJHeGlZV05yUW1GelpWVnliQ2h1S1h0c1pYUWdjajF3Y205alpYTnpMbVZ1ZGk1WFQxSkxSa3hQVjE5TVQwTkJURjlDUVZORlgxVlNURDh1ZEhKcGJTZ3BmSHgyYjJsa0lEQXNhVDBvY21WemIyeDJaVlpsY21ObGJGQnliMlIxWTNScGIyNURZV3hzWW1GamEwSmhjMlZWY213b0tUOC9jajgvYmlrdWNtVndiR0ZqWlNndlhGd3ZKQzhzWUdBcExHRTlibTl5YldGc2FYcGxVSFZpYkdsalVtOTFkR1ZRY21WbWFYZ29jSEp2WTJWemN5NWxiblpiUlZaRlgxQlZRa3hKUTE5U1QxVlVSVjlRVWtWR1NWaGZSVTVXWFNrN2NtVjBkWEp1SUdFOVBUMTJiMmxrSURBL2FUcGdKSHRwZlNSN1lYMWdmV1oxYm1OMGFXOXVJR055WldGMFpWZHZjbXRtYkc5M1EyRnNiR0poWTJ0VmNtd29aU3gwS1h0c1pYUWdiajF1WlhjZ1ZWSk1LR0FrZTJVdWNtVndiR0ZqWlNndlhGd3ZKQzhzWUdBcGZTUjdkSDFnS1N4eVBYQnliMk5sYzNNdVpXNTJMbFpGVWtORlRGOUJWVlJQVFVGVVNVOU9YMEpaVUVGVFUxOVRSVU5TUlZRL0xuUnlhVzBvS1R0eVpYUjFjbTRnY2lZbWJpNXpaV0Z5WTJoUVlYSmhiWE11YzJWMEtHQjRMWFpsY21ObGJDMXdjbTkwWldOMGFXOXVMV0o1Y0dGemMyQXNjaWtzYmk1MGIxTjBjbWx1WnlncGZXVjRjRzl5ZEh0amNtVmhkR1ZYYjNKclpteHZkME5oYkd4aVlXTnJWWEpzTEhKbGMyOXNkbVZXWlhKalpXeFFjbTlrZFdOMGFXOXVRMkZzYkdKaFkydENZWE5sVlhKc0xISmxjMjlzZG1WWGIzSnJabXh2ZDBOaGJHeGlZV05yUW1GelpWVnliSDA3SWl3aUx5b3FYMTlwYm5SbGNtNWhiRjkzYjNKclpteHZkM043WENKemRHVndjMXdpT250Y0ltUnBjM1F2YzNKakwyVjRaV04xZEdsdmJpOWthWE53WVhSamFDMXlkVzUwYVcxbExXRmpkR2x2Ym5NdGMzUmxjQzVxYzF3aU9udGNJbVJwYzNCaGRHTm9VblZ1ZEdsdFpVRmpkR2x2Ym5OVGRHVndYQ0k2ZTF3aWMzUmxjRWxrWENJNlhDSnpkR1Z3THk5bGRtVkFNQzR6TUM0NEx5OWthWE53WVhSamFGSjFiblJwYldWQlkzUnBiMjV6VTNSbGNGd2lmWDE5ZlNvdk8xeHVaWGh3YjNKMElIWmhjaUJrYVhOd1lYUmphRkoxYm5ScGJXVkJZM1JwYjI1elUzUmxjQ0E5SUdkc2IySmhiRlJvYVhOYlUzbHRZbTlzTG1admNpaGNJbGRQVWt0R1RFOVhYMVZUUlY5VFZFVlFYQ0lwWFNoY0luTjBaWEF2TDJWMlpVQXdMak13TGpndkwyUnBjM0JoZEdOb1VuVnVkR2x0WlVGamRHbHZibk5UZEdWd1hDSXBPMXh1SWl3aVpuVnVZM1JwYjI0Z1kyOWhiR1Z6WTJWVWRYSnVTVzV3ZFhSektHVXNkQ2w3YkdWMElHNDlZMjloYkdWelkyVkpibkIxZEZKbGMzQnZibk5sY3loN1lUcGxMbWx1Y0hWMFVtVnpjRzl1YzJWekxHSTZkQzVwYm5CMWRGSmxjM0J2Ym5ObGMzMHBMSEk5WTI5aGJHVnpZMlZOWlhOellXZGxLSHRoT21VdWJXVnpjMkZuWlN4aU9uUXViV1Z6YzJGblpYMHBMR2s5WTI5aGJHVnpZMlZEYjI1MFpYaDBLSHRoT21VdVkyOXVkR1Y0ZEN4aU9uUXVZMjl1ZEdWNGRIMHBMR0U5ZEM1dmRYUndkWFJUWTJobGJXRS9QMlV1YjNWMGNIVjBVMk5vWlcxaExHODllMzA3Y21WMGRYSnVJRzRoUFQxMmIybGtJREFtSmlodkxtbHVjSFYwVW1WemNHOXVjMlZ6UFc0cExISWhQVDEyYjJsa0lEQW1KaWh2TG0xbGMzTmhaMlU5Y2lrc2FTRTlQWFp2YVdRZ01DWW1LRzh1WTI5dWRHVjRkRDFwS1N4aElUMDlkbTlwWkNBd0ppWW9ieTV2ZFhSd2RYUlRZMmhsYldFOVlTa3NiMzFtZFc1amRHbHZiaUJ1YjNKdFlXeHBlbVZWYzJWeVEyOXVkR1Z1ZENobEtYdHBaaWhsUFQwOWRtOXBaQ0F3S1hKbGRIVnlianRwWmloMGVYQmxiMllnWlQwOVlITjBjbWx1WjJBcGNtVjBkWEp1SUdVdWRISnBiU2dwTG14bGJtZDBhRDR3UDJVNmRtOXBaQ0F3TzJ4bGRDQjBQV1V1Wm1sc2RHVnlLR1U5UG1VdWRIbHdaU0U5UFdCMFpYaDBZSHg4WlM1MFpYaDBMblJ5YVcwb0tTNXNaVzVuZEdnK01DazdhV1lvZEM1c1pXNW5kR2doUFQwd0tYSmxkSFZ5YmlCMExteGxibWQwYUQwOVBXVXViR1Z1WjNSb1AyVTZkSDFtZFc1amRHbHZiaUJ5WlhOdmJIWmxRWE56YVhOMFlXNTBVM1JsY0ZSbGVIUW9aU3gwS1h0bWIzSW9iR1YwSUhROVpTNXNaVzVuZEdndE1UdDBQajB3T3kwdGRDbDdiR1YwSUc0OVpWdDBYVHRwWmlodVB5NXliMnhsSVQwOVlHRnpjMmx6ZEdGdWRHQXBZMjl1ZEdsdWRXVTdiR1YwSUhJOVpYaDBjbUZqZEUxbGMzTmhaMlZVWlhoMEtHNHBPMmxtS0hJdWRISnBiU2dwTG14bGJtZDBhRDR3S1hKbGRIVnliaUJ5ZlhKbGRIVnliaUIwSVQwOWRtOXBaQ0F3SmlaMExuUnlhVzBvS1M1c1pXNW5kR2crTUQ5ME9tNTFiR3g5Wm5WdVkzUnBiMjRnWlhoMGNtRmpkRTFsYzNOaFoyVlVaWGgwS0dVcGUzSmxkSFZ5YmlCMGVYQmxiMllnWlM1amIyNTBaVzUwUFQxZ2MzUnlhVzVuWUQ5bExtTnZiblJsYm5RNlFYSnlZWGt1YVhOQmNuSmhlU2hsTG1OdmJuUmxiblFwUDJVdVkyOXVkR1Z1ZEM1bWJHRjBUV0Z3S0dVOVBuUjVjR1Z2WmlCbFBUMWdjM1J5YVc1bllEOWJaVjA2WUhSNWNHVmdhVzRnWlNZbVpTNTBlWEJsUFQwOVlIUmxlSFJnSmlaMGVYQmxiMllnWlM1MFpYaDBQVDFnYzNSeWFXNW5ZRDliWlM1MFpYaDBYVHBiWFNrdWFtOXBiaWhnWUNrNllHQjlablZ1WTNScGIyNGdZMjloYkdWelkyVkpibkIxZEZKbGMzQnZibk5sY3lobEtYdHNaWFFnZEQxbExtRS9QMXRkTEc0OVpTNWlQejliWFR0cFppZ2hLSFF1YkdWdVozUm9QVDA5TUNZbWJpNXNaVzVuZEdnOVBUMHdLU2x5WlhSMWNtNWJMaTR1ZEN3dUxpNXVYWDFtZFc1amRHbHZiaUJqYjJGc1pYTmpaVU52Ym5SbGVIUW9aU2w3YkdWMElIUTlaUzVoUHo5YlhTeHVQV1V1WWo4L1cxMDdhV1lvSVNoMExteGxibWQwYUQwOVBUQW1KbTR1YkdWdVozUm9QVDA5TUNrcGNtVjBkWEp1V3k0dUxuUXNMaTR1YmwxOVpuVnVZM1JwYjI0Z1kyOWhiR1Z6WTJWTlpYTnpZV2RsS0dVcGUyeGxkQ0IwUFc1dmNtMWhiR2w2WlZWelpYSkRiMjUwWlc1MEtHVXVZU2tzYmoxdWIzSnRZV3hwZW1WVmMyVnlRMjl1ZEdWdWRDaGxMbUlwTzNKbGRIVnliaUIwUFQwOWRtOXBaQ0F3UDI0NmJqMDlQWFp2YVdRZ01EOTBPbUZ3Y0dWdVpGVnpaWEpEYjI1MFpXNTBLSHRoY0hCbGJtUmxaRHB1TEdWNGFYTjBhVzVuT25SOUtYMW1kVzVqZEdsdmJpQmhjSEJsYm1SVmMyVnlRMjl1ZEdWdWRDaGxLWHR5WlhSMWNtNGdkSGx3Wlc5bUlHVXVaWGhwYzNScGJtYzlQV0J6ZEhKcGJtZGdKaVowZVhCbGIyWWdaUzVoY0hCbGJtUmxaRDA5WUhOMGNtbHVaMkEvWUNSN1pTNWxlR2x6ZEdsdVozMWNYRzVjWEc0a2UyVXVZWEJ3Wlc1a1pXUjlZRHBiTGk0dWRHOVZjMlZ5UTI5dWRHVnVkRUZ5Y21GNUtHVXVaWGhwYzNScGJtY3BMQzR1TG5SdlZYTmxja052Ym5SbGJuUkJjbkpoZVNobExtRndjR1Z1WkdWa0tWMTlablZ1WTNScGIyNGdkRzlWYzJWeVEyOXVkR1Z1ZEVGeWNtRjVLR1VwZTNKbGRIVnliaUIwZVhCbGIyWWdaVDA5WUhOMGNtbHVaMkEvWlM1c1pXNW5kR2crTUQ5YmUzUjVjR1U2WUhSbGVIUmdMSFJsZUhRNlpYMWRPbHRkT2tGeWNtRjVMbWx6UVhKeVlYa29aU2svV3k0dUxtVmRPbHRkZldaMWJtTjBhVzl1SUdOdllXeGxjMk5sUkdWc2FYWmxjbWxsY3lobEtYdHNaWFJiZEN3dUxpNXVYVDFsTzJsbUtIUTlQVDEyYjJsa0lEQXBkR2h5YjNjZ1JYSnliM0lvWUVOaGJtNXZkQ0JqYjJGc1pYTmpaU0JoYmlCbGJYQjBlU0JrWld4cGRtVnllU0JpWVhSamFDNWdLVHRzWlhRZ2NqMTBMbUYxZEdnc2FUMTBMbU5oYkd4bGNpeGhQVnN1TGk1MExuQmhlV3h2WVdSelhUdG1iM0lvYkdWMElHVWdiMllnYmlsN2FXWW9aUzVoZFhSb0lUMDlkbTlwWkNBd0ppWW9jajFsTG1GMWRHZ3BMR1V1WTJGc2JHVnlJVDA5ZG05cFpDQXdLWHRwWmlocElUMDlkbTlwWkNBd0tYUm9jbTkzSUVWeWNtOXlLR0JEWVc1dWIzUWdZMjloYkdWelkyVWdaR1ZzYVhabGNtbGxjeUJtY205dElHUnBabVpsY21WdWRDQjBkWEp1Y3k1Z0tUdHBQV1V1WTJGc2JHVnlmV0V1Y0hWemFDZ3VMaTVsTG5CaGVXeHZZV1J6S1gxeVpYUjFjbTU3TGk0dWRDeGhkWFJvT25Jc1kyRnNiR1Z5T21rc2NHRjViRzloWkhNNllYMTlaWGh3YjNKMGUyRndjR1Z1WkZWelpYSkRiMjUwWlc1MExHTnZZV3hsYzJObFJHVnNhWFpsY21sbGN5eGpiMkZzWlhOalpWUjFjbTVKYm5CMWRITXNibTl5YldGc2FYcGxWWE5sY2tOdmJuUmxiblFzY21WemIyeDJaVUZ6YzJsemRHRnVkRk4wWlhCVVpYaDBmVHNpTENKcGJYQnZjblI3WTI5aGJHVnpZMlZVZFhKdVNXNXdkWFJ6ZldaeWIyMWNJaU5vWVhKdVpYTnpMMjFsYzNOaFoyVnpMbXB6WENJN1kyOXVjM1FnUTA5QlRFVlRRMFZFWDBSRlRFbFdSVkpmUmtsRlRFUlRQVnRnWTI5dWRHVjRkR0FzWUdsdWNIVjBVbVZ6Y0c5dWMyVnpZQ3hnYldWemMyRm5aV0FzWUc5MWRIQjFkRk5qYUdWdFlXQmRPMloxYm1OMGFXOXVJR052WVd4bGMyTmxSR1ZzYVhabGNsQmhlV3h2WVdSektHNHBlMmxtS0c0dWJHVnVaM1JvUFQwOU1DbHlaWFIxY201N2ZUdHBaaWh1TG14bGJtZDBhRDA5UFRFcGNtVjBkWEp1SUc1Yk1GMC9QM3Q5TzJ4bGRDQnlQWHQ5TEdrOWUzMDdabTl5S0d4bGRDQjBJRzltSUc0cGUyWnZjaWhzWlhSYlpTeHVYVzltSUU5aWFtVmpkQzVsYm5SeWFXVnpLSFFwS1c0aFBUMTJiMmxrSURBbUppaHlXMlZkUFc0cE8yazlZMjloYkdWelkyVlVkWEp1U1c1d2RYUnpLR2tzZENsOVptOXlLR3hsZENCbElHOW1JRU5QUVV4RlUwTkZSRjlFUlV4SlZrVlNYMFpKUlV4RVV5bGtaV3hsZEdVZ2NsdGxYVHR5WlhSMWNtNGdUMkpxWldOMExtRnpjMmxuYmloeUxHa3BmV1Y0Y0c5eWRIdGpiMkZzWlhOalpVUmxiR2wyWlhKUVlYbHNiMkZrYzMwN0lpd2lMeW9xWDE5cGJuUmxjbTVoYkY5M2IzSnJabXh2ZDNON1hDSnpkR1Z3YzF3aU9udGNJbVJwYzNRdmMzSmpMMlY0WldOMWRHbHZiaTkzYjNKclpteHZkeTF6ZEdWd2N5NXFjMXdpT250Y0luUjFjbTVUZEdWd1hDSTZlMXdpYzNSbGNFbGtYQ0k2WENKemRHVndMeTlsZG1WQU1DNHpNQzQ0THk5MGRYSnVVM1JsY0Z3aWZTeGNJbkp2ZFhSbFVISnZlR2xsWkVSbGJHbDJaWEpUZEdWd1hDSTZlMXdpYzNSbGNFbGtYQ0k2WENKemRHVndMeTlsZG1WQU1DNHpNQzQ0THk5eWIzVjBaVkJ5YjNocFpXUkVaV3hwZG1WeVUzUmxjRndpZlN4Y0ltUnBjM0JoZEdOb1ZIVnlibE4wWlhCY0lqcDdYQ0p6ZEdWd1NXUmNJanBjSW5OMFpYQXZMMlYyWlVBd0xqTXdMamd2TDJScGMzQmhkR05vVkhWeWJsTjBaWEJjSW4xOWZYMHFMenRjYm1WNGNHOXlkQ0IyWVhJZ2RIVnlibE4wWlhBZ1BTQm5iRzlpWVd4VWFHbHpXMU41YldKdmJDNW1iM0lvWENKWFQxSkxSa3hQVjE5VlUwVmZVMVJGVUZ3aUtWMG9YQ0p6ZEdWd0x5OWxkbVZBTUM0ek1DNDRMeTkwZFhKdVUzUmxjRndpS1R0Y2JtVjRjRzl5ZENCMllYSWdjbTkxZEdWUWNtOTRhV1ZrUkdWc2FYWmxjbE4wWlhBZ1BTQm5iRzlpWVd4VWFHbHpXMU41YldKdmJDNW1iM0lvWENKWFQxSkxSa3hQVjE5VlUwVmZVMVJGVUZ3aUtWMG9YQ0p6ZEdWd0x5OWxkbVZBTUM0ek1DNDRMeTl5YjNWMFpWQnliM2hwWldSRVpXeHBkbVZ5VTNSbGNGd2lLVHRjYm1WNGNHOXlkQ0IyWVhJZ1pHbHpjR0YwWTJoVWRYSnVVM1JsY0NBOUlHZHNiMkpoYkZSb2FYTmJVM2x0WW05c0xtWnZjaWhjSWxkUFVrdEdURTlYWDFWVFJWOVRWRVZRWENJcFhTaGNJbk4wWlhBdkwyVjJaVUF3TGpNd0xqZ3ZMMlJwYzNCaGRHTm9WSFZ5YmxOMFpYQmNJaWs3WEc0aUxDSnBiWEJ2Y25SN1kyOWhiR1Z6WTJWRVpXeHBkbVZ5VUdGNWJHOWhaSE45Wm5KdmJWd2lJMlY0WldOMWRHbHZiaTlrWld4cGRtVnlMWEJoZVd4dllXUnpMbXB6WENJN2FXMXdiM0owZTNKdmRYUmxVSEp2ZUdsbFpFUmxiR2wyWlhKVGRHVndmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZkMjl5YTJac2IzY3RjM1JsY0hNdWFuTmNJanRoYzNsdVl5Qm1kVzVqZEdsdmJpQnliM1YwWlVSbGJHbDJaWEpVYjBOb2FXeGtjbVZ1S0dVcGUyeGxkQ0IwUFdOdllXeGxjMk5sUkdWc2FYWmxjbEJoZVd4dllXUnpLR1V1Y0dGNWJHOWhaSE1wTzNKbGRIVnliaUJsTG5ObGMzTnBiMjVUZEdGMFpTNW9ZWE5RY205NGVVbHVjSFYwVW1WeGRXVnpkSE0vWVhkaGFYUWdjbTkxZEdWUWNtOTRhV1ZrUkdWc2FYWmxjbE4wWlhBb2UyRjFkR2c2WlM1aGRYUm9MSEJoY21WdWRGZHlhWFJoWW14bE9tVXVjR0Z5Wlc1MFYzSnBkR0ZpYkdVc2NHRjViRzloWkRwMExITmxjM05wYjI1VGRHRjBaVHBsTG5ObGMzTnBiMjVUZEdGMFpYMHBPbnRyYVc1a09tQmpiMjUwYVc1MVpXQXNjbVZ0WVdsdVpHVnlPblI5ZldWNGNHOXlkSHR5YjNWMFpVUmxiR2wyWlhKVWIwTm9hV3hrY21WdWZUc2lMQ0poYzNsdVl5Qm1kVzVqZEdsdmJpQmpiR0ZwYlVodmIydFBkMjVsY25Ob2FYQW9aU2w3YkdWMElIUTdkSEo1ZTNROVlYZGhhWFFnWlM1blpYUkRiMjVtYkdsamRDZ3BmV05oZEdOb0tIUXBlM0psZEhWeWJpQmhkMkZwZENCa2FYTndiM05sUVc1a1ZHaHliM2NvWlN4dWIzSnRZV3hwZW1WSWIyOXJRMnhoYVcxRmNuSnZjaWgwTEdVdWRHOXJaVzRwS1gxcFppaDBJVDA5Ym5Wc2JDbHlaWFIxY200Z1lYZGhhWFFnWkdsemNHOXpaVUZ1WkZSb2NtOTNLR1VzWTNKbFlYUmxTRzl2YTBOdmJtWnNhV04wUlhKeWIzSW9aUzUwYjJ0bGJpeDBMbkoxYmtsa0tTbDlZWE41Ym1NZ1puVnVZM1JwYjI0Z1kyeHZjMlZJYjI5clNYUmxjbUYwYjNJb1pTbDdkSGx3Wlc5bUlHVXVjbVYwZFhKdVBUMWdablZ1WTNScGIyNWdKaVpoZDJGcGRDQmxMbkpsZEhWeWJpaDJiMmxrSURBcGZXRnplVzVqSUdaMWJtTjBhVzl1SUdScGMzQnZjMlZJYjI5cktHVXBlMnhsZENCMFBXVXVaR2x6Y0c5elpUdHBaaWgwZVhCbGIyWWdkRDA5WUdaMWJtTjBhVzl1WUNsN1lYZGhhWFFnZEM1allXeHNLR1VwTzNKbGRIVnlibjFzWlhRZ2JqMWxXMU41YldKdmJDNWthWE53YjNObFhUdDBlWEJsYjJZZ2JqMDlZR1oxYm1OMGFXOXVZQ1ltWVhkaGFYUWdiaTVqWVd4c0tHVXBmV0Z6ZVc1aklHWjFibU4wYVc5dUlHUnBjM0J2YzJWQmJtUlVhSEp2ZHlobExIUXBlM1J5ZVh0aGQyRnBkQ0JrYVhOd2IzTmxTRzl2YXlobEtYMWpZWFJqYUh0OWRHaHliM2NnZEgxbWRXNWpkR2x2YmlCdWIzSnRZV3hwZW1WSWIyOXJRMnhoYVcxRmNuSnZjaWhsTEhRcGUzSmxkSFZ5YmlCcGMwaHZiMnREYjI1bWJHbGpkRVZ5Y205eUtHVXBQMk55WldGMFpVaHZiMnREYjI1bWJHbGpkRVZ5Y205eUtIUjVjR1Z2WmlCbExuUnZhMlZ1UFQxZ2MzUnlhVzVuWUQ5bExuUnZhMlZ1T25Rc2RIbHdaVzltSUdVdVkyOXVabXhwWTNScGJtZFNkVzVKWkQwOVlITjBjbWx1WjJBL1pTNWpiMjVtYkdsamRHbHVaMUoxYmtsa09uWnZhV1FnTUNrNlpYMW1kVzVqZEdsdmJpQnBjMGh2YjJ0RGIyNW1iR2xqZEVWeWNtOXlLR1VwZTNKbGRIVnliaUIwZVhCbGIyWWdaVDA5WUc5aWFtVmpkR0FtSmlFaFpTWW1ZRzVoYldWZ2FXNGdaU1ltWlM1dVlXMWxQVDA5WUVodmIydERiMjVtYkdsamRFVnljbTl5WUgxbWRXNWpkR2x2YmlCamNtVmhkR1ZJYjI5clEyOXVabXhwWTNSRmNuSnZjaWhsTEhRcGUyeGxkQ0J1UFhROVBUMTJiMmxrSURBL1lHQTZZQ0FvY25WdUlGd2lKSHQwZlZ3aUtXQTdjbVYwZFhKdUlFOWlhbVZqZEM1aGMzTnBaMjRvUlhKeWIzSW9ZRWh2YjJzZ2RHOXJaVzRnWENJa2UyVjlYQ0lnYVhNZ1lXeHlaV0ZrZVNCcGJpQjFjMlVrZTI1OVlDa3NlMk52Ym1ac2FXTjBhVzVuVW5WdVNXUTZkQ3h1WVcxbE9tQkliMjlyUTI5dVpteHBZM1JGY25KdmNtQXNkRzlyWlc0NlpYMHBmV1Y0Y0c5eWRIdGpiR0ZwYlVodmIydFBkMjVsY25Ob2FYQXNZMnh2YzJWSWIyOXJTWFJsY21GMGIzSXNaR2x6Y0c5elpVaHZiMnNzYVhOSWIyOXJRMjl1Wm14cFkzUkZjbkp2Y24wN0lpd2lablZ1WTNScGIyNGdZV04wYVhabFZIVnlia2xrS0dVcGUzSmxkSFZ5YmlCbExuUjFjbTVKWkQwOVBXQmdQMkIwZFhKdVh5UjdaUzV6WlhGMVpXNWpaWDFnT21VdWRIVnlia2xrZldWNGNHOXlkSHRoWTNScGRtVlVkWEp1U1dSOU95SXNJbVoxYm1OMGFXOXVJRzV2Y20xaGJHbDZaVk5sY21saGJHbDZZV0pzWlVWeWNtOXlLR1VwZTNKbGRIVnliaUJsSUdsdWMzUmhibU5sYjJZZ1JYSnliM0kvZXk0dUxrOWlhbVZqZEM1bWNtOXRSVzUwY21sbGN5aFBZbXBsWTNRdVpXNTBjbWxsY3lobEtTa3NZMkYxYzJVNlpTNWpZWFZ6WlQwOVBYWnZhV1FnTUQ5MmIybGtJREE2Ym05eWJXRnNhWHBsVTJWeWFXRnNhWHBoWW14bFJYSnliM0lvWlM1allYVnpaU2tzYldWemMyRm5aVHBsTG0xbGMzTmhaMlVzYm1GdFpUcGxMbTVoYldVc2MzUmhZMnM2WlM1emRHRmphMzA2WlgxbWRXNWpkR2x2YmlCeVpXSjFhV3hrVTJWeWFXRnNhWHBoWW14bFJYSnliM0lvWlNsN2FXWW9JV2x6VW1WamIzSmtLR1VwS1hKbGRIVnliaUJGY25KdmNpaFRkSEpwYm1jb1pTa3BPMnhsZENCMFBYUjVjR1Z2WmlCbExtMWxjM05oWjJVOVBXQnpkSEpwYm1kZ1AyVXViV1Z6YzJGblpUcFRkSEpwYm1jb1pTa3NiajFGY25KdmNpaDBLVHQwZVhCbGIyWWdaUzV1WVcxbFBUMWdjM1J5YVc1bllDWW1LRzR1Ym1GdFpUMWxMbTVoYldVcExIUjVjR1Z2WmlCbExuTjBZV05yUFQxZ2MzUnlhVzVuWUNZbUtHNHVjM1JoWTJzOVpTNXpkR0ZqYXlrc1lHTmhkWE5sWUdsdUlHVW1KaWh1TG1OaGRYTmxQV2x6VW1WamIzSmtLR1V1WTJGMWMyVXBQM0psWW5WcGJHUlRaWEpwWVd4cGVtRmliR1ZGY25KdmNpaGxMbU5oZFhObEtUcGxMbU5oZFhObEtUdHNaWFFnY2oxdU8yWnZjaWhzWlhSYmRDeHVYVzltSUU5aWFtVmpkQzVsYm5SeWFXVnpLR1VwS1hROVBUMWdiV1Z6YzJGblpXQjhmSFE5UFQxZ2JtRnRaV0I4ZkhROVBUMWdjM1JoWTJ0Z2ZIeDBQVDA5WUdOaGRYTmxZSHg4S0hKYmRGMDliaWs3Y21WMGRYSnVJRzU5Wm5WdVkzUnBiMjRnYVhOU1pXTnZjbVFvWlNsN2NtVjBkWEp1SUhSNWNHVnZaaUJsUFQxZ2IySnFaV04wWUNZbUlTRmxmV1Y0Y0c5eWRIdHViM0p0WVd4cGVtVlRaWEpwWVd4cGVtRmliR1ZGY25KdmNpeHlaV0oxYVd4a1UyVnlhV0ZzYVhwaFlteGxSWEp5YjNKOU95SXNJaThxS2w5ZmFXNTBaWEp1WVd4ZmQyOXlhMlpzYjNkemUxd2ljM1JsY0hOY0lqcDdYQ0prYVhOMEwzTnlZeTlsZUdWamRYUnBiMjR2ZEhWeWJpMWpiMjUwY205c0xYQnliM1J2WTI5c0xtcHpYQ0k2ZTF3aWMyVnVaRlIxY201RGIyNTBjbTlzVTNSbGNGd2lPbnRjSW5OMFpYQkpaRndpT2x3aWMzUmxjQzh2WlhabFFEQXVNekF1T0M4dmMyVnVaRlIxY201RGIyNTBjbTlzVTNSbGNGd2lmWDE5ZlNvdk8xeHVaWGh3YjNKMElIWmhjaUJ6Wlc1a1ZIVnlia052Ym5SeWIyeFRkR1Z3SUQwZ1oyeHZZbUZzVkdocGMxdFRlVzFpYjJ3dVptOXlLRndpVjA5U1MwWk1UMWRmVlZORlgxTlVSVkJjSWlsZEtGd2ljM1JsY0M4dlpYWmxRREF1TXpBdU9DOHZjMlZ1WkZSMWNtNURiMjUwY205c1UzUmxjRndpS1R0Y2JpSXNJbU52Ym5OMElFRkhSVTVVWDBoQlRrUk1SVk5mVTFSQlZFVmZTMFZaUFdCbGRtVXVZV2RsYm5RdWFHRnVaR3hsYzJBN1pYaHdiM0owZTBGSFJVNVVYMGhCVGtSTVJWTmZVMVJCVkVWZlMwVlpmVHNpTENKcGJYQnZjblI3UVVkRlRsUmZTRUZPUkV4RlUxOVRWRUZVUlY5TFJWbDlabkp2YlZ3aUkyaGhjbTVsYzNNdmFHRnVaR3hsY3k5emRHRjBaUzFyWlhrdWFuTmNJanRtZFc1amRHbHZiaUJ5WldGa1FXZGxiblJJWVc1a2JHVnpLSFFwZTJ4bGRDQnVQWFEvTGx0QlIwVk9WRjlJUVU1RVRFVlRYMU5VUVZSRlgwdEZXVjA3YVdZb2JqMDlQWFp2YVdRZ01DbHlaWFIxY201YlhUdHNaWFFnY2oxdUxtaGhibVJzWlhNN2NtVjBkWEp1SUVGeWNtRjVMbWx6UVhKeVlYa29jaWsvY2pwYlhYMW1kVzVqZEdsdmJpQm1hVzVrVW5WdWJtbHVaMEZuWlc1MFNHRnVaR3hsS0dVc2RDbDdjbVYwZFhKdUlISmxZV1JCWjJWdWRFaGhibVJzWlhNb1pTa3VabWx1WkNobFBUNWxMbkJvWVhObFBUMDlZSEoxYm01cGJtZGdKaVpsTG05d1pYSmhkR2x2Ymk1allXeHNTV1E5UFQxMExtTmhiR3hKWkNsOVpuVnVZM1JwYjI0Z2FYTlNaWE4xYkhSQ2IzVnVaRlJ2VW5WdWJtbHVaMGhoYm1Sc1pTaGxMSFFwZTNKbGRIVnliaUIwTG10cGJtUWhQVDFnYzNWaVlXZGxiblF0Y21WemRXeDBZSHg4ZEM1dmNtbG5hVzQ5UFQxZ1pHbHpjR0YwWTJoZ2ZIeG1hVzVrVW5WdWJtbHVaMEZuWlc1MFNHRnVaR3hsS0dVc2UyTmhiR3hKWkRwMExtTmhiR3hKWkgwcElUMDlkbTlwWkNBd2ZXWjFibU4wYVc5dUlHbHpTVzVpYjNoVGRXSmhaMlZ1ZEZKbGMzVnNkRVp5YjIxU2RXNXVhVzVuU0dGdVpHeGxLR1VzZENsN2NtVjBkWEp1SUdacGJtUlNkVzV1YVc1blFXZGxiblJJWVc1a2JHVW9aU3g3WTJGc2JFbGtPblF1WTJGc2JFbGtmU2toUFQxMmIybGtJREI5Wlhod2IzSjBlMlpwYm1SU2RXNXVhVzVuUVdkbGJuUklZVzVrYkdVc2FYTkpibUp2ZUZOMVltRm5aVzUwVW1WemRXeDBSbkp2YlZKMWJtNXBibWRJWVc1a2JHVXNhWE5TWlhOMWJIUkNiM1Z1WkZSdlVuVnVibWx1WjBoaGJtUnNaWDA3SWl3aUx5b3FYMTlwYm5SbGNtNWhiRjkzYjNKclpteHZkM043WENKemRHVndjMXdpT250Y0ltUnBjM1F2YzNKakwyVjRaV04xZEdsdmJpOWpZVzVqWld3dFpHVnpZMlZ1WkdGdWRDMTBkWEp1Y3kxemRHVndMbXB6WENJNmUxd2lZMkZ1WTJWc1JHVnpZMlZ1WkdGdWRGUjFjbTV6VTNSbGNGd2lPbnRjSW5OMFpYQkpaRndpT2x3aWMzUmxjQzh2WlhabFFEQXVNekF1T0M4dlkyRnVZMlZzUkdWelkyVnVaR0Z1ZEZSMWNtNXpVM1JsY0Z3aWZYMTlmU292TzF4dVpYaHdiM0owSUhaaGNpQmpZVzVqWld4RVpYTmpaVzVrWVc1MFZIVnlibk5UZEdWd0lEMGdaMnh2WW1Gc1ZHaHBjMXRUZVcxaWIyd3VabTl5S0Z3aVYwOVNTMFpNVDFkZlZWTkZYMU5VUlZCY0lpbGRLRndpYzNSbGNDOHZaWFpsUURBdU16QXVPQzh2WTJGdVkyVnNSR1Z6WTJWdVpHRnVkRlIxY201elUzUmxjRndpS1R0Y2JpSXNJaThxS2w5ZmFXNTBaWEp1WVd4ZmQyOXlhMlpzYjNkemUxd2ljM1JsY0hOY0lqcDdYQ0prYVhOMEwzTnlZeTlsZUdWamRYUnBiMjR2WkdsemNHRjBZMmd0ZDI5eWEyWnNiM2N0Y25WdWRHbHRaUzFoWTNScGIyNXpMWE4wWlhBdWFuTmNJanA3WENKa2FYTndZWFJqYUZkdmNtdG1iRzkzVW5WdWRHbHRaVUZqZEdsdmJuTlRkR1Z3WENJNmUxd2ljM1JsY0Vsa1hDSTZYQ0p6ZEdWd0x5OWxkbVZBTUM0ek1DNDRMeTlrYVhOd1lYUmphRmR2Y210bWJHOTNVblZ1ZEdsdFpVRmpkR2x2Ym5OVGRHVndYQ0o5ZlgxOUtpODdYRzVsZUhCdmNuUWdkbUZ5SUdScGMzQmhkR05vVjI5eWEyWnNiM2RTZFc1MGFXMWxRV04wYVc5dWMxTjBaWEFnUFNCbmJHOWlZV3hVYUdselcxTjViV0p2YkM1bWIzSW9YQ0pYVDFKTFJreFBWMTlWVTBWZlUxUkZVRndpS1Ywb1hDSnpkR1Z3THk5bGRtVkFNQzR6TUM0NEx5OWthWE53WVhSamFGZHZjbXRtYkc5M1VuVnVkR2x0WlVGamRHbHZibk5UZEdWd1hDSXBPMXh1SWl3aVpuVnVZM1JwYjI0Z2NuVnVUV2xuY21GMGFXOXVRMmhoYVc0b1pTbDdhV1lvZEhsd1pXOW1JR1V1ZG1Gc2RXVWhQV0J2WW1wbFkzUmdmSHhsTG5aaGJIVmxQVDA5Ym5Wc2JDbDBhSEp2ZHlCRmNuSnZjaWhnSkh0bExteGhZbVZzZlRvZ2RtRnNkV1VnYUdGeklHNXZJRzUxYldWeWFXTWdYQ0oyWlhKemFXOXVYQ0lnWm1sbGJHUXVZQ2s3YkdWMElIUTlaUzUyWVd4MVpTNTJaWEp6YVc5dUxHNDdhV1lvZEhsd1pXOW1JSFE5UFdCdWRXMWlaWEpnS1c0OVpTNTJZV3gxWlR0bGJITmxJR2xtS0NFb1lIWmxjbk5wYjI1Z2FXNGdaUzUyWVd4MVpTa21KbVV1YVc1cGRHbGhiRlpsY25OcGIyNGhQVDEyYjJsa0lEQXBiajE3TGk0dVpTNTJZV3gxWlN4MlpYSnphVzl1T21VdWFXNXBkR2xoYkZabGNuTnBiMjU5TzJWc2MyVWdkR2h5YjNjZ1JYSnliM0lvWUNSN1pTNXNZV0psYkgwNklIWmhiSFZsSUdoaGN5QnVieUJ1ZFcxbGNtbGpJRndpZG1WeWMybHZibHdpSUdacFpXeGtMbUFwTzJ4bGRDQnlQV1V1YVc1cGRHbGhiRlpsY25OcGIyNC9QekU3YVdZb0lVNTFiV0psY2k1cGMwbHVkR1ZuWlhJb2JpNTJaWEp6YVc5dUtYeDhiaTUyWlhKemFXOXVQSElwZEdoeWIzY2dSWEp5YjNJb1lDUjdaUzVzWVdKbGJIMDZJSFpsY25OcGIyNGdKSHR1TG5abGNuTnBiMjU5SUdseklHNXZkQ0JoSUhCdmMybDBhWFpsSUdsdWRHVm5aWEl1WUNrN2FXWW9i",
	"aTUyWlhKemFXOXVQbVV1ZEdGeVoyVjBWbVZ5YzJsdmJpbDBhSEp2ZHlCRmNuSnZjaWhnSkh0bExteGhZbVZzZlRvZ1pXNWpiM1Z1ZEdWeVpXUWdkbVZ5YzJsdmJpQWtlMjR1ZG1WeWMybHZibjBzSUhkb2FXTm9JR2x6SUc1bGQyVnlJSFJvWVc0Z2RHaGxJSE4xY0hCdmNuUmxaQ0IyWlhKemFXOXVJQ1I3WlM1MFlYSm5aWFJXWlhKemFXOXVmUzRnVkdocGN5QjFjM1ZoYkd4NUlHbHVaR2xqWVhSbGN5QjBhR1VnZDJseVpTQjNZWE1nZDNKcGRIUmxiaUJpZVNCaElHNWxkMlZ5SUdWMlpTQmtaWEJzYjNsdFpXNTBJSFJvWVc0Z2RHaGxJRzl1WlNCeVpXRmthVzVuSUdsMExtQXBPMlp2Y2lnN2JpNTJaWEp6YVc5dVBHVXVkR0Z5WjJWMFZtVnljMmx2YmpzcGUyeGxkQ0IwUFdVdWJXbG5jbUYwYVc5dWN5NW1hVzVrS0dVOVBtVXVabkp2YlQwOVBXNHVkbVZ5YzJsdmJpazdhV1lvSVhRcGRHaHliM2NnUlhKeWIzSW9ZQ1I3WlM1c1lXSmxiSDA2SUc1dklHMXBaM0poZEdsdmJpQnlaV2RwYzNSbGNtVmtJR1p2Y2lCMlpYSnphVzl1SUNSN2JpNTJaWEp6YVc5dWZTRGlocElnSkh0dUxuWmxjbk5wYjI0ck1YMHVZQ2s3YVdZb2RDNTBieUU5UFhRdVpuSnZiU3N4S1hSb2NtOTNJRVZ5Y205eUtHQWtlMlV1YkdGaVpXeDlPaUJ0YVdkeVlYUnBiMjRnSkh0MExtWnliMjE5SU9LR2tpQWtlM1F1ZEc5OUlHMTFjM1FnYzNSbGNDQmxlR0ZqZEd4NUlHOXVaU0IyWlhKemFXOXVJR0YwSUdFZ2RHbHRaUzVnS1R0c1pYUWdjajEwTG0xcFozSmhkR1VvYmlrN2FXWW9jaTUyWlhKemFXOXVJVDA5ZEM1MGJ5bDBhSEp2ZHlCRmNuSnZjaWhnSkh0bExteGhZbVZzZlRvZ2JXbG5jbUYwYVc5dUlDUjdkQzVtY205dGZTRGlocElnSkh0MExuUnZmU0J3Y205a2RXTmxaQ0JoSUhaaGJIVmxJSGRwZEdnZ2RtVnljMmx2YmlBa2UzSXVkbVZ5YzJsdmJuMHVZQ2s3YmoxeWZYSmxkSFZ5YmlCdWZXVjRjRzl5ZEh0eWRXNU5hV2R5WVhScGIyNURhR0ZwYm4wN0lpd2lZMjl1YzNRZ2RIVnlibGR2Y210bWJHOTNTVzV3ZFhSV01GUnZWakU5ZTJaeWIyMDZNQ3h0YVdkeVlYUmxLR1VwZTJsbUtDRnBjMUJ5WlZabGNuTnBiMjVVZFhKdVYyOXlhMlpzYjNkSmJuQjFkQ2hsS1NsMGFISnZkeUJGY25KdmNpaGdkSFZ5YmlCM2IzSnJabXh2ZHlCcGJuQjFkRG9nZG1WeWMybHZiaUF3SUhaaGJIVmxJR2x6SUc1dmRDQmhJSEpsWTI5bmJtbDZaV1FnY0hKbExYWmxjbk5wYjI0Z2MyaGhjR1V1WUNrN2NtVjBkWEp1ZTJOaGNHRmlhV3hwZEdsbGN6cGxMbU5oY0dGaWFXeHBkR2xsY3l4amIyMXdiR1YwYVc5dVZHOXJaVzQ2WlM1amIyMXdiR1YwYVc5dVZHOXJaVzRzYlc5a1pUcGxMbTF2WkdVc2MzUmxjRWx1Y0hWME9udHBibkIxZERwbExtUmxiR2wyWlhKNUxIQmhjbVZ1ZEZkeWFYUmhZbXhsT21VdWNHRnlaVzUwVjNKcGRHRmliR1VzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2WlM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEN4elpYTnphVzl1VTNSaGRHVTZaUzV6WlhOemFXOXVVM1JoZEdWOUxIWmxjbk5wYjI0Nk1YMTlMSFJ2T2pGOU8yWjFibU4wYVc5dUlHbHpVSEpsVm1WeWMybHZibFIxY201WGIzSnJabXh2ZDBsdWNIVjBLR1VwZTNKbGRIVnliaUIwZVhCbGIyWWdaVDA5WUc5aWFtVmpkR0FtSmlFaFpTWW1ZR1JsYkdsMlpYSjVZR2x1SUdWOVpYaHdiM0owZTNSMWNtNVhiM0pyWm14dmQwbHVjSFYwVmpCVWIxWXhmVHNpTENKcGJYQnZjblI3Y25WdVRXbG5jbUYwYVc5dVEyaGhhVzU5Wm5KdmJWd2lMaTlqYUdGcGJpNXFjMXdpTzJsdGNHOXlkSHQwZFhKdVYyOXlhMlpzYjNkSmJuQjFkRll3Vkc5V01YMW1jbTl0WENJdUwzUjFjbTR0ZDI5eWEyWnNiM2N0ZGpBdGRHOHRkakV1YW5OY0lqdGpiMjV6ZENCVVZWSk9YMWRQVWt0R1RFOVhYMGxPVUZWVVgxWkZVbE5KVDA0OU1TeDBkWEp1VjI5eWEyWnNiM2RKYm5CMWRFMXBaM0poZEdsdmJuTTlXM1IxY201WGIzSnJabXh2ZDBsdWNIVjBWakJVYjFZeFhUdG1kVzVqZEdsdmJpQmpjbVZoZEdWVWRYSnVWMjl5YTJac2IzZEpibkIxZENobEtYdHlaWFIxY201N1kyRndZV0pwYkdsMGFXVnpPbVV1WTJGd1lXSnBiR2wwYVdWekxHTnZiWEJzWlhScGIyNVViMnRsYmpwbExtTnZiWEJzWlhScGIyNVViMnRsYml4a2NtbDJaWEpEWVhCaFltbHNhWFJwWlhNNmUyTmhibU5sYkd4bFpGUjFjbTVUWlhSMGJHVTZJVEFzZEhWeWJrbHVZbTk0T2lFd2ZTeHRiMlJsT21VdWJXOWtaU3h6ZEdWd1NXNXdkWFE2ZTJsdWNIVjBPbVV1WkdWc2FYWmxjbmtzY0dGeVpXNTBWM0pwZEdGaWJHVTZaUzV3WVhKbGJuUlhjbWwwWVdKc1pTeHpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREcGxMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSE5sYzNOcGIyNVRkR0YwWlRwbExuTmxjM05wYjI1VGRHRjBaWDBzZG1WeWMybHZiam94ZlgxbWRXNWpkR2x2YmlCdGFXZHlZWFJsVkhWeWJsZHZjbXRtYkc5M1NXNXdkWFFvZENsN2NtVjBkWEp1SUhKMWJrMXBaM0poZEdsdmJrTm9ZV2x1S0h0cGJtbDBhV0ZzVm1WeWMybHZiam93TEd4aFltVnNPbUIwZFhKdUlIZHZjbXRtYkc5M0lHbHVjSFYwWUN4dGFXZHlZWFJwYjI1ek9uUjFjbTVYYjNKclpteHZkMGx1Y0hWMFRXbG5jbUYwYVc5dWN5eDBZWEpuWlhSV1pYSnphVzl1T2pFc2RtRnNkV1U2ZEgwcGZXVjRjRzl5ZEh0VVZWSk9YMWRQVWt0R1RFOVhYMGxPVUZWVVgxWkZVbE5KVDA0c1kzSmxZWFJsVkhWeWJsZHZjbXRtYkc5M1NXNXdkWFFzYldsbmNtRjBaVlIxY201WGIzSnJabXh2ZDBsdWNIVjBmVHNpTENJdktpcGZYMmx1ZEdWeWJtRnNYM2R2Y210bWJHOTNjM3RjSW5OMFpYQnpYQ0k2ZTF3aVpHbHpkQzl6Y21NdlpYaGxZM1YwYVc5dUwzTjFZbUZuWlc1MExXVjJaVzUwTFhCeWIzaDVMWE4wWlhBdWFuTmNJanA3WENKeWRXNVFjbTk0ZVZOMVltRm5aVzUwUlhabGJuUlRkR1Z3WENJNmUxd2ljM1JsY0Vsa1hDSTZYQ0p6ZEdWd0x5OWxkbVZBTUM0ek1DNDRMeTl5ZFc1UWNtOTRlVk4xWW1GblpXNTBSWFpsYm5SVGRHVndYQ0o5ZlgxOUtpODdYRzVsZUhCdmNuUWdkbUZ5SUhKMWJsQnliM2g1VTNWaVlXZGxiblJGZG1WdWRGTjBaWEFnUFNCbmJHOWlZV3hVYUdselcxTjViV0p2YkM1bWIzSW9YQ0pYVDFKTFJreFBWMTlWVTBWZlUxUkZVRndpS1Ywb1hDSnpkR1Z3THk5bGRtVkFNQzR6TUM0NEx5OXlkVzVRY205NGVWTjFZbUZuWlc1MFJYWmxiblJUZEdWd1hDSXBPMXh1SWl3aVpuVnVZM1JwYjI0Z2RIVnlia05oYm1ObGJHeGhkR2x2YmtodmIydFViMnRsYmlobEtYdHlaWFIxY201Z0pIdGxmVHBqWVc1alpXeGdmV1Y0Y0c5eWRIdDBkWEp1UTJGdVkyVnNiR0YwYVc5dVNHOXZhMVJ2YTJWdWZUc2lMQ0pqYjI1emRDQlVWVkpPWDBOQlRrTkZURXhGUkY5RlVsSlBVbDlPUVUxRlBXQlVkWEp1UTJGdVkyVnNiR1ZrUlhKeWIzSmdPM1poY2lCVWRYSnVRMkZ1WTJWc2JHVmtSWEp5YjNJOVkyeGhjM01nWlhoMFpXNWtjeUJGY25KdmNudGpiMjV6ZEhKMVkzUnZjaWgwUFdCVWFHVWdkSFZ5YmlCM1lYTWdZMkZ1WTJWc2JHVmtMbUFwZTNOMWNHVnlLSFFwTEhSb2FYTXVibUZ0WlQxVVZWSk9YME5CVGtORlRFeEZSRjlGVWxKUFVsOU9RVTFGZlgwc1UyVnpjMmx2Ymt4cGJXbDBSR1ZqYkdsdVpXUkZjbkp2Y2oxamJHRnpjeUJsZUhSbGJtUnpJRlIxY201RFlXNWpaV3hzWldSRmNuSnZjbnR6WlhOemFXOXVUR2x0YVhSRVpXTnNhVzVsWkQwaE1EdGpiMjV6ZEhKMVkzUnZjaWdwZTNOMWNHVnlLR0JVYUdVZ2RYTmxjaUJrWldOc2FXNWxaQ0JoSUdaeVpYTm9JSE5sYzNOcGIyNGdkRzlyWlc0Z1luVmtaMlYwTG1BcGZYMDdablZ1WTNScGIyNGdhWE5UWlhOemFXOXVUR2x0YVhSRVpXTnNhVzVsS0dVcGUyeGxkQ0IwUFdVc2JqMXVaWGNnVTJWME8yWnZjaWc3ZEhsd1pXOW1JSFE5UFdCdlltcGxZM1JnSmlaMEppWWhiaTVvWVhNb2RDazdLWHRwWmlodUxtRmtaQ2gwS1N4MExuTmxjM05wYjI1TWFXMXBkRVJsWTJ4cGJtVmtQVDA5SVRBcGNtVjBkWEp1SVRBN2REMTBMbU5oZFhObGZYSmxkSFZ5YmlFeGZXWjFibU4wYVc5dUlHbHpWSFZ5YmtOaGJtTmxiR3hoZEdsdmJpaDBLWHRzWlhRZ2JqMTBMSEk5Ym1WM0lGTmxkRHRtYjNJb08zUjVjR1Z2WmlCdVBUMWdiMkpxWldOMFlDWW1iaVltSVhJdWFHRnpLRzRwT3lsN2FXWW9jaTVoWkdRb2Jpa3NiaTV1WVcxbFBUMDlWRlZTVGw5RFFVNURSVXhNUlVSZlJWSlNUMUpmVGtGTlJTbHlaWFIxY200aE1EdHVQVzR1WTJGMWMyVjljbVYwZFhKdUlURjlablZ1WTNScGIyNGdkR2h5YjNkSlpsUjFjbTVCWW05eWRHVmtLR1VwZTJsbUtHVS9MbUZpYjNKMFpXUTlQVDBoTUNsMGFISnZkeUJwYzFSMWNtNURZVzVqWld4c1lYUnBiMjRvWlM1eVpXRnpiMjRwUDJVdWNtVmhjMjl1T201bGR5QlVkWEp1UTJGdVkyVnNiR1ZrUlhKeWIzSjlaWGh3YjNKMGUxTmxjM05wYjI1TWFXMXBkRVJsWTJ4cGJtVmtSWEp5YjNJc1ZIVnlia05oYm1ObGJHeGxaRVZ5Y205eUxHbHpVMlZ6YzJsdmJreHBiV2wwUkdWamJHbHVaU3hwYzFSMWNtNURZVzVqWld4c1lYUnBiMjRzZEdoeWIzZEpabFIxY201QlltOXlkR1ZrZlRzaUxDSnBiWEJ2Y25SN1kzSmxZWFJsU0c5dmEzMW1jbTl0WENJalkyOXRjR2xzWldRdlFIZHZjbXRtYkc5M0wyTnZjbVV2YVc1a1pYZ3Vhbk5jSWp0cGJYQnZjblI3WTJ4aGFXMUliMjlyVDNkdVpYSnphR2x3TEdScGMzQnZjMlZJYjI5ckxHbHpTRzl2YTBOdmJtWnNhV04wUlhKeWIzSjlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOW9iMjlyTFc5M2JtVnljMmhwY0M1cWMxd2lPMmx0Y0c5eWRIdDBkWEp1UTJGdVkyVnNiR0YwYVc5dVNHOXZhMVJ2YTJWdWZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmRIVnliaTFqWVc1alpXeHNZWFJwYjI0dGRHOXJaVzR1YW5OY0lqdHBiWEJ2Y25SN1ZIVnlia05oYm1ObGJHeGxaRVZ5Y205eWZXWnliMjFjSWlOb1lYSnVaWE56TDNSMWNtNHRZMkZ1WTJWc2JHRjBhVzl1TG1welhDSTdZWE41Ym1NZ1puVnVZM1JwYjI0Z1kzSmxZWFJsVkhWeWJrTmhibU5sYkd4aGRHbHZia052Ym5SeWIyd29hU2w3YkdWMElHRTlZM0psWVhSbFNHOXZheWg3ZEc5clpXNDZkSFZ5YmtOaGJtTmxiR3hoZEdsdmJraHZiMnRVYjJ0bGJpaHBMbU52Ym5SeWIyeFViMnRsYmlsOUtTeHZQV0ZiVTNsdFltOXNMbUZ6ZVc1alNYUmxjbUYwYjNKZEtDazdkSEo1ZTJGM1lXbDBJR05zWVdsdFNHOXZhMDkzYm1WeWMyaHBjQ2hoS1gxallYUmphQ2hsS1h0cFppaHBjMGh2YjJ0RGIyNW1iR2xqZEVWeWNtOXlLR1VwS1hKbGRIVnlianQwYUhKdmR5QmxmV3hsZENCelBXNWxkeUJCWW05eWRFTnZiblJ5YjJ4c1pYSXNZejFqYjI1emRXMWxUV0YwWTJocGJtZERZVzVqWld3b2J5eHBMbVY0Y0dWamRHVmtWSFZ5Ymtsa0xDZ3BQVDU3Y3k1aFltOXlkQ2h1WlhjZ1ZIVnlia05oYm1ObGJHeGxaRVZ5Y205eUtYMHBMblJvWlc0b0tDazlQbUJqWVc1alpXeGdLU3hzUFNFeE8zSmxkSFZ5Ym50emFXZHVZV3c2Y3k1emFXZHVZV3dzY21WeGRXVnpkR1ZrT21Nc1lYTjVibU1nWkdsemNHOXpaU2dwZTJ4OGZDaHNQU0V3TEdGM1lXbDBJR1JwYzNCdmMyVkliMjlyS0dFcEtYMTlmV0Z6ZVc1aklHWjFibU4wYVc5dUlHTnZibk4xYldWTllYUmphR2x1WjBOaGJtTmxiQ2hsTEhRc2JpbDdabTl5S0RzN0tYdHNaWFFnY2oxaGQyRnBkQ0JsTG01bGVIUW9LVHRwWmloeUxtUnZibVVwY21WMGRYSnVJR0YzWVdsMElHNWxkeUJRY205dGFYTmxLQ2dwUFQ1N2ZTazdhV1lvYldGMFkyaGxjMEZqZEdsMlpWUjFjbTRvY2k1MllXeDFaU3gwS1NsN2JpZ3BPM0psZEhWeWJuMTlmV1oxYm1OMGFXOXVJRzFoZEdOb1pYTkJZM1JwZG1WVWRYSnVLR1VzZENsN2FXWW9kSGx3Wlc5bUlHVWhQV0J2WW1wbFkzUmdmSHdoWlNseVpYUjFjbTRoTUR0c1pYUWdiajFsTG5SMWNtNUpaRHR5WlhSMWNtNGdiajA5UFhadmFXUWdNSHg4YmowOVBYUjlaWGh3YjNKMGUyTnlaV0YwWlZSMWNtNURZVzVqWld4c1lYUnBiMjVEYjI1MGNtOXNmVHNpTENKcGJYQnZjblI3YzJWdVpGUjFjbTVEYjI1MGNtOXNVM1JsY0gxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDNSMWNtNHRZMjl1ZEhKdmJDMXdjbTkwYjJOdmJDNXFjMXdpTzNaaGNpQlVkWEp1UlhobFkzVjBhVzl1UTNWeWMyOXlQV05zWVhOemUyTnZiblJ5YjJ4VWIydGxianR3WVhKbGJuUlhjbWwwWVdKc1pUdGpkWEp5Wlc1MFUyVnlhV0ZzYVhwbFpFTnZiblJsZUhRN1kzVnljbVZ1ZEZObGMzTnBiMjVUZEdGMFpUdHNZWE4wVW1Wd2IzSjBaV1JEYjI1MGFXNTFZWFJwYjI1VWIydGxianRqYjI1emRISjFZM1J2Y2lobEtYdDBhR2x6TG1OdmJuUnliMnhVYjJ0bGJqMWxMbU52Ym5SeWIyeFViMnRsYml4MGFHbHpMbU4xY25KbGJuUlRaWEpwWVd4cGVtVmtRMjl1ZEdWNGREMWxMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSFJvYVhNdVkzVnljbVZ1ZEZObGMzTnBiMjVUZEdGMFpUMWxMbk5sYzNOcGIyNVRkR0YwWlN4MGFHbHpMbXhoYzNSU1pYQnZjblJsWkVOdmJuUnBiblZoZEdsdmJsUnZhMlZ1UFdVdWMyVnpjMmx2YmxOMFlYUmxMbU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVMSFJvYVhNdWNHRnlaVzUwVjNKcGRHRmliR1U5WlM1d1lYSmxiblJYY21sMFlXSnNaWDFuWlhRZ2MyVnlhV0ZzYVhwbFpFTnZiblJsZUhRb0tYdHlaWFIxY200Z2RHaHBjeTVqZFhKeVpXNTBVMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUjlaMlYwSUhObGMzTnBiMjVUZEdGMFpTZ3BlM0psZEhWeWJpQjBhR2x6TG1OMWNuSmxiblJUWlhOemFXOXVVM1JoZEdWOVlYTjVibU1nWVdSdmNIUW9aU2w3ZEdocGN5NXpaWFJUZEdGMFpTaGxLVHRzWlhRZ2REMWxMbk5sYzNOcGIyNVRkR0YwWlM1amIyNTBhVzUxWVhScGIyNVViMnRsYmp0MFBUMDlZR0I4ZkhROVBUMTBhR2x6TG14aGMzUlNaWEJ2Y25SbFpFTnZiblJwYm5WaGRHbHZibFJ2YTJWdWZId29kR2hwY3k1c1lYTjBVbVZ3YjNKMFpXUkRiMjUwYVc1MVlYUnBiMjVVYjJ0bGJqMTBMR0YzWVdsMElIUm9hWE11YzJWdVpDaDdZMjl1ZEdsdWRXRjBhVzl1Vkc5clpXNDZkQ3hyYVc1a09tQjBkWEp1TFdOdmJuUnBiblZoZEdsdmJpMTBiMnRsYm1COUtTbDlZM0psWVhSbFUzUmxjRWx1Y0hWMEtHVXNkQ2w3Y21WMGRYSnVlMkZpYjNKMFUybG5ibUZzT25Rc2FXNXdkWFE2WlN4d1lYSmxiblJYY21sMFlXSnNaVHAwYUdsekxuQmhjbVZ1ZEZkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT25Sb2FYTXVZM1Z5Y21WdWRGTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHAwYUdsekxtTjFjbkpsYm5SVFpYTnphVzl1VTNSaGRHVjlmV0Z6ZVc1aklHWnBibWx6YUNobExIUXNiaWw3ZEdocGN5NXpaWFJUZEdGMFpTaGxLU3hoZDJGcGRDQjBhR2x6TG5ObGJtUW9lMkZqZEdsdmJqcDdMaTR1ZEN4elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwMGFHbHpMbU4xY25KbGJuUlRaWEpwWVd4cGVtVmtRMjl1ZEdWNGRDeHpaWE56YVc5dVUzUmhkR1U2ZEdocGN5NWpkWEp5Wlc1MFUyVnpjMmx2YmxOMFlYUmxmU3hpZFdabVpYSmxaRVJsYkdsMlpYSnBaWE02Ymk1c1pXNW5kR2c5UFQwd1AzWnZhV1FnTURwYkxpNHVibDBzYTJsdVpEcGdkSFZ5YmkxeVpYTjFiSFJnZlNsOVlYTjVibU1nYzJWdVpDaDBLWHRoZDJGcGRDQnpaVzVrVkhWeWJrTnZiblJ5YjJ4VGRHVndLSHRqYjI1MGNtOXNWRzlyWlc0NmRHaHBjeTVqYjI1MGNtOXNWRzlyWlc0c2NHRjViRzloWkRwMGZTbDljMlYwVTNSaGRHVW9aU2w3ZEdocGN5NWpkWEp5Wlc1MFUyVnlhV0ZzYVhwbFpFTnZiblJsZUhROVpTNXpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREOC9kR2hwY3k1amRYSnlaVzUwVTJWeWFXRnNhWHBsWkVOdmJuUmxlSFFzZEdocGN5NWpkWEp5Wlc1MFUyVnpjMmx2YmxOMFlYUmxQV1V1YzJWemMybHZibE4wWVhSbGZYMDdaWGh3YjNKMGUxUjFjbTVGZUdWamRYUnBiMjVEZFhKemIzSjlPeUlzSW1aMWJtTjBhVzl1SUdkbGRGSjFiblJwYldWQlkzUnBiMjVTWlhGMVpYTjBTMlY1S0dVcGUzTjNhWFJqYUNobExtdHBibVFwZTJOaGMyVmdiRzloWkMxemEybHNiR0E2Y21WMGRYSnVZSEoxYm5ScGJXVXRZV04wYVc5dU9pUjdaUzVyYVc1a2ZUb2tlMlV1WTJGc2JFbGtmV0E3WTJGelpXQnlaVzF2ZEdVdFlXZGxiblF0WTJGc2JHQTZjbVYwZFhKdVlITjFZbUZuWlc1MExXTmhiR3c2Skh0bExuSmxiVzkwWlVGblpXNTBUbUZ0WlgwNkpIdGxMbU5oYkd4SlpIMWdPMk5oYzJWZ2MzVmlZV2RsYm5RdFkyRnNiR0E2Y21WMGRYSnVZSE4xWW1GblpXNTBMV05oYkd3NkpIdGxMbk4xWW1GblpXNTBUbUZ0WlgwNkpIdGxMbU5oYkd4SlpIMWdPMk5oYzJWZ2RHOXZiQzFqWVd4c1lEcHlaWFIxY201Z2RHOXZiQzFqWVd4c09pUjdaUzUwYjI5c1RtRnRaWDA2Skh0bExtTmhiR3hKWkgxZ2ZYMW1kVzVqZEdsdmJpQm5aWFJTZFc1MGFXMWxRV04wYVc5dVVtVnpkV3gwUzJWNUtHVXBlM04zYVhSamFDaGxMbXRwYm1RcGUyTmhjMlZnYkc5aFpDMXphMmxzYkMxeVpYTjFiSFJnT25KbGRIVnlibUJ5ZFc1MGFXMWxMV0ZqZEdsdmJqcHNiMkZrTFhOcmFXeHNPaVI3WlM1allXeHNTV1I5WUR0allYTmxZSE4xWW1GblpXNTBMWEpsYzNWc2RHQTZjbVYwZFhKdVlITjFZbUZuWlc1MExXTmhiR3c2Skh0bExuTjFZbUZuWlc1MFRtRnRaWDA2Skh0bExtTmhiR3hKWkgxZ08yTmhjMlZnZEc5dmJDMXlaWE4xYkhSZ09uSmxkSFZ5Ym1CMGIyOXNMV05oYkd3NkpIdGxMblJ2YjJ4T1lXMWxmVG9rZTJVdVkyRnNiRWxrZldCOWZXVjRjRzl5ZEh0blpYUlNkVzUwYVcxbFFXTjBhVzl1VW1WeGRXVnpkRXRsZVN4blpYUlNkVzUwYVcxbFFXTjBhVzl1VW1WemRXeDBTMlY1ZlRzaUxDSnBiWEJ2Y25SN1oyVjBVblZ1ZEdsdFpVRmpkR2x2YmxKbGMzVnNkRXRsZVgxbWNtOXRYQ0lqY25WdWRHbHRaUzloWTNScGIyNXpMMnRsZVhNdWFuTmNJanRtZFc1amRHbHZiaUJ5WlhOdmJIWmxVblZ1ZEdsdFpVRmpkR2x2YmxKbGMzVnNkSE5HYjNKTFpYbHpLSFFwZTJ4bGRDQnVQVzVsZHlCVFpYUW9kQzV3Wlc1a2FXNW5TMlY1Y3lrc2NqMXVaWGNnVFdGd08yWnZjaWhzWlhRZ2FTQnZaaUIwTG5KbGMzVnNkSE1wZTJ4bGRDQjBQV2RsZEZKMWJuUnBiV1ZCWTNScGIyNVNaWE4xYkhSTFpYa29hU2s3Ymk1b1lYTW9kQ2ttSm5JdWMyVjBLSFFzYVNsOWJHVjBJR2s5VzEwN1ptOXlLR3hsZENCbElHOW1JSFF1Y0dWdVpHbHVaMHRsZVhNcGUyeGxkQ0IwUFhJdVoyVjBLR1VwTzJsbUtIUTlQVDEyYjJsa0lEQXBjbVYwZFhKdU8ya3VjSFZ6YUNoMEtYMXlaWFIxY200Z2FYMWxlSEJ2Y25SN2NtVnpiMngyWlZKMWJuUnBiV1ZCWTNScGIyNVNaWE4xYkhSelJtOXlTMlY1YzMwN0lpd2lMeW9xWDE5cGJuUmxjbTVoYkY5M2IzSnJabXh2ZDNON1hDSjNiM0pyWm14dmQzTmNJanA3WENKa2FYTjBMM055WXk5bGVHVmpkWFJwYjI0dmRIVnliaTEzYjNKclpteHZkeTVxYzF3aU9udGNJblIxY201WGIzSnJabXh2ZDF3aU9udGNJbmR2Y210bWJHOTNTV1JjSWpwY0luZHZjbXRtYkc5M0x5OWxkbVV2TDNSMWNtNVhiM0pyWm14dmQxd2lmWDE5ZlNvdk8xeHVhVzF3YjNKMGUzSmxjMjlzZG1WWGIzSnJabXh2ZDBOaGJHeGlZV05yUW1GelpWVnliSDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM2R2Y210bWJHOTNMV05oYkd4aVlXTnJMWFZ5YkM1cWMxd2lPMmx0Y0c5eWRIdGthWE53WVhSamFGSjFiblJwYldWQlkzUnBiMjV6VTNSbGNIMW1jbTl0WENJalpYaGxZM1YwYVc5dUwyUnBjM0JoZEdOb0xYSjFiblJwYldVdFlXTjBhVzl1Y3kxemRHVndMbXB6WENJN2FXMXdiM0owZTNKdmRYUmxSR1ZzYVhabGNsUnZRMmhwYkdSeVpXNTlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOXliM1YwWlMxamFHbHNaQzFrWld4cGRtVnllUzVxYzF3aU8ybHRjRzl5ZEh0MGRYSnVVM1JsY0gxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDNkdmNtdG1iRzkzTFhOMFpYQnpMbXB6WENJN2FXMXdiM0owZTJOeVpXRjBaVWh2YjJzc1oyVjBWMjl5YTJac2IzZE5aWFJoWkdGMFlTeHpiR1ZsY0gxbWNtOXRYQ0lqWTI5dGNHbHNaV1F2UUhkdmNtdG1iRzkzTDJOdmNtVXZhVzVrWlhndWFuTmNJanRwYlhCdmNuUjdZMnhoYVcxSWIyOXJUM2R1WlhKemFHbHdMR1JwYzNCdmMyVkliMjlyTEdselNHOXZhME52Ym1ac2FXTjBSWEp5YjNKOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5b2IyOXJMVzkzYm1WeWMyaHBjQzVxYzF3aU8ybHRjRzl5ZEh0aFkzUnBkbVZVZFhKdVNXUjlabkp2YlZ3aUkyaGhjbTVsYzNNdllXTjBhWFpsTFhSMWNtNHRhV1F1YW5OY0lqdHBiWEJ2Y25SN2JtOXliV0ZzYVhwbFUyVnlhV0ZzYVhwaFlteGxSWEp5YjNKOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5M2IzSnJabXh2ZHkxbGNuSnZjbk11YW5OY0lqdHBiWEJ2Y25SN2MyVnVaRlIxY201RGIyNTBjbTlzVTNSbGNIMW1jbTl0WENJalpYaGxZM1YwYVc5dUwzUjFjbTR0WTI5dWRISnZiQzF3Y205MGIyTnZiQzVxYzF3aU8ybHRjRzl5ZEh0cGMwbHVZbTk0VTNWaVlXZGxiblJTWlhOMWJIUkdjbTl0VW5WdWJtbHVaMGhoYm1Sc1pYMW1jbTl0WENJamFHRnlibVZ6Y3k5b1lXNWtiR1Z6TDNGMVpYSjVMbXB6WENJN2FXMXdiM0owZTJOaGJtTmxiRVJsYzJObGJtUmhiblJVZFhKdWMxTjBaWEI5Wm5KdmJWd2lJMlY0WldOMWRHbHZiaTlqWVc1alpXd3RaR1Z6WTJWdVpHRnVkQzEwZFhKdWN5MXpkR1Z3TG1welhDSTdhVzF3YjNKMGUyUnBjM0JoZEdOb1YyOXlhMlpzYjNkU2RXNTBhVzFsUVdOMGFXOXVjMU4wWlhCOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5a2FYTndZWFJqYUMxM2IzSnJabXh2ZHkxeWRXNTBhVzFsTFdGamRHbHZibk10YzNSbGNDNXFjMXdpTzJsdGNHOXlkSHR0YVdkeVlYUmxWSFZ5YmxkdmNtdG1iRzkzU1c1d2RYUjlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOWtkWEpoWW14bExYTmxjM05wYjI0dGJXbG5jbUYwYVc5dWN5OTBkWEp1TFhkdmNtdG1iRzkzTG1welhDSTdhVzF3YjNKMGUzSjFibEJ5YjNoNVUzVmlZV2RsYm5SRmRtVnVkRk4wWlhCOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5emRXSmhaMlZ1ZEMxbGRtVnVkQzF3Y205NGVTMXpkR1Z3TG1welhDSTdhVzF3YjNKMGUyTnlaV0YwWlZSMWNtNURZVzVqWld4c1lYUnBiMjVEYjI1MGNtOXNmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZkSFZ5YmkxallXNWpaV3hzWVhScGIyNHRZMjl1ZEhKdmJDNXFjMXdpTzJsdGNHOXlkSHRVZFhKdVJYaGxZM1YwYVc5dVEzVnljMjl5ZldaeWIyMWNJaU5sZUdWamRYUnBiMjR2ZEhWeWJpMWxlR1ZqZFhScGIyNHRZM1Z5YzI5eUxtcHpYQ0k3YVcxd2IzSjBlM0psYzI5c2RtVlNkVzUwYVcxbFFXTjBhVzl1VW1WemRXeDBjMFp2Y2t0bGVYTjlabkp2YlZ3aUkzSjFiblJwYldVdllXTjBhVzl1Y3k5eVpYTjFiSFJ6TG1welhDSTdZMjl1YzNRZ1ZFRlRTMTlOVDBSRlgxZEJTVlJmUlZKU1QxSmZUVVZUVTBGSFJUMWNJbFJoYzJzZ2JXOWtaU0JqWVc1dWIzUWdkMkZwZENCbWIzSWdabTlzYkc5M0xYVndJR2x1Y0hWMElDaGdibVY0ZERvZ2JuVnNiR0FwTGx3aU8yWjFibU4wYVc5dUlHTmhibE5sZEhSc1pVTmhibU5sYkd4bFpGUjFjbTVCYzFCaGNtc29aU2w3Y21WMGRYSnVJR1V1Ylc5a1pUMDlQV0JqYjI1MlpYSnpZWFJwYjI1Z2ZIeGxMbk4wWlhCSmJuQjFkQzV6WlhOemFXOXVVM1JoZEdVdVkyOXVkR2x1ZFdGMGFXOXVWRzlyWlc0aFBUMWdZSDFoYzNsdVl5Qm1kVzVqZEdsdmJpQjBkWEp1VjI5eWEyWnNiM2NvWlNsN2JHVjBJSFE5YldsbmNtRjBaVlIxY201WGIzSnJabXh2ZDBsdWNIVjBLR1VwTzNKbGRIVnliaUIwTG1SeWFYWmxja05oY0dGaWFXeHBkR2xsY3o4dWRIVnlia2x1WW05NFBUMDlJVEEvY25WdVZIVnliazkzYm1Wa1YyOXlhMlpzYjNjb2RDazZjblZ1VEdWbllXTjVWSFZ5YmxkdmNtdG1iRzkzS0hRcGZXRnplVzVqSUdaMWJtTjBhVzl1SUhKMWJsUjFjbTVQZDI1bFpGZHZjbXRtYkc5M0tHNHBlMnhsZENCdlBXTnlaV0YwWlVodmIyc29lM1J2YTJWdU9tQWtlMjR1WTI5dGNHeGxkR2x2YmxSdmEyVnVmVHBwYm1KdmVHQjlLU3hqUFc5YlUzbHRZbTlzTG1GemVXNWpTWFJsY21GMGIzSmRLQ2tzYkQxdVpYY2dWSFZ5YmtWNFpXTjFkR2x2YmtOMWNuTnZjaWg3WTI5dWRISnZiRlJ2YTJWdU9tNHVZMjl0Y0d4bGRHbHZibFJ2YTJWdUxIQmhjbVZ1ZEZkeWFYUmhZbXhsT200dWMzUmxjRWx1Y0hWMExuQmhjbVZ1ZEZkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT200dWMzUmxjRWx1Y0hWMExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHB1TG5OMFpYQkpibkIxZEM1elpYTnphVzl1VTNSaGRHVjlLU3gxUFRBc2JtVjRkRVJsYkdsMlpYSjVVbVZ4ZFdWemRFbGtQU2dwUFQ1Z0pIdHZMblJ2YTJWdWZUcGtaV3hwZG1WeWVUb2tlMU4wY21sdVp5aDFLeXNwZldBc1pEMWJYU3htUFc0dWMzUmxjRWx1Y0hWMExtbHVjSFYwTEhBOUlURXNiVHQwY25sN2RISjVlMkYzWVdsMElHTnNZV2x0U0c5dmEwOTNibVZ5YzJocGNDaHZLU3h3UFNFd2ZXTmhkR05vS0dVcGUybG1LR2x6U0c5dmEwTnZibVpzYVdOMFJYSnliM0lvWlNrcGNtVjBk",
	"WEp1TzNSb2NtOTNJR1Y5Wm05eUtHNHVaSEpwZG1WeVEyRndZV0pwYkdsMGFXVnpQeTVqWVc1alpXeHNaV1JVZFhKdVUyVjBkR3hsUFQwOUlUQW1KbU5oYmxObGRIUnNaVU5oYm1ObGJHeGxaRlIxY201QmMxQmhjbXNvYmlrbUppaHRQV0YzWVdsMElHTnlaV0YwWlZSMWNtNURZVzVqWld4c1lYUnBiMjVEYjI1MGNtOXNLSHRqYjI1MGNtOXNWRzlyWlc0NmJpNWpiMjF3YkdWMGFXOXVWRzlyWlc0c1pYaHdaV04wWldSVWRYSnVTV1E2WVdOMGFYWmxWSFZ5Ymtsa0tHNHVjM1JsY0VsdWNIVjBMbk5sYzNOcGIyNVRkR0YwWlM1bGJXbHpjMmx2YmxOMFlYUmxLWDBwS1RzN0tYdHNaWFFnYVQxaGQyRnBkQ0IwZFhKdVUzUmxjQ2hzTG1OeVpXRjBaVk4wWlhCSmJuQjFkQ2htTEcwL0xuTnBaMjVoYkNrcExITTlhUzVoWTNScGIyNDlQVDFnWkdsemNHRjBZMmd0ZDI5eWEyWnNiM2N0Y25WdWRHbHRaUzFoWTNScGIyNXpZSHg4YVM1aFkzUnBiMjQ5UFQxZ2NHRnlhMkEvYVM1d1pXNWthVzVuVW5WdWRHbHRaVUZqZEdsdmJrdGxlWE02ZG05cFpDQXdPMmxtS0drdVlXTjBhVzl1UFQwOVlHTmhibU5sYkd4bFpHQjhmRzAvTG5OcFoyNWhiQzVoWW05eWRHVmtQVDA5SVRBbUpuTTlQVDEyYjJsa0lEQXBlMkYzWVdsMElHWnBibWx6YUVOaGJtTmxiR3hsWkZSMWNtNG9lMkoxWm1abGNtVmtSR1ZzYVhabGNtbGxjenBrTEdOaGJtTmxiR3hoZEdsdmJqcHRMR04xY25OdmNqcHNmU2s3Y21WMGRYSnVmV2xtS0drdWMyeGxaWEJFZFhKaGRHbHZiazF6SVQwOWRtOXBaQ0F3SmlaaGQyRnBkQ0IzWVdsMFJtOXlWSFZ5YmxOc1pXVndLR2t1YzJ4bFpYQkVkWEpoZEdsdmJrMXpMRzBwUFQwOVlHTmhibU5sYkdBcGUyRjNZV2wwSUdacGJtbHphRU5oYm1ObGJHeGxaRlIxY200b2UySjFabVpsY21Wa1JHVnNhWFpsY21sbGN6cGtMR05oYm1ObGJHeGhkR2x2YmpwdExHTjFjbk52Y2pwc2ZTazdjbVYwZFhKdWZXbG1LR2t1WVdOMGFXOXVQVDA5WUdSdmJtVmdLWHRoZDJGcGRDQnRQeTVrYVhOd2IzTmxLQ2tzWVhkaGFYUWdiQzVtYVc1cGMyZ29hU3g3YTJsdVpEcGdaRzl1WldBc2IzVjBjSFYwT21rdWIzVjBjSFYwUHo5Z1lDeHBjMFZ5Y205eU9ta3VhWE5GY25KdmNpeDFjMkZuWlRwcExuVnpZV2RsTEhWellXZGxSR1ZzZEdFNmFTNTFjMkZuWlVSbGJIUmhmU3hrS1R0eVpYUjFjbTU5YVdZb2N5RTlQWFp2YVdRZ01DbDdZWGRoYVhRZ2JDNWhaRzl3ZENocEtUdHNaWFFnYmoxaGQyRnBkQ2hwTG1GamRHbHZiajA5UFdCa2FYTndZWFJqYUMxM2IzSnJabXh2ZHkxeWRXNTBhVzFsTFdGamRHbHZibk5nUDJScGMzQmhkR05vVjI5eWEyWnNiM2RTZFc1MGFXMWxRV04wYVc5dWMxTjBaWEE2WkdsemNHRjBZMmhTZFc1MGFXMWxRV04wYVc5dWMxTjBaWEFwS0h0allXeHNZbUZqYTBKaGMyVlZjbXc2Y21WemIyeDJaVmR2Y210bWJHOTNRMkZzYkdKaFkydENZWE5sVlhKc0tHZGxkRmR2Y210bWJHOTNUV1YwWVdSaGRHRW9LUzUxY213cExIQmhjbVZ1ZEVOdmJuUnBiblZoZEdsdmJsUnZhMlZ1T204dWRHOXJaVzRzY0dGeVpXNTBWM0pwZEdGaWJHVTZiQzV3WVhKbGJuUlhjbWwwWVdKc1pTeHpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREcHNMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSE5sYzNOcGIyNVRkR0YwWlRwc0xuTmxjM05wYjI1VGRHRjBaWDBwTzJGM1lXbDBJR3d1WVdSdmNIUW9iaWs3YkdWMElISTlZWGRoYVhRZ2QyRnBkRVp2Y2xKMWJuUnBiV1ZCWTNScGIyNVNaWE4xYkhSektIdGlkV1ptWlhKbFpFUmxiR2wyWlhKcFpYTTZaQ3hqWVc1alpXeHNZWFJwYjI0NmJTeGpkWEp6YjNJNmJDeHBibUp2ZUZSdmEyVnVPbTh1ZEc5clpXNHNhVzVwZEdsaGJGSmxjM1ZzZEhNNmJpNXlaWE4xYkhSekxHbDBaWEpoZEc5eU9tTXNibVY0ZEVSbGJHbDJaWEo1VW1WeGRXVnpkRWxrTEhCbGJtUnBibWRCWTNScGIyNUxaWGx6T25OOUtUdHBaaWh5UFQwOVlHTmhibU5sYkd4bFpHQXBlMlk5ZG05cFpDQXdPMk52Ym5ScGJuVmxmV2xtS0hJOVBUMWdZMkZ1WTJWc0xYUjFjbTVnS1h0aGQyRnBkQ0JtYVc1cGMyaERZVzVqWld4c1pXUlVkWEp1S0h0aWRXWm1aWEpsWkVSbGJHbDJaWEpwWlhNNlpDeGpZVzVqWld4c1lYUnBiMjQ2YlN4amRYSnpiM0k2YkgwcE8zSmxkSFZ5Ym4xbVBYdHJhVzVrT21CeWRXNTBhVzFsTFdGamRHbHZiaTF5WlhOMWJIUmdMSEpsYzNWc2RITTZjbjA3WTI5dWRHbHVkV1Y5YVdZb2FTNWhZM1JwYjI0OVBUMWdjR0Z5YTJBcGUybG1LQ0VvYVM1b1lYTlFaVzVrYVc1blFYVjBhRzl5YVhwaGRHbHZibng4YVM1b1lYTlFaVzVrYVc1blNXNXdkWFJDWVhSamFDWW1iaTVqWVhCaFltbHNhWFJwWlhNL0xuSmxjWFZsYzNSSmJuQjFkRDA5UFNFd2ZIeHVMbTF2WkdVOVBUMWdZMjl1ZG1WeWMyRjBhVzl1WUNrcGRHaHliM2NnUlhKeWIzSW9WRUZUUzE5TlQwUkZYMWRCU1ZSZlJWSlNUMUpmVFVWVFUwRkhSU2s3WVhkaGFYUWdiVDh1WkdsemNHOXpaU2dwTEdGM1lXbDBJR3d1Wm1sdWFYTm9LR2tzZTJGMWRHaHZjbWw2WVhScGIyNU9ZVzFsY3pwcExtRjFkR2h2Y21sNllYUnBiMjVPWVcxbGN5eHJhVzVrT21Cd1lYSnJZQ3h6WlhSMGJHVmtPbWt1YzJWMGRHeGxaSDBzWkNrN2NtVjBkWEp1ZldGM1lXbDBJR3d1WVdSdmNIUW9hU2tzWmoxMmIybGtJREI5ZldOaGRHTm9LR1VwZTNSb2NtOTNJR0YzWVdsMElHd3VjMlZ1WkNoN1pYSnliM0k2Ym05eWJXRnNhWHBsVTJWeWFXRnNhWHBoWW14bFJYSnliM0lvWlNrc2EybHVaRHBnZEhWeWJpMWxjbkp2Y21COUtTeGxmV1pwYm1Gc2JIbDdiU0U5UFhadmFXUWdNQ1ltWVhkaGFYUWdiUzVrYVhOd2IzTmxLQ2tzY0NZbVlYZGhhWFFnWkdsemNHOXpaVWh2YjJzb2J5bDlmV0Z6ZVc1aklHWjFibU4wYVc5dUlHWnBibWx6YUVOaGJtTmxiR3hsWkZSMWNtNG9aU2w3WVhkaGFYUWdZMkZ1WTJWc1JHVnpZMlZ1WkdGdWRGUjFjbTV6VTNSbGNDaDdjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZaUzVqZFhKemIzSXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUXNjMlZ6YzJsdmJsTjBZWFJsT21VdVkzVnljMjl5TG5ObGMzTnBiMjVUZEdGMFpYMHBMR0YzWVdsMElHVXVZMkZ1WTJWc2JHRjBhVzl1UHk1a2FYTndiM05sS0Nrc1lYZGhhWFFnWlM1amRYSnpiM0l1Wm1sdWFYTm9LSHR6WlhOemFXOXVVM1JoZEdVNlpTNWpkWEp6YjNJdWMyVnpjMmx2YmxOMFlYUmxmU3g3WTJGdVkyVnNiR1ZrT2lFd0xHdHBibVE2WUhCaGNtdGdmU3hsTG1KMVptWmxjbVZrUkdWc2FYWmxjbWxsY3lsOVlYTjVibU1nWm5WdVkzUnBiMjRnZDJGcGRFWnZjbFIxY201VGJHVmxjQ2hsTEhRcGUybG1LSFEvTG5OcFoyNWhiQzVoWW05eWRHVmtQVDA5SVRBcGNtVjBkWEp1WUdOaGJtTmxiR0E3YkdWMElHNDljMnhsWlhBb1pTa3VkR2hsYmlnb0tUMCtZSE5zWlhCMFlDazdjbVYwZFhKdUlIUTlQVDEyYjJsa0lEQS9ianBRY205dGFYTmxMbkpoWTJVb1cyNHNkQzV5WlhGMVpYTjBaV1JkS1gxaGMzbHVZeUJtZFc1amRHbHZiaUIzWVdsMFJtOXlVblZ1ZEdsdFpVRmpkR2x2YmxKbGMzVnNkSE1vWlNsN2JHVjBJSFFzY2oxYkxpNHVaUzVwYm1sMGFXRnNVbVZ6ZFd4MGMxMDdabTl5S0RzN0tYdHNaWFFnYVQxeVpYTnZiSFpsVW5WdWRHbHRaVUZqZEdsdmJsSmxjM1ZzZEhOR2IzSkxaWGx6S0h0d1pXNWthVzVuUzJWNWN6cGxMbkJsYm1ScGJtZEJZM1JwYjI1TFpYbHpMSEpsYzNWc2RITTZjbjBwTzJsbUtHa2hQVDEyYjJsa0lEQXBjbVYwZFhKdUlIUWhQVDEyYjJsa0lEQW1KbUYzWVdsMElHVXVZM1Z5YzI5eUxuTmxibVFvZTJ0cGJtUTZZSFIxY200dFpHVnNhWFpsY25rdFkyRnVZMlZzYkdWa1lDeHlaWEYxWlhOMFNXUTZkSDBwTEdrN1pTNWpkWEp6YjNJdWMyVnpjMmx2YmxOMFlYUmxMbWhoYzFCeWIzaDVTVzV3ZFhSU1pYRjFaWE4wY3lZbWREMDlQWFp2YVdRZ01DWW1LSFE5WlM1dVpYaDBSR1ZzYVhabGNubFNaWEYxWlhOMFNXUW9LU3hoZDJGcGRDQmxMbU4xY25OdmNpNXpaVzVrS0h0amIyNTBhVzUxWVhScGIyNVViMnRsYmpwbExtTjFjbk52Y2k1elpYTnphVzl1VTNSaGRHVXVZMjl1ZEdsdWRXRjBhVzl1Vkc5clpXNHNhVzVpYjNoVWIydGxianBsTG1sdVltOTRWRzlyWlc0c2EybHVaRHBnZEhWeWJpMWtaV3hwZG1WeWVTMXlaWEYxWlhOMFlDeHlaWEYxWlhOMFNXUTZkSDBwS1R0c1pYUWdZVDFsTG1sMFpYSmhkRzl5TG01bGVIUW9LVHRoTG1OaGRHTm9LQ2dwUFQ1N2ZTazdiR1YwSUc4OVlYZGhhWFFvWlM1allXNWpaV3hzWVhScGIyNDlQVDEyYjJsa0lEQS9ZVHBRY205dGFYTmxMbkpoWTJVb1cyRXNaUzVqWVc1alpXeHNZWFJwYjI0dWNtVnhkV1Z6ZEdWa1hTa3BPMmxtS0c4OVBUMWdZMkZ1WTJWc1lDbHlaWFIxY200Z2RDRTlQWFp2YVdRZ01DWW1ZWGRoYVhRZ1pTNWpkWEp6YjNJdWMyVnVaQ2g3YTJsdVpEcGdkSFZ5Ymkxa1pXeHBkbVZ5ZVMxallXNWpaV3hzWldSZ0xISmxjWFZsYzNSSlpEcDBmU2tzWUdOaGJtTmxiR3hsWkdBN2FXWW9ieTVrYjI1bEtYUm9jbTkzSUVWeWNtOXlLR0JVZFhKdUlHbHVZbTk0SUdOc2IzTmxaQ0JpWldadmNtVWdjblZ1ZEdsdFpTQmhZM1JwYjI1eklHTnZiWEJzWlhSbFpDNWdLVHRzWlhRZ2N6MXZMblpoYkhWbE8ybG1LSE11YTJsdVpEMDlQV0J5ZFc1MGFXMWxMV0ZqZEdsdmJpMXlaWE4xYkhSZ0tYdHNaWFFnZEQxbExtTjFjbk52Y2k1elpYTnphVzl1VTNSaGRHVXVjMjVoY0hOb2IzUS9Mbk5sYzNOcGIyNHVjM1JoZEdVN2NpNXdkWE5vS0M0dUxuTXVjbVZ6ZFd4MGN5NW1hV3gwWlhJb1pUMCthWE5KYm1KdmVGTjFZbUZuWlc1MFVtVnpkV3gwUm5KdmJWSjFibTVwYm1kSVlXNWtiR1VvZEN4bEtTa3BPMk52Ym5ScGJuVmxmV2xtS0hNdWEybHVaRDA5UFdCemRXSmhaMlZ1ZEMxcGJuQjFkQzF5WlhGMVpYTjBZSHg4Y3k1cmFXNWtQVDA5WUhOMVltRm5aVzUwTFdGMWRHaHZjbWw2WVhScGIyNHRaWFpsYm5SZ0tYdHNaWFFnZEQxaGQyRnBkQ0J5ZFc1UWNtOTRlVk4xWW1GblpXNTBSWFpsYm5SVGRHVndLSHRvYjI5clVHRjViRzloWkRwekxIQmhjbVZ1ZEZkeWFYUmhZbXhsT21VdVkzVnljMjl5TG5CaGNtVnVkRmR5YVhSaFlteGxMSE5sY21saGJHbDZaV1JEYjI1MFpYaDBPbVV1WTNWeWMyOXlMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSE5sYzNOcGIyNVRkR0YwWlRwbExtTjFjbk52Y2k1elpYTnphVzl1VTNSaGRHVjlLVHRoZDJGcGRDQmxMbU4xY25OdmNpNWhaRzl3ZENoMEtUdGpiMjUwYVc1MVpYMXBaaWh6TG10cGJtUTlQVDFnWkhKcGRtVnlMV1JsYkdsMlpYSjVZQ1ltY3k1eVpYRjFaWE4wU1dROVBUMTBLWHRoZDJGcGRDQmxMbU4xY25OdmNpNXpaVzVrS0h0cmFXNWtPbUIwZFhKdUxXUmxiR2wyWlhKNUxXRmpZMlZ3ZEdWa1lDeHlaWEYxWlhOMFNXUTZjeTV5WlhGMVpYTjBTV1I5S1N4MFBYWnZhV1FnTUR0c1pYUWdjajFoZDJGcGRDQnliM1YwWlVSbGJHbDJaWEpVYjBOb2FXeGtjbVZ1S0h0aGRYUm9Pbk11WkdWc2FYWmxjbmt1WVhWMGFDeHdZWEpsYm5SWGNtbDBZV0pzWlRwbExtTjFjbk52Y2k1d1lYSmxiblJYY21sMFlXSnNaU3h3WVhsc2IyRmtjenB6TG1SbGJHbDJaWEo1TG5CaGVXeHZZV1J6TEhObGMzTnBiMjVUZEdGMFpUcGxMbU4xY25OdmNpNXpaWE56YVc5dVUzUmhkR1Y5S1R0cFppaHlMbXRwYm1ROVBUMWdZMkZ1WTJWc0xYUjFjbTVnS1hKbGRIVnliaUJ5TG10cGJtUTdjaTV5WlcxaGFXNWtaWEloUFQxMmIybGtJREFtSm1VdVluVm1abVZ5WldSRVpXeHBkbVZ5YVdWekxuQjFjMmdvZXk0dUxuTXVaR1ZzYVhabGNua3NjR0Y1Ykc5aFpITTZXM0l1Y21WdFlXbHVaR1Z5WFgwcGZYMTlZWE41Ym1NZ1puVnVZM1JwYjI0Z2NuVnVUR1ZuWVdONVZIVnlibGR2Y210bWJHOTNLR1VwZTJ4bGRDQjBQV1V1YzNSbGNFbHVjSFYwTzNSeWVYdG1iM0lvT3pzcGUyeGxkQ0J1UFdGM1lXbDBJSFIxY201VGRHVndLSFFwTzJsbUtHNHVZV04wYVc5dUlUMDlZR05oYm1ObGJHeGxaR0FtSm00dWMyeGxaWEJFZFhKaGRHbHZiazF6SVQwOWRtOXBaQ0F3SmlaaGQyRnBkQ0J6YkdWbGNDaHVMbk5zWldWd1JIVnlZWFJwYjI1TmN5a3NiaTVoWTNScGIyNDlQVDFnWkc5dVpXQXBlMkYzWVdsMElITmxibVJVZFhKdVEyOXVkSEp2YkZOMFpYQW9lMk52Ym5SeWIyeFViMnRsYmpwbExtTnZiWEJzWlhScGIyNVViMnRsYml4d1lYbHNiMkZrT250aFkzUnBiMjQ2ZTJ0cGJtUTZZR1J2Ym1WZ0xHOTFkSEIxZERwdUxtOTFkSEIxZEQ4L1lHQXNhWE5GY25KdmNqcHVMbWx6UlhKeWIzSXNjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZiaTV6WlhKcFlXeHBlbVZrUTI5dWRHVjRkQ3h6WlhOemFXOXVVM1JoZEdVNmJpNXpaWE56YVc5dVUzUmhkR1VzZFhOaFoyVTZiaTUxYzJGblpTeDFjMkZuWlVSbGJIUmhPbTR1ZFhOaFoyVkVaV3gwWVgwc2EybHVaRHBnZEhWeWJpMXlaWE4xYkhSZ2ZYMHBPM0psZEhWeWJuMXBaaWh1TG1GamRHbHZiajA5UFdCa2FYTndZWFJqYUMxM2IzSnJabXh2ZHkxeWRXNTBhVzFsTFdGamRHbHZibk5nS1h0aGQyRnBkQ0J6Wlc1a1ZIVnlia052Ym5SeWIyeFRkR1Z3S0h0amIyNTBjbTlzVkc5clpXNDZaUzVqYjIxd2JHVjBhVzl1Vkc5clpXNHNjR0Y1Ykc5aFpEcDdZV04wYVc5dU9udHJhVzVrT21Ca2FYTndZWFJqYUMxM2IzSnJabXh2ZHkxeWRXNTBhVzFsTFdGamRHbHZibk5nTEhCbGJtUnBibWRCWTNScGIyNUxaWGx6T200dWNHVnVaR2x1WjFKMWJuUnBiV1ZCWTNScGIyNUxaWGx6TEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT200dWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhRc2MyVnpjMmx2YmxOMFlYUmxPbTR1YzJWemMybHZibE4wWVhSbGZTeHJhVzVrT21CMGRYSnVMWEpsYzNWc2RHQjlmU2s3Y21WMGRYSnVmV2xtS0c0dVlXTjBhVzl1UFQwOVlIQmhjbXRnS1h0c1pYUWdkRDF1TG5CbGJtUnBibWRTZFc1MGFXMWxRV04wYVc5dVMyVjVjenRwWmlnaEtIUWhQVDEyYjJsa0lEQjhmRzR1YUdGelVHVnVaR2x1WjBGMWRHaHZjbWw2WVhScGIyNThmRzR1YUdGelVHVnVaR2x1WjBsdWNIVjBRbUYwWTJnbUptVXVZMkZ3WVdKcGJHbDBhV1Z6UHk1eVpYRjFaWE4wU1c1d2RYUTlQVDBoTUh4OFpTNXRiMlJsUFQwOVlHTnZiblpsY25OaGRHbHZibUFwS1hSb2NtOTNJRVZ5Y205eUtGUkJVMHRmVFU5RVJWOVhRVWxVWDBWU1VrOVNYMDFGVTFOQlIwVXBPMnhsZENCeVBYUTlQVDEyYjJsa0lEQS9lMnRwYm1RNllIQmhjbXRnTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT200dWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhRc2MyVnpjMmx2YmxOMFlYUmxPbTR1YzJWemMybHZibE4wWVhSbExHRjFkR2h2Y21sNllYUnBiMjVPWVcxbGN6cHVMbUYxZEdodmNtbDZZWFJwYjI1T1lXMWxjeXh6WlhSMGJHVmtPbTR1YzJWMGRHeGxaSDA2ZTJ0cGJtUTZZR1JwYzNCaGRHTm9MWEoxYm5ScGJXVXRZV04wYVc5dWMyQXNjR1Z1WkdsdVowRmpkR2x2Ymt0bGVYTTZkQ3h6WlhKcFlXeHBlbVZrUTI5dWRHVjRkRHB1TG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEhObGMzTnBiMjVUZEdGMFpUcHVMbk5sYzNOcGIyNVRkR0YwWlgwN1lYZGhhWFFnYzJWdVpGUjFjbTVEYjI1MGNtOXNVM1JsY0NoN1kyOXVkSEp2YkZSdmEyVnVPbVV1WTI5dGNHeGxkR2x2YmxSdmEyVnVMSEJoZVd4dllXUTZlMkZqZEdsdmJqcHlMR3RwYm1RNllIUjFjbTR0Y21WemRXeDBZSDE5S1R0eVpYUjFjbTU5ZEQxN2FXNXdkWFE2ZG05cFpDQXdMSEJoY21WdWRGZHlhWFJoWW14bE9uUXVjR0Z5Wlc1MFYzSnBkR0ZpYkdVc2MyVnlhV0ZzYVhwbFpFTnZiblJsZUhRNmJpNXpaWEpwWVd4cGVtVmtRMjl1ZEdWNGRDeHpaWE56YVc5dVUzUmhkR1U2Ymk1elpYTnphVzl1VTNSaGRHVjlmWDFqWVhSamFDaDBLWHQwYUhKdmR5QmhkMkZwZENCelpXNWtWSFZ5YmtOdmJuUnliMnhUZEdWd0tIdGpiMjUwY205c1ZHOXJaVzQ2WlM1amIyMXdiR1YwYVc5dVZHOXJaVzRzY0dGNWJHOWhaRHA3WlhKeWIzSTZibTl5YldGc2FYcGxVMlZ5YVdGc2FYcGhZbXhsUlhKeWIzSW9kQ2tzYTJsdVpEcGdkSFZ5YmkxbGNuSnZjbUI5ZlNrc2RIMTlaWGh3YjNKMGUzUjFjbTVYYjNKclpteHZkMzA3WEc1MGRYSnVWMjl5YTJac2IzY3VkMjl5YTJac2IzZEpaQ0E5SUZ3aWQyOXlhMlpzYjNjdkwyVjJaUzh2ZEhWeWJsZHZjbXRtYkc5M1hDSTdYRzVuYkc5aVlXeFVhR2x6TGw5ZmNISnBkbUYwWlY5M2IzSnJabXh2ZDNNdWMyVjBLRndpZDI5eWEyWnNiM2N2TDJWMlpTOHZkSFZ5YmxkdmNtdG1iRzkzWENJc0lIUjFjbTVYYjNKclpteHZkeWs3WEc0aUxDSmpiMjV6ZENCTFJWbGZVa1ZIU1ZOVVVsbGZSMHhQUWtGTVgwdEZXVDFUZVcxaWIyd3VabTl5S0dCbGRtVXVZMjl1ZEdWNGRDMXJaWGt0Y21WbmFYTjBjbmxnS1N4bmJHOWlZV3hMWlhsU1pXZHBjM1J5ZVVOdmJuUmhhVzVsY2oxbmJHOWlZV3hVYUdsek8yZHNiMkpoYkV0bGVWSmxaMmx6ZEhKNVEyOXVkR0ZwYm1WeVcwdEZXVjlTUlVkSlUxUlNXVjlIVEU5Q1FVeGZTMFZaWFQwOVBYWnZhV1FnTUNZbUtHZHNiMkpoYkV0bGVWSmxaMmx6ZEhKNVEyOXVkR0ZwYm1WeVcwdEZXVjlTUlVkSlUxUlNXVjlIVEU5Q1FVeGZTMFZaWFQxdVpYY2dUV0Z3S1R0amIyNXpkQ0JyWlhsU1pXZHBjM1J5ZVQxbmJHOWlZV3hMWlhsU1pXZHBjM1J5ZVVOdmJuUmhhVzVsY2x0TFJWbGZVa1ZIU1ZOVVVsbGZSMHhQUWtGTVgwdEZXVjA3ZG1GeUlFTnZiblJsZUhSTFpYazlZMnhoYzNON2JtRnRaVHRqYjJSbFl6dGpiMjV6ZEhKMVkzUnZjaWhsTEhROWUzMHBlM1JvYVhNdWJtRnRaVDFsTEhSb2FYTXVZMjlrWldNOWRDNWpiMlJsWXp0c1pYUWdiajFyWlhsU1pXZHBjM1J5ZVM1blpYUW9aU2s3YVdZb2JpRTlQWFp2YVdRZ01DWW1iaTVqYjJSbFl6MDlQWFp2YVdRZ01DRTlLSFJvYVhNdVkyOWtaV005UFQxMmIybGtJREFwS1hSb2NtOTNJRVZ5Y205eUtHQkRiMjUwWlhoMFMyVjVJRzVoYldVZ1kyOXNiR2x6YVc5dU9pQmNJaVI3WlgxY0lpQnBjeUJoYkhKbFlXUjVJSEpsWjJsemRHVnlaV1FnSkh0dUxtTnZaR1ZqUDJCM2FYUm9ZRHBnZDJsMGFHOTFkR0I5SUdFZ1kyOWtaV01zSUdKMWRDQmhJR3RsZVNBa2UzUm9hWE11WTI5a1pXTS9ZSGRwZEdoZ09tQjNhWFJvYjNWMFlIMGdZU0JqYjJSbFl5QnBjeUJpWldsdVp5QnlaV2RwYzNSbGNtVmtJSFZ1WkdWeUlIUm9aU0J6WVcxbElHNWhiV1V1SUZSb2FYTWdjMmxzWlc1MGJIa2dZbkpsWVd0eklHTnZiblJsZUhRZ2MyVnlhV0ZzYVhwaGRHbHZiaURpZ0pRZ2RYTmxJR0VnWkdsemRHbHVZM1FnYm1GdFpTNWdLVHRyWlhsU1pXZHBjM1J5ZVM1elpYUW9aU3gwYUdsektYMTlPMloxYm1OMGFXOXVJSEpsYzI5c2RtVkxaWGtvWlNsN2NtVjBkWEp1SUd0bGVWSmxaMmx6ZEhKNUxtZGxkQ2hsS1gxbGVIQnZjblI3UTI5dWRHVjRkRXRsZVN4eVpYTnZiSFpsUzJWNWZUc2lMQ0pwYlhCdmNuUjdRMjl1ZEdWNGRFdGxlWDFtY205dFhDSWpZMjl1ZEdWNGRDOXJaWGt1YW5OY0lqdGpiMjV6ZENCQmRYUm9TMlY1UFc1bGR5QkRiMjUwWlhoMFMyVjVLR0JsZG1VdVlYVjBhR0FwTEVsdWFYUnBZWFJ2Y2tGMWRHaExaWGs5Ym1WM0lFTnZiblJsZUhSTFpYa29ZR1YyWlM1cGJtbDBhV0YwYjNKQmRYUm9ZQ2tzVTJWemMybHZia2xrUzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVjMlZ6YzJsdmJrbGtZQ2tzUTI5dWRHbHVkV0YwYVc5dVZHOXJaVzVMWlhrOWJtVjNJRU52Ym5SbGVIUkxaWGtvWUdWMlpTNWpiMjUwYVc1MVlYUnBiMjVVYjJ0bGJtQXBMRU5vWVc1dVpXeFNaWEYxWlhOMFNXUkxaWGs5Ym1WM0lFTnZiblJsZUhSTFpYa29ZR1YyWlM1amFHRnVibVZzVW1WeGRXVnpkRWxrWUNrc1EyaGhibTVsYkVsdWMzUnlkVzFsYm5SaGRHbHZia3RsZVQxdVpYY2dRMjl1ZEdWNGRFdGxlU2hnWlhabExtTm9ZVzV1Wld4SmJuTjBjblZ0Wlc1MFlYUnBiMjVnS1N4TmIyUmxTMlY1UFc1bGR5QkRiMjUwWlhoMFMyVjVLR0JsZG1VdWJXOWtaV0FwTEZCaGNtVnVkRk5sYzNOcGIyNUxaWGs5Ym1WM0lFTnZiblJsZUhSTFpYa29ZR1YyWlM1d1lYSmxiblJUWlhOemFXOXVZQ2tzVUdGeVpXNTBWSEpoWTJWRGIyNTBaWGgwUzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVjR0Z5Wlc1MFZISmhZMlZEYjI1MFpYaDBZQ2tzVTNWaVlXZGxiblJFWlhCMGFFdGxlVDF1WlhjZ1EyOXVkR1Y0ZEV0bGVTaGdaWFpsTG5OMVltRm5aVzUwUkdWd2RHaGdLU3hEWVhCaFltbHNhWFJwWlhOTFpYazlibVYzSUVOdmJuUmxlSFJMWlhrb1lHVjJaUzVqWVhCaFltbHNhWFJwWlhOZ0tTeFRaWE56YVc5dVEyRnNiR0poWTJ0TFpYazlibVYzSUVOdmJuUmxlSFJMWlhrb1lHVjJaUzV6WlhOemFXOXVRMkZzYkdKaFkydGdLU3hUWlhOemFXOXVTMlY1UFc1bGR5QkRiMjUwWlhoMFMyVjVLR0JsZG1VdWMyVnpjMmx2Ym1BcExGTmhibVJpYjNoTFpYazlibVYzSUVOdmJuUmxlSFJMWlhrb1lHVjJaUzV6WVc1a1ltOTRZQ2tzVTJWemMybHZia1I1Ym1GdGFXTk5iMlJsYkZKbFptVnlaVzVqWlV0bGVUMXVaWGNnUTI5dWRHVjRkRXRsZVNoZ1pYWmxMbk5sYzNOcGIyNUVlVzVoYldsalRXOWtaV3hTWldabGNtVnVZMlZnS1N4VWRYSnVSSGx1WVcxcFkwMXZaR1ZzVW1WbVpYSmxibU5sUzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVkSFZ5YmtSNWJtRnRhV05OYjJSbGJGSmxabVZ5Wlc1alpXQXBMRXhwZG1WVGRHVndSSGx1WVcxcFkwMXZaR1ZzVTJWc1pXTjBhVzl1UzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXViR2wyWlZOMFpYQkVlVzVoYldsalRXOWtaV3hUWld4bFkzUnBiMjVnS1N4VFpYTnphVzl1UkhsdVlXMXBZMVJ2YjJ4TlpYUmhaR0YwWVV0bGVUMXVaWGNnUTI5dWRHVjRkRXRsZVNoZ1pYWmxMbk5sYzNOcGIyNUVlVzVoYldsalZHOXZiRTFsZEdGa1lYUmhZQ2tzVTJWemMybHZia1I1Ym1GdGFXTlViMjlzVW5WdWRHbHRaVkpsZG1semFXOXVTMlY1UFc1bGR5QkRiMjUwWlhoMFMyVjVLR0JsZG1VdWMyVnpjMmx2YmtSNWJtRnRhV05VYjI5c1VuVnVkR2x0WlZKbGRtbHphVzl1WUNrc1ZIVnlia1I1Ym1GdGFXTlViMjlzVFdWMFlXUmhkR0ZMWlhrOWJtVjNJRU52Ym5SbGVIUkxaWGtvWUdWMlpTNTBkWEp1UkhsdVlXMXBZMVJ2YjJ4TlpYUmhaR0YwWVdBcExFeHBkbVZUZEdWd1ZHOXZiSE5MWlhrOWJtVjNJRU52Ym5SbGVIUkxaWGtvWUdWMlpTNXNhWFpsVTNSbGNGUnZiMnh6WUNrc1UyVnpjMmx2YmtSNWJtRnRhV05UZFdKaFoyVnVkRk5sYkdWamRHbHZibk5MWlhrOWJtVjNJRU52Ym5SbGVIUkxaWGtvWUdWMlpTNXpaWE56YVc5dVJIbHVZVzFwWTFOMVltRm5aVzUwVTJWc1pXTjBhVzl1YzJBcExGUjFjbTVFZVc1aGJXbGpVM1ZpWVdkbGJuUlRaV3hsWTNScGIyNXpTMlY1UFc1bGR5QkRiMjUwWlhoMFMyVjVLR0JsZG1VdWRIVnlia1I1Ym1GdGFXTlRkV0poWjJWdWRGTmxiR1ZqZEdsdmJuTmdLU3hUWlhOemFXOXVSSGx1WVcxcFkxTjFZbUZuWlc1MFVuVnVkR2x0WlZKbGRtbHphVzl1UzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVjMlZ6YzJsdmJrUjVibUZ0YVdOVGRXSmhaMlZ1ZEZKMWJuUnBiV1ZTWlhacGMybHZibUFwTEVSNWJtRnRhV05UZFdKaFoyVnVkRUZuWlc1MFEyOXVabWxuUzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVaSGx1WVcxcFkxTjFZbUZuWlc1MFFXZGxiblJEYjI1bWFXZGdLU3hFZVc1aGJXbGpVMnRwYkd4TllXNXBabVZ6ZEV0bGVUMXVaWGNnUTI5dWRHVjRkRXRsZVNoZ1pYWmxMbVI1Ym1GdGFXTlRhMmxzYkUxaGJtbG1aWE4wWUNrc1UyVnpjMmx2YmtSNWJtRnRhV05KYm5OMGNuVmpkR2x2Ym5OTFpYazlibVYzSUVOdmJuUmxlSFJMWlhrb1lHVjJaUzV6WlhOemFXOXVSSGx1WVcxcFkwbHVjM1J5ZFdOMGFXOXVjMkFwTEZSMWNtNUVlVzVoYldsalNXNXpkSEoxWTNScGIyNXpTMlY1UFc1bGR5QkRiMjUwWlhoMFMyVjVLR0JsZG1VdWRIVnlia1I1Ym1GdGFXTkpibk4wY25WamRHbHZibk5nS1R0bGVIQnZjblI3UVhWMGFFdGxlU3hEWVhCaFltbHNhWFJwWlhOTFpYa3NRMmhoYm01bGJFbHVjM1J5ZFcxbGJuUmhkR2x2Ymt0bGVTeERhR0Z1Ym1Wc1VtVnhkV1Z6ZEVsa1MyVjVMRU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVTMlY1TEVSNWJtRnRhV05UYTJsc2JFMWhibWxtWlhOMFMyVjVMRVI1Ym1GdGFXTlRkV0poWjJWdWRFRm5aVzUwUTI5dVptbG5TMlY1TEVsdWFYUnBZWFJ2Y2tGMWRHaExaWGtzVEdsMlpWTjBaWEJFZVc1aGJXbGpUVzlrWld4VFpXeGxZM1JwYjI1TFpYa3NUR2wyWlZOMFpYQlViMjlzYzB0bGVTeE5iMlJsUzJWNUxGQmhjbVZ1ZEZObGMzTnBiMjVMWlhrc1VHRnlaVzUwVkhKaFkyVkRiMjUwWlhoMFMyVjVMRk5oYm1SaWIzaExaWGtzVTJWemMybHZia05oYkd4aVlXTnJTMlY1TEZObGMzTnBiMjVFZVc1aGJXbGpTVzV6ZEhKMVkzUnBiMjV6UzJWNUxGTmxjM05wYjI1RWVXNWhiV2xqVFc5a1pXeFNaV1psY21WdVkyVkxaWGtzVTJWemMybHZia1I1Ym1GdGFXTlRkV0poWjJWdWRGSjFiblJwYldWU1pYWnBjMmx2Ymt0bGVTeFRaWE56YVc5dVJIbHVZVzFwWTFOMVltRm5aVzUwVTJWc1pXTjBh",
	"Vzl1YzB0bGVTeFRaWE56YVc5dVJIbHVZVzFwWTFSdmIyeE5aWFJoWkdGMFlVdGxlU3hUWlhOemFXOXVSSGx1WVcxcFkxUnZiMnhTZFc1MGFXMWxVbVYyYVhOcGIyNUxaWGtzVTJWemMybHZia2xrUzJWNUxGTmxjM05wYjI1TFpYa3NVM1ZpWVdkbGJuUkVaWEIwYUV0bGVTeFVkWEp1UkhsdVlXMXBZMGx1YzNSeWRXTjBhVzl1YzB0bGVTeFVkWEp1UkhsdVlXMXBZMDF2WkdWc1VtVm1aWEpsYm1ObFMyVjVMRlIxY201RWVXNWhiV2xqVTNWaVlXZGxiblJUWld4bFkzUnBiMjV6UzJWNUxGUjFjbTVFZVc1aGJXbGpWRzl2YkUxbGRHRmtZWFJoUzJWNWZUc2lMQ0pwYlhCdmNuUjdVM1ZpWVdkbGJuUkVaWEIwYUV0bGVYMW1jbTl0WENJalkyOXVkR1Y0ZEM5clpYbHpMbXB6WENJN1puVnVZM1JwYjI0Z2NtVnpiMngyWlZOMVltRm5aVzUwUkdWd2RHZ29aU2w3YkdWMElIUTljR0Z5YzJWVGRXSmhaMlZ1ZEVSbGNIUm9LR1V1YzNWaVlXZGxiblJFWlhCMGFDazdjbVYwZFhKdWUyTjFjbkpsYm5SRVpYQjBhRHAwTEc1bGVIUkRhR2xzWkVSbGNIUm9PblFyTVgxOVpuVnVZM1JwYjI0Z2NtVmhaRk5sY21saGJHbDZaV1JUZFdKaFoyVnVkRVJsY0hSb0tIUXBlMnhsZENCdVBYQmhjbk5sVTNWaVlXZGxiblJFWlhCMGFDaDBXMU4xWW1GblpXNTBSR1Z3ZEdoTFpYa3VibUZ0WlYwcE8zSmxkSFZ5YmlCdVBUMDlNRDkyYjJsa0lEQTZibjFtZFc1amRHbHZiaUJwYzFOMVltRm5aVzUwUkdWc1pXZGhkR2x2YmtGamRHbHZiaWhsS1h0eVpYUjFjbTRnWlM1cmFXNWtQVDA5WUhOMVltRm5aVzUwTFdOaGJHeGdmSHhsTG10cGJtUTlQVDFnY21WdGIzUmxMV0ZuWlc1MExXTmhiR3hnZldaMWJtTjBhVzl1SUdkbGRGTjFZbUZuWlc1MFJHVnNaV2RoZEdsdmJrNWhiV1VvWlNsN2MzZHBkR05vS0dVdWEybHVaQ2w3WTJGelpXQnlaVzF2ZEdVdFlXZGxiblF0WTJGc2JHQTZjbVYwZFhKdUlHVXVjbVZ0YjNSbFFXZGxiblJPWVcxbE8yTmhjMlZnYzNWaVlXZGxiblF0WTJGc2JHQTZjbVYwZFhKdUlHVXVjM1ZpWVdkbGJuUk9ZVzFsTzJSbFptRjFiSFE2Y21WMGRYSnVJR1Y5ZldaMWJtTjBhVzl1SUhCaGNuTmxVM1ZpWVdkbGJuUkVaWEIwYUNobEtYdHlaWFIxY200Z2RIbHdaVzltSUdVOVBXQnVkVzFpWlhKZ0ppWk9kVzFpWlhJdWFYTkpiblJsWjJWeUtHVXBKaVpsUGpBL1pUb3dmV1Y0Y0c5eWRIdG5aWFJUZFdKaFoyVnVkRVJsYkdWbllYUnBiMjVPWVcxbExHbHpVM1ZpWVdkbGJuUkVaV3hsWjJGMGFXOXVRV04wYVc5dUxISmxZV1JUWlhKcFlXeHBlbVZrVTNWaVlXZGxiblJFWlhCMGFDeHlaWE52YkhabFUzVmlZV2RsYm5SRVpYQjBhSDA3SWl3aVpuVnVZM1JwYjI0Z2FYTlBZbXBsWTNRb1pTbDdjbVYwZFhKdUlIUjVjR1Z2WmlCbFBUMWdiMkpxWldOMFlDWW1JU0ZsSmlZaFFYSnlZWGt1YVhOQmNuSmhlU2hsS1gxbWRXNWpkR2x2YmlCcGMwNXZia1Z0Y0hSNVUzUnlhVzVuS0dVcGUzSmxkSFZ5YmlCMGVYQmxiMllnWlQwOVlITjBjbWx1WjJBbUptVXViR1Z1WjNSb1BqQjlablZ1WTNScGIyNGdjbVZoWkU1dmJrVnRjSFI1VTNSeWFXNW5LR1VwZTNKbGRIVnliaUJwYzA1dmJrVnRjSFI1VTNSeWFXNW5LR1VwUDJVNmRtOXBaQ0F3ZldaMWJtTjBhVzl1SUdselZHaGxibUZpYkdVb1pTbDdjbVYwZFhKdUlHbHpUMkpxWldOMEtHVXBKaVowZVhCbGIyWWdaUzUwYUdWdVBUMWdablZ1WTNScGIyNWdmV1oxYm1OMGFXOXVJR2x6UlhKeWJtOURiMlJsS0dVc2RDbDdjbVYwZFhKdUlHVWdhVzV6ZEdGdVkyVnZaaUJGY25KdmNpWW1ZR052WkdWZ2FXNGdaU1ltWlM1amIyUmxQVDA5ZEgxbWRXNWpkR2x2YmlCcGMxQnNZV2x1VW1WamIzSmtLR1VwZTJsbUtDRnBjMDlpYW1WamRDaGxLU2x5WlhSMWNtNGhNVHRzWlhRZ2REMVBZbXBsWTNRdVoyVjBVSEp2ZEc5MGVYQmxUMllvWlNrN2NtVjBkWEp1SUhROVBUMVBZbXBsWTNRdWNISnZkRzkwZVhCbGZIeDBQVDA5Ym5Wc2JIMWxlSEJ2Y25SN2FYTkZjbkp1YjBOdlpHVXNhWE5PYjI1RmJYQjBlVk4wY21sdVp5eHBjMDlpYW1WamRDeHBjMUJzWVdsdVVtVmpiM0prTEdselZHaGxibUZpYkdVc2NtVmhaRTV2YmtWdGNIUjVVM1J5YVc1bmZUc2lMQ0pwYlhCdmNuUjdRMmhoYm01bGJGSmxjWFZsYzNSSlpFdGxlWDFtY205dFhDSWpZMjl1ZEdWNGRDOXJaWGx6TG1welhDSTdhVzF3YjNKMGUybHpUbTl1Ulcxd2RIbFRkSEpwYm1kOVpuSnZiVndpSTNOb1lYSmxaQzluZFdGeVpITXVhbk5jSWp0bWRXNWpkR2x2YmlCeVpXRmtRMmhoYm01bGJFdHBibVFvWlNsN2JHVjBJRzQ5WlZ0Z1pYWmxMbU5vWVc1dVpXeGdYVDh1YTJsdVpEdHlaWFIxY200Z2FYTk9iMjVGYlhCMGVWTjBjbWx1WnlodUtUOXVPblp2YVdRZ01IMW1kVzVqZEdsdmJpQnlaV0ZrVUdGeVpXNTBUR2x1WldGblpTaGxLWHRzWlhRZ2JqMWxXMkJsZG1VdWNHRnlaVzUwVTJWemMybHZibUJkTEhJOWJqOHVZMkZzYkVsa0xHazliajh1Y205dmRGTmxjM05wYjI1SlpDeGhQVzQvTG5ObGMzTnBiMjVKWkN4dlBXNC9MblIxY200L0xtbGtPM0psZEhWeWJudGpZV3hzU1dRNmFYTk9iMjVGYlhCMGVWTjBjbWx1WnloeUtUOXlPblp2YVdRZ01DeHliMjkwVTJWemMybHZia2xrT21selRtOXVSVzF3ZEhsVGRISnBibWNvYVNrL2FUcDJiMmxrSURBc2MyVnpjMmx2Ymtsa09tbHpUbTl1Ulcxd2RIbFRkSEpwYm1jb1lTay9ZVHAyYjJsa0lEQXNkSFZ5Ymtsa09tbHpUbTl1Ulcxd2RIbFRkSEpwYm1jb2J5ay9ienAyYjJsa0lEQjlmV1oxYm1OMGFXOXVJSEpsWVdSUVlYSmxiblJUWlhOemFXOXVTV1FvWlNsN2NtVjBkWEp1SUhKbFlXUlFZWEpsYm5STWFXNWxZV2RsS0dVcExuTmxjM05wYjI1SlpIMW1kVzVqZEdsdmJpQnlaV0ZrVW05dmRGTmxjM05wYjI1SlpDaGxLWHR5WlhSMWNtNGdjbVZoWkZCaGNtVnVkRXhwYm1WaFoyVW9aU2t1Y205dmRGTmxjM05wYjI1SlpIMW1kVzVqZEdsdmJpQnlaV0ZrUTJoaGJtNWxiRkpsY1hWbGMzUkpaQ2h1S1h0c1pYUWdjajF1VzBOb1lXNXVaV3hTWlhGMVpYTjBTV1JMWlhrdWJtRnRaVjA3Y21WMGRYSnVJR2x6VG05dVJXMXdkSGxUZEhKcGJtY29jaWsvY2pwMmIybGtJREI5WTI5dWMzUWdSVlpGWDFORlUxTkpUMDVmVkVsVVRFVmZUVUZZWDBOSVFWSlRQVEV5TlR0bWRXNWpkR2x2YmlCa1pYSnBkbVZUWlhOemFXOXVWR2wwYkdVb1pTbDdiR1YwSUhROVkyOXNiR1ZqZEUxbGMzTmhaMlZVWlhoMEtHVXBPMmxtS0hROVBUMTJiMmxrSURCOGZIUXViR1Z1WjNSb1BUMDlNQ2x5WlhSMWNtNDdiR1YwSUc0OWRDNXlaWEJzWVdObEtDOWNYSE1yTDJkMUxHQWdZQ2t1ZEhKcGJTZ3BPMmxtS0c0dWJHVnVaM1JvUFQwOU1DbHlaWFIxY200N2JHVjBJSEk5UVhKeVlYa3Vabkp2YlNodUtUdHlaWFIxY200Z2NpNXNaVzVuZEdnOFBURXlOVDl1T21Ba2UzSXVjMnhwWTJVb01Dd3hNalFwTG1wdmFXNG9ZR0FwZmVLQXBtQjlablZ1WTNScGIyNGdZMjlzYkdWamRFMWxjM05oWjJWVVpYaDBLR1VwZTJsbUtIUjVjR1Z2WmlCbFBUMWdjM1J5YVc1bllDbHlaWFIxY200Z1pUdHBaaWdoUVhKeVlYa3VhWE5CY25KaGVTaGxLU2x5WlhSMWNtNDdiR1YwSUhROVcxMDdabTl5S0d4bGRDQnVJRzltSUdVcGJpWW1kSGx3Wlc5bUlHNDlQV0J2WW1wbFkzUmdKaVp1TG5SNWNHVTlQVDFnZEdWNGRHQW1KblI1Y0dWdlppQnVMblJsZUhROVBXQnpkSEpwYm1kZ0ppWjBMbkIxYzJnb2JpNTBaWGgwS1R0eVpYUjFjbTRnZEM1c1pXNW5kR2crTUQ5MExtcHZhVzRvWUNCZ0tUcDJiMmxrSURCOVpuVnVZM1JwYjI0Z1luVnBiR1JUWlhOemFXOXVRWFIwY21saWRYUmxjeWhsS1h0eVpYUjFjbTU3WENJa1pYWmxMbU5vWVc1dVpXeGZjbVZ4ZFdWemRGOXBaRndpT25KbFlXUkRhR0Z1Ym1Wc1VtVnhkV1Z6ZEVsa0tHVXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUXBMRndpSkdWMlpTNTBlWEJsWENJNllITmxjM05wYjI1Z0xGd2lKR1YyWlM1MGNtbG5aMlZ5WENJNmNtVmhaRU5vWVc1dVpXeExhVzVrS0dVdWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhRcExGd2lKR1YyWlM1MGFYUnNaVndpT21SbGNtbDJaVk5sYzNOcGIyNVVhWFJzWlNobExtbHVjSFYwVFdWemMyRm5aU2w5ZldaMWJtTjBhVzl1SUdKMWFXeGtVM1ZpWVdkbGJuUlNiMjkwUVhSMGNtbGlkWFJsY3lobEtYdHlaWFIxY201N1hDSWtaWFpsTG1Ob1lXNXVaV3hmY21WeGRXVnpkRjlwWkZ3aU9uSmxZV1JEYUdGdWJtVnNVbVZ4ZFdWemRFbGtLR1V1YzJWeWFXRnNhWHBsWkVOdmJuUmxlSFFwTEZ3aUpHVjJaUzUwZVhCbFhDSTZZSE4xWW1GblpXNTBZQ3hjSWlSbGRtVXVjR0Z5Wlc1MFhDSTZaUzV3WVhKbGJuUlRaWE56YVc5dVNXUXNYQ0lrWlhabExuQmhjbVZ1ZEY5allXeHNYQ0k2WlM1d1lYSmxiblJEWVd4c1NXUXNYQ0lrWlhabExuQmhjbVZ1ZEY5MGRYSnVYQ0k2WlM1d1lYSmxiblJVZFhKdVNXUXNYQ0lrWlhabExuSnZiM1JjSWpwbExuSnZiM1JUWlhOemFXOXVTV1FzWENJa1pYWmxMbk4xWW1GblpXNTBYQ0k2WlM1cFpHVnVkR2wwZVM1dWIyUmxTV1FzWENJa1pYWmxMblJ5YVdkblpYSmNJanB5WldGa1EyaGhibTVsYkV0cGJtUW9aUzV6WlhKcFlXeHBlbVZrUTI5dWRHVjRkQ2w5ZldaMWJtTjBhVzl1SUdKMWFXeGtWSFZ5YmtGMGRISnBZblYwWlhNb1pTbDdjbVYwZFhKdWUxd2lKR1YyWlM1amFHRnVibVZzWDNKbGNYVmxjM1JmYVdSY0lqcGxMbkpsY1hWbGMzUkpaQ3hjSWlSbGRtVXVkSGx3WlZ3aU9tQjBkWEp1WUN4Y0lpUmxkbVV1Y0dGeVpXNTBYQ0k2WlM1d1lYSmxiblJUWlhOemFXOXVTV1FzWENJa1pYWmxMbkp2YjNSY0lqcGxMbkp2YjNSVFpYTnphVzl1U1dSOWZXVjRjRzl5ZEh0RlZrVmZVMFZUVTBsUFRsOVVTVlJNUlY5TlFWaGZRMGhCVWxNc1luVnBiR1JUWlhOemFXOXVRWFIwY21saWRYUmxjeXhpZFdsc1pGTjFZbUZuWlc1MFVtOXZkRUYwZEhKcFluVjBaWE1zWW5WcGJHUlVkWEp1UVhSMGNtbGlkWFJsY3l4a1pYSnBkbVZUWlhOemFXOXVWR2wwYkdVc2NtVmhaRU5vWVc1dVpXeExhVzVrTEhKbFlXUkRhR0Z1Ym1Wc1VtVnhkV1Z6ZEVsa0xISmxZV1JRWVhKbGJuUk1hVzVsWVdkbExISmxZV1JRWVhKbGJuUlRaWE56YVc5dVNXUXNjbVZoWkZKdmIzUlRaWE56YVc5dVNXUjlPeUlzSWk4cUtsOWZhVzUwWlhKdVlXeGZkMjl5YTJac2IzZHplMXdpYzNSbGNITmNJanA3WENKa2FYTjBMM055WXk5bGVHVmpkWFJwYjI0dlpHVnNaV2RoZEdWa0xYQmhjbVZ1ZEMxdWIzUnBabWxqWVhScGIyNHVhbk5jSWpwN1hDSnViM1JwWm5sRVpXeGxaMkYwWldSUVlYSmxiblJUZEdWd1hDSTZlMXdpYzNSbGNFbGtYQ0k2WENKemRHVndMeTlsZG1WQU1DNHpNQzQ0THk5dWIzUnBabmxFWld4bFoyRjBaV1JRWVhKbGJuUlRkR1Z3WENKOUxGd2libTkwYVdaNVZIVnlia05oYkd4bGNsTjBaWEJjSWpwN1hDSnpkR1Z3U1dSY0lqcGNJbk4wWlhBdkwyVjJaVUF3TGpNd0xqZ3ZMMjV2ZEdsbWVWUjFjbTVEWVd4c1pYSlRkR1Z3WENKOUxGd2ljbVZ6YjJ4MlpVbHVhWFJwWVd4VWRYSnVRMkZzYkdWeVUzUmxjRndpT250Y0luTjBaWEJKWkZ3aU9sd2ljM1JsY0M4dlpYWmxRREF1TXpBdU9DOHZjbVZ6YjJ4MlpVbHVhWFJwWVd4VWRYSnVRMkZzYkdWeVUzUmxjRndpZlgxOWZTb3ZPMXh1Wlhod2IzSjBJSFpoY2lCdWIzUnBabmxFWld4bFoyRjBaV1JRWVhKbGJuUlRkR1Z3SUQwZ1oyeHZZbUZzVkdocGMxdFRlVzFpYjJ3dVptOXlLRndpVjA5U1MwWk1UMWRmVlZORlgxTlVSVkJjSWlsZEtGd2ljM1JsY0M4dlpYWmxRREF1TXpBdU9DOHZibTkwYVdaNVJHVnNaV2RoZEdWa1VHRnlaVzUwVTNSbGNGd2lLVHRjYm1WNGNHOXlkQ0IyWVhJZ2JtOTBhV1o1VkhWeWJrTmhiR3hsY2xOMFpYQWdQU0JuYkc5aVlXeFVhR2x6VzFONWJXSnZiQzVtYjNJb1hDSlhUMUpMUmt4UFYxOVZVMFZmVTFSRlVGd2lLVjBvWENKemRHVndMeTlsZG1WQU1DNHpNQzQ0THk5dWIzUnBabmxVZFhKdVEyRnNiR1Z5VTNSbGNGd2lLVHRjYm1WNGNHOXlkQ0IyWVhJZ2NtVnpiMngyWlVsdWFYUnBZV3hVZFhKdVEyRnNiR1Z5VTNSbGNDQTlJR2RzYjJKaGJGUm9hWE5iVTNsdFltOXNMbVp2Y2loY0lsZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVhDSXBYU2hjSW5OMFpYQXZMMlYyWlVBd0xqTXdMamd2TDNKbGMyOXNkbVZKYm1sMGFXRnNWSFZ5YmtOaGJHeGxjbE4wWlhCY0lpazdYRzRpTENKcGJYQnZjblI3YVhOUFltcGxZM1I5Wm5KdmJWd2lJM05vWVhKbFpDOW5kV0Z5WkhNdWFuTmNJanRtZFc1amRHbHZiaUIwYjBWeWNtOXlUV1Z6YzJGblpTaDBLWHR5WlhSMWNtNGdkQ0JwYm5OMFlXNWpaVzltSUVWeWNtOXlQM1F1YldWemMyRm5aVHAwZVhCbGIyWWdkRDA5WUhOMGNtbHVaMkEvZERwMFBUMXVkV3hzUDFOMGNtbHVaeWgwS1RwcGMwOWlhbVZqZENoMEtUOTBlWEJsYjJZZ2RDNXRaWE56WVdkbFBUMWdjM1J5YVc1bllDWW1kQzV0WlhOellXZGxMbXhsYm1kMGFENHdQM1F1YldWemMyRm5aVHB6WVdabFNuTnZibE4wY21sdVoybG1lU2gwS1RwVGRISnBibWNvZENsOVpuVnVZM1JwYjI0Z2RHOUZjbkp2Y2loMEtYdHBaaWgwSUdsdWMzUmhibU5sYjJZZ1JYSnliM0lwY21WMGRYSnVJSFE3YkdWMElHNDlSWEp5YjNJb2RHOUZjbkp2Y2sxbGMzTmhaMlVvZENrcE8zSmxkSFZ5YmlCcGMwOWlhbVZqZENoMEtUOG9kSGx3Wlc5bUlIUXVibUZ0WlQwOVlITjBjbWx1WjJBbUpuUXVibUZ0WlM1c1pXNW5kR2crTUNZbUtHNHVibUZ0WlQxMExtNWhiV1VwTEhSNWNHVnZaaUIwTG5OMFlXTnJQVDFnYzNSeWFXNW5ZQ1ltZEM1emRHRmpheTVzWlc1bmRHZytNQ1ltS0c0dWMzUmhZMnM5ZEM1emRHRmpheWtzWUdOaGRYTmxZR2x1SUhRbUpuUXVZMkYxYzJVaFBUMTJiMmxrSURBbUpuUXVZMkYxYzJVaFBUMTBKaVlvYmk1allYVnpaVDEwTG1OaGRYTmxLU3h1S1RwdWZXWjFibU4wYVc5dUtuZGhiR3REWVhWelpVTm9ZV2x1S0hRcGUyeGxkQ0J1UFc1bGR5QlRaWFFzY2oxME8yWnZjaWc3YVhOUFltcGxZM1FvY2lrbUppRnVMbWhoY3loeUtUc3BiaTVoWkdRb2Npa3NlV2xsYkdRZ2NpeHlQWEl1WTJGMWMyVjlablZ1WTNScGIyNGdjMkZtWlVwemIyNVRkSEpwYm1kcFpua29aU2w3ZEhKNWUzSmxkSFZ5YmlCS1UwOU9Mbk4wY21sdVoybG1lU2hsS1Q4L1UzUnlhVzVuS0dVcGZXTmhkR05vZTNKbGRIVnliaUJUZEhKcGJtY29aU2w5ZldWNGNHOXlkSHQwYjBWeWNtOXlMSFJ2UlhKeWIzSk5aWE56WVdkbExIZGhiR3REWVhWelpVTm9ZV2x1ZlRzaUxDSmpiMjV6ZENCQlIwVk9WRjlOU1ZOTlFWUkRTRDFnUVVkRlRsUmZUVWxUVFVGVVEwaGdMRUZIUlU1VVgxVk9Va1ZCUTBoQlFreEZQV0JCUjBWT1ZGOVZUbEpGUVVOSVFVSk1SV0FzUVVkRlRsUmZRbFZUV1QxZ1FVZEZUbFJmUWxWVFdXQXNVMVZDUVVkRlRsUmZVMVJCVWxSZlJrRkpURVZFUFdCVFZVSkJSMFZPVkY5VFZFRlNWRjlHUVVsTVJVUmdMRk5WUWtGSFJVNVVYMFZZUlVOVlZFbFBUbDlHUVVsTVJVUTlZRk5WUWtGSFJVNVVYMFZZUlVOVlZFbFBUbDlHUVVsTVJVUmdMRkpGVFU5VVJWOUJSMFZPVkY5VFZFRlNWRjlHUVVsTVJVUTlZRkpGVFU5VVJWOUJSMFZPVkY5VFZFRlNWRjlHUVVsTVJVUmdMRkpGVFU5VVJWOUJSMFZPVkY5R1FVbE1SVVE5WUZKRlRVOVVSVjlCUjBWT1ZGOUdRVWxNUlVSZ0xGTkZVMU5KVDA1ZlJrRkpURVZFUFdCVFJWTlRTVTlPWDBaQlNVeEZSR0E3Wlhod2IzSjBlMEZIUlU1VVgwSlZVMWtzUVVkRlRsUmZUVWxUVFVGVVEwZ3NRVWRGVGxSZlZVNVNSVUZEU0VGQ1RFVXNVa1ZOVDFSRlgwRkhSVTVVWDBaQlNVeEZSQ3hTUlUxUFZFVmZRVWRGVGxSZlUxUkJVbFJmUmtGSlRFVkVMRk5GVTFOSlQwNWZSa0ZKVEVWRUxGTlZRa0ZIUlU1VVgwVllSVU5WVkVsUFRsOUdRVWxNUlVRc1UxVkNRVWRGVGxSZlUxUkJVbFJmUmtGSlRFVkVmVHNpTENKamIyNXpkQ0JUVlVKQlIwVk9WRjlCUkVGUVZFVlNYMHRKVGtROVlITjFZbUZuWlc1MFlEdG1kVzVqZEdsdmJpQnBjMU4xWW1GblpXNTBRV1JoY0hSbGNsTjBZWFJsS0dVcGUybG1LSFI1Y0dWdlppQmxJVDFnYjJKcVpXTjBZSHg4SVdVcGNtVjBkWEp1SVRFN2JHVjBJSFE5WlR0eVpYUjFjbTRnZEhsd1pXOW1JSFF1WTJGc2JFbGtQVDFnYzNSeWFXNW5ZQ1ltZEM1allXeHNTV1F1YkdWdVozUm9QakFtSm5SNWNHVnZaaUIwTG5CaGNtVnVkRU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVQVDFnYzNSeWFXNW5ZQ1ltZEM1d1lYSmxiblJEYjI1MGFXNTFZWFJwYjI1VWIydGxiaTVzWlc1bmRHZytNQ1ltZEhsd1pXOW1JSFF1Y0dGeVpXNTBVMlZ6YzJsdmJrbGtQVDFnYzNSeWFXNW5ZQ1ltZEhsd1pXOW1JSFF1YzNWaVlXZGxiblJPWVcxbFBUMWdjM1J5YVc1bllDWW1kQzV6ZFdKaFoyVnVkRTVoYldVdWJHVnVaM1JvUGpCOVpYaHdiM0owZTFOVlFrRkhSVTVVWDBGRVFWQlVSVkpmUzBsT1JDeHBjMU4xWW1GblpXNTBRV1JoY0hSbGNsTjBZWFJsZlRzaUxDSnBiWEJ2Y25SN2RHOUZjbkp2Y2sxbGMzTmhaMlY5Wm5KdmJWd2lJM05vWVhKbFpDOWxjbkp2Y25NdWFuTmNJanRwYlhCdmNuUjdVMVZDUVVkRlRsUmZSVmhGUTFWVVNVOU9YMFpCU1V4RlJIMW1jbTl0WENJamFHRnlibVZ6Y3k5aFoyVnVkQzFvWVc1a2JHVXRaWEp5YjNKekxtcHpYQ0k3YVcxd2IzSjBlMU5WUWtGSFJVNVVYMEZFUVZCVVJWSmZTMGxPUkgxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDNOMVltRm5aVzUwTFdGa1lYQjBaWEl0YzNSaGRHVXVhbk5jSWp0amIyNXpkQ0JhUlZKUFgxUlBTMFZPWDFWVFFVZEZQWHRqWVdOb1pWSmxZV1JVYjJ0bGJuTTZNQ3hqWVdOb1pWZHlhWFJsVkc5clpXNXpPakFzYVc1d2RYUlViMnRsYm5NNk1DeHZkWFJ3ZFhSVWIydGxibk02TUgwN1puVnVZM1JwYjI0Z1kzSmxZWFJsUkdWc1pXZGhkR1ZrVTNWaVlXZGxiblJUZFdOalpYTnpVbVZ6ZFd4MEtHVXNkQ2w3YkdWMElISTlaVnRnWlhabExtTm9ZVzV1Wld4Z1hUdHBaaWh5UHk1cmFXNWtQVDA5VTFWQ1FVZEZUbFJmUVVSQlVGUkZVbDlMU1U1RUtYSmxkSFZ5Ym50allXeHNTV1E2VTNSeWFXNW5LSEl1YzNSaGRHVS9MbU5oYkd4SlpEOC9ZR0FwTEd0cGJtUTZZSE4xWW1GblpXNTBMWEpsYzNWc2RHQXNiM0pwWjJsdU9tQmphR2xzWkdBc2IzVjBZMjl0WlRwN2EybHVaRHBnZEdWeWJXbHVZV3hnTEhKbGMzVnNkRHA3YTJsdVpEcGdjM1ZqWTJWbFpHVmtZQ3h2ZFhSd2RYUTZkSDBzZFhOaFoyVkVaV3gwWVRwYVJWSlBYMVJQUzBWT1gxVlRRVWRGZlN4dmRYUndkWFE2ZEN4emRXSmhaMlZ1ZEU1aGJXVTZVM1J5YVc1bktISXVjM1JoZEdVL0xuTjFZbUZuWlc1MFRtRnRaVDgvWUdBcGZYMW1kVzVqZEdsdmJpQmpjbVZoZEdWRVpXeGxaMkYwWldSVGRXSmhaMlZ1ZEVWeWNtOXlVbVZ6ZFd4MEtHNHNjaWw3YkdWMElHazlZM0psWVhSbFJHVnNaV2RoZEdWa1UzVmlZV2RsYm5SVGRXTmpaWE56VW1WemRXeDBLRzRzWUdBcE8ybG1LR2s5UFQxMmIybGtJREFwY21WMGRYSnVPMnhsZENCaFBYdGpiMlJsT2xOVlFrRkhSVTVVWDBWWVJVTlZWRWxQVGw5R1FVbE1SVVFzYldWemMyRm5aVHAwYjBWeWNtOXlUV1Z6YzJGblpTaHlLWDA3Y21WMGRYSnVleTR1TG1rc2FYTkZjbkp2Y2pvaE1DeHZkWFJqYjIxbE9udHJhVzVrT21CMFpYSnRhVzVoYkdBc2NtVnpkV3gwT250bGNuSnZjanBoTEd0cGJtUTZZR1poYVd4bFpHQjlMSFZ6WVdkbFJHVnNkR0U2V2tWU1QxOVVUMHRGVGw5VlUwRkhSWDBzYjNWMGNIVjBPbUY5ZldWNGNHOXlkSHRqY21WaGRHVkVaV3hsWjJGMFpXUlRkV0poWjJWdWRFVnljbTl5VW1WemRXeDBMR055WldGMFpVUmxiR1ZuWVhSbFpGTjFZbUZuWlc1MFUzVmpZMlZ6YzFKbGMzVnNkSDA3SWl3aWFXMXdiM0owZTJOdllXeGxjMk5sUkdWc2FYWmxjbWxsYzMxbWNtOXRYQ0lqYUdGeWJtVnpjeTl0WlhOellXZGxjeTVxYzF3aU8ybHRjRzl5ZEh0eWIzVjBaVVJsYkdsMlpYSlViME5vYVd4a2NtVnVmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZjbTkxZEdVdFkyaHBiR1F0WkdWc2FYWmxjbmt1YW5OY0lqdGhjM2x1WXlCbWRXNWpkR2x2YmlCdVpYaDBWSFZ5YmtSbGJHbDJaWEo1S0dVcGUyWnZjaWc3T3lsN2JHVjBJRzQ5WVhkaGFYUWdkMkZwZEVadmNrNWxlSFJUWlhOemFXOXVRV04wYVc5dUtIdGlkV1ptWlhKbFpFUmxiR2wyWlhKcFpYTTZaUzVpZFdabVpYSmxaRVJsYkdsMlpYSnBaWE1zWW5WbVptVnlaV1JUWlhOemFXOXVRMjl1ZEhKdmJITTZaUzVpZFdabVpYSmxaRk5sYzNOcGIyNURiMjUwY205c2N5eGpiMjF0WVc1a1NXNWliM2c2WlM1amIyMXRZVzVrU1c1aWIzaDlLVHRwWmlodUxtdHBibVFoUFQxZ1pHVnNhWFpsY25sZ0tYSmxkSFZ5Ym50cmFXNWtPbTR1YTJsdVpIMDdiR1YwSUhJOWJpNWtaV3hwZG1WeWVUdHBaaWh5UFQwOWJuVnNiQ2x5WlhSMWNtNTdhMmx1WkRwZ1kyeHZjMlZrWUgwN2JHVjBJR2s5WVhkaGFYUWdjbTkxZEdWRVpXeHBkbVZ5Vkc5RGFHbHNaSEpsYmloN1lYVjBhRHB5TG1GMWRHZ3NjR0Z5Wlc1MFYzSnBkR0ZpYkdVNlpTNWtjbWwyWlhKWGNtbDBZV0pzWlN4d1lYbHNiMkZrY3pweUxuQmhlV3h2WVdSekxITmxjM05wYjI1VGRHRjBaVHBsTG5ObGMzTnBiMjVUZEdGMFpYMHBPMmxtS0drdWEybHVaRDA5UFdCallXNWpaV3d0ZEhWeWJtQXBjbVYwZFhKdWUydHBibVE2WUdOaGJtTmxiQzEwZFhKdVlIMDdhV1lvYVM1eVpXMWhhVzVrWlhJaFBUMTJiMmxrSURBcGNtVjBkWEp1ZTJSbGJHbDJaWEk2Y2l4cmFXNWtPbUIwZFhKdVlDeHlaVzFoYVc1a1pYSTZhUzV5WlcxaGFXNWtaWEo5ZlgxaGMzbHVZeUJtZFc1amRHbHZiaUIzWVdsMFJtOXlUbVY0ZEZObGMzTnBiMjVCWTNScGIyNG9aU2w3YkdWMElIUTlaUzVpZFdabVpYSmxaRk5sYzNOcGIyNURiMjUwY205c2N5NXphR2xtZENncE8ybG1LSFFoUFQxMmIybGtJREFwY21WMGRYSnVlMnRwYm1RNmRIMDdhV1lvWlM1aWRXWm1aWEpsWkVSbGJHbDJaWEpwWlhNdWJHVnVaM1JvUGpBcGNtVjBkWEp1ZTJSbGJHbDJaWEo1T25SaGEyVkNkV1ptWlhKbFpGUjFjbTVFWld4cGRtVnllU2hsTG1KMVptWmxjbVZrUkdWc2FYWmxjbWxsY3lrc2EybHVaRHBnWkdWc2FYWmxjbmxnZlR0bWIzSW9PenNwZTJ4bGRDQjBQV0YzWVdsMElHVXVZMjl0YldGdVpFbHVZbTk0TG01bGVIUW9LVHRwWmlobExtTnZiVzFoYm1SSmJtSnZlQzVqYjI1emRXMWxUbVY0ZENncExIUXVaRzl1WlNseVpYUjFjbTU3WkdWc2FYWmxjbms2Ym5Wc2JDeHJhVzVrT21Ca1pXeHBkbVZ5ZVdCOU8ybG1LSFF1ZG1Gc2RXVXVhMmx1WkQwOVBXQnpaWE56YVc5dUxYUnBiV1Z2ZFhSZ0tYSmxkSFZ5Ym50cmFXNWtPbUJsZUhCcGNtVmtZSDA3YVdZb2RDNTJZV3gxWlM1cmFXNWtQVDA5WUdOc1pXRnlZSHg4ZEM1MllXeDFaUzVyYVc1a1BUMDlZR052YlhCaFkzUmdmSHgwTG5aaGJIVmxMbXRwYm1ROVBUMWdjbVZ6WlhSZ0tYSmxkSFZ5Ym50cmFXNWtPblF1ZG1Gc2RXVXVhMmx1WkgwN2FXWW9kQzUyWVd4MVpTNXJhVzVrSVQwOVlHTmhibU5sYkdBcGNtVjBkWEp1ZTJSbGJHbDJaWEo1T21OdmJXMWhibVJVYjBSbGJHbDJaWEo1S0hRdWRtRnNkV1VwTEd0cGJtUTZZR1JsYkdsMlpYSjVZSDE5ZldaMWJtTjBhVzl1SUdOdmJXMWhibVJVYjBSbGJHbDJaWEo1S0dVcGUzSmxkSFZ5Ym50aGRYUm9PbVV1WVhWMGFDeGpZV3hzWlhJNlpTNWpZV3hzWlhJc2EybHVaRHBnWkdWc2FYWmxjbUFzY0dGNWJHOWhaSE02VzJVdWNHRjViRzloWkYwc2NtVnhkV1Z6ZEVsa09tVXVjbVZ4ZFdWemRFbGtmWDFtZFc1amRHbHZiaUIwWVd0bFFuVm1abVZ5WldSVWRYSnVSR1ZzYVhabGNua29kQ2w3YkdWMElHNDlkQzV6YUdsbWRDZ3BPMmxtS0c0OVBUMTJiMmxrSURBcGRHaHliM2NnUlhKeWIzSW9ZRU5oYm01dmRDQjBZV3RsSUdFZ2RIVnliaUJrWld4cGRtVnllU0JtY205dElHRnVJR1Z0Y0hSNUlHSjFabVpsY2k1Z0tUdHNaWFFnY2oxYmJsMHNhVDF1TG1OaGJHeGxjanRtYjNJb08zUXViR1Z1WjNSb1BqQTdLWHRzWlhRZ1pUMTBXekJkTzJsbUtHVTlQVDEyYjJsa0lEQjhmR2toUFQxMmIybGtJREFtSm1VdVkyRnNiR1Z5SVQwOWRtOXBaQ0F3S1dKeVpXRnJPMnhsZENCdVBYUXVjMmhwWm5Rb0tUdHBaaWh1UFQwOWRtOXBaQ0F3S1hSb2NtOTNJRVZ5Y205eUtHQkNkV1ptWlhKbFpDQjBkWEp1SUdSbGJHbDJaWEo1SUdScGMyRndjR1ZoY21Wa0lIZG9hV3hsSUhCaGNuUnBkR2x2Ym1sdVp5NWdLVHR5TG5CMWMyZ29iaWtzYVQ4L1BXNHVZMkZzYkdWeWZYSmxkSFZ5YmlCamIyRnNaWE5qWlVSbGJHbDJaWEpwWlhNb2NpbDlaWGh3YjNKMGUyNWxlSFJVZFhKdVJHVnNhWFpsY25sOU95SXNJaThxS2w5ZmFXNTBaWEp1WVd4ZmQyOXlhMlpzYjNkemUxd2ljM1JsY0hOY0lqcDdYQ0prYVhOMEwzTnlZeTlsZUdWamRYUnBiMjR2Wm05eWQyRnlaQzEwZFhKdUxXTmhibU5sYkd4aGRHbHZiaTF6ZEdWd0xtcHpYQ0k2ZTF3aVptOXlkMkZ5WkZSMWNtNURZVzVqWld4c1lYUnBiMjVUZEdWd1hDSTZlMXdpYzNSbGNFbGtYQ0k2WENKemRHVndMeTlsZG1WQU1DNHpNQzQ0THk5bWIzSjNZWEprVkhWeWJrTmhibU5sYkd4aGRHbHZibE4wWlhCY0luMTlmWDBxTHp0Y2JtVjRj",
	"Rzl5ZENCMllYSWdabTl5ZDJGeVpGUjFjbTVEWVc1alpXeHNZWFJwYjI1VGRHVndJRDBnWjJ4dlltRnNWR2hwYzF0VGVXMWliMnd1Wm05eUtGd2lWMDlTUzBaTVQxZGZWVk5GWDFOVVJWQmNJaWxkS0Z3aWMzUmxjQzh2WlhabFFEQXVNekF1T0M4dlptOXlkMkZ5WkZSMWNtNURZVzVqWld4c1lYUnBiMjVUZEdWd1hDSXBPMXh1SWl3aUx5b3FYMTlwYm5SbGNtNWhiRjkzYjNKclpteHZkM043WENKemRHVndjMXdpT250Y0ltUnBjM1F2YzNKakwyVjRaV04xZEdsdmJpOW1iM0ozWVhKa0xYUjFjbTR0WkdWc2FYWmxjbmt0YzNSbGNDNXFjMXdpT250Y0ltWnZjbmRoY21SVWRYSnVSR1ZzYVhabGNubFRkR1Z3WENJNmUxd2ljM1JsY0Vsa1hDSTZYQ0p6ZEdWd0x5OWxkbVZBTUM0ek1DNDRMeTltYjNKM1lYSmtWSFZ5YmtSbGJHbDJaWEo1VTNSbGNGd2lmWDE5ZlNvdk8xeHVaWGh3YjNKMElIWmhjaUJtYjNKM1lYSmtWSFZ5YmtSbGJHbDJaWEo1VTNSbGNDQTlJR2RzYjJKaGJGUm9hWE5iVTNsdFltOXNMbVp2Y2loY0lsZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVhDSXBYU2hjSW5OMFpYQXZMMlYyWlVBd0xqTXdMamd2TDJadmNuZGhjbVJVZFhKdVJHVnNhWFpsY25sVGRHVndYQ0lwTzF4dUlpd2lhVzF3YjNKMGUyTnlaV0YwWlVodmIydDlabkp2YlZ3aUkyTnZiWEJwYkdWa0wwQjNiM0pyWm14dmR5OWpiM0psTDJsdVpHVjRMbXB6WENJN2FXMXdiM0owZTJOc2IzTmxTRzl2YTBsMFpYSmhkRzl5TEdScGMzQnZjMlZJYjI5cmZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmFHOXZheTF2ZDI1bGNuTm9hWEF1YW5OY0lqdHBiWEJ2Y25SN2RIVnlia05oYm1ObGJHeGhkR2x2YmtodmIydFViMnRsYm4xbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDNSMWNtNHRZMkZ1WTJWc2JHRjBhVzl1TFhSdmEyVnVMbXB6WENJN2FXMXdiM0owZTJadmNuZGhjbVJVZFhKdVEyRnVZMlZzYkdGMGFXOXVVM1JsY0gxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDJadmNuZGhjbVF0ZEhWeWJpMWpZVzVqWld4c1lYUnBiMjR0YzNSbGNDNXFjMXdpTzJsdGNHOXlkSHRtYjNKM1lYSmtWSFZ5YmtSbGJHbDJaWEo1VTNSbGNIMW1jbTl0WENJalpYaGxZM1YwYVc5dUwyWnZjbmRoY21RdGRIVnliaTFrWld4cGRtVnllUzF6ZEdWd0xtcHpYQ0k3YVcxd2IzSjBlM0psWW5WcGJHUlRaWEpwWVd4cGVtRmliR1ZGY25KdmNuMW1jbTl0WENJalpYaGxZM1YwYVc5dUwzZHZjbXRtYkc5M0xXVnljbTl5Y3k1cWMxd2lPM1poY2lCVWRYSnVRMjl1ZEhKdmJGSmxZMlZwZG1WeVBXTnNZWE56ZTJKMVptWmxjbVZrUkdWc2FYWmxjbWxsY3p0aWRXWm1aWEpsWkZObGMzTnBiMjVEYjI1MGNtOXNjenRqYjIxdFlXNWtTVzVpYjNnN1kyOXVkSEp2YkR0amIyNTBjbTlzU1hSbGNtRjBiM0k3Y0dWdVpHbHVaME52Ym5SeWIydzliblZzYkR0amIyNXpkSEoxWTNSdmNpaDBLWHQwYUdsekxtSjFabVpsY21Wa1JHVnNhWFpsY21sbGN6MTBMbUoxWm1abGNtVmtSR1ZzYVhabGNtbGxjeXgwYUdsekxtSjFabVpsY21Wa1UyVnpjMmx2YmtOdmJuUnliMnh6UFhRdVluVm1abVZ5WldSVFpYTnphVzl1UTI5dWRISnZiSE1zZEdocGN5NWpiMjF0WVc1a1NXNWliM2c5ZEM1amIyMXRZVzVrU1c1aWIzZ3NkR2hwY3k1amIyNTBjbTlzUFdOeVpXRjBaVWh2YjJzb2UzUnZhMlZ1T25RdWRHOXJaVzU5S1N4MGFHbHpMbU52Ym5SeWIyeEpkR1Z5WVhSdmNqMTBhR2x6TG1OdmJuUnliMnhiVTNsdFltOXNMbUZ6ZVc1alNYUmxjbUYwYjNKZEtDbDlaMlYwSUhSdmEyVnVLQ2w3Y21WMGRYSnVJSFJvYVhNdVkyOXVkSEp2YkM1MGIydGxibjFoYzNsdVl5QmthWE53YjNObEtDbDdZWGRoYVhRZ1kyeHZjMlZJYjI5clNYUmxjbUYwYjNJb2RHaHBjeTVqYjI1MGNtOXNTWFJsY21GMGIzSXBMR0YzWVdsMElHUnBjM0J2YzJWSWIyOXJLSFJvYVhNdVkyOXVkSEp2YkNsOVlYTjVibU1nZDJGcGRFWnZja0ZqZEdsdmJpZ3BlMlp2Y2lnN095bDdiR1YwSUdVOVlYZGhhWFFnZEdocGN5NXVaWGgwUTI5dWRISnZiRTl5UTI5dGJXRnVaQ2dwTzJsbUtHVXVhMmx1WkQwOVBXQmpiMjF0WVc1a1lDbDdiR1YwSUhROVlYZGhhWFFnZEdocGN5NW9ZVzVrYkdWVFpYTnphVzl1UTI5dGJXRnVaQ2hsTG1OdmJXMWhibVFwTzJsbUtIUWhQVDEyYjJsa0lEQXBjbVYwZFhKdUlIUTdZMjl1ZEdsdWRXVjliR1YwSUhROVpTNXdZWGxzYjJGa0xHNDlkR2hwY3k1eVpXRmtWR1Z5YldsdVlXeERiMjUwY205c0tIUXBPMmxtS0c0aFBUMTJiMmxrSURBcGNtVjBkWEp1SUc0N2FXWW9kQzVyYVc1a1BUMDlZSFIxY200dFpHVnNhWFpsY25rdGNtVnhkV1Z6ZEdBcGUyeGxkQ0JsUFdGM1lXbDBJSFJvYVhNdWMyVnlkbWxqWlVSbGJHbDJaWEo1VW1WeGRXVnpkQ2gwS1R0cFppaGxJVDA5ZG05cFpDQXdLWEpsZEhWeWJpQmxmWDE5WVhONWJtTWdhR0Z1Wkd4bFUyVnpjMmx2YmtOdmJXMWhibVFvWlNsN2FXWW9aUzVyYVc1a1BUMDlZSE5sYm1SZ0tYdDBhR2x6TG1KMVptWmxjbVZrUkdWc2FYWmxjbWxsY3k1d2RYTm9LR052YlcxaGJtUlViMFJsYkdsMlpYSjVLR1VwS1R0eVpYUjFjbTU5YVdZb1pTNXJhVzVrUFQwOVlHTnNaV0Z5WUh4OFpTNXJhVzVrUFQwOVlHTnZiWEJoWTNSZ0tYdDBhR2x6TG1KMVptWmxjbVZrVTJWemMybHZia052Ym5SeWIyeHpMbkIxYzJnb1pTNXJhVzVrS1R0eVpYUjFjbTU5YVdZb1pTNXJhVzVrUFQwOVlITmxjM05wYjI0dGRHbHRaVzkxZEdBcGUzUm9hWE11WW5WbVptVnlaV1JUWlhOemFXOXVRMjl1ZEhKdmJITXVjSFZ6YUNoZ1pYaHdhWEpsWkdBcE8zSmxkSFZ5Ym4xcFppaGxMbXRwYm1ROVBUMWdZMkZ1WTJWc1lDbDdZWGRoYVhRZ1ptOXlkMkZ5WkZSMWNtNURZVzVqWld4c1lYUnBiMjVUZEdWd0tIdHdZWGxzYjJGa09tVXVkSFZ5Ymtsa1BUMDlkbTlwWkNBd1AzdDlPbnQwZFhKdVNXUTZaUzUwZFhKdVNXUjlMSFJ2YTJWdU9uUjFjbTVEWVc1alpXeHNZWFJwYjI1SWIyOXJWRzlyWlc0b2RHaHBjeTVqYjI1MGNtOXNMblJ2YTJWdUtYMHBPM0psZEhWeWJuMXBaaWhsTG10cGJtUTlQVDFnY21WelpYUmdLWHRoZDJGcGRDQm1iM0ozWVhKa1ZIVnlia05oYm1ObGJHeGhkR2x2YmxOMFpYQW9lM0JoZVd4dllXUTZlMzBzZEc5clpXNDZkSFZ5YmtOaGJtTmxiR3hoZEdsdmJraHZiMnRVYjJ0bGJpaDBhR2x6TG1OdmJuUnliMnd1ZEc5clpXNHBmU2tzZEdocGN5NWlkV1ptWlhKbFpGTmxjM05wYjI1RGIyNTBjbTlzY3k1d2RYTm9LR0J5WlhObGRHQXBPM0psZEhWeWJuMXlaWFIxY200Z2RXNXpkWEJ3YjNKMFpXUlRaWE56YVc5dVEyOXRiV0Z1WkNobEtYMWlkV1ptWlhKVWRYSnVSR1ZzYVhabGNtbGxjeWhsS1h0bExtSjFabVpsY21Wa1JHVnNhWFpsY21sbGN5RTlQWFp2YVdRZ01DWW1kR2hwY3k1aWRXWm1aWEpsWkVSbGJHbDJaWEpwWlhNdWRXNXphR2xtZENndUxpNWxMbUoxWm1abGNtVmtSR1ZzYVhabGNtbGxjeWw5WTI5dWMzVnRaVU52Ym5SeWIyd29LWHQwYUdsekxuQmxibVJwYm1kRGIyNTBjbTlzUFc1MWJHeDlaMlYwUTI5dWRISnZiRkJ5YjIxcGMyVW9LWHR5WlhSMWNtNGdkR2hwY3k1d1pXNWthVzVuUTI5dWRISnZiRDgvUFhSb2FYTXVZMjl1ZEhKdmJFbDBaWEpoZEc5eUxtNWxlSFFvS1N4MGFHbHpMbkJsYm1ScGJtZERiMjUwY205c2ZXRnplVzVqSUc1bGVIUkRiMjUwY205c1QzSkRiMjF0WVc1a0tDbDdiR1YwSUdVOVlYZGhhWFFnVUhKdmJXbHpaUzV5WVdObEtGdDBhR2x6TG1kbGRFTnZiblJ5YjJ4UWNtOXRhWE5sS0NrdWRHaGxiaWhsUFQ0b2UydHBibVE2WUdOdmJuUnliMnhnTEhaaGJIVmxPbVY5S1Nrc2RHaHBjeTVqYjIxdFlXNWtTVzVpYjNndWJtVjRkQ2dwTG5Sb1pXNG9aVDArS0h0cmFXNWtPbUJqYjIxdFlXNWtZQ3gyWVd4MVpUcGxmU2twWFNrN2FXWW9aUzVyYVc1a1BUMDlZR052YlcxaGJtUmdLWHRwWmlobExuWmhiSFZsTG1SdmJtVXBkR2h5YjNjZ1JYSnliM0lvWUZObGMzTnBiMjRnWTI5dGJXRnVaQ0JwYm1KdmVDQmpiRzl6WldRZ1ltVm1iM0psSUhSb1pTQmhZM1JwZG1VZ2RIVnliaUJ6WlhSMGJHVmtMbUFwTzNKbGRIVnliaUIwYUdsekxtTnZiVzFoYm1SSmJtSnZlQzVqYjI1emRXMWxUbVY0ZENncExIdGpiMjF0WVc1a09tVXVkbUZzZFdVdWRtRnNkV1VzYTJsdVpEcGdZMjl0YldGdVpHQjlmV2xtS0hSb2FYTXVZMjl1YzNWdFpVTnZiblJ5YjJ3b0tTeGxMblpoYkhWbExtUnZibVVwZEdoeWIzY2dSWEp5YjNJb1lGUjFjbTRnWTI5dWRISnZiQ0JvYjI5cklHTnNiM05sWkNCaVpXWnZjbVVnWkdWc2FYWmxjbWx1WnlCaElISmxjM1ZzZEM1Z0tUdHNaWFFnZEQxbExuWmhiSFZsTG5aaGJIVmxPMmxtS0hRdWEybHVaRDA5UFdCMGRYSnVMV1Z5Y205eVlDbDBhSEp2ZHlCeVpXSjFhV3hrVTJWeWFXRnNhWHBoWW14bFJYSnliM0lvZEM1bGNuSnZjaWs3Y21WMGRYSnVJSFF1YTJsdVpEMDlQV0IwZFhKdUxXTnZiblJwYm5WaGRHbHZiaTEwYjJ0bGJtQS9LR0YzWVdsMElIUm9hWE11WTI5dGJXRnVaRWx1WW05NExuSmxhMlY1UTI5dWRHbHVkV0YwYVc5dUtIUXVZMjl1ZEdsdWRXRjBhVzl1Vkc5clpXNHBMR0YzWVdsMElIUm9hWE11Ym1WNGRFTnZiblJ5YjJ4UGNrTnZiVzFoYm1Rb0tTazZlMnRwYm1RNllHTnZiblJ5YjJ4Z0xIQmhlV3h2WVdRNmRIMTljbVZoWkZSbGNtMXBibUZzUTI5dWRISnZiQ2hsS1h0cFppaGxMbXRwYm1ROVBUMWdkSFZ5YmkxbGNuSnZjbUFwZEdoeWIzY2djbVZpZFdsc1pGTmxjbWxoYkdsNllXSnNaVVZ5Y205eUtHVXVaWEp5YjNJcE8ybG1LR1V1YTJsdVpEMDlQV0IwZFhKdUxYSmxjM1ZzZEdBcGNtVjBkWEp1SUhSb2FYTXVZblZtWm1WeVZIVnlia1JsYkdsMlpYSnBaWE1vWlNrc1pTNWhZM1JwYjI1OVlYTjVibU1nYzJWeWRtbGpaVVJsYkdsMlpYSjVVbVZ4ZFdWemRDaGxLWHRoZDJGcGRDQjBhR2x6TG1OdmJXMWhibVJKYm1KdmVDNXlaV3RsZVVOdmJuUnBiblZoZEdsdmJpaGxMbU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVLVHRzWlhRZ2REMTBhR2x6TG1KMVptWmxjbVZrUkdWc2FYWmxjbWxsY3k1emFHbG1kQ2dwTzJadmNpZzdkRDA5UFhadmFXUWdNRHNwZTJ4bGRDQnVQV0YzWVdsMElGQnliMjFwYzJVdWNtRmpaU2hiZEdocGN5NW5aWFJEYjI1MGNtOXNVSEp2YldselpTZ3BMblJvWlc0b1pUMCtLSHRyYVc1a09tQmpiMjUwY205c1lDeDJZV3gxWlRwbGZTa3BMSFJvYVhNdVkyOXRiV0Z1WkVsdVltOTRMbTVsZUhRb0tTNTBhR1Z1S0dVOVBpaDdhMmx1WkRwZ1kyOXRiV0Z1WkdBc2RtRnNkV1U2WlgwcEtWMHBPMmxtS0c0dWEybHVaRDA5UFdCamIyNTBjbTlzWUNsN2FXWW9kR2hwY3k1amIyNXpkVzFsUTI5dWRISnZiQ2dwTEc0dWRtRnNkV1V1Wkc5dVpTbDBhSEp2ZHlCRmNuSnZjaWhnVkhWeWJpQmpiMjUwY205c0lHaHZiMnNnWTJ4dmMyVmtJR1IxY21sdVp5QmhJR1JsYkdsMlpYSjVJSEpsY1hWbGMzUXVZQ2s3YVdZb2JpNTJZV3gxWlM1MllXeDFaUzVyYVc1a1BUMDlZSFIxY200dFkyOXVkR2x1ZFdGMGFXOXVMWFJ2YTJWdVlDbDdZWGRoYVhRZ2RHaHBjeTVqYjIxdFlXNWtTVzVpYjNndWNtVnJaWGxEYjI1MGFXNTFZWFJwYjI0b2JpNTJZV3gxWlM1MllXeDFaUzVqYjI1MGFXNTFZWFJwYjI1VWIydGxiaWs3WTI5dWRHbHVkV1Y5YkdWMElIUTlkR2hwY3k1eVpXRmtWR1Z5YldsdVlXeERiMjUwY205c0tHNHVkbUZzZFdVdWRtRnNkV1VwTzJsbUtIUWhQVDEyYjJsa0lEQXBjbVYwZFhKdUlIUTdhV1lvYmk1MllXeDFaUzUyWVd4MVpTNXJhVzVrUFQwOVlIUjFjbTR0WkdWc2FYWmxjbmt0WTJGdVkyVnNiR1ZrWUNZbWJpNTJZV3gxWlM1MllXeDFaUzV5WlhGMVpYTjBTV1E5UFQxbExuSmxjWFZsYzNSSlpDbHlaWFIxY200N1kyOXVkR2x1ZFdWOWFXWW9iaTUyWVd4MVpTNWtiMjVsS1hSb2NtOTNJRVZ5Y205eUtHQlRaWE56YVc5dUlHTnZiVzFoYm1RZ2FXNWliM2dnWTJ4dmMyVmtJR1IxY21sdVp5QmhJSFIxY200Z1pHVnNhWFpsY25rZ2NtVnhkV1Z6ZEM1Z0tUdHBaaWgwYUdsekxtTnZiVzFoYm1SSmJtSnZlQzVqYjI1emRXMWxUbVY0ZENncExHNHVkbUZzZFdVdWRtRnNkV1V1YTJsdVpEMDlQV0J6Wlc1a1lDbDdkRDFqYjIxdFlXNWtWRzlFWld4cGRtVnllU2h1TG5aaGJIVmxMblpoYkhWbEtUdGpiMjUwYVc1MVpYMXNaWFFnY2oxaGQyRnBkQ0IwYUdsekxtaGhibVJzWlZObGMzTnBiMjVEYjIxdFlXNWtLRzR1ZG1Gc2RXVXVkbUZzZFdVcE8ybG1LSEloUFQxMmIybGtJREFwY21WMGRYSnVJSEo5ZEhKNWUyRjNZV2wwSUdadmNuZGhjbVJVZFhKdVJHVnNhWFpsY25sVGRHVndLSHRwYm1KdmVGUnZhMlZ1T21VdWFXNWliM2hVYjJ0bGJpeHdZWGxzYjJGa09udGtaV3hwZG1WeWVUcDBMR3RwYm1RNllHUnlhWFpsY2kxa1pXeHBkbVZ5ZVdBc2NtVnhkV1Z6ZEVsa09tVXVjbVZ4ZFdWemRFbGtmWDBwZldOaGRHTm9LR1VwZTJsbUtDRW9aU0JwYm5OMFlXNWpaVzltSUVWeWNtOXlKaVpsTG01aGJXVTlQVDFnU0c5dmEwNXZkRVp2ZFc1a1JYSnliM0pnS1NsMGFISnZkeUJsZlhKbGRIVnliaUJoZDJGcGRDQjBhR2x6TG1GM1lXbDBSbTl5ZDJGeVpHVmtSR1ZzYVhabGNua29aUzV5WlhGMVpYTjBTV1FzZENsOVlYTjVibU1nWVhkaGFYUkdiM0ozWVhKa1pXUkVaV3hwZG1WeWVTaGxMSFFwZTJadmNpZzdPeWw3YkdWMElHNDlZWGRoYVhRZ2RHaHBjeTV1WlhoMFEyOXVkSEp2YkU5eVEyOXRiV0Z1WkNncE8ybG1LRzR1YTJsdVpEMDlQV0JqYjIxdFlXNWtZQ2w3YkdWMElHVTlZWGRoYVhRZ2RHaHBjeTVvWVc1a2JHVlRaWE56YVc5dVEyOXRiV0Z1WkNodUxtTnZiVzFoYm1RcE8ybG1LR1VoUFQxMmIybGtJREFwY21WMGRYSnVJSFJvYVhNdVluVm1abVZ5WldSRVpXeHBkbVZ5YVdWekxuVnVjMmhwWm5Rb2RDa3NaVHRqYjI1MGFXNTFaWDFzWlhRZ2NqMXVMbkJoZVd4dllXUTdhV1lvY2k1cmFXNWtQVDA5WUhSMWNtNHRaR1ZzYVhabGNua3RZV05qWlhCMFpXUmdLWHRwWmloeUxuSmxjWFZsYzNSSlpEMDlQV1VwY21WMGRYSnVPMk52Ym5ScGJuVmxmV2xtS0hJdWEybHVaRDA5UFdCMGRYSnVMV1JsYkdsMlpYSjVMV05oYm1ObGJHeGxaR0FtSm5JdWNtVnhkV1Z6ZEVsa1BUMDlaU2w3ZEdocGN5NWlkV1ptWlhKbFpFUmxiR2wyWlhKcFpYTXVkVzV6YUdsbWRDaDBLVHR5WlhSMWNtNTljaTVyYVc1a1BUMDlZSFIxY200dGNtVnpkV3gwWUNZbWRHaHBjeTVpZFdabVpYSmxaRVJsYkdsMlpYSnBaWE11ZFc1emFHbG1kQ2gwS1R0c1pYUWdhVDEwYUdsekxuSmxZV1JVWlhKdGFXNWhiRU52Ym5SeWIyd29jaWs3YVdZb2FTRTlQWFp2YVdRZ01DbHlaWFIxY200Z2FYMTlmVHRtZFc1amRHbHZiaUIxYm5OMWNIQnZjblJsWkZObGMzTnBiMjVEYjIxdFlXNWtLR1VwZTNSb2NtOTNJRVZ5Y205eUtHQlZibk4xY0hCdmNuUmxaQ0J6WlhOemFXOXVJR052YlcxaGJtUTZJQ1I3U2xOUFRpNXpkSEpwYm1kcFpua29aU2w5WUNsOVpuVnVZM1JwYjI0Z1kyOXRiV0Z1WkZSdlJHVnNhWFpsY25rb1pTbDdjbVYwZFhKdWUyRjFkR2c2WlM1aGRYUm9MR05oYkd4bGNqcGxMbU5oYkd4bGNpeHJhVzVrT21Ca1pXeHBkbVZ5WUN4d1lYbHNiMkZrY3pwYlpTNXdZWGxzYjJGa1hTeHlaWEYxWlhOMFNXUTZaUzV5WlhGMVpYTjBTV1I5ZldWNGNHOXlkSHRVZFhKdVEyOXVkSEp2YkZKbFkyVnBkbVZ5ZlRzaUxDSnBiWEJ2Y25SN1pHbHpjR0YwWTJoVWRYSnVVM1JsY0gxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDNkdmNtdG1iRzkzTFhOMFpYQnpMbXB6WENJN2FXMXdiM0owZTFSMWNtNURiMjUwY205c1VtVmpaV2wyWlhKOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5MGRYSnVMV052Ym5SeWIyd3RjbVZqWldsMlpYSXVhbk5jSWp0aGMzbHVZeUJtZFc1amRHbHZiaUJrYVhOd1lYUmphRUZ1WkVGM1lXbDBWSFZ5YmloMEtYdHNaWFFnYmoxdVpYY2dWSFZ5YmtOdmJuUnliMnhTWldObGFYWmxjaWg3WW5WbVptVnlaV1JFWld4cGRtVnlhV1Z6T25RdVluVm1abVZ5WldSRVpXeHBkbVZ5YVdWekxHSjFabVpsY21Wa1UyVnpjMmx2YmtOdmJuUnliMnh6T25RdVluVm1abVZ5WldSVFpYTnphVzl1UTI5dWRISnZiSE1zWTI5dGJXRnVaRWx1WW05NE9uUXVZMjl0YldGdVpFbHVZbTk0TEhSdmEyVnVPblF1WTI5dWRISnZiRlJ2YTJWdWZTazdkSEo1ZTNKbGRIVnliaUJoZDJGcGRDQmthWE53WVhSamFGUjFjbTVUZEdWd0tIdGpZWEJoWW1sc2FYUnBaWE02ZEM1allYQmhZbWxzYVhScFpYTXNZMjl0Y0d4bGRHbHZibFJ2YTJWdU9tNHVkRzlyWlc0c1pHVnNhWFpsY25rNmRDNWtaV3hwZG1WeWVTeHRiMlJsT25RdWJXOWtaU3h3WVhKbGJuUlhjbWwwWVdKc1pUcDBMbkJoY21WdWRGZHlhWFJoWW14bExITmxjbWxoYkdsNlpXUkRiMjUwWlhoME9uUXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUXNjMlZ6YzJsdmJsTjBZWFJsT25RdWMyVnpjMmx2YmxOMFlYUmxmU2tzZTJGamRHbHZianBoZDJGcGRDQnVMbmRoYVhSR2IzSkJZM1JwYjI0b0tTeGthWE53YjNObE9pZ3BQVDV1TG1ScGMzQnZjMlVvS1gxOVkyRjBZMmdvWlNsN2RHaHliM2NnWVhkaGFYUWdiaTVrYVhOd2IzTmxLQ2tzWlgxOVpYaHdiM0owZTJScGMzQmhkR05vUVc1a1FYZGhhWFJVZFhKdWZUc2lMQ0l2S2lwZlgybHVkR1Z5Ym1Gc1gzZHZjbXRtYkc5M2MzdGNJbk4wWlhCelhDSTZlMXdpWkdsemRDOXpjbU12WlhobFkzVjBhVzl1TDJOeVpXRjBaUzF6WlhOemFXOXVMWE4wWlhBdWFuTmNJanA3WENKamNtVmhkR1ZUWlhOemFXOXVVM1JsY0Z3aU9udGNJbk4wWlhCSlpGd2lPbHdpYzNSbGNDOHZaWFpsUURBdU16QXVPQzh2WTNKbFlYUmxVMlZ6YzJsdmJsTjBaWEJjSW4xOWZYMHFMenRjYm1WNGNHOXlkQ0IyWVhJZ1kzSmxZWFJsVTJWemMybHZibE4wWlhBZ1BTQm5iRzlpWVd4VWFHbHpXMU41YldKdmJDNW1iM0lvWENKWFQxSkxSa3hQVjE5VlUwVmZVMVJGVUZ3aUtWMG9YQ0p6ZEdWd0x5OWxkbVZBTUM0ek1DNDRMeTlqY21WaGRHVlRaWE56YVc5dVUzUmxjRndpS1R0Y2JpSXNJaThxS2w5ZmFXNTBaWEp1WVd4ZmQyOXlhMlpzYjNkemUxd2ljM1JsY0hOY0lqcDdYQ0prYVhOMEwzTnlZeTlsZUdWamRYUnBiMjR2YzJWMGRHeGxMV05oYm1ObGJHeGxaQzEwZFhKdUxYTjBaWEF1YW5OY0lqcDdYQ0p6WlhSMGJHVkRZVzVqWld4c1pXUlVkWEp1VTNSbGNGd2lPbnRjSW5OMFpYQkpaRndpT2x3aWMzUmxjQzh2WlhabFFEQXVNekF1T0M4dmMyVjBkR3hsUTJGdVkyVnNiR1ZrVkhWeWJsTjBaWEJjSW4xOWZYMHFMenRjYm1WNGNHOXlkQ0IyWVhJZ2MyVjBkR3hsUTJGdVkyVnNiR1ZrVkhWeWJsTjBaWEFnUFNCbmJHOWlZV3hVYUdselcxTjViV0p2YkM1bWIzSW9YQ0pYVDFKTFJreFBWMTlWVTBWZlUxUkZVRndpS1Ywb1hDSnpkR1Z3THk5bGRtVkFNQzR6TUM0NEx5OXpaWFIwYkdWRFlXNWpaV3hzWldSVWRYSnVVM1JsY0Z3aUtUdGNiaUlzSWk4cUtsOWZhVzUwWlhKdVlXeGZkMjl5YTJac2IzZHplMXdpYzNSbGNITmNJanA3WENKa2FYTjBMM055WXk5bGVHVmpkWFJwYjI0dmRHVnliV2x1WVd3dGMyVnpjMmx2YmkxbVlXbHNkWEpsTFhOMFpYQXVhbk5jSWpwN1hDSmxiV2wwVkdWeWJXbHVZV3hUWlhOemFXOXVSbUZwYkhWeVpWTjBaWEJjSWpwN1hDSnpkR1Z3U1dSY0lqcGNJbk4wWlhBdkwyVjJaVUF3TGpNd0xqZ3ZMMlZ0YVhSVVpYSnRhVzVoYkZObGMzTnBiMjVHWVdsc2RYSmxVM1JsY0Z3aWZYMTlmU292TzF4dVpYaHdiM0owSUhaaGNpQmxiV2wwVkdWeWJXbHVZV3hUWlhOemFXOXVSbUZwYkhWeVpWTjBaWEFnUFNCbmJHOWlZV3hVYUdselcxTjViV0p2YkM1bWIzSW9YQ0pYVDFKTFJreFBWMTlWVTBWZlUxUkZVRndpS1Ywb1hDSnpkR1Z3THk5bGRtVkFNQzR6TUM0NEx5OWxiV2wwVkdWeWJXbHVZV3hUWlhOemFXOXVSbUZwYkhWeVpWTjBaWEJjSWlrN1hHNGlMQ0l2S2lwZlgybHVkR1Z5Ym1Gc1gzZHZjbXRtYkc5M2MzdGNJbk4wWlhCelhDSTZlMXdpWkdsemRDOXpjbU12WlhobFkzVjBhVzl1TDNObGMzTnBiMjR0WTJGc2JHSmhZMnN0YzNSbGNDNXFjMXdpT250Y0ltWnBjbVZUWlhOemFXOXVRMkZzYkdKaFkydFRkR1Z3WENJNmUxd2ljM1JsY0Vsa1hDSTZYQ0p6ZEdWd0x5OWxkbVZBTUM0ek1DNDRMeTltYVhKbFUyVnpjMmx2YmtOaGJHeGlZV05yVTNSbGNGd2lmWDE5ZlNvdk8xeHVaWGh3YjNKMElIWmhjaUJtYVhKbFUyVnpjMmx2YmtOaGJHeGlZV05yVTNSbGNDQTlJR2RzYjJKaGJGUm9hWE5iVTNsdFltOXNMbVp2Y2loY0lsZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVhDSXBYU2hjSW5OMFpYQXZMMlYyWlVBd0xqTXdMamd2TDJacGNtVlRaWE56YVc5dVEyRnNiR0poWTJ0VGRHVndYQ0lwTzF4dUlpd2lhVzF3YjNKMGUyTnlaV0YwWlVodmIydDlabkp2YlZ3aUkyTnZiWEJwYkdWa0wwQjNiM0pyWm14dmR5OWpiM0psTDJsdVpHVjRMbXB6WENJN2FXMXdiM0owZTJOc1lXbHRTRzl2YTA5M2JtVnljMmhwY0N4a2FYTndiM05sU0c5dmEzMW1jbTl0WENJalpYaGxZM1YwYVc5dUwyaHZiMnN0YjNkdVpYSnphR2x3TG1welhDSTdablZ1WTNScGIyNGdZM0psWVhSbFUyVnpjMmx2YmtOdmJXMWhibVJKYm1KdmVDZ3BlMnhsZENCeUxHa3NZVDFiWFN4dlBWdGRMSE05TUN4alBXNTFiR3dzYkN4MUxHVnVjWFZsZFdVOVpUMCtlMjh1Y0hWemFDaGxLU3h2TG5OdmNuUW9LR1VzZENrOVBtVXViM0prWlhJdGRDNXZjbVJsY2lrc2RUOHVLQ2tzZFQxMmIybGtJREI5TEdGeWJUMWxQVDU3WlM1amJHOXpaV1I4ZkdVdWNHVnVaR2x1WjN4OEtHVXVjR1Z1WkdsdVp6MGhNQ3hsTG5KbGMyOXNkbVZrUFhadmFXUWdNQ3dvWlM1eVpYUnBjbVZrUDFCeWIyMXBjMlV1Y21WemIyeDJaU2hsTG1odmIyc3BMblJvWlc0b1pUMCtLSHRrYjI1bE9pRXhMSFpoYkhWbE9tVjlLU2s2WlM1cGRHVnlZWFJ2Y2k1dVpYaDBLQ2twTG5Sb1pXNG9kRDArZTJ4bGRDQnVQWHR2Y21SbGNqcHpLeXNzY21WemRXeDBPblFzYzNSaGRHVTZaWDA3WlM1eVpYTnZiSFpsWkQxdUxHVXVaVzVoWW14bFpDWW1aVzV4ZFdWMVpTaHVLWDBzS0NrOVBudDlLU2w5TEdWdVlXSnNaVDFsUFQ1N1pTNWxibUZpYkdWa1BTRXdMR1V1Y21WemIyeDJaV1FoUFQxMmIybGtJREFtSm1WdWNYVmxkV1VvWlM1eVpYTnZiSFpsWkNsOUxHTnlaV0YwWlZOMFlYUmxQWFE5UG50c1pYUWdiajFqY21WaGRHVkliMjlyS0h0MGIydGxianAwZlNrN2NtVjBkWEp1ZTJOc2IzTmxaRG9oTVN4bGJtRmliR1ZrT2lFeExHaHZiMnM2Yml4cGRHVnlZWFJ2Y2pwdVcxTjViV0p2YkM1aGMzbHVZMGwwWlhKaGRHOXlYU2dwTEhCbGJtUnBibWM2SVRFc2NtVjBhWEpsWkRvaE1YMTlMSE4wWVhSbGN6MG9LVDArVzNJc2FTd3VMaTVoWFM1bWFXeDBaWElvWlQwK1pTRTlQWFp2YVdRZ01DazdjbVYwZFhKdWUyRnplVzVqSUdOc1lXbHRVM1JoWW14bEtHVXBlMmxtS0hJaFBUMTJiMmxrSURBcGUybG1LSEl1YUc5dmF5NTBiMnRsYmowOVBXVXBjbVYwZFhKdU8zUm9jbTkzSUVWeWNtOXlLR0JCSUhObGMzTnBiMjRnWTI5dGJXRnVaQ0JwYm1KdmVDQmpZVzV1YjNRZ1kyaGhibWRsSUdsMGN5QnpkR0ZpYkdVZ2RHOXJaVzR1WUNsOWJHVjBJRzQ5WTNKbFlYUmxVM1JoZEdVb1pTazdZWGRoYVhRZ1kyeGhhVzFJYjI5clQzZHVaWEp6YUdsd0tHNHVhRzl2YXlrc1pXNWhZbXhsS0c0cExISTlibjBzWTI5dWMzVnRaVTVsZUhRb0tYdHBaaWhzUFQwOWRtOXBaQ0F3S1hSb2NtOTNJRVZ5Y205eUtHQkRZVzV1YjNRZ1kyOXVjM1Z0WlNCaElITmxjM05wYjI0Z1kyOXRiV0Z1WkNCaVpXWnZjbVVnYVhRZ2NtVnpiMngyWlhNdVlDazdiQzV6ZEdGMFpTNXdaVzVrYVc1blBTRXhMR3d1YzNSaGRHVXVjbVZ6YjJ4MlpXUTlkbTlwWkNBd0xHd3VjbVZ6ZFd4MExtUnZibVVtSmloc0xuTjBZWFJsTG1Oc2IzTmxaRDBoTUNrc2JEMTJiMmxrSURBc1l6MXVkV3hzZlN4aGMzbHVZeUJrYVhOd2IzTmxLQ2w3YkdWMElHVTlXMmtzY2wwdVptbHNkR1Z5S0dVOVBtVWhQVDEyYjJsa0lEQXBPMms5ZG05cFpDQXdMSEk5ZG05cFpDQXdMR0YzWVdsMElGQnliMjFwYzJVdVlXeHNLR1V1YldGd0tHRnplVzVqSUdVOVBtRjNZV2wwSUdScGMzQnZjMlZJYjI5cktHVXVhRzl2YXlrcEtYMHNibVY0ZENncGUybG1LSEk5UFQxMmIybGtJREFwZEdoeWIzY2dSWEp5YjNJb1lFTmhibTV2ZENCM1lXbDBJR1p2Y2lCelpYTnphVzl1SUdOdmJXMWhibVJ6SUdKbFptOXlaU0JqYkdGcGJXbHVaeUIwYUdVZ2MzUmhZbXhsSUdsdVltOTRMbUFwTzJsbUtHTWhQVDF1ZFd4c0tYSmxkSFZ5YmlCak8yeGxkQ0JsUFhOMFlYUmxjeWdwTzJadmNpaHNaWFFnZENCdlppQmxLV0Z5YlNoMEtUdHlaWFIxY200Z1pTNWxkbVZ5ZVNobFBUNWxMbU5zYjNObFpDay9LR3c5ZTI5eVpHVnlPbk1yS3l4eVpYTjFiSFE2ZTJSdmJtVTZJVEFzZG1Gc2RXVTZkbTlwWkNBd2ZTeHpkR0YwWlRweWZTeGpQVkJ5YjIxcGMyVXVjbVZ6YjJ4MlpTaHNMbkpsYzNWc2RDa3NZeWs2S0dNOUtHRnplVzVqS0NrOVBudG1iM0lvTzI4dWJHVnVaM1JvUFQwOU1Ec3BZWGRoYVhRZ2JtVjNJRkJ5YjIxcGMyVW9aVDArZTNVOVpYMHBPMnhsZENCbFBXOHVjMmhwWm5Rb0tUdHlaWFIxY200Z2JEMWxM",
	"R1V1Y21WemRXeDBmU2tvS1N4aktYMHNZWE41Ym1NZ2NtVnJaWGxEYjI1MGFXNTFZWFJwYjI0b1pTbDdhV1lvSVdWOGZHay9MbWh2YjJzdWRHOXJaVzQ5UFQxbEtYSmxkSFZ5Ymp0c1pYUWdjajFqY21WaGRHVlRkR0YwWlNobEtUdHBaaWhwUFQwOWRtOXBaQ0F3S1h0aGQyRnBkQ0JqYkdGcGJVaHZiMnRQZDI1bGNuTm9hWEFvY2k1b2IyOXJLU3hsYm1GaWJHVW9jaWtzYVQxeUxHTWhQVDF1ZFd4c0ppWmhjbTBvY2lrN2NtVjBkWEp1ZldGeWJTaHlLU3hoZDJGcGRDQmpiR0ZwYlVodmIydFBkMjVsY25Ob2FYQW9jaTVvYjI5cktTeGxibUZpYkdVb2NpazdiR1YwSUc4OWFUdHBQWElzWVhKdEtHOHBPM1J5ZVh0aGQyRnBkQ0JrYVhOd2IzTmxTRzl2YXlodkxtaHZiMnNwZldOaGRHTm9LR1VwZTJrOWRtOXBaQ0F3TzNSeWVYdGhkMkZwZENCa2FYTndiM05sU0c5dmF5aHlMbWh2YjJzcGZXTmhkR05vZTMxMGFISnZkeUJsZlc4dWNtVjBhWEpsWkQwaE1DeGhMbkIxYzJnb2J5bDlmWDFsZUhCdmNuUjdZM0psWVhSbFUyVnpjMmx2YmtOdmJXMWhibVJKYm1KdmVIMDdJaXdpWm5WdVkzUnBiMjRnYzJWemMybHZia052YlcxaGJtUkliMjlyVkc5clpXNG9aU2w3Y21WMGRYSnVZR1YyWlRwelpYTnphVzl1T2lSN1pYMDZhVzVpYjNoZ2ZXVjRjRzl5ZEh0elpYTnphVzl1UTI5dGJXRnVaRWh2YjJ0VWIydGxibjA3SWl3aVkyOXVjM1FnUkVWR1FWVk1WRjlUUlZOVFNVOU9YMVJKVFVWUFZWUmZUVk05TnpJd0tqWXdLall3S2pGbE16dGxlSEJ2Y25SN1JFVkdRVlZNVkY5VFJWTlRTVTlPWDFSSlRVVlBWVlJmVFZOOU95SXNJaThxS2w5ZmFXNTBaWEp1WVd4ZmQyOXlhMlpzYjNkemUxd2ljM1JsY0hOY0lqcDdYQ0prYVhOMEwzTnlZeTlsZUdWamRYUnBiMjR2ZEdWeWJXbHVZV3d0YzJWemMybHZiaTFqYjIxd2JHVjBhVzl1TFhOMFpYQXVhbk5jSWpwN1hDSmxiV2wwVkdWeWJXbHVZV3hUWlhOemFXOXVRMjl0Y0d4bGRHbHZibE4wWlhCY0lqcDdYQ0p6ZEdWd1NXUmNJanBjSW5OMFpYQXZMMlYyWlVBd0xqTXdMamd2TDJWdGFYUlVaWEp0YVc1aGJGTmxjM05wYjI1RGIyMXdiR1YwYVc5dVUzUmxjRndpZlgxOWZTb3ZPMXh1Wlhod2IzSjBJSFpoY2lCbGJXbDBWR1Z5YldsdVlXeFRaWE56YVc5dVEyOXRjR3hsZEdsdmJsTjBaWEFnUFNCbmJHOWlZV3hVYUdselcxTjViV0p2YkM1bWIzSW9YQ0pYVDFKTFJreFBWMTlWVTBWZlUxUkZVRndpS1Ywb1hDSnpkR1Z3THk5bGRtVkFNQzR6TUM0NEx5OWxiV2wwVkdWeWJXbHVZV3hUWlhOemFXOXVRMjl0Y0d4bGRHbHZibE4wWlhCY0lpazdYRzRpTENKcGJYQnZjblI3WTJGdVkyVnNVMlZ6YzJsdmJsUnBiV1Z2ZFhSVGRHVndMSE4wWVhKMFUyVnpjMmx2YmxScGJXVnZkWFJUZEdWd2ZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmMyVnpjMmx2YmkxMGFXMWxiM1YwTFhOMFpYQnpMbXB6WENJN1puVnVZM1JwYjI0Z1kzSmxZWFJsVTJWemMybHZibFJwYldWdmRYUkRiMjUwY205c0tIUXBlMnhsZENCdU8zSmxkSFZ5Ym50aGMzbHVZeUJrYVhOd2IzTmxLQ2w3YVdZb2JqMDlQWFp2YVdRZ01DbHlaWFIxY200N2JHVjBJR1U5Ymp0dVBYWnZhV1FnTUN4aGQyRnBkQ0JqWVc1alpXeFRaWE56YVc5dVZHbHRaVzkxZEZOMFpYQW9lM0oxYmtsa09tVXVjblZ1U1dSOUtYMHNZWE41Ym1NZ2MzUmhjblFvS1h0dVBUMDlkbTlwWkNBd0ppWW9iajFoZDJGcGRDQnpkR0Z5ZEZObGMzTnBiMjVVYVcxbGIzVjBVM1JsY0NoMEtTbDlmWDFsZUhCdmNuUjdZM0psWVhSbFUyVnpjMmx2YmxScGJXVnZkWFJEYjI1MGNtOXNmVHNpTENJdktpcGZYMmx1ZEdWeWJtRnNYM2R2Y210bWJHOTNjM3RjSW5OMFpYQnpYQ0k2ZTF3aVpHbHpkQzl6Y21NdlpYaGxZM1YwYVc5dUwzUmxjbTFwYm1GMFpTMWphR2xzWkMxelpYTnphVzl1Y3kxemRHVndMbXB6WENJNmUxd2lkR1Z5YldsdVlYUmxRMmhwYkdSVFpYTnphVzl1YzFOMFpYQmNJanA3WENKemRHVndTV1JjSWpwY0luTjBaWEF2TDJWMlpVQXdMak13TGpndkwzUmxjbTFwYm1GMFpVTm9hV3hrVTJWemMybHZibk5UZEdWd1hDSjlmWDE5S2k4N1hHNWxlSEJ2Y25RZ2RtRnlJSFJsY20xcGJtRjBaVU5vYVd4a1UyVnpjMmx2Ym5OVGRHVndJRDBnWjJ4dlltRnNWR2hwYzF0VGVXMWliMnd1Wm05eUtGd2lWMDlTUzBaTVQxZGZWVk5GWDFOVVJWQmNJaWxkS0Z3aWMzUmxjQzh2WlhabFFEQXVNekF1T0M4dmRHVnliV2x1WVhSbFEyaHBiR1JUWlhOemFXOXVjMU4wWlhCY0lpazdYRzRpTENJdktpcGZYMmx1ZEdWeWJtRnNYM2R2Y210bWJHOTNjM3RjSW5kdmNtdG1iRzkzYzF3aU9udGNJbVJwYzNRdmMzSmpMMlY0WldOMWRHbHZiaTkzYjNKclpteHZkeTFsYm5SeWVTNXFjMXdpT250Y0luZHZjbXRtYkc5M1JXNTBjbmxjSWpwN1hDSjNiM0pyWm14dmQwbGtYQ0k2WENKM2IzSnJabXh2ZHk4dlpYWmxMeTkzYjNKclpteHZkMFZ1ZEhKNVhDSjlmWDE5S2k4N1hHNXBiWEJ2Y25SN2NtVmhaRk5sY21saGJHbDZaV1JUZFdKaFoyVnVkRVJsY0hSb2ZXWnliMjFjSWlOb1lYSnVaWE56TDNOMVltRm5aVzUwTFdSbGNIUm9MbXB6WENJN2FXMXdiM0owZTJOeVpXRjBaVWh2YjJzc1oyVjBWMjl5YTJac2IzZE5aWFJoWkdGMFlTeG5aWFJYY21sMFlXSnNaWDFtY205dFhDSWpZMjl0Y0dsc1pXUXZRSGR2Y210bWJHOTNMMk52Y21VdmFXNWtaWGd1YW5OY0lqdHBiWEJ2Y25SN1pHbHpjRzl6WlVodmIydDlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOW9iMjlyTFc5M2JtVnljMmhwY0M1cWMxd2lPMmx0Y0c5eWRIdHViM0p0WVd4cGVtVlRaWEpwWVd4cGVtRmliR1ZGY25KdmNuMW1jbTl0WENJalpYaGxZM1YwYVc5dUwzZHZjbXRtYkc5M0xXVnljbTl5Y3k1cWMxd2lPMmx0Y0c5eWRIdGpZVzVqWld4RVpYTmpaVzVrWVc1MFZIVnlibk5UZEdWd2ZXWnliMjFjSWlObGVHVmpkWFJwYjI0dlkyRnVZMlZzTFdSbGMyTmxibVJoYm5RdGRIVnlibk10YzNSbGNDNXFjMXdpTzJsdGNHOXlkSHR5WldGa1EyaGhibTVsYkZKbGNYVmxjM1JKWkN4eVpXRmtVbTl2ZEZObGMzTnBiMjVKWkgxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDJWMlpTMTNiM0pyWm14dmR5MWhkSFJ5YVdKMWRHVnpMbXB6WENJN2FXMXdiM0owZTI1dmRHbG1lVVJsYkdWbllYUmxaRkJoY21WdWRGTjBaWEFzYm05MGFXWjVWSFZ5YmtOaGJHeGxjbE4wWlhBc2NtVnpiMngyWlVsdWFYUnBZV3hVZFhKdVEyRnNiR1Z5VTNSbGNIMW1jbTl0WENJalpYaGxZM1YwYVc5dUwyUmxiR1ZuWVhSbFpDMXdZWEpsYm5RdGJtOTBhV1pwWTJGMGFXOXVMbXB6WENJN2FXMXdiM0owZTJOeVpXRjBaVVJsYkdWbllYUmxaRk4xWW1GblpXNTBSWEp5YjNKU1pYTjFiSFFzWTNKbFlYUmxSR1ZzWldkaGRHVmtVM1ZpWVdkbGJuUlRkV05qWlhOelVtVnpkV3gwZldaeWIyMWNJaU5sZUdWamRYUnBiMjR2WkdWc1pXZGhkR1ZrTFhCaGNtVnVkQzF5WlhOMWJIUXVhbk5jSWp0cGJYQnZjblI3Ym1WNGRGUjFjbTVFWld4cGRtVnllWDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM0JoY210bFpDMWtaV3hwZG1WeWVTMTNZV2wwTG1welhDSTdhVzF3YjNKMGUyUnBjM0JoZEdOb1FXNWtRWGRoYVhSVWRYSnVmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZkSFZ5Ymkxa2FYTndZWFJqYUM1cWMxd2lPMmx0Y0c5eWRIdGpjbVZoZEdWVFpYTnphVzl1VTNSbGNIMW1jbTl0WENJalpYaGxZM1YwYVc5dUwyTnlaV0YwWlMxelpYTnphVzl1TFhOMFpYQXVhbk5jSWp0cGJYQnZjblI3YzJWMGRHeGxRMkZ1WTJWc2JHVmtWSFZ5YmxOMFpYQjlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOXpaWFIwYkdVdFkyRnVZMlZzYkdWa0xYUjFjbTR0YzNSbGNDNXFjMXdpTzJsdGNHOXlkSHRsYldsMFZHVnliV2x1WVd4VFpYTnphVzl1Um1GcGJIVnlaVk4wWlhCOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5MFpYSnRhVzVoYkMxelpYTnphVzl1TFdaaGFXeDFjbVV0YzNSbGNDNXFjMXdpTzJsdGNHOXlkSHRtYVhKbFUyVnpjMmx2YmtOaGJHeGlZV05yVTNSbGNIMW1jbTl0WENJalpYaGxZM1YwYVc5dUwzTmxjM05wYjI0dFkyRnNiR0poWTJzdGMzUmxjQzVxYzF3aU8ybHRjRzl5ZEh0amNtVmhkR1ZUWlhOemFXOXVRMjl0YldGdVpFbHVZbTk0ZldaeWIyMWNJaU5sZUdWamRYUnBiMjR2YzJWemMybHZiaTFqYjIxdFlXNWtMV2x1WW05NExtcHpYQ0k3YVcxd2IzSjBlM05sYzNOcGIyNURiMjF0WVc1a1NHOXZhMVJ2YTJWdWZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmMyVnpjMmx2YmkxamIyMXRZVzVrTFhSdmEyVnVMbXB6WENJN2FXMXdiM0owZTBSRlJrRlZURlJmVTBWVFUwbFBUbDlVU1UxRlQxVlVYMDFUZldaeWIyMWNJaU5sZUdWamRYUnBiMjR2YzJWemMybHZiaTEwYVcxbGIzVjBMbXB6WENJN2FXMXdiM0owZTJWdGFYUlVaWEp0YVc1aGJGTmxjM05wYjI1RGIyMXdiR1YwYVc5dVUzUmxjSDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM1JsY20xcGJtRnNMWE5sYzNOcGIyNHRZMjl0Y0d4bGRHbHZiaTF6ZEdWd0xtcHpYQ0k3YVcxd2IzSjBlMk55WldGMFpWTmxjM05wYjI1VWFXMWxiM1YwUTI5dWRISnZiSDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM05sYzNOcGIyNHRkR2x0Wlc5MWRDMWpiMjUwY205c0xtcHpYQ0k3YVcxd2IzSjBlM1JsY20xcGJtRjBaVU5vYVd4a1UyVnpjMmx2Ym5OVGRHVndmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZkR1Z5YldsdVlYUmxMV05vYVd4a0xYTmxjM05wYjI1ekxYTjBaWEF1YW5OY0lqdGhjM2x1WXlCbWRXNWpkR2x2YmlCM2IzSnJabXh2ZDBWdWRISjVLSFFwZTJ4bGRIdDNiM0pyWm14dmQxSjFia2xrT21rc2QyOXlhMlpzYjNkVGRHRnlkR1ZrUVhRNmIzMDlaMlYwVjI5eWEyWnNiM2ROWlhSaFpHRjBZU2dwTEhBOWRDNXpaWEpwWVd4cGVtVmtRMjl1ZEdWNGRGdGdaWFpsTG1OdmJuUnBiblZoZEdsdmJsUnZhMlZ1WUYxOGZHQmdMRzA5ZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEZ0Z1pYWmxMbTF2WkdWZ1hTeG9QWFF1YzJWeWFXRnNhWHBsWkVOdmJuUmxlSFJiWUdWMlpTNWpZWEJoWW1sc2FYUnBaWE5nWFN4blBYUXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUmJZR1YyWlM1aWRXNWtiR1ZnWFR0MExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMFcyQmxkbVV1YzJWemMybHZia2xrWUYwOWFUdHNaWFFnWHoxblpYUlhjbWwwWVdKc1pTZ3BMSFk5ZTJOaGJHeGxjanAyYjJsa0lEQXNZMkZzYkdWeVVtVnpiMngyWldRNklURXNiR0Z6ZEZObGMzTnBiMjVUZEdGMFpUcDJiMmxrSURCOU8zUnllWHRzWlhRZ2JqMXlaV0ZrVW05dmRGTmxjM05wYjI1SlpDaDBMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBLU3h5UFhKbFlXUlRaWEpwWVd4cGVtVmtVM1ZpWVdkbGJuUkVaWEIwYUNoMExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMEtTeGhQWFF1YzJWeWFXRnNhWHBsWkVOdmJuUmxlSFJiWUdWMlpTNWtlVzVoYldsalUzVmlZV2RsYm5SQloyVnVkRU52Ym1acFoyQmRMSHR6ZEdGMFpUcHNmVDFoZDJGcGRDQmpjbVZoZEdWVFpYTnphVzl1VTNSbGNDaDdZMjl0Y0dsc1pXUkJjblJwWm1GamRITlRiM1Z5WTJVNlp5NXpiM1Z5WTJVc1kyOXVkR2x1ZFdGMGFXOXVWRzlyWlc0NmNDeGtlVzVoYldsalUzVmlZV2RsYm5SQloyVnVkRU52Ym1acFp6cGhMR2x1YUdWeWFYUmxaRXhwYldsMGN6cDBMbXhwYldsMGN5eHViMlJsU1dRNlp5NXViMlJsU1dRc2IzVjBjSFYwVTJOb1pXMWhPblF1YVc1d2RYUXViM1YwY0hWMFUyTm9aVzFoTEhKdmIzUlRaWE56YVc5dVNXUTZiaXh6WlhOemFXOXVTV1E2YVN4emRXSmhaMlZ1ZEVSbGNIUm9Pbko5S1R0MkxteGhjM1JUWlhOemFXOXVVM1JoZEdVOWJDeDJMbU5oYkd4bGNqMWhkMkZwZENCeVpYTnZiSFpsU1c1cGRHbGhiRlIxY201RFlXeHNaWEpUZEdWd0tIdHpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREcDBMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBmU2tzZGk1allXeHNaWEpTWlhOdmJIWmxaRDBoTUR0c1pYUWdkVDFoZDJGcGRDQnlkVzVFY21sMlpYSk1iMjl3S0h0allYQmhZbWxzYVhScFpYTTZhQ3hrY21sMlpYSlhjbWwwWVdKc1pUcGZMR2x1YVhScFlXeEpibkIxZERwN2EybHVaRHBnWkdWc2FYWmxjbUFzY0dGNWJHOWhaSE02VzN0dFpYTnpZV2RsT25RdWFXNXdkWFF1YldWemMyRm5aU3hqYjI1MFpYaDBPblF1YVc1d2RYUXVZMjl1ZEdWNGRDeHZkWFJ3ZFhSVFkyaGxiV0U2ZEM1cGJuQjFkQzV2ZFhSd2RYUlRZMmhsYldGOVhTeHlaWEYxWlhOMFNXUTZjbVZoWkVOb1lXNXVaV3hTWlhGMVpYTjBTV1FvZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZENsOUxHTnlZWE5vUTJ4bFlXNTFjRk4wWVhSbE9uWXNiVzlrWlRwdExITmxjbWxoYkdsNlpXUkRiMjUwWlhoME9uUXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUXNjMlZ6YzJsdmJsTjBZWFJsT213c2MyVnpjMmx2YmxScGJXVnZkWFJFWldGa2JHbHVaVHAwTG5ObGMzTnBiMjVVYVcxbGIzVjBUWE05UFQwaE1UOTJiMmxrSURBNmJtVjNJRVJoZEdVb2J5NW5aWFJVYVcxbEtDa3JLSFF1YzJWemMybHZibFJwYldWdmRYUk5jejgvUkVWR1FWVk1WRjlUUlZOVFNVOU9YMVJKVFVWUFZWUmZUVk1wS1gwcE8zSmxkSFZ5YmlCMUxtdHBibVE5UFQxZ2NtVnpkV3gwWUQ5MUxuSmxjM1ZzZERwaGQyRnBkQ0JtYVc1aGJHbDZaVVY0Y0dseVpXUlRaWE56YVc5dUtIdGpZV3hzWlhJNmRpNWpZV3hzWlhJc1pISnBkbVZ5VjNKcGRHRmliR1U2WHl4dGIyUmxPbTBzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2ZFM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEN4elpYTnphVzl1VTNSaGRHVTZkUzV6WlhOemFXOXVVM1JoZEdWOUtYMWpZWFJqYUNobEtYdDBhSEp2ZHlCMkxteGhjM1JUWlhOemFXOXVVM1JoZEdVaFBUMTJiMmxrSURBbUptRjNZV2wwSUhSbGNtMXBibUYwWlVOb2FXeGtVMlZ6YzJsdmJuTlRkR1Z3S0h0elpYTnphVzl1VTNSaGRHVTZkaTVzWVhOMFUyVnpjMmx2YmxOMFlYUmxmU2tzWVhkaGFYUWdaVzFwZEZSbGNtMXBibUZzVTJWemMybHZia1poYVd4MWNtVlRkR1Z3S0h0bGNuSnZjanB1YjNKdFlXeHBlbVZUWlhKcFlXeHBlbUZpYkdWRmNuSnZjaWhsS1N4d1lYSmxiblJYY21sMFlXSnNaVHBmTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT25RdWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhSOUtTeHRQVDA5WUhSaGMydGdQeWhoZDJGcGRDQm1hWEpsVTJWemMybHZia05oYkd4aVlXTnJVM1JsY0NoN1pYSnliM0k2Ym05eWJXRnNhWHBsVTJWeWFXRnNhWHBoWW14bFJYSnliM0lvWlNrc2MyVnlhV0ZzYVhwbFpFTnZiblJsZUhRNmRDNXpaWEpwWVd4cGVtVmtRMjl1ZEdWNGRDeHpkR0YwZFhNNllHWmhhV3hsWkdCOUtTeGhkMkZwZENCdWIzUnBabmxFWld4bFoyRjBaV1JRWVhKbGJuUlRkR1Z3S0h0eVpYTjFiSFE2WTNKbFlYUmxSR1ZzWldkaGRHVmtVM1ZpWVdkbGJuUkZjbkp2Y2xKbGMzVnNkQ2gwTG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEdVcExITmxjbWxoYkdsNlpXUkRiMjUwWlhoME9uUXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUjlLU2s2WVhkaGFYUWdibTkwYVdaNVZIVnlia05oYkd4bGNsTjBaWEFvZTJOaGJHeGxjanBoZDJGcGRDQnlaWE52YkhabFEyRnNiR1Z5Um05eVEzSmhjMmdvZGl4MExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMEtTeHNhV1psWTNsamJHVTZZSFJsY20xcGJtRnNZQ3h6WlhOemFXOXVTV1E2YVN4elpYUjBiR1ZrT250cGMwVnljbTl5T2lFd0xHOTFkSEIxZERwbGZYMHBMR055WldGMFpWTmhabVZQZFhSbGNsZHZjbXRtYkc5M1JYSnliM0lvS1gxOVlYTjVibU1nWm5WdVkzUnBiMjRnY21WemIyeDJaVU5oYkd4bGNrWnZja055WVhOb0tHVXNkQ2w3YVdZb1pTNWpZV3hzWlhKU1pYTnZiSFpsWkNseVpYUjFjbTRnWlM1allXeHNaWEk3ZEhKNWUzSmxkSFZ5YmlCaGQyRnBkQ0J5WlhOdmJIWmxTVzVwZEdsaGJGUjFjbTVEWVd4c1pYSlRkR1Z3S0h0elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwMGZTbDlZMkYwWTJoN2NtVjBkWEp1ZlgxbWRXNWpkR2x2YmlCamNtVmhkR1ZUWVdabFQzVjBaWEpYYjNKclpteHZkMFZ5Y205eUtDbDdiR1YwSUdVOVJYSnliM0lvWUVGblpXNTBJSGR2Y210bWJHOTNJR1poYVd4bFpDNGdTVzV6Y0dWamRDQjBhR1VnY0hKcGRtRjBaU0J6WlhOemFXOXVJSFJ5WVdObElHWnZjaUJrWlhSaGFXeHpMbUFwTzNKbGRIVnliaUJsTG01aGJXVTlZRVYyWlZkdmNtdG1iRzkzUm1GcGJIVnlaV0FzWlgxaGMzbHVZeUJtZFc1amRHbHZiaUJ5ZFc1RWNtbDJaWEpNYjI5d0tHVXBlMnhsZENCdVBXTnlaV0YwWlVodmIyc29lM1J2YTJWdU9tQWtlMlV1YzJWemMybHZibE4wWVhSbExuTmxjM05wYjI1SlpIMDZZWFYwYUdCOUtTeHlQVzViVTNsdFltOXNMbUZ6ZVc1alNYUmxjbUYwYjNKZEtDa3NZVDB3TEc1bGVIUlVkWEp1UTI5dWRISnZiRlJ2YTJWdVBTZ3BQVDVnSkh0bExuTmxjM05wYjI1VGRHRjBaUzV6WlhOemFXOXVTV1I5T25SMWNtNHRZMjl1ZEhKdmJEb2tlMU4wY21sdVp5aGhLeXNwZldBc2N6MWJYU3hqUFZ0ZExHdzlZM0psWVhSbFUyVnpjMmx2YmtOdmJXMWhibVJKYm1KdmVDZ3BMR1E5YzJWemMybHZia052YlcxaGJtUkliMjlyVkc5clpXNG9aUzV6WlhOemFXOXVVM1JoZEdVdWMyVnpjMmx2Ymtsa0tUdGhkMkZwZENCc0xtTnNZV2x0VTNSaFlteGxLR1FwTzJ4bGRDQm1QV1V1YzJWemMybHZibFJwYldWdmRYUkVaV0ZrYkdsdVpUMDlQWFp2YVdRZ01EOTJiMmxrSURBNlkzSmxZWFJsVTJWemMybHZibFJwYldWdmRYUkRiMjUwY205c0tIdGtaV0ZrYkdsdVpUcGxMbk5sYzNOcGIyNVVhVzFsYjNWMFJHVmhaR3hwYm1Vc2RHOXJaVzQ2WkgwcExIQXNjblZ1VkhWeWJqMWhjM2x1WXlCMFBUNTdiR1YwSUc0OVlYZGhhWFFnWkdsemNHRjBZMmhCYm1SQmQyRnBkRlIxY200b2UySjFabVpsY21Wa1JHVnNhWFpsY21sbGN6cHpMR0oxWm1abGNtVmtVMlZ6YzJsdmJrTnZiblJ5YjJ4ek9tTXNZMkZ3WVdKcGJHbDBhV1Z6T21VdVkyRndZV0pwYkdsMGFXVnpMR052YlcxaGJtUkpibUp2ZURwc0xHTnZiblJ5YjJ4VWIydGxianB1WlhoMFZIVnlia052Ym5SeWIyeFViMnRsYmlncExHUmxiR2wyWlhKNU9uUXVaR1ZzYVhabGNua3NiVzlrWlRwbExtMXZaR1VzY0dGeVpXNTBWM0pwZEdGaWJHVTZaUzVrY21sMlpYSlhjbWwwWVdKc1pTeHpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREcDBMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSE5sYzNOcGIyNVRkR0YwWlRwMExuTmxjM05wYjI1VGRHRjBaWDBwTzNKbGRIVnliaUJoZDJGcGRDQndQeTRvS1N4d1BXNHVaR2x6Y0c5elpTeHVMbUZqZEdsdmJuMDdkSEo1ZTJVdWMyVnpjMmx2YmxOMFlYUmxMbU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVKaVpoZDJGcGRDQnNMbkpsYTJWNVEyOXVkR2x1ZFdGMGFXOXVLR1V1YzJWemMybHZibE4wWVhSbExtTnZiblJwYm5WaGRHbHZibFJ2YTJWdUtTeGhkMkZwZENCbVB5NXpkR0Z5ZENncE8yeGxkQ0IwUFdGM1lXbDBJSEoxYmxSMWNtNG9lMlJsYkdsMlpYSjVPbVV1YVc1cGRHbGhiRWx1Y0hWMExITmxjbWxoYkdsNlpXUkRiMjUwWlhoME9tVXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUXNjMlZ6YzJsdmJsTjBZWFJsT21VdWMyVnpjMmx2YmxOMFlYUmxmU2s3Wm05eUtHVXVZM0poYzJoRGJHVmhiblZ3VTNSaGRHVXViR0Z6ZEZObGMzTnBiMjVUZEdGMFpUMTBMbk5sYzNOcGIyNVRkR0YwWlRzN0tYdHBaaWgwTG10cGJtUTlQVDFnWkc5dVpXQXBjbVYwZFhKdWUydHBibVE2WUhKbGMzVnNkR0FzY21WemRXeDBPbUYzWVdsMElHWnBibUZzYVhwbFJHOXVaU2g3WVdOMGFXOXVPblFzWTJGc2JHVnlPbVV1WTNKaGMyaERiR1ZoYm5Wd1UzUmhkR1V1WTJGc2JHVnlMRzF2WkdVNlpTNXRiMlJsZlNsOU8ybG1LSFF1YTJsdVpDRTlQV0J3WVhKcllDbDBhSEp2ZHlCRmNuSnZjaWhnUkhKcGRtVnlJSEpsWTJWcGRtVmtJSFZ1Wlhod1pXTjBaV1FnZEhWeWJpQmhZM1JwYjI0Z1hDSWtlM1F1YTJsdVpIMWNJaTVnS1R0cFppaDBMbU5oYm1ObGJHeGxaRDA5UFNFd0tYdHNaWFFnYmoxaGQyRnBkQ0J6WlhSMGJHVkRZVzVqWld4c1pXUlVkWEp1VTNSbGNDaDdjR0Z5Wlc1MFYzSnBkR0ZpYkdVNlpTNWtjbWwyWlhKWGNtbDBZV0pzWlN4elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwMExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHAwTG5ObGMzTnBiMjVUZEdGMFpYMHBPM1E5ZXk0dUxuUXNjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZiaTV6WlhKcFlXeHBlbVZrUTI5dWRHVjRkQ3h6WlhOemFXOXVVM1JoZEdVNmJpNXpaWE56YVc5dVUzUmhkR1Y5TEdVdVkzSmhjMmhEYkdWaGJuVndVM1JoZEdVdWJHRnpkRk5sYzNOcGIyNVRkR0YwWlQxMExuTmxjM05wYjI1VGRHRjBaWDFwWmloMExuTmxjM05wYjI1VGRHRjBaUzVqYjI1MGFXNTFZWFJwYjI1VWIydGxiaVltWVhkaGFYUWdiQzV5Wld0bGVVTnZiblJwYm5WaGRHbHZiaWgwTG5ObGMzTnBiMjVUZEdGMFpTNWpiMjUwYVc1MVlYUnBiMjVVYjJ0bGJpa3NkQzVoZFhSb2IzSnBlbUYwYVc5dVRtRnRaWE1tSm5RdVlYVjBhRzl5YVhwaGRHbHZiazVoYldWekxteGxibWQwYUQ0d0tYdHNaWFFnYmoxMExtRjFkR2h2Y21sNllYUnBiMjVPWVcxbGN5NXNaVzVuZEdnc2FUMWJYVHRtYjNJb08ya3ViR1Z1WjNSb1BHNDdLWHRzWlhRZ1pUMWhkMkZwZENCeUxtNWxlSFFvS1R0cFppaGxMbVJ2Ym1VcFluSmxZV3M3WlM1MllXeDFaUzVyYVc1a1BUMDlZR1JsYkdsMlpYSmdKaVpwTG5CMWMyZ29MaTR1WlM1MllXeDFaUzV3WVhsc2IyRmtjeWw5ZEQxaGQyRnBkQ0J5ZFc1VWRYSnVLSHRrWld4cGRtVnllVHA3YTJsdVpEcGdaR1ZzYVhabGNtQXNjR0Y1Ykc5aFpITTZhWDBzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2ZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEN4elpYTnphVzl1VTNSaGRHVTZkQzV6WlhOemFXOXVVM1JoZEdWOUtTeGxMbU55WVhOb1EyeGxZVzUxY0ZOMFlYUmxMbXhoYzNSVFpYTnphVzl1VTNSaGRHVTlkQzV6WlhOemFXOXVVM1JoZEdVN1kyOXVkR2x1ZFdWOWJHVjBJRzQ5ZEM1elpYUjBiR1ZrTzNRdVkyRnVZMlZzYkdWa0lUMDlJVEFtSm00aFBUMTJiMmxrSURBL0tHRjNZV2wwSUc1dmRHbG1lVlIxY201RFlXeHNaWEpUZEdWd0tIdGpZV3hzWlhJNlpTNWpjbUZ6YUVOc1pXRnVkWEJUZEdGMFpTNWpZV3hzWlhJc2JHbG1aV041WTJ4bE9tQndZWEpyWldSZ0xITmxjM05wYjI1SlpEcDBMbk5sYzNOcGIyNVRkR0YwWlM1elpYTnphVzl1U1dRc2MyVjBkR3hsWkRwdWZTa3NaUzVqY21GemFFTnNaV0Z1ZFhCVGRHRjBaUzVqWVd4c1pYSTlkbTlwWkNBd0tUcDBMbU5oYm1ObGJHeGxaRDA5UFNFd0ppWW9aUzVqY21GemFFTnNaV0Z1ZFhCVGRHRjBaUzVqWVd4c1pYSTlkbTlwWkNBd0tUdHNaWFFnYVQxaGQyRnBkQ0J1WlhoMFZIVnlia1JsYkdsMlpYSjVLSHRpZFdabVpYSmxaRVJsYkdsMlpYSnBaWE02Y3l4aWRXWm1aWEpsWkZObGMzTnBiMjVEYjI1MGNtOXNjenBqTEdOdmJXMWhibVJKYm1KdmVEcHNMR1J5YVhabGNsZHlhWFJoWW14bE9tVXVaSEpwZG1WeVYzSnBkR0ZpYkdVc2MyVnpjMmx2YmxOMFlYUmxPblF1YzJWemMybHZibE4wWVhSbGZTazdhV1lvYVM1cmFXNWtQVDA5WUdWNGNHbHlaV1JnS1hKbGRIVnlibnRyYVc1a09tQmxlSEJwY21Wa1lDeHpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREcDBMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSE5sYzNOcGIyNVRkR0YwWlRwMExuTmxjM05wYjI1VGRHRjBaWDA3YVdZb2FTNXJhVzVrUFQwOVlISmxjMlYwWUNseVpYUjFjbTRnWVhkaGFYUWdkR1Z5YldsdVlYUmxRMmhwYkdSVFpYTnphVzl1YzFOMFpYQW9lM05sYzNOcGIyNVRkR0YwWlRwMExuTmxjM05wYjI1VGRHRjBaWDBwTEh0cmFXNWtPbUJ5WlhOMWJIUmdMSEpsYzNWc2REcDdiM1YwY0hWME9tQmdmWDA3YVdZb2FTNXJhVzVrUFQwOVlHTnNaV0Z5WUh4OGFTNXJhVzVrUFQwOVlHTnZiWEJoWTNSZ0tYdDBQV0YzWVdsMElISjFibFIxY200b2UyUmxiR2wyWlhKNU9udHJhVzVrT21rdWEybHVaSDBzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2ZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEN4elpYTnphVzl1VTNSaGRHVTZkQzV6WlhOemFXOXVVM1JoZEdWOUtTeGxMbU55WVhOb1EyeGxZVzUxY0ZOMFlYUmxMbXhoYzNSVFpYTnphVzl1VTNSaGRHVTlkQzV6WlhOemFXOXVVM1JoZEdVN1kyOXVkR2x1ZFdWOWFXWW9hUzVyYVc1a1BUMDlZR05zYjNObFpHQXBjbVYwZFhKdWUydHBibVE2WUhKbGMzVnNkR0FzY21WemRXeDBPbnR2ZFhSd2RYUTZZR0I5ZlR0cFppaHBMbXRwYm1ROVBUMWdZMkZ1WTJWc0xYUjFjbTVnS1h0aGQyRnBkQ0JqWVc1alpXeEVaWE5qWlc1a1lXNTBWSFZ5Ym5OVGRHVndLSHR6WlhKcFlXeHBlbVZrUTI5dWRHVjRkRHAwTG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEhObGMzTnBiMjVUZEdGMFpUcDBMbk5sYzNOcGIyNVRkR0YwWlgwcE8yeGxkQ0J1UFdGM1lXbDBJSE5sZEhSc1pVTmhibU5sYkd4bFpGUjFjbTVUZEdWd0tIdHdZWEpsYm5SWGNtbDBZV0pzWlRwbExtUnlhWFpsY2xkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT25RdWMyVnlhV0ZzYVhwbFpFTnZi",
	"blJsZUhRc2MyVnpjMmx2YmxOMFlYUmxPblF1YzJWemMybHZibE4wWVhSbGZTazdkRDE3TGk0dWRDeHpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREcHVMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSE5sYzNOcGIyNVRkR0YwWlRwdUxuTmxjM05wYjI1VGRHRjBaU3h6WlhSMGJHVmtPblp2YVdRZ01IMHNaUzVqY21GemFFTnNaV0Z1ZFhCVGRHRjBaUzVqWVd4c1pYSTlkbTlwWkNBd0xHVXVZM0poYzJoRGJHVmhiblZ3VTNSaGRHVXViR0Z6ZEZObGMzTnBiMjVUZEdGMFpUMTBMbk5sYzNOcGIyNVRkR0YwWlR0amIyNTBhVzUxWlgxcExtUmxiR2wyWlhJdVkyRnNiR1Z5SVQwOWRtOXBaQ0F3SmlZb1pTNWpjbUZ6YUVOc1pXRnVkWEJUZEdGMFpTNWpZV3hzWlhJOWFTNWtaV3hwZG1WeUxtTmhiR3hsY2lrc2REMWhkMkZwZENCeWRXNVVkWEp1S0h0a1pXeHBkbVZ5ZVRwN1lYVjBhRHBwTG1SbGJHbDJaWEl1WVhWMGFDeHJhVzVrT21Ca1pXeHBkbVZ5WUN4d1lYbHNiMkZrY3pwYmFTNXlaVzFoYVc1a1pYSmRMSEpsY1hWbGMzUkpaRHBwTG1SbGJHbDJaWEl1Y21WeGRXVnpkRWxrZlN4elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwMExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHAwTG5ObGMzTnBiMjVUZEdGMFpYMHBMR1V1WTNKaGMyaERiR1ZoYm5Wd1UzUmhkR1V1YkdGemRGTmxjM05wYjI1VGRHRjBaVDEwTG5ObGMzTnBiMjVUZEdGMFpYMTlabWx1WVd4c2VYdGhkMkZwZENCd1B5NG9LU3hoZDJGcGRDQm1QeTVrYVhOd2IzTmxLQ2tzWVhkaGFYUWdiQzVrYVhOd2IzTmxLQ2tzWVhkaGFYUWdaR2x6Y0c5elpVaHZiMnNvYmlsOWZXRnplVzVqSUdaMWJtTjBhVzl1SUdacGJtRnNhWHBsUlhod2FYSmxaRk5sYzNOcGIyNG9aU2w3Y21WMGRYSnVJR0YzWVdsMElIUmxjbTFwYm1GMFpVTm9hV3hrVTJWemMybHZibk5UZEdWd0tIdHpaWE56YVc5dVUzUmhkR1U2WlM1elpYTnphVzl1VTNSaGRHVjlLU3hoZDJGcGRDQmxiV2wwVkdWeWJXbHVZV3hUWlhOemFXOXVRMjl0Y0d4bGRHbHZibE4wWlhBb2UzQmhjbVZ1ZEZkeWFYUmhZbXhsT21VdVpISnBkbVZ5VjNKcGRHRmliR1VzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2WlM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEgwcExHVXViVzlrWlQwOVBXQjBZWE5yWUQ4b1lYZGhhWFFnWm1seVpWTmxjM05wYjI1RFlXeHNZbUZqYTFOMFpYQW9lMjkxZEhCMWREcGdZQ3h6WlhKcFlXeHBlbVZrUTI5dWRHVjRkRHBsTG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEhOMFlYUjFjenBnWTI5dGNHeGxkR1ZrWUgwcExHRjNZV2wwSUc1dmRHbG1lVVJsYkdWbllYUmxaRkJoY21WdWRGTjBaWEFvZTNKbGMzVnNkRHBqY21WaGRHVkVaV3hsWjJGMFpXUlRkV0poWjJWdWRGTjFZMk5sYzNOU1pYTjFiSFFvWlM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEN4Z1lDa3NjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZaUzV6WlhKcFlXeHBlbVZrUTI5dWRHVjRkSDBwS1RwaGQyRnBkQ0J1YjNScFpubFVkWEp1UTJGc2JHVnlVM1JsY0NoN1kyRnNiR1Z5T21VdVkyRnNiR1Z5TEd4cFptVmplV05zWlRwZ2RHVnliV2x1WVd4Z0xITmxjM05wYjI1SlpEcGxMbk5sYzNOcGIyNVRkR0YwWlM1elpYTnphVzl1U1dRc2MyVjBkR3hsWkRwN2IzVjBjSFYwT21CZ2ZYMHBMSHR2ZFhSd2RYUTZZR0I5ZldGemVXNWpJR1oxYm1OMGFXOXVJR1pwYm1Gc2FYcGxSRzl1WlNobEtYdHNaWFI3YjNWMGNIVjBPblFzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2Ym4wOVpTNWhZM1JwYjI0c2NqMWxMbUZqZEdsdmJpNXBjMFZ5Y205eVBUMDlJVEE3YVdZb1lYZGhhWFFnZEdWeWJXbHVZWFJsUTJocGJHUlRaWE56YVc5dWMxTjBaWEFvZTNObGMzTnBiMjVUZEdGMFpUcGxMbUZqZEdsdmJpNXpaWE56YVc5dVUzUmhkR1Y5S1N4bExtMXZaR1U5UFQxZ2RHRnphMkFwWVhkaGFYUWdabWx5WlZObGMzTnBiMjVEWVd4c1ltRmphMU4wWlhBb2UyVnljbTl5T25JL2REcDJiMmxrSURBc2IzVjBjSFYwT25JL2RtOXBaQ0F3T25Rc2MyVnlhV0ZzYVhwbFpFTnZiblJsZUhRNmJpeHpkR0YwZFhNNmNqOWdabUZwYkdWa1lEcGdZMjl0Y0d4bGRHVmtZQ3gxYzJGblpUcHlQM1p2YVdRZ01EcGxMbUZqZEdsdmJpNTFjMkZuWlgwcExHRjNZV2wwSUc1dmRHbG1lVVJsYkdWbllYUmxaRkJoY21WdWRGTjBaWEFvZTNKbGMzVnNkRHB5UDJOeVpXRjBaVVJsYkdWbllYUmxaRk4xWW1GblpXNTBSWEp5YjNKU1pYTjFiSFFvYml4MEtUcGpjbVZoZEdWRVpXeGxaMkYwWldSVGRXSmhaMlZ1ZEZOMVkyTmxjM05TWlhOMWJIUW9iaXgwS1N4elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwdUxIVnpZV2RsT25JL2RtOXBaQ0F3T21VdVlXTjBhVzl1TG5WellXZGxmU2s3Wld4elpYdHNaWFFnYmoxN2IzVjBjSFYwT25Rc2RYTmhaMlU2WlM1aFkzUnBiMjR1ZFhOaFoyVkVaV3gwWVgwN2NpWW1LRzR1YVhORmNuSnZjajBoTUNrc1lYZGhhWFFnYm05MGFXWjVWSFZ5YmtOaGJHeGxjbE4wWlhBb2UyTmhiR3hsY2pwbExtTmhiR3hsY2l4c2FXWmxZM2xqYkdVNllIUmxjbTFwYm1Gc1lDeHpaWE56YVc5dVNXUTZaUzVoWTNScGIyNHVjMlZ6YzJsdmJsTjBZWFJsTG5ObGMzTnBiMjVKWkN4elpYUjBiR1ZrT201OUtYMXlaWFIxY201N2IzVjBjSFYwT25SOWZXVjRjRzl5ZEh0M2IzSnJabXh2ZDBWdWRISjVmVHRjYm5kdmNtdG1iRzkzUlc1MGNua3VkMjl5YTJac2IzZEpaQ0E5SUZ3aWQyOXlhMlpzYjNjdkwyVjJaUzh2ZDI5eWEyWnNiM2RGYm5SeWVWd2lPMXh1WjJ4dlltRnNWR2hwY3k1ZlgzQnlhWFpoZEdWZmQyOXlhMlpzYjNkekxuTmxkQ2hjSW5kdmNtdG1iRzkzTHk5bGRtVXZMM2R2Y210bWJHOTNSVzUwY25sY0lpd2dkMjl5YTJac2IzZEZiblJ5ZVNrN1hHNGlYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzVFVGQlRTd3dRa0ZCZDBJc1QwRkJUeXhKUVVGSkxHdENRVUZyUWp0QlFVRkZMRTFCUVVFc2RVSkJRWEZDTEU5QlFVOHNTVUZCU1N4elFrRkJjMEk3UVVGQlJTeE5RVUZCTEhsQ1FVRjFRaXhQUVVGUExFbEJRVWtzZDBKQlFYZENPMEZCUVVVc1RVRkJRU3hwUWtGQlpTeFBRVUZQTEVsQlFVa3NaMEpCUVdkQ08wRkJRVzlFTEUxQlFVRXNjVUpCUVcxQ0xFOUJRVThzU1VGQlNTeHpRa0ZCYzBJN1FVRkJSU3hOUVVGQkxHbENRVUZsTzBGQlFYRkdMRk5CUVZNc1YwRkJWeXhIUVVGRk8wTkJRVU1zU1VGQlNTeEpRVUZGTEdWQlFXVTdRMEZCYzBJc1NVRkJSeXhOUVVGSkxFdEJRVXNzUjBGQlJTeE5RVUZOTEUxQlFVMHNPRVJCUVRoRU8wTkJRVVVzVDBGQlR5eEZRVUZGTEVOQlFVTTdRVUZCUXp0QlFVRkRMRk5CUVZNc2MwSkJRWEZDTzBOQlFVTXNTVUZCU1N4SlFVRkZMR1ZCUVdVN1EwRkJlVUlzU1VGQlJ5eE5RVUZKTEV0QlFVc3NSMEZCUlN4TlFVRk5MRTFCUVUwc0swVkJRU3RGTzBOQlFVVXNUMEZCVHp0QlFVRkRPMEZCUVVNc1UwRkJVeXhaUVVGWkxFbEJRVVVzUTBGQlF5eEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMR1ZCUVdVN1EwRkJkMElzU1VGQlJ5eE5RVUZKTEV0QlFVc3NSMEZCUlN4TlFVRk5MRTFCUVUwc0swUkJRU3RFTzBOQlFVVXNTVUZCU1N4SlFVRkZMRVZCUVVVc1JVRkJSU3hUUVVGVE8wTkJRVVVzVDBGQlR5eFBRVUZQTEU5QlFVOHNWMEZCVnl4bFFVRmxMRmRCUVZVc1IwRkJSU3h4UWtGQmIwSTdSVUZCUXl4UFFVRk5PMFZCUVVVc1ZVRkJVeXhEUVVGRE8wTkJRVU1zUlVGQlF5eERRVUZETzBGQlFVTTdRVUZCYzFVc1UwRkJVeXhOUVVGTkxFZEJRVVU3UTBGQlF5eEpRVUZKTEVsQlFVVXNaVUZCWlR0RFFVRm5RaXhKUVVGSExFMUJRVWtzUzBGQlN5eEhRVUZGTEUxQlFVMHNUVUZCVFN4NVJFRkJlVVE3UTBGQlJTeFBRVUZQTEVWQlFVVXNRMEZCUXp0QlFVRkRPenM3UVVORE4yZEVMRWxCUVZjc01FSkJRVEJDTEZkQlFWY3NUMEZCVHl4SlFVRkpMRzFDUVVGdFFpeEZRVUZGTEVOQlFVTXNNa05CUVRKRE8wRkJRelZJTEVsQlFWY3NNa0pCUVRKQ0xGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zTkVOQlFUUkRPMEZCUXpsSUxFbEJRVmNzTWtKQlFUSkNMRmRCUVZjc1QwRkJUeXhKUVVGSkxHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc05FTkJRVFJET3pzN1FVTkdReXhsUVVGbExIVkNRVUYxUWl4SFFVRkZPME5CUVVNc1RVRkJUU3hOUVVGTkxFVkJRVVVzVVVGQlVTeEhRVUZGTEUxQlFVMHNlVUpCUVhsQ0xFVkJRVU1zVDBGQlRTeEZRVUZGTEUxQlFVc3NRMEZCUXp0QlFVRkRPMEZCUXk5UExIVkNRVUYxUWl4aFFVRmhPMEZCUTNCRExGZEJRVmNzYjBKQlFXOUNMRWxCUVVrc2VVTkJRWGxETEhOQ1FVRnpRanM3TzBGRFNHeEhMRTFCUVUwc09FSkJRVFJDTzBGQlFUQkNMRk5CUVZNc01rSkJRVEpDTEVkQlFVVTdRMEZCUXl4SlFVRkpMRWxCUVVVc1IwRkJSeXhMUVVGTE8wTkJRVVVzU1VGQlJ5eE5RVUZKTEV0QlFVc3NTMEZCUnl4RlFVRkZMRmRCUVZNc1IwRkJSVHREUVVGUExFbEJRVWtzUzBGQlJ5eEZRVUZGTEZkQlFWY3NSMEZCUnl4SlFVRkZMRWxCUVVVc1NVRkJTU3hKUVVGQkxFTkJRVXNzVVVGQlVTeFJRVUZQTEVWQlFVVTdRMEZCUlN4UFFVRlBMRVZCUVVVc1YwRkJVeXhKUVVGRkxFdEJRVXNzU1VGQlJUdEJRVUZET3pzN1FVTkJkRWtzVTBGQlV5eDVRMEZCZDBNN1EwRkJReXhQUVVGUExGRkJRVkVzU1VGQlNTeGxRVUZoTEdkQ1FVRmpMRkZCUVZFc1NVRkJTU3huUTBGQk9FSXNWMEZCVnl4UlFVRlJMRWxCUVVrc2EwTkJRV2RETzBGQlFVazdRVUZCUXl4VFFVRlRMQ3RDUVVFclFpeEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMRkZCUVZFc1NVRkJTU3g1UWtGQmVVSXNTMEZCU3l4TFFVRkhMRXRCUVVzc1IwRkJSU3hMUVVGSExIVkRRVUYxUXl4TFFVRkhMRXRCUVVjc1JVRkJRU3hEUVVGSExGRkJRVkVzVDBGQlRTeEZRVUZGTEVkQlFVVXNTVUZCUlN3eVFrRkJNa0lzVVVGQlVTeEpRVUZKTERSQ1FVRTBRanREUVVGRkxFOUJRVThzVFVGQlNTeExRVUZMTEVsQlFVVXNTVUZCUlN4SFFVRkhMRWxCUVVrN1FVRkJSenM3TzBGRFEzaHFRaXhKUVVGWExEWkNRVUUyUWl4WFFVRlhMRTlCUVU4c1NVRkJTU3h0UWtGQmJVSXNSVUZCUlN4RFFVRkRMRGhEUVVFNFF6czdPMEZEUkd4SkxGTkJRVk1zYlVKQlFXMUNMRWRCUVVVc1IwRkJSVHREUVVGRExFbEJRVWtzU1VGQlJTeDFRa0ZCZFVJN1JVRkJReXhIUVVGRkxFVkJRVVU3UlVGQlpTeEhRVUZGTEVWQlFVVTdRMEZCWXl4RFFVRkRMRWRCUVVVc1NVRkJSU3huUWtGQlowSTdSVUZCUXl4SFFVRkZMRVZCUVVVN1JVRkJVU3hIUVVGRkxFVkJRVVU3UTBGQlR5eERRVUZETEVkQlFVVXNTVUZCUlN4blFrRkJaMEk3UlVGQlF5eEhRVUZGTEVWQlFVVTdSVUZCVVN4SFFVRkZMRVZCUVVVN1EwRkJUeXhEUVVGRExFZEJRVVVzU1VGQlJTeEZRVUZGTEdkQ1FVRmpMRVZCUVVVc1kwRkJZU3hKUVVGRkxFTkJRVU03UTBGQlJTeFBRVUZQTEUxQlFVa3NTMEZCU3l4TlFVRkpMRVZCUVVVc2FVSkJRV1VzU1VGQlJ5eE5RVUZKTEV0QlFVc3NUVUZCU1N4RlFVRkZMRlZCUVZFc1NVRkJSeXhOUVVGSkxFdEJRVXNzVFVGQlNTeEZRVUZGTEZWQlFWRXNTVUZCUnl4TlFVRkpMRXRCUVVzc1RVRkJTU3hGUVVGRkxHVkJRV0VzU1VGQlJ6dEJRVUZETzBGQlFVTXNVMEZCVXl4eFFrRkJjVUlzUjBGQlJUdERRVUZETEVsQlFVY3NUVUZCU1N4TFFVRkxMRWRCUVVVN1EwRkJUeXhKUVVGSExFOUJRVThzUzBGQlJ5eFZRVUZUTEU5QlFVOHNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJReXhUUVVGUExFbEJRVVVzU1VGQlJTeExRVUZMTzBOQlFVVXNTVUZCU1N4SlFVRkZMRVZCUVVVc1VVRkJUeXhOUVVGSExFVkJRVVVzVTBGQlR5eFZRVUZSTEVWQlFVVXNTMEZCU3l4TFFVRkxMRU5CUVVNc1EwRkJReXhUUVVGUExFTkJRVU03UTBGQlJTeEpRVUZITEVWQlFVVXNWMEZCVXl4SFFVRkZMRTlCUVU4c1JVRkJSU3hYUVVGVExFVkJRVVVzVTBGQlR5eEpRVUZGTzBGQlFVTTdRVUZCZDJJc1UwRkJVeXgxUWtGQmRVSXNSMEZCUlR0RFFVRkRMRWxCUVVrc1NVRkJSU3hGUVVGRkxFdEJRVWNzUTBGQlF5eEhRVUZGTEVsQlFVVXNSVUZCUlN4TFFVRkhMRU5CUVVNN1EwRkJSU3hKUVVGSExFVkJRVVVzUlVGQlJTeFhRVUZUTEV0QlFVY3NSVUZCUlN4WFFVRlRMRWxCUVVjc1QwRkJUU3hEUVVGRExFZEJRVWNzUjBGQlJTeEhRVUZITEVOQlFVTTdRVUZCUXp0QlFVRkRMRk5CUVZNc1owSkJRV2RDTEVkQlFVVTdRMEZCUXl4SlFVRkpMRWxCUVVVc1JVRkJSU3hMUVVGSExFTkJRVU1zUjBGQlJTeEpRVUZGTEVWQlFVVXNTMEZCUnl4RFFVRkRPME5CUVVVc1NVRkJSeXhGUVVGRkxFVkJRVVVzVjBGQlV5eExRVUZITEVWQlFVVXNWMEZCVXl4SlFVRkhMRTlCUVUwc1EwRkJReXhIUVVGSExFZEJRVVVzUjBGQlJ5eERRVUZETzBGQlFVTTdRVUZCUXl4VFFVRlRMR2RDUVVGblFpeEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMSEZDUVVGeFFpeEZRVUZGTEVOQlFVTXNSMEZCUlN4SlFVRkZMSEZDUVVGeFFpeEZRVUZGTEVOQlFVTTdRMEZCUlN4UFFVRlBMRTFCUVVrc1MwRkJTeXhKUVVGRkxFbEJRVVVzVFVGQlNTeExRVUZMTEVsQlFVVXNTVUZCUlN4clFrRkJhMEk3UlVGQlF5eFZRVUZUTzBWQlFVVXNWVUZCVXp0RFFVRkRMRU5CUVVNN1FVRkJRenRCUVVGRExGTkJRVk1zYTBKQlFXdENMRWRCUVVVN1EwRkJReXhQUVVGUExFOUJRVThzUlVGQlJTeFpRVUZWTEZsQlFWVXNUMEZCVHl4RlFVRkZMRmxCUVZVc1YwRkJVeXhIUVVGSExFVkJRVVVzVTBGQlV5eE5RVUZOTEVWQlFVVXNZVUZCVnl4RFFVRkRMRWRCUVVjc2JVSkJRVzFDTEVWQlFVVXNVVUZCVVN4SFFVRkZMRWRCUVVjc2JVSkJRVzFDTEVWQlFVVXNVVUZCVVN4RFFVRkRPMEZCUVVNN1FVRkJReXhUUVVGVExHMUNRVUZ0UWl4SFFVRkZPME5CUVVNc1QwRkJUeXhQUVVGUExFdEJRVWNzVjBGQlV5eEZRVUZGTEZOQlFVOHNTVUZCUlN4RFFVRkRPMFZCUVVNc1RVRkJTenRGUVVGUExFMUJRVXM3UTBGQlF5eERRVUZETEVsQlFVVXNRMEZCUXl4SlFVRkZMRTFCUVUwc1VVRkJVU3hEUVVGRExFbEJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCUlN4RFFVRkRPMEZCUVVNN1FVRkJReXhUUVVGVExHMUNRVUZ0UWl4SFFVRkZPME5CUVVNc1NVRkJSeXhEUVVGRExFZEJRVVVzUjBGQlJ5eExRVUZITzBOQlFVVXNTVUZCUnl4TlFVRkpMRXRCUVVzc1IwRkJSU3hOUVVGTkxFMUJRVTBzTUVOQlFUQkRPME5CUVVVc1NVRkJTU3hKUVVGRkxFVkJRVVVzVFVGQlN5eEpRVUZGTEVWQlFVVXNVVUZCVHl4SlFVRkZMRU5CUVVNc1IwRkJSeXhGUVVGRkxGRkJRVkU3UTBGQlJTeExRVUZKTEVsQlFVa3NTMEZCU3l4SFFVRkZPMFZCUVVNc1NVRkJSeXhGUVVGRkxGTkJRVThzUzBGQlN5eE5RVUZKTEVsQlFVVXNSVUZCUlN4UFFVRk5MRVZCUVVVc1YwRkJVeXhMUVVGTExFZEJRVVU3UjBGQlF5eEpRVUZITEUxQlFVa3NTMEZCU3l4SFFVRkZMRTFCUVUwc1RVRkJUU3hyUkVGQmEwUTdSMEZCUlN4SlFVRkZMRVZCUVVVN1JVRkJUVHRGUVVGRExFVkJRVVVzUzBGQlN5eEhRVUZITEVWQlFVVXNVVUZCVVR0RFFVRkRPME5CUVVNc1QwRkJUVHRGUVVGRExFZEJRVWM3UlVGQlJTeE5RVUZMTzBWQlFVVXNVVUZCVHp0RlFVRkZMRlZCUVZNN1EwRkJRenRCUVVGRE96czdRVU5CTVN0RUxFMUJRVTBzTWtKQlFYbENPME5CUVVNN1EwRkJWVHREUVVGcFFqdERRVUZWTzBGQlFXTTdRVUZCUlN4VFFVRlRMSGRDUVVGM1FpeEhRVUZGTzBOQlFVTXNTVUZCUnl4RlFVRkZMRmRCUVZNc1IwRkJSU3hQUVVGTkxFTkJRVU03UTBGQlJTeEpRVUZITEVWQlFVVXNWMEZCVXl4SFFVRkZMRTlCUVU4c1JVRkJSU3hOUVVGSkxFTkJRVU03UTBGQlJTeEpRVUZKTEVsQlFVVXNRMEZCUXl4SFFVRkZMRWxCUVVVc1EwRkJRenREUVVGRkxFdEJRVWtzU1VGQlNTeExRVUZMTEVkQlFVVTdSVUZCUXl4TFFVRkpMRWxCUVVjc1EwRkJReXhIUVVGRkxFMUJRVXNzVDBGQlR5eFJRVUZSTEVOQlFVTXNSMEZCUlN4TlFVRkpMRXRCUVVzc1RVRkJTU3hGUVVGRkxFdEJRVWM3UlVGQlJ5eEpRVUZGTEcxQ1FVRnRRaXhIUVVGRkxFTkJRVU03UTBGQlF6dERRVUZETEV0QlFVa3NTVUZCU1N4TFFVRkxMREJDUVVGNVFpeFBRVUZQTEVWQlFVVTdRMEZCUnl4UFFVRlBMRTlCUVU4c1QwRkJUeXhIUVVGRkxFTkJRVU03UVVGQlF6czdPMEZEUTJoaExFbEJRVmNzVjBGQlZ5eFhRVUZYTEU5QlFVOHNTVUZCU1N4dFFrRkJiVUlzUlVGQlJTeERRVUZETERSQ1FVRTBRanRCUVVNNVJpeEpRVUZYTERCQ1FVRXdRaXhYUVVGWExFOUJRVThzU1VGQlNTeHRRa0ZCYlVJc1JVRkJSU3hEUVVGRExESkRRVUV5UXp0QlFVTTFTQ3hKUVVGWExHMUNRVUZ0UWl4WFFVRlhMRTlCUVU4c1NVRkJTU3h0UWtGQmJVSXNSVUZCUlN4RFFVRkRMRzlEUVVGdlF6czdPMEZEU0hkQ0xHVkJRV1VzZFVKQlFYVkNMRWRCUVVVN1EwRkJReXhKUVVGSkxFbEJRVVVzZDBKQlFYZENMRVZCUVVVc1VVRkJVVHREUVVGRkxFOUJRVThzUlVGQlJTeGhRVUZoTEhkQ1FVRnpRaXhOUVVGTkxIZENRVUYzUWp0RlFVRkRMRTFCUVVzc1JVRkJSVHRGUVVGTExHZENRVUZsTEVWQlFVVTdSVUZCWlN4VFFVRlJPMFZCUVVVc1kwRkJZU3hGUVVGRk8wTkJRVmtzUTBGQlF5eEpRVUZGTzBWQlFVTXNUVUZCU3p0RlFVRlhMRmRCUVZVN1EwRkJRenRCUVVGRE96czdRVU5CY2xvc1pVRkJaU3h0UWtGQmJVSXNSMEZCUlR0RFFVRkRMRWxCUVVrN1EwRkJSU3hKUVVGSE8wVkJRVU1zU1VGQlJTeE5RVUZOTEVWQlFVVXNXVUZCV1R0RFFVRkRMRk5CUVU4c1IwRkJSVHRGUVVGRExFOUJRVThzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSU3gzUWtGQmQwSXNSMEZCUlN4RlFVRkZMRXRCUVVzc1EwRkJRenREUVVGRE8wTkJRVU1zU1VGQlJ5eE5RVUZKTEUxQlFVc3NUMEZCVHl4TlFVRk5MR2RDUVVGblFpeEhRVUZGTEhkQ1FVRjNRaXhGUVVGRkxFOUJRVTBzUlVGQlJTeExRVUZMTEVOQlFVTTdRVUZCUXp0QlFVRkRMR1ZCUVdVc2EwSkJRV3RDTEVkQlFVVTdRMEZCUXl4UFFVRlBMRVZCUVVVc1ZVRkJVU3hqUVVGWkxFMUJRVTBzUlVGQlJTeFBRVUZQTEV0QlFVc3NRMEZCUXp0QlFVRkRPMEZCUVVNc1pVRkJaU3haUVVGWkxFZEJRVVU3UTBGQlF5eEpRVUZKTEVsQlFVVXNSVUZCUlR0RFFVRlJMRWxCUVVjc1QwRkJUeXhMUVVGSExGbEJRVmM3UlVGQlF5eE5RVUZOTEVWQlFVVXNTMEZCU3l4RFFVRkRPMFZCUVVVN1EwRkJUVHREUVVGRExFbEJRVWtzU1VGQlJTeEZRVUZGTEU5QlFVODdRMEZCVXl4UFFVRlBMRXRCUVVjc1kwRkJXU3hOUVVGTkxFVkJRVVVzUzBGQlN5eERRVUZETzBGQlFVTTdRVUZCUXl4bFFVRmxMR2RDUVVGblFpeEhRVUZGTEVkQlFVVTdRMEZCUXl4SlFVRkhPMFZCUVVNc1RVRkJUU3haUVVGWkxFTkJRVU03UTBGQlF5eFJRVUZOTEVOQlFVTTdRMEZCUXl4TlFVRk5PMEZCUVVNN1FVRkJReXhUUVVGVExIZENRVUYzUWl4SFFVRkZMRWRCUVVVN1EwRkJReXhQUVVGUExHOUNRVUZ2UWl4RFFVRkRMRWxCUVVVc2QwSkJRWGRDTEU5QlFVOHNSVUZCUlN4VFFVRlBMRmRCUVZNc1JVRkJSU3hSUVVGTkxFZEJRVVVzVDBGQlR5eEZRVUZGTEc5Q1FVRnJRaXhYUVVGVExFVkJRVVVzYlVKQlFXbENMRXRCUVVzc1EwRkJReXhKUVVGRk8wRkJRVU03UVVGQlF5eFRRVUZUTEc5Q1FVRnZRaXhIUVVGRk8wTkJRVU1zVDBGQlR5eFBRVUZQTEV0QlFVY3NXVUZCVlN4RFFVRkRMRU5CUVVNc1MwRkJSeXhWUVVGVExFdEJRVWNzUlVGQlJTeFRRVUZQTzBGQlFXMUNPMEZCUVVNc1UwRkJVeXgzUWtGQmQwSXNSMEZCUlN4SFFVRkZPME5CUVVNc1NVRkJTU3hKUVVGRkxFMUJRVWtzUzBGQlN5eEpRVUZGTEV0QlFVY3NWVUZCVlN4RlFVRkZPME5CUVVrc1QwRkJUeXhQUVVGUExFOUJRVThzVFVGQlRTeGxRVUZsTEVWQlFVVXNjVUpCUVhGQ0xFZEJRVWNzUjBGQlJUdEZRVUZETEd0Q1FVRnBRanRGUVVGRkxFMUJRVXM3UlVGQmIwSXNUMEZCVFR0RFFVRkRMRU5CUVVNN1FVRkJRenM3TzBGRFFYWm9ReXhUUVVGVExHRkJRV0VzUjBGQlJUdERRVUZETEU5QlFVOHNSVUZCUlN4WFFVRlRMRXRCUVVjc1VVRkJVU3hGUVVGRkxHRkJRVmNzUlVGQlJUdEJRVUZOT3pzN1FVTkJNMFVzVTBGQlV5d3lRa0ZCTWtJc1IwRkJSVHREUVVGRExFOUJRVThzWVVGQllTeFJRVUZOTzBWQlFVTXNSMEZCUnl4UFFVRlBMRmxCUVZrc1QwRkJUeXhSUVVGUkxFTkJRVU1zUTBGQlF6dEZRVUZGTEU5QlFVMHNSVUZCUlN4VlFVRlJMRXRCUVVzc1NVRkJSU3hMUVVGTExFbEJRVVVzTWtKQlFUSkNMRVZCUVVVc1MwRkJTenRGUVVGRkxGTkJRVkVzUlVGQlJUdEZRVUZSTEUxQlFVc3NSVUZCUlR0RlFVRkxMRTlCUVUwc1JVRkJSVHREUVVGTExFbEJRVVU3UVVGQlF6dEJRVUZETEZOQlFWTXNlVUpCUVhsQ0xFZEJRVVU3UTBGQlF5eEpRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRMRWRCUVVVc1QwRkJUeXhOUVVGTkxFOUJRVThzUTBGQlF5eERRVUZETzBOQlFVVXNTVUZCU1N4SlFVRkZMRTlCUVU4c1JVRkJSU3hYUVVGVExGZEJRVk1zUlVGQlJTeFZRVUZSTEU5QlFVOHNRMEZCUXl4SFFVRkZMRWxCUVVVc1RVRkJUU3hEUVVGRE8wTkJRVVVzVDBGQlR5eEZRVUZGTEZGQlFVMHNZVUZCVnl4RlFVRkZMRTlCUVVzc1JVRkJSU3hQUVVGTkxFOUJRVThzUlVGQlJTeFRRVUZQTEdGQlFWY3NSVUZCUlN4UlFVRk5MRVZCUVVVc1VVRkJUeXhYUVVGVkxFMUJRVWtzUlVGQlJTeFJRVUZOTEZOQlFWTXNSVUZCUlN4TFFVRkxMRWxCUVVVc2VVSkJRWGxDTEVWQlFVVXNTMEZCU3l4SlFVRkZMRVZCUVVVN1EwRkJUeXhKUVVGSkxFbEJRVVU3UTBGQlJTeExRVUZKTEVsQlFVY3NRMEZCUXl4SFFVRkZMRTFCUVVzc1QwRkJUeXhSUVVGUkxFTkJRVU1zUjBGQlJTeE5RVUZKTEdGQlFWY3NUVUZCU1N4VlFVRlJMRTFCUVVrc1YwRkJVeXhOUVVGSkxGbEJRVlVzUlVGQlJTeExRVUZITzBOQlFVY3NUMEZCVHp0QlFVRkRPMEZCUVVNc1UwRkJVeXhUUVVGVExFZEJRVVU3UTBGQlF5eFBRVUZQTEU5QlFVOHNTMEZCUnl4WlFVRlZMRU5CUVVNc1EwRkJRenRCUVVGRE96czdRVU5EY0hKQ0xFbEJRVmNzYzBKQlFYTkNMRmRCUVZjc1QwRkJUeXhKUVVGSkxHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc2RVTkJRWFZET3pzN1FVTkVjRWdzVFVGQlRTd3dRa0ZCZDBJN096dEJRMEZ4UXl4VFFVRlRMR2xDUVVGcFFpeEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMRWxCUVVrN1EwRkJlVUlzU1VGQlJ5eE5RVUZKTEV0QlFVc3NSMEZCUlN4UFFVRk5MRU5CUVVNN1EwRkJSU3hKUVVGSkxFbEJRVVVzUlVGQlJUdERRVUZSTEU5QlFVOHNUVUZCVFN4UlFVRlJMRU5CUVVNc1NVRkJSU3hKUVVGRkxFTkJRVU03UVVGQlF6dEJRVUZETEZOQlFWTXNkVUpCUVhWQ0xFZEJRVVVzUjBGQlJUdERRVUZETEU5QlFVOHNhVUpCUVdsQ0xFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVc3NUVUZCUnl4RlFVRkZMRlZCUVZFc1lVRkJWeXhGUVVGRkxGVkJRVlVzVjBGQlV5eEZRVUZGTEUxQlFVMDdRVUZCUXp0QlFVRXlTaXhUUVVGVExIVkRRVUYxUXl4SFFVRkZMRWRCUVVVN1EwRkJReXhQUVVGUExIVkNRVUYxUWl4SFFVRkZMRVZCUVVNc1VVRkJUeXhGUVVGRkxFOUJRVTBzUTBGQlF5eE5RVUZKTEV0QlFVczdRVUZCUXpzN08wRkRRemRyUWl4SlFVRlhMRFJDUVVFMFFpeFhRVUZYTEU5QlFVOHNTVUZCU1N4dFFrRkJiVUlzUlVGQlJTeERRVUZETERaRFFVRTJRenM3TzBGRFFXaEpMRWxCUVZjc2NVTkJRWEZETEZkQlFWY3NUMEZCVHl4SlFVRkpMRzFDUVVGdFFpeEZRVUZGTEVOQlFVTXNjMFJCUVhORU96czdRVU5FYkVvc1UwRkJVeXhyUWtGQmEwSXNSMEZCUlR0RFFVRkRMRWxCUVVjc1QwRkJUeXhGUVVGRkxGTkJRVThzV1VGQlZTeEZRVUZGTEZWQlFWRXNUVUZCU3l4TlFVRk5MRTFCUVUwc1IwRkJSeXhGUVVGRkxFMUJRVTBzZDBOQlFYZERPME5CUVVVc1NVRkJTU3hKUVVGRkxFVkJRVVVzVFVGQlRTeFRRVUZSTzBOQlFVVXNTVUZCUnl4UFFVRlBMRXRCUVVjc1ZVRkJVeXhKUVVGRkxFVkJRVVU3VFVGQlZ5eEpRVUZITEVWQlFVVXNZVUZCV1N4RlFVRkZMRlZCUVZFc1JVRkJSU3h0UWtGQmFVSXNTMEZCU3l4SFFVRkZMRWxCUVVVN1JVRkJReXhIUVVGSExFVkJRVVU3UlVGQlRTeFRRVUZSTEVWQlFVVTdRMEZCWXp0TlFVRlBMRTFCUVUwc1RVRkJUU3hIUVVGSExFVkJRVVVzVFVGQlRTeDNRMEZCZDBNN1EwRkJSU3hKUVVGSkxFbEJRVVVzUlVGQlJTeHJRa0ZCWjBJN1EwRkJSU3hKUVVGSExFTkJRVU1zVDBGQlR5eFZRVUZWTEVWQlFVVXNUMEZCVHl4TFFVRkhMRVZCUVVVc1ZVRkJVU3hIUVVGRkxFMUJRVTBzVFVGQlRTeEhRVUZITEVWQlFVVXNUVUZCVFN4WlFVRlpMRVZCUVVVc1VVRkJVU3cwUWtGQk5FSTdRMEZCUlN4SlFVRkhMRVZCUVVVc1ZVRkJVU3hGUVVGRkxHVkJRV01zVFVGQlRTeE5RVUZOTEVkQlFVY3NSVUZCUlN4TlFVRk5MSGRDUVVGM1FpeEZRVUZGTEZGQlFWRXNPRU5CUVRoRExFVkJRVVVzWTBGQll5eHBSMEZCYVVjN1EwRkJSU3hQUVVGTExFVkJRVVVzVlVGQlVTeEZRVUZGTEdkQ1FVRmxPMFZCUVVNc1NVRkJTU3hKUVVGRkxFVkJR",
	"VVVzVjBGQlZ5eE5RVUZMTEUxQlFVY3NSVUZCUlN4VFFVRlBMRVZCUVVVc1QwRkJUenRGUVVGRkxFbEJRVWNzUTBGQlF5eEhRVUZGTEUxQlFVMHNUVUZCVFN4SFFVRkhMRVZCUVVVc1RVRkJUU3gzUTBGQmQwTXNSVUZCUlN4UlFVRlJMRXRCUVVzc1JVRkJSU3hWUVVGUkxFVkJRVVVzUlVGQlJUdEZRVUZGTEVsQlFVY3NSVUZCUlN4UFFVRkxMRVZCUVVVc1QwRkJTeXhIUVVGRkxFMUJRVTBzVFVGQlRTeEhRVUZITEVWQlFVVXNUVUZCVFN4alFVRmpMRVZCUVVVc1MwRkJTeXhMUVVGTExFVkJRVVVzUjBGQlJ5d3dRMEZCTUVNN1JVRkJSU3hKUVVGSkxFbEJRVVVzUlVGQlJTeFJRVUZSTEVOQlFVTTdSVUZCUlN4SlFVRkhMRVZCUVVVc1dVRkJWU3hGUVVGRkxFbEJRVWNzVFVGQlRTeE5RVUZOTEVkQlFVY3NSVUZCUlN4TlFVRk5MR05CUVdNc1JVRkJSU3hMUVVGTExFdEJRVXNzUlVGQlJTeEhRVUZITEdsRFFVRnBReXhGUVVGRkxGRkJRVkVzUlVGQlJUdEZRVUZGTEVsQlFVVTdRMEZCUXp0RFFVRkRMRTlCUVU4N1FVRkJRenM3TzBGRFFYSnlReXhOUVVGTkxEQkNRVUYzUWp0RFFVRkRMRTFCUVVzN1EwRkJSU3hSUVVGUkxFZEJRVVU3UlVGQlF5eEpRVUZITEVOQlFVTXNPRUpCUVRoQ0xFTkJRVU1zUjBGQlJTeE5RVUZOTEUxQlFVMHNOa1ZCUVRaRk8wVkJRVVVzVDBGQlRUdEhRVUZETEdOQlFXRXNSVUZCUlR0SFFVRmhMR2xDUVVGblFpeEZRVUZGTzBkQlFXZENMRTFCUVVzc1JVRkJSVHRIUVVGTExGZEJRVlU3U1VGQlF5eFBRVUZOTEVWQlFVVTdTVUZCVXl4blFrRkJaU3hGUVVGRk8wbEJRV1VzYlVKQlFXdENMRVZCUVVVN1NVRkJhMElzWTBGQllTeEZRVUZGTzBkQlFWazdSMEZCUlN4VFFVRlJPMFZCUVVNN1EwRkJRenREUVVGRkxFbEJRVWM3UVVGQlF6dEJRVUZGTEZOQlFWTXNPRUpCUVRoQ0xFZEJRVVU3UTBGQlF5eFBRVUZQTEU5QlFVOHNTMEZCUnl4WlFVRlZMRU5CUVVNc1EwRkJReXhMUVVGSExHTkJRV0U3UVVGQlF6czdPMEZEUVRWV0xFMUJRVUVzT0VKQlFUUkNMRU5CUVVNc2RVSkJRWFZDTzBGQlFUQlVMRk5CUVZNc2VVSkJRWGxDTEVkQlFVVTdRMEZCUXl4UFFVRlBMR3RDUVVGclFqdEZRVUZETEdkQ1FVRmxPMFZCUVVVc1QwRkJUVHRGUVVGelFpeFpRVUZYTzBWQlFUUkNMR1ZCUVdNN1JVRkJSU3hQUVVGTk8wTkJRVU1zUTBGQlF6dEJRVUZET3pzN1FVTkRlbkZDTEVsQlFWY3NORUpCUVRSQ0xGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zTmtOQlFUWkRPenM3UVVORWFFa3NVMEZCVXl3d1FrRkJNRUlzUjBGQlJUdERRVUZETEU5QlFVMHNSMEZCUnl4RlFVRkZPMEZCUVZFN096dEJRMEY2UkN4TlFVRk5MRFJDUVVFd1FqdEJRVUZ4UWl4SlFVRkpMSEZDUVVGdFFpeGpRVUZqTEUxQlFVczdRMEZCUXl4WlFVRlpMRWxCUVVVc01rSkJRVEJDTzBWQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVVc1MwRkJTeXhQUVVGTE8wTkJRWGxDTzBGQlFVTTdPenRCUTBFMFJ5eGxRVUZsTERoQ1FVRTRRaXhIUVVGRk8wTkJRVU1zU1VGQlNTeEpRVUZGTEZkQlFWY3NSVUZCUXl4UFFVRk5MREJDUVVFd1FpeEZRVUZGTEZsQlFWa3NSVUZCUXl4RFFVRkRMRWRCUVVVc1NVRkJSU3hGUVVGRkxFOUJRVThzWTBGQll5eERRVUZETzBOQlFVVXNTVUZCUnp0RlFVRkRMRTFCUVUwc2JVSkJRVzFDTEVOQlFVTTdRMEZCUXl4VFFVRlBMRWRCUVVVN1JVRkJReXhKUVVGSExHOUNRVUZ2UWl4RFFVRkRMRWRCUVVVN1JVRkJUeXhOUVVGTk8wTkJRVU03UTBGQlF5eEpRVUZKTEVsQlFVVXNTVUZCU1N4blFrRkJZeXhIUVVGRkxFbEJRVVVzYzBKQlFYTkNMRWRCUVVVc1JVRkJSU3h6UWtGQmJVSTdSVUZCUXl4RlFVRkZMRTFCUVUwc1NVRkJTU3h0UWtGQmFVSXNRMEZCUXp0RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGZEJRVk1zVVVGQlVTeEhRVUZGTEVsQlFVVXNRMEZCUXp0RFFVRkZMRTlCUVUwN1JVRkJReXhSUVVGUExFVkJRVVU3UlVGQlR5eFhRVUZWTzBWQlFVVXNUVUZCVFN4VlFVRlRPMGRCUVVNc1RVRkJTU3hKUVVGRkxFTkJRVU1zUjBGQlJTeE5RVUZOTEZsQlFWa3NRMEZCUXp0RlFVRkZPME5CUVVNN1FVRkJRenRCUVVGRExHVkJRV1VzYzBKQlFYTkNMRWRCUVVVc1IwRkJSU3hIUVVGRk8wTkJRVU1zVTBGQlR6dEZRVUZETEVsQlFVa3NTVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTenRGUVVGRkxFbEJRVWNzUlVGQlJTeE5RVUZMTEU5QlFVOHNUVUZCVFN4SlFVRkpMR05CUVZrc1EwRkJReXhEUVVGRE8wVkJRVVVzU1VGQlJ5eHJRa0ZCYTBJc1JVRkJSU3hQUVVGTkxFTkJRVU1zUjBGQlJUdEhRVUZETEVWQlFVVTdSMEZCUlR0RlFVRk5PME5CUVVNN1FVRkJRenRCUVVGRExGTkJRVk1zYTBKQlFXdENMRWRCUVVVc1IwRkJSVHREUVVGRExFbEJRVWNzVDBGQlR5eExRVUZITEZsQlFWVXNRMEZCUXl4SFFVRkZMRTlCUVUwc1EwRkJRenREUVVGRkxFbEJRVWtzU1VGQlJTeEZRVUZGTzBOQlFVOHNUMEZCVHl4TlFVRkpMRXRCUVVzc1MwRkJSeXhOUVVGSk8wRkJRVU03T3p0QlEwRnVOa0lzU1VGQlNTeHpRa0ZCYjBJc1RVRkJTenREUVVGRE8wTkJRV0U3UTBGQlpUdERRVUY1UWp0RFFVRnZRanREUVVFNFFpeFpRVUZaTEVkQlFVVTdSVUZCUXl4TFFVRkxMR1ZCUVdFc1JVRkJSU3hqUVVGaExFdEJRVXNzTWtKQlFYbENMRVZCUVVVc2JVSkJRV3RDTEV0QlFVc3NjMEpCUVc5Q0xFVkJRVVVzWTBGQllTeExRVUZMTEdkRFFVRTRRaXhGUVVGRkxHRkJRV0VzYlVKQlFXdENMRXRCUVVzc2FVSkJRV1VzUlVGQlJUdERRVUZqTzBOQlFVTXNTVUZCU1N4dlFrRkJiVUk3UlVGQlF5eFBRVUZQTEV0QlFVczdRMEZCZDBJN1EwRkJReXhKUVVGSkxHVkJRV003UlVGQlF5eFBRVUZQTEV0QlFVczdRMEZCYlVJN1EwRkJReXhOUVVGTkxFMUJRVTBzUjBGQlJUdEZRVUZETEV0QlFVc3NVMEZCVXl4RFFVRkRPMFZCUVVVc1NVRkJTU3hKUVVGRkxFVkJRVVVzWVVGQllUdEZRVUZyUWl4TlFVRkpMRTFCUVVrc1RVRkJTU3hMUVVGTExHdERRVUZuUXl4TFFVRkxMR2REUVVFNFFpeEhRVUZGTEUxQlFVMHNTMEZCU3l4TFFVRkxPMGRCUVVNc2JVSkJRV3RDTzBkQlFVVXNUVUZCU3p0RlFVRjVRaXhEUVVGRE8wTkJRVVU3UTBGQlF5eG5Ra0ZCWjBJc1IwRkJSU3hIUVVGRk8wVkJRVU1zVDBGQlRUdEhRVUZETEdGQlFWazdSMEZCUlN4UFFVRk5PMGRCUVVVc1owSkJRV1VzUzBGQlN6dEhRVUZsTEcxQ1FVRnJRaXhMUVVGTE8wZEJRWGxDTEdOQlFXRXNTMEZCU3p0RlFVRnRRanREUVVGRE8wTkJRVU1zVFVGQlRTeFBRVUZQTEVkQlFVVXNSMEZCUlN4SFFVRkZPMFZCUVVNc1MwRkJTeXhUUVVGVExFTkJRVU1zUjBGQlJTeE5RVUZOTEV0QlFVc3NTMEZCU3p0SFFVRkRMRkZCUVU4N1NVRkJReXhIUVVGSE8wbEJRVVVzYlVKQlFXdENMRXRCUVVzN1NVRkJlVUlzWTBGQllTeExRVUZMTzBkQlFXMUNPMGRCUVVVc2IwSkJRVzFDTEVWQlFVVXNWMEZCVXl4SlFVRkZMRXRCUVVzc1NVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF6dEhRVUZGTEUxQlFVczdSVUZCWVN4RFFVRkRPME5CUVVNN1EwRkJReXhOUVVGTkxFdEJRVXNzUjBGQlJUdEZRVUZETEUxQlFVMHNiMEpCUVc5Q08wZEJRVU1zWTBGQllTeExRVUZMTzBkQlFXRXNVMEZCVVR0RlFVRkRMRU5CUVVNN1EwRkJRenREUVVGRExGTkJRVk1zUjBGQlJUdEZRVUZETEV0QlFVc3NNa0pCUVhsQ0xFVkJRVVVzY1VKQlFXMUNMRXRCUVVzc01FSkJRWGxDTEV0QlFVc3NjMEpCUVc5Q0xFVkJRVVU3UTBGQldUdEJRVUZET3pzN1FVTkJNMmxETEZOQlFWTXNNRUpCUVRCQ0xFZEJRVVU3UTBGQlF5eFJRVUZQTEVWQlFVVXNUVUZCVkR0RlFVRmxMRXRCUVVrc2NVSkJRVzlDTEU5QlFVMHNOa0pCUVRaQ0xFVkJRVVU3UlVGQlV5eExRVUZKTEcxQ1FVRnJRaXhQUVVGTkxHbENRVUZwUWl4RlFVRkZMR0ZCUVdFc1IwRkJSeXhGUVVGRk8wVkJRVk1zUzBGQlNTeGxRVUZqTEU5QlFVMHNZVUZCWVN4RlFVRkZMRk5CUVZNc1IwRkJSeXhGUVVGRk8wTkJRVkU3UVVGQlF6czdPMEZEUVROblFpeFRRVUZUTEcxRFFVRnRReXhIUVVGRk8wTkJRVU1zU1VGQlNTeEpRVUZGTEVsQlFVa3NTVUZCU1N4RlFVRkZMRmRCUVZjc1IwRkJSU3hKUVVGRkxFbEJRVWtzU1VGQlJUdERRVUZGTEV0QlFVa3NTVUZCU1N4TFFVRkxMRVZCUVVVc1UwRkJVVHRGUVVGRExFbEJRVWtzU1VGQlJTd3dRa0ZCTUVJc1EwRkJRenRGUVVGRkxFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVY3NSVUZCUlN4SlFVRkpMRWRCUVVVc1EwRkJRenREUVVGRE8wTkJRVU1zU1VGQlNTeEpRVUZGTEVOQlFVTTdRMEZCUlN4TFFVRkpMRWxCUVVrc1MwRkJTeXhGUVVGRkxHRkJRVms3UlVGQlF5eEpRVUZKTEVsQlFVVXNSVUZCUlN4SlFVRkpMRU5CUVVNN1JVRkJSU3hKUVVGSExFMUJRVWtzUzBGQlN5eEhRVUZGTzBWQlFVOHNSVUZCUlN4TFFVRkxMRU5CUVVNN1EwRkJRenREUVVGRExFOUJRVTg3UVVGQlF6czdPMEZEUTIwclFpeE5RVUZOTEN0Q1FVRTJRanRCUVVFMFJDeFRRVUZUTERaQ1FVRTJRaXhIUVVGRk8wTkJRVU1zVDBGQlR5eEZRVUZGTEZOQlFVOHNhMEpCUVdkQ0xFVkJRVVVzVlVGQlZTeGhRVUZoTEhOQ1FVRnZRanRCUVVGRk8wRkJRVU1zWlVGQlpTeGhRVUZoTEVkQlFVVTdRMEZCUXl4SlFVRkpMRWxCUVVVc2VVSkJRWGxDTEVOQlFVTTdRMEZCUlN4UFFVRlBMRVZCUVVVc2IwSkJRVzlDTEdOQlFWa3NRMEZCUXl4SlFVRkZMSEZDUVVGeFFpeERRVUZETEVsQlFVVXNjMEpCUVhOQ0xFTkJRVU03UVVGQlF6dEJRVUZETEdWQlFXVXNjVUpCUVhGQ0xFZEJRVVU3UTBGQlF5eEpRVUZKTEVsQlFVVXNWMEZCVnl4RlFVRkRMRTlCUVUwc1IwRkJSeXhGUVVGRkxHZENRVUZuUWl4UlFVRlBMRU5CUVVNc1IwRkJSU3hKUVVGRkxFVkJRVVVzVDBGQlR5eGpRVUZqTEVOQlFVTXNSMEZCUlN4SlFVRkZMRWxCUVVrc2IwSkJRVzlDTzBWQlFVTXNZMEZCWVN4RlFVRkZPMFZCUVdkQ0xHZENRVUZsTEVWQlFVVXNWVUZCVlR0RlFVRmxMRzFDUVVGclFpeEZRVUZGTEZWQlFWVTdSVUZCYTBJc1kwRkJZU3hGUVVGRkxGVkJRVlU3UTBGQldTeERRVUZETEVkQlFVVXNTVUZCUlN4SFFVRkZMRGhDUVVFd1FpeEhRVUZITEVWQlFVVXNUVUZCVFN4WlFVRlpMRTlCUVU4c1IwRkJSeXhMUVVGSkxFbEJRVVVzUTBGQlF5eEhRVUZGTEVsQlFVVXNSVUZCUlN4VlFVRlZMRTlCUVUwc1NVRkJSU3hEUVVGRExFZEJRVVU3UTBGQlJTeEpRVUZITzBWQlFVTXNTVUZCUnp0SFFVRkRMRTFCUVUwc2JVSkJRVzFDTEVOQlFVTXNSMEZCUlN4SlFVRkZMRU5CUVVNN1JVRkJReXhUUVVGUExFZEJRVVU3UjBGQlF5eEpRVUZITEc5Q1FVRnZRaXhEUVVGRExFZEJRVVU3UjBGQlR5eE5RVUZOTzBWQlFVTTdSVUZCUXl4TFFVRkpMRVZCUVVVc2IwSkJRVzlDTEhkQ1FVRnpRaXhEUVVGRExFdEJRVWNzTmtKQlFUWkNMRU5CUVVNc1RVRkJTU3hKUVVGRkxFMUJRVTBzT0VKQlFUaENPMGRCUVVNc1kwRkJZU3hGUVVGRk8wZEJRV2RDTEdkQ1FVRmxMR0ZCUVdFc1JVRkJSU3hWUVVGVkxHRkJRV0VzWVVGQllUdEZRVUZETEVOQlFVTXNUVUZCU3p0SFFVRkRMRWxCUVVrc1NVRkJSU3hOUVVGTkxGTkJRVk1zUlVGQlJTeG5Ra0ZCWjBJc1IwRkJSU3hIUVVGSExFMUJRVTBzUTBGQlF5eEhRVUZGTEVsQlFVVXNSVUZCUlN4WFFVRlRMSFZEUVVGeFF5eEZRVUZGTEZkQlFWTXNVMEZCVHl4RlFVRkZMREpDUVVGNVFpeExRVUZMTzBkQlFVVXNTVUZCUnl4RlFVRkZMRmRCUVZNc1pVRkJZU3hIUVVGSExFOUJRVThzV1VGQlZTeERRVUZETEV0QlFVY3NUVUZCU1N4TFFVRkxMRWRCUVVVN1NVRkJReXhOUVVGTkxHOUNRVUZ2UWp0TFFVRkRMRzlDUVVGdFFqdExRVUZGTEdOQlFXRTdTMEZCUlN4UlFVRlBPMGxCUVVNc1EwRkJRenRKUVVGRk8wZEJRVTA3UjBGQlF5eEpRVUZITEVWQlFVVXNiMEpCUVd0Q0xFdEJRVXNzUzBGQlJ5eE5RVUZOTEdsQ1FVRnBRaXhGUVVGRkxHbENRVUZuUWl4RFFVRkRMRTFCUVVrc1ZVRkJVenRKUVVGRExFMUJRVTBzYjBKQlFXOUNPMHRCUVVNc2IwSkJRVzFDTzB0QlFVVXNZMEZCWVR0TFFVRkZMRkZCUVU4N1NVRkJReXhEUVVGRE8wbEJRVVU3UjBGQlRUdEhRVUZETEVsQlFVY3NSVUZCUlN4WFFVRlRMRkZCUVU4N1NVRkJReXhOUVVGTkxFZEJRVWNzVVVGQlVTeEhRVUZGTEUxQlFVMHNSVUZCUlN4UFFVRlBMRWRCUVVVN1MwRkJReXhOUVVGTE8wdEJRVThzVVVGQlR5eEZRVUZGTEZWQlFWRTdTMEZCUnl4VFFVRlJMRVZCUVVVN1MwRkJVU3hQUVVGTkxFVkJRVVU3UzBGQlRTeFpRVUZYTEVWQlFVVTdTVUZCVlN4SFFVRkZMRU5CUVVNN1NVRkJSVHRIUVVGTk8wZEJRVU1zU1VGQlJ5eE5RVUZKTEV0QlFVc3NSMEZCUlR0SlFVRkRMRTFCUVUwc1JVRkJSU3hOUVVGTkxFTkJRVU03U1VGQlJTeEpRVUZKTEVsQlFVVXNUMEZCVFN4RlFVRkZMRmRCUVZNc2MwTkJRVzlETEhGRFFVRnRReXd5UWtGQlFTeERRVUUwUWp0TFFVRkRMR2xDUVVGblFpd3JRa0ZCSzBJc2IwSkJRVzlDTEVOQlFVTXNRMEZCUXl4SFFVRkhPMHRCUVVVc2VVSkJRWGRDTEVWQlFVVTdTMEZCVFN4blFrRkJaU3hGUVVGRk8wdEJRV1VzYlVKQlFXdENMRVZCUVVVN1MwRkJhMElzWTBGQllTeEZRVUZGTzBsQlFWa3NRMEZCUXp0SlFVRkZMRTFCUVUwc1JVRkJSU3hOUVVGTkxFTkJRVU03U1VGQlJTeEpRVUZKTEVsQlFVVXNUVUZCVFN3MFFrRkJORUk3UzBGQlF5eHZRa0ZCYlVJN1MwRkJSU3hqUVVGaE8wdEJRVVVzVVVGQlR6dExRVUZGTEZsQlFWY3NSVUZCUlR0TFFVRk5MR2RDUVVGbExFVkJRVVU3UzBGQlVTeFZRVUZUTzB0QlFVVTdTMEZCYzBJc2JVSkJRV3RDTzBsQlFVTXNRMEZCUXp0SlFVRkZMRWxCUVVjc1RVRkJTU3hoUVVGWk8wdEJRVU1zU1VGQlJTeExRVUZMTzB0QlFVVTdTVUZCVVR0SlFVRkRMRWxCUVVjc1RVRkJTU3hsUVVGak8wdEJRVU1zVFVGQlRTeHZRa0ZCYjBJN1RVRkJReXh2UWtGQmJVSTdUVUZCUlN4alFVRmhPMDFCUVVVc1VVRkJUenRMUVVGRExFTkJRVU03UzBGQlJUdEpRVUZOTzBsQlFVTXNTVUZCUlR0TFFVRkRMRTFCUVVzN1MwRkJkMElzVTBGQlVUdEpRVUZETzBsQlFVVTdSMEZCVVR0SFFVRkRMRWxCUVVjc1JVRkJSU3hYUVVGVExGRkJRVTg3U1VGQlF5eEpRVUZITEVWQlFVVXNSVUZCUlN3eVFrRkJlVUlzUlVGQlJTeDNRa0ZCYzBJc1JVRkJSU3hqUVVGakxHbENRVUZsTEVOQlFVTXNTMEZCUnl4RlFVRkZMRk5CUVU4c2FVSkJRV2RDTEUxQlFVMHNUVUZCVFN3MFFrRkJORUk3U1VGQlJTeE5RVUZOTEVkQlFVY3NVVUZCVVN4SFFVRkZMRTFCUVUwc1JVRkJSU3hQUVVGUExFZEJRVVU3UzBGQlF5eHZRa0ZCYlVJc1JVRkJSVHRMUVVGdFFpeE5RVUZMTzB0QlFVOHNVMEZCVVN4RlFVRkZPMGxCUVU4c1IwRkJSU3hEUVVGRE8wbEJRVVU3UjBGQlRUdEhRVUZETEUxQlFVMHNSVUZCUlN4TlFVRk5MRU5CUVVNc1IwRkJSU3hKUVVGRkxFdEJRVXM3UlVGQlF6dERRVUZETEZOQlFVOHNSMEZCUlR0RlFVRkRMRTFCUVUwc1RVRkJUU3hGUVVGRkxFdEJRVXM3UjBGQlF5eFBRVUZOTERKQ1FVRXlRaXhEUVVGRE8wZEJRVVVzVFVGQlN6dEZRVUZaTEVOQlFVTXNSMEZCUlR0RFFVRkRMRlZCUVZFN1JVRkJReXhOUVVGSkxFdEJRVXNzUzBGQlJ5eE5RVUZOTEVWQlFVVXNVVUZCVVN4SFFVRkZMRXRCUVVjc1RVRkJUU3haUVVGWkxFTkJRVU03UTBGQlF6dEJRVUZETzBGQlFVTXNaVUZCWlN4dlFrRkJiMElzUjBGQlJUdERRVUZETEUxQlFVMHNNRUpCUVRCQ08wVkJRVU1zYlVKQlFXdENMRVZCUVVVc1QwRkJUenRGUVVGclFpeGpRVUZoTEVWQlFVVXNUMEZCVHp0RFFVRlpMRU5CUVVNc1IwRkJSU3hOUVVGTkxFVkJRVVVzWTBGQll5eFJRVUZSTEVkQlFVVXNUVUZCVFN4RlFVRkZMRTlCUVU4c1QwRkJUeXhGUVVGRExHTkJRV0VzUlVGQlJTeFBRVUZQTEdGQlFWa3NSMEZCUlR0RlFVRkRMRmRCUVZVc1EwRkJRenRGUVVGRkxFMUJRVXM3UTBGQlRTeEhRVUZGTEVWQlFVVXNhMEpCUVd0Q08wRkJRVU03UVVGQlF5eGxRVUZsTEdsQ1FVRnBRaXhIUVVGRkxFZEJRVVU3UTBGQlF5eEpRVUZITEVkQlFVY3NUMEZCVHl4WlFVRlZMRU5CUVVNc1IwRkJSU3hQUVVGTk8wTkJRVk1zU1VGQlNTeEpRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1YwRkJVeXhQUVVGUE8wTkJRVVVzVDBGQlR5eE5RVUZKTEV0QlFVc3NTVUZCUlN4SlFVRkZMRkZCUVZFc1MwRkJTeXhEUVVGRExFZEJRVVVzUlVGQlJTeFRRVUZUTEVOQlFVTTdRVUZCUXp0QlFVRkRMR1ZCUVdVc05FSkJRVFJDTEVkQlFVVTdRMEZCUXl4SlFVRkpMRWRCUVVVc1NVRkJSU3hEUVVGRExFZEJRVWNzUlVGQlJTeGpRVUZqTzBOQlFVVXNVMEZCVHp0RlFVRkRMRWxCUVVrc1NVRkJSU3h0UTBGQmJVTTdSMEZCUXl4aFFVRlpMRVZCUVVVN1IwRkJhMElzVTBGQlVUdEZRVUZETEVOQlFVTTdSVUZCUlN4SlFVRkhMRTFCUVVrc1MwRkJTeXhIUVVGRkxFOUJRVThzVFVGQlNTeExRVUZMTEV0QlFVY3NUVUZCVFN4RlFVRkZMRTlCUVU4c1MwRkJTenRIUVVGRExFMUJRVXM3UjBGQk1FSXNWMEZCVlR0RlFVRkRMRU5CUVVNc1IwRkJSVHRGUVVGRkxFVkJRVVVzVDBGQlR5eGhRVUZoTEhsQ1FVRjFRaXhOUVVGSkxFdEJRVXNzVFVGQlNTeEpRVUZGTEVWQlFVVXNjMEpCUVhOQ0xFZEJRVVVzVFVGQlRTeEZRVUZGTEU5QlFVOHNTMEZCU3p0SFFVRkRMRzFDUVVGclFpeEZRVUZGTEU5QlFVOHNZVUZCWVR0SFFVRnJRaXhaUVVGWExFVkJRVVU3UjBGQlZ5eE5RVUZMTzBkQlFYZENMRmRCUVZVN1JVRkJReXhEUVVGRE8wVkJRVWNzU1VGQlNTeEpRVUZGTEVWQlFVVXNVMEZCVXl4TFFVRkxPMFZCUVVVc1JVRkJSU3haUVVGVkxFTkJRVU1zUTBGQlF6dEZRVUZGTEVsQlFVa3NTVUZCUlN4UFFVRk5MRVZCUVVVc2FVSkJRV1VzUzBGQlN5eEpRVUZGTEVsQlFVVXNVVUZCVVN4TFFVRkxMRU5CUVVNc1IwRkJSU3hGUVVGRkxHRkJRV0VzVTBGQlV5eERRVUZETzBWQlFVY3NTVUZCUnl4TlFVRkpMRlZCUVZNc1QwRkJUeXhOUVVGSkxFdEJRVXNzUzBGQlJ5eE5RVUZOTEVWQlFVVXNUMEZCVHl4TFFVRkxPMGRCUVVNc1RVRkJTenRIUVVFd1FpeFhRVUZWTzBWQlFVTXNRMEZCUXl4SFFVRkZPMFZCUVZrc1NVRkJSeXhGUVVGRkxFMUJRVXNzVFVGQlRTeE5RVUZOTEhGRVFVRnhSRHRGUVVGRkxFbEJRVWtzU1VGQlJTeEZRVUZGTzBWQlFVMHNTVUZCUnl4RlFVRkZMRk5CUVU4c2VVSkJRWGRDTzBkQlFVTXNTVUZCU1N4SlFVRkZMRVZCUVVVc1QwRkJUeXhoUVVGaExGVkJRVlVzVVVGQlVUdEhRVUZOTEVWQlFVVXNTMEZCU3l4SFFVRkhMRVZCUVVVc1VVRkJVU3hSUVVGUExFMUJRVWNzZFVOQlFYVkRMRWRCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03UjBGQlJUdEZRVUZSTzBWQlFVTXNTVUZCUnl4RlFVRkZMRk5CUVU4c05FSkJRVEJDTEVWQlFVVXNVMEZCVHl4blEwRkJLMEk3UjBGQlF5eEpRVUZKTEVsQlFVVXNUVUZCVFN3d1FrRkJNRUk3U1VGQlF5eGhRVUZaTzBsQlFVVXNaMEpCUVdVc1JVRkJSU3hQUVVGUE8wbEJRV1VzYlVKQlFXdENMRVZCUVVVc1QwRkJUenRKUVVGclFpeGpRVUZoTEVWQlFVVXNUMEZCVHp0SFFVRlpMRU5CUVVNN1IwRkJSU3hOUVVGTkxFVkJRVVVzVDBGQlR5eE5RVUZOTEVOQlFVTTdSMEZCUlR0RlFVRlJPMFZCUVVNc1NVRkJSeXhGUVVGRkxGTkJRVThzY1VKQlFXMUNMRVZCUVVVc1kwRkJXU3hIUVVGRk8wZEJRVU1zVFVGQlRTeEZRVUZGTEU5QlFVOHNTMEZCU3p0SlFVRkRMRTFCUVVzN1NVRkJlVUlzVjBGQlZTeEZRVUZGTzBkQlFWTXNRMEZCUXl4SFFVRkZMRWxCUVVVc1MwRkJTenRIUVVGRkxFbEJRVWtzU1VGQlJTeE5RVUZOTEhWQ1FVRjFRanRKUVVGRExFMUJRVXNzUlVGQlJTeFRRVUZUTzBsQlFVc3NaMEpCUVdVc1JVRkJSU3hQUVVGUE8wbEJRV1VzVlVGQlV5eEZRVUZGTEZOQlFWTTdTVUZCVXl4alFVRmhMRVZCUVVVc1QwRkJUenRIUVVGWkxFTkJRVU03UjBGQlJTeEpRVUZITEVWQlFVVXNVMEZCVHl4bFFVRmpMRTlCUVU4c1JVRkJSVHRIUVVGTExFVkJRVVVzWTBGQldTeExRVUZMTEV0QlFVY3NSVUZCUlN4dFFrRkJiVUlzUzBGQlN6dEpRVUZETEVkQlFVY3NSVUZCUlR0SlFVRlRMRlZCUVZNc1EwRkJReXhGUVVGRkxGTkJRVk03UjBGQlF5eERRVUZETzBWQlFVTTdRMEZCUXp0QlFVRkRPMEZCUVVNc1pVRkJaU3h6UWtGQmMwSXNSMEZCUlR0RFFVRkRMRWxCUVVrc1NVRkJSU3hGUVVGRk8wTkJRVlVzU1VGQlJ6dEZRVUZETEZOQlFVODdSMEZCUXl4SlFVRkpMRWxCUVVVc1RVRkJUU3hUUVVGVExFTkJRVU03UjBGQlJTeEpRVUZITEVWQlFVVXNWMEZCVXl4bFFVRmhMRVZCUVVVc2IwSkJRV3RDTEV0QlFVc3NTMEZCUnl4TlFVRk5MRTFCUVUwc1JVRkJSU3hsUVVGbExFZEJRVVVzUlVGQlJTeFhRVUZUTEZGQlFVODdTVUZCUXl4TlFVRk5MRzlDUVVGdlFqdExRVUZETEdOQlFXRXNSVUZCUlR0TFFVRm5RaXhUUVVGUk8wMUJRVU1zVVVGQlR6dFBRVUZETEUxQlFVczdUMEZCVHl4UlFVRlBMRVZCUVVVc1ZVRkJVVHRQUVVGSExGTkJRVkVzUlVGQlJUdFBRVUZSTEcxQ1FVRnJRaXhGUVVGRk8wOUJRV3RDTEdOQlFXRXNSVUZCUlR0UFFVRmhMRTlCUVUwc1JVRkJSVHRQUVVGTkxGbEJRVmNzUlVGQlJUdE5RVUZWTzAxQlFVVXNUVUZCU3p0TFFVRmhPMGxCUVVNc1EwRkJRenRKUVVGRk8wZEJRVTA3UjBGQlF5eEpRVUZITEVWQlFVVXNWMEZCVXl4eFEwRkJiME03U1VGQlF5eE5RVUZOTEc5Q1FVRnZRanRMUVVGRExHTkJRV0VzUlVGQlJUdExRVUZuUWl4VFFVRlJPMDFCUVVNc1VVRkJUenRQUVVGRExFMUJRVXM3VDBGQmIwTXNiVUpCUVd0Q0xFVkJRVVU3VDBGQmVVSXNiVUpCUVd0Q0xFVkJRVVU3VDBGQmEwSXNZMEZCWVN4RlFVRkZPMDFCUVZrN1RVRkJSU3hOUVVGTE8wdEJRV0U3U1VGQlF5eERRVUZETzBsQlFVVTdSMEZCVFR0SFFVRkRMRWxCUVVjc1JVRkJSU3hYUVVGVExGRkJRVTg3U1VGQlF5eEpRVUZKTEVsQlFVVXNSVUZCUlR0SlFVRjVRaXhKUVVGSExFVkJRVVVzVFVGQlNTeExRVUZMTEV0QlFVY3NSVUZCUlN3eVFrRkJlVUlzUlVGQlJTeDNRa0ZCYzBJc1JVRkJSU3hqUVVGakxHbENRVUZsTEVOQlFVTXNTMEZCUnl4RlFVRkZMRk5CUVU4c2FVSkJRV2RDTEUxQlFVMHNUVUZCVFN3MFFrRkJORUk3U1VGQlJTeEpRVUZKTEVsQlFVVXNUVUZCU1N4TFFVRkxMRWxCUVVVN1MwRkJReXhOUVVGTE8wdEJRVThzYlVKQlFXdENMRVZCUVVVN1MwRkJhMElzWTBGQllTeEZRVUZGTzB0QlFXRXNiMEpCUVcxQ0xFVkJRVVU3UzBGQmJVSXNVMEZCVVN4RlFVRkZPMGxCUVU4c1NVRkJSVHRMUVVGRExFMUJRVXM3UzBGQk1rSXNiVUpCUVd0Q08wdEJRVVVzYlVKQlFXdENMRVZCUVVVN1MwRkJhMElzWTBGQllTeEZRVUZGTzBsQlFWazdTVUZCUlN4TlFVRk5MRzlDUVVGdlFqdExRVUZETEdOQlFXRXNSVUZCUlR0TFFVRm5RaXhUUVVGUk8wMUJRVU1zVVVGQlR6dE5RVUZGTEUxQlFVczdTMEZCWVR0SlFVRkRMRU5CUVVNN1NVRkJSVHRIUVVGTk8wZEJRVU1zU1VGQlJUdEpRVUZETEU5QlFVMHNTMEZCU3p0SlFVRkZMR2RDUVVGbExFVkJRVVU3U1VGQlpTeHRRa0ZCYTBJc1JVRkJSVHRKUVVGclFpeGpRVUZoTEVWQlFVVTdSMEZCV1R0RlFVRkRPME5CUVVNc1UwRkJUeXhIUVVGRk8wVkJRVU1zVFVGQlRTeE5RVUZOTEc5Q1FVRnZRanRIUVVGRExHTkJRV0VzUlVGQlJUdEhRVUZuUWl4VFFVRlJPMGxCUVVNc1QwRkJUU3d5UWtGQk1rSXNRMEZCUXp0SlFVRkZMRTFCUVVzN1IwRkJXVHRGUVVGRExFTkJRVU1zUjBGQlJUdERRVUZETzBGQlFVTTdRVUZEZURSUUxHRkJRV0VzWVVGQllUdEJRVU14UWl4WFFVRlhMRzlDUVVGdlFpeEpRVUZKTEN0Q1FVRXJRaXhaUVVGWk96czdRVU5JT1VVc1RVRkJUU3d3UWtGQmQwSXNUMEZCVHl4SlFVRkpMREJDUVVFd1FqdEJRVUZGTEUxQlFVRXNOa0pCUVRKQ08wRkJRVmNzTWtKQlFUSkNMRFpDUVVFeVFpeExRVUZMTEUxQlFVa3NNa0pCUVRKQ0xESkNRVUY1UWl4SlFVRkpMRWxCUVVVN1FVRkJSeXhOUVVGTkxHTkJRVmtzTWtKQlFUSkNPMEZCUVhsQ0xFbEJRVWtzWVVGQlZ5eE5RVUZMTzBOQlFVTTdRMEZCU3p0RFFVRk5MRmxCUVZrc1IwRkJSU3hKUVVGRkxFTkJRVU1zUjBGQlJUdEZRVUZETEV0QlFVc3NUMEZCU3l4SFFVRkZMRXRCUVVzc1VVRkJUU3hGUVVGRk8wVkJRVTBzU1VGQlNTeEpRVUZGTEZsQlFWa3NTVUZCU1N4RFFVRkRPMFZCUVVVc1NVRkJSeXhOUVVGSkxFdEJRVXNzUzBGQlJ5eEZRVUZGTEZWQlFWRXNTMEZCU3l4TlFVRkpMRXRCUVVzc1ZVRkJVU3hMUVVGTExFbEJRVWNzVFVGQlRTeE5RVUZOTEN0Q1FVRXJRaXhGUVVGRkxEQkNRVUV3UWl4RlFVRkZMRkZCUVUwc1UwRkJUeXhWUVVGVkxITkNRVUZ6UWl4TFFVRkxMRkZCUVUwc1UwRkJUeXhWUVVGVkxHOUlRVUZ2U0R0RlFVRkZMRmxCUVZrc1NVRkJTU3hIUVVGRkxFbEJRVWs3UTBGQlF6dEJRVUZETzBGRFFURnlRaXhKUVVGSkxGZEJRVmNzVlVGQlZUdEJRVUZ0UWl4SlFVRkpMRmRCUVZjc2JVSkJRVzFDTzBGQlFXVXNTVUZCU1N4WFFVRlhMR1ZCUVdVN1FVRkJkVUlzU1VGQlNTeFhRVUZYTEhWQ1FVRjFR",
	"anRCUVVGRkxFMUJRVUVzYzBKQlFXOUNMRWxCUVVrc1YwRkJWeXh6UWtGQmMwSTdRVUZCTkVJc1NVRkJTU3hYUVVGWExEUkNRVUUwUWp0QlFVRlZMRWxCUVVrc1YwRkJWeXhWUVVGVk8wRkJRVzFDTEVsQlFVa3NWMEZCVnl4dFFrRkJiVUk3UVVGQmQwSXNTVUZCU1N4WFFVRlhMSGRDUVVGM1FqdEJRVUZGTEUxQlFVRXNiVUpCUVdsQ0xFbEJRVWtzVjBGQlZ5eHRRa0ZCYlVJN1FVRkJhMElzU1VGQlNTeFhRVUZYTEd0Q1FVRnJRanRCUVVGeFFpeEpRVUZKTEZkQlFWY3NjVUpCUVhGQ08wRkJRV0VzU1VGQlNTeFhRVUZYTEdGQlFXRTdRVUZCWVN4SlFVRkpMRmRCUVZjc1lVRkJZVHRCUVVGclF5eEpRVUZKTEZkQlFWY3NhME5CUVd0RE8wRkJRU3RDTEVsQlFVa3NWMEZCVnl3clFrRkJLMEk3UVVGQmJVTXNTVUZCU1N4WFFVRlhMRzFEUVVGdFF6dEJRVUZuUXl4SlFVRkpMRmRCUVZjc1owTkJRV2RETzBGQlFYVkRMRWxCUVVrc1YwRkJWeXgxUTBGQmRVTTdRVUZCTmtJc1NVRkJTU3hYUVVGWExEWkNRVUUyUWp0QlFVRnRRaXhKUVVGSkxGZEJRVmNzYlVKQlFXMUNPMEZCUVhORExFbEJRVWtzVjBGQlZ5eHpRMEZCYzBNN1FVRkJiVU1zU1VGQlNTeFhRVUZYTEcxRFFVRnRRenRCUVVFeVF5eEpRVUZKTEZkQlFWY3NNa05CUVRKRE8wRkJRV2RETEVsQlFVa3NWMEZCVnl4blEwRkJaME03UVVGQk1FSXNTVUZCU1N4WFFVRlhMREJDUVVFd1FqdEJRVUZuUXl4SlFVRkpMRmRCUVZjc1owTkJRV2RETzBGQlFUWkNMRWxCUVVrc1YwRkJWeXcyUWtGQk5rSTdPenRCUTBGd2NrUXNVMEZCVXl3MFFrRkJORUlzUjBGQlJUdERRVUZETEVsQlFVa3NTVUZCUlN4dFFrRkJiVUlzUlVGQlJTeHBRa0ZCYVVJc1MwRkJTenREUVVGRkxFOUJRVThzVFVGQlNTeEpRVUZGTEV0QlFVc3NTVUZCUlR0QlFVRkRPMEZCUVhkUkxGTkJRVk1zYlVKQlFXMUNMRWRCUVVVN1EwRkJReXhQUVVGUExFOUJRVThzUzBGQlJ5eFpRVUZWTEU5QlFVOHNWVUZCVlN4RFFVRkRMRXRCUVVjc1NVRkJSU3hKUVVGRkxFbEJRVVU3UVVGQlF6czdPMEZEUVd4dVFpeFRRVUZUTEZOQlFWTXNSMEZCUlR0RFFVRkRMRTlCUVU4c1QwRkJUeXhMUVVGSExGbEJRVlVzUTBGQlF5eERRVUZETEV0QlFVY3NRMEZCUXl4TlFVRk5MRkZCUVZFc1EwRkJRenRCUVVGRE8wRkJRVU1zVTBGQlV5eHBRa0ZCYVVJc1IwRkJSVHREUVVGRExFOUJRVThzVDBGQlR5eExRVUZITEZsQlFWVXNSVUZCUlN4VFFVRlBPMEZCUVVNN096dEJRMEZ6UkN4VFFVRlRMR3RDUVVGclFpeEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMRVZCUVVVc2MwSkJRWEZDTEVsQlFVVXNSMEZCUnl4UlFVRlBMRWxCUVVVc1IwRkJSeXhsUVVGakxFbEJRVVVzUjBGQlJ5eFhRVUZWTEVsQlFVVXNSMEZCUnl4TlFVRk5PME5CUVVjc1QwRkJUVHRGUVVGRExGRkJRVThzYVVKQlFXbENMRU5CUVVNc1NVRkJSU3hKUVVGRkxFdEJRVXM3UlVGQlJTeGxRVUZqTEdsQ1FVRnBRaXhEUVVGRExFbEJRVVVzU1VGQlJTeExRVUZMTzBWQlFVVXNWMEZCVlN4cFFrRkJhVUlzUTBGQlF5eEpRVUZGTEVsQlFVVXNTMEZCU3p0RlFVRkZMRkZCUVU4c2FVSkJRV2xDTEVOQlFVTXNTVUZCUlN4SlFVRkZMRXRCUVVzN1EwRkJRenRCUVVGRE8wRkJRWFZGTEZOQlFWTXNhMEpCUVd0Q0xFZEJRVVU3UTBGQlF5eFBRVUZQTEd0Q1FVRnJRaXhEUVVGRExFTkJRVU1zUTBGQlF6dEJRVUZoTzBGQlFVTXNVMEZCVXl4eFFrRkJjVUlzUjBGQlJUdERRVUZETEVsQlFVa3NTVUZCUlN4RlFVRkZMRzlDUVVGdlFqdERRVUZOTEU5QlFVOHNhVUpCUVdsQ0xFTkJRVU1zU1VGQlJTeEpRVUZGTEV0QlFVczdRVUZCUXpzN08wRkRRelZ6UWl4SlFVRlhMRFJDUVVFMFFpeFhRVUZYTEU5QlFVOHNTVUZCU1N4dFFrRkJiVUlzUlVGQlJTeERRVUZETERaRFFVRTJRenRCUVVOb1NTeEpRVUZYTEhWQ1FVRjFRaXhYUVVGWExFOUJRVThzU1VGQlNTeHRRa0ZCYlVJc1JVRkJSU3hEUVVGRExIZERRVUYzUXp0QlFVTjBTQ3hKUVVGWExDdENRVUVyUWl4WFFVRlhMRTlCUVU4c1NVRkJTU3h0UWtGQmJVSXNSVUZCUlN4RFFVRkRMR2RFUVVGblJEczdPMEZEU0RsR0xGTkJRVk1zWlVGQlpTeEhRVUZGTzBOQlFVTXNUMEZCVHl4aFFVRmhMRkZCUVUwc1JVRkJSU3hWUVVGUkxFOUJRVThzUzBGQlJ5eFhRVUZUTEVsQlFVVXNTMEZCUnl4UFFVRkxMRTlCUVU4c1EwRkJReXhKUVVGRkxGTkJRVk1zUTBGQlF5eEpRVUZGTEU5QlFVOHNSVUZCUlN4WFFVRlRMRmxCUVZVc1JVRkJSU3hSUVVGUkxGTkJRVThzU1VGQlJTeEZRVUZGTEZWQlFWRXNhMEpCUVd0Q0xFTkJRVU1zU1VGQlJTeFBRVUZQTEVOQlFVTTdRVUZCUXp0QlFVRjFXU3hUUVVGVExHdENRVUZyUWl4SFFVRkZPME5CUVVNc1NVRkJSenRGUVVGRExFOUJRVThzUzBGQlN5eFZRVUZWTEVOQlFVTXNTMEZCUnl4UFFVRlBMRU5CUVVNN1EwRkJReXhSUVVGTk8wVkJRVU1zVDBGQlR5eFBRVUZQTEVOQlFVTTdRMEZCUXp0QlFVRkRPenM3UVVOQmJtdENMRTFCUVVFc05FSkJRVEJDT3pzN1FVTkJOVXNzVFVGQlRTeDNRa0ZCYzBJN096dEJRMEZwU3l4TlFVRk5MRzFDUVVGcFFqdERRVUZETEdsQ1FVRm5RanREUVVGRkxHdENRVUZwUWp0RFFVRkZMR0ZCUVZrN1EwRkJSU3hqUVVGaE8wRkJRVU03UVVGQlJTeFRRVUZUTEhGRFFVRnhReXhIUVVGRkxFZEJRVVU3UTBGQlF5eEpRVUZKTEVsQlFVVXNSVUZCUlR0RFFVRmxMRWxCUVVjc1IwRkJSeXhUUVVGUExIVkNRVUZ6UWl4UFFVRk5PMFZCUVVNc1VVRkJUeXhQUVVGUExFVkJRVVVzVDBGQlR5eFZRVUZSTEVWQlFVVTdSVUZCUlN4TlFVRkxPMFZCUVd0Q0xGRkJRVTg3UlVGQlVTeFRRVUZSTzBkQlFVTXNUVUZCU3p0SFFVRlhMRkZCUVU4N1NVRkJReXhOUVVGTE8wbEJRVmtzVVVGQlR6dEhRVUZETzBkQlFVVXNXVUZCVnp0RlFVRm5RanRGUVVGRkxGRkJRVTg3UlVGQlJTeGpRVUZoTEU5QlFVOHNSVUZCUlN4UFFVRlBMR2RDUVVGakxFVkJRVVU3UTBGQlF6dEJRVUZETzBGQlFVTXNVMEZCVXl4dFEwRkJiVU1zUjBGQlJTeEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMSEZEUVVGeFF5eEhRVUZGTEVWQlFVVTdRMEZCUlN4SlFVRkhMRTFCUVVrc1MwRkJTeXhIUVVGRk8wTkJRVThzU1VGQlNTeEpRVUZGTzBWQlFVTXNUVUZCU3p0RlFVRXdRaXhUUVVGUkxHVkJRV1VzUTBGQlF6dERRVUZETzBOQlFVVXNUMEZCVFR0RlFVRkRMRWRCUVVjN1JVRkJSU3hUUVVGUkxFTkJRVU03UlVGQlJTeFRRVUZSTzBkQlFVTXNUVUZCU3p0SFFVRlhMRkZCUVU4N1NVRkJReXhQUVVGTk8wbEJRVVVzVFVGQlN6dEhRVUZSTzBkQlFVVXNXVUZCVnp0RlFVRm5RanRGUVVGRkxGRkJRVTg3UTBGQlF6dEJRVUZET3pzN1FVTkJlSGhDTEdWQlFXVXNhVUpCUVdsQ0xFZEJRVVU3UTBGQlF5eFRRVUZQTzBWQlFVTXNTVUZCU1N4SlFVRkZMRTFCUVUwc2VVSkJRWGxDTzBkQlFVTXNiMEpCUVcxQ0xFVkJRVVU3UjBGQmJVSXNlVUpCUVhkQ0xFVkJRVVU3UjBGQmQwSXNZMEZCWVN4RlFVRkZPMFZCUVZrc1EwRkJRenRGUVVGRkxFbEJRVWNzUlVGQlJTeFRRVUZQTEZsQlFWY3NUMEZCVFN4RlFVRkRMRTFCUVVzc1JVRkJSU3hMUVVGSk8wVkJRVVVzU1VGQlNTeEpRVUZGTEVWQlFVVTdSVUZCVXl4SlFVRkhMRTFCUVVrc1RVRkJTeXhQUVVGTkxFVkJRVU1zVFVGQlN5eFRRVUZSTzBWQlFVVXNTVUZCU1N4SlFVRkZMRTFCUVUwc2RVSkJRWFZDTzBkQlFVTXNUVUZCU3l4RlFVRkZPMGRCUVVzc1owSkJRV1VzUlVGQlJUdEhRVUZsTEZWQlFWTXNSVUZCUlR0SFFVRlRMR05CUVdFc1JVRkJSVHRGUVVGWkxFTkJRVU03UlVGQlJTeEpRVUZITEVWQlFVVXNVMEZCVHl4bFFVRmpMRTlCUVUwc1JVRkJReXhOUVVGTExHTkJRV0U3UlVGQlJTeEpRVUZITEVWQlFVVXNZMEZCV1N4TFFVRkxMRWRCUVVVc1QwRkJUVHRIUVVGRExGTkJRVkU3UjBGQlJTeE5RVUZMTzBkQlFVOHNWMEZCVlN4RlFVRkZPMFZCUVZNN1EwRkJRenRCUVVGRE8wRkJRVU1zWlVGQlpTeDVRa0ZCZVVJc1IwRkJSVHREUVVGRExFbEJRVWtzU1VGQlJTeEZRVUZGTEhkQ1FVRjNRaXhOUVVGTk8wTkJRVVVzU1VGQlJ5eE5RVUZKTEV0QlFVc3NSMEZCUlN4UFFVRk5MRVZCUVVNc1RVRkJTeXhGUVVGRE8wTkJRVVVzU1VGQlJ5eEZRVUZGTEcxQ1FVRnRRaXhUUVVGUExFZEJRVVVzVDBGQlRUdEZRVUZETEZWQlFWTXNlVUpCUVhsQ0xFVkJRVVVzYTBKQlFXdENPMFZCUVVVc1RVRkJTenREUVVGVk8wTkJRVVVzVTBGQlR6dEZRVUZETEVsQlFVa3NTVUZCUlN4TlFVRk5MRVZCUVVVc1lVRkJZU3hMUVVGTE8wVkJRVVVzU1VGQlJ5eEZRVUZGTEdGQlFXRXNXVUZCV1N4SFFVRkZMRVZCUVVVc1RVRkJTeXhQUVVGTk8wZEJRVU1zVlVGQlV6dEhRVUZMTEUxQlFVczdSVUZCVlR0RlFVRkZMRWxCUVVjc1JVRkJSU3hOUVVGTkxGTkJRVThzYlVKQlFXdENMRTlCUVUwc1JVRkJReXhOUVVGTExGVkJRVk03UlVGQlJTeEpRVUZITEVWQlFVVXNUVUZCVFN4VFFVRlBMRmRCUVZNc1JVRkJSU3hOUVVGTkxGTkJRVThzWVVGQlZ5eEZRVUZGTEUxQlFVMHNVMEZCVHl4VFFVRlJMRTlCUVUwc1JVRkJReXhOUVVGTExFVkJRVVVzVFVGQlRTeExRVUZKTzBWQlFVVXNTVUZCUnl4RlFVRkZMRTFCUVUwc1UwRkJUeXhWUVVGVExFOUJRVTA3UjBGQlF5eFZRVUZUUVN4dlFrRkJhMElzUlVGQlJTeExRVUZMTzBkQlFVVXNUVUZCU3p0RlFVRlZPME5CUVVNN1FVRkJRenRCUVVGRExGTkJRVk5CTEc5Q1FVRnJRaXhIUVVGRk8wTkJRVU1zVDBGQlRUdEZRVUZETEUxQlFVc3NSVUZCUlR0RlFVRkxMRkZCUVU4c1JVRkJSVHRGUVVGUExFMUJRVXM3UlVGQlZTeFZRVUZUTEVOQlFVTXNSVUZCUlN4UFFVRlBPMFZCUVVVc1YwRkJWU3hGUVVGRk8wTkJRVk03UVVGQlF6dEJRVUZETEZOQlFWTXNlVUpCUVhsQ0xFZEJRVVU3UTBGQlF5eEpRVUZKTEVsQlFVVXNSVUZCUlN4TlFVRk5PME5CUVVVc1NVRkJSeXhOUVVGSkxFdEJRVXNzUjBGQlJTeE5RVUZOTEUxQlFVMHNiVVJCUVcxRU8wTkJRVVVzU1VGQlNTeEpRVUZGTEVOQlFVTXNRMEZCUXl4SFFVRkZMRWxCUVVVc1JVRkJSVHREUVVGUExFOUJRVXNzUlVGQlJTeFRRVUZQTEVsQlFVYzdSVUZCUXl4SlFVRkpMRWxCUVVVc1JVRkJSVHRGUVVGSExFbEJRVWNzVFVGQlNTeExRVUZMTEV0QlFVY3NUVUZCU1N4TFFVRkxMRXRCUVVjc1JVRkJSU3hYUVVGVExFdEJRVXNzUjBGQlJUdEZRVUZOTEVsQlFVa3NTVUZCUlN4RlFVRkZMRTFCUVUwN1JVRkJSU3hKUVVGSExFMUJRVWtzUzBGQlN5eEhRVUZGTEUxQlFVMHNUVUZCVFN4M1JFRkJkMFE3UlVGQlJTeEZRVUZGTEV0QlFVc3NRMEZCUXl4SFFVRkZMRTFCUVVrc1JVRkJSVHREUVVGTk8wTkJRVU1zVDBGQlR5eHRRa0ZCYlVJc1EwRkJRenRCUVVGRE96czdRVU5EY0haRUxFbEJRVmNzT0VKQlFUaENMRmRCUVZjc1QwRkJUeXhKUVVGSkxHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc0swTkJRU3RET3pzN1FVTkJjRWtzU1VGQlZ5d3dRa0ZCTUVJc1YwRkJWeXhQUVVGUExFbEJRVWtzYlVKQlFXMUNMRVZCUVVVc1EwRkJReXd5UTBGQk1rTTdPenRCUTBReVZDeEpRVUZKTEhOQ1FVRnZRaXhOUVVGTE8wTkJRVU03UTBGQmJVSTdRMEZCZDBJN1EwRkJZVHREUVVGUk8wTkJRV2RDTEdsQ1FVRmxPME5CUVVzc1dVRkJXU3hIUVVGRk8wVkJRVU1zUzBGQlN5eHhRa0ZCYlVJc1JVRkJSU3h2UWtGQmJVSXNTMEZCU3l3d1FrRkJkMElzUlVGQlJTeDVRa0ZCZDBJc1MwRkJTeXhsUVVGaExFVkJRVVVzWTBGQllTeExRVUZMTEZWQlFWRXNWMEZCVnl4RlFVRkRMRTlCUVUwc1JVRkJSU3hOUVVGTExFTkJRVU1zUjBGQlJTeExRVUZMTEd0Q1FVRm5RaXhMUVVGTExGRkJRVkVzVDBGQlR5eGpRVUZqTEVOQlFVTTdRMEZCUXp0RFFVRkRMRWxCUVVrc1VVRkJUenRGUVVGRExFOUJRVThzUzBGQlN5eFJRVUZSTzBOQlFVczdRMEZCUXl4TlFVRk5MRlZCUVZNN1JVRkJReXhOUVVGTkxHdENRVUZyUWl4TFFVRkxMR1ZCUVdVc1IwRkJSU3hOUVVGTkxGbEJRVmtzUzBGQlN5eFBRVUZQTzBOQlFVTTdRMEZCUXl4TlFVRk5MR2RDUVVGbE8wVkJRVU1zVTBGQlR6dEhRVUZETEVsQlFVa3NTVUZCUlN4TlFVRk5MRXRCUVVzc2NVSkJRWEZDTzBkQlFVVXNTVUZCUnl4RlFVRkZMRk5CUVU4c1YwRkJWVHRKUVVGRExFbEJRVWtzU1VGQlJTeE5RVUZOTEV0QlFVc3NjVUpCUVhGQ0xFVkJRVVVzVDBGQlR6dEpRVUZGTEVsQlFVY3NUVUZCU1N4TFFVRkxMRWRCUVVVc1QwRkJUenRKUVVGRk8wZEJRVkU3UjBGQlF5eEpRVUZKTEVsQlFVVXNSVUZCUlN4VFFVRlJMRWxCUVVVc1MwRkJTeXh2UWtGQmIwSXNRMEZCUXp0SFFVRkZMRWxCUVVjc1RVRkJTU3hMUVVGTExFZEJRVVVzVDBGQlR6dEhRVUZGTEVsQlFVY3NSVUZCUlN4VFFVRlBMSGxDUVVGM1FqdEpRVUZETEVsQlFVa3NTVUZCUlN4TlFVRk5MRXRCUVVzc2RVSkJRWFZDTEVOQlFVTTdTVUZCUlN4SlFVRkhMRTFCUVVrc1MwRkJTeXhIUVVGRkxFOUJRVTg3UjBGQlF6dEZRVUZETzBOQlFVTTdRMEZCUXl4TlFVRk5MSEZDUVVGeFFpeEhRVUZGTzBWQlFVTXNTVUZCUnl4RlFVRkZMRk5CUVU4c1VVRkJUenRIUVVGRExFdEJRVXNzYlVKQlFXMUNMRXRCUVVzc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXp0SFFVRkZPMFZCUVUwN1JVRkJReXhKUVVGSExFVkJRVVVzVTBGQlR5eFhRVUZUTEVWQlFVVXNVMEZCVHl4WFFVRlZPMGRCUVVNc1MwRkJTeXgzUWtGQmQwSXNTMEZCU3l4RlFVRkZMRWxCUVVrN1IwRkJSVHRGUVVGTk8wVkJRVU1zU1VGQlJ5eEZRVUZGTEZOQlFVOHNiVUpCUVd0Q08wZEJRVU1zUzBGQlN5eDNRa0ZCZDBJc1MwRkJTeXhUUVVGVE8wZEJRVVU3UlVGQlRUdEZRVUZETEVsQlFVY3NSVUZCUlN4VFFVRlBMRlZCUVZNN1IwRkJReXhOUVVGTkxEUkNRVUUwUWp0SlFVRkRMRk5CUVZFc1JVRkJSU3hYUVVGVExFdEJRVXNzU1VGQlJTeERRVUZETEVsQlFVVXNSVUZCUXl4UlFVRlBMRVZCUVVVc1QwRkJUVHRKUVVGRkxFOUJRVTBzTUVKQlFUQkNMRXRCUVVzc1VVRkJVU3hMUVVGTE8wZEJRVU1zUTBGQlF6dEhRVUZGTzBWQlFVMDdSVUZCUXl4SlFVRkhMRVZCUVVVc1UwRkJUeXhUUVVGUk8wZEJRVU1zVFVGQlRTdzBRa0ZCTkVJN1NVRkJReXhUUVVGUkxFTkJRVU03U1VGQlJTeFBRVUZOTERCQ1FVRXdRaXhMUVVGTExGRkJRVkVzUzBGQlN6dEhRVUZETEVOQlFVTXNSMEZCUlN4TFFVRkxMSGRDUVVGM1FpeExRVUZMTEU5QlFVODdSMEZCUlR0RlFVRk5PMFZCUVVNc1QwRkJUeXd3UWtGQk1FSXNRMEZCUXp0RFFVRkRPME5CUVVNc2NVSkJRWEZDTEVkQlFVVTdSVUZCUXl4RlFVRkZMSFZDUVVGeFFpeExRVUZMTEV0QlFVY3NTMEZCU3l4dFFrRkJiVUlzVVVGQlVTeEhRVUZITEVWQlFVVXNhMEpCUVd0Q08wTkJRVU03UTBGQlF5eHBRa0ZCWjBJN1JVRkJReXhMUVVGTExHbENRVUZsTzBOQlFVazdRMEZCUXl4dlFrRkJiVUk3UlVGQlF5eFBRVUZQTEV0QlFVc3NiVUpCUVdsQ0xFdEJRVXNzWjBKQlFXZENMRXRCUVVzc1IwRkJSU3hMUVVGTE8wTkJRV003UTBGQlF5eE5RVUZOTEhWQ1FVRnpRanRGUVVGRExFbEJRVWtzU1VGQlJTeE5RVUZOTEZGQlFWRXNTMEZCU3l4RFFVRkRMRXRCUVVzc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXl4TlFVRkxMRTlCUVVrN1IwRkJReXhOUVVGTE8wZEJRVlVzVDBGQlRUdEZRVUZETEVWQlFVVXNSMEZCUlN4TFFVRkxMR0ZCUVdFc1MwRkJTeXhEUVVGRExFTkJRVU1zVFVGQlN5eFBRVUZKTzBkQlFVTXNUVUZCU3p0SFFVRlZMRTlCUVUwN1JVRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dEZRVUZGTEVsQlFVY3NSVUZCUlN4VFFVRlBMRmRCUVZVN1IwRkJReXhKUVVGSExFVkJRVVVzVFVGQlRTeE5RVUZMTEUxQlFVMHNUVUZCVFN3NFJFRkJPRVE3UjBGQlJTeFBRVUZQTEV0QlFVc3NZVUZCWVN4WlFVRlpMRWRCUVVVN1NVRkJReXhUUVVGUkxFVkJRVVVzVFVGQlRUdEpRVUZOTEUxQlFVczdSMEZCVXp0RlFVRkRPMFZCUVVNc1NVRkJSeXhMUVVGTExHVkJRV1VzUjBGQlJTeEZRVUZGTEUxQlFVMHNUVUZCU3l4TlFVRk5MRTFCUVUwc2MwUkJRWE5FTzBWQlFVVXNTVUZCU1N4SlFVRkZMRVZCUVVVc1RVRkJUVHRGUVVGTkxFbEJRVWNzUlVGQlJTeFRRVUZQTEdOQlFXRXNUVUZCVFN4NVFrRkJlVUlzUlVGQlJTeExRVUZMTzBWQlFVVXNUMEZCVHl4RlFVRkZMRk5CUVU4c05rSkJRVEpDTEUxQlFVMHNTMEZCU3l4aFFVRmhMR3RDUVVGclFpeEZRVUZGTEdsQ1FVRnBRaXhIUVVGRkxFMUJRVTBzUzBGQlN5eHhRa0ZCY1VJc1MwRkJSenRIUVVGRExFMUJRVXM3UjBGQlZTeFRRVUZSTzBWQlFVTTdRMEZCUXp0RFFVRkRMRzlDUVVGdlFpeEhRVUZGTzBWQlFVTXNTVUZCUnl4RlFVRkZMRk5CUVU4c1kwRkJZU3hOUVVGTkxIbENRVUY1UWl4RlFVRkZMRXRCUVVzN1JVRkJSU3hKUVVGSExFVkJRVVVzVTBGQlR5eGxRVUZqTEU5QlFVOHNTMEZCU3l4eFFrRkJjVUlzUTBGQlF5eEhRVUZGTEVWQlFVVTdRMEZCVFR0RFFVRkRMRTFCUVUwc2RVSkJRWFZDTEVkQlFVVTdSVUZCUXl4TlFVRk5MRXRCUVVzc1lVRkJZU3hyUWtGQmEwSXNSVUZCUlN4cFFrRkJhVUk3UlVGQlJTeEpRVUZKTEVsQlFVVXNTMEZCU3l4dFFrRkJiVUlzVFVGQlRUdEZRVUZGTEU5QlFVc3NUVUZCU1N4TFFVRkxMRWxCUVVjN1IwRkJReXhKUVVGSkxFbEJRVVVzVFVGQlRTeFJRVUZSTEV0QlFVc3NRMEZCUXl4TFFVRkxMR3RDUVVGclFpeERRVUZETEVOQlFVTXNUVUZCU3l4UFFVRkpPMGxCUVVNc1RVRkJTenRKUVVGVkxFOUJRVTA3UjBGQlF5eEZRVUZGTEVkQlFVVXNTMEZCU3l4aFFVRmhMRXRCUVVzc1EwRkJReXhEUVVGRExFMUJRVXNzVDBGQlNUdEpRVUZETEUxQlFVczdTVUZCVlN4UFFVRk5PMGRCUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03UjBGQlJTeEpRVUZITEVWQlFVVXNVMEZCVHl4WFFVRlZPMGxCUVVNc1NVRkJSeXhMUVVGTExHVkJRV1VzUjBGQlJTeEZRVUZGTEUxQlFVMHNUVUZCU3l4TlFVRk5MRTFCUVUwc2NVUkJRWEZFTzBsQlFVVXNTVUZCUnl4RlFVRkZMRTFCUVUwc1RVRkJUU3hUUVVGUExESkNRVUV3UWp0TFFVRkRMRTFCUVUwc1MwRkJTeXhoUVVGaExHdENRVUZyUWl4RlFVRkZMRTFCUVUwc1RVRkJUU3hwUWtGQmFVSTdTMEZCUlR0SlFVRlJPMGxCUVVNc1NVRkJTU3hKUVVGRkxFdEJRVXNzYjBKQlFXOUNMRVZCUVVVc1RVRkJUU3hMUVVGTE8wbEJRVVVzU1VGQlJ5eE5RVUZKTEV0QlFVc3NSMEZCUlN4UFFVRlBPMGxCUVVVc1NVRkJSeXhGUVVGRkxFMUJRVTBzVFVGQlRTeFRRVUZQTERaQ1FVRXlRaXhGUVVGRkxFMUJRVTBzVFVGQlRTeGpRVUZaTEVWQlFVVXNWMEZCVlR0SlFVRlBPMGRCUVZFN1IwRkJReXhKUVVGSExFVkJRVVVzVFVGQlRTeE5RVUZMTEUxQlFVMHNUVUZCVFN3NFJFRkJPRVE3UjBGQlJTeEpRVUZITEV0QlFVc3NZVUZCWVN4WlFVRlpMRWRCUVVVc1JVRkJSU3hOUVVGTkxFMUJRVTBzVTBGQlR5eFJRVUZQTzBsQlFVTXNTVUZCUlN4clFrRkJhMElzUlVGQlJTeE5RVUZOTEV0QlFVczdTVUZCUlR0SFFVRlJPMGRCUVVNc1NVRkJTU3hKUVVGRkxFMUJRVTBzUzBGQlN5eHhRa0ZCY1VJc1JVRkJSU3hOUVVGTkxFdEJRVXM3UjBGQlJTeEpRVUZITEUxQlFVa3NTMEZCU3l4SFFVRkZMRTlCUVU4N1JVRkJRenRGUVVGRExFbEJRVWM3UjBGQlF5eE5RVUZOTEhkQ1FVRjNRanRKUVVGRExGbEJRVmNzUlVGQlJUdEpRVUZYTEZOQlFWRTdTMEZCUXl4VlFVRlRPMHRCUVVVc1RVRkJTenRMUVVGclFpeFhRVUZWTEVWQlFVVTdTVUZCVXp0SFFVRkRMRU5CUVVNN1JVRkJReXhUUVVGUExFZEJRVVU3UjBGQlF5eEpRVUZITEVWQlFVVXNZVUZCWVN4VFFVRlBMRVZCUVVVc1UwRkJUeXh6UWtGQmNVSXNUVUZCVFR0RlFVRkRPMFZCUVVNc1QwRkJUeXhOUVVGTkxFdEJRVXNzZFVKQlFYVkNMRVZCUVVVc1YwRkJWU3hEUVVGRE8wTkJRVU03UTBGQlF5eE5RVUZOTEhWQ1FVRjFRaXhIUVVGRkxFZEJRVVU3UlVGQlF5eFRRVUZQTzBkQlFVTXNTVUZCU1N4SlFVRkZMRTFCUVUwc1MwRkJTeXh4UWtGQmNVSTdSMEZCUlN4SlFVRkhMRVZCUVVVc1UwRkJUeXhYUVVGVk8wbEJRVU1zU1VGQlNTeEpRVUZGTEUxQlFVMHNTMEZCU3l4eFFrRkJjVUlzUlVGQlJTeFBRVUZQTzBsQlFVVXNTVUZCUnl4TlFVRkpMRXRCUVVzc1IwRkJSU3hQUVVGUExFdEJRVXNzYlVKQlFXMUNMRkZCUVZFc1EwRkJReXhIUVVGRk8wbEJRVVU3UjBGQlVUdEhRVUZETEVsQlFVa3NTVUZCUlN4RlFVRkZPMGRCUVZFc1NVRkJSeXhGUVVGRkxGTkJRVThzTUVKQlFYbENPMGxCUVVNc1NVRkJSeXhGUVVGRkxHTkJRVmtzUjBGQlJUdEpRVUZQTzBkQlFWRTdSMEZCUXl4SlFVRkhMRVZCUVVVc1UwRkJUeXcyUWtGQk1rSXNSVUZCUlN4alFVRlpMRWRCUVVVN1NVRkJReXhMUVVGTExHMUNRVUZ0UWl4UlFVRlJMRU5CUVVNN1NVRkJSVHRIUVVGTk8wZEJRVU1zUlVGQlJTeFRRVUZQTEdsQ1FVRmxMRXRCUVVzc2JVSkJRVzFDTEZGQlFWRXNRMEZCUXp0SFFVRkZMRWxCUVVrc1NVRkJSU3hMUVVGTExHOUNRVUZ2UWl4RFFVRkRPMGRCUVVVc1NVRkJSeXhOUVVGSkxFdEJRVXNzUjBGQlJTeFBRVUZQTzBWQlFVTTdRMEZCUXp0QlFVRkRPMEZCUVVVc1UwRkJVeXd3UWtGQk1FSXNSMEZCUlR0RFFVRkRMRTFCUVUwc1RVRkJUU3huUTBGQlowTXNTMEZCU3l4VlFVRlZMRU5CUVVNc1IwRkJSenRCUVVGRE8wRkJRVU1zVTBGQlV5eHJRa0ZCYTBJc1IwRkJSVHREUVVGRExFOUJRVTA3UlVGQlF5eE5RVUZMTEVWQlFVVTdSVUZCU3l4UlFVRlBMRVZCUVVVN1JVRkJUeXhOUVVGTE8wVkJRVlVzVlVGQlV5eERRVUZETEVWQlFVVXNUMEZCVHp0RlFVRkZMRmRCUVZVc1JVRkJSVHREUVVGVE8wRkJRVU03T3p0QlEwRjRNMG9zWlVGQlpTeHhRa0ZCY1VJc1IwRkJSVHREUVVGRExFbEJRVWtzU1VGQlJTeEpRVUZKTEc5Q1FVRnZRanRGUVVGRExHOUNRVUZ0UWl4RlFVRkZPMFZCUVcxQ0xIbENRVUYzUWl4RlFVRkZPMFZCUVhkQ0xHTkJRV0VzUlVGQlJUdEZRVUZoTEU5QlFVMHNSVUZCUlR0RFFVRlpMRU5CUVVNN1EwRkJSU3hKUVVGSE8wVkJRVU1zVDBGQlR5eE5RVUZOTEdsQ1FVRnBRanRIUVVGRExHTkJRV0VzUlVGQlJUdEhRVUZoTEdsQ1FVRm5RaXhGUVVGRk8wZEJRVTBzVlVGQlV5eEZRVUZGTzBkQlFWTXNUVUZCU3l4RlFVRkZPMGRCUVVzc1owSkJRV1VzUlVGQlJUdEhRVUZsTEcxQ1FVRnJRaXhGUVVGRk8wZEJRV3RDTEdOQlFXRXNSVUZCUlR0RlFVRlpMRU5CUVVNc1IwRkJSVHRIUVVGRExGRkJRVThzVFVGQlRTeEZRVUZGTEdOQlFXTTdSMEZCUlN4bFFVRlpMRVZCUVVVc1VVRkJVVHRGUVVGRE8wTkJRVU1zVTBGQlR5eEhRVUZGTzBWQlFVTXNUVUZCVFN4TlFVRk5MRVZCUVVVc1VVRkJVU3hIUVVGRk8wTkJRVU03UVVGQlF6czdPMEZEUXpGdlFpeEpRVUZYTEc5Q1FVRnZRaXhYUVVGWExFOUJRVThzU1VGQlNTeHRRa0ZCYlVJc1JVRkJSU3hEUVVGRExIRkRRVUZ4UXpzN08wRkRRV2hJTEVsQlFWY3NNRUpCUVRCQ0xGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zTWtOQlFUSkRPenM3UVVOQk5VZ3NTVUZCVnl4cFEwRkJhVU1zVjBGQlZ5eFBRVUZQTEVsQlFVa3NiVUpCUVcxQ0xFVkJRVVVzUTBGQlF5eHJSRUZCYTBRN096dEJRMEV4U1N4SlFVRlhMREJDUVVFd1FpeFhRVUZYTEU5QlFVOHNTVUZCU1N4dFFrRkJiVUlzUlVGQlJTeERRVUZETERKRFFVRXlRenM3TzBGRFJFOHNVMEZCVXl3MFFrRkJNa0k3UTBGQlF5eEpRVUZKTEVkQlFVVXNSMEZCUlN4SlFVRkZMRU5CUVVNc1IwRkJSU3hKUVVGRkxFTkJRVU1zUjBGQlJTeEpRVUZGTEVkQlFVVXNTVUZCUlN4TlFVRkxMRWRCUVVVc1IwRkJSU3hYUVVGUkxFMUJRVWM3UlVGQlF5eEZRVUZGTEV0QlFVc3NRMEZCUXl4SFFVRkZMRVZCUVVVc1RVRkJUU3hIUVVGRkxFMUJRVWtzUlVGQlJTeFJRVUZOTEVWQlFVVXNTMEZCU3l4SFFVRkZMRWxCUVVrc1IwRkJSU3hKUVVGRkxFdEJRVXM3UTBGQlF5eEhRVUZGTEU5QlFVa3NUVUZCUnp0RlFVRkRMRVZCUVVVc1ZVRkJVU3hGUVVGRkxGbEJRVlVzUlVGQlJTeFZRVUZSTEVOQlFVTXNSMEZCUlN4RlFVRkZMRmRCUVZNc1MwRkJTeXhKUVVGSExFVkJRVVVzVlVGQlVTeFJRVUZSTEZGQlFWRXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhOUVVGTExFOUJRVWs3UjBGQlF5eE5RVUZMTEVOQlFVTTdSMEZCUlN4UFFVRk5PMFZCUVVNc1JVRkJSU3hKUVVGRkxFVkJRVVVzVTBGQlV5eExRVUZMTEVWQlFVRXNRMEZCUnl4TlFVRkxMRTFCUVVjN1IwRkJReXhKUVVGSkxFbEJRVVU3U1VGQlF5eFBRVUZOTzBsQlFVa3NVVUZCVHp0SlFVRkZMRTlCUVUwN1IwRkJRenRIUVVGRkxFVkJRVVVzVjBGQlV5eEhRVUZGTEVWQlFVVXNWMEZCVXl4UlFVRlJMRU5CUVVNN1JVRkJReXhUUVVGTkxFTkJRVU1zUTBGQlF6dERRVUZGTEVkQlFVVXNWVUZCVHl4TlFVRkhPMFZCUVVNc1JVRkJSU3hWUVVGUkxFTkJRVU1zUjBGQlJTeEZRVUZGTEdGQlFWY3NTMEZCU3l4TFFVRkhMRkZCUVZFc1JVRkJSU3hSUVVGUk8wTkJRVU1zUjBGQlJTeGxRVUZaTEUxQlFVYzdSVUZCUXl4SlFVRkpMRWxCUVVVc1YwRkJWeXhGUVVGRExFOUJR",
	"VTBzUlVGQlF5eERRVUZETzBWQlFVVXNUMEZCVFR0SFFVRkRMRkZCUVU4c1EwRkJRenRIUVVGRkxGTkJRVkVzUTBGQlF6dEhRVUZGTEUxQlFVczdSMEZCUlN4VlFVRlRMRVZCUVVVc1QwRkJUeXhqUVVGakxFTkJRVU03UjBGQlJTeFRRVUZSTEVOQlFVTTdSMEZCUlN4VFFVRlJMRU5CUVVNN1JVRkJRenREUVVGRExFZEJRVVVzWlVGQlZ6dEZRVUZETzBWQlFVVTdSVUZCUlN4SFFVRkhPME5CUVVNc1EwRkJReXhEUVVGRExGRkJRVThzVFVGQlJ5eE5RVUZKTEV0QlFVc3NRMEZCUXp0RFFVRkZMRTlCUVUwN1JVRkJReXhOUVVGTkxGbEJRVmtzUjBGQlJUdEhRVUZETEVsQlFVY3NUVUZCU1N4TFFVRkxMRWRCUVVVN1NVRkJReXhKUVVGSExFVkJRVVVzUzBGQlN5eFZRVUZSTEVkQlFVVTdTVUZCVHl4TlFVRk5MRTFCUVUwc2VVUkJRWGxFTzBkQlFVTTdSMEZCUXl4SlFVRkpMRWxCUVVVc1dVRkJXU3hEUVVGRE8wZEJRVVVzVFVGQlRTeHRRa0ZCYlVJc1JVRkJSU3hKUVVGSkxFZEJRVVVzVDBGQlR5eERRVUZETEVkQlFVVXNTVUZCUlR0RlFVRkRPMFZCUVVVc1kwRkJZVHRIUVVGRExFbEJRVWNzVFVGQlNTeExRVUZMTEVkQlFVVXNUVUZCVFN4TlFVRk5MSE5FUVVGelJEdEhRVUZGTEVWQlFVVXNUVUZCVFN4VlFVRlJMRU5CUVVNc1IwRkJSU3hGUVVGRkxFMUJRVTBzVjBGQlV5eExRVUZMTEVkQlFVVXNSVUZCUlN4UFFVRlBMRk5CUVU4c1JVRkJSU3hOUVVGTkxGTkJRVThzUTBGQlF5eEpRVUZITEVsQlFVVXNTMEZCU3l4SFFVRkZMRWxCUVVVN1JVRkJTVHRGUVVGRkxFMUJRVTBzVlVGQlV6dEhRVUZETEVsQlFVa3NTVUZCUlN4RFFVRkRMRWRCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zVVVGQlR5eE5RVUZITEUxQlFVa3NTMEZCU3l4RFFVRkRPMGRCUVVVc1NVRkJSU3hMUVVGTExFZEJRVVVzU1VGQlJTeExRVUZMTEVkQlFVVXNUVUZCVFN4UlFVRlJMRWxCUVVrc1JVRkJSU3hKUVVGSkxFOUJRVTBzVFVGQlJ5eE5RVUZOTEZsQlFWa3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRGUVVGRE8wVkJRVVVzVDBGQlRUdEhRVUZETEVsQlFVY3NUVUZCU1N4TFFVRkxMRWRCUVVVc1RVRkJUU3hOUVVGTkxHOUZRVUZ2UlR0SFFVRkZMRWxCUVVjc1RVRkJTU3hOUVVGTExFOUJRVTg3UjBGQlJTeEpRVUZKTEVsQlFVVXNUMEZCVHp0SFFVRkZMRXRCUVVrc1NVRkJTU3hMUVVGTExFZEJRVVVzU1VGQlNTeERRVUZETzBkQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVUwc1RVRkJSeXhGUVVGRkxFMUJRVTBzUzBGQlJ5eEpRVUZGTzBsQlFVTXNUMEZCVFR0SlFVRkpMRkZCUVU4N1MwRkJReXhOUVVGTExFTkJRVU03UzBGQlJTeFBRVUZOTEV0QlFVczdTVUZCUXp0SlFVRkZMRTlCUVUwN1IwRkJReXhIUVVGRkxFbEJRVVVzVVVGQlVTeFJRVUZSTEVWQlFVVXNUVUZCVFN4SFFVRkZMRTFCUVVrc1MwRkJSeXhaUVVGVE8wbEJRVU1zVDBGQlN5eEZRVUZGTEZkQlFWTXNTVUZCUnl4TlFVRk5MRWxCUVVrc1UwRkJVU3hOUVVGSE8wdEJRVU1zU1VGQlJUdEpRVUZETEVOQlFVTTdTVUZCUlN4SlFVRkpMRWxCUVVVc1JVRkJSU3hOUVVGTk8wbEJRVVVzVDBGQlR5eEpRVUZGTEVkQlFVVXNSVUZCUlR0SFFVRk5MRVZCUVVFc1EwRkJSeXhIUVVGRk8wVkJRVVU3UlVGQlJTeE5RVUZOTEd0Q1FVRnJRaXhIUVVGRk8wZEJRVU1zU1VGQlJ5eERRVUZETEV0QlFVY3NSMEZCUnl4TFFVRkxMRlZCUVZFc1IwRkJSVHRIUVVGUExFbEJRVWtzU1VGQlJTeFpRVUZaTEVOQlFVTTdSMEZCUlN4SlFVRkhMRTFCUVVrc1MwRkJTeXhIUVVGRk8wbEJRVU1zVFVGQlRTeHRRa0ZCYlVJc1JVRkJSU3hKUVVGSkxFZEJRVVVzVDBGQlR5eERRVUZETEVkQlFVVXNTVUZCUlN4SFFVRkZMRTFCUVVrc1VVRkJUU3hKUVVGSkxFTkJRVU03U1VGQlJUdEhRVUZOTzBkQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVVc1RVRkJUU3h0UWtGQmJVSXNSVUZCUlN4SlFVRkpMRWRCUVVVc1QwRkJUeXhEUVVGRE8wZEJRVVVzU1VGQlNTeEpRVUZGTzBkQlFVVXNTVUZCUlN4SFFVRkZMRWxCUVVrc1EwRkJRenRIUVVGRkxFbEJRVWM3U1VGQlF5eE5RVUZOTEZsQlFWa3NSVUZCUlN4SlFVRkpPMGRCUVVNc1UwRkJUeXhIUVVGRk8wbEJRVU1zU1VGQlJTeExRVUZMTzBsQlFVVXNTVUZCUnp0TFFVRkRMRTFCUVUwc1dVRkJXU3hGUVVGRkxFbEJRVWs3U1VGQlF5eFJRVUZOTEVOQlFVTTdTVUZCUXl4TlFVRk5PMGRCUVVNN1IwRkJReXhGUVVGRkxGVkJRVkVzUTBGQlF5eEhRVUZGTEVWQlFVVXNTMEZCU3l4RFFVRkRPMFZCUVVNN1EwRkJRenRCUVVGRE96czdRVU5CTnpsRUxGTkJRVk1zZDBKQlFYZENMRWRCUVVVN1EwRkJReXhQUVVGTkxHVkJRV1VzUlVGQlJUdEJRVUZQT3pzN1FVVkRiRVVzU1VGQlZ5eHZRMEZCYjBNc1YwRkJWeXhQUVVGUExFbEJRVWtzYlVKQlFXMUNMRVZCUVVVc1EwRkJReXh4UkVGQmNVUTdPenRCUTBRNVF5eFRRVUZUTERSQ1FVRTBRaXhIUVVGRk8wTkJRVU1zU1VGQlNUdERRVUZGTEU5QlFVMDdSVUZCUXl4TlFVRk5MRlZCUVZNN1IwRkJReXhKUVVGSExFMUJRVWtzUzBGQlN5eEhRVUZGTzBkQlFVOHNTVUZCU1N4SlFVRkZPMGRCUVVVc1NVRkJSU3hMUVVGTExFZEJRVVVzVFVGQlRTeDVRa0ZCZVVJc1JVRkJReXhQUVVGTkxFVkJRVVVzVFVGQlN5eERRVUZETzBWQlFVTTdSVUZCUlN4TlFVRk5MRkZCUVU4N1IwRkJReXhOUVVGSkxFdEJRVXNzVFVGQlNTeEpRVUZGTEUxQlFVMHNkMEpCUVhkQ0xFTkJRVU03UlVGQlJUdERRVUZETzBGQlFVTTdPenRCUTBNNVZDeEpRVUZYTERaQ1FVRTJRaXhYUVVGWExFOUJRVThzU1VGQlNTeHRRa0ZCYlVJc1JVRkJSU3hEUVVGRExEaERRVUU0UXpzN08wRkRRVGc0UXl4bFFVRmxMR05CUVdNc1IwRkJSVHREUVVGRExFbEJRVWNzUlVGQlF5eGxRVUZqTEVkQlFVVXNiVUpCUVd0Q0xFMUJRVWNzYjBKQlFXOUNMRWRCUVVVc1NVRkJSU3hGUVVGRkxHdENRVUZyUWl3MFFrRkJNRUlzU1VGQlJ5eEpRVUZGTEVWQlFVVXNhMEpCUVd0Q0xHRkJRVmtzU1VGQlJTeEZRVUZGTEd0Q1FVRnJRaXh4UWtGQmIwSXNTVUZCUlN4RlFVRkZMR3RDUVVGclFqdERRVUZqTEVWQlFVVXNhMEpCUVd0Q0xHMUNRVUZwUWp0RFFVRkZMRWxCUVVrc1NVRkJSU3haUVVGWkxFZEJRVVVzU1VGQlJUdEZRVUZETEZGQlFVOHNTMEZCU3p0RlFVRkZMR2RDUVVGbExFTkJRVU03UlVGQlJTeHJRa0ZCYVVJc1MwRkJTenREUVVGRE8wTkJRVVVzU1VGQlJ6dEZRVUZETEVsQlFVa3NTVUZCUlN4clFrRkJhMElzUlVGQlJTeHBRa0ZCYVVJc1IwRkJSU3hKUVVGRkxEUkNRVUUwUWl4RlFVRkZMR2xDUVVGcFFpeEhRVUZGTEVsQlFVVXNSVUZCUlN4clFrRkJhMElzYlVOQlFXdERMRVZCUVVNc1QwRkJUU3hOUVVGSExFMUJRVTBzYTBKQlFXdENPMGRCUVVNc2VVSkJRWGRDTEVWQlFVVTdSMEZCVHl4dFFrRkJhMEk3UjBGQlJTdzBRa0ZCTWtJN1IwRkJSU3hwUWtGQlowSXNSVUZCUlR0SFFVRlBMRkZCUVU4c1JVRkJSVHRIUVVGUExHTkJRV0VzUlVGQlJTeE5RVUZOTzBkQlFXRXNaVUZCWXp0SFFVRkZMRmRCUVZVN1IwRkJSU3hsUVVGak8wVkJRVU1zUTBGQlF6dEZRVUZGTEVWQlFVVXNiVUpCUVdsQ0xFZEJRVVVzUlVGQlJTeFRRVUZQTEUxQlFVMHNOa0pCUVRaQ0xFVkJRVU1zYlVKQlFXdENMRVZCUVVVc2EwSkJRV2xDTEVOQlFVTXNSMEZCUlN4RlFVRkZMR2xDUVVGbExFTkJRVU03UlVGQlJTeEpRVUZKTEVsQlFVVXNUVUZCVFN4alFVRmpPMGRCUVVNc1kwRkJZVHRIUVVGRkxHZENRVUZsTzBkQlFVVXNZMEZCWVR0SlFVRkRMRTFCUVVzN1NVRkJWU3hWUVVGVExFTkJRVU03UzBGQlF5eFRRVUZSTEVWQlFVVXNUVUZCVFR0TFFVRlJMRk5CUVZFc1JVRkJSU3hOUVVGTk8wdEJRVkVzWTBGQllTeEZRVUZGTEUxQlFVMDdTVUZCV1N4RFFVRkRPMGxCUVVVc1YwRkJWU3h4UWtGQmNVSXNSVUZCUlN4cFFrRkJhVUk3UjBGQlF6dEhRVUZGTEcxQ1FVRnJRanRIUVVGRkxFMUJRVXM3UjBGQlJTeHRRa0ZCYTBJc1JVRkJSVHRIUVVGclFpeGpRVUZoTzBkQlFVVXNkMEpCUVhWQ0xFVkJRVVVzY1VKQlFXMUNMRU5CUVVNc1NVRkJSU3hMUVVGTExFbEJRVVVzU1VGQlNTeExRVUZMTEVWQlFVVXNVVUZCVVN4TFFVRkhMRVZCUVVVc2IwSkJRVUVzVDBGQk5rTTdSVUZCUXl4RFFVRkRPMFZCUVVVc1QwRkJUeXhGUVVGRkxGTkJRVThzVjBGQlV5eEZRVUZGTEZOQlFVOHNUVUZCVFN4MVFrRkJkVUk3UjBGQlF5eFJRVUZQTEVWQlFVVTdSMEZCVHl4blFrRkJaVHRIUVVGRkxFMUJRVXM3UjBGQlJTeHRRa0ZCYTBJc1JVRkJSVHRIUVVGclFpeGpRVUZoTEVWQlFVVTdSVUZCV1N4RFFVRkRPME5CUVVNc1UwRkJUeXhIUVVGRk8wVkJRVU1zVFVGQlRTeEZRVUZGTEhGQ1FVRnRRaXhMUVVGTExFdEJRVWNzVFVGQlRTd3lRa0ZCTWtJc1JVRkJReXhqUVVGaExFVkJRVVVzYVVKQlFXZENMRU5CUVVNc1IwRkJSU3hOUVVGTkxDdENRVUVyUWp0SFFVRkRMRTlCUVUwc01rSkJRVEpDTEVOQlFVTTdSMEZCUlN4blFrRkJaVHRIUVVGRkxHMUNRVUZyUWl4RlFVRkZPMFZCUVdsQ0xFTkJRVU1zUjBGQlJTeE5RVUZKTEZWQlFWRXNUVUZCVFN4M1FrRkJkMEk3UjBGQlF5eFBRVUZOTERKQ1FVRXlRaXhEUVVGRE8wZEJRVVVzYlVKQlFXdENMRVZCUVVVN1IwRkJhMElzVVVGQlR6dEZRVUZSTEVOQlFVTXNSMEZCUlN4TlFVRk5MREJDUVVFd1FqdEhRVUZETEZGQlFVOHNiVU5CUVcxRExFVkJRVVVzYlVKQlFXdENMRU5CUVVNN1IwRkJSU3h0UWtGQmEwSXNSVUZCUlR0RlFVRnBRaXhEUVVGRExFdEJRVWNzVFVGQlRTeHhRa0ZCY1VJN1IwRkJReXhSUVVGUExFMUJRVTBzYzBKQlFYTkNMRWRCUVVVc1JVRkJSU3hwUWtGQmFVSTdSMEZCUlN4WFFVRlZPMGRCUVZjc1YwRkJWVHRIUVVGRkxGTkJRVkU3U1VGQlF5eFRRVUZSTEVOQlFVTTdTVUZCUlN4UlFVRlBPMGRCUVVNN1JVRkJReXhEUVVGRExFZEJRVVVzTmtKQlFUWkNPME5CUVVNN1FVRkJRenRCUVVGRExHVkJRV1VzYzBKQlFYTkNMRWRCUVVVc1IwRkJSVHREUVVGRExFbEJRVWNzUlVGQlJTeG5Ra0ZCWlN4UFFVRlBMRVZCUVVVN1EwRkJUeXhKUVVGSE8wVkJRVU1zVDBGQlR5eE5RVUZOTERaQ1FVRTJRaXhGUVVGRExHMUNRVUZyUWl4RlFVRkRMRU5CUVVNN1EwRkJReXhSUVVGTk8wVkJRVU03UTBGQlRUdEJRVUZETzBGQlFVTXNVMEZCVXl3clFrRkJPRUk3UTBGQlF5eEpRVUZKTEVsQlFVVXNUVUZCVFN4MVJVRkJkVVU3UTBGQlJTeFBRVUZQTEVWQlFVVXNUMEZCU3l4elFrRkJjVUk3UVVGQlF6dEJRVUZETEdWQlFXVXNZMEZCWXl4SFFVRkZPME5CUVVNc1NVRkJTU3hKUVVGRkxGZEJRVmNzUlVGQlF5eFBRVUZOTEVkQlFVY3NSVUZCUlN4aFFVRmhMRlZCUVZVc1QwRkJUU3hEUVVGRExFZEJRVVVzU1VGQlJTeEZRVUZGTEU5QlFVOHNZMEZCWXl4RFFVRkRMRWRCUVVVc1NVRkJSU3hIUVVGRkxEWkNRVUY1UWl4SFFVRkhMRVZCUVVVc1lVRkJZU3hWUVVGVkxHZENRVUZuUWl4UFFVRlBMRWRCUVVjc1MwRkJTU3hKUVVGRkxFTkJRVU1zUjBGQlJTeEpRVUZGTEVOQlFVTXNSMEZCUlN4SlFVRkZMREJDUVVFd1FpeEhRVUZGTEVsQlFVVXNkMEpCUVhkQ0xFVkJRVVVzWVVGQllTeFRRVUZUTzBOQlFVVXNUVUZCVFN4RlFVRkZMRmxCUVZrc1EwRkJRenREUVVGRkxFbEJRVWtzU1VGQlJTeEZRVUZGTERKQ1FVRjVRaXhMUVVGTExFbEJRVVVzUzBGQlN5eEpRVUZGTERSQ1FVRTBRanRGUVVGRExGVkJRVk1zUlVGQlJUdEZRVUYxUWl4UFFVRk5PME5CUVVNc1EwRkJReXhIUVVGRkxFZEJRVVVzVlVGQlVTeFBRVUZOTEUxQlFVYzdSVUZCUXl4SlFVRkpMRWxCUVVVc1RVRkJUU3h4UWtGQmNVSTdSMEZCUXl4dlFrRkJiVUk3UjBGQlJTeDVRa0ZCZDBJN1IwRkJSU3hqUVVGaExFVkJRVVU3UjBGQllTeGpRVUZoTzBkQlFVVXNZMEZCWVN4eFFrRkJjVUk3UjBGQlJTeFZRVUZUTEVWQlFVVTdSMEZCVXl4TlFVRkxMRVZCUVVVN1IwRkJTeXhuUWtGQlpTeEZRVUZGTzBkQlFXVXNiVUpCUVd0Q0xFVkJRVVU3UjBGQmEwSXNZMEZCWVN4RlFVRkZPMFZCUVZrc1EwRkJRenRGUVVGRkxFOUJRVThzVFVGQlRTeEpRVUZKTEVkQlFVVXNTVUZCUlN4RlFVRkZMRk5CUVZFc1JVRkJSVHREUVVGTk8wTkJRVVVzU1VGQlJ6dEZRVUZETEVWQlFVVXNZVUZCWVN4eFFrRkJiVUlzVFVGQlRTeEZRVUZGTEd0Q1FVRnJRaXhGUVVGRkxHRkJRV0VzYVVKQlFXbENMRWRCUVVVc1RVRkJUU3hIUVVGSExFMUJRVTA3UlVGQlJTeEpRVUZKTEVsQlFVVXNUVUZCVFN4UlFVRlJPMGRCUVVNc1ZVRkJVeXhGUVVGRk8wZEJRV0VzYlVKQlFXdENMRVZCUVVVN1IwRkJhMElzWTBGQllTeEZRVUZGTzBWQlFWa3NRMEZCUXp0RlFVRkZMRXRCUVVrc1JVRkJSU3hyUWtGQmEwSXNiVUpCUVdsQ0xFVkJRVVVzWjBKQlFXVTdSMEZCUXl4SlFVRkhMRVZCUVVVc1UwRkJUeXhSUVVGUExFOUJRVTA3U1VGQlF5eE5RVUZMTzBsQlFWTXNVVUZCVHl4TlFVRk5MR0ZCUVdFN1MwRkJReXhSUVVGUE8wdEJRVVVzVVVGQlR5eEZRVUZGTEd0Q1FVRnJRanRMUVVGUExFMUJRVXNzUlVGQlJUdEpRVUZKTEVOQlFVTTdSMEZCUXp0SFFVRkZMRWxCUVVjc1JVRkJSU3hUUVVGUExGRkJRVThzVFVGQlRTeE5RVUZOTERKRFFVRXlReXhGUVVGRkxFdEJRVXNzUjBGQlJ6dEhRVUZGTEVsQlFVY3NSVUZCUlN4alFVRlpMRU5CUVVNc1IwRkJSVHRKUVVGRExFbEJRVWtzU1VGQlJTeE5RVUZOTEhkQ1FVRjNRanRMUVVGRExHZENRVUZsTEVWQlFVVTdTMEZCWlN4dFFrRkJhMElzUlVGQlJUdExRVUZyUWl4alFVRmhMRVZCUVVVN1NVRkJXU3hEUVVGRE8wbEJRVVVzU1VGQlJUdExRVUZETEVkQlFVYzdTMEZCUlN4dFFrRkJhMElzUlVGQlJUdExRVUZyUWl4alFVRmhMRVZCUVVVN1NVRkJXU3hIUVVGRkxFVkJRVVVzYTBKQlFXdENMRzFDUVVGcFFpeEZRVUZGTzBkQlFWazdSMEZCUXl4SlFVRkhMRVZCUVVVc1lVRkJZU3h4UWtGQmJVSXNUVUZCVFN4RlFVRkZMR3RDUVVGclFpeEZRVUZGTEdGQlFXRXNhVUpCUVdsQ0xFZEJRVVVzUlVGQlJTeHpRa0ZCYjBJc1JVRkJSU3h0UWtGQmJVSXNVMEZCVHl4SFFVRkZPMGxCUVVNc1NVRkJTU3hKUVVGRkxFVkJRVVVzYlVKQlFXMUNMRkZCUVU4c1NVRkJSU3hEUVVGRE8wbEJRVVVzVDBGQlN5eEZRVUZGTEZOQlFVOHNTVUZCUnp0TFFVRkRMRWxCUVVrc1NVRkJSU3hOUVVGTkxFVkJRVVVzUzBGQlN6dExRVUZGTEVsQlFVY3NSVUZCUlN4TlFVRkxPMHRCUVUwc1JVRkJSU3hOUVVGTkxGTkJRVThzWVVGQlZ5eEZRVUZGTEV0QlFVc3NSMEZCUnl4RlFVRkZMRTFCUVUwc1VVRkJVVHRKUVVGRE8wbEJRVU1zU1VGQlJTeE5RVUZOTEZGQlFWRTdTMEZCUXl4VlFVRlRPMDFCUVVNc1RVRkJTenROUVVGVkxGVkJRVk03UzBGQlF6dExRVUZGTEcxQ1FVRnJRaXhGUVVGRk8wdEJRV3RDTEdOQlFXRXNSVUZCUlR0SlFVRlpMRU5CUVVNc1IwRkJSU3hGUVVGRkxHdENRVUZyUWl4dFFrRkJhVUlzUlVGQlJUdEpRVUZoTzBkQlFWRTdSMEZCUXl4SlFVRkpMRWxCUVVVc1JVRkJSVHRIUVVGUkxFVkJRVVVzWTBGQldTeERRVUZETEV0QlFVY3NUVUZCU1N4TFFVRkxMRXRCUVVjc1RVRkJUU3h4UWtGQmNVSTdTVUZCUXl4UlFVRlBMRVZCUVVVc2EwSkJRV3RDTzBsQlFVOHNWMEZCVlR0SlFVRlRMRmRCUVZVc1JVRkJSU3hoUVVGaE8wbEJRVlVzVTBGQlVUdEhRVUZETEVOQlFVTXNSMEZCUlN4RlFVRkZMR3RDUVVGclFpeFRRVUZQTEV0QlFVc3NTMEZCUnl4RlFVRkZMR05CUVZrc1EwRkJReXhOUVVGSkxFVkJRVVVzYTBKQlFXdENMRk5CUVU4c1MwRkJTenRIUVVGSExFbEJRVWtzU1VGQlJTeE5RVUZOTEdsQ1FVRnBRanRKUVVGRExHOUNRVUZ0UWp0SlFVRkZMSGxDUVVGM1FqdEpRVUZGTEdOQlFXRTdTVUZCUlN4blFrRkJaU3hGUVVGRk8wbEJRV1VzWTBGQllTeEZRVUZGTzBkQlFWa3NRMEZCUXp0SFFVRkZMRWxCUVVjc1JVRkJSU3hUUVVGUExGZEJRVlVzVDBGQlRUdEpRVUZETEUxQlFVczdTVUZCVlN4dFFrRkJhMElzUlVGQlJUdEpRVUZyUWl4alFVRmhMRVZCUVVVN1IwRkJXVHRIUVVGRkxFbEJRVWNzUlVGQlJTeFRRVUZQTEZOQlFWRXNUMEZCVHl4TlFVRk5MREpDUVVFeVFpeEZRVUZETEdOQlFXRXNSVUZCUlN4aFFVRlpMRU5CUVVNc1IwRkJSVHRKUVVGRExFMUJRVXM3U1VGQlV5eFJRVUZQTEVWQlFVTXNVVUZCVHl4SFFVRkZPMGRCUVVNN1IwRkJSU3hKUVVGSExFVkJRVVVzVTBGQlR5eFhRVUZUTEVWQlFVVXNVMEZCVHl4WFFVRlZPMGxCUVVNc1NVRkJSU3hOUVVGTkxGRkJRVkU3UzBGQlF5eFZRVUZUTEVWQlFVTXNUVUZCU3l4RlFVRkZMRXRCUVVrN1MwRkJSU3h0UWtGQmEwSXNSVUZCUlR0TFFVRnJRaXhqUVVGaExFVkJRVVU3U1VGQldTeERRVUZETEVkQlFVVXNSVUZCUlN4clFrRkJhMElzYlVKQlFXbENMRVZCUVVVN1NVRkJZVHRIUVVGUk8wZEJRVU1zU1VGQlJ5eEZRVUZGTEZOQlFVOHNWVUZCVXl4UFFVRk5PMGxCUVVNc1RVRkJTenRKUVVGVExGRkJRVThzUlVGQlF5eFJRVUZQTEVkQlFVVTdSMEZCUXp0SFFVRkZMRWxCUVVjc1JVRkJSU3hUUVVGUExHVkJRV003U1VGQlF5eE5RVUZOTERCQ1FVRXdRanRMUVVGRExHMUNRVUZyUWl4RlFVRkZPMHRCUVd0Q0xHTkJRV0VzUlVGQlJUdEpRVUZaTEVOQlFVTTdTVUZCUlN4SlFVRkpMRWxCUVVVc1RVRkJUU3gzUWtGQmQwSTdTMEZCUXl4blFrRkJaU3hGUVVGRk8wdEJRV1VzYlVKQlFXdENMRVZCUVVVN1MwRkJhMElzWTBGQllTeEZRVUZGTzBsQlFWa3NRMEZCUXp0SlFVRkZMRWxCUVVVN1MwRkJReXhIUVVGSE8wdEJRVVVzYlVKQlFXdENMRVZCUVVVN1MwRkJhMElzWTBGQllTeEZRVUZGTzB0QlFXRXNVMEZCVVN4TFFVRkxPMGxCUVVNc1IwRkJSU3hGUVVGRkxHdENRVUZyUWl4VFFVRlBMRXRCUVVzc1IwRkJSU3hGUVVGRkxHdENRVUZyUWl4dFFrRkJhVUlzUlVGQlJUdEpRVUZoTzBkQlFWRTdSMEZCUXl4RlFVRkZMRkZCUVZFc1YwRkJVeXhMUVVGTExFMUJRVWtzUlVGQlJTeHJRa0ZCYTBJc1UwRkJUeXhGUVVGRkxGRkJRVkVzVTBGQlVTeEpRVUZGTEUxQlFVMHNVVUZCVVR0SlFVRkRMRlZCUVZNN1MwRkJReXhOUVVGTExFVkJRVVVzVVVGQlVUdExRVUZMTEUxQlFVczdTMEZCVlN4VlFVRlRMRU5CUVVNc1JVRkJSU3hUUVVGVE8wdEJRVVVzVjBGQlZTeEZRVUZGTEZGQlFWRTdTVUZCVXp0SlFVRkZMRzFDUVVGclFpeEZRVUZGTzBsQlFXdENMR05CUVdFc1JVRkJSVHRIUVVGWkxFTkJRVU1zUjBGQlJTeEZRVUZGTEd0Q1FVRnJRaXh0UWtGQmFVSXNSVUZCUlR0RlFVRlpPME5CUVVNc1ZVRkJVVHRGUVVGRExFMUJRVTBzU1VGQlNTeEhRVUZGTEUxQlFVMHNSMEZCUnl4UlFVRlJMRWRCUVVVc1RVRkJUU3hGUVVGRkxGRkJRVkVzUjBGQlJTeE5RVUZOTEZsQlFWa3NRMEZCUXp0RFFVRkRPMEZCUVVNN1FVRkJReXhsUVVGbExIVkNRVUYxUWl4SFFVRkZPME5CUVVNc1QwRkJUeXhOUVVGTkxESkNRVUV5UWl4RlFVRkRMR05CUVdFc1JVRkJSU3hoUVVGWkxFTkJRVU1zUjBGQlJTeE5RVUZOTEd0RFFVRnJRenRGUVVGRExHZENRVUZsTEVWQlFVVTdSVUZCWlN4dFFrRkJhMElzUlVGQlJUdERRVUZwUWl4RFFVRkRMRWRCUVVVc1JVRkJSU3hUUVVGUExGVkJRVkVzVFVGQlRTeDNRa0ZCZDBJN1JVRkJReXhSUVVGUE8wVkJRVWNzYlVKQlFXdENMRVZCUVVVN1JVRkJhMElzVVVGQlR6dERRVUZYTEVOQlFVTXNSMEZCUlN4TlFVRk5MREJDUVVFd1FqdEZRVUZETEZGQlFVOHNjVU5CUVhGRExFVkJRVVVzYlVKQlFXdENMRVZCUVVVN1JVRkJSU3h0UWtGQmEwSXNSVUZCUlR0RFFVRnBRaXhEUVVGRExFdEJRVWNzVFVGQlRTeHhRa0ZCY1VJN1JVRkJReXhSUVVGUExFVkJRVVU3UlVGQlR5eFhRVUZWTzBWQlFWY3NWMEZCVlN4RlFVRkZMR0ZCUVdFN1JVRkJWU3hUUVVGUkxFVkJRVU1zVVVGQlR5eEhRVUZGTzBOQlFVTXNRMEZCUXl4SFFVRkZMRVZCUVVNc1VVRkJUeXhIUVVGRk8wRkJRVU03UVVGQlF5eGxRVUZsTEdGQlFXRXNSMEZCUlR0RFFVRkRMRWxCUVVjc1JVRkJReXhSUVVGUExFZEJRVVVzYlVKQlFXdENMRTFCUVVjc1JVRkJSU3hSUVVGUExFbEJRVVVzUlVGQlJTeFBRVUZQTEZsQlFWVXNRMEZCUXp0RFFVRkZMRWxCUVVjc1RVRkJUU3d5UWtGQk1rSXNSVUZCUXl4alFVRmhMRVZCUVVVc1QwRkJUeXhoUVVGWkxFTkJRVU1zUjBGQlJTeEZRVUZGTEZOQlFVOHNVVUZCVHl4TlFVRk5MSGRDUVVGM1FqdEZRVUZETEU5QlFVMHNTVUZCUlN4SlFVRkZMRXRCUVVzN1JVRkJSU3hSUVVGUExFbEJRVVVzUzBGQlN5eEpRVUZGTzBWQlFVVXNiVUpCUVd0Q08wVkJRVVVzVVVGQlR5eEpRVUZGTEZkQlFWTTdSVUZCV1N4UFFVRk5MRWxCUVVVc1MwRkJTeXhKUVVGRkxFVkJRVVVzVDBGQlR6dERRVUZMTEVOQlFVTXNSMEZCUlN4TlFVRk5MREJDUVVFd1FqdEZRVUZETEZGQlFVOHNTVUZCUlN4dFEwRkJiVU1zUjBGQlJTeERRVUZETEVsQlFVVXNjVU5CUVhGRExFZEJRVVVzUTBGQlF6dEZRVUZGTEcxQ1FVRnJRanRGUVVGRkxFOUJRVTBzU1VGQlJTeExRVUZMTEVsQlFVVXNSVUZCUlN4UFFVRlBPME5CUVVzc1EwRkJRenROUVVGTk8wVkJRVU1zU1VGQlNTeEpRVUZGTzBkQlFVTXNVVUZCVHp0SFFVRkZMRTlCUVUwc1JVRkJSU3hQUVVGUE8wVkJRVlU3UlVGQlJTeE5RVUZKTEVWQlFVVXNWVUZCVVN4RFFVRkRMRWxCUVVjc1RVRkJUU3h4UWtGQmNVSTdSMEZCUXl4UlFVRlBMRVZCUVVVN1IwRkJUeXhYUVVGVk8wZEJRVmNzVjBGQlZTeEZRVUZGTEU5QlFVOHNZVUZCWVR0SFFVRlZMRk5CUVZFN1JVRkJReXhEUVVGRE8wTkJRVU03UTBGQlF5eFBRVUZOTEVWQlFVTXNVVUZCVHl4RlFVRkRPMEZCUVVNN1FVRkRNMnhUTEdOQlFXTXNZVUZCWVR0QlFVTXpRaXhYUVVGWExHOUNRVUZ2UWl4SlFVRkpMR2REUVVGblF5eGhRVUZoSW4wPQo="
].join(""), "base64").toString("utf8");
const POST = qa(workflowCode, { namespace: "eve6576652d6167656e74" });
//#endregion
//#region .eve/builds/msk8aana-799c7610-a124-49d3-adaf-b7cd4daaf652/nitro/workflow/workflows-handler.mjs
var workflows_handler_default = async ({ req }) => {
	return await POST(req);
};
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
const findRoute = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/",
		method: "GET",
		handler: toEventHandler(_eve_route_default)
	}, $1 = {
		route: "/eve/v1/health",
		method: "GET",
		handler: toEventHandler(health_default$1)
	}, $2 = {
		route: "/eve/v1/health",
		method: "HEAD",
		handler: toEventHandler(health_default)
	}, $3 = {
		route: "/eve/v1/info",
		method: "GET",
		handler: toEventHandler(info_default)
	}, $4 = {
		route: "/eve/v1/session",
		method: "POST",
		handler: toEventHandler(session_default)
	}, $5 = {
		route: "/eve/v1/session/reset",
		method: "POST",
		handler: toEventHandler(reset_default)
	}, $6 = {
		route: "/eve/v1/session/clear",
		method: "POST",
		handler: toEventHandler(clear_default)
	}, $7 = {
		route: "/eve/v1/session/compact",
		method: "POST",
		handler: toEventHandler(compact_default)
	}, $8 = {
		route: "/.well-known/workflow/v1/flow",
		handler: toEventHandler(workflows_handler_default)
	}, $9 = {
		route: "/eve/v1/connections/:name/callback/:token",
		method: "GET",
		handler: toEventHandler(_token_default$2)
	}, $10 = {
		route: "/eve/v1/connections/:name/callback/:token",
		method: "POST",
		handler: toEventHandler(_token_default$1)
	}, $11 = {
		route: "/eve/v1/callback/:token",
		method: "POST",
		handler: toEventHandler(_token_default)
	}, $12 = {
		route: "/eve/v1/session/:sessionId",
		method: "POST",
		handler: toEventHandler(_sessionId_default)
	}, $13 = {
		route: "/eve/v1/session/:sessionId/cancel",
		method: "POST",
		handler: toEventHandler(cancel_default)
	}, $14 = {
		route: "/eve/v1/session/:sessionId/stream",
		method: "GET",
		handler: toEventHandler(stream_default)
	};
	return (m, p) => {
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		if (p === "/") {
			if (m === "GET") return { data: $0 };
		} else if (p === "/eve/v1/health") {
			if (m === "GET") return { data: $1 };
			if (m === "HEAD") return { data: $2 };
		} else if (p === "/eve/v1/info") {
			if (m === "GET") return { data: $3 };
		} else if (p === "/eve/v1/session") {
			if (m === "POST") return { data: $4 };
		} else if (p === "/eve/v1/session/reset") {
			if (m === "POST") return { data: $5 };
		} else if (p === "/eve/v1/session/clear") {
			if (m === "POST") return { data: $6 };
		} else if (p === "/eve/v1/session/compact") {
			if (m === "POST") return { data: $7 };
		} else if (p === "/.well-known/workflow/v1/flow") return { data: $8 };
		let s = p.split("/"), l = s.length;
		if (l > 1) {
			if (s[1] === "eve") {
				if (l > 2) {
					if (s[2] === "v1") {
						if (l > 3) {
							if (s[3] === "connections") {
								if (l > 5) {
									if (s[5] === "callback") {
										if (l === 7 || l === 6) {
											if (m === "GET") {
												if (l > 6) return {
													data: $9,
													params: {
														"name": s[4],
														"token": s[6]
													}
												};
											}
											if (m === "POST") {
												if (l > 6) return {
													data: $10,
													params: {
														"name": s[4],
														"token": s[6]
													}
												};
											}
										}
									}
								}
							} else if (s[3] === "callback") {
								if (l === 5 || l === 4) {
									if (m === "POST") {
										if (l > 4) return {
											data: $11,
											params: { "token": s[4] }
										};
									}
								}
							} else if (s[3] === "session") {
								if (l === 5 || l === 4) {
									if (m === "POST") {
										if (l > 4) return {
											data: $12,
											params: { "sessionId": s[4] }
										};
									}
								} else if (s[5] === "cancel") {
									if (l === 6) {
										if (m === "POST") return {
											data: $13,
											params: { "sessionId": s[4] }
										};
									}
								} else if (s[5] === "stream") {
									if (l === 6) {
										if (m === "GET") return {
											data: $14,
											params: { "sessionId": s[4] }
										};
									}
								}
							}
						}
					}
				}
			}
		}
	};
})();
const globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
const errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
const errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region .eve/builds/msk8aana-799c7610-a124-49d3-adaf-b7cd4daaf652/host/compiled-artifacts-workflow-world.mjs
const workflowWorld = await Br({ dataDir: resolveLocalWorkflowWorldDataDirectory(process.cwd()) });
validateWorkflowWorld({
	packageName: void 0,
	world: workflowWorld
});
yr(workflowWorld);
await vr();
await workflowWorld.start?.();
function installWorkflowWorldPlugin() {}
//#endregion
//#region #nitro/virtual/plugins
const plugins = [
	installCompiledArtifactsPlugin,
	installWorkflowWorldPlugin,
	sandboxShutdownPlugin
];
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const hooks = new HookableCore();
	const captureError = (error, errorCtx) => {
		const promise = hooks.callHook("error", error, errorCtx)?.catch?.((hookError) => {
			console.error("Error while capturing another error", hookError);
		});
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
			if (promise && typeof errorCtx.event.req.waitUntil === "function") errorCtx.event.req.waitUntil(promise);
		}
	};
	const h3App = createH3App({ onError(error, event) {
		captureError(error, { event });
		return error_handler_default(error, event);
	} });
	h3App.config.onRequest = (event) => {
		return hooks.callHook("request", event)?.catch?.((error) => {
			captureError(error, {
				event,
				tags: ["request"]
			});
		});
	};
	h3App.config.onResponse = (res, event) => {
		return hooks.callHook("response", res, event)?.catch?.((error) => {
			captureError(error, {
				event,
				tags: ["response"]
			});
		});
	};
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks,
		captureError
	};
}
function initNitroPlugins(app) {
	for (const plugin of plugins) try {
		plugin(app);
	} catch (error) {
		app.captureError?.(error, { tags: ["plugin"] });
		throw error;
	}
	return app;
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
const APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	initNitroPlugins(instance);
	return instance;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
const tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };

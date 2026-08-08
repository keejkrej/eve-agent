# Eve Agent

A terminal-first coding agent built on [Vercel Eve](https://eve.dev). It uses Eve's TUI and durable sessions while exposing a selected local repository through carefully scoped host tools, so it behaves more like `pi`/Claude Code than Eve's default isolated sandbox.

## What it can do

- Read, search, and precisely edit files in a selected local workspace
- Run Git, tests, builds, package managers, and other shell commands there
- Keep todos, compact long sessions, delegate investigation, and ask for approval
- Preserve a durable conversation and display reasoning/tool activity in Eve's TUI
- Approval-gate obviously destructive or external shell operations

## Requirements

- Node.js 24 or newer
- A supported model credential: ChatGPT subscription OAuth, xAI subscription OAuth, Ollama Cloud API key, or Vercel AI Gateway
- `git` and `rg` (ripgrep) on the host for the best experience

## Install

```sh
vp i -g --node 24 'eve-agent@https://github.com/keejkrej/eve-agent/archive/refs/tags/v0.1.6.tar.gz'
```

## Development setup

```sh
npm install
npm link
```

`npm install` ships a prebuilt `.output` artifact. The installed `eve-agent` command reuses it when its compiled model settings match; changing the model, reasoning, or speed rebuilds the artifact once and restarts the supervised server.

Choose one model provider:

### ChatGPT Plus/Pro subscription

```sh
eve-agent login chatgpt
eve-agent model chatgpt/gpt-5.6-sol
```

This opens OpenAI's OAuth flow and uses the ChatGPT Codex backend. A ChatGPT plan with Codex access is required; an OpenAI API key is not used.

### xAI SuperGrok or eligible X Premium subscription

```sh
eve-agent login xai
eve-agent model xai/grok-code-fast-1
```

This uses xAI's device authorization flow. Follow the displayed URL and code.

### Ollama Cloud

```sh
eve-agent login ollama-cloud
eve-agent model ollama-cloud/gpt-oss:120b
```

Enter an Ollama Cloud API key when prompted. `OLLAMA_API_KEY` can also supply it non-interactively.

### Optional Vercel AI Gateway

A Vercel account is **not required** for ChatGPT, xAI, or Ollama Cloud models. Eve Agent suppresses Eve's Vercel login and AI Gateway setup warnings in local TUI sessions. `/vc:login`, `/deploy`, and Gateway routing remain available if you intentionally choose to use Vercel.

```sh
cp .env.example .env.local
# Add AI_GATEWAY_API_KEY to .env.local, or link the project to Vercel.
eve-agent model gateway
```

Then run the agent from any repository:

```sh
cd ~/workspace/project-to-edit
eve-agent .
```

Or without `npm link`:

```sh
npm run agent -- ~/workspace/project-to-edit
```

The first successful provider login selects that provider's recommended model when no model is already selected. Inspect or change selection with:

```sh
eve-agent models
eve-agent model
eve-agent auth status
eve-agent --model xai/grok-code-fast-1 .  # one-run override
eve-agent logout chatgpt
```

Configuration and credentials are stored under `~/.config/eve-agent/`. Directories are mode `0700` and credential files mode `0600`. OAuth access tokens are refreshed automatically and a request receiving `401` is refreshed and retried once.

> **Provider caveat:** ChatGPT subscription OAuth uses a public-client flow and service endpoints based on [Earendil Works Pi](https://github.com/earendil-works/pi)'s `pi-coding-agent` implementation. The xAI device authorization implementation was informed by OpenCode. These provider endpoints are not stable public API contracts and may change or be restricted. Ensure your use complies with the providers' terms.

Run `/model` inside the Eve TUI to choose the model, thinking level, and Normal/Fast service tier. The model list is searchable: type any partial provider or model name to filter it. Fast maps to ChatGPT's priority service tier and is shown with `↯` in the footer. The selection is persisted; Eve waits for the rebuilt generation and refreshes the footer before returning control.

The project applies a narrow postinstall patch to Eve 0.30.8 so its built-in `/model` command opens this subscription-aware picker instead of the AI Gateway-only source editor. The same patch hides unsolicited Vercel-login and AI Gateway setup warnings for local use. `eve-agent model ...` remains available outside the TUI.

## TUI commands

Useful Eve commands include:

- `/model` — choose model, thinking level, and Normal/Fast tier
- `/traces` — inspect the local trace viewer
- `/compact` — compact a long session
- `/clear` or `/new` — clear model history
- `/reset` — start a fresh durable session
- `/cancel` — cancel the running turn
- `/help` — show all commands

## Security model

**Read this before use:** the authored `bash`, `read_file`, `write_file`, `edit_file`, `glob`, and `grep` tools run in the Eve application process against the selected host directory. `bash` therefore has your user account's permissions and can technically reach beyond that directory. The file-specific tools reject traversal and symlink escapes, while the system prompt instructs the model to remain inside the workspace. Dangerous command patterns such as `git push`, `git reset --hard`, recursive force deletion, publishing, and deployment require TUI approval.

This host bridge intentionally trades away Eve's default sandbox boundary to provide a local coding-agent experience. Use Eve's normal sandbox/clone workflow instead if you need strong isolation for untrusted tasks.

## Development

```sh
npm run dev
npm run typecheck
npm run build
npm run info
```

The coding behavior is in `agent/instructions.md`; host tools live under `agent/tools/`, and model/OAuth integration lives under `src/models/`. `scripts/patch-eve.mjs` installs the TUI integration and intentionally fails fast if a future Eve release changes the patched internals.

Before tagging a release, follow the packed global-install and subscription E2E gate in [docs/release-testing.md](docs/release-testing.md).

## Runtime plugins

Eve Agent discovers plugins when a session starts. Plugins are not installed into this application's dependencies and are not compiled as Eve extensions. Put a plugin file or directory in either:

- `<workspace>/.eve-agent/plugins/`
- `$EVE_AGENT_HOME/plugins/` (defaults to `~/.config/eve-agent/plugins/`)

Additional scan directories can be supplied through `EVE_AGENT_PLUGIN_PATHS`, separated with the platform path delimiter. A plugin directory can contain `index.mjs`, `index.js`, or `index.ts`, or declare a different entry and namespace in `package.json`:

```json
{
  "name": "@acme/eve-agent-example",
  "eveAgent": {
    "plugin": "./dist/plugin.mjs",
    "namespace": "example"
  }
}
```

The entry default-exports an async-capable registration function:

```js
export default function activate(api) {
  api.addInstructions("Use the echo tool when asked to repeat text.");
  api.registerTool("echo", {
    description: "Echo text",
    inputSchema: yourStandardSchema,
    execute: async ({ text }) => ({ text }),
  });
  api.on("session.completed", async (_event, context) => {
    // Dispose plugin-owned session resources.
  });
}
```

Tools are exposed as `<namespace>__<name>`. Prime Agent belongs in its own repository and can implement this interface as an external `prime` plugin; Eve Agent has no Prime Agent package dependency.

Plugins are trusted in-process code with the Eve server's host permissions. Review their source before placing or linking them into a scanned directory.

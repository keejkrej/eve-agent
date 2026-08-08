# Release testing

A release is not ready when only the source-tree tests pass. The distributable must also pass through Vite Plus's real global installer because it places packages in a path like `~/.vite-plus/packages/eve-agent#<uuid>/...`; the literal `#` has exposed runtime path bugs that a normal checkout cannot reproduce.

## Prerequisites

- Vite Plus (`vp`) with Node 24 available.
- Working credentials for every subscription provider being exercised. Authenticate with `eve-agent login chatgpt` and `eve-agent login xai` before replacing the installed version.
- A disposable Git workspace from which to launch the TUI. Do not run only from this repository.

Never publish or tag before every check below passes.

## 1. Source checks

From a clean checkout:

```sh
vp node ./node_modules/typescript/bin/tsc
vp node ./node_modules/tsx/dist/cli.mjs --test tests/*.test.ts
vp run build:release
```

The typecheck, every test, the Eve build, and `scripts/sync-runtime.mjs` must succeed. Confirm that `dist/runtime/` was regenerated and review the complete diff.

## 2. Pack and globally install the artifact

Pack the exact tree that will be released, then install that tarball—not the checkout—through Vite Plus:

```sh
PACK_DIR="$(mktemp -d)"
npm pack --pack-destination "$PACK_DIR"
TARBALL="$PACK_DIR/eve-agent-$(node -p "require('./package.json').version").tgz"
vp i -g --node 24 "$TARBALL"
```

Locate the installed package and verify that the test really covers a `#<uuid>` path:

```sh
find "$HOME/.vite-plus/packages" -path '*/lib/node_modules/eve-agent/package.json' -print
```

The active installation must be under `eve-agent#<uuid>`. If the package manager changes tracked metadata while packing, restore it and repack before release.

## 3. Startup, metadata, and two-turn conversation

From a disposable Git workspace, start the globally installed binary:

```sh
WORKSPACE="$(mktemp -d)"
git -C "$WORKSPACE" init
cd "$WORKSPACE"
eve-agent
```

Pass criteria:

1. The TUI starts without an unloadable-dependency or build error.
2. The footer names the configured model, reasoning level, priority state, and subscription provider; for example, `openai/gpt-5.6-sol@high` and `via chatgpt-sub`.
3. The `/eve/v1/info` endpoint on the port shown by the TUI reports the same model as the footer.
4. Send `Reply only with ALPHA_ONE_OK.` and wait for a completed assistant response.
5. In the same session send `Reply only with BETA_TWO_OK.` and wait for a completed assistant response.
6. Both strings must appear in assistant output and there must be no `MODEL_CALL_FAILED` message.

When automating the TUI, do not count echoed input as a response. In the rendered transcript, submitted prompts are marked `❯` or `│`, while assistant output is marked `▲`; assert the marker or otherwise wait until generation completes.

## 4. Model switching and runtime rebuilds

Exercise a switch to the other subscription provider and back:

```sh
eve-agent model xai/grok-4.5
eve-agent                 # repeat the startup and two-turn checks
eve-agent model chatgpt/gpt-5.6-sol
eve-agent                 # repeat the startup and two-turn checks
```

Each first launch after a switch must rebuild/reload successfully from the globally installed `#<uuid>` path. The footer and `/eve/v1/info` must change to the selected model, and both turns must complete on both providers.

## 5. Upgrade preservation

Build a tarball from the previous release tag in a temporary worktree, install it, then install the candidate over it:

```sh
PREVIOUS=v0.1.5
OLD_TREE="$(mktemp -d)"
OLD_PACK="$(mktemp -d)"
rmdir "$OLD_TREE"
git worktree add --detach "$OLD_TREE" "$PREVIOUS"
( cd "$OLD_TREE" && npm pack --pack-destination "$OLD_PACK" )

vp i -g --node 24 "$OLD_PACK"/*.tgz
# Configure/authenticate the old release if this is a fresh test home, then
# capture the state that the candidate must preserve.
shasum -a 256 "$HOME/.config/eve-agent/auth.json" \
  "$HOME/.config/eve-agent/config.json" > /tmp/eve-agent-config.before
vp i -g --node 24 "$TARBALL"
shasum -a 256 -c /tmp/eve-agent-config.before

git worktree remove "$OLD_TREE"
```

After the upgrade, repeat the ChatGPT startup and two-turn check. The saved model and credentials must be unchanged, the footer must report the candidate model accurately, and both turns must succeed.

## 6. Release gate

Immediately before tagging, rerun the source checks and confirm `git status --short` contains only intentional release changes. Record the artifact path and TUI logs in the release notes or handoff. Only then commit, tag, push, and verify the tag/archive contents.

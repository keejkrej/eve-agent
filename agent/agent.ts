import { defineAgent } from "eve";
import { readConfig } from "../src/models/auth-store.js";
import { resolveCustomModel } from "../src/models/providers.js";

const settings = await readConfig();
const configured = await resolveCustomModel(
  process.env.EVE_AGENT_MODEL_OVERRIDE ?? settings.model,
  { priority: settings.priority === true },
);
const model = configured && typeof configured === "object"
  ? configured.model
  : configured ?? "anthropic/claude-sonnet-5";
const modelContextWindowTokens = configured && typeof configured === "object"
  ? configured.modelContextWindowTokens
  : undefined;
const modelOptions = configured && typeof configured === "object"
  ? configured.modelOptions
  : undefined;

export default defineAgent({
  model,
  modelContextWindowTokens,
  modelOptions,
  reasoning: settings.reasoning ?? "high",
  compaction: { thresholdPercent: 0.75 },
});

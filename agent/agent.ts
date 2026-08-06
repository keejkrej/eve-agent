import { defineAgent } from "eve";
import { activeSettings } from "./lib/active-settings.generated.js";
import { resolveCustomModel } from "../src/models/providers.js";

const configured = await resolveCustomModel(
  process.env.EVE_AGENT_MODEL_OVERRIDE ?? activeSettings.model,
  { priority: activeSettings.priority },
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
  reasoning: activeSettings.reasoning,
  compaction: { thresholdPercent: 0.75 },
});

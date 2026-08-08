import { defineAgent } from "eve";
import { activeSettings } from "./lib/active-settings.generated.js";
import { resolveCustomModel } from "../src/models/providers.js";

const reasoningLevels = ["provider-default", "none", "minimal", "low", "medium", "high", "xhigh"] as const;
type ReasoningLevel = typeof reasoningLevels[number];
function isReasoningLevel(value: string | undefined): value is ReasoningLevel {
  return reasoningLevels.some((level) => level === value);
}

const reasoningOverride = process.env.EVE_AGENT_REASONING_OVERRIDE;
const reasoning = isReasoningLevel(reasoningOverride) ? reasoningOverride : activeSettings.reasoning;
const priority = process.env.EVE_AGENT_PRIORITY_OVERRIDE === undefined
  ? activeSettings.priority
  : process.env.EVE_AGENT_PRIORITY_OVERRIDE === "true";
const configured = await resolveCustomModel(
  process.env.EVE_AGENT_MODEL_OVERRIDE ?? activeSettings.model,
  { priority },
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
  reasoning,
  compaction: { thresholdPercent: 0.75 },
});

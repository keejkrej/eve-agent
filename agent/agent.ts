import { defineAgent, defineDynamic } from "eve";
import { resolveCustomModel } from "../src/models/providers.js";

export default defineAgent({
  model: defineDynamic({
    fallback: "anthropic/claude-sonnet-5",
    events: {
      "step.started": () => resolveCustomModel(process.env.EVE_AGENT_MODEL),
    },
  }),
  reasoning: "high",
  compaction: { thresholdPercent: 0.75 },
});

import { defineDynamic, defineInstructions } from "eve/instructions";
import { resolvePluginInstructions } from "../lib/plugins.js";

async function resolve(event: unknown, context: unknown) {
  const markdown = await resolvePluginInstructions(event, context);
  return markdown ? defineInstructions({ markdown }) : null;
}

export default defineDynamic({
  events: {
    "session.started": resolve,
    "turn.started": resolve,
  },
});

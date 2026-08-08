import { defineDynamic } from "eve/tools";
import { resolvePluginTools } from "../lib/plugins.js";

export default defineDynamic({
  events: {
    "session.started": () => resolvePluginTools(),
  },
});

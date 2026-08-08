import { defineHook } from "eve/hooks";
import { dispatchPluginHooks } from "../lib/plugins.js";

export default defineHook({
  events: {
    "*": (event, context) => dispatchPluginHooks(event, context),
  },
});

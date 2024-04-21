import Modules from "../lib/requiredModules";
import injectGuildInvite from "./GuildInvite";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectGuildInvite();
};

export default { applyInjections };

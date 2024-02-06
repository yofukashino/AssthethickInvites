import patchGuildInvite from "./GuildInvite";
export const applyInjections = (): void => {
  patchGuildInvite();
};

export default { applyInjections };

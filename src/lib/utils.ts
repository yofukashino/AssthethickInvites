import { i18n, util } from "replugged";
import { BoostUtils, GuildConstructors } from "./requiredModules";
import Types from "../types";
export const dateToHumanReadable = (date: string): string => {
  const RealDate = new Date(date);
  return RealDate.toLocaleString(i18n.locale, { dateStyle: "long", timeStyle: "short" });
};

export const mapGuildData = (rawGuild): Types.Guild => {
  const Guild = GuildConstructors.fromInviteGuild(rawGuild) as Types.Guild;
  Guild.premiumTier = BoostUtils.getGuildTierFromAppliedBoostCount(
    Guild.premiumSubscriberCount,
    Guild.id,
  ) as number;
  return Guild;
};

export default { ...util, dateToHumanReadable, mapGuildData };

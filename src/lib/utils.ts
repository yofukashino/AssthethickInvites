import { i18n, util, webpack } from "replugged";
import Modules from "./requiredModules";
import Types from "../types";
export const dateToHumanReadable = (date: string): string => {
  const RealDate = new Date(date);
  return RealDate.toLocaleString(i18n.locale, { dateStyle: "long", timeStyle: "short" });
};

export const mapGuildData = (rawGuild): Types.Guild => {
  const NewGuild = webpack.getFunctionBySource<(...props: unknown[]) => void>(
    Modules.GuildConstructors,
    "this.mfaLevel=",
  );
  const Guild = new NewGuild({
    id: rawGuild.id,
    name: rawGuild.name,
    description: rawGuild.description,
    icon: rawGuild.icon,
    splash: rawGuild.splash,
    banner: rawGuild.banner,
    features: rawGuild.features,
    verificationLevel: rawGuild.verification_level,
    vanityURLCode: rawGuild.vanity_url_code,
    premiumSubscriberCount: rawGuild.premium_subscription_count,
    nsfwLevel: rawGuild.nsfw_level,
    memberCount: rawGuild.approximate_member_count,
  }) as Types.Guild;

  Guild.premiumTier = (Modules.BoostUtils?.getGuildTierFromAppliedBoostCount(
    Guild.premiumSubscriberCount,
    Guild.id,
  ) ?? 0) as number;
  return Guild;
};

export default { ...util, dateToHumanReadable, mapGuildData };

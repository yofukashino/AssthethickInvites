import { webpack } from "replugged";
import Types from "../types";

export const ProfileActions = webpack.getByProps<Types.ProfileActions>("getUser", "fetchProfile");
export const UserProfile = webpack.getBySource<Types.UserProfile>("default.PROFILE_POPOUT");
export const { exports: GuildInvite } = webpack.getBySource(".getHeaderTextForInvite", {
  raw: true,
});

export const GuildConstructors = webpack.getByProps<Types.GuildConstructors>("fromInviteGuild");

export const BoostUtils = webpack.getByProps<Types.BoostUtils>("getGuildTierFromAppliedBoostCount");

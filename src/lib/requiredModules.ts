import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.ProfileActions ??= await webpack.waitForProps<Types.ProfileActions>(
    "getUser",
    "fetchProfile",
  );
  Modules.UserProfile = await webpack.waitForModule<Types.UserProfile>(
    webpack.filters.bySource("UserPopoutUpsellSource.USER_POPOUT"),
  );
  Modules.GuildInvite = await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource(".getHeaderTextForInvite"), {
      raw: true,
    })
    .then(({ exports }) => exports);

  Modules.GuildConstructors ??=
    await webpack.waitForProps<Types.GuildConstructors>("fromInviteGuild");

  Modules.BoostUtils ??= await webpack.waitForProps<Types.BoostUtils>(
    "getGuildTierFromAppliedBoostCount",
  );
};

export default Modules;

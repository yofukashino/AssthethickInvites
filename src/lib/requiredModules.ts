import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.ProfileActionsModule ??= await webpack
    .waitForModule<Types.GenericModule>(
      webpack.filters.bySource("setFlag: user cannot be undefined"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find ProfileActions Module");
    });

  Modules.ProfileActions ??= {
    acceptAgreements: webpack.getFunctionBySource(
      Modules.ProfileActionsModule,
      ".USER_ACCEPT_AGREEMENTS",
    ),
    fetchCurrentUser: webpack.getFunctionBySource(
      Modules.ProfileActionsModule,
      "CURRENT_USER_UPDATE",
    ),
    fetchProfile: webpack.getFunctionBySource(
      Modules.ProfileActionsModule,
      "USER_PROFILE_FETCH_START",
    ),
    getUser: webpack.getFunctionBySource(Modules.ProfileActionsModule, "USER_UPDATE"),
    setFlag: webpack.getFunctionBySource(
      Modules.ProfileActionsModule,
      "setFlag: user cannot be undefined",
    ),
  };

  Modules.UserProfile ??= await webpack
    .waitForModule<Types.UserProfile>(webpack.filters.bySource(".BITE_SIZE,user:"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find UserProfile Module");
    });

  Modules.GuildInvite = await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource(".GuildSplash,"), {
      raw: true,
      timeout: 10000,
    })
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find GuildInvite Module");
    });

  Modules.GuildConstructors ??= await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource("this.mfaLevel="), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find GuildConstructors Module");
    });

  Modules.BoostUtilsModule ??= await webpack
    .waitForModule<Types.GenericModule>(
      webpack.filters.bySource(".numAvailableGuildBoostSlots++"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find BoostUtils Module");
    });

  Modules.BoostUtils ??= {
    getGuildTierFromAppliedBoostCount: webpack.getFunctionBySource(
      Modules.BoostUtilsModule,
      /return .\.\w+\.NONE}/,
    ),
    getShortenedTierName: webpack.getFunctionBySource(Modules.BoostUtilsModule, "{switch"),
    getTierName: webpack.getFunctionBySource(Modules.BoostUtilsModule, "{useLevels:"),
    getTiers: webpack.getFunctionBySource(Modules.BoostUtilsModule, "adding:"),
  };
};

export default Modules;

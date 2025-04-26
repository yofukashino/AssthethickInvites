import { webpack } from "replugged";
import Utils from "./utils";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.ProfileActions ??= await webpack
    .waitForModule<Types.DefaultTypes.RawModule>(
      webpack.filters.bySource("setFlag: user cannot be undefined"),
      {
        timeout: 10000,
        raw: true,
      },
    )
    .then((v) =>
      Utils.unmangleExports<Types.ProfileActions>(v, {
        acceptAgreements: ".USER_ACCEPT_AGREEMENTS",
        fetchCurrentUser: "CURRENT_USER_UPDATE",
        fetchProfile: "USER_PROFILE_FETCH_START",
        getUser: "USER_UPDATE",
        setFlag: "setFlag: user cannot be undefined",
      }),
    )
    .catch(() => {
      throw new Error("Failed To Find ProfileActions Module");
    });

  Modules.UserProfile ??= await webpack
    .waitForModule<Types.UserProfile>(webpack.filters.bySource("BotUserProfilePopout"), {
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
};

export default Modules;

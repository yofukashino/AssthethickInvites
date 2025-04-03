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
    premiumTier: rawGuild.premium_tier,
  }) as Types.Guild;

  return Guild;
};

export const isObject = (testMaterial: unknown): boolean =>
  typeof testMaterial === "object" && !Array.isArray(testMaterial) && testMaterial != null;

export const unmangleExports = <T>(
  moduleFilter: Types.DefaultTypes.Filter | Types.DefaultTypes.RawModule,
  map: Record<string, string | string[] | RegExp | Types.DefaultTypes.AnyFunction>,
): T => {
  const getExportKeyFinder = (
    mapValue: string | string[] | RegExp | Types.DefaultTypes.AnyFunction,
  ): Types.DefaultTypes.AnyFunction => {
    if (typeof mapValue === "function") {
      return (mod: Types.DefaultTypes.RawModule["exports"]) => {
        return mapValue(mod);
      };
    }

    if (Array.isArray(mapValue)) {
      return (mod: Types.DefaultTypes.RawModule["exports"]) => {
        if (!isObject(mod)) return "";
        for (const [k, exported] of Object.entries(mod)) {
          if (mapValue.every((p) => Object.hasOwnProperty.call(exported, p))) return k;
        }
      };
    }

    return (mod: Types.DefaultTypes.RawModule["exports"]) =>
      webpack.getFunctionKeyBySource(mod, mapValue as string);
  };

  const mod: Types.DefaultTypes.RawModule =
    typeof moduleFilter === "function"
      ? webpack.getModule(moduleFilter, { raw: true })
      : moduleFilter;

  if (!mod) return {} as T;

  const unmangled = {} as T;

  for (const key in map) {
    const findKey = getExportKeyFinder(map[key]);
    const valueKey = findKey(mod.exports) as string;
    Object.defineProperty(unmangled, key, {
      get: () => mod.exports[valueKey],
      set: (v) => {
        mod.exports[valueKey] = v;
      },
    });
  }

  return unmangled;
};

export default { ...util, dateToHumanReadable, mapGuildData, isObject, unmangleExports };

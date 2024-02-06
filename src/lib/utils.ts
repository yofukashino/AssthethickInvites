import { i18n, util } from "replugged";
import Types from "../types";
export const dateToHumanReadable = (date: string): string => {
  const RealDate = new Date(date);
  return RealDate.toLocaleString(i18n.locale, { dateStyle: "long", timeStyle: "short" });
};

export const mapGuildData = (rawGuild): Types.Guild =>
  Object.fromEntries(
    Object.entries(rawGuild).map(([name, value]) => [
      name.replace("url", "URL").replaceAll(/_(\w)/g, (_, char) => char.toUpperCase()),
      Array.isArray(value) ? new Set(value) : value,
    ]),
  ) as Types.Guild & { [name: string]: unknown };

export default { ...util, dateToHumanReadable, mapGuildData };

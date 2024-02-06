import { Category, SwitchItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const Settings = (): React.ReactElement => {
  return (
    <div>
      <Category title="Splash/Banner">
        <SwitchItem
          note="Wheather to show Banner/Splash Image on invite."
          {...Utils.useSetting(SettingValues, "showBanner", defaultSettings.showBanner)}>
          Show Image
        </SwitchItem>
        <SwitchItem
          note="Wheather to show Server banner instead of invite splash."
          {...Utils.useSetting(SettingValues, "inviteBanner", defaultSettings.inviteBanner)}>
          Invite Banner
        </SwitchItem>
        <SwitchItem
          note="Wheather to show Banner/Splash Image before everything in invite."
          {...Utils.useSetting(SettingValues, "onTop", defaultSettings.onTop)}>
          On Top
        </SwitchItem>
      </Category>
      <Category title="Details">
        <SwitchItem
          note="Wheather to server boost level on invite."
          {...Utils.useSetting(SettingValues, "boost", defaultSettings.boost)}>
          Boost Level
        </SwitchItem>
        <SwitchItem
          note="Wheather to server description on invite."
          {...Utils.useSetting(SettingValues, "description", defaultSettings.description)}>
          Server Description
        </SwitchItem>
        <SwitchItem
          note="Wheather to show expiry date of invite."
          {...Utils.useSetting(SettingValues, "expiry", defaultSettings.expiry)}>
          Invite expiry
        </SwitchItem>
        <SwitchItem
          note="Wheather to show Invite creator in invite."
          {...Utils.useSetting(SettingValues, "inviter", defaultSettings.inviter)}>
          Invite Creator
        </SwitchItem>
        <SwitchItem
          note="Wheather to server nsfw level on invite."
          {...Utils.useSetting(SettingValues, "nsfw", defaultSettings.nsfw)}>
          NSFW Level
        </SwitchItem>
        <SwitchItem
          note="Wheather to server verification level on invite."
          {...Utils.useSetting(SettingValues, "verification", defaultSettings.verification)}>
          Verification Level
        </SwitchItem>
      </Category>
      <SwitchItem
        note="A big green button in the end of invite."
        {...Utils.useSetting(SettingValues, "customButton", defaultSettings.customButton)}>
        BGB
      </SwitchItem>
    </div>
  );
};

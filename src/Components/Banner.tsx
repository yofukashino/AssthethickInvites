import { SettingValues } from "../index";
import consts from "../lib/consts";
import Types from "../types";

export default ({ Guild }: { Guild: Types.Guild }): React.ReactElement => {
  if (
    !SettingValues.get("showBanner", consts.defaultSettings.showBanner) ||
    !Guild?.features.has("INVITE_SPLASH") ||
    !Guild?.banner
  )
    return null;
  return (
    <div
      className={`${SettingValues.get("inviteBanner", consts.defaultSettings.inviteBanner) ? "assthethick-bannerSplash" : ""}`}>
      <img
        alt={`${Guild?.name} Banner`}
        className={`assthethick-banner${SettingValues.get("inviteBanner") ? " assthethick-bannerSplashImg" : ""}`}
        src={
          SettingValues.get("inviteBanner")
            ? `https://cdn.discordapp.com/banners/${Guild?.id}/${Guild?.banner}.${Guild?.banner.startsWith("a_") ? "gif" : "png"}?size=1024`
            : `https://cdn.discordapp.com/splashes/${Guild?.id}/${Guild?.splash}.${Guild?.splash.startsWith("a_") ? "gif" : "png"}?size=1024`
        }
      />
    </div>
  );
};

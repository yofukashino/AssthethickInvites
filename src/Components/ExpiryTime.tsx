import { Tooltip } from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";

export default ({
  Guild,
  Invite,
}: {
  Guild: Types.Guild;
  Invite: Types.Invite;
}): React.ReactElement => {
  if (
    !SettingValues.get("expiry", defaultSettings.expiry) ||
    !Object.prototype.hasOwnProperty.call(Invite, "expires_at")
  )
    return null;
  return (
    <Tooltip
      text={
        Invite?.expires_at == null
          ? Guild?.vanityURLCode === Invite?.code
            ? "Vanity Invite"
            : "Permanent Invite"
          : `Best Before ${Utils.dateToHumanReadable(Invite.expires_at)}`
      }>
      <img
        className="assthethick-badge assthethick-expiry"
        src="/assets/630f5938948131784285d97d57a3e8a0.svg"
      />
    </Tooltip>
  );
};

import { Tooltip } from "replugged/components";
import { SettingValues } from "../index";
import consts from "../lib/consts";
import Types from "../types";

export default ({ Guild }: { Guild: Types.Guild }): React.ReactElement => {
  if (
    !SettingValues.get("boost", consts.defaultSettings.boost) ||
    !Guild?.premiumTier ||
    Guild?.premiumTier <= 0
  )
    return null;
  return (
    <Tooltip text={`Level ${Guild?.premiumTier} Boosted`}>
      <img
        className="assthethick-badge assthethick-boostLevel"
        src="/assets/4a2618502278029ce88adeea179ed435.svg"
      />
    </Tooltip>
  );
};

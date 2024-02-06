import { Tooltip } from "replugged/components";
import { SettingValues } from "../index";
import consts from "../lib/consts";
import Types from "../types";

export default ({ Guild }: { Guild: Types.Guild }): React.ReactElement => {
  if (
    !SettingValues.get("nsfw", consts.defaultSettings.nsfw) ||
    !Guild?.verificationLevel ||
    Guild?.verificationLevel <= 0
  )
    return null;
  return (
    <Tooltip text={`Level ${Guild?.verificationLevel} Verification`}>
      <img
        className="assthethick-badge assthethick-verificationLevel"
        src="/assets/e62b930d873735bbede7ae1785d13233.svg"
      />
    </Tooltip>
  );
};

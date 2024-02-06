import { Tooltip } from "replugged/components";
import { SettingValues } from "../index";
import consts from "../lib/consts";
import Types from "../types";

export default ({ Guild }: { Guild: Types.Guild }): React.ReactElement => {
  if (
    !SettingValues.get("nsfw", consts.defaultSettings.nsfw) ||
    !Guild?.nsfwLevel ||
    Guild?.nsfwLevel <= 0
  )
    return null;
  return (
    <Tooltip text={`Level ${Guild?.nsfwLevel} NSFW`}>
      <img
        className="assthethick-badge assthethick-nsfwLevel"
        src="/assets/ece853d6c1c1cd81f762db6c26fade40.svg"
      />
    </Tooltip>
  );
};

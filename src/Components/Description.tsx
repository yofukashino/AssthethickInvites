import { Text } from "replugged/components";
import { SettingValues } from "../index";
import consts from "../lib/consts";
import Types from "../types";

export default ({ Guild }: { Guild: Types.Guild }): React.ReactElement => {
  if (!SettingValues.get("description", consts.defaultSettings.description) || !Guild?.description)
    return null;
  return <Text.Normal className="assthethick-description">{Guild?.description}</Text.Normal>;
};

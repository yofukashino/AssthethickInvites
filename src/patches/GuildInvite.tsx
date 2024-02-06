import { guilds as UltimateGuildStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { GuildInvite } from "../lib/requiredModules";
import BadgeContainer from "../Components/BadgeContainer";
import Utils from "../lib/utils";
import Types from "../types";
import consts from "../lib/consts";
import Banner from "../Components/Banner";
import Description from "../Components/Description";

export default (): void => {
  PluginInjector.after(
    GuildInvite,
    "default",
    ([{ guild, invite }]: [{ guild: Types.Guild; invite: Types.Invite }], res) => {
      guild ??= UltimateGuildStore.getGuild(invite.guild.id) ?? Utils.mapGuildData(invite.guild);
      const Container = Utils.findInReactTree(
        res,
        (c: Types.ReactTree) =>
          c?.type?.toString()?.includes("resolvingFakeButton") && Array.isArray(c.props.children),
      ) as Types.ReactTree;
      if (!Container?.props) return res;
      const ButtonIndex = Container.props.children.findIndex((c) =>
        Object.hasOwnProperty.call(c.props, "submitting"),
      );
      Container.props.children.splice(
        ButtonIndex ?? -1,
        0,
        <BadgeContainer Guild={guild} Invite={invite} />,
      );
      if (SettingValues.get("description", consts.defaultSettings.description))
        Container.props.children.push(<Description Guild={guild} />);
      if (SettingValues.get("customButton", consts.defaultSettings.customButton)) {
        const ButtonIndex = Container.props.children.findIndex((c) =>
          Object.hasOwnProperty.call(c.props, "submitting"),
        );
        const [Button] = Container.props.children.splice(ButtonIndex, 1) ?? [];
        Button.props.className = "assthethick-customButton";
        Container.props.children.push(Button);
      }
      res.props.children = res.props.children.filter(
        (c) => !c?.type?.toString()?.includes("inviteSplash"),
      );
      res.props.children.splice(
        SettingValues.get("onTop", consts.defaultSettings.onTop) ? 0 : ButtonIndex,
        0,
        <Banner Guild={guild} />,
      );
      return res;
    },
  );
};

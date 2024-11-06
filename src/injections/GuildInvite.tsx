import { guilds as UltimateGuildStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import Modules from "../lib/requiredModules";
import BadgeContainer from "../Components/BadgeContainer";
import Utils from "../lib/utils";
import Types from "../types";
import { defaultSettings } from "../lib/consts";
import Banner from "../Components/Banner";
import Description from "../Components/Description";
import { webpack } from "replugged";
import { Flex } from "replugged/components";

export default (): void => {
  const { GuildInvite } = Modules;
  const loader = webpack.getFunctionKeyBySource(GuildInvite, "GuildSplash");
  PluginInjector.after(
    GuildInvite,
    loader,
    ([{ guild, invite }]: [{ guild: Types.Guild; invite: Types.Invite }], res: Types.ReactTree) => {
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
      const headerFlex = (
        <Flex className="assthethick-HeaderFlex">
          {Container.props.children.shift()} <BadgeContainer Guild={guild} Invite={invite} />,
        </Flex>
      );
      Container.props.children.unshift(headerFlex);

      if (SettingValues.get("description", defaultSettings.description))
        Container.props.children.push(<Description Guild={guild} />);
      if (SettingValues.get("customButton", defaultSettings.customButton)) {
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
        SettingValues.get("onTop", defaultSettings.onTop) ? 0 : ButtonIndex,
        0,
        <Banner Guild={guild} />,
      );
      return res;
    },
  );
};

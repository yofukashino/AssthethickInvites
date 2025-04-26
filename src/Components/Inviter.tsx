import { webpack } from "replugged";
import { React, users as UltimateUserStore, components } from "replugged/common";
import { Clickable, Tooltip } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import Modules from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";
import Types from "../types";

export default ({ Invite }: { Invite: Types.Invite }): React.ReactElement => {
  const { ProfileActions, UserProfile } = Modules;
  const Popout = webpack.getFunctionBySource<Types.Popout>(
    components,
    "Unsupported animation config:",
  );
  const [user, setUser] = React.useState(
    UltimateUserStore.getUser(Invite?.inviter?.id) as Types.User,
  );
  React.useEffect(() => {
    const fetchInviter = async () => {
      try {
        await ProfileActions?.getUser(Invite?.inviter?.id);
      } catch (error) {
        PluginLogger.error(error);
      }
      setUser(UltimateUserStore.getUser(Invite?.inviter?.id) as Types.User);
    };
    if (Invite?.inviter?.id) fetchInviter();
  }, [Invite?.inviter?.id]);
  if (!SettingValues.get("inviter", defaultSettings.inviter) || !Invite?.inviter) return null;
  return (
    <Popout
      renderPopout={(props) =>
        user && UserProfile ? (
          <UserProfile
            {...props}
            currentUser={UltimateUserStore.getCurrentUser()}
            user={user ?? Invite?.inviter}
          />
        ) : (
          <></>
        )
      }
      position="right"
      animation={Popout.Animation.FADE}>
      {({ onClick }: { onClick: Types.DefaultTypes.AnyFunction }) => {
        return (
          <span>
            <Tooltip
              text={`Inviter: ${user?.displayName ?? Invite?.inviter?.global_name ?? user?.username ?? Invite?.inviter?.username}`}>
              <Clickable onClick={onClick}>
                <img
                  className="assthethick-badge assthethick-inviter"
                  src={user ? user?.getAvatarURL() : "/assets/5d6a5e9d7d77ac29116e.png"}
                />
              </Clickable>
            </Tooltip>
          </span>
        );
      }}
    </Popout>
  );
};

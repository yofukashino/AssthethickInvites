import { types } from "replugged";
import type util from "replugged/util";
import GeneralDiscordTypes from "discord-types/general";
export namespace Types {
  export import DefaultTypes = types;
  export type Guild = GeneralDiscordTypes.Guild;
  export type User = GeneralDiscordTypes.User & { displayName: string };
  export type UtilTree = util.Tree;
  export type UserProfile = React.MemoExoticComponent<
    React.ComponentType<{ userId: string; channelId?: string; guildId?: string }>
  >;
  export interface Invite {
    code: string;
    guild?: {
      banner: string;
      description: string;
      features: string[];
      icon: string;
      id: string;
      name: string;
      nsfw: false;
      nsfw_level: number;
      premium_subscription_count: number;
      splash: string;
      vanity_url_code: string;
      verification_level: number;
    };
    inviter: {
      accent_color?: string;
      avatar?: string;
      avatar_decoration_data?: Record<string, string>;
      banner?: string;
      banner_color?: string;
      discriminator?: string;
      flags?: string;
      global_name?: string;
      id?: string;
      premium_type?: number;
      public_flags?: number;
      username?: string;
    };
    expires_at?: null | string;
  }
  export interface ProfileActions {
    acceptAgreements: DefaultTypes.AnyFunction;
    fetchCurrentUser: DefaultTypes.AnyFunction;
    fetchMutualFriends: DefaultTypes.AnyFunction;
    fetchProfile: DefaultTypes.AnyFunction;
    getUser: DefaultTypes.AnyFunction;
    setFlag: DefaultTypes.AnyFunction;
  }
  export interface Popout
    extends React.ComponentClass<{
      align?: string;
      renderPopout: DefaultTypes.AnyFunction;
      children: DefaultTypes.AnyFunction;
      animation?: string;
      autoInvert?: boolean;
      nudgeAlignIntoViewport?: boolean;
      position?: string;
      positionKey?: string;
      spacing?: number;
    }> {
    Animation: {
      FADE: string;
      NONE: string;
      SCALE: string;
      TRANSLATE: string;
    };

    defaultProps: {
      animation: string;
      autoInvert: boolean;
      nudgeAlignIntoViewport: boolean;
      position: string;
      positionKey?: string;
      spacing: number;
    };
  }
  export type ReactTree = util.Tree & React.ReactElement;
  export interface Settings {
    showBanner: boolean;
    inviteBanner: boolean;
    description: boolean;
    expiry: boolean;
    inviter: boolean;
    nsfw: boolean;
    customButton: boolean;
    onTop: boolean;
  }
}
export default Types;

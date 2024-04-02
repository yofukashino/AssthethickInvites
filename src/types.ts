import { types } from "replugged";
import type util from "replugged/util";
import GeneralDiscordTypes from "discord-types/general";
export namespace Types {
  export import DefaultTypes = types;
  export type Guild = GeneralDiscordTypes.Guild;
  export type User = GeneralDiscordTypes.User & { displayName: string };
  export type UtilTree = util.Tree;
  export type UserProfile = React.MemoExoticComponent<
    React.ComponentType<{ user: User; channelId?: string; guildId?: string }>
  >;
  export interface BoostUtils {
    PerkIcons: DefaultTypes.AnyFunction;
    appliedGuildBoostsRequiredForPerks: DefaultTypes.AnyFunction;
    boostedGuildTierToAnalyticsObjectType: DefaultTypes.AnyFunction;
    generateBlockGuildSubscriptionPurchasesNode: DefaultTypes.AnyFunction;
    getAppliedGuildBoostsRequired: DefaultTypes.AnyFunction;
    getAvailableGuildBoostSlots: DefaultTypes.AnyFunction;
    getAvailableSoundboardSoundCount: DefaultTypes.AnyFunction;
    getAvailableStickerSlotCount: DefaultTypes.AnyFunction;
    getGracePeriodEndingDate: DefaultTypes.AnyFunction;
    getGuildTierFromAppliedBoostCount: DefaultTypes.AnyFunction;
    getIncrementalSoundboardSoundCountForTier: DefaultTypes.AnyFunction;
    getIncrementalStickerCountForTier: DefaultTypes.AnyFunction;
    getNextTier: DefaultTypes.AnyFunction;
    getNumberOfAppliedBoostsNeededForTier: DefaultTypes.AnyFunction;
    getShortenedTierName: DefaultTypes.AnyFunction;
    getTierName: DefaultTypes.AnyFunction;
    getTiers: DefaultTypes.AnyFunction;
    getTotalSoundboardSoundCountForTier: DefaultTypes.AnyFunction;
    getTotalStickerCountForTier: DefaultTypes.AnyFunction;
    isGuildBoostSlotCanceled: DefaultTypes.AnyFunction;
    isGuildBoostedAtLeast: DefaultTypes.AnyFunction;
    isInGracePeriod: DefaultTypes.AnyFunction;
    isTierUnlocked: DefaultTypes.AnyFunction;
    minimumRequiredTierForGuildFeature: DefaultTypes.AnyFunction;
  }
  export interface GuildConstructors {
    filterRoleDeletes: DefaultTypes.AnyFunction;
    fromBackgroundSync: DefaultTypes.AnyFunction;
    fromInviteGuild: DefaultTypes.AnyFunction;
    fromSerializedGuildRecord: DefaultTypes.AnyFunction;
    fromServer: DefaultTypes.AnyFunction;
    fromServerUpdate: DefaultTypes.AnyFunction;
    toServer: DefaultTypes.AnyFunction;
  }
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

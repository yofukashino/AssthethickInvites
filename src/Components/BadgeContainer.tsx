import Types from "../types";
import Boosts from "./Boosts";
import ExpiryTime from "./ExpiryTime";
import Inviter from "./Inviter";
import NsfwLevel from "./NsfwLevel";
import VerificationLevel from "./VerificationLevel";
export default ({
  Guild,
  Invite,
}: {
  Invite: Types.Invite;
  Guild: Types.Guild;
}): React.ReactElement | null => {
  return (
    <div className="assthethick-badgeContainer">
      <div className="assthethick-badgeContainerTop">
        <Boosts Guild={Guild} />
        <ExpiryTime Guild={Guild} Invite={Invite} />
      </div>
      <div className="assthethick-badgeContainerBottom">
        <Inviter Invite={Invite} />
        <NsfwLevel Guild={Guild} /> <VerificationLevel Guild={Guild} />
      </div>
    </div>
  );
};

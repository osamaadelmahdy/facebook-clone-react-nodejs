import "./rightbar.css";
import { Users } from "../../data";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Rightbar({ Profile }) {
  console.log(Profile);
  const { user } = useContext(AuthContext);

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>mostafa</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <>
              <li className="rightbarFriend" key={user.id}>
                <div className="container">
                  <img src={user.profilePicture} alt="" />
                  <span className="badge"></span>
                </div>
                <span className="friendName">{user.username}</span>
              </li>
            </>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    let i = 0;
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{Profile.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{Profile.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {Profile.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "marrid"
                : ""}
            </span>
          </div>
        </div>
        {Profile._id === user._id ? (
          <>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
              {Users.map((user) => {
                if (i > 8) {
                  return null;
                } else {
                  i++;
                }
                return (
                  <div key={user.id} className="rightbarFollowing">
                    <img
                      src={user.profilePicture}
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {user.username}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {Profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;

import "./rightbar.css";
import { Add, Remove } from "@material-ui/icons";
import { Users } from "../../data";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
function Rightbar({ Profile }) {
  const { user, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [friends, setFriends] = useState([]);
  console.log("profile", Profile);
  console.log("user", user);
  useEffect(() => {
    setFollowed(user.following.includes(Profile?._id));
  }, [user, Profile]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (Profile) {
          const friendList = await axios.get(
            `http://localhost:8080/api/users/friends/${Profile._id}`
          );
          setFriends(friendList.data);
        } else {
          const friendList = await axios.get(
            `http://localhost:8080/api/users/friends/${user._id}`
          );
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    console.log("friends", friends);
  }, [Profile]);

  const followHandle = async () => {
    try {
      if (followed) {
        console.log("followed");
        await axios.put(
          `http://localhost:8080/api/users/${Profile._id}/unfollow`,
          {
            id: user._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: Profile._id });
      } else {
        console.log("unfollowed");
        await axios.put(
          `http://localhost:8080/api/users/${Profile._id}/follow`,
          {
            id: user._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: Profile._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

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
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((user) => (
            <>
              <li className="rightbarFriend" key={user._id}>
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
        {Profile.username !== user.username && (
          <button className="rightBarFollow" onClick={followHandle}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}

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
              {friends.map((user) => {
                return (
                  <Link
                    to={"/profile/" + user._id}
                    style={{ textDecoration: "none" }}
                  >
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
                  </Link>
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

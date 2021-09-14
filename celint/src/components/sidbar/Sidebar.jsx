import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilled,
  RssFeed,
  School,
  WorkOutline,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidbar() {
  const [friends, setFriends] = useState([]);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const a = async () => {
      const listOfFriends = await axios.get(`http://localhost:8080/api/users`);
      setFriends(listOfFriends.data);
    };
    setTimeout(() => {
      console.log("friend", friends);
    }, 3000);
    a();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <div className="sidebarListItem">
                <RssFeed className="sidebarIcon" />
                <span className="sidebarListItemText">Feed</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="sidebarListItem">
                <Chat className="sidebarIcon" />
                <span className="sidebarListItemText">Chat</span>
              </div>
            </Link>
          </li>

          {more ? (
            <>
              <li className="sidebarListItem">
                <PlayCircleFilled className="sidebarIcon" />
                <span className="sidebarListItemText">Videos</span>
              </li>
              <li className="sidebarListItem">
                <Group className="sidebarIcon" />
                <span className="sidebarListItemText">Groups</span>
              </li>
              <li className="sidebarListItem">
                <Bookmark className="sidebarIcon" />
                <span className="sidebarListItemText">Bookmarks</span>
              </li>
              <li className="sidebarListItem">
                <HelpOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Question</span>
              </li>
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                <span className="sidebarListItemText">Jobs</span>
              </li>
              <li className="sidebarListItem">
                <Event className="sidebarIcon" />
                <span className="sidebarListItemText">Events</span>
              </li>
              <li className="sidebarListItem">
                <School className="sidebarIcon" />
                <span className="sidebarListItemText">Courses</span>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <button className="sidebarButton" onClick={() => setMore(!more)}>
          Show more
        </button>
        <hr className="sidebarHr" />
        <h4>All users</h4>
        <ul className="sidebarFriendList">
          {friends.map((f) => (
            <Link to={`/profile/${f._id}`} style={{ textDecoration: "none" }}>
              <li className="sidebarFriend">
                <img
                  src={
                    f.profilePicture
                      ? f.profilePicture
                      : "/assets/no-avatar.jpg"
                  }
                  alt=""
                  className="sidebarFriendImg"
                />
                <span className="sidebarFriendName" s>
                  {f.username}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidbar;

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
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidbar() {
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
        </ul>
        <button className="sidebarButton">Show more</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img
              src="/assets/person/2.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/3.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/1.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/2.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/3.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/5.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/6.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/7.jpg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">adel mahdy</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidbar;

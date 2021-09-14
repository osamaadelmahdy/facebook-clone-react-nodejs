import React, { useContext } from "react";
import "./topbar.css";

import Person from "@material-ui/icons/Person";
import { Chat, Notifications, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLift">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">OsamaSocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="SearchInput"
            placeholder="search for friend, post or video "
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              HomePage
            </Link>
          </span>
          <span className="topbarLink">
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              TimeLine
            </Link>
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIcon">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topbarIcon">
            <Chat />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topbarIcon">
            <Notifications />
            <span className="topBarIconBadge">1</span>
          </div>
        </div>
        <Link
          to={`/profile/${user._id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <img
            className="topbarImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/no-avatar.jpg"
            }
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}

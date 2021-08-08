import React from "react";
import "./topbar.css";

import Person from "@material-ui/icons/Person";
import { Chat, Notifications, Search } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLift">
        <span className="logo">OsamaSocial</span>
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
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">TimeLine</span>
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
        <img className="topbarImg" src="/assets/person/1.jpg" alt="" />
        {/* <div className="topbarName">
          <span className="topbarNameName">osama</span>
        </div> */}
      </div>
    </div>
  );
}

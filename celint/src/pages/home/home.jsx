import React from "react";
import Topbar from "../../components/topbar/topbar";
import Sidbar from "../../components/sidbar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidbar />
        <div className="home">
          <Feed />
          <Rightbar />
        </div>
      </div>
    </>
  );
}

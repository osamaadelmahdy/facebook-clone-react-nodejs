import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidbar from "../../components/sidbar/Sidebar";
import Topbar from "../../components/topbar/topbar";
import "./profile.css";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/assets/post/3.jpg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="/assets/person/1.jpg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="name">Osama Adel</h4>
              <p className="desc">i am still alive</p>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar Profile />
          </div>
        </div>
      </div>
    </>
  );
}

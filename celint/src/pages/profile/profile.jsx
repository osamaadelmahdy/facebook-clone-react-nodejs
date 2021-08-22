import { useContext, useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidbar from "../../components/sidbar/Sidebar";
import Topbar from "../../components/topbar/topbar";
import "./profile.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
export default function Profile() {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState([]);
  const { user: logedUser } = useContext(AuthContext);

  useEffect(() => {
    // console.log(logedUser);
    const fetchUser = async () => {
      const userData = await axios.get(`http://localhost:8080/api/users/${id}`);
      console.log("user", userData.data);
      setUser(userData.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                style={{}}
                className="profileCoverImg"
                src={user.profilePicture}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="name">{user.username}</h4>
              <p className="desc">{user.disc}</p>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed profile={user} />
            <Rightbar Profile={user} />
          </div>
        </div>
      </div>
    </>
  );
}

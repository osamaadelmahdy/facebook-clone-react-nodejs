import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ members, currentUser }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const friendId = members.find((m) => m !== currentUser._id);
    console.log(friendId);

    const getUser = async () => {
      const res = await axios(`http://localhost:8080/api/users/${friendId}`);
      setUser(res.data);
    };
    getUser();
    setTimeout(() => {
      console.log(user);
    }, 2000);
  }, []);
  return (
    <div className="conversation">
      {user ? (
        <>
          <img className="img" src={user.profilePicture} />
          <div className="name">{user.username}</div>
        </>
      ) : (
        "loading ..."
      )}
    </div>
  );
}

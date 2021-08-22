import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import axios from "axios";
// import { useLocation } from "react-router-dom";

export default function Share({ profile }) {
  console.log(profile);
  const descRef = useRef(null);
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    };
    axios.post(`http://localhost:8080/api/posts/`, newPost);
    descRef.current.value = "";
  };

  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={handleSubmit}>
        <div className="shareTop">
          <img src={user.profilePicture} alt="" className="shareProfileImg" />
          <input
            ref={descRef}
            type="text"
            className="shareInput"
            placeholder="What is in your mind"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareOptionIcon" />
              <span className="shareOptionText">Photo or video </span>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                accept=".png,.jpg,.jpeg"
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareOptionIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareOptionIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions
                htmlColor="goldenrod"
                className="shareOptionIcon"
              />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </div>
      </form>
    </div>
  );
}

import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import axios from "axios";
// import { useLocation } from "react-router-dom";

export default function Share({ profile }) {
  console.log(profile);
  const [file, setFile] = useState(null);
  const descRef = useRef(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log("newpost", newPost);
      try {
        await axios.post("http://localhost:8080/api/upload", data);
      } catch (err) {}
    }

    try {
      await axios.post(`http://localhost:8080/api/posts/`, newPost);
    } catch {}
    descRef.current.value = "";
    setFile(null);
  };

  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={handleSubmit}>
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/no-avatar.jpg"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            ref={descRef}
            type="text"
            className="shareInput"
            placeholder="What is in your mind"
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="fileUpload">
            <img src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancel" onClick={() => setFile(null)} />
          </div>
        )}

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
                onChange={(e) => setFile(e.target.files[0])}
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

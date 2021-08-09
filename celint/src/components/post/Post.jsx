import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./post.css";
import axios from "axios";
import { format } from "timeago.js";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get(
        `http://localhost:8080/api/users/${post.userId}`
      );
      setUser(userData.data);
      console.log(userData.data);
    };
    fetchUser();
  }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const PostV = () => {};
  return (
    <div className="post">
      <div className="postWrapper">
        {user ? (
          <>
            <div className="postTop">
              <div className="postTopLeft">
                <img
                  src={user.profilePicture || "/assets/no-avatar.jpg"}
                  alt=""
                  className="postProfileImg"
                />
                <span className="postUserName">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post.desc}</span>
              <img className="postImg" src={post?.img} alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img
                  src="/assets/like.png"
                  alt=""
                  className="likeIcon"
                  onClick={likeHandler}
                />
                {/* <img
              src="/assets/heart.png"
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            /> */}
                <span className="postLikeCounter">{like} pepole like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment} Comments</span>
              </div>
            </div>
          </>
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    </div>
  );
}

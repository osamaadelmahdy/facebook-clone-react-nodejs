import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import "./post.css";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState();
  const { user: logedUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get(
        `http://localhost:8080/api/users/${post.userId}`
      );
      setUser(userData.data);
      // console.log(userData.data);
      // console.log(post.likes.includes(userData.data._id));
      if (post.likes.includes(userData.data._id)) {
        setIsLiked(true);
      }
    };
    fetchUser();
  }, []);

  const likeHandler = async () => {
    try {
      await axios.put(`http://localhost:8080/api/posts/${post._id}/like`, {
        userId: logedUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        {user ? (
          <>
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user._id}`}>
                  <img
                    src={user.profilePicture || "/assets/no-avatar.jpg"}
                    alt=""
                    className="postProfileImg"
                  />
                </Link>
                <span className="postUserName">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post.desc}</span>
              <img className="postImg" src={`/images/${post?.img}`} alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                {isLiked ? (
                  <img
                    src="/assets/heart.png"
                    alt=""
                    className="likeIcon"
                    onClick={likeHandler}
                  />
                ) : (
                  <img
                    src="/assets/like.png"
                    alt=""
                    className="likeIcon"
                    onClick={likeHandler}
                  />
                )}
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

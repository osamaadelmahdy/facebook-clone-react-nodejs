import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
function Feed({ profile }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  // console.log("profile", profile._id, user._id);

  useEffect(() => {
    // console.log(user);
    const fetchPosts = async () => {
      const userPosts = !profile
        ? await axios.get(
            `http://localhost:8080/api/posts/timeline/${user._id}`
          )
        : await axios.get(
            `http://localhost:8080/api/posts/profile/${profile._id}`
          );

      // console.log(userPosts.data);
      setPosts(
        userPosts.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      console.log(posts);
    };
    fetchPosts();
  }, [profile]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {profile?._id === user?._id || profile === undefined ? (
          <Share profile={profile} />
        ) : (
          <></>
        )}

        {posts ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default Feed;

import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import axios from "axios";
function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const userPosts = await axios.get(
        "http://localhost:8080/api/posts/timeline/610965cc80088f2a74ee5c2d"
      );

      console.log(userPosts.data);
      setPosts(userPosts.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />

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

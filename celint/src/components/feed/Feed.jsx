import Post from "../post/Post";
import Share from "../share/share";
import "./feed.css";
import { Posts } from "../../data";
function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;

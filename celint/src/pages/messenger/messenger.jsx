import Conversation from "../../components/conversation/conversation";
import Messege from "../../components/messege/messege";
import Online from "../../components/online/online";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/topbar";
import "./messenger.css";

export default function Messenger() {
  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="menuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="boxWrapper">
            <div className="top">
              <Messege />
              <Messege own />
              <Messege />
              <Messege />
              <Messege own />
              <Messege />
            </div>
            <div className="bottom">
              <textarea
                className="messegeInput"
                name="messege"
                placeholder="Write something..."
              ></textarea>
              <button className="send">send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="onlineWrapper">
            <Online />
            <Online />
            <Online />
          </div>
        </div>
      </div>
    </>
  );
}

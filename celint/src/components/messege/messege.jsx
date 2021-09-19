import "./messege.css";
import { format } from "timeago.js";

export default function Messege({ message, own }) {
  return (
    <div className={own ? "messege own" : "messege"}>
      <div className="top">
        {own ? <img className="img" src={own.profilePicture} alt="" /> : ""}
        <p className="text">{message.text}</p>
      </div>
      <div className="bottom">{format(message.createdAt)}</div>
    </div>
  );
}

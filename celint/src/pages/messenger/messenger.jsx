import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Conversation from "../../components/conversation/conversation";
import Messege from "../../components/messege/messege";
import Online from "../../components/online/online";
import Topbar from "../../components/topbar/topbar";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import "./messenger.css";

export default function Messenger() {
  const [conversation, setconversation] = useState([]);
  const { user: logedUser } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [arrival, setArrival] = useState(null);

  const socket = useRef();

  const scrollRef = useRef();

  useEffect(() => {
    console.log("socket");
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      const m = {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };
      setArrival(m);
    });
  }, []);

  useEffect(() => {
    if (arrival) {
      currentChat?.members.includes(arrival.sender) &&
        setMessages((prev) => [...prev, arrival]);
    }
  }, [arrival, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", logedUser._id);
    socket.current.on("getUsers", (users) => {});
  }, [logedUser]);

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/conversation/${logedUser._id}`
      );
      setconversation(res.data);
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/message/${currentChat?._id}`
      );
      setMessages(res.data);
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: logedUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== logedUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: logedUser._id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `http://localhost:8080/api/message/`,
        message
      );
      setMessages([...messages, res.data]);
      setnewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="menuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversation.map((c) => {
              return (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation members={c.members} currentUser={logedUser} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="boxWrapper">
            {currentChat ? (
              <>
                <div className="top">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Messege
                        message={m}
                        own={m.sender === logedUser._id ? logedUser : false}
                      />
                    </div>
                  ))}
                </div>
                <div className="bottom">
                  <textarea
                    className="messegeInput"
                    name="messege"
                    placeholder="Write something..."
                    onChange={(e) => setnewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="send" onClick={handelSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <p className="noConversation">Open a conversation</p>
            )}
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

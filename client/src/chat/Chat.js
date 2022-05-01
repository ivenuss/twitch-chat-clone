import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./Chat.css";
import io from "socket.io-client";
import Message from "./Message";

const socket = io.connect("http://localhost:4000/");

function Chat({ user }) {
  const [connected, setConnected] = useState(false);
  const [state, setState] = useState({
    time: "",
    name: "",
    message: "",
    color: "",
  });
  const [chat, setChat] = useState([]);
  const [userColor, setUserColor] = useState("");

  socket.on("connect", () => {
    setConnected(true);
  });

  useEffect(() => {
    socket.on("message", ({ time, name, message, color }) => {
      setChat([...chat, { time, name, message, color }]);
    });
  });

  useEffect(() => {
    function getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    setUserColor(getRandomColor());
  }, []);

  const handleChange = (e) => {
    let date = new Date();

    setState({
      ...state,
      time: `${date.getHours()}:${date.getMinutes()}`,
      name: user.data[0].display_name,
      message: e.target.value,
      color: userColor,
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    const { time, name, message, color } = state;
    if (message.length > 0) {
      socket.emit("message", { time, name, message, color });
      setState({ time: "", name, message: "", color });
    }
  };

  const renderChat = () => {
    return chat.map(({ time, name, message, color }, index) => (
      <Message
        key={index}
        time={time}
        name={name}
        message={message}
        userColor={color}
      />
    ));
  };

  return (
    <div className="chat">
      <header>STREAM CHAT</header>
      <div className="chat__box">
        {connected && <div className="welcome">Welcome to the chat room!</div>}
        {renderChat()}
      </div>

      <div className="chat__input">
        {/* <TextareaAutosize
          placeholder="Send a message"
          rowsMax={5}
          value={state.message}
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
          /> */}
        <input
          placeholder="Send a message"
          value={state.message}
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
        />
        <div className="chat__input__footer">
          <button onClick={handleSend}>Chat</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

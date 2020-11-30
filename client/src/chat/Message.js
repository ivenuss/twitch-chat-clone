import React from "react";
import "./Message.css";

function Message({ time, name, message, userColor }) {
  return (
    <div className="message">
      <span className="time">{time}</span>
      <div className="username" style={{ color: userColor }}>
        {name}
      </div>
      <span className="separator">:</span>
      <span className="message-fragment">{message}</span>
    </div>
  );
}

export default Message;

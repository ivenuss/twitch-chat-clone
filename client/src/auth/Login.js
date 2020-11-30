import React from "react";
import "./Login.css";
import { loginUrl } from "../twitch";

function Login() {
  return (
    <div className="login">
      <div className="banner">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Twitch_logo_2019.svg"
          alt="Logo"
        />
        <a href={loginUrl}>
          <div className="login-btn">LOGIN</div>
        </a>
      </div>
    </div>
  );
}

export default Login;

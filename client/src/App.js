import React, { useState } from "react";
import "./App.css";
import Auth from "./auth/Auth";
import Login from "./auth/Login";
import Chat from "./chat/Chat";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      <Auth setUser={setUser} setToken={setToken} />
      {token ? <Chat user={user} /> : <Login />}
    </div>
  );
}

export default App;

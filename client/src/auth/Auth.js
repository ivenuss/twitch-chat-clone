import React, { useEffect } from "react";
import { getTokenFromUrl } from "../twitch";

function Auth({ setUser, setToken }) {
  const hash = getTokenFromUrl();

  const fetchUser = async (auth, clientId) => {
    return fetch("https://api.twitch.tv/helix/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Client-Id": clientId,
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    const _token = hash.access_token;
    window.location.hash = "";

    if (_token) {
      setToken(_token);
      fetchUser(_token, process.env.CLIENT_ID).then((w) => {
        setUser(w);
      });
    }
  }, [hash.access_token]);

  return <div></div>;
}

export default Auth;

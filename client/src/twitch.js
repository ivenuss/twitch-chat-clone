export const authEndpoint = "https://id.twitch.tv/oauth2/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = process.env.CLIENT_ID;

export const getTokenFromUrl = () => {
  return window.location.hash //pulling access token out from url
    .substring(1) //taking first string
    .split("&") //splits & symbol
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_read&force_verify=false`;

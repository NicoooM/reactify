import Cookies from "js-cookie";

const tokenHandler = () => {
  let token = Cookies.get("token");
  // Get the hash of the url
  if (token === undefined) {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    if (hash.access_token === undefined) {
      const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || "http://localhost/callback";

      const scopes = [
        "ugc-image-upload",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "streaming",
        "app-remote-control",
        "user-read-email",
        "user-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-read-private",
        "playlist-modify-private",
        "user-library-modify",
        "user-library-read",
        "user-top-read",
        "user-read-playback-position",
        "user-read-recently-played",
        "user-follow-read",
        "user-follow-modify",
      ];

      const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes.join(
        "%20"
      )}`;

      window.location = AUTH_URL;
    } else {
      Cookies.set("token", hash.access_token, { expires: 1 / 24 });
    }
  }
  return token;
};

export default tokenHandler;

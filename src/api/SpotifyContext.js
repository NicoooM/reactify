import tokenHandler from "./tokenHandler";
import SpotifyWebApi from "spotify-web-api-js";
import { createContext } from "react";
export const TokenContext = createContext();

const spotifyAPI = new SpotifyWebApi();

const SpotifyContext = (props) => {
  const token = tokenHandler();
  if (token) {
    spotifyAPI.setAccessToken(token);
  }
  return (
    <TokenContext.Provider value={{ spotifyAPI, token }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export default SpotifyContext;

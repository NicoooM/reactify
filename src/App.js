import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./pages/home/index.js";
import Router from "./router";
import SpotifyContext from "./api/SpotifyContext";

require("dotenv").config();

function App() {
  return (
    <SpotifyContext>
      <Router />
    </SpotifyContext>
  );
}

export default App;

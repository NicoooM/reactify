import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Albums from "./pages/albums";
import Album from "./pages/album";
import Artist from "./pages/artist";
import NotFound from "./pages/notFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/home" />;
          }}
        />
        <Route
          path="/callback"
          render={() => {
            return <Redirect to="/home" />;
          }}
        />
        <Route exact path="/home" component={Home} />
        <Route path="/artist" component={Artist} />
        <Route path="/albums" component={Albums} />
        <Route path="/album" component={Album} />
        <Route exact path="/about" component={About} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

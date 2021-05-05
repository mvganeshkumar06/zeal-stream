import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Navigation } from "../components";
import {
    Home,
    Library,
    Login,
    Playlist,
    Podcast,
    Podcasts,
    Subscriptions,
    Video,
    Videos,
} from "../pages";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Navigation />
            <Switch>
                <PrivateRoute path="/subscriptions">
                    <Subscriptions />
                </PrivateRoute>
                <PrivateRoute path="/playlist/:playlistId">
                    <Playlist />
                </PrivateRoute>
                <PrivateRoute path="/library">
                    <Library />
                </PrivateRoute>
                <Route path="/podcasts/:podcastId">
                    <Podcast />
                </Route>
                <Route path="/podcasts">
                    <Podcasts />
                </Route>
                <Route path="/videos/:videoId">
                    <Video />
                </Route>
                <Route path="/videos">
                    <Videos />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Navigation } from "../components";
import {
    Home,
    Library,
    Login,
    PlayList,
    Podcasts,
    Subscriptions,
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
                <PrivateRoute path="/playlist">
                    <PlayList />
                </PrivateRoute>
                <PrivateRoute path="/library">
                    <Library />
                </PrivateRoute>
                <Route path="/podcasts">
                    <Podcasts />
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

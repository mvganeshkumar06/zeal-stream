import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Navigation } from "../components";
import { Home, Library, PlayList, Subscriptions } from "../pages";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Navigation />
            <Switch>
                <Route path="/subscriptions">
                    <Subscriptions />
                </Route>
                <Route path="/playlist/:id">
                    <PlayList />
                </Route>
                <Route path="/library">
                    <Library />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;

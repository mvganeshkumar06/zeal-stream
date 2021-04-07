import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header, Navigation, NavigationDesktop } from "../components";
import { Home, Library, PlayList, Subscriptions } from "../pages";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Navigation />
            <NavigationDesktop />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/subscriptions">
                    <Subscriptions />
                </Route>
                <Route path="/library">
                    <Library />
                </Route>
                <Route path="/playlist/:id">
                    <PlayList />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;

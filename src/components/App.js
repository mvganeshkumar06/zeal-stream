import React from "react";
import { ZealProvider } from "@zeal-ui/core";
import StreamProvider from "../context/StreamProvider";
import Router from "../router/Router";

const App = () => {
    return (
        <ZealProvider>
            <StreamProvider>
                <Router />
            </StreamProvider>
        </ZealProvider>
    );
};

export default App;

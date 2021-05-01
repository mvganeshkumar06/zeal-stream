import React from "react";
import { ZealProvider } from "@zeal-ui/core";
import VideoProvider from "../context/VideoProvider";
import Router from "../router/Router";

const App = () => {
    return (
        <ZealProvider>
            <VideoProvider>
                <Router />
            </VideoProvider>
        </ZealProvider>
    );
};

export default App;

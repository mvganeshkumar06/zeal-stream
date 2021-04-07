import React from "react";
import ThemeProvider from "../context/ThemeProvider";
import VideoProvider from "../context/VideoProvider";
import Router from "../router/Router";

const App = () => {
    return (
        <ThemeProvider>
            <VideoProvider>
                <Router />
            </VideoProvider>
        </ThemeProvider>
    );
};

export default App;

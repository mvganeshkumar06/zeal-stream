import React, { useReducer } from "react";
import VideoContext from "./VideoContext";
import reducer from "../reducer/Reducer";

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        videos: [],
        playList: [
            {
                id: "1",
                name: "Watch Later",
                createdBy: "Zeal Stream",
                videos: [],
            },
        ],
        playListName: "",
    });

    return (
        <VideoContext.Provider value={{ state, dispatch }}>
            {children}
        </VideoContext.Provider>
    );
};

export default ProductProvider;

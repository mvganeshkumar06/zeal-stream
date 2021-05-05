import React, { useEffect, useReducer } from "react";
import StreamContext from "./StreamContext";
import reducer from "../reducer/Reducer";
import axios from "axios";

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        videos: [],
        video: {},
        podcasts: [],
        user: "",
        playlists: [],
        playlistName: "",
        isLoading: {
            videos: true,
            video: true,
            podcasts: true,
            user: false,
            playlists: true,
        },
        isError: {
            videos: false,
            video: false,
            podcasts: false,
            user: false,
            playlists: false,
        },
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({
            type: "SET_USER",
            payload: user,
        });
        const fetchVideos = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "https://zeal-stream.herokuapp.com/videos",
                });
                dispatch({
                    type: "SET_VIDEOS",
                    payload: response.data,
                });
            } catch (error) {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { videos: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { videos: false },
                });
            }
        };

        const fetchPodcasts = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "https://zeal-stream.herokuapp.com/podcasts",
                });
                dispatch({
                    type: "SET_PODCASTS",
                    payload: response.data,
                });
            } catch (error) {
                console.log(error.response?.data.errorMessage);
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { podcasts: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { podcasts: false },
                });
            }
        };
        fetchVideos();
        fetchPodcasts();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: `https://zeal-stream.herokuapp.com/users/${state.user.id}`,
                });
                dispatch({
                    type: "SET_PLAYLISTS",
                    payload: response.data.playlists,
                });
                dispatch({
                    type: "SET_SUBSCRIPTIONS",
                    payload: response.data.subscriptions,
                });
            } catch (error) {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { userDetails: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { userDetails: false },
                });
            }
        };

        if (state.user) {
            fetchUserDetails();
        } else {
            dispatch({
                type: "SET_PLAYLISTS",
                payload: [],
            });
            dispatch({
                type: "SET_SUBSCRIPTIONS",
                payload: [],
            });
        }
    }, [state.user]);

    return (
        <StreamContext.Provider value={{ state, dispatch }}>
            {children}
        </StreamContext.Provider>
    );
};

export default ProductProvider;

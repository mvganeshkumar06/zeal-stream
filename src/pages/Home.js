import React, { useState, useEffect, useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Home.module.css";
import { Video } from "../components";
import axios from "axios";
import VideoContext from "../context/VideoContext";
import createMockServer from "../server/mock-server";

createMockServer({ environment: "development" });

const Home = () => {
    const {
        state: { videos },
        dispatch,
    } = useContext(VideoContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        try {
            setIsLoading(true);
            const fetchData = async () => {
                const response = await axios({
                    method: "Get",
                    url: "/videos",
                });
                dispatch({
                    type: "SET_VIDEOS",
                    payload: response.data.videos,
                });
            };
            fetchData();
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    return (
        <div className={`align-items-col ${styles.homeContainer}`}>
            <div>
                {isLoading && (
                    <h2 className="alert alert-info">Loading videos...</h2>
                )}
                {isError && (
                    <h2 className="alert alert-danger">
                        Something went wrong !
                    </h2>
                )}
            </div>
            <div className={`grid grid-col-1 ${styles.videosContainer}`}>
                {videos.map((video) => {
                    return <Video currVideo={video} key={video.id} />;
                })}
            </div>
        </div>
    );
};

export default Home;

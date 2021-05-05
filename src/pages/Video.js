import React, { useEffect } from "react";
import { Container, Text } from "@zeal-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import useStreamContext from "../hooks/useStreamContext";

const Video = () => {
    const styles = `
        margin: 8rem 0rem;
    `;

    const { videoId } = useParams();
    const {
        state: { video },
        dispatch,
    } = useStreamContext();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: `https://zeal-stream.herokuapp.com/videos/${videoId}`,
                });
                dispatch({
                    type: "SET_VIDEO",
                    payload: response.data,
                });
            } catch (error) {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { video: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { video: false },
                });
            }
        };
        fetchVideoDetails();
    }, [dispatch, videoId]);

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">Video</Text>
            <iframe
                width="560"
                height="315"
                src={video?.videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Container>
    );
};

export default Video;

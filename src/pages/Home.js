import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner, Alert, Grid } from "@zeal-ui/core";
import { Video } from "../components";
import axios from "axios";
import VideoContext from "../context/VideoContext";

const Home = () => {
    const styles = `
        margin: 5rem 0rem;

        .videosContainer {
            width: 100%;
            grid-gap: 0.25rem;
        }

        @media (min-width: 475px) {
            .videosContainer {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {
            .videosContainer {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .videosContainer {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { videos },
        dispatch,
    } = useContext(VideoContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: "/videos",
                });
                dispatch({
                    type: "SET_VIDEOS",
                    payload: response.data.videos,
                });
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <Container type="col" width="100%" rowCenter customStyles={styles}>
            <Container>
                {isLoading && <Spinner />}
                {isError && <Alert type="danger">Something went wrong !</Alert>}
            </Container>
            <Grid col={1} className="videosContainer">
                {videos.map((video) => {
                    return <Video videoDetails={video} key={video.id} />;
                })}
            </Grid>
        </Container>
    );
};

export default Home;

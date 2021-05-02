import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner, Alert, Grid } from "@zeal-ui/core";
import { Video } from "../components";
import axios from "axios";
import VideoContext from "../context/VideoContext";

const Home = () => {
    const styles = `
        margin: 8rem 0rem;

        .videosContainer {
            grid-gap:5rem 1rem;
        }

        @media(min-width:600px){
            .videosContainer {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 900px) {
            .videosContainer {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 1200px) {
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
                    url: "https://zeal-stream.herokuapp.com/videos",
                });
                console.log(response.data);
                dispatch({
                    type: "SET_VIDEOS",
                    payload: response.data,
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
        <Container type="col" rowCenter customStyles={styles}>
            <Container>
                {isLoading && <Spinner />}
                {isError && <Alert type="danger">Something went wrong !</Alert>}
            </Container>
            <Container type="col" rowCenter width="90%">
                <Grid col={1} className="videosContainer">
                    {videos.map((video) => {
                        return <Video videoDetails={video} key={video._id} />;
                    })}
                </Grid>
            </Container>
        </Container>
    );
};

export default Home;

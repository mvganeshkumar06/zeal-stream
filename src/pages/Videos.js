import React from "react";
import { Container, Spinner, Alert, Grid } from "@zeal-ui/core";
import { Video } from "../components";
import useStreamContext from "../hooks/useStreamContext";

const Videos = () => {
    const styles = `
        margin: 8rem 0rem;

        .feedbackContainer{
            margin-bottom:2rem;
        }

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
        state: { videos, isLoading, isError },
    } = useStreamContext();

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Container type="col" className="feedbackContainer">
                {isLoading.videos && <Spinner />}
                {isError.videos && (
                    <Alert type="danger">Error while getting videos</Alert>
                )}
            </Container>
            {!isLoading.videos && !isError.videos && (
                <Container type="col" rowCenter width="90%">
                    <Grid col={1} className="videosContainer">
                        {videos.map((video) => {
                            return (
                                <Video videoDetails={video} key={video._id} />
                            );
                        })}
                    </Grid>
                </Container>
            )}
        </Container>
    );
};

export default Videos;

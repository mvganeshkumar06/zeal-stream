import React from "react";
import { Container, Spinner, Alert, Grid } from "@zeal-ui/core";
import { Podcast } from "../components";
import useStreamContext from "../hooks/useStreamContext";

const Podcasts = () => {
    const styles = `
        margin: 8rem 0rem;

        .feedbackContainer{
            margin-bottom:2rem;
        }

        .podcastsContainer {
            grid-gap:5rem 1rem;
        }

        @media(min-width:600px){
            .podcastsContainer {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 900px) {
            .podcastsContainer {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 1200px) {
            .podcastsContainer {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { podcasts, isLoading, isError },
    } = useStreamContext();

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Container type="col" className="feedbackContainer">
                {isLoading.podcasts && <Spinner />}
                {isError.podcasts && (
                    <Alert type="danger">Error while getting podcasts</Alert>
                )}
            </Container>
            {!isLoading.podcasts && !isError.podcasts && (
                <Container type="col" rowCenter width="90%">
                    <Grid col={1} className="podcastsContainer">
                        {podcasts.map((podcast) => {
                            return (
                                <Podcast
                                    podcastDetails={podcast}
                                    key={podcast._id}
                                />
                            );
                        })}
                    </Grid>
                </Container>
            )}
        </Container>
    );
};

export default Podcasts;

import React from "react";
import { Container, Grid, Text } from "@zeal-ui/core";
import { Video, Podcast } from "../components";
import useStreamContext from "../hooks/useStreamContext";
import { useParams } from "react-router";

const PlayList = () => {
    const styles = `    
        margin: 8rem 0rem;

        .streamContainer {
            width: 100%;
            grid-gap: 0.25rem;
        }

        @media (min-width: 475px) {
            .streamContainer {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {
            .streamContainer {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .streamContainer {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { playlists },
    } = useStreamContext();

    const { playlistId } = useParams();

    const playlist = playlists.find((playlist) => playlist._id === playlistId);

    const { name, description, podcasts, videos } = playlist;

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">{name}</Text>
            {description && <Text>{description}</Text>}
            {podcasts.length > 0 && (
                <>
                    <Text type="subHeading">Podcasts</Text>
                    <Container type="col" rowCenter width="90%">
                        <Grid className="streamContainer">
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
                </>
            )}
            {videos.length > 0 && (
                <>
                    <Text type="subHeading">Videos</Text>
                    <Container type="col" rowCenter width="90%">
                        <Grid className="streamContainer">
                            {videos.map((video) => {
                                return (
                                    <Video
                                        videoDetails={video}
                                        key={video._id}
                                    />
                                );
                            })}
                        </Grid>
                    </Container>
                </>
            )}
        </Container>
    );
};

export default PlayList;

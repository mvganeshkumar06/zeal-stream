import React from "react";
import { Container, Grid, Divider, Text } from "@zeal-ui/core";
import { Video } from "../components";
import useStreamContext from "../hooks/useStreamContext";
import { useParams } from "react-router";

const PlayList = () => {
    const styles = `    
        margin: 8rem 0rem;

        .videosContainer {
            width: 100%;
            grid-gap: 0.25rem;
        }

        .videosCount {
            padding-left: 0.5rem;
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
        state: { playlist },
    } = useStreamContext();

    const { id } = useParams();

    const currPlaylist = playlist.find(
        (currPlaylist) => currPlaylist.id === id
    );

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">{currPlaylist.name}</Text>
            <span className="videosCount">
                {currPlaylist.videos.length} video(s)
            </span>
            <Divider />
            <Grid className="videosContainer">
                {currPlaylist.videos.map((video) => {
                    return <Video currVideo={video} key={video.id} />;
                })}
            </Grid>
        </Container>
    );
};

export default PlayList;

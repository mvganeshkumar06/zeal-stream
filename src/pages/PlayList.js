import React, { useContext } from "react";
import { Container, Grid, Divider, Text } from "@zeal-ui/core";
import { Video } from "../components";
import VideoContext from "../context/VideoContext";
import { useParams } from "react-router";

const PlayList = () => {
    const styles = `    
        width: 100%;
        margin: 5rem 0rem;

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
        state: { playList },
    } = useContext(VideoContext);

    const { id } = useParams();

    const currPlayList = playList.find(
        (currPlayList) => currPlayList.id === id
    );

    return (
        <Container type="col" rowCenter customStyles={styles}>
            <Text type="mainHeading">{currPlayList.name}</Text>
            <span className="videosCount">
                {currPlayList.videos.length} video(s)
            </span>
            <Divider />
            <Grid className="videosContainer">
                {currPlayList.videos.map((video) => {
                    return <Video currVideo={video} key={video.id} />;
                })}
            </Grid>
        </Container>
    );
};

export default PlayList;

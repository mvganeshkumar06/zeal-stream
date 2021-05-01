import React, { useContext } from "react";
import { Container, Grid, Button, Text } from "@zeal-ui/core";
import VideoContext from "../context/VideoContext";
import { Link } from "react-router-dom";

const Library = () => {
    const styles = `
        width: 100%;
        margin: 5rem 0rem;
        align-items: center;

        .playListContainer {
            width: 100%;
        }

        .playListCard {
            width: 90%;
            height: 6rem;
            padding: 0.5rem;
        }

        .viewPlayListBtn {
            padding: 0.25rem;
            margin-left: 0;
            margin-right: 0;
        }

        @media (min-width: 425px) {
            .playListContainer {
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 0rem 0rem;
            }
        }

        @media (min-width: 768px) {
            .playListContainer {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .playListContainer {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { playList },
    } = useContext(VideoContext);

    return (
        <Container type="col" customStyles={styles}>
            <Grid col={1} className="playListContainer">
                {playList.map(({ id, name, createdBy, videos }) => {
                    return (
                        <Container key={id} className="playListCard">
                            <Text>{name}</Text>
                            <Text>
                                {createdBy} | {videos.length} video(s)
                            </Text>
                            <Link to={`/playlist/${id}`}>
                                <Button className="viewPlayListBtn">
                                    View PlayList
                                </Button>
                            </Link>
                        </Container>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Library;

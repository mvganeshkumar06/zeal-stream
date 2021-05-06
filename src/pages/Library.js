import React, { useEffect } from "react";
import {
    Container,
    Grid,
    Button,
    Text,
    useStyleContext,
    useThemeContext,
    Alert,
    Spinner,
} from "@zeal-ui/core";
import useStreamContext from "../hooks/useStreamContext";
import { Link } from "react-router-dom";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

const Library = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        margin: 8rem 0rem;

        .mainHeading{
            margin-bottom:5rem;
        }

        .playlistIconWithHeading{
            width:2.5rem;
            height:2.5rem;
            margin-right:1rem;
            color:${style.colors.purple[2]};
        }

        .playlistContainer{
            grid-gap:2rem 1rem;
        }

        .playlistItem {
            width: 15rem;
            height:auto;
            padding: ${style.common.padding};
            padding-right:0rem;
            position:relative;
            border-radius:${style.common.borderRadius};
        }

        .playlistCover{
            background-color:${
                theme === "light" ? style.colors.gray[1] : style.colors.gray[3]
            };
            position:absolute;
            top:0rem;
            right:0rem;
            width:30%;
            height:100%;
        }

        .playlistName, .playlistCreator{
            margin:0rem;
        }

        .playlistCreator{
            font-size:0.85rem;
            color:${
                theme === "light" ? style.colors.gray[3] : style.colors.gray[2]
            };
        }

        .viewPlaylistBtn {
            padding: 0.25rem;
        }

        .playlistContentsLength{
            margin:0rem;
        }

        .playlistIcon{
            width:2rem;
            height:2rem;
        }

        @media (min-width: 600px) {
            .playlistContainer {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media(min-width:768px){
            .playlistItem{
                width:18rem;
            }
        }

        @media (min-width: 1024px) {
            .playlistContainer {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        @media (min-width: 1440px) {
            .playlistContainer {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { playlists, isLoading, isError },
        dispatch,
    } = useStreamContext();

    useEffect(() => {
        dispatch({
            type: "SET_IS_LOADING",
            payload: { playlists: false },
        });
    }, [dispatch]);

    return (
        <Container type="col" rowCenter width="100%" customStyles={styles}>
            <Text type="mainHeading" className="mainHeading">
                Playlists
            </Text>
            {isError.playlists && (
                <Alert type="danger">Error while getting playlists</Alert>
            )}
            {isLoading.playlists ? (
                <Spinner />
            ) : (
                <Grid col={1} className="playlistContainer">
                    {playlists.map(
                        ({
                            _id,
                            name,
                            creator: { userName },
                            podcasts,
                            videos,
                        }) => {
                            return (
                                <Container
                                    type="col"
                                    key={_id}
                                    withBorder
                                    className="playlistItem"
                                >
                                    <Text bold className="playlistName">
                                        {name}
                                    </Text>
                                    <Text className="playlistCreator">
                                        {userName}
                                    </Text>
                                    <Container
                                        type="col"
                                        rowCenter
                                        colCenter
                                        className="playlistCover"
                                    >
                                        <Text className="playlistContentsLength">
                                            {podcasts.length + videos.length}
                                        </Text>
                                        <PlaylistPlayIcon className="playlistIcon" />
                                    </Container>
                                    <Link to={`/library/${_id}`}>
                                        <Button className="viewPlaylistBtn">
                                            View Playlist
                                        </Button>
                                    </Link>
                                </Container>
                            );
                        }
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default Library;

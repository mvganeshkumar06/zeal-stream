import React, { useState } from "react";
import {
    Container,
    Modal,
    Input,
    Text,
    Button,
    Checkbox,
    Divider,
    useStyleContext,
    useThemeContext,
} from "@zeal-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useStreamContext from "../hooks/useStreamContext";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";

const PlaylistModal = ({
    isOpen,
    onClose,
    streamDetails,
    isPodcast,
    isVideo,
}) => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `

        .divider{
            border-color:${theme === "light" ? "black" : "white"};
            margin:0.5rem 0rem;
        }

        .playlistModal{
            background-color:${
                theme === "light" ? style.colors.gray[2] : style.colors.gray[4]
            };
            color:${theme === "light" ? "black" : "white"};
            padding:0rem;
            border-color:${style.colors.gray[3]};
            display:flex;
            flex-direction:column;
            justify-content:space-between;
        }

        .closeBtn:hover, .deletePlaylistIcon:hover {
            cursor: pointer;
        }

        .createBtn {
            width: 4rem;
            padding: 0.25rem;
            margin: 1rem 0rem;
        }

        .playlistModalHeader, .playlistModalContent, .playlistModalFooter{
            padding:0.25rem 1rem;
        }

        .playlistModalFooter {
            position: relative;
        }
    `;

    const {
        state: { user, playlists },
        dispatch,
    } = useStreamContext();

    const isStreamInPlaylist = (stream, playlist) => {
        if (isVideo) {
            return playlist.videos.find((video) => video._id === stream._id);
        }
        if (isPodcast) {
            return playlist.podcasts.find(
                (podcast) => podcast._id === stream._id
            );
        }
    };

    const [playlistName, setPlaylistName] = useState("");

    const history = useHistory();

    const videoMatch = useRouteMatch("/videos/:videoId");
    const videosMatch = useRouteMatch("/videos");
    const podcastMatch = useRouteMatch("/podcasts/:podcastId");
    const podcastsMatch = useRouteMatch("/podcasts");

    const getPathAfterLogin = () => {
        if (videoMatch) {
            return videoMatch.url;
        }
        if (videosMatch) {
            return videosMatch.url;
        }
        if (podcastMatch) {
            return podcastMatch.url;
        }
        if (podcastsMatch) {
            return podcastsMatch.url;
        }
        return "/";
    };

    const createPlaylist = () => {
        const createPlaylistOnDb = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: `https://zeal-stream.herokuapp.com/playlists/${user.id}`,
                    data: {
                        name: playlistName,
                        creator: user.id,
                        videos: isVideo ? [streamDetails._id] : [],
                        podcasts: isPodcast ? [streamDetails._id] : [],
                    },
                });
                dispatch({
                    type: "UPDATE_PLAYLISTS",
                    payload: response.data,
                });
            } catch (error) {
                console.log(error.response?.data.errorMessage);
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { playlists: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { playlists: false },
                });
            }
        };
        if (user) {
            createPlaylistOnDb();
        } else {
            history.push("/login", { pathAfterLogin: getPathAfterLogin() });
        }
    };

    const updatePlaylist = (addToPlaylist, playlistId) => {
        const updatePlaylistOnDb = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: `https://zeal-stream.herokuapp.com/playlists/${user.id}/${playlistId}`,
                    data: {
                        addToPlaylist: addToPlaylist,
                        isVideo: isVideo ? true : false,
                        isPodcast: isPodcast ? true : false,
                        streamDetails: streamDetails,
                    },
                });
                dispatch({
                    type: "SET_PLAYLISTS",
                    payload: response.data,
                });
            } catch (error) {
                console.log(error.response?.data.errorMessage);
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { playlists: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { playlists: false },
                });
            }
        };
        if (user) {
            updatePlaylistOnDb();
        } else {
            history.push("/login", { pathAfterLogin: getPathAfterLogin() });
        }
    };

    return (
        <Container type="col" customStyles={styles}>
            <Modal
                width="18rem"
                height="25rem"
                center
                className="playlistModal"
                isOpen={isOpen}
            >
                <Container
                    type="row"
                    rowBetween
                    colCenter
                    className="playlistModalHeader"
                >
                    <Text bold>Add to playlist</Text>
                    <HighlightOffIcon onClick={onClose} className="closeBtn" />
                </Container>
                <Divider className="divider" />
                {playlists.length > 0 ? (
                    playlists.map((playlist) => {
                        return (
                            <Container
                                type="row"
                                colCenter
                                key={playlist._id}
                                className="playlistModalContent"
                            >
                                <Checkbox
                                    checked={
                                        isStreamInPlaylist(
                                            streamDetails,
                                            playlist
                                        )
                                            ? true
                                            : false
                                    }
                                    onChange={(event) => {
                                        updatePlaylist(
                                            event.target.checked,
                                            playlist._id
                                        );
                                    }}
                                >
                                    {playlist.name}
                                </Checkbox>
                            </Container>
                        );
                    })
                ) : (
                    <Text size="0.85rem">
                        No playlist exists, go ahead and create one !
                    </Text>
                )}
                <Divider className="divider" />
                <Container type="col" className="playlistModalFooter">
                    <Text bold>Create new playlist</Text>
                    <Container type="col" width="100%">
                        <Input
                            type="text"
                            placeholder="Enter playlist name"
                            value={playlistName}
                            onChange={(event) =>
                                setPlaylistName(event.target.value)
                            }
                        />
                        <Button
                            className="createBtn"
                            onClick={() => {
                                if (playlistName) {
                                    createPlaylist();
                                }
                                onClose();
                            }}
                        >
                            Create
                        </Button>
                    </Container>
                </Container>
            </Modal>
        </Container>
    );
};

export default PlaylistModal;

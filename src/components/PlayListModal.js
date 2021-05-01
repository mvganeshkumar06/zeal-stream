import React, { useContext } from "react";
import { Container, Modal, Label, Input, Text, Button } from "@zeal-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import VideoContext from "../context/VideoContext";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListModal = ({
    isPlayListModalOpen,
    setIsPlayListModalOpen,
    currVideo,
}) => {
    const styles = `
        .modalContainer {
            width: 15rem;
            height: 25rem;
        }

        .text {
            font-size: 1rem;
            font-weight: normal;
        }

        .modalHeader {
            justify-content: space-between;
        }

        .closeBtn:hover {
            cursor: pointer;
        }

        .createPlaylistContainer {
            width: 100%;
            margin-bottom: 10rem;
        }

        .createBtn {
            width: 4rem;
            padding: 0.25rem;
            margin: 1rem 0rem;
        }

        .modalFooter {
            flex-direction: column;
            padding: 0.75rem 0.5rem;
            position: relative;
        }

        .inputContainer {
            align-items: center;
        }

        label,
        input {
            font-size: 1rem;
        }

        label {
            margin: 0rem 0.25rem;
        }

        input {
            margin: 0rem 0.25rem;
            padding: 0.25rem;
        }
    `;

    const {
        state: { playList, playListName },
        dispatch,
    } = useContext(VideoContext);

    const isCurrVideoInCurrPlayList = (currVideo, currPlayList) => {
        return currPlayList.videos.find((video) => video.id === currVideo.id);
    };

    return (
        <Container type="col" customStyles={styles}>
            <Modal className="modalContainer">
                <Container className="modalHeader">
                    <Text type="subHeading">Add to playlist ...</Text>
                    <HighlightOffIcon
                        onClick={() =>
                            setIsPlayListModalOpen(!isPlayListModalOpen)
                        }
                        className="closeBtn"
                    />
                </Container>
                <Container className={`modal-content`}>
                    {playList.map((currPlayList) => {
                        return (
                            <Container
                                type="row"
                                className="inputContainer"
                                key={currPlayList.id}
                            >
                                <Input
                                    id={currPlayList.id}
                                    type="checkbox"
                                    name="playlist"
                                    checked={isCurrVideoInCurrPlayList(
                                        currVideo,
                                        currPlayList
                                    )}
                                    onChange={(event) =>
                                        dispatch({
                                            type: event.target.checked
                                                ? "ADD_TO_PLAYLIST"
                                                : "REMOVE_FROM_PLAYLIST",
                                            payload: {
                                                currPlayList,
                                                currVideo,
                                            },
                                        })
                                    }
                                />
                                <Label htmlFor={currPlayList.id}>
                                    {currPlayList.name}
                                </Label>
                                <span
                                    onClick={() =>
                                        dispatch({
                                            type: "DELETE_PLAYLIST",
                                            payload: currPlayList.id,
                                        })
                                    }
                                >
                                    <DeleteIcon />
                                </span>
                            </Container>
                        );
                    })}
                </Container>
                <Container className="modalFooter">
                    <Text className="text">Create New PlayList</Text>
                    <Container type="col" className="createPlaylistContainer">
                        <Label htmlFor="playlist-name">Name</Label>
                        <Input
                            id="playlist-name"
                            type="text"
                            placeholder="Enter playlist name"
                            value={playListName}
                            onChange={(event) =>
                                dispatch({
                                    type: "SET_PLAYLIST_NAME",
                                    payload: event.target.value,
                                })
                            }
                        />
                        <Button
                            className="createBtn"
                            onClick={() => {
                                if (playListName) {
                                    dispatch({
                                        type: "CREATE_PLAYLIST",
                                    });
                                }
                                setIsPlayListModalOpen(!isPlayListModalOpen);
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

export default PlayListModal;

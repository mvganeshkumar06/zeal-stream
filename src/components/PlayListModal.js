import React, { useContext } from "react";
import {
    Container,
    Modal,
    Label,
    Input,
    Text,
    Button,
    Checkbox,
    Divider,
} from "@zeal-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import StreamContext from "../context/StreamContext";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListModal = ({ isOpen, onClose, currVideo }) => {
    const styles = `
        .modalContainer {
            width: 15rem;
            height: 25rem;
        }

        .closeBtn:hover, .deletePlaylistIcon:hover {
            cursor: pointer;
        }

        .deletePlaylistIcon{
            margin-left:0.75rem;
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
    `;

    const {
        state: { playList, playListName },
        dispatch,
    } = useContext(StreamContext);

    const isCurrVideoInCurrPlayList = (currVideo, currPlayList) => {
        return currPlayList.videos.find((video) => video.id === currVideo.id);
    };

    return (
        <Container type="col" customStyles={styles}>
            <Modal className="modalContainer" isOpen={isOpen}>
                <Container type="row" rowBetween colCenter>
                    <Text>Add to playlist</Text>
                    <HighlightOffIcon onClick={onClose} className="closeBtn" />
                </Container>
                <Container type="col">
                    {playList ? (
                        playList.map((currPlayList) => {
                            return (
                                <Container
                                    type="row"
                                    colCenter
                                    key={currPlayList.id}
                                >
                                    <Checkbox
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
                                    <Text>{currPlayList.name}</Text>
                                    <DeleteIcon
                                        className="deletePlaylistIcon"
                                        onClick={() =>
                                            dispatch({
                                                type: "DELETE_PLAYLIST",
                                                payload: currPlayList.id,
                                            })
                                        }
                                    />
                                </Container>
                            );
                        })
                    ) : (
                        <Text>No playlist exists</Text>
                    )}
                </Container>
                <Divider />
                <Container className="modalFooter">
                    <Text>Create New PlayList</Text>
                    <Container type="col" className="createPlaylistContainer">
                        <Input
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

export default PlayListModal;

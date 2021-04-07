import React, { useContext } from "react";
import styles from "../css/PlayListModal.module.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import VideoContext from "../context/VideoContext";
import DeleteIcon from "@material-ui/icons/Delete";

const PlayListModal = ({
    isPlayListModalOpen,
    setIsPlayListModalOpen,
    currVideo,
}) => {
    const {
        state: { playList, playListName },
        dispatch,
    } = useContext(VideoContext);

    const isCurrVideoInCurrPlayList = (currVideo, currPlayList) => {
        return currPlayList.videos.find((video) => video.id === currVideo.id);
    };

    return (
        <div className={`modal-backdrop`}>
            <div className={`modal modal-center ${styles.container}`}>
                <div className={`modal-header ${styles.modalHead}`}>
                    <h2 className={`sub-heading-2`}>Add to playlist ...</h2>
                    <HighlightOffIcon
                        onClick={() =>
                            setIsPlayListModalOpen(!isPlayListModalOpen)
                        }
                        className={`${styles.closeBtn}`}
                    />
                </div>
                <div className={`modal-content`}>
                    {playList.map((currPlayList) => {
                        return (
                            <div
                                className={`align-items-row ${styles.inputContainer}`}
                                key={currPlayList.id}
                            >
                                <input
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
                                <label htmlFor={currPlayList.id}>
                                    {currPlayList.name}
                                </label>
                                <span
                                    className={`${styles.deleteBtn}`}
                                    onClick={() =>
                                        dispatch({
                                            type: "DELETE_PLAYLIST",
                                            payload: currPlayList.id,
                                        })
                                    }
                                >
                                    <DeleteIcon />
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className={`modal-footer ${styles.footer}`}>
                    <h2 className={`${styles.text}`}>Create New PlayList</h2>
                    <div
                        className={`align-items-col ${styles.createPlaylistContainer}`}
                    >
                        <label htmlFor="playlist-name">Name</label>
                        <input
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
                        <button
                            className={`btn ${styles.createBtn}`}
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
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayListModal;

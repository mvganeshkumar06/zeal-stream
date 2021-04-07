import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Library.module.css";
import VideoContext from "../context/VideoContext";
import { Link } from "react-router-dom";

const Library = () => {
    const {
        state: { playList },
    } = useContext(VideoContext);

    return (
        <div className={`align-items-col ${styles.playListContainer}`}>
            <div className={`grid grid-col-1 ${styles.playListItem}`}>
                {playList.map(({ id, name, createdBy, videos }) => {
                    return (
                        <div
                            key={id}
                            className={`card align-items-col ${styles.playListCard}`}
                        >
                            <span>{name}</span>
                            <span>
                                {createdBy} | {videos.length} video(s)
                            </span>
                            <Link to={`/playlist/${id}`}>
                                <button
                                    className={`btn ${styles.viewFullPlayListBtn}`}
                                >
                                    View PlayList
                                </button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Library;

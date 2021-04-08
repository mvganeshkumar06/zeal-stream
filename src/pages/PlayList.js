import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/PlayList.module.css";
import { Video } from "../components";
import VideoContext from "../context/VideoContext";
import { useParams } from "react-router";

const PlayList = () => {
    const {
        state: { playList },
    } = useContext(VideoContext);

    const { id } = useParams();

    const currPlayList = playList.find(
        (currPlayList) => currPlayList.id === id
    );

    return (
        <div className={`align-items-col ${styles.playListContainer}`}>
            <h1 className={`main-heading`}>{currPlayList.name}</h1>
            <p className={`${styles.videosCount}`}>
                {currPlayList.videos.length} video(s)
            </p>
            <span className={`divider`} />
            <div className={`grid grid-col-1 ${styles.videosContainer}`}>
                {currPlayList.videos.map((video) => {
                    return <Video currVideo={video} key={video.id} />;
                })}
            </div>
        </div>
    );
};

export default PlayList;

import React, { useState } from "react";
import "../css/DriftUI.css";
import styles from "../css/Video.module.css";
import { PlayListModal } from "./";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Video = ({ currVideo }) => {
    const { name, views, uploadTime } = currVideo;
    const [isPlayListModalOpen, setIsPlayListModalOpen] = useState(false);
    return (
        <div className={`card align-items-col ${styles.item}`}>
            <div className={`img img-row ${styles.img}`} />
            <span className={styles.duration}>02.40</span>
            <div className={`align-items-row ${styles.detailsContainer}`}>
                <span className={styles.channelAvatar} />
                <div className={styles.details}>
                    <span>{name}</span>
                    <span>
                        {uploadTime.slice(0, 1)} months ago | {views} K views
                    </span>
                </div>
                <MoreVertIcon
                    className={`${styles.moreIcon}`}
                    onClick={() => setIsPlayListModalOpen(!isPlayListModalOpen)}
                />
            </div>
            {isPlayListModalOpen && (
                <PlayListModal
                    isPlayListModalOpen={isPlayListModalOpen}
                    setIsPlayListModalOpen={setIsPlayListModalOpen}
                    currVideo={currVideo}
                />
            )}
        </div>
    );
};

export default Video;

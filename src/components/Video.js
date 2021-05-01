import React, { useState } from "react";
import { Container, Image, Text } from "@zeal-ui/core";
import { PlayListModal } from "./";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Video = ({ videoDetails }) => {
    const styles = `
        width: 80%;
        height: 15rem;
        font-size: 12px;
        position: relative;

        .img {
            width: 100%;
            height: 70%;
            position: absolute;
            top: 0;
            left: 0;
        }

        .detailsContainer {
            width: 95%;
            position: absolute;
            bottom: 0.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .detailsItem {
            display: flex;
            flex-direction: column;
            margin: 0rem 0.25rem;
        }

        .moreIcon {
            font-weight: bold;
        }

        .moreIcon:hover {
            cursor: pointer;
        }

        .duration {
            background-color: black;
            color: white;
            padding: 0.25rem;
            position: absolute;
            bottom: 30%;
            right: 2%;
        }

        .channelAvatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
        }

        @media (min-width: 475px) {
            .videoContainer {
                height: 18rem;
            }
        }

        @media (min-width: 768px) {
            .videoContainer {
                height: 20rem;
            }
        }
    `;

    const { name, views, uploadTime } = videoDetails;
    const [isPlayListModalOpen, setIsPlayListModalOpen] = useState(false);

    return (
        <Container type="col" customStyles={styles}>
            <Image className="img" />
            <span className="duration">02.40</span>
            <Container type="row" className="detailsContainer">
                <span className="channelAvatar" />
                <Container className="detailsItem">
                    <Text>{name}</Text>
                    <Text>
                        {uploadTime.slice(0, 1)} months ago | {views} K views
                    </Text>
                </Container>
                <MoreVertIcon
                    className="moreIcon"
                    onClick={() => setIsPlayListModalOpen(!isPlayListModalOpen)}
                />
            </Container>
            {isPlayListModalOpen && (
                <PlayListModal
                    isPlayListModalOpen={isPlayListModalOpen}
                    setIsPlayListModalOpen={setIsPlayListModalOpen}
                    videoDetails={videoDetails}
                />
            )}
        </Container>
    );
};

export default Video;

import React from "react";
import {
    Container,
    Image,
    Text,
    useStyleContext,
    useThemeContext,
    useNotify,
} from "@zeal-ui/core";
import { PlayListModal } from "./";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Video = ({ videoDetails }) => {
    const style = useStyleContext();
    const { theme } = useThemeContext();
    const styles = `
        width:16rem;
        height:12rem;
        position:relative;
        margin:0rem;

        .videoImage{
            width:100%;
            height:60%;
            margin:0rem;
        }

        .detailsContainer {
            position:absolute;
            top: 65%;
            margin:0rem;
        }

        .detailsItem{
            width:100%;
            margin:0rem 0.5rem;
        }

        .videoName{
            margin:0rem;
            font-size:0.85rem;
        }

        .videoInfo{
            margin:0rem;
            font-size:0.75rem;
            color:${
                theme === "light" ? style.colors.gray[3] : style.colors.gray[2]
            };
        }

        .moreIcon:hover {
            cursor: pointer;
        }

        .videoDuration {
            background-color: black;
            color: white;
            padding: 0.25rem;
            position: absolute;
            bottom: 6.5rem;
            right: 0.25rem;
            z-index:2;
            border-radius:0.25rem;
            font-size:0.75rem;
        }

        .channelAvatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            margin:0.25rem 0rem 0rem 0rem;
        }

        @media(min-width:375px){
            width:18rem;
            height:15rem;
        }

    `;

    const {
        name,
        imageUrl,
        streams,
        duration,
        uploadedDate,
        channel: { name: channelName, avatar },
    } = videoDetails;

    const { isOpen, onOpen, onClose } = useNotify();

    return (
        <Container type="col" customStyles={styles}>
            <Image
                src={imageUrl}
                alt="videoImage"
                width="auto"
                height="auto"
                className="videoImage"
            />
            <Text className="videoDuration">{duration}</Text>
            <Container type="row" width="100%" className="detailsContainer">
                <Image
                    src={avatar}
                    alt="channelAvatar"
                    className="channelAvatar"
                />
                <Container type="col" className="detailsItem">
                    <Text bold className="videoName">
                        {name}
                    </Text>
                    <Text className="videoInfo">{channelName}</Text>
                    <Text className="videoInfo">
                        {uploadedDate} | {streams} streams
                    </Text>
                </Container>
                <MoreVertIcon
                    className="moreIcon"
                    onClick={() => onOpen("PLAY_LIST_MODAL")}
                />
            </Container>
            <PlayListModal
                isOpen={isOpen}
                onClose={onClose}
                videoDetails={videoDetails}
            />
        </Container>
    );
};

export default Video;

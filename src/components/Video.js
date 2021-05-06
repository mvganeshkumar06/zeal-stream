import React from "react";
import {
    Container,
    Image,
    Text,
    useStyleContext,
    useThemeContext,
    useNotify,
} from "@zeal-ui/core";
import { PlaylistModal } from "./index";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

const Video = ({ videoDetails }) => {
    const style = useStyleContext();
    const { theme } = useThemeContext();
    const styles = `
        width:18rem;
        position:relative;
        margin:0rem;
        border-radius:${style.common.borderRadius};

        .videoImage{
            margin:0rem;
            border-radius:0rem;
            border-top-left-radius:${style.common.borderRadius};
            border-top-right-radius:${style.common.borderRadius};
        }

        .videoNameContainer{
            padding:0rem 0.25rem;
        }

        .videoName{
            margin:0.25rem 0rem 0rem 0rem;
            font-size:0.85rem;
        }

        .videoInfo{
            margin:0rem;
            font-size:0.75rem;
            color:${
                theme === "light" ? style.colors.gray[3] : style.colors.gray[2]
            };
        }

        .moreIcon{
            margin-top:0.25rem;
        }

        .moreIcon:hover {
            cursor: pointer;
        }

        .videoDetailsContainer{
            padding:0rem 0.25rem 0.25rem 0.25rem;
        }

        .videoDuration {
            background-color:black;
            color:white;
            font-weight:bold;
            padding: 0.25rem;
            position: absolute;
            bottom: 7.5rem;
            right: 0.25rem;
            z-index:2;
            border-radius:0.25rem;
            font-size:0.75rem;
        }

        .channelAvatar {
            border-radius: 50%;
            margin:0rem 1rem 0rem 0rem;
        }

        .menuList li{
            width:100%;
        }

        .addToPlaylistIcon{
            margin-right:0.5rem;
        }

        .listItem{
            width:100%;
            display:flex;
            align-items:center;
        }

        @media(min-width:375px){
            width:18rem;
        }

    `;

    const {
        _id,
        name,
        imageUrl,
        streams,
        duration,
        uploadedDate,
        channel: { name: channelName, avatar },
    } = videoDetails;

    const { isOpen, onOpen, onClose } = useNotify();

    return (
        <Container
            type="col"
            height="100%"
            withBorder
            colBetween
            customStyles={styles}
        >
            <Container type="col" height="100%">
                <Link to={`/videos/${_id}`}>
                    <Image
                        src={imageUrl}
                        alt="videoImage"
                        width="100%"
                        className="videoImage"
                    />
                </Link>
                <Text className="videoDuration">{duration}</Text>
                <Container
                    type="row"
                    width="100%"
                    rowBetween
                    className="videoNameContainer"
                >
                    <Link to={`/videos/${_id}`}>
                        <Text bold className="videoName">
                            {name}
                        </Text>
                    </Link>
                    <MoreVertIcon
                        className="moreIcon"
                        onClick={() => onOpen("PLAYLIST_MODAL")}
                    />
                </Container>
            </Container>
            <Container type="col" className="videoDetailsContainer">
                <Container type="row" colCenter>
                    <Image
                        src={avatar}
                        alt="channelAvatar"
                        width="2rem"
                        height="2rem"
                        className="channelAvatar"
                    />
                    <Text className="videoInfo">{channelName}</Text>
                </Container>
                <Text className="videoInfo">
                    {uploadedDate} | {streams} streams
                </Text>
            </Container>
            <PlaylistModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                streamDetails={videoDetails}
                isVideo
            />
        </Container>
    );
};

export default Video;

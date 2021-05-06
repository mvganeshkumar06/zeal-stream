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

const Podcast = ({ podcastDetails }) => {
    const style = useStyleContext();
    const { theme } = useThemeContext();
    const styles = `
        width:16rem;
        height:auto;
        margin:0rem;
        border-radius:${style.common.borderRadius};

        .podcastImageContainer{
            margin-right:0.5rem;
        }

        .podcastImage{
            margin:0rem;
            margin-right:1rem;
            border-top-right-radius:0rem;
            border-bottom-left-radius:0rem;
            border-bottom-right-radius:0rem;
        }

        .channelAvatar {
            border-radius: 50%;
            margin-right:1rem;
        }

        .podcastName{
            margin:0rem;
            font-size:0.85rem;
        }

        .podcastInfo{
            margin:0rem;
            font-size:0.75rem;
            color:${
                theme === "light" ? style.colors.gray[3] : style.colors.gray[2]
            };
        }
        
        .moreIcon:hover {
            cursor: pointer;
        }

        .podcastDuration {
            background-color:black;
            color:white;
            padding: 0.25rem 0rem;
            font-size:0.75rem;
            font-weight:bold;
            width:100%;
            margin:0rem;
            text-align:center;
            border-bottom-left-radius:${style.common.borderRadius};
        }

        @media(min-width:375px){
            width:20rem;
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
    } = podcastDetails;

    const { isOpen, onOpen, onClose } = useNotify();

    return (
        <Container type="row" customStyles={styles} withBorder>
            <Container
                type="col"
                width="70%"
                height="100%"
                className="podcastImageContainer"
            >
                <Link to={`/podcasts/${_id}`}>
                    <Image
                        src={imageUrl}
                        alt="podcastImage"
                        width="100%"
                        height="100%"
                        className="podcastImage"
                    />
                </Link>
                <Text className="podcastDuration">{duration}</Text>
            </Container>
            <Container type="col" width="100%" height="100%" colBetween>
                <Container type="row" width="100%" rowBetween>
                    <Link to={`/podcasts/${_id}`}>
                        <Text bold className="podcastName">
                            {name}
                        </Text>
                    </Link>
                    <MoreVertIcon
                        className="moreIcon"
                        onClick={() => onOpen("PLAYLIST_MODAL")}
                    />
                </Container>
                <Container type="col">
                    <Container type="row" colCenter>
                        <Image
                            src={avatar}
                            alt="channelAvatar"
                            width="2rem"
                            height="2rem"
                            className="channelAvatar"
                        />
                        <Text className="podcastInfo">{channelName}</Text>
                    </Container>
                    <Text className="podcastInfo">
                        {uploadedDate} | {streams} streams
                    </Text>
                </Container>
            </Container>
            <PlaylistModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                streamDetails={podcastDetails}
                isPodcast
            />
        </Container>
    );
};

export default Podcast;

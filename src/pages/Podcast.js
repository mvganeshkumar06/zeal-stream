import React, { useEffect } from "react";
import {
    Container,
    Text,
    Spinner,
    Alert,
    useNotify,
    useStyleContext,
    useThemeContext,
} from "@zeal-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import useStreamContext from "../hooks/useStreamContext";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { PlaylistModal } from "../components/index";

const Podcast = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();
    const styles = `
        margin: 8rem 0rem;

        .separator{
            width:0.5rem;
            height:0.5rem;
            margin:0rem 0.5rem;
        }

        .podcastContainer{
            width:90vw;
            border-radius:0.25rem;
            border-top-left-radius:0.75rem;
            border-top-right-radius:0.75rem;
        }

        .podcastFrame{
            width:100%;
            height:15rem;
        }

        .podcastDetailsContainer{
            width:100%;
            padding:0.5rem;
            box-sizing:border-box;
        }
       
        .podcastInfo{
            margin:0rem;
            font-size:0.85rem;
            color:${
                theme === "light" ? style.colors.gray[3] : style.colors.gray[2]
            };
        }
        
        .moreIcon{
            margin-top:0.5rem;
            margin-left:0.25rem;
        }

        .moreIcon:hover {
            cursor: pointer;
        }

        @media(min-width:768px){
            .podcastContainer{
                width:70vw;
            }    
        }
        
        @media(min-width:1024px){
            .podcastContainer{
                width:50vw;
            }    
        }

    `;

    const { podcastId } = useParams();
    const {
        state: { podcast, isLoading, isError },
        dispatch,
    } = useStreamContext();

    useEffect(() => {
        const fetchPodcastDetails = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: `https://zeal-stream.herokuapp.com/podcasts/${podcastId}`,
                });
                dispatch({
                    type: "SET_PODCAST",
                    payload: response.data,
                });
            } catch (error) {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { podcast: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { podcast: false },
                });
            }
        };
        fetchPodcastDetails();
    }, [dispatch, podcastId]);

    const { name, podcastUrl, streams, uploadedDate } = podcast;
    const { isOpen, onOpen, onClose } = useNotify();

    return (
        <Container type="col" rowCenter customStyles={styles}>
            {isError.podcast && (
                <Alert type="danger">Error while getting podcast</Alert>
            )}
            {isLoading.podcast ? (
                <Spinner />
            ) : (
                <>
                    <Container
                        type="col"
                        withBorder
                        className="podcastContainer"
                    >
                        <iframe
                            title={name}
                            src={podcastUrl}
                            className="podcastFrame"
                            frameBorder="0"
                            allow="encrypted-media"
                            // allowTransparency="true"
                        />
                        <Container
                            type="col"
                            className="podcastDetailsContainer"
                        >
                            <Container type="row" width="100%" rowBetween>
                                <Text bold>{name}</Text>
                                <MoreVertIcon
                                    className="moreIcon"
                                    onClick={() => onOpen("PLAYLIST_MODAL")}
                                />
                            </Container>
                            <Container type="row" colCenter>
                                <Text className="podcastInfo">
                                    {streams} views
                                </Text>
                                <FiberManualRecordIcon className="separator" />
                                <Text className="podcastInfo">
                                    {uploadedDate}
                                </Text>
                            </Container>
                        </Container>
                        <PlaylistModal
                            isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}
                            streamDetails={podcast}
                            isVideo
                        />
                    </Container>
                </>
            )}
        </Container>
    );
};

export default Podcast;

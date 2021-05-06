import React, { useEffect } from "react";
import {
    Container,
    Text,
    Spinner,
    Alert,
    useNotify,
    useThemeContext,
    useStyleContext,
} from "@zeal-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import useStreamContext from "../hooks/useStreamContext";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { PlaylistModal } from "../components/index";

const Video = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();
    const styles = `
        margin: 8rem 5%;

        .separator{
            width:0.5rem;
            height:0.5rem;
            margin:0rem 0.5rem;
        }

        .videoContainer{
            width:90vw;
            border-radius:0.25rem;
        }

        .videoFrame{
            width:100%;
            height:30vh;
        }

        .videoDetailsContainer{
            width:100%;
            margin-top:0.5rem;
            padding:0.5rem;
            box-sizing:border-box;
        }
       
        .videoInfo{
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

        @media(min-width:425px){
            .videoFrame{
                height:50vh;
            }
        }

        @media(min-width:768px){
            .videoContainer{
                width:70vw;
            }    
        }
        
        @media(min-width:1024px){
            .videoContainer{
                width:50vw;
            }    
        }
    `;

    const { videoId } = useParams();
    const {
        state: { video, isLoading, isError },
        dispatch,
    } = useStreamContext();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios({
                    method: "get",
                    url: `https://zeal-stream.herokuapp.com/videos/${videoId}`,
                });
                dispatch({
                    type: "SET_VIDEO",
                    payload: response.data,
                });
            } catch (error) {
                dispatch({
                    type: "SET_IS_ERROR",
                    payload: { video: true },
                });
            } finally {
                dispatch({
                    type: "SET_IS_LOADING",
                    payload: { video: false },
                });
            }
        };
        fetchVideoDetails();
    }, [dispatch, videoId]);

    const { name, videoUrl, streams, uploadedDate } = video;
    const { isOpen, onOpen, onClose } = useNotify();

    return (
        <Container type="col" rowCenter customStyles={styles}>
            {isError.video && (
                <Alert type="danger">Error while getting video</Alert>
            )}
            {isLoading.video ? (
                <Spinner />
            ) : (
                <>
                    <Container type="col" withBorder className="videoContainer">
                        <iframe
                            className="videoFrame"
                            src={videoUrl}
                            title={name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <Container type="col" className="videoDetailsContainer">
                            <Container type="row" width="100%" rowBetween>
                                <Text bold>{name}</Text>
                                <MoreVertIcon
                                    className="moreIcon"
                                    onClick={() => onOpen("PLAYLIST_MODAL")}
                                />
                            </Container>
                            <Container type="row" colCenter>
                                <Text className="videoInfo">
                                    {streams} views
                                </Text>
                                <FiberManualRecordIcon className="separator" />
                                <Text className="videoInfo">
                                    {uploadedDate}
                                </Text>
                            </Container>
                        </Container>
                    </Container>
                    <PlaylistModal
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        streamDetails={video}
                        isVideo
                    />
                </>
            )}
        </Container>
    );
};

export default Video;

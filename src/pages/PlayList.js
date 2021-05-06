import React from "react";
import { Container, Grid, Text, Divider } from "@zeal-ui/core";
import { Video, Podcast } from "../components";
import useStreamContext from "../hooks/useStreamContext";
import { useParams } from "react-router-dom";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const PlayList = () => {
    const styles = `    
        margin: 8rem 5%;

        .playlistHeader{
            margin-bottom:5rem;
        }

        .playlistNameContainer{
            position:relative;
        }

        .separator{
            width:0.5rem;
            height:0.5rem;
            margin:0rem 0.5rem;
        }
       
        .moreIcon{
            margin-left:1rem;
        }

        .moreIcon:hover{
            cursor:pointer;
        }

        .playlistDivider{
            margin:2rem 0rem;
        }

        .streamContainer {
            width: 100%;
            grid-gap: 0.25rem;
        }

        @media (min-width: 475px) {
            .streamContainer {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 768px) {
            .streamContainer {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 1024px) {
            .streamContainer {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    `;

    const {
        state: { playlists },
    } = useStreamContext();

    const { playlistId } = useParams();

    const playlist = playlists.find((playlist) => playlist._id === playlistId);

    const { name, description, podcasts, videos } = playlist;

    return (
        <Container type="col" customStyles={styles}>
            <Container type="col" width="100%" className="playlistHeader">
                <Container
                    type="row"
                    width="100%"
                    colCenter
                    className="playlistNameContainer"
                >
                    <Text type="mainHeading">{name}</Text>
                    <MoreVertIcon className="moreIcon" />
                </Container>
                <Container type="row" colCenter>
                    <Text>{podcasts.length} podcast(s)</Text>
                    <FiberManualRecordIcon className="separator" />
                    <Text> {videos.length} video(s)</Text>
                </Container>
                <Container type="row" colCenter>
                    <Text>
                        {description.length > 0
                            ? description
                            : "No playlist description"}
                    </Text>
                </Container>
            </Container>
            <Text type="subHeading">Podcasts</Text>
            {podcasts.length > 0 ? (
                <Grid className="streamContainer">
                    {podcasts.map((podcast) => {
                        return (
                            <Podcast
                                podcastDetails={podcast}
                                key={podcast._id}
                            />
                        );
                    })}
                </Grid>
            ) : (
                <Text>No podcasts in this playlist yet</Text>
            )}
            <Divider className="playlistDivider" />
            <Text type="subHeading">Videos</Text>
            {videos.length > 0 ? (
                <Grid className="streamContainer">
                    {videos.map((video) => {
                        return <Video videoDetails={video} key={video._id} />;
                    })}
                </Grid>
            ) : (
                <Text>No videos in this playlist yet</Text>
            )}
        </Container>
    );
};

export default PlayList;

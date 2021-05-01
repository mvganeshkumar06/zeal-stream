import React from "react";
import {
    Container,
    useThemeContext,
    Text,
    useStyleContext,
} from "@zeal-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HomeIcon from "@material-ui/icons/Home";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import { Link } from "react-router-dom";

const Header = () => {
    const style = useStyleContext();
    const { toggleTheme } = useThemeContext();

    const styles = `
        height: 4rem;
        position: fixed;
        top: 0;
        border-bottom: ${style.common.border};

        .zealStreamLink {
            display: none;
        }

        .title {
            font-size:1.25rem;
            margin:0rem 0rem 0rem 3rem;
        }

        .iconsContainer {
            margin: 0rem 1.5rem 0rem 0.5rem;
        }

        .iconItem{
            display:none;
        }

        .themeIconItem{
            display:flex;
        }

        .icon {
            width:1.5rem;
            height:1.5rem;
            margin: 0rem 0.5rem;
        }

        .icon:hover {
            cursor: pointer;
        }

        .iconText{
            display:none;
        }


        @media(min-width:768px){
            .title{
                font-size:1.25rem;
            }
            .iconItem{
                display:flex;
            }
            .icon {
                margin: 0rem 2rem;
            }
            .iconText{
                display:initial;
                margin:0rem;
                font-size:0.85rem;
            }
        }

        @media (min-width: 1024px) {
            .zealStreamLink {
                display: initial;
                margin-left: 2rem;
            }
            .zealStreamIcon {
                width: 2.5rem;
                height: 2.5rem;
                margin-left: 1.5rem;
            }
            .iconsContainer {
                margin-left: auto;
                margin-right: 5rem;
            }
            .title {
                font-size: 1.5rem;
                margin-left: 1rem;
            }
        }
    `;

    return (
        <Container
            type="row"
            rowBetween
            colCenter
            width="100%"
            customStyles={styles}
        >
            <Container type="row" rowCenter colCenter>
                <a
                    href="https://zeal-stream.netlify.app/"
                    className="zealStreamLink"
                >
                    <PlayCircleFilledWhiteIcon className="zealStreamIcon" />
                </a>
                <Text className="title">Zeal Stream</Text>
            </Container>
            <Container type="row" colCenter className="iconsContainer">
                <Container
                    type="col"
                    rowCenter
                    className="iconItem themeIconItem"
                >
                    <Brightness4Icon className="icon" onClick={toggleTheme} />
                    <Text className="iconText">Theme</Text>
                </Container>
                <Link to="/">
                    <Container type="col" rowCenter className="iconItem">
                        <HomeIcon className="icon" />
                        <Text className="iconText">Home</Text>
                    </Container>
                </Link>
                <Link to="/library">
                    <Container type="col" rowCenter className="iconItem">
                        <VideoLibraryIcon className="icon" />
                        <Text className="iconText">Library</Text>
                    </Container>
                </Link>
                <Link to="/subscriptions">
                    <Container type="col" rowCenter className="iconItem">
                        <SubscriptionsIcon className="icon" />
                        <Text className="iconText">Subscriptions</Text>
                    </Container>
                </Link>
            </Container>
        </Container>
    );
};

export default Header;

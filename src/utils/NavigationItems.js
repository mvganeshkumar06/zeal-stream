import HomeIcon from "@material-ui/icons/Home";
import MicIcon from "@material-ui/icons/Mic";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

const navigationItems = [
    {
        id: 1,
        name: "Home",
        url: "/",
        icon: <HomeIcon />,
    },
    {
        id: 2,
        name: "Podcasts",
        url: "/podcasts",
        icon: <MicIcon />,
    },
    {
        id: 3,
        name: "Videos",
        url: "/videos",
        icon: <VideocamIcon />,
    },
    {
        id: 4,
        name: "Library",
        url: "/library",
        icon: <VideoLibraryIcon />,
    },
    {
        id: 5,
        name: "Subscriptions",
        url: "/subscriptions",
        icon: <SubscriptionsIcon />,
    },
];

export default navigationItems;

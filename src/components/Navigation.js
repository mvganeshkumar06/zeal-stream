import React, { useState } from "react";
import {
    Container,
    List,
    ListItem,
    useStyleContext,
    useThemeContext,
} from "@zeal-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import navigationItems from "../utils/NavigationItems";
import PersonIcon from "@material-ui/icons/Person";
import useStreamContext from "../hooks/useStreamContext";

const Navigation = () => {
    const style = useStyleContext();
    const { theme } = useThemeContext();

    const styles = `
        .navigationListContainer {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            padding: 2rem 1rem;
            background-color:${
                theme === "light" ? style.colors.gray[1] : style.colors.gray[3]
            };
            z-index: ${style.zIndex[3]};
        }

        .navigationOpenBtn {
            width:1.5rem;
            height:1.5rem;
            position: fixed;
            top: 1.25rem;
            left: 0.5rem;
            z-index: ${style.zIndex[1]};
        }

        .navigationCloseBtn {
            width:1.5rem;
            height:1.5rem;
            position: absolute;
            top: 1.25rem;
            right: 0.5rem;
            z-index: ${style.zIndex[1]};
        }

        .navigationOpenBtn:hover,
        .navigationCloseBtn:hover {
            cursor: pointer;
        }

        .link{
            display:flex;
            align-items:column;
            margin:0rem;    
        }

        .link svg{
            width:1.5rem;
            height:1.5rem;
            margin-right:0.5rem;
        }

        @media (min-width: 1024px) {
            .navigationOpenBtn {
                display: none;
            }
        }
    `;

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

    const {
        state: { user },
        dispatch,
    } = useStreamContext();

    const logoutUser = () => {
        dispatch({
            type: "SET_USER",
            payload: "",
        });
        localStorage.removeItem("user");
    };

    return (
        <Container type="col" customStyles={styles}>
            <MenuIcon
                className="navigationOpenBtn"
                onClick={() => setIsNavigationOpen(!isNavigationOpen)}
            />
            {isNavigationOpen && (
                <Container className="navigationListContainer">
                    <HighlightOffIcon
                        className="navigationCloseBtn"
                        onClick={() => setIsNavigationOpen(!isNavigationOpen)}
                    />
                    <List type="link">
                        {navigationItems.map(({ id, name, url, icon }) => {
                            return (
                                <ListItem key={id}>
                                    <Link
                                        to={url}
                                        onClick={() => {
                                            setIsNavigationOpen(
                                                !isNavigationOpen
                                            );
                                        }}
                                        className="link"
                                    >
                                        {icon}
                                        {name}
                                    </Link>
                                </ListItem>
                            );
                        })}
                        <ListItem key={6}>
                            {user ? (
                                <span onClick={logoutUser} className="link">
                                    <PersonIcon />
                                    Logout
                                </span>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setIsNavigationOpen(!isNavigationOpen)
                                    }
                                    className="link"
                                >
                                    <PersonIcon />
                                    Login
                                </Link>
                            )}
                        </ListItem>
                    </List>
                </Container>
            )}
        </Container>
    );
};

export default Navigation;

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

        .list{
            list-style-type:none;
        }

        @media (min-width: 1024px) {
            .navigationOpenBtn {
                display: none;
            }
        }
    `;

    const [isNavigationOpen, setIsNavigationOpen] = useState(false);

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
                    <List className="list">
                        {navigationItems.map(({ id, name, url }) => {
                            return (
                                <ListItem key={id}>
                                    <Link
                                        to={url}
                                        onClick={() => {
                                            setIsNavigationOpen(
                                                !isNavigationOpen
                                            );
                                        }}
                                    >
                                        {name}
                                    </Link>
                                </ListItem>
                            );
                        })}
                    </List>
                </Container>
            )}
        </Container>
    );
};

export default Navigation;

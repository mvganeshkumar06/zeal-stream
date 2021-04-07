import React, { useContext } from "react";
import "../css/DriftUI.css";
import styles from "../css/Header.module.css";
// import { Link } from "react-router-dom";
// import VideoContext from "../context/VideoContext";
import ThemeContext from "../context/ThemeContext";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

const Header = () => {
    const { switchTheme } = useContext(ThemeContext);

    return (
        <div className={`align-items-row ${styles.container}`}>
            <div className="align-items-row center">
                <a
                    href="https://zeal-cart.netlify.app/"
                    className={styles.zealStreamIconLink}
                >
                    <PlayCircleFilledWhiteIcon
                        className={styles.zealCartIcon}
                        fontSize="large"
                    />
                </a>
                <span className={`text-bold ${styles.title}`}>Zeal Stream</span>
            </div>
            <div className={`align-items-row center ${styles.icons}`}>
                <span>
                    <Brightness4Icon
                        className={styles.themeIcon}
                        onClick={() => switchTheme()}
                    />
                </span>
            </div>
        </div>
    );
};

export default Header;

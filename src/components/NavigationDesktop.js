import React from "react";
import "../css/DriftUI.css";
import styles from "../css/NavigationDesktop.module.css";
import { Link } from "react-router-dom";
import navigationItems from "../utils/NavigationItems";

const NavigationDesktop = () => {
    return (
        <div className={`align-items-row ${styles.navContainer}`}>
            {navigationItems.map(({ id, name, url }) => {
                return (
                    <span key={id}>
                        <Link to={url}>{name}</Link>
                    </span>
                );
            })}
        </div>
    );
};

export default NavigationDesktop;

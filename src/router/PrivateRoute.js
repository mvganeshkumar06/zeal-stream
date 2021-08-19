import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import useStreamContext from "../hooks/useStreamContext";

const PrivateRoute = ({ children, ...rest }) => {
    const {
        state: { user },
    } = useStreamContext();

    const location = useLocation();

    if (user) {
        return <Route {...rest}>{children}</Route>;
    }

    return (
        <Redirect
            to={{
                pathname: "/login",
                state: { pathAfterLogin: location.pathname },
            }}
        />
    );
};

export default PrivateRoute;

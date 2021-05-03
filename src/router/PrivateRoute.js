import React from "react";
import { Route, Redirect } from "react-router-dom";
import useStreamContext from "../hooks/useStreamContext";

const PrivateRoute = ({ path, children, ...rest }) => {
    const {
        state: { user },
    } = useStreamContext();

    if (user) {
        return (
            <Route path={path} {...rest}>
                {children}
            </Route>
        );
    }

    return (
        <Redirect
            to={{
                pathname: "/login",
                state: { pathAfterLogin: path },
            }}
        />
    );
};

export default PrivateRoute;

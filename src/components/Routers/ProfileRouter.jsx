import {Redirect, Route} from "react-router-dom";
import React from "react";

function ProfileRoute({ children, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/profile",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProfileRoute;
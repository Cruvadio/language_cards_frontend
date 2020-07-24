import {Redirect, Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";


type Props = {
    isAuthenticate: boolean
}

const ProfileRoute : React.FC<Props & any> = ({ children, isAuthenticate, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !isAuthenticate ? (
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

let mapStateToProps = (state : RootState) => ({
    isAuthenticate: state.auth.isAuthenticate,
})

export default connect<Props, {}, {}, RootState>(mapStateToProps)(ProfileRoute);
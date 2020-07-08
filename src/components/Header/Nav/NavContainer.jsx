import React from 'react';
import {connect} from "react-redux";
import Nav from "./Nav";
import {logOut} from "../../../redux/reducers/auth_reducer";

let mapStateToProps = (state) => ({
    navData: state.header.navData,
    isAuthenticate: state.auth.isAuthenticate,
})




let NavContainer = connect(mapStateToProps, {logOut})(Nav)

export default NavContainer;
import React from 'react';
import {connect} from "react-redux";
import Nav from "./Nav";

let mapStateToProps = (state) => ({
    navData: state.header.navData,
})


let mapDispatchToProps = (dispatch) => ({

})


let NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default NavContainer;
import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {loginUser} from "../../redux/reducers/auth_reducer";


let mapStateToProps = (state) => ({

})

export default connect(null, {loginUser})(Login)
import {connect} from "react-redux";
import Nav from "./Nav";
import {userLogOut} from "../../../redux/reducers/auth_reducer";

let mapStateToProps = (state) => ({
    navData: state.header.navData,
    isAuthenticate: state.auth.isAuthenticate,
})



let NavContainer = connect(mapStateToProps, {userLogOut})(Nav)

export default NavContainer;
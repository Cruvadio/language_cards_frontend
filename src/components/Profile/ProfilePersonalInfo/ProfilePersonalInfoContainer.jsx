import React, {Component} from "react";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import {connect} from "react-redux";
import {getUser, setProfile, toggleFetching} from "../../../redux/reducers/profile-reducer";
import * as axios from "axios";
import {withRouter} from "react-router-dom";

class ProfilePersonalInfoContainer extends Component
{
    componentDidMount() {
        let user_id = this.props.match.params.user_id;
        if (!user_id) user_id = this.props.userID;
        this.props.getUser(user_id);
    }

    render() {
        return <ProfilePersonalInfo {...this.props}/>
    }
}


let mapStateToProps = (state) =>({
    profile: state.profile.profile,
    userID: state.auth.currentUser.userID,
    isFetching: state.profile.isFetching,
})

export default connect(mapStateToProps, {getUser})(withRouter(ProfilePersonalInfoContainer));
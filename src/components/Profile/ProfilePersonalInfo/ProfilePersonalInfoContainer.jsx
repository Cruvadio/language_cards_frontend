import React, {Component} from "react";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import {connect} from "react-redux";
import {getUser} from "../../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfilePersonalInfoContainer extends Component {
    componentDidMount() {
        let user_id = this.props.match.params.user_id;
        if (!user_id) user_id = this.props.userID;
        this.props.getUser(user_id);
    }


    render() {
        return <ProfilePersonalInfo {...this.props}/>
    }
}



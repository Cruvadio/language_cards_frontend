import React, {useEffect, useState} from 'react';
import s from './ProfilePersonalInfo.module.scss'
import Prelode from "../../common/Prelode/Prelode";
import {compose} from "redux";
import {connect} from "react-redux";
import {changeAvatar, editProfile, getUser, setEditingSuccess} from "../../../redux/reducers/profile-reducer";
import {NavLink, withRouter} from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import {Button} from "@material-ui/core";
import ProfileInfo from "./ProfileInfo";
import Grid from "@material-ui/core/Grid";
import ProfileInfoForm from "./ProfileInfoForm";


const ProfilePersonalInfo = (props) => {
    let {profile,
        isFetching,
        userID,
        getUser,
        isEditingSuccess,
        setEditingSuccess
    } = props;

    let [editMode, setEditMode] = useState(false);

    useEffect(() => {

        let user_id = props.match.params.user_id;
        if (!user_id) user_id = userID;
        getUser(user_id);

    }, [userID, props.match.params.user_id, getUser])

    if (isFetching || !profile)
        return <div className={s.prelode}><Prelode/></div>

    let reduceLanguages = (languages) => {
        return languages.reduce((p, item, index) => {
            return index !== 0 ? p + ", " + item : item
        }, "")
    }
    let isOwner = !props.match.params.user_id;
    let changeAvatar = (e) => {
        if (e.target.files.length)
            props.changeAvatar(e.target.files[0]);
    }

    if (editMode && isEditingSuccess)
        setEditMode(false);

    const handleClick = (e) =>
    {
        e.preventDefault();
        setEditMode(true);
        setEditingSuccess(false);
    }

    const handleSubmit = (formData) =>
    {
        console.log(formData);
        props.editProfile(formData);
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Profile
                    </Typography>
                </Toolbar>

                <Box className={s.inner}>
                    <ProfileAvatar profile={profile} owner={isOwner} onChange={changeAvatar}/>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={6}container direction="column">
                            <Typography variant="h5" className={s.userName}>{profile.user.username}</Typography>
                            <Typography
                                className={s.realUserName}> {profile.user.first_name + " " + profile.user.last_name}
                            </Typography>
                        </Grid>
                        <Grid item><Button color="primary" onClick={handleClick}>Edit</Button></Grid>
                    </Grid>

                    {editMode ? <ProfileInfoForm initialValues={profile} onSubmit={handleSubmit}/> :
                        <ProfileInfo profile={profile} reduceLanguages={reduceLanguages(profile.languages_know)}
                        reduceLanguages1={reduceLanguages(profile.languages_learn)}/>
                    }

                </Box>
            </AppBar>
        </div>


    )
}

let mapStateToProps = (state) => ({
    profile: state.profile.profile,
    userID: state.auth.currentUser.userID,
    isFetching: state.profile.isFetching,
    isEditingSuccess: state.profile.isEditingSuccess,
})


export default compose(
    connect(mapStateToProps, {getUser, changeAvatar, setEditingSuccess, editProfile}),
    withRouter
)(ProfilePersonalInfo)

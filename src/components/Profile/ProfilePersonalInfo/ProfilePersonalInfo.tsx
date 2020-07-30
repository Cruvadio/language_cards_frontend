import React, {useEffect, useState} from 'react';
import s from './ProfilePersonalInfo.module.scss'
import Prelode from "../../common/Prelode/Prelode";
import {connect} from "react-redux";
import {actions, changeAvatar, editProfile, getUser} from "../../../redux/reducers/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import ProfileInfo from "./ProfileInfo";
import Grid from "@material-ui/core/Grid";
import ProfileInfoForm, {FormDataType} from "./ProfileInfoForm";
import {ProfileType} from "../../../types/global";
import {RootState} from "../../../redux/store";


type MapStateProps = {
    profile: ProfileType | null
    userID: number | null
    isFetching: boolean
    isEditingSuccess: boolean
}

type MapDispatchProps = {
    getUser: (userID: number) => void
    setEditingSuccess: (isEditingSuccess: boolean) => void
    changeAvatar: (image: File) => void
    editProfile: (data: ProfileType) => void
}

type RouteParams = {
    user_id: string | undefined
}

const ProfilePersonalInfo : React.FC<MapStateProps & MapDispatchProps & RouteComponentProps<RouteParams>> =
    (props) => {
    let {profile,
        isFetching,
        userID,
        getUser,
        isEditingSuccess,
        setEditingSuccess
    } = props;

    let [editMode, setEditMode] = useState(false);

    useEffect(() => {

        let user_id: null | number = Number(props.match.params.user_id);
        if (!user_id) user_id = userID;
        if (user_id)
            getUser(user_id);

    }, [userID, props.match.params.user_id, getUser])

    if (isFetching || !profile)
        return <div className={s.prelode}><Prelode/></div>

    let reduceLanguages = (languages : Array<string>) => {
        return languages.reduce((p, item, index) => {
            return index !== 0 ? p + ", " + item : item
        }, "")
    }
    let isOwner = !props.match.params.user_id;
    let changeAvatar = (e :  React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length)
            props.changeAvatar(e.target.files[0]);
    }

    if (editMode && isEditingSuccess)
        setEditMode(false);

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) =>
    {
        e.preventDefault();
        setEditMode(true);
        setEditingSuccess(false);
    }

    const handleSubmit = (formData : FormDataType) =>
    {
        console.log(formData);
        props.editProfile(formData);
    }
    
    if (!profile.user)
        return <div>Something wrong :(</div>
    return (
        <div>
            <AppBar position="static" color={'secondary'}>
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
                            {profile.status &&
                                <Typography
                                    className={s.realUserName}> {profile.status}
                                </Typography>
                            }
                        </Grid>
                        { isOwner && <Grid item><Button color="primary" onClick={handleClick}>Edit</Button></Grid>}
                    </Grid>

                    {editMode ? <ProfileInfoForm initialValues={profile} onSubmit={handleSubmit}/> :
                        <ProfileInfo profile={profile} languages_know={reduceLanguages(profile.languages_know)}
                        languages_learn={reduceLanguages(profile.languages_learn)}/>
                    }

                </Box>
            </AppBar>
        </div>

    )
}

let mapStateToProps = (state : RootState) => ({
    profile: state.profile.profile,
    userID: state.auth.currentUser.userID,
    isFetching: state.profile.isFetching,
    isEditingSuccess: state.profile.isEditingSuccess,
})


export default withRouter(connect
            <MapStateProps,
                MapDispatchProps,
                {},
                RootState>
            (mapStateToProps, {getUser, changeAvatar, setEditingSuccess : actions.setEditingSuccess, editProfile})(ProfilePersonalInfo))

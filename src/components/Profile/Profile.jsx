import React from 'react';
import s from './Profile.module.scss'
import ProfilePostsContainer from "./ProfilePosts/ProfilePostsContainer";
import ProfileCardsContainer from "./ProfileCards/ProfileCardsContainer";
import ProfilePersonalInfoContainer from "./ProfilePersonalInfo/ProfilePersonalInfoContainer";

const Profile = (props) =>
{
    return (
        <div className={s.profile}>
            <div className={s.inner + ' container'}>
            <ProfilePersonalInfoContainer />
            <ProfilePostsContainer/>
            <ProfileCardsContainer />
            </div>
        </div>
    )
}

export default Profile;
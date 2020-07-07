import React from 'react';
import s from './Profile.module.scss'
import ProfilePostsContainer from "./ProfilePosts/ProfilePostsContainer";
import ProfilePersonalInfo from "./ProfilePersonalInfo/ProfilePersonalInfo";
import ProfileCardsContainer from "./ProfileCards/ProfileCardsContainer";

const Profile = (props) =>
{
    return (
        <div className={s.profile + ' container'}>
            <ProfilePersonalInfo />
            <ProfilePostsContainer/>
            <ProfileCardsContainer />

        </div>
    )
}

export default Profile;
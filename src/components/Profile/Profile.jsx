import React from 'react';
import s from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileStatistics from "./ProfileStatistics/ProfileStatistics";

const Profile = () =>
{
    return (
        <div className={s.profile + ' container'}>
            <ProfileInfo />
            <ProfileStatistics />
        </div>
    )
}

export default Profile;
import React from 'react';
import s from './ProfileInfo.module.scss'
import ProfilePersonalInfo from "./ProfilePersonalInfo/ProfilePersonalInfo";
import ProfileCards from "./ProfileCards/ProfileCards";

const ProfileInfo = () => {
    return (
        <div className={s.info} >
            <ProfilePersonalInfo/>
            <ProfileCards/>
        </div>
    )
}

export default ProfileInfo;
import s from "./ProfilePersonalInfo.module.scss";
import React from "react";
import {ProfileType} from "../../../types/global";

type PropsType = {
    profile: ProfileType
    languages_know : string
    languages_learn : string
}

const ProfileInfo : React.FC<PropsType> = ({profile, languages_know, languages_learn}) => {
    return <>
        <div className={s.personalInfo}> Personal Info</div>
        <ul className={s.list}>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Age:</span> {profile.age}
            </li>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Hobbies:</span> {profile.hobbies}
            </li>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Languages I know:</span>
                {languages_know}
            </li>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Languages I learn:</span>
                {languages_learn}
            </li>
            <li className={s.personalInfo_element + " " + s.about}>
                <span className={s.elementCategory}>About me:</span>
                <div>{profile.about_me}</div>
            </li>
        </ul>

    </>;
}

export default ProfileInfo
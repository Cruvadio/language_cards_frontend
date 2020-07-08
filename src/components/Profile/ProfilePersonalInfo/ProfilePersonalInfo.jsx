import React from 'react';
import s from './ProfilePersonalInfo.module.scss'
import Prelode from "../../common/Prelode/Prelode";

const ProfilePersonalInfo = (props) => {
    if (!props.profile)
        return <div className={s.prelode}><Prelode/></div>

    let reduceLanguages = (languages) => {
        return languages.reduce((p, item, index) => {
            return index !== 0 ? p + ", " + item.name : item.name
        }, "")
    }

    return (
        <div>
            <div className={s.profile}>
                <div className={s.avatarWrapper}>
                    <img className={s.avatar}
                         src={props.profile.avatar}/>
                </div>
                <div className={s.userName}>{props.profile.user.username}</div>
                <div
                    className={s.realUserName}> {props.profile.user.first_name + " " + props.profile.user.last_name}</div>
                <div className={s.personalInfo}> Personal Info</div>
                <ul className={s.list}>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Birth Date:</span> {props.profile.birth_date}
                    </li>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Hobbies:</span> {props.profile.hobbies}
                    </li>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Languages I know:</span>
                        {reduceLanguages(props.profile.languages_know)}
                    </li>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Languages I learn:</span>
                        {reduceLanguages(props.profile.languages_learn)}
                    </li>
                    <li className={s.personalInfo_element + " " + s.about}>
                        <span className={s.elementCategory}>About me:</span>
                        <div>{props.profile.about_me}</div>
                    </li>
                </ul>

            </div>
        </div>

    )
}

export default ProfilePersonalInfo;
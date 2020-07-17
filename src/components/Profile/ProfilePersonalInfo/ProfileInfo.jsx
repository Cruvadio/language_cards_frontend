import s from "./ProfilePersonalInfo.module.scss";
import React from "react";

export default function ProfileInfo(props) {
    return <>
        <div className={s.personalInfo}> Personal Info</div>
        <ul className={s.list}>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Age:</span> {props.profile.age}
            </li>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Hobbies:</span> {props.profile.hobbies}
            </li>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Languages I know:</span>
                {props.reduceLanguages}
            </li>
            <li className={s.personalInfo_element}>
                <span className={s.elementCategory}>Languages I learn:</span>
                {props.reduceLanguages1}
            </li>
            <li className={s.personalInfo_element + " " + s.about}>
                <span className={s.elementCategory}>About me:</span>
                <div>{props.profile.about_me}</div>
            </li>
        </ul>

    </>;
}


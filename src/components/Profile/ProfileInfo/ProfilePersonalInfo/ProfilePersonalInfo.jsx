import React from 'react';

import s from './ProfilePersonalInfo.module.scss'

const ProfilePersonalInfo = () => {
    return (
        <div>
            <div className={s.profile}>
                <div className={s.avatarWrapper}>
                    <img className={s.avatar}
                         src="https://cache3.youla.io/files/images/780_780/5b/0f/5b0fc435b5fc2d3b38497323.jpg"/>
                </div>
                <div className={s.userName}>Cruvadio</div>
                <div className={s.realUserName}> Inna Alexandrova</div>
                <div className={s.personalInfo}> Personal Info</div>
                <ul className={s.list}>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Age:</span> 20
                    </li>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Hobbies:</span> computers, programming
                    </li>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Languages I know:</span> Russian, English, C++ =)
                    </li>
                    <li className={s.personalInfo_element}>
                        <span className={s.elementCategory}>Languages I learn:</span> German, JavaScript =)
                    </li>
                    <li className={s.personalInfo_element + " " + s.about}>
                        <span className={s.elementCategory}>About me:</span>
                        <div>Good Person</div>
                    </li>
                </ul>

            </div>
        </div>

    )
}

export default ProfilePersonalInfo;
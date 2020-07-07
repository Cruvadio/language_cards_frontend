import React from 'react';
import s from './ProfileCard.module.scss'

const ProfileCards = (props) => {
    return (
        <div className={s.element}>
            <div>
                <div className={s.name}> {props.cardName}</div>
                <div className={s.language}>{props.language}</div>
            </div>
            <div className={s.last}>
                Last repetition:
                <div className={s.date}>
                    {props.lastDate}
                </div>
            </div>
        </div>

    )
}

export default ProfileCards;
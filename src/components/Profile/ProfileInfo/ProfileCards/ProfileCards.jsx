import React from 'react';
import s from './ProfileCards.module.scss'
import Button from "../../../Button/Button";

const ProfileCards = () => {
    return (
        <div className={s.cards}>
            <div className={s.header}>
                <div>My Cards</div>
                <button className={s.button}/>
            </div>
            <div className={s.inner}>
                <div className={s.elements}>
                    <div className={s.element}>
                        <div>
                            <div className={s.name}> Grundlegende Wörter</div>
                            <div className={s.language}> German</div>
                        </div>
                        <div className={s.last}>
                            Last repetition:
                            <div className={s.date}>
                                2 day ago
                            </div>
                        </div>
                    </div>
                    <div className={s.element}>
                        <div>
                            <div className={s.name}> Grundlegende Wörter</div>
                            <div className={s.language}> German</div>
                        </div>
                        <div className={s.last}>
                            Last repetition:
                            <div className={s.date}>
                                2 day ago
                            </div>
                        </div>
                    </div>
                    <div className={s.element}>
                        <div>
                            <div className={s.name}> Grundlegende Wörter</div>
                            <div className={s.language}> German</div>
                        </div>
                        <div className={s.last}>
                            Last repetition:
                            <div className={s.date}>
                                2 day ago
                            </div>
                        </div>
                    </div>
                </div>


                <div><Button name="More"/></div>
            </div>
        </div>
    )
}

export default ProfileCards;
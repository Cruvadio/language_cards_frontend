import React from "react";
import s from './Intro.module.scss'
import Button from "../common/Button/Button";
import IntroTitle from "./IntroTitle/IntroTitle";
import IntroTitleBold from "./IntroTitle/IntroTitleBold/IntroTitleBold";



const Intro = (props) => {
    return (
        <div className={s.intro} id="intro">
            <div className="container">
                <div className={s.inner}>
                    <IntroTitle content={props.introTitle} />
                    <Button link="/login/" name={props.buttonName} className={s.button}/>
                </div>
            </div>
        </div>
    )
}

export default Intro;
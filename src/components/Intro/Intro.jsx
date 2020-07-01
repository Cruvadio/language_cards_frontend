import React from "react";
import s from './Intro.module.scss'
import Button from "../Button/Button";
import IntroTitle from "./IntroTitle/IntroTitle";
import IntroTitleBold from "./IntroTitle/IntroTitleBold/IntroTitleBold";



const Intro = (props) => {
    return (
        <div className={s.intro} id="intro">
            <div className="container">
                <div className={s.inner}>
                    <IntroTitle content={props.introTitle} />
                    <Button link="#" name={props.buttonName}/>
                </div>
            </div>
        </div>
    )
}

export default Intro;
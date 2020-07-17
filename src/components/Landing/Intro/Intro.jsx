import React from "react";
import s from './Intro.module.scss'
import Button from "../../common/Button/Button";
import IntroTitle from "./IntroTitle/IntroTitle";
import ts from "./IntroTitle/IntroTitle.module.scss"


const Intro = (props) => {
    return (
        <div className={s.content}>
            <div className={s.intro} id="intro"></div>
            <div className={s.inner}>
                <IntroTitle content={props.introTitle}/>
                <div className={ts.background}></div>
                <Button link="/login/" name={props.buttonName} className={s.button}/>
            </div>
        </div>
    )
}

export default Intro;
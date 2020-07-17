import s from "./IntroTitleBold.module.scss";
import React from "react";


const IntroTitleBold = (props) => {
    return (
        <b className={s.b}>{props.content}</b>
    )
}

export default IntroTitleBold;
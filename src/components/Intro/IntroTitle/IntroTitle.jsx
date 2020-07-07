import s from "./IntroTitle.module.scss";
import React from "react";


const IntroTitle = (props) => {
    return (
        <h1 className={s.title + " " + s.focusInExpandFwd}> {props.content} </h1>
    )
}

export default IntroTitle;
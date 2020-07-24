import s from "./IntroTitleBold.module.scss";
import React from "react";


type PropsType = {
    content : string
}

const IntroTitleBold : React.FC<PropsType> = ({content}) => {
    return (
        <b className={s.b}>{content}</b>
    )
}

export default IntroTitleBold;
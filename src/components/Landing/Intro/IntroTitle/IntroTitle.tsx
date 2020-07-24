import s from "./IntroTitle.module.scss";
import React from "react";
import {unionClasses} from "../../../common/utils/helpers/helpers";

type PropsType = {
    content: string
}


const IntroTitle : React.FC<PropsType> = ({content}) => {
    return (
        <h1 className={unionClasses(s.title, s.focusInExpandFwd)}> {content} </h1>
    )
}

export default IntroTitle;
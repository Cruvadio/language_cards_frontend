import React from "react";
import s from './Button.module.scss'
import {addClassName} from "../utils/helpers/helpers";

const Button = (props) => {
    return (
        <button onClick={props.onClick} className={addClassName(s.button, props.className)}>{props.name}</button>
    )
}

export default Button;
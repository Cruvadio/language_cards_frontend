import React from "react";
import s from './Button.module.scss'
import {addClassName} from "../utils/helpers/helpers";

type PropsType = {
    onClick? : (e : React.MouseEvent<HTMLButtonElement>) => void
    className?: string,
    name: string
}

const Button : React.FC<PropsType> = ({onClick, className, name}) => {
    return (
        <button onClick={onClick} className={className ? addClassName(s.button, className) : s.button}>{name}</button>
    )
}

export default Button;
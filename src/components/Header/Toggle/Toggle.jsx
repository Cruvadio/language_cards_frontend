import React from "react";
import s from'./Toggle.module.css'

const Toggle = () => {
    return (
        <button className={s.toggle} id="nav-toggle" type="button">
            <span className={s.item}>Menu</span>
        </button>
    )
}

export default Toggle;
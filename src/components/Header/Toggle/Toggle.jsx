import React from "react";
import './Toggle.module.css'

const Toggle = () => {
    return (
        <button styleName="toggle" id="nav-toggle" type="button">
            <span styleName="item">Menu</span>
        </button>
    )
}

export default Toggle;
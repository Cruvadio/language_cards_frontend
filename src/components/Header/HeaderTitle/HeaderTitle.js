import s from "./HeaderTitle.module.scss";
import React from "react";
import FontAwesomeIcon from "../../common/FontAwesomeIcon";
import {NavLink} from "react-router-dom";

const HeaderTitle = (props) =>{
    return (
        <NavLink className={s.title} to={"/"}>
            <FontAwesomeIcon className="fas fa-language"/> {props.content}
        </NavLink>
    )
}

export default HeaderTitle;
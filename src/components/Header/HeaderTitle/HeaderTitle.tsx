import s from "./HeaderTitle.module.scss";
import React from "react";
import FontAwesomeIcon from "../../common/FontAwesomeIcon";
import {NavLink} from "react-router-dom";

type PropsType = {
    content : string
}

const HeaderTitle: React.FC<PropsType>= ({content}) =>{
    return (
        <NavLink className={s.title} to={"/"}>
            <FontAwesomeIcon className="fas fa-language"/> {content}
        </NavLink>
    )
}

export default HeaderTitle;
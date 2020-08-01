import s from "./HeaderTitle.module.scss";
import React from "react";
import FontAwesomeIcon from "../../common/FontAwesomeIcon";
import {NavLink} from "react-router-dom";
import {unionClasses} from '../../common/utils/helpers/helpers'

type PropsType = {
    content : string
    className: string
}

const HeaderTitle: React.FC<PropsType>= ({content, className}) =>{

    return (
        <NavLink className={unionClasses(s.title, className)} to={"/"}>
            <FontAwesomeIcon className="fas fa-language"/> {content}
        </NavLink>
    )
}

export default HeaderTitle;
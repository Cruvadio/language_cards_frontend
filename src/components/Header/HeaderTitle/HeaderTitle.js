import s from "./HeaderTitle.module.scss";
import React from "react";
import FontAwesomeIcon from "../../FontAwesomeIcon";

const HeaderTitle = (props) =>{
    return (
        <a className={s.title} href="#">
            <FontAwesomeIcon className="fas fa-language"/> {props.content}
        </a>
    )
}

export default HeaderTitle;
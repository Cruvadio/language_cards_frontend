import s from "./NavItem.module.scss";
import React from "react";

const NavItem = (props) =>{
    return (
        <a href={props.link} className={s.link}>{props.content}</a>
    )
}

export default NavItem;
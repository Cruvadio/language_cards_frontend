import s from "./NavItem.module.scss";
import React, {ChangeEvent} from "react";
import {NavLink} from "react-router-dom";

type PropsType = {
    link: string,
    onClick?: (event : React.MouseEvent<HTMLAnchorElement>) => void,
    content: string | React.ComponentElement<any, any>
}


const NavItem : React.FC<PropsType> = ({link, content,onClick}) =>{
    return (
        <NavLink to={link} onClick={onClick} className={s.link}>{content}</NavLink>
    )
}

export default NavItem;
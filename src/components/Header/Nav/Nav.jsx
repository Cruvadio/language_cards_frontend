import React from "react";
import s from './Nav.module.css'
import FontAwesomeIcon from "../../FontAwesomeIcon";
import NavItem from "./NavItem/NavItem";





const Nav = (props) => {

    let navElements = props.navData.map(e => <NavItem link={e.link} content={e.content}/>)
    return (
        <nav className={s.nav}>
            {navElements}
        </nav>)
}

export default Nav;
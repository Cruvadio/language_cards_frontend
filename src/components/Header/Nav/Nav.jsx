import React from "react";
import s from './Nav.module.css'
import FontAwesomeIcon from "../../FontAwesomeIcon";
import NavItem from "./NavItem/NavItem";


let navData = [
    {id: 1, link: "#", content: "About us"},
    {id: 2, link: "#", content: "Home"},
    {id: 3, link: "#", content: "Contact us"},
    {id: 4, link: "#", content: <FontAwesomeIcon className='fas fa-sign-in-alt' />},
]

let navElements = navData.map(e => <NavItem link={e.link} content={e.content}/>)

const Nav = () => {
    return (
        <nav className={s.nav}>
            {navElements}
        </nav>)
}

export default Nav;
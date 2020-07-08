import React from "react";
import s from './Nav.module.css'
import FontAwesomeIcon from "../../common/FontAwesomeIcon";
import NavItem from "./NavItem/NavItem";


const Nav = (props) => {

    if (props.isAuthenticate)
        return (
            <nav className={s.nav}>
                <NavItem link="#"
                         onClick={(e) => {
                             e.preventDefault();
                             props.logOut()
                         }}
                         content={<FontAwesomeIcon className="fas fa-sign-out-alt"/>}
                />
            </nav>
        )
    return (
        <nav className={s.nav}>
            {props.navData.map(e => <NavItem link={e.link} key={e.id} content={e.content}/>)}
            <NavItem link="/login/" content={<FontAwesomeIcon className="fas fa-sign-in-alt"/>}/>
        </nav>)
}

export default Nav;
import React, {Component} from 'react';
import s from './Header.module.scss';
import Toggle from "./Toggle/Toggle";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import NavContainer from "./Nav/NavContainer";
import {connect} from "react-redux";

class Header extends Component{

    constructor(props) {
        super(props);
    }
    render()
    {
        return (
            <header className={s.header} id="header">
                <div className={s.inner}>
                    <HeaderTitle content="Language Cards"/>
                    <NavContainer />
                    <Toggle />
                </div>
            </header>
        )
    }
}

let mapStateToProps = (state) =>({
    isAuthenticate: state.auth.isAuthenticate,
})

export default connect(mapStateToProps, null)(Header);
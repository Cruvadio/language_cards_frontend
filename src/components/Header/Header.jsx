import React, {Component} from 'react';
import s from './Header.module.scss';
import Toggle from "./Toggle/Toggle";
import Nav from "./Nav/Nav";
import HeaderTitle from "./HeaderTitle/HeaderTitle";

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
                    <Nav navData={this.props.navData}/>
                    <Toggle />
                </div>
            </header>
        )
    }
}

export default Header;
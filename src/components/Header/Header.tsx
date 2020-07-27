import React from 'react';
import s from './Header.module.scss';
import Toggle from "./Toggle/Toggle";
import HeaderTitle from "./HeaderTitle/HeaderTitle";
import Nav from "./Nav/Nav";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {addClassName} from "../common/utils/helpers/helpers";
import {compose} from 'redux';


type MapStatePropsType = {
    isAuthenticate: boolean
}
type PropsType = MapStatePropsType;

const Header: React.FC<PropsType> = ({isAuthenticate}) => {

    let classes = s.header;
    if (isAuthenticate) classes = addClassName(classes, s.authorized)

    return (
        <div className={classes}>
            <header id="header">
                <div className={s.inner}>
                    <HeaderTitle content="Language Cards"/>
                    <Nav/>
                    <Toggle/>
                </div>
            </header>
        </div>
    )
}

let mapStateToProps = (state: RootState) => ({
    isAuthenticate: state.auth.isAuthenticate,
})

export default compose(
    connect<MapStatePropsType,
        {},
        {},
        RootState>(mapStateToProps, {}))
(Header);
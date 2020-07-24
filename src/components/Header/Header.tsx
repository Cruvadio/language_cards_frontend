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
type MapDispatchPropsType = {}

type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const Header: React.FC<PropsType> = ({isAuthenticate}) => {

    let classes = s.header;
    if (isAuthenticate) classes = addClassName(classes, s.authorized)

    return (
        <header className={classes} id="header">
            <div className={s.inner}>
                <HeaderTitle content="Language Cards"/>
                <Nav/>
                <Toggle/>
            </div>
        </header>
    )
}

let mapStateToProps = (state: RootState) => ({
    isAuthenticate: state.auth.isAuthenticate,
})

export default compose(
    connect<MapStatePropsType,
        MapDispatchPropsType,
        OwnPropsType,
        RootState>(mapStateToProps, {}))
(Header);
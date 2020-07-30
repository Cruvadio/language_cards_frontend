import React, {ChangeEvent} from "react";
import {connect} from "react-redux";
import s from './Nav.module.css'
import FontAwesomeIcon from "../../common/FontAwesomeIcon";
import NavItem from "./NavItem/NavItem";
import {userLogOut} from "../../../redux/reducers/auth_reducer";
import {RootState} from "../../../redux/store";
import {NavDataType} from "../../../types/global";
import GroupIcon from '@material-ui/icons/Group';
import MessageIcon from '@material-ui/icons/Message';

type MapStatePropsType = {
    isAuthenticate: boolean,
    navData: Array<NavDataType>
}

type MapDispatchPropsType = {
    userLogOut: () => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Nav : React.FC<PropsType> = ({isAuthenticate, navData, userLogOut}) => {

    if (isAuthenticate)
        return (
            <nav className={s.nav}>
                <NavItem link="/users/"
                         content={<GroupIcon/>}
                />
                <NavItem link="/messages/"
                         content={<MessageIcon/>}
                />
                <NavItem link="#"
                         onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                             e.preventDefault();
                             userLogOut()
                         }}
                         content={<FontAwesomeIcon className="fas fa-sign-out-alt"/>}
                />
            </nav>
        )
    return (
        <nav className={s.nav}>
            {navData.map((e:NavDataType) => <NavItem link={e.link} key={e.id} content={e.content}/>)}
            <NavItem link="/login/" content={<FontAwesomeIcon className="fas fa-sign-in-alt"/>}/>
        </nav>)
}


let mapStateToProps = (state : RootState) => ({
    navData: state.header.navData,
    isAuthenticate: state.auth.isAuthenticate,
})




export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {userLogOut})(Nav);
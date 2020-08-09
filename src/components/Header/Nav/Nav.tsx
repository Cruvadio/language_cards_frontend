import React, {useState} from 'react'
import {connect} from 'react-redux'
import s from './Nav.module.scss'
import NavItem from './NavItem/NavItem'
import {userLogOut} from '../../../redux/reducers/auth_reducer'
import {RootState} from '../../../redux/store'
import {NavDataType} from '../../../types/global'
import {Menu} from 'antd'
import {NavLink, useLocation} from 'react-router-dom'
import {LoginOutlined, LogoutOutlined, MailOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons'

type MapStatePropsType = {
    isAuthenticate: boolean,
    navData: Array<NavDataType>
}

type MapDispatchPropsType = {
    userLogOut: () => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Nav: React.FC<PropsType> = ({isAuthenticate, navData, userLogOut}) => {

    const regexp = /profile|users|messages/
    const path = useLocation().pathname.match(regexp)
    if (path)
        console.log(path[0])
    const [current, setCurrent] = useState(path ? path[0] : '')


    const handleClick = (e: any) => {
        console.log('click', e)
        setCurrent(e.key)
    }

    if (isAuthenticate)
        return (
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item icon={<UserOutlined />} key='profile'><NavLink to={'/profile/'}>Profile</NavLink></Menu.Item>
                <Menu.Item icon={<TeamOutlined />} key='users'> <NavLink to={'/users/'}>Users</NavLink></Menu.Item>
                <Menu.Item icon={<MailOutlined />} key='messages'> <NavLink to={'/messages/'}>Messages</NavLink></Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} key='log_out'>
                    <a
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault()
                            userLogOut()
                        }}
                    ></a>
                </Menu.Item>
            </Menu>
        )
    return (
        <nav className={s.nav}>
            {navData.map((e: NavDataType) => <NavItem link={e.link} key={e.id} content={e.content}/>)}
            <NavItem link="/login/" content={<LoginOutlined />}/>
        </nav>)
}


let mapStateToProps = (state: RootState) => ({
    navData: state.header.navData,
    isAuthenticate: state.auth.isAuthenticate
})


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {userLogOut})(Nav)
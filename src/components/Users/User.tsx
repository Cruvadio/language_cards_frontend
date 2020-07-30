import {
    Avatar,
    Button,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import s from "./Users.module.scss";
import placeholder from "../../assets/images/avatar_placeholder.png";
import React from "react";
import {UserListType} from "../../types/global";


export function User(props: { u: UserListType, userID: any, disabled: boolean, onClick: () => any, onClick1: () => any }) {
    return <div>
        <ListItem>
            <ListItemAvatar>
                <NavLink to={`/profile/${props.u.user.id}`}>
                    {props.u.avatar_small ?
                        <Avatar className={s.avatar} alt={props.u.user.username}
                                src={props.u.avatar_small}/> :
                        <Avatar className={s.avatar} alt={props.u.user.username}
                                src={placeholder}/>}
                </NavLink>
            </ListItemAvatar>
            <ListItemText
                primary={props.u.user.username}
                secondary={props.u.user.first_name + " " + props.u.user.last_name + '\n' + props.u.status}/>

            {
                props.u.user.id !== props.userID && (
                    <ListItemSecondaryAction>
                        {props.u.is_followed ?
                            <Button variant="outlined"
                                    color="primary"
                                    disabled={props.disabled}
                                    onClick={props.onClick}
                                    className={s.button}
                            >
                                Unfollow
                            </Button> :
                            <Button variant="outlined"
                                    color="primary"
                                    disabled={props.disabled}
                                    onClick={props.onClick1}
                                    className={s.button}
                            >
                                Follow
                            </Button>}
                    </ListItemSecondaryAction>)
            }
        </ListItem>
        <Divider variant="inset" component="li"/>
    </div>;
}
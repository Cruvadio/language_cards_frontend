import {Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import React from "react";
import {UserListType} from "../../types/global";
import {Skeleton} from "@material-ui/lab";


export function UserSkeleton() {
    return <div>
        <ListItem>
            <ListItemAvatar>
                <Skeleton variant="circle" width='40px' height='40px'/>
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton width="20%"/>}
                secondary={<Skeleton width="50%"/>}/>


            <ListItemSecondaryAction>
                <Skeleton variant="rect" width="105px" height="34px"/>
            </ListItemSecondaryAction>)

        </ListItem>
        <Divider variant="inset" component="li"/>
    </div>;
}
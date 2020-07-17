import React from 'react';
import s from './ProfileCard.module.scss'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const ProfileCards = (props) => {
    return (
        <Card className={s.element} variant="outlined">
            <CardActionArea>
            <CardContent>
                <div className={s.name}> {props.cardName}</div>
                <div className={s.language}>{props.language}</div>
            </CardContent>
            <CardContent className={s.last}>
                Last repetition:
                <div className={s.date}>
                    {props.lastDate}
                </div>
            </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default ProfileCards;
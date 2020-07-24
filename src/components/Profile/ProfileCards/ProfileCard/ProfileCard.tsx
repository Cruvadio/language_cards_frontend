import React from 'react'
import s from './ProfileCard.module.scss'
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"

type PropsType = {
    cardName: string
    language: string
    lastDate: string
}

const ProfileCards : React.FC<PropsType> = ({cardName, language, lastDate}) => {
    return (
        <Card className={s.element} variant="outlined">
            <CardActionArea>
            <CardContent>
                <div className={s.name}> {cardName}</div>
                <div className={s.language}>{language}</div>
            </CardContent>
            <CardContent className={s.last}>
                Last repetition:
                <div className={s.date}>
                    {lastDate}
                </div>
            </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default ProfileCards;
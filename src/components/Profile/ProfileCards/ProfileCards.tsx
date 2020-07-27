import React from 'react';
import s from './ProfileCards.module.scss'
import Button from "../../common/Button/Button";
import ProfileCard from "./ProfileCard/ProfileCard";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import AppBar from "@material-ui/core/AppBar";
import {CardsetType} from "../../../types/global";


type PropsType = {
    cardsets: Array<CardsetType>
    isFetching: boolean
    nextPage: string
    onMoreClick: () => void
}


let ProfileCards: React.FC<PropsType> = ({cardsets, isFetching, onMoreClick, nextPage}) => {


    const makeCardsetElemets = (cardsets : Array<CardsetType>) => {
        return cardsets.map((card) => {
            return <Grid item key={card.id}><ProfileCard cardName={card.name}
                                                         language={card.to_language.name}
                                                         lastDate={card.last_revision_date}/></Grid>
        })
    };

    return (
        <AppBar position="static" color={'secondary'}>
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item><Typography variant="h6" color="inherit">My Cards</Typography></Grid>
                    <Grid item>
                        <IconButton className={s.headerButton}>
                            <AddIcon className={s.headerContent} fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Grid>

            </Toolbar>
            <Box className={s.details}>
                <Grid container justify="center" spacing={3}>
                    <Grid item container spacing={4} direction="row" justify="center">
                        {makeCardsetElemets(cardsets)}
                        {isFetching &&
                            <Grid item container xs={12} justify='center'><CircularProgress className={s.loader}/>
                            </Grid>}
                    </Grid>

                    {nextPage &&
                        <Grid item container><Button name="More" onClick={onMoreClick}/></Grid>}
                </Grid>
            </Box>
        </AppBar>
    )
}

export default ProfileCards;

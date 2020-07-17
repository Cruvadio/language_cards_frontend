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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#FC5C7D"
    }
}))

let ProfileCards = (props) => {

    const classes = useStyles();

    const makeCardsetElemets = (cardsets) => {
        return cardsets.map((card) => {
            return <Grid item key={card.id}><ProfileCard cardName={card.cardName}
                                                         language={card.language}
                                                         lastDate={card.lastDate}/></Grid>
        })
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item><Typography variant="h6" color="inherit">My Cards</Typography></Grid>
                    <Grid item>
                        <IconButton className={s.headerButton}>
                            <AddIcon className={s.headerContent} fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Grid>
                {/*<button className={s.button}/>*/}
            </Toolbar>
            <Box className={s.details}>
                <Grid container justify="center" spacing={3}>
                    <Grid item container spacing={4} direction="row" justify="center">
                        {makeCardsetElemets(props.cardsets)}
                        {props.isFetching &&
                            <Grid item container xs={12} justify='center'><CircularProgress className={s.loader}/>
                            </Grid>}
                    </Grid>

                    {props.nextPage ?
                        <Grid item container><Button name="More" onClick={props.onMoreClick}/></Grid> : <div></div>}
                </Grid>
            </Box>
        </AppBar>
    )
}

export default ProfileCards;

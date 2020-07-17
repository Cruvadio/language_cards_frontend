import React from 'react';
import s from './Profile.module.scss'
import ProfilePostsContainer from "./ProfilePosts/ProfilePostsContainer";
import ProfileCardsContainer from "./ProfileCards/ProfileCardsContainer";
import ProfilePersonalInfo from "./ProfilePersonalInfo/ProfilePersonalInfo";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const Profile = (props) => {
    return (
        /*<div className={s.profile}>
            <div className={s.inner + ' container'}>
            <ProfilePersonalInfo />
            <ProfilePostsContainer/>
            <ProfileCardsContainer />
            </div>
        </div>*/
        <Box className={s.profile}>
            <Container maxWidth="lg" className={s.inner}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ProfilePersonalInfo/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProfileCardsContainer/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Profile;
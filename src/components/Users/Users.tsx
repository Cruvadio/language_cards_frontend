import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import s from "./Users.module.scss";
import Container from "@material-ui/core/Container";
import {follow, getUsers, unfollow} from "../../redux/reducers/users_reducer";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {getFetching, getPagesCount, getPortionSize, getUsersList} from "../../redux/reducers/users_selectors";
import {Pagination} from "@material-ui/lab";
import {Grid, List} from "@material-ui/core";
import {User} from "./User";
import {UserListType} from "../../types/global";
import {UserSkeleton} from "./UserSkeleton";
import UsersSearch from './UsersSearch'

type MapStateProps = {
    users: Array<UserListType>
    pagesCount: number
    portionSize: number
    isFetching: boolean
    pageSize: number
    fetching_followings: Array<number>
    userID: number | null
    count: number
}

type MapDispatchProps = {
    getUsers: (page: number, query: string) => void
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}


const Users: React.FC<MapStateProps & MapDispatchProps> = React.memo(
    ({
         users,
         pagesCount,
         portionSize,
         isFetching,
         getUsers,
         fetching_followings,
         follow,
         unfollow,
         userID,
         pageSize,
         count
     }) => {

        const [page, setPage] = useState(1);


        const countUsersOnPage = () => {
            const pageCount = page * pageSize;
            if (Math.floor((pageCount) / count)) {
                return pageSize - (pageCount % count)
            }
            return pageSize
        }

        const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
            setPage(value)
        }
        let skeletons = []
        if (isFetching) {
            for (let i = 0; i < countUsersOnPage(); i++) {
                skeletons.push(
                    <UserSkeleton/>
                )
            }
        }


        return (
            <Box className={s.bg}>
                <Container maxWidth="lg" className={s.container}>

                    <Grid container justify={"center"} alignContent={"center"} className={s.inner}>
                        <Grid  xs={12}><UsersSearch getUsers={getUsers} page={page}/></Grid>
                        <Grid item><Pagination count={pagesCount} page={page} onChange={handleChange}
                                               disabled={isFetching}/></Grid>


                        <Grid item xs={12}>
                            <List>
                                {
                                    isFetching ? skeletons :
                                        users.map((u: UserListType) => {
                                            const isDisabled = fetching_followings.some((i) => i === u.user.id)
                                            return (
                                                <User key={u.user.id} u={u} userID={userID} disabled={isDisabled}
                                                      onClick={() => unfollow(u.user.id)}
                                                      onClick1={() => follow(u.user.id)}/>

                                            )
                                        })
                                }
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        )
    })

const mapStateToProps = (state: RootState) => ({
    isFetching: getFetching(state),
    pagesCount: getPagesCount(state),
    portionSize: getPortionSize(state),
    pageSize: state.users.pageSize,
    users: getUsersList(state),
    fetching_followings: state.users.fetching_followings,
    userID: state.auth.currentUser.userID,
    count: state.users.count
})


export default connect<MapStateProps, MapDispatchProps, {}, RootState>(mapStateToProps, {
    getUsers,
    follow,
    unfollow
})(Users)
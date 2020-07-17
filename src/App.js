import React, {useEffect} from 'react';
//import logo from './logo.svg';
//import s from './App.module.scss';
import Header from "./components/Header/Header";
import "./main.scss"
import Profile from "./components/Profile/Profile";

import {
    Redirect, Route, Switch,
} from "react-router-dom"
import {connect} from "react-redux";
import LoginContainer from "./components/Login/LoginContainer";
import {setAuthenticate} from "./redux/reducers/auth_reducer";
import {initialize} from "./redux/reducers/app_reducer";
import PrivateRoute from "./components/Routers/PrivateRouter";
import ProfileRoute from "./components/Routers/ProfileRouter";
import Landing from "./components/Landing/Landing";
import Prelode from "./components/common/Prelode/Prelode";
import Registration from "./components/Registration/Registration";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {compose} from "redux";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fc7c97',
            main: '#FC5C7D',
            dark: '#b04057',
            contrastText: '#fff',
        },
        secondary: {
            light: '#879bfb',
            main: '#6A82FB',
            dark: '#4a5baf',
            contrastText: '#fff',
        },
    },
});

let addTheme = Element => (props) =>{
    return (
        <ThemeProvider theme={theme}>
            <Element {...props}/>
        </ThemeProvider>
    )
}

function App(props) {
    useEffect(() => {
        props.initialize();
    }, [props]);

    if (!props.isInitialized)
    {
        return <Prelode />
    }

    return (
        /*<div className={s.App}>
          <header className={s.AppHeader}>
            <img src={logo} className={s.AppLogo} alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className={s.AppLink}
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>*/
        <div>
            <Header/>
            {props.isNewUser && <Redirect  to={"/edit/profile"}/>
            }
            <Switch>
                <ProfileRoute exact path='/'>
                    <Landing/>
                </ProfileRoute>
                <PrivateRoute path='/profile/:user_id?' >
                    <Profile/>
                </PrivateRoute>
                <Route path={"/edit/profile"} render={() => {
                        return <ProfileEdit />
                }}/>
                <ProfileRoute path='/login/' >
                    <LoginContainer/>
                </ProfileRoute>

                <ProfileRoute path='/sign_up'>
                    <Registration/>
                </ProfileRoute>
            </Switch>
            {/*<Intro buttonName={props.buttonName} introTitle={props.introTitle}/>*/}
        </div>
    );
}




let mapStateToProps = state => ({
    isInitialized: state.app.isInitialized,
    isNewUser: state.auth.isNewUser,
})


export default compose(connect(mapStateToProps, {initialize, setAuthenticate}),
    addTheme)(App);

import React, {useEffect} from 'react';
//import logo from './logo.svg';
//import s from './App.module.scss';
import Header from "./components/Header/Header";
import "./main.scss"
import Profile from "./components/Profile/Profile";

import {
    Redirect,
    Route, Switch,
} from "react-router-dom"
import IntroContainer from "./components/Intro/IntroContainer";
import {connect} from "react-redux";
import LoginContainer from "./components/Login/LoginContainer";
import {isLogged, setAuthenticate} from "./redux/reducers/auth_reducer";
import Intro from "./components/Intro/Intro";
import PrivateRoute from "./components/Routers/PrivateRouter";
import ProfileRoute from "./components/Routers/ProfileRouter";

function App(props) {
    useEffect(() => {
        props.isLogged();
    });


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
            <Switch>
                <ProfileRoute exact path='/' isAuthenticated={props.isAuthenticate}>
                    <IntroContainer/>
                </ProfileRoute>
                <PrivateRoute path='/profile/:user_id?' isAuthenticated={props.isAuthenticate}>
                    <Profile/>
                </PrivateRoute>
                <ProfileRoute path='/login/' isAuthenticated={props.isAuthenticate}>
                    <LoginContainer/>
                </ProfileRoute>
            </Switch>
            {/*<Intro buttonName={props.buttonName} introTitle={props.introTitle}/>*/}
        </div>
    );
}



let mapStateToProps = state => ({
    isAuthenticate: state.auth.isAuthenticate,
})

export default connect(mapStateToProps, {isLogged, setAuthenticate})(App);

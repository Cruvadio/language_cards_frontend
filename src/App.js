import React from 'react';
//import logo from './logo.svg';
//import s from './App.module.scss';
import Header from "./components/Header/Header";
import "./main.scss"
import Profile from "./components/Profile/Profile";

import {
    Route,
} from "react-router-dom"
import IntroContainer from "./components/Intro/IntroContainer";

function App(props) {
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
            <Route exact path='/' render={() => <IntroContainer />}/>
            <Route path='/profile' render={() => <Profile />}/>
            {/*<Intro buttonName={props.buttonName} introTitle={props.introTitle}/>*/}
        </div>
    );
}

export default App;

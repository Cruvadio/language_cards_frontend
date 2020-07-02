import React from 'react';
//import logo from './logo.svg';
//import s from './App.module.scss';
import Header from "./components/Header/Header";
import "./main.scss"
//import Intro from "./components/Intro/Intro";
import Profile from "./components/Profile/Profile";

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
            <Header navData={props.navData} />
            {/*<Intro buttonName={props.buttonName} introTitle={props.introTitle}/>*/}
            <Profile />
        </div>
    );
}

export default App;

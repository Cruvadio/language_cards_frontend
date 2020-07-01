import React from 'react';
import logo from './logo.svg';
import s from'./App.module.scss';
import Header from "./components/Header/Header";
import "./main.scss"

function App() {
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
      <Header />
  );
}

export default App;

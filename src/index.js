import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import IntroTitleBold from "./components/Intro/IntroTitle/IntroTitleBold/IntroTitleBold";
import FontAwesomeIcon from "./components/FontAwesomeIcon";

let buttonName = "Join";



let navData = [
    {id: 1, link: "#", content: "About us"},
    {id: 2, link: "#", content: "Home"},
    {id: 3, link: "#", content: "Contact us"},
    {id: 4, link: "#", content: <FontAwesomeIcon className='fas fa-sign-in-alt' />},
]

let introTitle = <div>Which <IntroTitleBold content="words"/> would you like to train?</div>;

ReactDOM.render(
  <React.StrictMode>
    <App navData={navData} buttonName={buttonName} introTitle={introTitle}/>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


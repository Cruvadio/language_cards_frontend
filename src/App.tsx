import React, {useEffect} from 'react';
//import logo from './logo.svg';
//import s from './App.module.scss';
import Header from "./components/Header/Header";
import "./main.scss"
import Profile from "./components/Profile/Profile";

import {Redirect, Route, Switch,} from 'react-router'
import {connect} from 'react-redux';
import Login from "./components/Login/Login";
import {initialize} from "./redux/reducers/app_reducer";
import PrivateRoute from "./components/Routers/PrivateRouter";
import ProfileRoute from "./components/Routers/ProfileRouter";
import Landing from "./components/Landing/Landing";
import Prelode from "./components/common/Prelode/Prelode";
import Registration from "./components/Registration/Registration";
import ProfileEdit from "./components/ProfileEdit/ProfileEdit";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import {RootState} from "./redux/store";
import Users from './components/Users/Users';
import Dialogs from './components/Dialogs/Dialogs'
import {Layout} from 'antd'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#e6f7ff',
            main: '#1890ff',
            dark: '#096dd9',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffd6e7',
            main: '#eb2f96',
            dark: '#c41d7f',
            contrastText: '#fff',
        },
    },
});


type MapStatePropsType = {
    isInitialized: boolean
    isNewUser: boolean
}

type MapDispatchProps = {
    initialize: () => void
}

const App : React.FC<MapStatePropsType & MapDispatchProps> =
    ({initialize, isInitialized, isNewUser}) => {
    useEffect(() => {
        initialize();
    }, [isInitialized, initialize]);

    if (!isInitialized) {
        return <Prelode/>
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

        <ThemeProvider theme={theme}>
            <Layout className="layout">
                <Header/>
                {isNewUser && <Redirect to={"/edit/profile"}/>
                }
                <Layout.Content>
                <Switch>
                    <ProfileRoute exact path='/'>
                        <Landing/>
                    </ProfileRoute>
                    <PrivateRoute path='/profile/:user_id?'>
                        <Profile/>
                    </PrivateRoute>
                    <Route path={"/edit/profile"} render={() => {
                        return <ProfileEdit/>
                    }}/>
                    <ProfileRoute path='/login/'>
                        <Login/>
                    </ProfileRoute>

                    <ProfileRoute path='/sign_up'>
                        <Registration/>
                    </ProfileRoute>

                    <PrivateRoute path='/users/'>
                        <Users/>
                    </PrivateRoute>

                    <PrivateRoute path='/messages/'>
                        <Dialogs/>
                    </PrivateRoute>
                </Switch>
                {/*<Intro buttonName={props.buttonName} introTitle={props.introTitle}/>*/}
                </Layout.Content>
            </Layout>
        </ThemeProvider>
    );
}


let mapStateToProps = (state: RootState) => ({
    isInitialized: state.app.isInitialized,
    isNewUser: state.auth.isNewUser,
})


export default connect<MapStatePropsType, MapDispatchProps, {}, RootState>(mapStateToProps, {initialize})(App);

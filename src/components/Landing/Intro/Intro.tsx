import React from "react";
import s from './Intro.module.scss'
import Button from "../../common/Button/Button";
import IntroTitle from "./IntroTitle/IntroTitle";
import ts from "./IntroTitle/IntroTitle.module.scss"
import {connect} from "react-redux";
import {RootState} from "../../../redux/store";
import {NavLink} from "react-router-dom";
import { compose } from "redux";


type MapStatePropsType = {
    introTitle: string,
    buttonName: string
}

type MapDispatchPropsType = {
}

type OwnPropsType = {

}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;



const Intro : React.FC<PropsType> = ({introTitle, buttonName}) => {
    return (
        <div className={s.content}>
            <div className={s.intro} id="intro"></div>
            <div className={s.inner}>
                <IntroTitle content={introTitle}/>
                <div className={ts.background}></div>
                <Button name={buttonName} className={s.button}/>
            </div>
        </div>
    )
}


let mapStateToProps = (state : RootState) => ({
    introTitle: state.intro.introTitle,
    buttonName: state.intro.buttonName,
})


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(mapStateToProps, {}))
(Intro);

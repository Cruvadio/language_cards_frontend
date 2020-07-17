import IntroTitleBold from "../../components/Landing/Intro/IntroTitle/IntroTitleBold/IntroTitleBold";
import React from "react";


let initialState = {
    introTitle: <div>Which <IntroTitleBold content="words"/> would you like to train?</div>,
    buttonName: "Join",
}

const introReducer = (state = initialState, action) => {
    return state;
}

export default introReducer;
import React from "react";
import LandingContent from "./LandingContent/LandingContent";
import Intro from "./Intro/Intro";

const Landing : React.FC = () => {

    return (
        <div>
            <Intro />
            <LandingContent/>
        </div>
    )
}


export default Landing;
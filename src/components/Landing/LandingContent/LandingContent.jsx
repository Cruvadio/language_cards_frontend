import React from "react";
import LandingSection from "./LandingSection/LandingSection";

const dummyText = "Natoque nam sed blandit lacinia luctus ullamcorper etiam sagittis egestas\n" +
    "                    massa interdum ut elementum in tristique elit urna convallis quis elementum eleifend faucibus.\n" +
    "                    Platea ipsum tortor natoque. Vivamus curae; imperdiet penatibus. Bibendum\n" +
    "                    taciti aenean dapibus non pretium risus suspendisse inceptos aptent mauris taciti semper ridiculus\n" +
    "                    sem primis sit nostra mi nunc dolor ligula urna senectus phasellus suscipit pretium eleifend odio\n" +
    "                    accumsan hac. Justo erat. Ipsum mus. Vehicula\n" +
    "                    nisi fusce a platea felis bibendum curae; augue magnis mus nullam dui mi lacinia elit dictumst ipsum\n" +
    "                    suspendisse. Hendrerit mollis placerat sodales primis venenatis dolor. Arcu massa. Elementum eu\n" +
    "                    etiam hac adipiscing convallis."

const LandingContent = () => {
    return (
        <div>
            <LandingSection title={"Welcome to language cards"} text={dummyText} id={"about_us"}/>
        </div>
    )
}


export default LandingContent;
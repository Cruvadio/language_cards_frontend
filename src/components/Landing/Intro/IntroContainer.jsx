import {connect} from "react-redux";
import Intro from "./Intro";

let mapStateToProps = (state) => ({
    introTitle: state.intro.introTitle,
    buttonName: state.intro.buttonName,
})


let mapDispatchToProps = (dispatch) => ({

})


let IntroContainer = connect(mapStateToProps, mapDispatchToProps)(Intro)

export default IntroContainer;
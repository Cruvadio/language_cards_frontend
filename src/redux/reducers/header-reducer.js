import FontAwesomeIcon from "../../components/common/FontAwesomeIcon";
import React from "react";


let initialState = {
    navData: [
        {id: 1, link: "/", content: "Home"},
        {id: 2, link: "/about_us/", content: "About us"},
        {id: 3, link: "/contact_us/", content: "Contact us"},
    ]
}


const headerReducer = (state = initialState, action) => {
    return state;
}

export default headerReducer;
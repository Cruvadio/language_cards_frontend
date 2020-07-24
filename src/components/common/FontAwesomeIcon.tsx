import React from "react";

type PropsType = {
    className: string
}

const FontAwesomeIcon : React.FC<PropsType> = ({className}) => {
    return (
        <i className={className}></i>
    )
}

export default FontAwesomeIcon;
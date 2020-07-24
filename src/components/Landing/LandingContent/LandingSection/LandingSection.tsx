import React from "react";
import s from "./LandingSection.module.scss"

type PropsType = {
    id : string,
    title: string,
    text: string
}

const LandingSection : React.FC<PropsType> = ({id, text, title}) => {
    return (
        <section className={s.section} id={id} >
            <div className="container">
                <h2 className={s.title}>{title}</h2>
                <p className={s.text}>{text}</p>
            </div>
        </section>
    )
}


export default LandingSection;
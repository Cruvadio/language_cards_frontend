import React from "react";
import s from "./LandingSection.module.scss"

const LandingSection = (props) => {
    return (
        <section className={s.section} id={props.id}>
            <div className="container">
                <h2 className={s.title}>{props.title}</h2>
                <p className={s.text}>{props.text}</p>
            </div>
        </section>
    )
}


export default LandingSection;
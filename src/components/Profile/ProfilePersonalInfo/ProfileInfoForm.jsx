import s from "./ProfilePersonalInfo.module.scss";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {SelectInput, Textarea} from "../../common/utils/FormControls";
import {connect} from "react-redux";
import {compose} from "redux";
import {Button} from "@material-ui/core";

let ProfileInfoForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.personalInfo}> Personal Info</div>
            <ul className={s.list}>
                <li className={s.personalInfo_element}>
                    <span className={s.elementCategory}>Birth Date:</span>
                    <Field
                        name="birth_date"
                        type="date"
                        component={Textarea}/>

                </li>
                <li className={s.personalInfo_element}>
                    <span className={s.elementCategory}>Hobbies:</span>
                    <Field
                        name="hobbies"
                        variant="outlined"
                        component={Textarea}
                    />
                </li>
                <li className={s.personalInfo_element}>
                    <span className={s.elementCategory}>Languages I know:</span>
                    <Field labelID="language_know_label" name="languages_know" objects={props.languages}
                           component={SelectInput}/>
                </li>
                <li className={s.personalInfo_element}>
                    <span className={s.elementCategory}>Languages I learn:</span>
                    <Field labelID="language_learn_label" name="languages_learn" objects={props.languages}
                           component={SelectInput}/>
                </li>
                <li className={s.personalInfo_element + " " + s.about}>
                    <span className={s.elementCategory}>About me:</span>
                    <Field
                        name="about_me"
                        variant="outlined"
                        component={Textarea}
                    />
                </li>
            </ul>
            <Button type="submit" color="primary">Submit</Button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    languages: state.common.languages
})


export default compose(
    connect(mapStateToProps),
    reduxForm({form: "profile-info-form"}),
)(ProfileInfoForm)
import s from "./ProfilePersonalInfo.module.scss";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {SelectInput, Textarea} from "../../common/utils/FormControls";
import {connect} from "react-redux";
import {compose} from "redux";
import {Button} from "@material-ui/core";
import {RootState} from "../../../redux/store";

type PropsType = {
    languages: Array<string>
}

export type FormDataType = {
    birth_date: string
    hobbies: string
    languages_know: Array<string>
    languages_learn: Array<string>
    about_me: string
}


let ProfileInfoForm : React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = (props) => {
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

const mapStateToProps = (state : RootState) => ({
    languages: state.common.languages
})

type Dispatch = {

}


export default connect<PropsType, Dispatch, {}, RootState>
(mapStateToProps)(
    reduxForm<FormDataType, PropsType>({form: "profile-info-form"})(ProfileInfoForm))




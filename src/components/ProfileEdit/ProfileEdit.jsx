import React from "react";
import formStyles from '../common/utils/FormControls.module.scss'
import s from './ProfileEdit.module.scss'
import FontAwesomeIcon from "../common/FontAwesomeIcon";
import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";
import {Textarea} from "../common/utils/FormControls";
import {required, maxLength, numbersSpecialSymbolsLetters} from "../common/utils/validators/validators";
import {unionClasses} from "../common/utils/helpers/helpers";
import Button from "../common/Button/Button";
import {createUser} from "../../redux/reducers/auth_reducer";
import {connect} from "react-redux";
import {editProfile} from "../../redux/reducers/profile-reducer";

const maxLength150 = maxLength(150);

let ProfileEditForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.inner}>
            <h1>Edit Profile</h1>
            {props.error &&
            <div className={formStyles.text}>
                {props.error}
            </div>}
            <div className={s.block}>
                <label>Birth date</label>
                <Field
                    validate={[required]}
                    className={formStyles.input}
                    type="date"
                    name='birth_date'
                    component={Textarea}
                />
            </div>
            <div className={s.block}>
                <label>Hobbies</label>
                <Field
                    validate={[maxLength150, required]}
                    className={formStyles.input}
                    name='hobbies'
                    component={Textarea}
                />
            </div>
            <div className={s.block}>
                <label>About me</label>
                <Field
                    validate={[maxLength150, required]}
                    className={formStyles.input}
                    name='about_me'
                    component={Textarea}
                />
            </div>
            <Button name={"Confirm"} className={unionClasses(formStyles.input, formStyles.button, s.button)}/>


        </form>
    )
}

ProfileEditForm = reduxForm({
    form: 'profileEdit/signup'
})(ProfileEditForm)

const ProfileEdit = (props) => {

    const handleSubmit = formData => {
        console.log(formData)
        props.editProfile(
            props.userID,
            ["English"],
            ["English"],
            formData.birth_date,
            formData.hobbies,
            formData.about_me)
    }

    return (
        <div className={s.registration}>

            <ProfileEditForm onSubmit={handleSubmit}/>
        </div>
    )
}

let mapStateToProps = (state) => ({
    userID : state.auth.currentUser.userID
})


export default connect(mapStateToProps, {editProfile})(ProfileEdit);
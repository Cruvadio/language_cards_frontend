import React from "react";
import formStyles from '../common/utils/FormControls.module.scss'
import s from './Registration.module.scss'
import FontAwesomeIcon from "../common/FontAwesomeIcon";
import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";
import {Textarea} from "../common/utils/FormControls";
import {required, maxLength, numbersSpecialSymbolsLetters} from "../common/utils/validators/validators";
import {unionClasses} from "../common/utils/helpers/helpers";
import Button from "../common/Button/Button";
import {createUser} from "../../redux/reducers/auth_reducer";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";

const maxLength150 = maxLength(150);

let RegistrationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.inner}>

                <h1>Sign up</h1>
                {props.error &&
                <div className={formStyles.text}>
                    {props.error}
                </div>}
            <Grid container direction="column" spacing={3} className={s.block} >
                <Grid item>
                    <Field
                        label='Username'
                        validate={[required, maxLength150, numbersSpecialSymbolsLetters]}
                        name='username'
                        variant="outlined"
                        component={Textarea}
                        className={s.item}
                    />
                </Grid>
                <Grid item>
                    <Field
                        label='Email'
                        validate={[maxLength150,]}
                        type='email'
                        name='email'
                        variant="outlined"
                        component={Textarea}
                        className={s.item}
                    />
                </Grid>
                <Grid item className={s.block}>
                    <Field
                        label='Last name'
                        validate={[maxLength150,]}
                        name='last_name'
                        variant="outlined"
                        component={Textarea}
                        className={s.item}
                    />
                </Grid>
                <Grid item className={s.block}>
                    <Field
                        label='First name'
                        validate={[maxLength150,]}
                        name='first_name'
                        variant="outlined"
                        component={Textarea}
                        className={s.item}
                    />
                </Grid >

                <Grid item className={s.block}>
                    <Field
                        label='Password'
                        validate={[required, maxLength150]}
                        type='password'
                        name='password'
                        variant="outlined"
                        component={Textarea}
                        className={s.item}
                    />
                </Grid>

            </Grid>
            <Button name={"Confirm"} className={unionClasses(formStyles.input, formStyles.button, s.button)}/>
        </form>
    )
}

RegistrationForm = reduxForm({
    form: 'registration/signup'
})(RegistrationForm)

const Registration = (props) => {

    const handleSubmit = formData => {
        props.createUser(formData.username,
            formData.email,
            formData.last_name,
            formData.first_name,
            formData.password)
    }

    return (
        <div className={s.registration}>

            <RegistrationForm onSubmit={handleSubmit}/>
        </div>
    )
}


export default connect(null, {createUser})(Registration);
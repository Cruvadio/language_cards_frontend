import React from "react";
import s from './Login.module.scss'
import formStyles from '../common/utils/FormControls.module.scss'
import FontAwesomeIcon from "../common/FontAwesomeIcon";
import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";
import {Textarea} from "../common/utils/FormControls";
import {required, maxLength} from "../common/utils/validators/validators";
import Button from "../common/Button/Button";
import {unionClasses} from "../common/utils/helpers/helpers";

const maxLength150 = maxLength(150);

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.inner}>
            <div className={s.header}>
                <h1>Login</h1>
                {props.error &&
                <div className={s.error}>
                    {props.error}
                </div>}
            </div>
            <Field
                validate={[required, maxLength150]}
                //className={formStyles.input}
                name='username'
                label='Username'
                variant="outlined"
                component={Textarea}
            />
            <Field
                validate={[required, maxLength150]}
                //className={formStyles.input}
                type='password'
                name='password'
                label='Password'
                variant="outlined"
                component={Textarea}
            />
            <Button name={"Login"} className={unionClasses(formStyles.input, formStyles.button)}/>



            <NavLink to='/reset_password' className={s.forgot}>Forgot <span>Username / Password</span></NavLink>
            <NavLink to='/sign_up' className={s.account}> Create account <FontAwesomeIcon className="fas fa-arrow-right"/></NavLink>
        </form>
    )
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {

    const handleSubmit = formData => {
       console.log(formData)
        props.loginUser(formData.username, formData.password)
    }

    return (
        <div className={s.login}>

            <LoginForm onSubmit={handleSubmit}/>
        </div>
    )
}

export default Login;
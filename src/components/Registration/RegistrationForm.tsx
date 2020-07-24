import React from "react";
import formStyles from '../common/utils/FormControls.module.scss'
import s from './Registration.module.scss'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/utils/FormControls";
import {maxLength, numbersSpecialSymbolsLetters, required} from "../common/utils/validators/validators";
import {unionClasses} from "../common/utils/helpers/helpers";
import Button from "../common/Button/Button";
import Grid from "@material-ui/core/Grid";

const maxLength150 = maxLength(150);

export type FormDataType = {
    username: string
    email: string
    last_name :string
    first_name: string
    password: string
}

let RegistrationForm : React.FC<InjectedFormProps<FormDataType>> = (props) => {
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

export default reduxForm<FormDataType>({form: 'registration/signup'})(RegistrationForm)

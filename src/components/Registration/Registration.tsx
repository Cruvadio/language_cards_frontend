import React from "react";
import s from './Registration.module.scss'
import {createUser} from "../../redux/reducers/auth_reducer";
import {connect} from "react-redux";
import RegistrationForm, { FormDataType } from "./RegistrationForm";


type MapDispatchProps = {
    createUser: (username: string,
                 email: string,
                 last_name : string,
                 first_name : string,
                 password : string) => void
}

const Registration : React.FC<MapDispatchProps> = (props) => {

    const handleSubmit = (formData : FormDataType) => {
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


export default connect<{}, MapDispatchProps>(null, {createUser})(Registration);
import React, {useState} from "react";
import s from './Login.module.scss'
import FontAwesomeIcon from "../common/FontAwesomeIcon";

const Login = (props) => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    const handleChange = event => {
        switch (event.target.name) {
            case "username":
                setUsername(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            default:
                console.log("no element with names password and username");
        }

    }

    const handleSubmit = event => {
        event.preventDefault();
        props.loginUser(username, password)
    }

    return (
        <div className={s.login}>
            <form onSubmit={handleSubmit} className={s.inner}>
                <h1>Login</h1>
                <input
                    className={s.input}
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChange={handleChange}
                />
                <input
                    className={s.input}
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={handleChange}
                />
                <input type='submit' className={s.input + ' ' + s.button}/>

                <a href='#' className={s.forgot}>Forgot <span>Username / Password</span></a>
                <a href='#' className={s.account}> Create account <FontAwesomeIcon className="fas fa-arrow-right"/></a>
            </form>

        </div>
    )
}

export default Login;
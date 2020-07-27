import axios from "axios";
import {tokenAPI, TokenPairType} from "./token_api";
import {API_URL} from "./api";

export type CreateUserType = {
    username: string
    email: string
    last_name: string
    first_name: string
    password: string
}
export type LoginUserType = {
    username: string
    password: string
}
export type LoggedUser = {
    id: number
    email: string
    username: string
}
export let authAPI = {



    createUser(data: CreateUserType) {
        return axios.post<CreateUserType>(API_URL + "auth/users/", data)
            .then(response => response.data)
    },
    loginUser(data: LoginUserType) {
        return axios.post<TokenPairType>(API_URL + "auth/jwt/create/", data)
            .then(response => response.data)
    },
    async isLoggedIn() {
        return axios.get<LoggedUser>(API_URL + "auth/users/me/",
            {
                headers: await tokenAPI.makeAuthorizationToken()
            })
            .then(response => response.data)
    },


    createNewUser(username: string, email: string, last_name: string, first_name: string, password: string) {
        return axios.post<CreateUserType>(API_URL + `auth/users/`, {
            username,
            email,
            last_name,
            first_name,
            password
        }).then(response => response.data);
    },


}


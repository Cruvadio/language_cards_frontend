import axios from "axios";
import {CardsetType, PhotosType, ProfileType} from "../types/global";

const API_URL = "http://localhost:8000/api/v1/";


const makeAuthorizationToken = () => ({
    "Authorization": `JWT ${localStorage.access}`
})

type CreateUserType = {
    username: string
    email: string
    last_name : string
    first_name : string
    password : string
}

type LoginUserType = {
    username: string
    password: string
}

type LoggedUser = {
    id: number
    email: string
    username: string
}

type TokenPairType = {
    access: string
    refresh: string
}
export let userAPI = {
    createUser(data : CreateUserType) {
        return axios.post<CreateUserType>(API_URL + "auth/users/", data)
            .then(response => response.data)
    },
    loginUser(data : LoginUserType) {
        return axios.post<TokenPairType>(API_URL + "auth/jwt/create/", data)
            .then(response => response.data)
    },
    isLoggedIn() {
        return axios.get<LoggedUser>(API_URL + "auth/users/me/",
            {
                headers: makeAuthorizationToken()
            })
            .then(response => response.data)
    },

    refreshToken() {
        return axios.post<TokenPairType>(API_URL + "auth/jwt/refresh/", {
            refresh: localStorage.refresh
        }).then(response => response.data)
    },

    blacklistToken(){
        return axios.post<null>(API_URL + "auth/blacklist/", {
            refresh: localStorage.refresh
        }).then(response => response.data)
    },

    createNewUser(username: string, email : string,last_name : string, first_name : string, password : string){
        return axios.post<CreateUserType>(API_URL + `auth/users/`, {
            username,
            email,
            last_name,
            first_name,
            password
        }).then(response => response.data);
    },

    getProfile(userID : number) {
        return axios.get<ProfileType>(API_URL+ `profiles/${userID}/`,
            {
                headers: makeAuthorizationToken()
            }).then(response => response.data)
    },

    changeAvatar(image : File) {
        let formData = new FormData();
        formData.append("file", image);
        return axios.put<PhotosType>(API_URL + `profiles/avatar/`,formData,
            {
                headers: {
                    ...makeAuthorizationToken(),
                    'Content-Disposition': `attachment; filename=${image.name}`,
                    'Content-type': 'multipart/form-data',
                }
            }).then(response => response.data)
    },

    editProfile(userID : number,
                languages_know : Array<string>,
                languages_learn : Array<string>,
                birth_date : string,
                hobbies : string,
                about_me : string) {
        let data = {
            languages_know,
            languages_learn,
            birth_date,
            hobbies,
            about_me
        }
        return axios.put<null>(API_URL + `profiles/${userID}/`,data,
            {
                headers: {
                    ...makeAuthorizationToken(),
                }
            }).then(response => response.data)
    }

}


interface APIList<T> {
    next: string
    count:number
    results: Array<T>
}

export let cardsAPI = {

    getCurrentUserCards(nextPage : string | null, pageSize : number) {
        if (!nextPage) nextPage = API_URL + `cardsets/?page_size=${pageSize}`
        return axios.get<APIList<CardsetType>>(nextPage,
            {
                headers: makeAuthorizationToken()
            })
            .then(response => response.data)
    }

}

type LanguageType = {
    name: string
}

export const commonAPI = {
    loadLanguages () {
        return axios.get<APIList<LanguageType>>(API_URL + 'languages?page_size=100')
            .then(response => response.data)
    }
}
import *  as axios from "axios";

const API_URL = "http://localhost:8000/api/v1/";


const makeAuthorizationToken = () => ({
    "Authorization": `JWT ${localStorage.access}`
})

export let userAPI = {
    createUser(data) {
        return axios.default.post(API_URL + "auth/users/", data)
            .then(response => response.data)
    },
    loginUser(data) {
        return axios.default.post(API_URL + "auth/jwt/create/", data)
            .then(response => response.data)
    },
    isLoggedIn() {
        return axios.default.get(API_URL + "auth/users/me/",
            {
                headers: makeAuthorizationToken()
            })
            .then(response => response.data)
    },

    refreshToken() {
        return axios.default.post(API_URL + "auth/jwt/refresh/", {
            refresh: localStorage.refresh
        }).then(response => response.data)
    },

    blacklistToken(){
        return axios.default.post(API_URL + "auth/blacklist/", {
            refresh: localStorage.refresh
        }).then(response => response.data)
    },

    createNewUser(username, email,last_name, first_name, password){
        return axios.default.post(API_URL + `auth/users/`, {
            username,
            email,
            last_name,
            first_name,
            password
        }).then(response => response.data);
    },

    getProfile(userID) {
        return axios.default.get(API_URL+ `profiles/${userID}/`,
            {
                headers: makeAuthorizationToken()
            }).then(response => response.data)
    },

    changeAvatar(image) {
        let formData = new FormData();
        formData.append("file", image);
        return axios.default.put(API_URL + `profiles/avatar/`,formData,
            {
                headers: {
                    ...makeAuthorizationToken(),
                    'Content-Disposition': `attachment; filename=${image.name}`,
                    'Content-type': 'multipart/form-data',
                }
            }).then(response => response.data)
    },

    editProfile(userID,
                languages_know,
                languages_learn,
                birth_date,
                hobbies,
                about_me) {
        let data = {
            languages_know,
            languages_learn,
            birth_date,
            hobbies,
            about_me
        }
        return axios.default.put(API_URL + `profiles/${userID}/`,data,
            {
                headers: {
                    ...makeAuthorizationToken(),
                }
            }).then(response => response.data)
    }

}


export let cardsAPI = {

    getCurrentUserCards(nextPage, pageSize) {
        if (!nextPage) nextPage = API_URL + `cardsets/?page_size=${pageSize}`
        return axios.default.get(nextPage,
            {
                headers: makeAuthorizationToken()
            })
            .then(response => response.data)
    }

}


export const commonAPI = {
    loadLanguages () {
        return axios.default.get(API_URL + 'languages?page_size=100')
            .then(response => response.data)
    }
}
import *  as axios from "axios";

const API_URL = "http://localhost:8000/";


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
                headers: {
                    "Authorization": `Bearer ${localStorage.access}`
                }
            })
            .then(response => response.data)
    },

    refreshToken() {
        return axios.default.post(API_URL + "auth/jwt/refresh/", {
            refresh: localStorage.refresh
        }).then(response => response.data)
    },

    getProfile(userID) {
        return axios.default.get(`http://localhost:8000/profiles/${userID}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.access}`
                }
            })
            .then(response => response.data)
    }


}


export let cardsAPI = {

    getCurrentUserCards(nextPage) {
        if (!nextPage) nextPage = API_URL + `cardsets/?limit=3&offset=0`
        return axios.default.get(nextPage,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.access}`
                }
            })
            .then(response => response.data)
    }

}
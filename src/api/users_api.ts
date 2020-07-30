import axios from "axios";
import {API_URL, APIList} from "./api";
import {tokenAPI} from "./token_api";
import {FilterUsers, UserListType} from '../types/global'

export const usersAPI = {

    async follow(userID: number) {
        return axios.post<UserListType>(API_URL + `profiles/${userID}/follow/`, {}, {
            headers: await tokenAPI.makeAuthorizationToken()
        }).then((response) => {
            return response.data
        })
    },

    async unfollow(userID: number) {

        return axios(
            {
                url: API_URL + `profiles/${userID}/follow/`,
                method: "DELETE",
                headers: await tokenAPI.makeAuthorizationToken()
            }
        ).then(response => {
            return response.data as UserListType
        })
    },

    async getUsers(page: number, pageSize: number, query: string) {
        return axios.get<APIList<UserListType>>(API_URL + `profiles/?page=${page}&page_size=${pageSize}&` + query,
            {
                headers: await tokenAPI.makeAuthorizationToken()
            }).then(response => response.data)
    },

    async getFrinds (page: number, pageSize: number){
        return axios.get<APIList<UserListType>>(API_URL + `friends/?page=${page}&page_size=${pageSize}`,
            {
                headers: await tokenAPI.makeAuthorizationToken()
            }).then(response => response.data)
    }
}
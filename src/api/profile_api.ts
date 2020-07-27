import axios from "axios";
import {PhotosType, ProfileType} from "../types/global";
import {tokenAPI} from "./token_api";
import {API_URL} from "./api";

export const profileAPI = {
    async getProfile(userID: number) {
        return axios.get<ProfileType>(API_URL + `profiles/${userID}/`,
            {
                headers: await tokenAPI.makeAuthorizationToken()
            }).then(response => response.data)
    },

    async changeAvatar(image: File) {
        let formData = new FormData();
        formData.append("file", image);
        return axios.put<PhotosType>(API_URL + `profiles/avatar/`, formData,
            {
                headers: {
                    ...await tokenAPI.makeAuthorizationToken(),
                    'Content-Disposition': `attachment; filename=${image.name}`,
                    'Content-type': 'multipart/form-data',
                }
            }).then(response => response.data)
    },

    async editProfile(userID: number,
                      languages_know: Array<string>,
                      languages_learn: Array<string>,
                      birth_date: string,
                      hobbies: string,
                      about_me: string,
    ) {
        let data = {
            languages_know,
            languages_learn,
            birth_date,
            hobbies,
            about_me
        }
        return axios.put<null>(API_URL + `profiles/${userID}/`, data,
            {
                headers: await tokenAPI.makeAuthorizationToken()
            }).then(response => response.data)
    }


};
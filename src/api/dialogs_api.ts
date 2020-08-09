import {CreateDialog, DialogType, MessageType, SendMessageType} from '../types/global'
import axios from 'axios'
import {API_URL, APIList} from './api'
import {tokenAPI} from './token_api'

export const dialogsAPI = {
    async sendMessage(message: SendMessageType, dialogID: number) {
        return axios.post<MessageType>(API_URL + `dialogs/${dialogID}/messages/`, message, {
            headers: await tokenAPI.makeAuthorizationToken()
        }).then(res => res.data)
    },

    async getDialogs(page: number) {
        return axios.get<APIList<DialogType>>(API_URL + `dialogs/?page=${page}`, {
            headers: await tokenAPI.makeAuthorizationToken()
        }).then(res => res.data)
    },

    async getMessages(dialogID: number, page: number) {
        return axios.get<APIList<MessageType>>(API_URL + `dialogs/${dialogID}/messages/?page=${page}`,
            {
                headers: await tokenAPI.makeAuthorizationToken()
            }).then(res => res.data)
    },

    async createDialog(dialog : CreateDialog) {
        return axios.post<CreateDialog>(API_URL + `dialogs/`, {
            headers: await tokenAPI.makeAuthorizationToken()
        }).then(res => res.data)
    }
}
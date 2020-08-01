import {MessageType} from '../types/global'
import axios from "axios";
import {API_URL} from './api'
import {tokenAPI} from './token_api'

export const dialogsAPI = {
    sendMessage(message: MessageType){
        axios.post(API_URL + 'messages/', message, {
            headers: tokenAPI.makeAuthorizationToken()
        })
    }
}
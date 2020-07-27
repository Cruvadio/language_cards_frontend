import axios from "axios";
import {CardsetType} from "../types/global";
import {tokenAPI} from "./token_api";
import {API_URL, APIList} from "./api";

export let cardsAPI = {

    async getCurrentUserCards(nextPage: string | null, pageSize: number) {
        if (!nextPage) nextPage = API_URL + `cardsets/?page_size=${pageSize}`
        return axios.get<APIList<CardsetType>>(nextPage,
            {
                headers: await tokenAPI.makeAuthorizationToken()
            })
            .then(response => response.data)
    }

}
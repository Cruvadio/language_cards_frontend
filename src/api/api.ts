import axios from "axios";

export const API_URL = "http://localhost:8000/api/v1/";


export type APIList<T> = {
    next: string
    count:number
    results: Array<T>
}

export type LanguageType = {
    name: string
}

export const commonAPI = {
    loadLanguages () {
        return axios.get<APIList<LanguageType>>(API_URL + 'languages/?page_size=100')
            .then(response => response.data)
    }
}
import axios from "axios";
import {API_URL} from "./api";
import {authAPI} from "./auth_api";

export type TokenPairType = {
    access: string
    refresh: string
}
export const tokenAPI = {

    _setToken(token: TokenPairType | null) {
        if (token) {
            localStorage.setItem("JWT_REFRESH_TOKEN_AUTH", token.refresh)
            localStorage.setItem("JWT_ACCESS_TOKEN_AUTH", token.access)
        } else {
            localStorage.removeItem("JWT_REFRESH_TOKEN_AUTH")
            localStorage.removeItem("JWT_ACCESS_TOKEN_AUTH")
        }
        return token;
    },

    async makeAuthorizationToken() {
        const access = await this.getAccessToken()
        if (access)
            return {"Authorization": `JWT ${access}`};
        return null
    },

    _isExpired(exp: number | null) {
        if (!exp) {
            return false;
        }

        return Date.now() > exp
    },

    _getExpirationDate: (jwtToken?: string): number | null => {
        if (!jwtToken) {
            return null
        }

        const jwt = JSON.parse(atob(jwtToken.split('.')[1]))

        return (jwt && jwt.exp && jwt.exp * 1000) || null
    },

    getToken(): TokenPairType | null {
        const access = localStorage.getItem("JWT_ACCESS_TOKEN_AUTH");
        const refresh = localStorage.getItem("JWT_REFRESH_TOKEN_AUTH")
        if (access && refresh)
            return {access, refresh}
        return null
    },


    async getAccessToken() {
        let token = this.getToken();
        if (!token) {
            return null
        }
        if (this._isExpired(this._getExpirationDate(token.access))) {
            const updatedToken = await this._refreshToken()

            token = this._setToken(updatedToken);

        }
        return token && token.access
    },


    async login(username: string, password: string) {
        const data = await authAPI.loginUser({username, password})
        this._setToken(data)
    },

    async logout() {
        const token = this.getToken();
        if (token) {
            await this._blacklistToken()
            this._setToken(null);
        }
    },

    isLoggedIn() {
        return !!this.getToken()
    },

    async _refreshToken() {
        const token = this.getToken()
        if (token) {
            return axios.post<TokenPairType>(API_URL + "auth/jwt/refresh/", {
                refresh: token.refresh
            }).then(response => response.data)
        }
        return null
    },

    async _blacklistToken() {
        const token = this.getToken()
        if (token) {
            return axios.post<null>(API_URL + "auth/blacklist/", {
                refresh: token.refresh
            }).then(response => response.data)
        }
        return null
    },

}
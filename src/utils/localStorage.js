import { STORAGE_KEY } from '../config/constants'

export default {
  getAccessToken: () => {
    return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN) || null
  },

  getRefreshToken: () => {
    return localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN) || null
  },

  saveAuthInfo: (me) => {
    localStorage.setItem(STORAGE_KEY.AUTH_ME_INFO, JSON.stringify(me))
  },

  getAuthInfo: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY.AUTH_ME_INFO))
  },

  removeAuthInfo: () => {
    localStorage.removeItem(STORAGE_KEY.AUTH_ME_INFO)
  },

  saveToken: (payload) => {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, payload.accessToken)
    localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, payload.refreshToken)
  },

  removeToken: () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN)
  }
}

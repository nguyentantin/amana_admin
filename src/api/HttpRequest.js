import axios from 'axios'
import { REQUEST_HEADER, API_URL } from '../config/constants'
import './HttpInterceptors'

export default class HttpRequest {
  constructor() {
    this.headers = REQUEST_HEADER
    this.apiURL = API_URL
    this.axios = axios
    this.CancelToken = this.axios.CancelToken
  }

  get(path, params) {
    const requestUrl = this.apiURL + path
    const requestConfig = params ? {params, headers: this.headers} : {headers: this.headers}
    return this.axios.get(requestUrl, requestConfig)
  }

  post(path, data) {
    const requestUrl = this.apiURL + path
    return this.axios.post(requestUrl, data, {headers: this.headers})
  }

  put(path, data) {
    const requestUrl = this.apiURL + path
    return this.axios.put(requestUrl, data, {headers: this.headers})
  }

  patch(path, data) {
    const requestUrl = this.apiURL + path
    return this.axios.patch(requestUrl, data, {headers: this.headers})
  }

  delete(path, params) {
    const requestUrl = this.apiURL + path
    const requestConfig = params ? {params, headers: this.headers} : {headers: this.headers}
    return this.axios.delete(requestUrl, requestConfig)
  }

  upload(path, data) {
    const requestUrl = this.apiURL + path
    const headers = {...this.headers, 'Content-Type': 'multipart/form-data'}

    return this.axios.post(requestUrl, data, {headers})
  }

  custom(config) {
    return this.axios(config)
  }

  cancelPost(path, data, options = {}) {
    const requestUrl = this.apiURL + path
    const source = this.CancelToken.source()

    const request = this.axios.post(requestUrl, data, {
      ...options,
      cancelToken: source.token,
      headers: this.headers
    })

    return {
      request,
      source
    }
  }

  setHeaders(headers) {
    this.headers = Object.assign(this.headers, headers)
  }
}

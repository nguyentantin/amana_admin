import axios from 'axios'
import NProgress from 'nprogress'
import { isEmpty } from 'lodash'

import LocalStorage from '../utils/localStorage'

NProgress.configure({showSpinner: false})

/**
 * Percentage progress.
 *
 * @param loaded
 * @param total
 * @returns {number}
 */
const calculatePercentage = (loaded, total) => (Math.floor(loaded * 1.0) / total)

axios.defaults.onDownloadProgress = (e) => {
  const percentage = calculatePercentage(e.loaded, e.total)

  NProgress.set(percentage)
}

axios.interceptors.request.use(
  (config) => {
    NProgress.start()
    const accessToken = LocalStorage.getAccessToken()

    if (!isEmpty(accessToken)) {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
      }

      config.headers = Object.assign(config.headers, headers)
    }

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response.data
  },
  (error) => {
    const statusCode = error.response && error.response.status
    switch (statusCode) {
      case 401:
        break
      case 404:
        // history.push('/404')
        break
      case 500:
        // history.push('/500')
        break
      default:
        break
    }

    NProgress.done()
    return Promise.reject(error.response && error.response.data)
  })

import { LOGIN_SUCCESS, REQUEST_LOGIN, LOGIN_ERROR, COLLAPSED_SIDEBAR } from './constants'
import makeActionCreator from '../../makeActionCreator'

export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'authInfo')
export const requestLogin = makeActionCreator(REQUEST_LOGIN, 'credentials')
export const loginError = makeActionCreator(LOGIN_ERROR)
export const collapsedSideBar = makeActionCreator(COLLAPSED_SIDEBAR)


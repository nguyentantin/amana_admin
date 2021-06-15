import produce from 'immer'
import _ from 'lodash'

import {
  LOGIN_SUCCESS,
  REQUEST_LOGIN,
  LOGIN_ERROR,
  COLLAPSED_SIDEBAR,
} from './constants'
import LocalStorage from '../../../utils/localStorage'

const isAuthenticated = !_.isEmpty(LocalStorage.getAccessToken())
const authInfo = LocalStorage.getAuthInfo()

const initialState = {
  loading: false,
  isAuthenticated: isAuthenticated,
  authInfo: authInfo,
  collapsedSideBar: false,
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_LOGIN:
        draft.loading = true
        break
      case LOGIN_SUCCESS:
        LocalStorage.saveToken(action.authInfo)
        LocalStorage.saveAuthInfo(action.authInfo.user)
        draft.isAuthenticated = true
        draft.authInfo = action.authInfo.user
        draft.loading = false
        break
      case LOGIN_ERROR:
        draft.loading = false
        break
      case COLLAPSED_SIDEBAR:
        draft.collapsedSideBar = !state.collapsedSideBar
        break
      default:
        return state
    }
  })

export default reducer

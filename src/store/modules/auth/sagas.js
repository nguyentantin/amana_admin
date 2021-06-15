import { call, takeLatest, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { reset } from 'redux-form'

import { REQUEST_LOGIN } from './constants'
import { loginSuccess, loginError } from './actions'
import AuthRequest from '../../../api/Request/AuthRequest'

function* login(action) {
  try {
    const data = yield call(AuthRequest.login.bind(AuthRequest), action.credentials)
    yield put(loginSuccess(data))
    yield put(push('/dashboard'))
  } catch (err) {
    yield put(loginError())
    yield put(reset('LoginForm'))
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* authSagas() {
  yield takeLatest(REQUEST_LOGIN, login)
}


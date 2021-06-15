const API_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost'

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const DOCS_URL = process.env.REACT_APP_DOCS_URL

const REQUEST_HEADER = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}

const GOOGLE_WEB_FONT = {
  google: {'families': ['Quicksand:400,700', 'Open Sans:300,400,700&display=swap']},
  active: () => {
    sessionStorage.fonts = true
  },
}

const GOOGLE_WEB_FONT_STATUS = {
  inactive: 'inactive',
  active: 'active',
  loading: 'loading',
}

const LOGIN_CREDENTIALS = {
  'client_id': process.env.REACT_APP_CLIENT_ID || 0,
  'client_secret': process.env.REACT_APP_CLIENT_SECRET || '',
  'grant_type': 'password'
}

const STORAGE_KEY = {
  ACCESS_TOKEN: 'Auth_access_token',
  REFRESH_TOKEN: 'Auth_refresh_token',
  AUTH_ME_INFO: 'Auth_me_info'
}

const HTTP_CODE = {
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
}

const PLATFORM_TYPE = {
  IOS: 'ios',
  ANDROID: 'android',
  WEB: 'web',
}

const ROLES = {
  SUPER_ADMIN: 1,
  PROJECT_ADMIN: 2,
  PROJECT_MEMBER: 3,
}

const PROJECT_ENV = {
  DEVELOPMENT: 1,
  STAGING: 2,
  PRODUCTION: 3
}
const PROJECT_ENV_COLOR = {
  DEVELOPMENT: 'green',
  STAGING: 'yellow',
  PRODUCTION: 'red',
}

export {
  REQUEST_HEADER,
  API_URL,
  STORAGE_KEY,
  LOGIN_CREDENTIALS,
  HTTP_CODE,
  GOOGLE_WEB_FONT,
  GOOGLE_WEB_FONT_STATUS,
  PLATFORM_TYPE,
  GOOGLE_CLIENT_ID,
  DOCS_URL,
  ROLES,
  PROJECT_ENV,
  PROJECT_ENV_COLOR,
}

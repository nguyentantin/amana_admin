import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const LoginPage = loadable(() => import('../../pages/Login/LoginPage'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/login',
    component: LoginPage,
    exact: true,
    restricted: true
  },
]

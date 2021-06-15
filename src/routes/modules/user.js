import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const UserList = loadable(() => import('../../pages/UserList/UserList'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/users',
    component: UserList,
    requiredAuth: true,
    exact: true,
  },
  {
    path: '/users/:id',
    component: UserList,
    requiredAuth: true,
    exact: true,
  },
]

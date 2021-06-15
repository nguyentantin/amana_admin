import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

const DepartmentList = loadable(() => import('../../pages/DepartmentList/DepartmentList'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/departments',
    component: DepartmentList,
    requiredAuth: true,
    exact: true,
  }
]

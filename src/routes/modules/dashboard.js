import React from 'react'

import loadable from '../../utils/loadable'
import LoadingPage from '../../components/LoadingPage/LoadingPage'
import { DashboardLayout } from '../../components/Layout'

const DashboardPage = loadable(() => import('../../pages/Dashboard/DashboardPage'), {
  fallback: <LoadingPage/>,
})

export default [
  {
    path: '/',
    redirect: true,
    redirectPath: '/dashboard',
    component: DashboardPage,
    layout: DashboardLayout,
    exact: true,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    layout: DashboardLayout,
    requiredAuth: true,
    exact: true,
  },
]

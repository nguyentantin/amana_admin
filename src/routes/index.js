import React from 'react'

import loadable from '../utils/loadable'
import LoadingPage from '../components/LoadingPage/LoadingPage'

const PageNotFound = loadable(() => import('../pages/Error/PageNotFound'), {
  fallback: <LoadingPage/>,
})

const ServerErrorPage = loadable(() => import('../pages/Error/ServerError'), {
  fallback: <LoadingPage/>,
})

/**
 * Get List Route Modules.
 *
 * @returns {[]}
 */
const modulesRoute = () => {
  const requireModule = require.context('./modules', true, /\.js$/)
  const modules = []

  requireModule.keys().forEach((fileName) => {
    const module = requireModule(fileName).default
    modules.push(...module)
  })

  return modules
}

export default [
  ...modulesRoute(),
  {path: '/404', exact: true, component: PageNotFound},
  {path: '/500', exact: true, component: ServerErrorPage},
  {path: '*', component: PageNotFound},
]

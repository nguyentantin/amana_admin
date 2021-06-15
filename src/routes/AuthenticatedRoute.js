import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { DashboardLayout } from '../components/Layout'
import LocalStorage from '../utils/localStorage'

const AuthenticatedRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = !_.isEmpty(LocalStorage.getAccessToken())

  if (isAuthenticated) {
    return (
      <Route
        {...rest}
        render={props => (
          <DashboardLayout>
            <Component {...props} />
          </DashboardLayout>
        )}
      />
    )
  }

  return (
    <Redirect to={{
      pathname: '/login',
    }}/>
  )
}

AuthenticatedRoute.propTypes = {
  component: PropTypes.any,
}

export default React.memo(AuthenticatedRoute)

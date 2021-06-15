import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import LocalStorage from '../utils/localStorage'

const RestrictedRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = !_.isEmpty(LocalStorage.getAccessToken())

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: {from: props.location}
            }}
          />
        ) : <Component {...props}/>
      }
    />
  )
}


RestrictedRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object,
}


export default React.memo(RestrictedRoute)

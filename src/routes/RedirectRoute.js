import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const RedirectRoute = ({redirectPath}) => {
  return (
    <Redirect to={{
      pathname: redirectPath,
    }}/>
  )
}

RedirectRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
}

export default React.memo(RedirectRoute)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import { map } from 'lodash'

import AuthenticatedRoute from '../../routes/AuthenticatedRoute'
import RedirectRoute from '../../routes/RedirectRoute'
import RestrictedRoute from '../../routes/RestrictedRoute'

class AppRoutes extends PureComponent {
  static propTypes = {
    routes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  }

  render() {
    const {routes} = this.props

    return (
      <Switch>
        {
          map(routes, (route, key) => {
            if (route.redirect) {
              return <RedirectRoute key={key} {...route}/>
            }

            if (route.requiredAuth) {
              return <AuthenticatedRoute key={key} {...route}/>

            }

            if (route.restricted) {
              return <RestrictedRoute key={key} {...route}/>
            }
          })
        }
      </Switch>
    )
  }
}

export default AppRoutes

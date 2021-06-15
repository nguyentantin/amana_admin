import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'

import 'antd/dist/antd.css'
import 'toastr/toastr.scss'
import 'nprogress/nprogress.css'
import './styles/app.scss'
import history from './utils/history'
import { configure } from './store'
import { GlobalStyle, theme } from './styles'
import AppRoutes from './components/Application/AppRoutes'
import route from './routes'

import * as serviceWorker from './serviceWorker'

/**
 * Main Application class.
 */
class Application {
  constructor() {
    this.MOUNT_NODE = document.getElementById('root')
  }


  initStore() {
    const initialState = {}

    return configure(initialState, history)
  }

  run() {
    const store = this.initStore()

    render((
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <Helmet>
              <meta name="description" content="Auto build application development by SI1 Studio."/>
              <meta property="og:title" content="Auto build application development by SI1 Studio."/>
              <meta property="og:description" content="Auto build application development by SI1 Studio."/>
              <meta property="og:url" content={window.location}/>
              <meta property="og:type" content="website"/>
              <meta property="og:site_name" content="SI1 Build Automation"/>
              <meta property="og:locale" content="en"/>
              <meta property="og:image" content={window.location}/>
              <meta name="twitter:card" content="summary_large_image"/>
            </Helmet>
            <GlobalStyle/>
            <AppRoutes routes={route}/>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    ), this.MOUNT_NODE)
  }
}

/**
 * Run application.
 */
new Application().run()

serviceWorker.unregister()

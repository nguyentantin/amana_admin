import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GOOGLE_WEB_FONT_STATUS } from '../../config/constants'

/**
 * WebFontLoader Component.
 */
export default class WebFontLoader extends Component {
  static propTypes = {
    config: PropTypes.oneOfType([PropTypes.object]).isRequired,
    children: PropTypes.element,
    onStatus: PropTypes.func.isRequired,
  }

  static defaultProps = {
    children: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      status: '',
    }
  }

  componentDidMount() {
    this.loadFonts()
  }

  componentDidUpdate(prevProps, prevState) {
    const {onStatus, config} = this.props
    const {status} = this.state

    if (prevState.status !== status) {
      onStatus(status)
    }

    if (prevProps.config !== config) {
      this.loadFonts()
    }
  }

  handleLoading = () => {
    this.setState({status: GOOGLE_WEB_FONT_STATUS.loading})
  }

  handleActive = () => {
    this.setState({status: GOOGLE_WEB_FONT_STATUS.active})
  }

  handleInactive = () => {
    this.setState({status: GOOGLE_WEB_FONT_STATUS.inactive})
  }

  loadFonts = () => {
    const {config} = this.props

    if (typeof window !== 'undefined') {
      const WebFont = require('webfontloader')
      WebFont.load({
        ...config,
        loading: this.handleLoading,
        active: this.handleActive,
        inactive: this.handleInactive,
      })
    }
  }

  render() {
    const {children} = this.props

    return React.Children.map(children, child => React.cloneElement(child, {}))
  }
}

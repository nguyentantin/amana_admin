import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ShowIf extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    condition: PropTypes.bool.isRequired,
  }

  render() {
    const {condition, children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    if (condition) {
      return childrenWithProps
    }

    return null
  }
}

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import PropTypes from 'prop-types'

import PreLoader from '../PreLoader'

@observer
class PreLoaderHandler extends Component {
  @observable loaded = false

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(this.checkReadyState)
    }
  }

  checkReadyState = () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (document.readyState === 'complete' && !this.loaded) {
        setTimeout(() => {
          this.loaded = true
        }, 200)
      } else {
        window.requestAnimationFrame(this.checkReadyState)
      }
    }
  }

  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    if (this.loaded) {
      return childrenWithProps
    }

    return (
      <PreLoader/>
    )
  }
}

export default PreLoaderHandler

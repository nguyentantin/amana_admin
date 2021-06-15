import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { AndroidOutlined, AppleOutlined, ChromeOutlined } from '@ant-design/icons'

import { PLATFORM_TYPE } from '../../config/constants'
import { ShowIf } from '../Utils'

const appleStyle = {
  fontSize: '20px',
  color: '#bf5af2',
}

const androidStyle = {
  fontSize: '20px',
  color: '#8eba3e',
}

const webStyle = {
  fontSize: '20px',
  color: '#fa8c16',
}

const PlatformIcon = ({platform}) => {
  return (
    <React.Fragment>
      <ShowIf condition={platform === PLATFORM_TYPE.IOS}>
        <AppleOutlined style={appleStyle}/>
      </ShowIf>

      <ShowIf condition={platform === PLATFORM_TYPE.ANDROID}>
        <AndroidOutlined style={androidStyle}/>
      </ShowIf>

      <ShowIf condition={platform === PLATFORM_TYPE.WEB}>
        <ChromeOutlined style={webStyle}/>
      </ShowIf>
    </React.Fragment>
  )
}

PlatformIcon.propTypes = {
  platform: PropTypes.oneOf(_.values(PLATFORM_TYPE)),
}

export default PlatformIcon

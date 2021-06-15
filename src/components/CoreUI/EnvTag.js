import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag } from 'antd'

import { PROJECT_ENV, PROJECT_ENV_COLOR } from '../../config/constants'

class EnvTag extends React.Component{
  render() {
    const { type } = this.props
    const key = _.findKey(PROJECT_ENV, (value) => value === type)

    return (
      <Tag color={PROJECT_ENV_COLOR[key]}>{key}</Tag>
    );
  }
}

EnvTag.propTypes = {
  type: PropTypes.oneOf(_.values(PROJECT_ENV))
}

export default EnvTag

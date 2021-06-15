import React from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router'
import { compose } from 'recompose'

import { Box } from '../../styles/utility'
import { LeftOutlined } from '@ant-design/icons'

class GoBack extends React.Component {
  render() {
    const {history} = this.props

    return (
      <Box>
        <Button type='link' onClick={() => history.goBack()} size={'large'}>
          <LeftOutlined style={{fontSize: '16px'}}/>
          <span style={{marginLeft: 0}}>Back</span>
        </Button>
      </Box>
    )
  }
}

export default compose(
  withRouter
)(GoBack)

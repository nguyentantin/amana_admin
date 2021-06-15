import React from 'react'
import { Layout } from 'antd'

import { Box } from '../../../styles/utility'

class DashboardFooter extends React.PureComponent {
  render() {
    return (
      <Box textAlign='center'>
        <Layout.Footer>Auto Build Application ©2020 Created by SI1 Studio</Layout.Footer>
      </Box>
    )
  }
}

export default DashboardFooter

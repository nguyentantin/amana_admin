import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import DashboardFooter from './partials/DashboardFooter'
import DashboardMenu from './partials/DashboardMenu'
import DashboardHeader from './partials/DashboardHeader'
import * as Styled from './styled'
import { Box } from '../../styles/utility'

class DashboardLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const {children} = this.props
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {}))

    return (
      <Layout>
        <DashboardMenu/>

        <Layout>
          <DashboardHeader/>

          <Styled.ContentWrapper>
            <Box p={2}>
              {childrenWithProps}
            </Box>
          </Styled.ContentWrapper>
          <DashboardFooter/>
        </Layout>
      </Layout>
    )
  }
}

export default DashboardLayout

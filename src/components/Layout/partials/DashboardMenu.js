import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, HomeOutlined, InsertRowAboveOutlined } from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import injectReducer from '../../../store/injectReducer'
import injectSaga from '../../../store/injectSaga'
import reducer from '../../../store/modules/auth/reducers'
import saga from '../../../store/modules/auth/sagas'
import AppLogo from '../../../assets/images/App_logo.png'
import AppLogo1 from '../../../assets/images/App_logo_1.png'
import { StyleLogo, SiderWrapper } from '../styled'

class DashboardMenu extends React.PureComponent {
  render() {
    const {location} = this.props

    return (
      <SiderWrapper
        width={256}
        theme='dark'
        trigger={null}
        collapsed={this.props.collapsed}
      >
        <StyleLogo>
          {this.props.collapsed ? (
            <Link to='/'><img src={AppLogo1} alt="Logo"/></Link>
          ) : (
            <Link to='/'><img src={AppLogo} alt="Logo"/></Link>
          )}
        </StyleLogo>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/dashboard">
            <Link to='/dashboard'>
              <HomeOutlined/>
              <span className="nav-text">Dashboard</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/users">
            <Link to='/users'>
              <UserOutlined/>
              <span className="nav-text">User Management</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/departments">
            <Link to='/departments'>
              <InsertRowAboveOutlined />
              <span className="nav-text">Department Management</span>
            </Link>
          </Menu.Item>
        </Menu>
      </SiderWrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    collapsed: _.get(state, 'auth.collapsedSideBar', false)
  }
}

const enhancer = compose(
  withRouter,
  connect(mapStateToProps, {}),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
)

export default enhancer(DashboardMenu)

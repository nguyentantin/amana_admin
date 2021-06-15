import React from 'react'
import { Dropdown, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { LogoutOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import { compose } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import injectReducer from '../../../store/injectReducer'
import injectSaga from '../../../store/injectSaga'
import reducer from '../../../store/modules/auth/reducers'
import saga from '../../../store/modules/auth/sagas'
import { collapsedSideBar } from '../../../store/modules/auth/actions'
import { Header } from '../styled'
import LocalStorage from '../../../utils/localStorage'

class DashboardHeader extends React.PureComponent {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  username() {
    const me = LocalStorage.getAuthInfo()
    return _.get(me, 'name')
  }

  logout() {
    const {history} = this.props
    LocalStorage.removeToken()
    LocalStorage.removeAuthInfo()

    history.push('/login')
  }

  state = {
    collapsed: this.props.collapsed,
  }

  toggle = () => {
    this.props.collapsedSideBar()
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    const overlay = (
      <Menu>
        <Menu.Item key="0">
          <Link to='/profile'>
            <SettingOutlined/> Profile
          </Link>
        </Menu.Item>
        <Menu.Item key="1" onClick={this.logout}>
          <LogoutOutlined/> Log Out
        </Menu.Item>
      </Menu>
    )

    return (
      <Header>
        {
          React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })
        }
        <Dropdown overlay={overlay} placement="bottomRight">
          <span>
            <UserOutlined/>
            <span className="header_text">{this.username()}
            </span>
          </span>
        </Dropdown>
      </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    collapsed: _.get(state, 'auth.collapsedSideBar', false)
  }
}

const mapDispatchToProps = {collapsedSideBar}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
)(DashboardHeader)

import React from 'react'
import { Button, Modal, Switch, Table, Tag } from 'antd'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
import _ from 'lodash'
import queryString from 'query-string'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

import UserRequest from '../../api/Request/UserRequest'
import ModalCreateUser from './ModalCreateUser'
import { RenderWcUsername } from './components/RenderWcUsername'
import { ROLES } from '../../config/constants'

const { confirm } = Modal

@observer
class UserList extends React.PureComponent {
  @observable loading = false
  @observable modalCreateVisible = false
  @observable users = []
  @observable pagination = {}

  @action fetchUsers(params = {}) {
    this.loading = true

    const { location: { search }} = this.props

    params = {
      ...queryString.parse(search),
      ...params,
    }

    UserRequest
      .search(params)
      .then((response) => {
        this.users = response.data.data
        const meta = response.data.meta
        this.pagination = {
          total: meta.total,
          position: ['bottomRight'],
          pageSize: meta.perPage,
          current: meta.currentPage,
          onChange: (current, pageSize) => {
            const query = { page: current, perPage: pageSize }
            this.addQueryToUrl(query)
            this.fetchUsers(query)
          }
        }
      })
      .finally(() => this.loading = false)
  }

  @action setUserStatusAction(userId, isActive) {
    const listUser = toJS(this.users)
    this.users = _.map(listUser, (user) => {
      if (user.id === userId) {
        user.isActive = isActive
      }
      return user
    })
  }

  @action setUserAdminAction(userId, isAdmin) {
    const listUser = toJS(this.users)
    this.users = _.map(listUser, (user) => {
      if (user.id === userId) {
        user.isAdmin = isAdmin
      }
      return user
    })
  }

  @action toggleModalCreate() {
    this.modalCreateVisible = !this.modalCreateVisible
  }

  @action updateWcUsername(value, user, index) {
    this.users[index].wcUsername = value
    this.forceUpdate()
    UserRequest.updateWcUsername(user.id, { wcUsername: value }).then()
  }

  constructor(props) {
    super(props);
    this.updateWcUsername = this.updateWcUsername.bind(this)
  }
  componentDidMount() {
    this.fetchUsers()
  }

  addQueryToUrl(query) {
    const searchParams = queryString.stringify(query)
    this.props.history.push({
      search: searchParams
    })
  }

  changeUserStatus(isActive, user) {
    const statusText = isActive ? 'active' : 'disable'
    return confirm({
      title: `Do you want to ${statusText} this user?`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        if (isActive) {
          return UserRequest.active(user.id)
            .then(() => {
              this.setUserStatusAction(user.id, isActive)
            })
        }

        return UserRequest.disable(user.id)
          .then(() => {
            this.setUserStatusAction(user.id, isActive)
          })
      },
      onCancel() {},
    })
  }

  changeUserRole(user) {
    console.log(user)
    const title = user.isAdmin ? 'Do you want to remove admin of this user?' : 'Do you want to assign role admin to this user'
    return confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        if (user.isAdmin) {
          return UserRequest.removeRoles(user.id, ROLES.SUPER_ADMIN)
            .then(() => {
              this.setUserAdminAction(user.id, !user.isAdmin)
            })
        }

        return UserRequest.assignRoles(user.id, { roleId: ROLES.SUPER_ADMIN })
          .then(() => {
            this.setUserAdminAction(user.id, !user.isAdmin)
          })
      },
      onCancel() {},
    })
  }

  onCreateUserSuccess() {
    const query = {
      page: 1,
      perPage: 10
    }

    this.addQueryToUrl(query)
    this.fetchUsers(query)
  }

  columns() {
    return [
      {
        title: 'Status',
        key: 'status',
        align: 'center',
        render: (text, record) => {
          return <Switch
            checked={record.isActive}
            onChange={(checked) => this.changeUserStatus(checked, record)}
          />
        }
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        align: 'center',
      },
      {
        title: 'WC Username',
        key: 'wc_username',
        dataIndex: 'wcUsername',
        align: 'center',
        render: (value, record, index) => {
          return <RenderWcUsername username={value} onChange={(newUsername) => this.updateWcUsername(newUsername, record, index)}/>;
        }
      },
      {
        title: 'Roles',
        key: 'roles',
        align: 'center',
        render: (text, record) => {
          return <Tag
            style={{
              cursor: 'pointer'
            }}
            color={record.isAdmin ? 'processing' : 'default'}
            onClick={() => this.changeUserRole(record)}
          >
            Admin
          </Tag>
        }
      },
    ]
  }

  render() {
    const columns = this.columns()

    return (
      <div>
        <div style={{ textAlign: 'right'}}>
          <Button
            onClick={() => this.toggleModalCreate()}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            <PlusCircleOutlined />Create
          </Button>
        </div>

        <ModalCreateUser
          visible={this.modalCreateVisible}
          onToggle={() => this.toggleModalCreate()}
          onCreateSuccess={() => this.onCreateUserSuccess()}
        />
        <Table
          columns={columns}
          dataSource={this.users}
          pagination={this.pagination}
          rowKey='id'
          bordered
          loading={this.loading}
        />
      </div>
    )
  }
}

const enhancer = compose(
  withRouter,
)

export default enhancer(UserList)

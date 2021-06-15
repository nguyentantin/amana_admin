import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table, Popconfirm, Button, message, Pagination } from 'antd'
import { observer } from 'mobx-react'
import { action, computed, observable, toJS } from 'mobx'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { reset, stopSubmit } from 'redux-form'

import DepartmentRequest from '../../api/Request/DepartmentRequest'
import ModalCreateDepartment from './ModalCreateDepartment'
import ModalUpdateDepartment from './ModalUpdateDepartment'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'

@observer
class DepartmentList extends React.PureComponent {
  state = {
    current: 1,
  }

  @observable loading = false
  @observable departments = []
  @observable modalCreateVisible = false
  @observable modalUpdateVisible = false
  @observable initialValues
  @observable department

  @action fetchDepartments(params = {}) {
    this.loading = true

    DepartmentRequest
      .listDepartment(params)
      .then((response) => {
        this.departments = response
      })
      .finally(() => this.loading = false)
  }

  @action createDepartment(params) {
    const {dispatch} = this.props

    DepartmentRequest
      .createDepartment(params)
      .then(() => {
        message.success({content:'Create department successfully!', key: 'create_department'})
        dispatch(reset('CreateDepartmentForm'))
        this.modalCreateVisible = false
        this.fetchDepartments(this.state.current)
      })
      .catch((error) => {
        message.error({content:'Create department error!', key: 'create_department'})
        dispatch(stopSubmit('CreateDepartmentForm', error.error))
      })
  }

  @action updateDepartment(params) {
    DepartmentRequest
      .updateDepartment(params)
      .then(() => {
        message.success({content:'Update department successfully!', key:'update_department'})
        this.modalUpdateVisible = false
        this.fetchDepartments(this.state.current)
      })
      .catch((error) => {
        message.error({content:'Update department error'})
      })
  }

  @action deleteDepartment(id) {
    DepartmentRequest
      .deleteDepartment(id)
      .then(() => {
        this.fetchDepartments(this.state.current)
      })
      .catch((error) => {})
  }

  @computed get dataSource() {
    return _.get(toJS(this.departments), 'data', [])
  }

  @action toggleModalCreate() {
    this.modalCreateVisible = !this.modalCreateVisible
  }

  @action toggleModalUpdate() {
    this.modalUpdateVisible = !this.modalUpdateVisible
  }

  @action setInitialValues(department = {}) {
    this.initialValues = {
      id: _.get(department, 'id', null),
      name: _.get(department, 'name', null),
      description: _.get(department, 'description', null),
    }

    this.department = department
    this.toggleModalUpdate()
  }

  onChange = page => {
    this.setState({
      current: page,
    })
    this.fetchDepartments(page)
  }

  componentDidMount() {
    this.fetchDepartments(this.state.current)
  }

  columns() {
    return [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        align: 'center',
      },
      {
        title: 'Delete',
        key: 'del',
        align: 'center',
        render: (text, record) =>
          this.dataSource.data.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteDepartment(record.id)}>
              <a href="/#"><DeleteOutlined /></a>
            </Popconfirm>
          ) : null,
      },
      {
        title: 'Edit',
        key: 'edit',
        align: 'center',
        render: (text, record) => {
          return (
            <Link to="/departments" onClick={() => this.setInitialValues(record)}><EditOutlined /></Link>
          )
        },
      },
    ]
  }

  render() {
    const columns = this.columns()
    return (
      <div>
        <Button
          onClick={() => this.toggleModalCreate()}
          type="primary"
          style={{
            display: 'Block',
            marginBottom: 16,
            marginLeft: 'auto',
          }}
        >
        <PlusCircleOutlined />Create
        </Button>
        <ModalCreateDepartment
          visible={this.modalCreateVisible}
          onCreateDepartment={(values, cb) => this.createDepartment(values, cb)}
          onToggle={() => this.toggleModalCreate()}
        />
        <ModalUpdateDepartment
          visible={this.modalUpdateVisible}
          onUpdateDepartment={(values, cb) => this.updateDepartment(values, cb)}
          onToggle={() => this.setInitialValues()}
          department={this.department}
          initialValues={this.initialValues}
        />
        <Table
          columns={columns}
          dataSource={this.dataSource.data}
          pagination={false}
          rowKey='id'
          bordered
          loading={this.loading}
        />
        {this.dataSource.meta &&
          <Pagination
            style={{marginTop: '16px', textAlign: 'right'}}
            total={this.dataSource.meta.total}
            current={this.state.current}
            onChange={this.onChange}
          />
        }
      </div>
    )
  }
}

export default compose(
  connect()
)(DepartmentList)

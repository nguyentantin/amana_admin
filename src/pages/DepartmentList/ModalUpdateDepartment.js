import { Col, Form, Row } from 'antd'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { AInput, ATextarea } from '../../components/FormUI'
import { maxLength, required } from '../../utils/validations'
import ModalStyle from '../../styles/modal'

const maxLengthDescription = maxLength(255)

@observer
class ModalUpdateProject extends React.Component {
  static propTypes = {
    onUpdateDepartment: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const {onUpdateDepartment} = this.props
    onUpdateDepartment(values)
  }

  toggleModal() {
    const {onToggle} = this.props
    onToggle()
  }

  componentDidMount() {
    const {department} = this.props
    this.props.initialize(department)
  }

  render() {
    const {visible, handleSubmit} = this.props

    const formItemLayout = {
      labelCol: {
        span: 24
      },
      wrapperCol: {
        span: 24
      }
    }

    return (
      <ModalStyle
        visible={visible}
        title="Update"
        okText="Update"
        onCancel={() => this.toggleModal()}
        okButtonProps={{form: 'update-department-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout="vertical" id='update-department-form' onFinish={handleSubmit(this.onSubmit)}>
          <Row>
            <Col span={24}>
              <Field
                label="Name"
                name="name"
                component={AInput}
                validate={[required]}
                type="text"
                placeholder="Please enter the department name."
              />
              <Field
                label="Description "
                name="description"
                component={ATextarea}
                validate={[required, maxLengthDescription]}
                type="text"
                placeholder="Please enter the department description."
                rows={4}
              />
            </Col>
          </Row>
        </Form>
      </ModalStyle>
    )
  }
}

export default compose(
  reduxForm({
    form: 'UpdateDepartmentForm',
    enableReinitialize: true
  }),
)(ModalUpdateProject)

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
class ModalCreateDepartment extends React.Component {
  static propTypes = {
    onCreateDepartment: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const {onCreateDepartment} = this.props
    onCreateDepartment(values)
  }

  toggleModal() {
    const {onToggle} = this.props
    onToggle()
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
        title="Create"
        okText="Create"
        onCancel={() => this.toggleModal()}
        okButtonProps={{form: 'create-department-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout="vertical" id='create-department-form' onFinish={handleSubmit(this.onSubmit)}>
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
    form: 'CreateDepartmentForm',
  }),
)(ModalCreateDepartment)

import React from 'react'
import ModalStyle from '../../styles/modal'
import { Col, Form, Row } from 'antd'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { AInput, ASwitch } from '../../components/FormUI'
import { email, required } from '../../utils/validations'
import UserRequest from '../../api/Request/UserRequest'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import { error, success } from '../../utils/toastr'

@observer
class ModalCreateUser extends React.Component {
  @observable loading = false

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
  }

  @action onSubmit(values) {
    this.loading = true
    const { onCreateSuccess } = this.props

    UserRequest.create(values)
      .then(() => {
        onCreateSuccess()
        success('Create user success')
        this.toggleModal()
      })
      .catch((err) => {
        // @TODO: implement show message here
        error('Create user failure')
      })
      .finally(() => {
        this.loading = false
      })
  }

  componentDidMount() {
    this.props.initialize({
      name: '',
      email: '',
      isActive: false
    })
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
        title="Create Users"
        okText="Submit"
        onCancel={() => this.toggleModal()}
        okButtonProps={{form: 'create-user-form', key: 'submit', htmlType: 'submit'}}
        confirmLoading={this.loading}
      >
        <Form {...formItemLayout} layout="vertical" id="create-user-form" onFinish={handleSubmit(this.onSubmit)}>
          <Row>
            <Col span={24}>
              <Field
                label="Name"
                name="name"
                component={AInput}
                validate={[required]}
                type="text"
                placeholder="Please enter the user name."
              />

              <Field
                label="Email"
                name="email"
                component={AInput}
                validate={[required, email]}
                type="text"
                placeholder="Please enter the user email"
              />
              <Field
                label="Active user"
                name="isActive"
                component={ASwitch}
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
    form: 'CreateUserForm',
  }),
)(ModalCreateUser)

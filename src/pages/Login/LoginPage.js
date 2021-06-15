import React from 'react'
import { Row, Form, Button, Divider } from 'antd'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { Box } from '../../styles/utility'
import { withRouter } from 'react-router'
import { AInput } from '../../components/FormUI'
import { email, required } from '../../utils/validations'
import logo from '../../assets/images/App_logo.png'
import * as Styled from './styled'
import { requestLogin } from '../../store/modules/auth/actions'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from '../../store/modules/auth/reducers'
import saga from '../../store/modules/auth/sagas'

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const {requestLogin} = this.props

    requestLogin(values)
  }

  render() {
    const {handleSubmit, loading} = this.props

    return (
      <Row>
        <Styled.ContainerWrapper>
          <Box m='auto' width={[1, 500]} px={[10, 0]}>
            <Styled.CardContent>
              <Styled.LogoWrapper m='auto'>
                <img src={logo} alt="Logo"/>
              </Styled.LogoWrapper>

              <Form layout="vertical" onFinish={handleSubmit(this.onSubmit)}>
                <Box textAlign='center' mb={2}>
                  <h2>Login System</h2>
                </Box>

                <Field
                  label="Email"
                  name="email"
                  component={AInput}
                  type="email"
                  placeholder="Please enter your email."
                  size='large'
                  validate={[required, email]}
                />

                <Field
                  label="Password"
                  name="password"
                  component={AInput}
                  type="password"
                  placeholder="Please enter your password."
                  size='large'
                  validate={[required]}
                />

                <Button
                  block
                  type="primary"
                  size='large'
                  htmlType="submit"
                  loading={loading}
                >
                  Login
                </Button>

                <Divider/>

                <Box m="auto" textAlign='center'>
                  <Link to='/pwd/send-mail'>Forgot your password?</Link>
                </Box>
              </Form>
            </Styled.CardContent>
          </Box>
        </Styled.ContainerWrapper>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: _.get(state, 'auth.loading', false)
  }
}

const mapDispatchToProps = {requestLogin}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'auth', reducer}),
  injectSaga({key: 'auth', saga}),
  withRouter,
  reduxForm({
    form: 'LoginForm',
  })
)

export default enhance(LoginPage)

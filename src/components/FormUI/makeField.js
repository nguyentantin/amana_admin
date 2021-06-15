import React from 'react'
import { Form } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14}
  }
}

const makeField = Component => ({input, meta, children, hasFeedback, label, layout, ...rest}) => {
  const hasError = meta.touched && meta.invalid
  let layoutInput = {}

  if (!_.isEmpty(layout)) {
    layoutInput = {
      ...formItemLayout,
      ...layout
    }
  }

  return (
    <FormItem
      {...layoutInput}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children}/>
    </FormItem>
  )
}

export default makeField

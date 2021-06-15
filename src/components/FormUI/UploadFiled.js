import React from 'react'

import { Form, Modal, Upload } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'

const FormItem = Form.Item

const UploadField = ({children, handleCancel, input, meta: {invalid, touched, error}, label, imageUrl, previewImage, ...props}) => {
  const hasError = touched && invalid

  return (
    <FormItem
      label={label}
      help={hasError && error}
      validateStatus={hasError ? "error" : "success"}
    >
      <Upload
        {...input}
        {...props}
        accept='image/*'
        className="avatar-uploader"
        listType="picture-card"
        loading={false}
        showUploadList={false}
      >
        {!imageUrl ? (
          <div>
            <CloudUploadOutlined style={{fontSize: 48}}/>
            <div style={{fontSize: 11}}>
              File formats: JPEG, PNG, GIF (max size 2MB)
            </div>
          </div>
        ) : null}
      </Upload>
      <Modal visible={previewImage} footer={null} onCancel={handleCancel}>
        <img src={imageUrl} width="100%" alt="example"/>
      </Modal>
    </FormItem>
  )
}

export default UploadField

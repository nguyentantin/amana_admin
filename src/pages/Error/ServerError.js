import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

class ServerError extends React.PureComponent {
  render() {
    return (
      <Result
        status='500'
        title='500'
        subTitle="Sorry, the server is wrong"
        extra={<Link to='/'><Button type="primary">Back home</Button></Link>}
      />
    )
  }
}

export default ServerError

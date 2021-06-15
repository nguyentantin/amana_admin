import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'

class PageNotFound extends React.PureComponent {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle='Sorry page you visited does not exist.'
        extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
      />
    )
  }
}

export default PageNotFound
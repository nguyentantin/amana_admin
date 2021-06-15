import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined'
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined'
import React from 'react'
import { Input } from 'antd'
import _ from 'lodash'

import { Flex } from '../../../styles/utility'
import { ShowIf } from '../../../components/Utils'

export class RenderWcUsername extends React.Component{
  toggleEditing() {
    this.setState({editing: !this.state.editing})
  }

  updateNewUsername(value = undefined) {
    this.setState({newUsername : value})
  }

  cancel() {
    this.toggleEditing()
    this.updateNewUsername()
  }

  update() {
    const { onChange } = this.props
    if (!_.isEmpty(this.state.newUsername)) {
      onChange(this.state.newUsername)
    }
    this.cancel()
  }

  handleKeyUp(event) {
    if (event.key === 'Escape') {
      this.cancel()
    }

    if (event.key === 'Enter') {
      this.update()
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newUsername: undefined
    }

    this.toggleEditing = this.toggleEditing.bind(this)
    this.updateNewUsername = this.updateNewUsername.bind(this)
    this.update = this.update.bind(this)
    this.cancel = this.cancel.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  render() {
    const { username } = this.props

    return (
      <div>
        <ShowIf condition={!this.state.editing}>
          <Flex flex={['flex']} justifyContent={['center']}>
            <div onClick={this.toggleEditing} style={{marginRight: 10}}>{username}</div>
          </Flex>
        </ShowIf>

        <ShowIf condition={this.state.editing}>
          <Flex flex={['flex']} justifyContent={['center']}>
            <div style={{marginRight: 10, width: 100}}>
              <Input
                defaultValue={username}
                onChange={(e) => this.updateNewUsername(e.target.value)}
                autoFocus
                onKeyUp={this.handleKeyUp}
              />
            </div>
            <div>
              <CheckOutlined onClick={this.update} style={{marginRight: 10, color: '#8eba3e'}}/>
              <CloseOutlined onClick={this.cancel} style={{color: '#ff4d4f'}}/>
            </div>
          </Flex>
        </ShowIf>
      </div>
    )
  }
}

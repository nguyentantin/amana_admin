import React from 'react'
import { Avatar } from 'antd'
import _ from 'lodash'

import { ShowIf } from '../Utils'
import avatarList from '../../assets/avatar'

import { getFirstCapitalizedLetter } from '../../utils/helpers'

const getSrcById = (id) => {
  return _.find(avatarList, {id: id})
}

const UserAvatar = ({user, fontSize, ...rest}) => {
  const style = {}
  if (_.isNull(user.avatarId)) {
    style.backgroundColor = _.get(user, 'color')
  }

  if (fontSize) {
    style.fontSize = fontSize
  }

  const props = {
    ...rest,
    style: {
      ...rest.style,
      ...style
    }
  }

  const image = getSrcById(user.avatarId)

  return (
    <ShowIf condition={!_.isEmpty(user)}>
      <ShowIf condition={!_.isNull(user.avatarId)}>
        <Avatar {...props} src={_.get(image, 'imgSrc')}/>
      </ShowIf>

      <ShowIf condition={_.isNull(user.avatarId)}>
        <Avatar {...props}>
          {getFirstCapitalizedLetter(user.name)}
        </Avatar>
      </ShowIf>
    </ShowIf>
  )
}

export default UserAvatar

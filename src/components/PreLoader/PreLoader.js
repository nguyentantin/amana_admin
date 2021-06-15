import React, { Component } from 'react'
import * as Styled from './styled'

export default class PreLoader extends Component {
  render() {
    return (
      <Styled.Wrapper>
        <Styled.AnimationContainer>
          <Styled.DotElement/>
          <Styled.DotElement/>
          <Styled.DotElement/>
        </Styled.AnimationContainer>
      </Styled.Wrapper>
    )
  }
}

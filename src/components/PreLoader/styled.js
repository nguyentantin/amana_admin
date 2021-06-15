import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  background-color: white;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AnimationContainer = styled.div`
  margin-top: 20px;
  margin-left: 5px;
`

const DotsAnimation = keyframes`
  0% { transform: translateY(-23%); }
  50% { transform: translateY(23%); }
  100% { transform: translateY(-23%); }
`

export const DotElement = styled.div`
  border-radius: 100%;
  float: left;
  height: 1rem;
  width: 1rem;
  animation-duration: .7s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(.445, .05, .55, .95);
  animation-name: ${DotsAnimation};
  transform: translateY(-23%);

  &:nth-child(1) {
    color: #4285f4;
    animation-delay: calc(1 * .15s);
    background: #4285f4;
  }

  &:nth-child(2) {
    color: #ea4335;
    animation-delay: calc(2 * .15s);
    background: #ea4335;
  }

  &:nth-child(3) {
    color: #fbbc05;
    animation-delay: calc(3 * .15s);
    background: #fbbc05;
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }
`

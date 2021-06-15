import styled from 'styled-components';
import { Modal } from 'antd'

const ModalStyle = styled(Modal)`
  @media screen and (max-width: 600px) {
    top: 0 !important;
  }
`

export default ModalStyle
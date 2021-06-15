import styled from 'styled-components'
import { space } from 'styled-system'
import { Card } from 'antd'

export const ContainerWrapper = styled.div`
  ${space};
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  position: relative;
`

export const CardContent = styled(Card)`
-webkit-box-shadow: 8px 14px 20px -1px rgba(0,0,0,0.31);
-moz-box-shadow: 8px 14px 20px -1px rgba(0,0,0,0.31);
box-shadow: 8px 14px 20px -1px rgba(0,0,0,0.31);
`

export const LogoWrapper = styled.div`
 margin: 0 auto;
 text-align: center;
   img {
     height: 90px;
   }

   p {
     color: #95A7B7;
     font-size: 18px;
   }
`

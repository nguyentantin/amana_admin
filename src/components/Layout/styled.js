import styled from 'styled-components'
import { Layout } from 'antd'

export const Header = styled(Layout.Header)`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .trigger {
    font-size: 20px;
  }
  .ant-dropdown-trigger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      background: rgba(0,0,0,.025);
    }
  }
  .header_text {
    margin-left: 4px;
  }
`

export const StyleLogo = styled.div`
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6px 16px;
  img {
    height: 52px;
    display: block;
    margin: auto;
  }
`

export const ContentWrapper = styled(Layout.Content)`
   min-height: calc(100vh - 182px);
   margin: 24px;
   background-color: white;
   border-radius: 2px;
`

export const SiderWrapper = styled(Layout.Sider)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: 2px 0 6px rgba(0,21,41,.35)
`

import { Drawer } from "antd";
import styled from "styled-components";

export const StyledCustomDrawer = styled(Drawer)`
  & .ant-drawer-body {
    background: ${(props) => props.theme.colors.white} !important;
    .ant-menu {
      background: ${(props) => props.theme.colors.white} !important;
    }
  }
  .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    dislay: flex;
    flex-direction: row-reverse;
    padding: 0px !important;
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    width: 82px;
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    color: ${(props) => props.theme.colors.black} !important;
    background: ${(props) => props.theme.colors.white} !important;
  }
  .drawer-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .dropdown-container {
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 0px 18px;
    gap: 10px;
  }
  .button-container {
    display: flex;
    margin-top: 20px;
    gap: 40px;
    justify-content: center;
  }
  .button {
    width: 100px;
  }
`;

import { Drawer } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledCustomPrepDrawer = styled(Drawer)`
  .ant-drawer-right > .ant-drawer-content-wrapper {
    width: 900px !important;
  }
  .cursor {
    cursor: pointer;
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-btn-primary {
    background: ${(props) => props.theme.colors.transparent}!important;
    display: flex;
    gap: 10px;
    align-items: center;
    border: none;
    box-shadow: none;
    color: ${(props) => props.theme.colors.black};
    font-family: Helvetica;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 20px;
  }
  .ant-btn-primary:hover {
    color: ${(props) => props.theme.colors.black};
  }
  .account-btn {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    color: ${(props) => props.theme.colors.black};
  }
  .drawer-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    /* height: 100% !important; */
    @media (${deviceQuery.laptopL}) {
      grid-template-columns: repeat(1, 1fr);
      gap: 40px;
    }
  }
  .header-btn {
    display: flex;
    justify-content: space-between;
  }
  .account-details {
    display: flex;
    .field-container {
      display: flex;
      justify-content: space-between;
    }
  }
  .inner-drawer {
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-drawer-wrapper-body {
    background: ${(props) => props.theme.colors.white}!important;
  }
  .ant-drawer-title {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-drawer-close {
    svg {
      color: ${(props) => props.theme.colors.black};
    }
  }
`;

import { Drawer } from "antd";
import styled from "styled-components";

export const StyledInnerAccountDrawer = styled(Drawer)`
  .account-details {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .field-container {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      color: ${(props) => props.theme.colors.black};
      font-family: Helvetica;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      .small-font {
        font-size: 12px;
      }
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

import { Modal } from "antd";
import styled from "styled-components";

export const StyledTpslModal = styled(Modal)`
  /* background: ${(props) => props.theme.colors.white}; */
  .ant-modal-content {
    background: ${(props) => props.theme.colors.white};
  }
  .ant-modal-header {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-input {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black}!important;
  }

  label {
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-modal-title {
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-modal-close-x {
    color: ${(props) => props.theme.colors.black}!important;
  }
`;

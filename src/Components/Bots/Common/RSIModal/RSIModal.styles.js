import { Modal } from "antd";
import styled from "styled-components";

export const StyledRsiModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-header .ant-modal-title,
  .ant-modal .ant-modal-header,
  .ant-select-selector,
  .ant-modal-close-x,
  input {
    background: ${(props) => props.theme.colors.white} !important;
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-modal .ant-modal-close-x {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .cursor {
    cursor: pointer;
  }
  .basic {
    display: flex;
    flex-direction: column;

    .field-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
  }
`;

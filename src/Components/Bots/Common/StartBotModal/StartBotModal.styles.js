import { Modal } from "antd";
import styled from "styled-components";

export const StyledStartButtonModal = styled(Modal)`
  text-align: left !important;

  .ant-table-cell
    > .ant-modal
    > .ant-modal-content
    > .ant-modal-body
    > .modal-head {
    display: flex;
    gap: 10px;
    /* background: pink; */
  }
  .ant-form-item {
    text-align: left !important;
  }
  .ant-table-cell > .ant-modal > .ant-modal-content > .ant-modal-body > .box {
    display: flex;
  }
  .box {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .left,
    .right {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .right {
      align-items: flex-end;
    }
  }
  .arrow {
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
  .cursor {
    cursor: pointer;
  }
`;

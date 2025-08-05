import { Modal } from "antd";
import styled from "styled-components";

export const StyledButtonModal = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* background: #f7f8fa; */
    padding: 10px 0px;
    .big-text {
      color: var(--black, #27282c);
      font-family: Helvetica;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    .small-text {
      color: var(--black, #27282c);
      font-family: Helvetica;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 0 25px;
    }
  }
`;

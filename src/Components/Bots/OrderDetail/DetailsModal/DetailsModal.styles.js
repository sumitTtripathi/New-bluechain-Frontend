import { Modal } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../../../MediaSizes";

export const StyledDetailsModal = styled(Modal)`
  width: 750px !important;
  /* background: ${(props) => props.theme.colors.white}!important; */
  .data-modal {
    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme.colors.white}!important;
    gap: 15px;
    .data-modal-container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      text-align: left;
      background: ${(props) => props.theme.colors.white}!important;

      @media (${deviceQuery.mobileL}) {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      @media (${deviceQuery.mobileMSN}) {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
  }
  .ant-modal-content {
    background: ${(props) => props.theme.colors.white}!important;
    .ant-modal-close-x {
      color: ${(props) => props.theme.colors.black}!important;
    }
  }
  .ant-modal-header {
    background: ${(props) => props.theme.colors.white}!important;
    .ant-modal-title {
      color: ${(props) => props.theme.colors.black}!important;
    }
  }
`;

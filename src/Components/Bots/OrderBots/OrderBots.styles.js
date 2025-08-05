import styled from "styled-components";
import { deviceQuery } from "../../../MediaSizes";

export const StyledOrderBots = styled.div`
  .btn-section {
    display: flex;
    gap: 10px;
    width: 100%;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    padding: 6px 0px;
    background: ${(props) => props.theme.colors.grey.white};
  }
  .table {
    .ant-table > .ant-table-container > .ant-table-content {
      /* Track */
      background: ${(props) => props.theme.colors.white}!important;
      .ant-table-body::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colors.grey.white};
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colors.scrollThumb};
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.colors.scroll2};
      }
    }
  }
  .btn-section::-webkit-scrollbar {
    display: none;
  }
  .ant-modal > .ant-modal-content > .ant-modal-body > .modal-head {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    img {
      height: 20px;
      width: 20px;
    }
    .second {
      background: #f7f8fa;
      border-radius: 1px;
      padding: 0px 3px;
    }
  }

  .ant-table-thead > tr > th {
    font-size: 10px;
    font-weight: 300;
    padding: 8px 8px;
    background: ${(props) => props.theme.colors.white}!important;
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-table-tbody > tr > td {
    font-size: 12px;
    font-weight: 600;
    padding: 8px 8px;
    background: ${(props) => props.theme.colors.white}!important;
    color: ${(props) => props.theme.colors.black}!important;
  }
  .cursor {
    cursor: pointer;
  }
  .right-active-btn {
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr;
    justify-content: space-between;
    align-items: center;

    @media (${deviceQuery.tabletMS}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .ant-btn-default {
    background: ${(props) => props.theme.colors.white}!important;
    color: ${(props) => props.theme.colors.black}!important;
    border: none !important;
  }
  .filter-btn {
    display: flex;
    gap: 10px;
    /* overflow: scroll; */
    button {
      border: none;
      font-weight: ${(props) => props.theme.fontWeight.bold}!important;
      box-shadow: none !important;
      color: ${(props) => props.theme.colors.grey.semiDark}!important;
      background: ${(props) => props.theme.colors.blue.extraLight}!important;
    }
    button.active {
      color: ${(props) => props.theme.colors.blue.dark}!important;
    }
  }
  .ant-pagination-item-link {
    color: ${(props) => props.theme.colors.black}!important;
  }
`;

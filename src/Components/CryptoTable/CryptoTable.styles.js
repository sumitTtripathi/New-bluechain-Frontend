import { Table } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledTable = styled(Table)`
  padding: 0 55px;
  @media (${deviceQuery.mobileL}) {
    padding: 0 10px;
  }
  .ant-empty-description {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-table-body::-webkit-scrollbar {
    width: 6px !important;
  }
  .ant-table-body::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.grey.extraLight} !important;
    border-radius: 8px;
  }
  .ant-table-cell.ant-table-column-has-sorters > .ant-table-column-sorters {
    gap: 10px;
    justify-content: flex-start;
    .ant-table-column-title {
      flex: initial;
    }
  }
  /* Handle */
  .ant-table-body::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${(props) => props.theme.colors.blue.dark} !important;
  }
  .ant-table-thead > tr > th {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.grey.dark};
    /* background: ${(props) =>
      props.theme.colors.blue.extraLight} !important; */
  }

  .ant-table-cell {
    background: transparent !important;
  }
  .ant-table-cell {
    border: none !important;
  }
  .ant-table-cell:before {
    display: none;
  }
  .ant-table-cell-scrollbar {
    display: none;
    background: ${(props) => props.theme.colors.white} !important;
  }
  .ant-pagination-item-link {
    color: ${(props) => props.theme.colors.black} !important;
  }
`;

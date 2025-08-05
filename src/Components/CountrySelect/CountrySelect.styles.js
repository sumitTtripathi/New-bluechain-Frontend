import { Select } from "antd";
import styled from "styled-components";

export const CountrySelectContainer = styled(Select)`
  width: 35%;
  color: ${(props) => props.theme.colors.black};
  & .ant-select-arrow {
    color: ${(props) => props.theme.colors.black};
  }
  & .ant-select-selector > .ant-select-selection-placeholder {
    color: ${(props) => props.theme.colors.black};
  }
  & .ant-select-selector > .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
  & > .ant-select-selector {
    border: none !important;
    background: ${(props) => props.theme.colors.blue.light} !important;
  }
`;

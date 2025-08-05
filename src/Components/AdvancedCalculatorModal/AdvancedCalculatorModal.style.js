import { Modal, Select } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .logo {
    width: 35px;
  }
  .title {
    color: ${(props) => props.theme.colors.black};
    font-weight: bold;
    font-size: ${(props) => props.theme.typography.subTitle1};
  }
`;
export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  .list-container {
    display: flex;
    flex-direction: column;
  }
  .list-item {
    padding: 5px 5px;
  }
  .list-item:hover {
    background: ${(props) => props.theme.colors.blue.gradient1};
    border-radius: 5px;
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .ant-dropdown-menu-submenu
    .ant-dropdown-menu
    .ant-dropdown-menu-submenu-title-active {
    background: red !important;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  @media (${deviceQuery.tabletMS}) {
    flex-direction: column;
  }
  .formItem {
    margin: 0 !important;
  }
  .field-container {
    padding: 5px;
  }
  .flex-between {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px;
    background: ${(props) => props.theme.colors.white};
    border-radius: 5px;
    @media (${deviceQuery.tabletMS}) {
      width: 100%;
    }
  }
  .flex {
    display: flex;
    gap: 5px;
    align-items: center;
    svg,
    div {
      cursor: pointer;
    }
  }
  .title {
    font-size: ${(props) => props.theme.typography.subTitle1};
  }
`;

export const FieldContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;

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
  @media (${deviceQuery.tabletMS}) {
    width: 100%;
  }

  .caculate {
    width: 100%;
  }
  .add-field-btn {
    border: none;
    outline: none;
    width: 25%;
    box-shadow: none;
    text-align: left;
  }
  .standard-font {
    color: ${(props) => props.theme.colors.blue.dark};
    cursor: pointer;
  }
  .input {
    display: flex;
    justify-content: center;
    padding: 8px 14px;
    background: ${(props) => props.theme.colors.grey.sliderbg};
    input {
      color: ${(props) => props.theme.colors.black};
    }
  }
  .caculate-btn {
    width: 100%;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 20px;
    padding: 8px 10px;
    text-align: center;
    cursor: pointer;
  }
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .form-container {
    height: 400px;
    overflow: scroll;
  }
  .form-container::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .form-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const SelectStyled = styled(Select)`
  width: 100% !important;
  .ant-select-selector {
    background-color: ${(props) => props.theme.colors.white}!important;
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-select-arrow {
    color: ${(props) => props.theme.colors.black}!important;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ShortButton = styled.span`
  width: 50%;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props?.active
      ? props.theme.colors.whiteOnly
      : props.theme.colors.grey.semiDark};
  background: ${(props) =>
    props?.active
      ? props.theme.colors.marketDown
      : props.theme.colors.blue.gradient1};
  padding: 4px 15px;
`;
export const NeutralButton = styled.span`
  width: 50%;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props?.active
      ? props.theme.colors.whiteOnly
      : props.theme.colors.grey.semiDark};
  background: ${(props) =>
    props?.active
      ? props.theme.colors.blue.dark
      : props.theme.colors.blue.gradient1};
  padding: 4px 15px;
`;
export const LongButton = styled.span`
  width: 50%;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props?.active
      ? props.theme.colors.whiteOnly
      : props.theme.colors.grey.semiDark};
  background: ${(props) =>
    props?.active
      ? props.theme.colors.marketUp
      : props.theme.colors.blue.gradient1};
  padding: 4px 15px;
`;
export const LabelValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
`;

export const StyledCalculatorModal = styled(Modal)`
  .ant-modal-content {
    background: ${(props) => props.theme.colors.white};
  }
  .ant-tabs {
    color: ${(props) => props.theme.colors.black};
  }
  .label-head {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-input {
    background-color: ${(props) => props.theme.colors.white}!important;

    color: ${(props) => props.theme.colors.black}!important;
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-input-affix-wrapper {
    background-color: ${(props) => props.theme.colors.white}!important;
    color: ${(props) => props.theme.colors.black}!important;
  }
  .ant-modal-close {
    svg {
      color: ${(props) => props.theme.colors.black}!important;
    }
  }
`;

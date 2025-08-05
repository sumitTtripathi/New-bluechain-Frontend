import styled from "styled-components";

export const StyledSpotGridForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .font-grey {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .font-small {
    font-size: ${(props) => props.theme.typography.text};
  }
  .ant-slider .ant-slider-rail {
    background: ${(props) => props.theme.colors.sliderbg} !important;
  }
  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-header-text {
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .ant-collapse .ant-collapse-item:last-child > .ant-collapse-content {
    background: ${(props) => props.theme.colors.whiteBlack};
  }
  .ant-select-single .ant-select-selector {
    background: ${(props) => props.theme.colors.white} !important;
  }
  .ant-select .ant-select-arrow {
    color: ${(props) => props.theme.colors.black} !important;
    position: absolute;
    top: 20px;
    right: 10px;
  }
  .ant-checkbox-wrapper {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .input {
    padding: 13px 16px;
    background: ${(props) => props.theme.colors.withdrawContainer};
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-select-single .ant-select-selector {
    padding: 6px !important;
    background: ${(props) => props.theme.colors.grey.semiLight};
    height: auto !important;
  }
  input {
    background: ${(props) => props.theme.colors.withdrawContainer};
    color: ${(props) => props.theme.colors.black};
  }
  .ant-input-prefix,
  .ant-input-suffix {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 10px 0px;
  }
  .ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    padding: 10px 0px;
  }
  .available-container .label {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .d-flex {
    display: flex;
    gap: 10px;
  }
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
export const FlexRow = styled.div`
  display: flex;
  gap: 7px;
`;

export const TextBlack = styled.div`
  color: ${(props) => props.theme.colors.black};
`;
export const ModalHeading = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey.light};
  padding-bottom: 10px;
`;
export const SymbolContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .selected-option {
    background: ${(props) => props.theme.colors.blue.extraLight};
    padding: 5px 10px;
    font-size: ${(props) => props.theme.typography.subText2};
    color: ${(props) => props.theme.colors.blue.dark};
  }
`;
export const OrderDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey.light};
  border-radius: 5px;
  padding: 5px 10px;
  .row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .label,
  .value {
    font-size: ${(props) => props.theme.typography.subText2};
  }
  .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .value {
    font-weight: bold;
  }
  .flex-end .value,
  .flex-end .label {
    display: flex;
    justify-content: flex-end;
  }
`;
export const InnerModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .logo {
    width: 30px !important;
  }
  .logoName {
    font-weight: bold;
    color: ${(props) => props.theme.colors.black};
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .amount-container {
    display: flex;
    gap: 5px;
    align-items: center;
    font-weight: bold;
  }
  .small-grey {
    font-size: ${(props) => props.theme.typography.subText2};
    color: ${(props) => props.theme.colors.grey.semiDark};
    border-bottom: 1px solid ${(props) => props.theme.colors.grey.light};
    padding-bottom: 10px;
  }
  .center {
    display: flex;
    justify-content: center;
  }
  .bold {
    font-weight: bold;
    color: ${(props) => props.theme.colors.black};
  }
  .grey {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .success-btn {
    width: 100%;
  }
  .cancel-btn {
    background: ${(props) => props.theme.colors.blue.dark};
    color: white;
  }
  .cancel-btn:hover {
    color: white;
  }
`;

export const LeverageInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: ${(props) => props.theme.colors.withdrawContainer};
  border: ${(props) => props.theme.borders.border1};
  border-radius: 5px;
  div:first-child {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  div:last-child {
    color: ${(props) => props.theme.colors.black} !important;
  }
  cursor: pointer;
`;

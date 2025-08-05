import { Button, Checkbox, Input, Select } from "antd";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledLoginInput = styled(Input)`
  padding-left: 0;
  padding-bottom: 10px;
  background: ${(props) => props.theme.colors.white};

  &.ant-input {
    box-shadow: none;
    border: none;
    border-bottom: 1px solid rgba(123, 116, 133, 0.3);
    border-radius: 0;
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }

  &.ant-input:hover {
    border-bottom: 1px solid rgba(123, 116, 133, 0.3);
  }

  &.ant-input:focus {
    border-color: ${(props) => props.theme.colors.blue.dark};
    box-shadow: none !important;
    color: ${(props) => props.theme.colors.black} !important;
    background: ${(props) => props.theme.colors.white} !important;
  }

  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme.colors.white} inset !important;
    -webkit-text-fill-color: ${(props) => props.theme.colors.black} !important;
  }`;

export const StyledLoginPasswordInput = styled(Input.Password)`
  padding-left: 0;
  padding-bottom: 10px;
  background: ${(props) => props.theme.colors.white};
  & > input {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }

  & > .ant-input-suffix > .anticon > svg {
    fill: ${(props) => props.theme.colors.black};
  }
  &.ant-input-password {
    box-shadow: none;
    border: none;
    border-bottom: 1px solid rgba(123, 116, 133, 0.3);
    border-radius: 0;
  }
  .ant-input::placeholder {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  &.ant-input-password:focus-within {
    border-bottom: 1px solid ${(props) => props.theme.colors.blue.dark} !important;
    box-shadow: none !important;
  }
  &.ant-input-password:hover {
    border-bottom: 1px solid rgba(123, 116, 133, 0.3);
  }
`;

export const StyledLoginButton = styled(Button)`
  background: ${(props) => props.theme.colors.blue.dark};
  width: 100%;
  border-radius: 500px;
  margin-top: ${(props) => props.margintop};
  height: 50px;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-top: ${(props) => props.margintop};
  color: ${(props) => props.theme.colors.black};
  .terms {
    color: ${(props) => props.theme.colors.blue.dark};
  }
`;

export const SendCodeButton = styled(Button)`
  position: absolute;
  right: ${(props) => (props.right ? props.right : "0")};
  border: none;
  padding: 0;
  color: ${(props) => props.theme.colors.blue.dark};
  top: ${(props) => (props?.error ? "30%" : "20%")};
  transform: ${(props) =>
    props.isTranslate && !props.error && "translate(0, -50%)"};
`;

export const SendCodeSignUp = styled(Button)`
  position: absolute;
  right: ${(props) => (props.right ? props.right : "0")};
  border: none;
  padding: 0;
  color: ${(props) => props.theme.colors.blue.dark};
  top: 0;
  transform: ${(props) =>
    props.isTranslate && !props.error && "translate(0, -50%)"};
`;

export const StyledTableSpan = styled.span`
  color: ${(props) => {
    let color =
      Number(props.item) > 0
        ? props.theme.colors.marketUp
        : Number(props.item) < 0
          ? props.theme.colors.marketDown
          : props.theme.colors.black;
    return color;
  }};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.typography.text};
  line-height: ${(props) => props.theme.typography.text2};
`;

export const StyledGraphSelect = styled(Select)`
  &.ant-select > .ant-select-arrow {
    color: ${(props) => props.theme.colors.black};
  }
  &.ant-select {
    ${(props) => props.position && `position:${props.position}`};
    ${(props) => props.top && `top:${props.top}`};
    ${(props) => props.left && `left:${props.left}`};
  }
  &.ant-select > .ant-select-selector {
    background: ${(props) => props.theme.colors.grey.semiLight};
    border-radius: 4px;
  }
`;

export const StyledToastContainer = styled(ToastContainer)``;

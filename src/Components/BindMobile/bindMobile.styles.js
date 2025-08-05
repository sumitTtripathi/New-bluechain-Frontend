import { Button, Modal } from "antd";
import styled from "styled-components";

export const StyledBindContainer = styled(Modal)`
  .ant-modal-body > .bind-title {
    margin: 22px 0;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.subTitle1};
    line-height: ${(props) => props.theme.typography.subTitle3};
    color: ${(props) => props.theme.colors.black};
  }
  .ant-modal-content {
    background: ${(props) => props.theme.colors.white};
  }
  .ant-steps .ant-steps-item .ant-steps-item-icon span {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-form-item-control-input-content input {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-modal-content .ant-modal-close .ant-modal-close-x .anticon svg {
    fill: ${(props) => props.theme.colors.black};
  }
  .ant-form-item-control-input-content input::placeholder {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-modal-body > .bind-totp-disclaimer {
    margin-bottom: 11px;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.marketDown};
    background: ${(props) => props.theme.colors.white};
  }
  & .stepper > .ant-steps-item > .ant-steps-item-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &
    .stepper
    > .ant-steps-item
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.black};
  }
`;

export const SendCodeButton = styled(Button)`
  position: absolute;
  right: ${(props) => (props.right ? props.right : "0")};
  border: none;
  padding: 0;
  color: ${(props) => props.theme.colors.blue.dark};
  top: 5px;
  transform: ${(props) =>
    props.isTranslate && !props.error && "translate(0, -50%)"};
`;
export const StepperContent = styled.div`
  margin-top: 40px;
  text-align: left;
  .ant-select-selection-search-input {
    color: ${(props) => props.theme.colors.black} !important;
  }

  & > .instructions {
    display: flex;
    margin: 16px 0;
    flex-direction: column;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.black};
    gap: 16px;
    align-items: center;
    justify-content: center;
  }
  & > .note {
    text-align: left;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: 150%;
    color: ${(props) => props.theme.colors.grey.semiDark};
    margin-bottom: 16px;
  }
  & > .toggle-totp-input {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text2};
    text-align: right;
    cursor: pointer;
    span {
      color: ${(props) => props.theme.colors.black};
    }
    button {
      padding-left: 10px;
      box-shadow: none;
      border: none;
    }
    button > span {
      color: ${(props) => props.theme.colors.blue.dark};
    }
  }
  & > input {
    border: none;
    background: ${(props) => props.theme.colors.blue.light};
  }
  & img {
    margin-bottom: 20px;
  }
  & > form > .phone-input {
    display: flex;
    gap: 8px;
    input {
      border: none;
      background: ${(props) => props.theme.colors.blue.light};
    }
  }

  & > .success {
    text-align: center;
    margin-bottom: 50px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.blue.dark};
  }
  & .verification-input-container {
    position: relative;
    input {
      border: none;
      background: ${(props) => props.theme.colors.blue.light};
    }
    .timer-disabled {
      position: absolute;
      top: 30%;
      transform: translate(0, -50%);
      right: 10px;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.grey.dark};
    }
  }
  & .stepper-next-btn {
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 50px;
    width: 100%;
    height: 48px;
    margin: 50px 0;
    span {
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
      color: ${(props) => props.theme.colors.whiteOnly};
    }
  }
`;

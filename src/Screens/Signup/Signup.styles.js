import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const SignupContainer = styled.div`
  background-color: ${(props) => props.theme.colors.blue.extraLight} !important;
  width: 100%;
  min-height: 91.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0 48px 0;
  .shift-up {
    position: absolute;
    right: 0;
    top: 10px;
  }
  .back-button {
    background: ${(props) => props.theme.colors.white};
  }
  .left {
    position: relative;
    background: ${(props) => props.theme.colors.blue.gradient2};
    border-radius: 32px;
    .social-container {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      padding: 16px 29px 0 29px;
    }
    .social-container > img {
      cursor: pointer;
    }
    .signup-image {
      height: 272px;
      background: url("/Logo/Icons/signup.png") no-repeat;
      object-fit: cover;
      background-size: cover;
      background-position: center;
    }
    .desc {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.subTitle1};
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 24px;
    }
  }
  .signup-form {
    .main-form {
      display: flex;
      flex-direction: column;
      gap: 17px;
    }
    .bottom-container {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 23px;
      .break-line {
        color: ${(props) => props.theme.colors.blue.dark};
      }
    }
    .signup-title-container {
      display: flex;
      align-items: center;
      gap: 16px;
      .signup-title {
        font-weight: ${(props) => props.theme.fontWeight.bold};
        font-size: ${(props) => props.theme.typography.title1};
        line-height: ${(props) => props.theme.typography.title2};
        color: ${(props) => props.theme.colors.black};
        margin-bottom: 0px;
      }
    }
    .desc {
      text-align: left;
      margin: 16px 0 56px 0;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.grey.semiDark};
    }
    .input-container {
      text-align: left;
    }
    .label {
      display: inline-block;
      margin-bottom: 10px;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.black};
    }
  }
  .right {
    .verification-input-container {
      position: relative;
      .timer-disabled {
        // position: absolute;
        // right: 0;
        // top: 40%;
        transform: translate(0, -50%);
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
        color: ${(props) => props.theme.colors.grey.dark};
      }
    }
    .toggle-verification-button {
      width: 100%;
      padding: 0;
      margin-top: 72px;
      text-align: left;
      color: ${(props) => props.theme.colors.blue.dark};
    }
    .back-button {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border: none;
      box-shadow: none;
      padding: 0;
      gap: 13px;
      color: ${(props) => props.theme.colors.blue.dark};
      & > span {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
      }
    }
  }
  .signup-box {
    width: 75%;
    max-width: 1022px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    border-radius: 32px;
    margin: auto;
    background-color: ${(props) => props.theme.colors.white};
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    text-align: left;

    .title {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.title1};
      line-height: ${(props) => props.theme.typography.title2};
      color: ${(props) => props.theme.colors.black};
      padding: 72px 29px 0 29px;
    }
    .subtitle {
      margin-top: 16px;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      padding: 0 29px 0 29px;
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.black};
    }
  }

  @media (${deviceQuery.customDesktopS}) {
    .left {
      display: none;
    }
    .signup-box {
      width: 60%;
      grid-template-columns: 1fr;
    }
  }
  .right {
    padding: 72px 90px 50px 98px;
  }
  @media (${deviceQuery.tabletL}) {
    .right {
      padding: 40px;
    }
  }
  @media (${deviceQuery.tabletS}) {
    .signup-box {
      width: 90%;
      grid-template-columns: 1fr;
    }
  }
  @media (${deviceQuery.mobileM}) {
    .signup-title-container {
      .signup-title {
        font-size: ${(props) => props.theme.typography.text1} !important;
      }
    }
  }
`;

export const StyledBindContainer = styled.div`
  .bind-title {
    margin: 22px 0;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.subTitle1};
    line-height: ${(props) => props.theme.typography.subTitle3};
    color: ${(props) => props.theme.colors.black};
  }
  .skip-btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      background: transparent;
      border: none;
      color: #888;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background: #1677ff;
    border-color : #1677ff;
    span svg{
      fill: ${(props) => props.theme.colors.white} !important;
    }
  }
  .ant-steps .ant-steps-item .ant-steps-item-icon span {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-form-item-control-input-content input {
    color: ${(props) => props.theme.colors.black};
  }
  .anticon svg {
    fill: ${(props) => props.theme.colors.black};
  }
  .ant-form-item-control-input-content input::placeholder {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .bind-totp-disclaimer {
    margin-bottom: 30px;
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
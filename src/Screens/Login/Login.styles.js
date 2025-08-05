import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";
export const LoginContainer = styled.div`
  background-color: ${(props) => props.theme.colors.blue.extraLight} !important;
  width: 100%;
  min-height: 91.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0 48px 0;

  .left {
    background: ${(props) => props.theme.colors.blue.gradient2};
    border-radius: 32px;
    padding: 44px 19px 80px 19px;
    .desc {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.subTitle1};
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 44px;
    }
  }
  .login-form {
    .main-form {
      display: flex;
      flex-direction: column;
      gap: 34px;
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
        margin: 0px !important;
      }
    }
    .login-title-container {
      display: flex;
      align-items: center;
      gap: 16px;
      .login-title {
        font-weight: ${(props) => props.theme.fontWeight.bold};
        font-size: ${(props) => props.theme.typography.title1};
        line-height: ${(props) => props.theme.typography.title2};
        color: ${(props) => props.theme.colors.black};
        text-align: left;
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
  .login-box {
    width: 75%;
    max-width: 1022px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    border-radius: 32px;
    margin: auto;
    background-color: ${(props) => props.theme.colors.white};
    display: grid;
    grid-template-columns: 1.5fr 2fr;
  }
  @media (${deviceQuery.customDesktopS}) {
    .left {
      display: none;
    }
    .login-box {
      width: 60%;
      grid-template-columns: 1fr;
    }
  }
  .right {
    padding: 72px 98px 112px 98px;
    .verification-input-container {
      position: relative;
      .timer-disabled {
        position: absolute;
        right: 0;
        top: 50%;
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
      background-color: ${(props) => props.theme.colors.white};
      gap: 13px;
      color: ${(props) => props.theme.colors.blue.dark};
      & > span {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
      }
    }
  }
  @media (${deviceQuery.tabletL}) {
    .right {
      padding: 40px;
    }
  }
  @media (${deviceQuery.tabletS}) {
    .login-box {
      width: 90%;
      grid-template-columns: 1fr;
    }
  }
  @media (${deviceQuery.mobileM}) {
    .login-title-container {
      .login-title {
        font-size: ${(props) => props.theme.typography.text1} !important;
      }
    }
  }
  .minicard-container {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
`;

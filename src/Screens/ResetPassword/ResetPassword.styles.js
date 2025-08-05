import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";
export const ResetContainer = styled.div`
  background-color: ${(props) => props.theme.colors.blue.extraLight} !important;
  width: 100%;
  min-height: 91.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0 48px 0;
  .resetpassword-form {
    .main-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .verification-input-container {
        position: relative;
        .timer-disabled {
          position: absolute;
          right: 0;
          top: 40%;
          transform: translate(0, -50%);
          font-weight: ${(props) => props.theme.fontWeight.semiLight};
          font-size: ${(props) => props.theme.typography.text};
          line-height: ${(props) => props.theme.typography.text1};
          color: ${(props) => props.theme.colors.grey.dark};
        }
      }
    }

    .resetpassword-title-container {
      display: flex;
      align-items: center;
      gap: 16px;
      .resetpassword-title {
        white-space: nowrap;
        font-weight: ${(props) => props.theme.fontWeight.bold};
        font-size: ${(props) => props.theme.typography.title1};
        line-height: ${(props) => props.theme.typography.title2};
        color: ${(props) => props.theme.colors.black};
      }
    }
    .desc {
      text-align: left;
      margin: 16px 0 56px 0;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.grey.semiDark};
      &.warning {
        color: ${(props) => props.theme.colors.rating};
      }
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
  .resetpassword-box {
    width: 75%;
    max-width: 500px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    border-radius: 32px;
    margin: auto;
    background-color: ${(props) => props.theme.colors.white};
  }
  @media (${deviceQuery.customDesktopS}) {
    .left {
      display: none;
    }
    .resetpassword-box {
      width: 60%;
      grid-template-columns: 1fr;
    }
  }
  .right {
    padding: 72px 98px 72px 98px;
    .back-button {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
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
      background: transparent;
    }
  }
  @media (${deviceQuery.tabletL}) {
    .right {
      padding: 40px;
    }
  }
  @media (${deviceQuery.tabletS}) {
    .resetpassword-box {
      width: 90%;
      grid-template-columns: 1fr;
    }
  }
  @media (${deviceQuery.mobileM}) {
    .resetpassword-title-container {
      flex-wrap: wrap;
      .reset-title {
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

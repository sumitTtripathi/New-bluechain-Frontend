import { Table } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const SettingsContainer = styled.div`
  padding: 50px;
  background: ${(props) => props.theme.colors.blue.extraLight};
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: 49vh;
  grid-gap: 20px;
  align-items: flex-start;
  .single-filter > div:first-child {
    background: ${(props) => props.theme.colors.white};
  }
  @media (${deviceQuery.mobileL}) {
    padding: 20px;
  }

  @media (${deviceQuery.laptopM}) {
    grid-template-columns: 1fr;
  }
  @media (${deviceQuery.desktopS}) {
    grid-template-columns: 1fr;
  }
  .settings-change-container {
    background: ${(props) => props.theme.colors.white};
    padding: 20px;
    width: 300px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media (${deviceQuery.mobileMS}) {
      width: 100%;
    }
    .settings-btn.active {
      border: none;
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.blue.dark};
      background: ${(props) => props.theme.colors.blue.gradient};
      border-radius: 8px;
    }
    .settings-btn {
      width: 100%;
      border: none;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: none;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      background: ${(props) => props.theme.colors.white};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.grey.semiDark};
      height: 50px;
    }
  }
`;

export const AccountSettingsContainer = styled.div`
  & .ant-breadcrumb {
    margin-bottom: 26px;
  }
  & .ant-breadcrumb > ol {
    align-items: center;
  }
  & .my-flex {
    display: flex;
  }
  ${
    "" /* .ant-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    
    @media (${deviceQuery.mobileSM}) {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      flex-row: column wrap;
    }
  } */
  }
  .ant-col {
    width: 100%;
  }
  .ant-table-wrapper {
    max-width: 97%;
    @media (${deviceQuery.tabletMS}) {
      max-width: 96.2%;
    }
    @media (${deviceQuery.mobileSM}) {
      width:480px;
    }
    @media (max-width: 537px) {
      width:450px;
    }
    @media (max-width: 481px) {
      width:400px;
    }
    @media (max-width: 429px) {
      width:380px;
    }
    @media (max-width: 412px) {
      width:360px;
    }
    @media (max-width: 390px) {
      width:340px;
    }
    @media (max-width: 376px) {
      width:345px;
    }
    @media (max-width: 361px) {
      width:320px;
    }
    @media (max-width: 351px) {
      width:300px;
    }
    @media (max-width: 332px) {
      width:280px;
    }
  }
  .note {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-checkbox-wrapper span {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  & .ant-breadcrumb > ol > li {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .ant-card-body {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  & .ant-breadcrumb > ol > li > .ant-breadcrumb-link {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.title1};
    line-height: ${(props) => props.theme.typography.title2};
    color: ${(props) => props.theme.colors.black};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  & .ant-breadcrumb > ol > li > .ant-breadcrumb-link > img {
    height: 22px;
    width: 22px;
  }
  .profile-container {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .edit-icon {
      cursor: pointer;
    }
    .user-details {
      text-align: left;
      .user-details-inner { 
        display: flex;
        gap: 10px;
        align-items: center;
        span {
          cursor: pointer;
        }
      }
      .label {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.subText2};
        line-height: ${(props) => props.theme.typography.text};
        color: ${(props) => props.theme.colors.grey.semiDark};
      }
      .value {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.subText2};
        line-height: ${(props) => props.theme.typography.text2};
        color: ${(props) => props.theme.colors.black};
      }
      .username {
        font-weight: ${(props) => props.theme.fontWeight.bold};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text2};
        color: ${(props) => props.theme.colors.black};
      }
    }
  }
  .settings-main {
    text-align: left;

    .title {
      margin-top: 50px;
      margin-bottom: 20px;
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.subTitle1};
      line-height: ${(props) => props.theme.typography.subTitle3};
      color: ${(props) => props.theme.colors.black};
    }
    .settings {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .single-setting {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      background: ${(props) => props.theme.colors.white};
      padding:15px 35px;
      border-radius: 15px;
      .mail_icon {
        margin-top : -12px;
      }
      @media (${deviceQuery.tabletL}) {
        display: flex;
        width: 90%!important;
        flex-direction: column;
        gap:10px;
        align-items:flex-start;

    }
      @media (${deviceQuery.tabletMS}) {
        display: flex;
        flex-direction: column;
        gap:10px;
        align-items:flex-start;

    }
      @media (${deviceQuery.mobileSMT}) {
      display: flex;
      flex-direction: column;
      gap:10px;
      align-items:flex-start;
    }  
    }
    .label-container {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: start;
      width: 20%;
      word-break: break-word;
      label {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text2};
        color: ${(props) => props.theme.colors.black};
        white-space: nowrap;
      }
      span {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text2};
        color: ${(props) => props.theme.colors.black};
        white-space: nowrap;
      }
      .change-btn {
        background: ${(props) => props.theme.colors.blendBlue};
        border-radius: 4px;
        border: none;
        max-width: 130px;
        padding: 6px 25px
        & > span {
          font-weight: ${(props) => props.theme.fontWeight.semiLight};
          font-size: ${(props) => props.theme.typography.text};
          line-height: ${(props) => props.theme.typography.text2};
          color: ${(props) => props.theme.colors.blue.dark};
        }
        &:disabled {
          background: ${(props) => props.theme.colors.grey.semiDarkLight};
        }
      }

      }
    }
    .settings-card {
      border: none;
      background: ${(props) => props.theme.colors.white};
      border-radius: 15px;
      height: 100%;
      .card-title {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text1};
        line-height: ${(props) => props.theme.typography.subTitle1};
        color: ${(props) => props.theme.colors.black};
        margin: 20px 0 8px 0;
      }
      .card-label {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
        color: ${(props) => props.theme.colors.grey.semiDark};
        margin-bottom: 40px;
      }
      .last-change-date {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.subText2};
        line-height: ${(props) => props.theme.typography.subText4};
        color: ${(props) => props.theme.colors.grey.semiDark};
      }
      .account-manage-btn {
        width: fit-content;
        background: ${(props) => props.theme.colors.blendBlue};
        border-radius: 4px;
        min-width: 130px;
        border: none;
        span {
          font-weight: ${(props) => props.theme.fontWeight.bold};
          font-size: ${(props) => props.theme.typography.text};
          line-height: ${(props) => props.theme.typography.text1};
          color: ${(props) => props.theme.colors.blue.dark};
        }
      }
    }
  }
  @media (${deviceQuery.mobileL}) {
    & .ant-breadcrumb > ol > li > .ant-breadcrumb-link {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.text2};
    }
  }
  .terms-list {
    text-align: left;
    width: 50%;
    margin: auto;
    @media (${deviceQuery.tabletL}) {
      width: 90%;
    }
    @media (${deviceQuery.mobileL}) {
      width: 100%;
    }
    .freeze-title {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subTitle1};
      line-height: ${(props) => props.theme.typography.subTitle4};
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 8px;
    }
    .details {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.black};
    }
    .delete-account {
      margin-top: 8px;
      margin-bottom: 24px;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
    }
    .delete-account > label {
      color: ${(props) => props.theme.colors.black};
    }
    .delete-account > span {
      color: ${(props) => props.theme.colors.marketDown};
    }
    .disclaimer {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.grey.semiDark};
      margin-bottom: 50px;
    }

    .terms > p {
      margin-bottom: 16px;
    }
  }
  .confirm-btn {
    border-radius: 50px;
    border: none;
    max-width: 350px;
    width: 100%;
    box-shadow: none;
    background: ${(props) => props.theme.colors.blue.dark};
    margin-top: 50px;
    span {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.whiteOnly};
    }
  }
  .ant-select-selection-search-input {
    color: ${(props) => props.theme.colors.black} !important;
  }
`;

export const StyledLoginTable = styled(Table)`
  overflow: auto !important;
  & .ant-table-thead > tr > .ant-table-cell {
    background: ${(props) => props.theme.colors.blendWhite};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  & .ant-table-thead > tr > .ant-table-cell:before {
    display: none;
  }
  & .ant-table-thead > tr > .ant-table-cell {
    border-color: ${(props) => props.theme.colors.white};
  }
  & .ant-table-tbody > .ant-table-row > .ant-table-cell {
    border-color: ${(props) => props.theme.colors.white};
  }
  .ant-table-tbody > tr {
    &:hover {
      .ant-table-cell.ant-table-cell-row-hover {
        background: ${(props) => props.theme.hovers.hover2};
      }
    }
  }
  & .ant-table-tbody {
    overflow-x: auto !important;
    background: ${(props) => props.theme.colors.whiteBlack};
    color: ${(props) => props.theme.colors.black};
  }
  button {
    background: transparent;
    color: ${(props) => props.theme.colors.blue.dark};
    border: none;
  }
  .ant-table-tbody {
    @media (${deviceQuery.mobileSM}) {
      font-size: 12px;
  }
}2
`;

export const PreferenceSettingsContainer = styled.div`
  .ant-select-arrow {
    color: ${(props) => props.theme.colors.black};
  }
  .settings-main {
    text-align: left;
    .title {
      margin-bottom: 20px;
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.subTitle1};
      line-height: ${(props) => props.theme.typography.subTitle3};
      color: ${(props) => props.theme.colors.black};
    }

    .single-setting {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      background: ${(props) => props.theme.colors.white};
      padding: 10px 20px;
      border-radius: 15px;
      .ant-select {
        width: 120px;
      }
      @media (${deviceQuery.mobileMS}) {
        flex-direction: column;
        gap: 10px;
        .label-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .ant-select {
          width: 100%;
        }
      }
    }
    .ant-select-selector {
      background: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.black};
      border: 1px solid ${(props) => props.theme.borders.border4};
    }
    .ant-select-selection-item {
      border: ${(props) => props.theme.borders.border4};
      color: ${(props) => props.theme.colors.black};
    }

    .label-container {
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: start;
      min-width: 200px;
      label {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text2};
        color: ${(props) => props.theme.colors.black};
      }
      span {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text2};
        color: ${(props) => props.theme.colors.black};
      }
    }
    .settings {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
`;

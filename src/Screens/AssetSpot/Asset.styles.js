import { Modal, Table } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const SettingsContainer = styled.div`
  .action-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
  }
  .outlet-container {
    width: 100%;
  }
  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow
    svg {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    background: ${(props) => props.theme.colors.white};
  }
  .asset-tab {
    width: 100% !important;
    margin: 20px 0px;
    .market-input {
      width: 90%;
      background: ${(props) => props.theme.colors.white};
      input {
        background: ${(props) => props.theme.colors.white};
      }
      input::placeholder {
        color: ${(props) => props.theme.colors.placeHolderColor};
      }
    }
  }
  padding: 50px;
  background: ${(props) => props.theme.colors.blue.extraLight};
  display: flex;
  grid-gap: 20px;
  align-items: flex-start;
  @media (${deviceQuery.mobileL}) {
    padding: 20px;
  }

  @media (${deviceQuery.laptopM}) {
    ${"" /* grid-template-columns: 1fr; */}
    flex-direction: column;
  }
  @media (${deviceQuery.desktopS}) {
    grid-template-columns: 1fr;
  }
  .spot-deposit-btn {
    display: flex;
    align-items: center;
    background: blue;
    justify-content: center;
    align-items: center;
    padding: 13px 41px;
    gap: 10px;
    width: 141px;
    height: 44px;
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 8px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .spot-withdraw-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 13px 41px;
    gap: 10px;
    width: 141px;
    height: 44px;
    background: rgba(48, 148, 234, 0.1);
    border-radius: 8px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .btn-row {
    display: flex;
    gap: 10px;
  }
  .withdraw-btn-span {
    color: ${(props) => props.theme.colors.blue.dark};
    font-weight: 700;
  }
  .text-blue {
    color: ${(props) => props.theme.colors.blue.dark};
    cursor: pointer;
  }
  .mr-5 {
    margin-right: 5px;
  }
  .deposit-btn-span {
    color: ${(props) => props.theme.colors.whiteOnly};
    font-weight: 700;
  }
  .settings-change-container {
    background: ${(props) => props.theme.colors.white};
    padding: 20px;
    width: 300px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .ant-collapse > .ant-collapse-item > .ant-collapse-content {
      background: ${(props) => props.theme.colors.white};
    }

    @media (${deviceQuery.tabletM}) {
      width: 100%;
    }
    .ant-input-affix-wrapper {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
      color: ${(props) => props.theme.colors.black};
    }
    .setting-btn-active {
      background: rgba(48, 148, 234, 0.2);
      border-radius: 8px;
      width: 100% !important;
      flex: 1;
      border: none !important;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: none;
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      ${"" /* background: ${(props) => props.theme.colors.white}; */}
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.grey.semiDark} !important;
    }
    .w-full {
      width: 100% !important;
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
    }
  }
`;

export const AccountSettingsContainer = styled.div`
  .ant-input-affix-wrapper {
    width: fit-content;
    color: ${(props) => props.theme.colors.black};
  }
  .operation-container{
    display: flex;
    gap: 10px;
    justify-content: center;
    color: ${(props) => props.theme.colors.blue.dark};

  }
  .input-container {
    width: 321px;
    radius: 8px;
  }
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
    align-items: center;
    gap: 8px;

    h1 {
      font-size: 24px;
    }
    .edit-icon {
      cursor: pointer;
    }
    .user-details {
      text-align: left;

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
      padding: 10px 20px;
      border-radius: 15px;
      @media (${deviceQuery.mobileSM}) {
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
      .change-btn {
        background: ${(props) => props.theme.colors.blendBlue};
        border-radius: 4px;
        border: none;
        max-width: 130px;
        & > span {
          font-weight: ${(props) => props.theme.fontWeight.semiLight};
          font-size: ${(props) => props.theme.typography.text};
          line-height: ${(props) => props.theme.typography.text2};
          color: ${(props) => props.theme.colors.blue.dark};
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
      color: ${(props) => props.theme.colors.black};
    }
  }
`;

export const StyledMarketTable = styled(Table)`
  height: 300px;
  overflow: auto;
  .ant-table-thead > tr > .ant-table-cell {
    border-radius: 0px !important;
  }
  &::-webkit-scrollbar {
    width: 6px !important;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.grey.extraLight} !important;
    border-radius: 8px;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${(props) => props.theme.colors.blue.dark} !important;
  }
  .ant-table-thead > tr > .ant-table-cell {
    background: ${(props) => props.theme.colors.white};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-table-thead > tr > .ant-table-cell {
    border-color: ${(props) => props.theme.colors.white};
  }
  .ant-table-cell::before {
    display: none !important;
  }
  .ant-empty-normal .ant-empty-description {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-table-tbody > tr {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.grey.semiDark};
    &:hover {
      .ant-table-cell.ant-table-cell-row-hover {
        background: ${(props) => props.theme.hovers.hover2};
      }
    }
  }
  .ant-table-tbody > tr > .ant-table-cell {
    background: ${(props) => props.theme.colors.white};
  }
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

export const JustifyBetween = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
export const IconSelect = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.withdrawContainer};
  align-items: center;
  border: 1px solid rgba(123, 116, 133, 0.4);
  border-radius: 5px;
  padding: 3px 10px;
  width: 100%;
  .ant-select .ant-select-selector {
    border: none !important;
  }
  .ant-select {
    background-color: ${(props) => props.theme.colors.withdrawContainer};
  }
  .ant-select .ant-select-borderless {
    margin-left: 10px;
    background-color: ${(props) =>
      props.theme.colors.withdrawContainer} !important;
  }
`;
export const SelectedToken = styled.div`
  width: 236px;
  height: 56px;
  cursor: pointer;
  background: ${(props) => props.theme.colors.withdrawContainer};
  color: ${(props) =>
    props?.active
      ? `${props.theme.colors.blue.dark}`
      : `${props.theme.colors.black}`};
  border: ${(props) =>
    props?.active
      ? `1px solid ${props.theme.colors.blue.dark}`
      : `1px solid ${props.theme.colors.grey.semiLight}`};
  border-radius: 8px;
  padding: 5px 10px;
  .second-label {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: ${(props) => props.theme.colors.grey.semiDark};
    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;
export const StepperContent = styled.div`
  margin-top: 40px;
  text-align: left;
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
      top: 50%;
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

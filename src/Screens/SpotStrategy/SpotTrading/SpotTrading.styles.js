import { Select, Slider, Tabs } from "antd";
import styled from "styled-components";

export const SpotTradingContainer = styled.div``;

export const SpotTradingTabs = styled(Tabs)`
  &
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-ink-bar {
    display: none;
  }
  .ant-slider .ant-slider-rail {
    background: ${(props) => props.theme.colors.sliderbg} !important;
  }
  & > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
    padding: 4px 20px;
    background: ${(props) => props.theme.colors.blue.extraLight};
    border-radius: 4px;
    margin-left: 16px;
  }
  .ant-tabs-nav::before {
    display: none;
  }
  &
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab-active {
    background: ${(props) => props.theme.colors.blue.dark};
    color: ${(props) => props.theme.colors.white};
  }
  .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab
    > .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.grey.semiDark};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
  }
  .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab-active
    > .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.white};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
  }
`;

export const TabContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  grid-column-gap: 20px;
  .ant-select .ant-select-arrow {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-input-affix-wrapper > input.ant-input {
    color: ${(props) => props.theme.colors.black} !important;
  }
  input {
    color: ${(props) => props.theme.colors.black};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .left {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .label {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-input-prefix > .ant-divider {
    height: 80%;
  }

  .ant-input-affix-wrapper {
    border-color: ${(props) => props.theme.colors.grey.whiteOnly};
    background: ${(props) => props.theme.colors.grey.semiLightDark};
  }
  .ant-input-affix-wrapper > input {
    background: ${(props) => props.theme.colors.grey.semiLightDark} !important;
  }
  .selectamount {
    height: 48px;
    width: 100px;
    border-radius: 8px;

    .ant-select-selector {
      border: none;
      background: ${(props) => props.theme.colors.darkBlack};
      height: 100%;
      padding: 8px 10px;

      .ant-select-selection-item {
        color: ${(props) => props.theme.colors.grey.semiDark};
      }
    }
  }
  .input {
    height: 48px;
    width: 100%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.semiDark};
    border: none;
  }
  .available-container {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
  }
  .available-container > .label {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .available-container > .value {
    color: ${(props) => props.theme.colors.black};
    margin-left: 8px;
  }
  .checkbox-container {
    display: flex;
    gap: 16px;
  }
  .input-with-select {
    position: relative;
  }
  .input-with-select2 {
    position: relative;

    #amount {
      padding-left: 80px;
    }
  }
  .input-oco-select {
    position: relative;
    // display: flex;
    // justify-content: row-reverse;
  }
`;

export const StyledSlider = styled(Slider)`
  .ant-slider-mark-text:not(:first-child):not(:last-child) {
    display: none;
  }
  .ant-slider-mark-text {
    color: ${(props) => props.theme.colors.black};
  }

  .ant-slider-step > span,
  .ant-slider-step > span:hover {
    border-color: ${(props) =>
      props.up ? props.theme.colors.marketUp : props.theme.colors.marketDown};
  }
  .ant-slider-handle:after {
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.up ? props.theme.colors.marketUp : props.theme.colors.marketDown};
  }
  .ant-slider-step > .ant-slider-dot-active {
    border-color: ${(props) =>
      props.up ? props.theme.colors.marketUp : props.theme.colors.marketDown};
  }
  .ant-slider-handle:focus:after,
  .ant-slider-handle:hover:after {
    box-shadow: 0 0 0 4px
      ${(props) =>
        props.up ? props.theme.colors.marketUp : props.theme.colors.marketDown};
  }
`;

export const StyledInputSelectPrefix = styled(Select)`
  position: absolute;
  right: 1px;
  top: 33%;
  transform: translate(0%, -50%);
  z-index: 100;
  width: 90px !important;

  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    background: ${(props) => props.theme.colors.withdrawContainer} !important;
    color: ${(props) => props.theme.colors.grey.semiDark} !important;
  }
  .ant-select-selector {
    border: none;
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
`;

export const OCOInputSelectPrefix = styled(Select)`
  position: absolute;
  left: 1px;
  top: 33%;
  transform: translate(0%, -50%);
  z-index: 100;
  width: 90px !important;

  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    background: ${(props) => props.theme.colors.withdrawContainer} !important;
    color: ${(props) => props.theme.colors.grey.semiDark} !important;
  }
  .ant-select-selector {
    border: none;
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
`;

export const StyledInputSelectSuffix = styled(Select)`
  position: absolute;
  left: 1px;
  top: 33%;
  transform: translate(0%, -50%);
  z-index: 100;
  width: 90px !important;

  .ant-select-selector {
    border: none !important;
    box-shadow: none !important;
    background: ${(props) => props.theme.colors.withdrawContainer} !important;
    color: ${(props) => props.theme.colors.grey.semiDark} !important;
  }
  .ant-select-selector {
    border: none;
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
`;

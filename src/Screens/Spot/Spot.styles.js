import { Menu, Popover, Table, Tabs } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledSpotContainer = styled.div`
  .execution-table .ant-table-tbody {
    max-width: 525px !important;
  }

  .price-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 30px;
    text-align: left;
    @media (${deviceQuery.mobileMSN}) {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
  .ant-menu .ant-menu-submenu-title .anticon {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-spin {
    display: flex;
    justify-content: center;
    position: relative;
    top: -30px;
  }
  .current-price {
    padding: 5px 15px;
    color: ${(props) => props.theme.colors.grey.dark};
    background: ${(props) => props.theme.colors.blue.extraLight};
    border-top: 0.5px solid ${(props) => props.theme.colors.grey.light};
    border-bottom: 0.5px solid ${(props) => props.theme.colors.grey.light};
  }
  .my-toolbar span {
    cursor: pointer;
  }
  .ant-popover-inner {
    z-index: 100;
  }
  .popover-active {
    color: ${(props) => props.theme.colors.greenShade};
  }
  .toolbar-active {
    color: ${(props) => props.theme.colors.greenShade} !important;
  }
  .my-toolbar {
    display: flex;
    gap: 10px;
    padding: 10px 20px;
    color: gray;
    font-weight: bold;
    align-items: center;
  }
  .time-popover {
    position: relative;
    top: -2px;
  }
  .question-img-container {
    position: relative;
    .question {
      position: absolute;
      right: 10px;
      top: 30px;
      cursor: pointer;
    }
  }

  background: ${(props) => props.theme.colors.blue.extraLight};
  .coin-nav {
    display: flex;
    border-top: 0.5px solid ${(props) => props.theme.colors.grey.light};
    border-bottom: 0.5px solid ${(props) => props.theme.colors.grey.light};
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 12px 20px;
  }
  .about-coin-popover {
    .ant-popover {
      background: ${(props) => props.theme.colors.cardbg};
      max-width: 500px;
      .ant-popover-arrow {
        display: none;
      }
      .ant-popover-content > .ant-popover-inner {
        background: ${(props) => props.theme.colors.cardbg};
      }
      .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content {
        color: ${(props) => props.theme.colors.black};
      }
    }
  }
  .available-container {
    display: flex;
    justify-content: space-between;
    .label {
      margin-right: 10px;
    }
    .value {
      color: ${(props) => props.theme.colors.black};
    }
  }
  .highcharts-background {
    fill: ${(props) => props.theme.colors.white};
  }
  .ant-tabs.orders-tabs > .ant-tabs-nav {
    margin-bottom: 0;
    background: ${(props) => props.theme.colors.blue.extraLight};
    color: ${(props) => props.theme.colors.black};
  }
  .orders-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list {
    padding-left: 10px;
  }
  .coin-details-container {
    display: flex;
    gap: 30px;
    align-items: center;
    .coin-icon {
      width: 32px;
      height: 32px;
    }
    .coin-name {
      margin-left: -20px;
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text2};
      line-height: ${(props) => props.theme.typography.subTitle1};
      color: ${(props) => props.theme.colors.black};
    }
    .coin-popover-container {
      display: flex;
      align-items: center;
      gap: 30px;
      @media (${deviceQuery.laptopM}) {
        flex-direction: column;
        gap: 10px;
        align-items: start;
      }
    }
    // .price-container {
    //   display: flex;
    //   gap: 40px;
    //   @media (${deviceQuery.mobileMSN}) {
    //     gap: 20px;
    //   }
    // }
    .logo-container {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .price {
      color: ${(props) => props.theme.colors.marketUp};
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.subTitle1};
      line-height: ${(props) => props.theme.typography.subTitle2};
    }
    .label {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: ${(props) => props.theme.colors.grey.semiDark};
    }
    .value {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.grey.medium};
      margin-top: 8px;
      text-align: left;
    }
    .value.perc {
      color: ${(props) =>
        props.priceUp
          ? props.theme.colors.marketUp
          : props.theme.colors.marketDown};
    }
  }
  .about {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.blue.dark};
    @media (${deviceQuery.laptopM}) {
      margin-top: 10px;
    }
  }
  .main-container {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    background: ${(props) => props.theme.colors.whiteBlack};
    .markets-container {
      text-align: left;
      border-right: 0.5px solid ${(props) => props.theme.colors.grey.light};
    }
    .markets-container .ant-tabs-nav::before {
              border-bottom: ${(props) => props.theme.borders.border2};
    }
    .markets-container .ant-tabs-tab  {
        padding: 9px 0 10px 0;
    }
    .markets-container .ant-tabs-tab-btn{
        font-weight: 500
    }
    .markets-container
      .ant-tabs
      .ant-tabs-nav
      .ant-tabs-nav-wrap
      .ant-tabs-nav-list
      .ant-tabs-tab
      .ant-tabs-tab-btn {
      color: ${(props) => props.theme.colors.grey.semiDark};
    }
    .title {
      padding: 11px 15px;
      background: ${(props) => props.theme.colors.blue.extraLight};
      font-weight: ${(props) => props.theme.fontWeight.bold};
      margin: 0;
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.black};
      border-bottom: ${(props) => props.theme.borders.border2};
    }
    .title.execution {
      background-color: ${(props) => props.theme.colors.whiteBlack};
    }
    .execution {
      display: flex;
      justify-content: space-between;
      .mine-check {
        display: flex;
        gap: 5px;
        color: ${(props) => props.theme.colors.grey.semiDark};
      }
    }
    .input-container {
      display: flex;
      justify-content: center;
      padding: 13px 16px;
      background: ${(props) => props.theme.colors.blue.extraLight};
      input {
        color: ${(props) => props.theme.colors.black};
      }
    }
    .market-input {
      width: 100%;
      border: none;
      background: ${(props) => props.theme.colors.white};
      .ant-select-selector {
      border: none;
      }
      input {
        background: ${(props) => props.theme.colors.white};
      }
      input::placeholder {
        color: ${(props) => props.theme.colors.placeHolderColor};
      }
    }
    .ant-select-selection-item {
      color: ${(props) => props.theme.colors.black};
    }

    .ant-select-dropdown {
      background: red;
    }
    .ant-select-dropdown
      .rc-virtual-list
      .rc-virtual-list-holder
      .rc-virtual-list-holder-inner {
      background: red;
    }
    .ant-select-dropdown .ant-select-item-option-content {
      background: ${(props) => props.theme.colors.placeHolderColor};
    }
    .chart-settings-container {
      background: ${(props) => props.theme.colors.blue.extraLight};
      display: flex;
      justify-content: flex-end;
      padding: 10px 0;
      align-items: center;
      .chart-settings-menu {
        max-width: 300px;
        &.ant-menu-overflow > .ant-menu-overflow-item {
          padding-right: 0;
        }
      }
      .graph-switch-btns {
        display: flex;
        gap: 10px;
        padding-right: 20px;
        align-items: center;
      }
      .chart-switch-btn {
        border: none;
        background: ${(props) => props.theme.colors.grey.transparent};
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.subText2};
        line-height: ${(props) => props.theme.typography.subText4};
        color: ${(props) => props.theme.colors.grey.semiDark};
      }
      .chart-switch-btn.active {
        background: ${(props) => props.theme.colors.blue.gradient};
        color: ${(props) => props.theme.colors.blue.dark};
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
    #tradingview_ccfd5 {
      height: 100%;
    }
    .tradingview-widget-container {
      height: 100% !important;
    }
    @media (${deviceQuery.laptopM}) {
      grid-template-columns: 100%;
      grid-auto-flow: column-reverse;
    }
  }
  @media (${deviceQuery.mobileSM}) {
    .hide {
      display: none;
    }
    .ant-input:placeholder-shown {
      text-align: center;
    }
  }
`;

export const CoinPopover = styled(Popover)`
  cursor: pointer;
`;
export const IndicatorContainer = styled.div`
  .input-container {
    width: 100%;
  }
  .market-input {
    outline: none !important;
    box-shadow: none !important;
    border: none;
  }
  .search-container {
    margin: 10px 0px;
    border-top: ${(props) => props.theme.borders.border2};
    border-bottom: ${(props) => props.theme.borders.border2};
    padding: 5px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .search-text {
    color: ${(props) => props.theme.colors.grey.semiDark};
    font-weight: 800;
  }
  .content-list {
    padding: 5px;
  }
  .script-text {
    color: ${(props) => props.theme.colors.grey.semiDark};
    margin-bottom: 10px;
  }
  .indi-list {
    padding: 5px 10px;
  }
  .indi-list:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.blue.shade2};
  }
`;

export const StyledMenuFilters = styled(Menu)`
  background: ${(props) => props.theme.colors.blue.extraLight};
  width: 100%;
  .ant-menu-item-selected > span > .menu-item {
   /* background: ${(props) => props.theme.colors.blue.gradient}; */
    border-radius: 4px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text};
    color: ${(props) => props.theme.colors.blue.dark};
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
  .menu-item {
    padding: 6px 10px;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  &.ant-menu-horizontal > .ant-menu-item::after,
  &.ant-menu-horizontal > .ant-menu-submenu::after {
    border-bottom: none !important;
    transition: none !important;
  }
  &.ant-menu-horizontal {
    border-bottom: 0;
  }
  &.ant-menu-overflow > .ant-menu-overflow-item {
    /* padding-right: 0; */
  }
  &.active {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
`;

export const StyledTable = styled(Table)`
  border-bottom: ${(props) => props.theme.borders.border2};
  padding-bottom: 40px;
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
  }
  .perp {
    color: ${(props) => props.theme.colors.blue.dark} !important;
    background: ${(props) => props.theme.colors.blue.gradient} !important;
    padding: 2px 5px;
    border-radius: 3px;
  }
  .logo-span {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.white};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.scrollThumb};
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.scroll2};
  }
  background-color: ${(props) => props.theme.colors.whiteBlack};
  & .ant-table-body {
    background-color: ${(props) => props.theme.colors.whiteBlack};
  }
  .ant-table-body::-webkit-scrollbar {
    width: 6px;
  }
  .ant-empty-description {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  /* Track */
  .ant-table-body::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.grey.white};
  }

  /* Handle */
  .ant-table-body::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.grey.light};
  }
  .ant-table-thead > tr > .ant-table-cell {
    background-color: ${(props) => props.theme.colors.whiteBlack};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: ${(props) => props.theme.colors.grey.semiDark};
    border: none !important;
  }
  .ant-table-thead > tr > .ant-table-cell::before {
    display: none;
  }
  .ant-table-tbody > .ant-table-row > .ant-table-cell {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: ${(props) => props.theme.colors.grey.semiDark};
    padding-top: 10px;
    padding-bottom: 10px;
    border: none !important;
    cursor: pointer;
  }

  .ant-table-tbody > tr > .ant-table-cell.ant-table-cell-row-hover {
    background: transparent !important;
  }
`;

export const StyledTableSpan = styled.span`
  color: ${(props) =>
    Number(props.item) > 0
      ? props.theme.colors.marketUp
      : Number(props.item) < 0
      ? props.theme.colors.marketDown
      : props.theme.colors.black};
  font-weight: ${(props) => props.theme.fontWeight.semiLight};
  font-size: ${(props) => props.theme.typography.subText2};
  line-height: ${(props) => props.theme.typography.subText4};
`;
export const AdvancedContainer = styled.div`
  color: ${(props) => props.theme.colors.grey.semiDark};
  font-weight: ${(props) => props.theme.fontWeight.semiLight};
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: ${(props) => props.theme.typography.subText2};
  .ant-form-item {
    height: 100%;
    display: flex;
    align-items: end;
  }
`;
export const StyledCellSpan = styled.span`
  color: ${(props) =>
    props?.side === "buy"
      ? props.theme.colors.marketUp
      : props.theme.colors.marketDown};
  font-weight: ${(props) => props.theme.fontWeight.semiLight};
  font-size: ${(props) => props.theme.typography.subText2};
  line-height: ${(props) => props.theme.typography.subText4};
`;

export const SpotTradingTab = styled(Tabs)`
  margin-top: 20px;
  padding: 20px;
  background: ${(props) => props.theme.colors.whiteBlack};
  .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-ink-bar {
    background: ${(props) => props.theme.colors.blue.dark};
  }
  ${
    "" /* .trading-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    img {
      position: absolute;
      right: 0px;
    }
  } */
  }
  .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab
    > .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.blue.dark};
  }
`;
export const SpotOrdersTabs = styled(Tabs)`
  background: ${(props) => props.theme.colors.blue.extraLight};
  & > .ant-tabs-content-holder {
    padding: 0 50px;
  }
  @media (${deviceQuery.tabletS}) {
    & > .ant-tabs-content-holder {
      padding: 0 20px;
    }
  }
  &
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-ink-bar {
    background: ${(props) => props.theme.colors.blue.dark};
  }
  &
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab-active
    > .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
  .ant-tabs-nav .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  & > .ant-tabs-nav {
    padding: 0 50px;
    background: ${(props) => props.theme.colors.white};
  }
`;
export const MarketsContainer = styled.div`
  input {
    background: red;
  }
`;

export const StyledOrderBookContainer = styled.div`
  .filters-container {
    display: flex;
    padding: 8px 16px;
    background: ${(props) => props.theme.colors.blue.extraLight};
    align-items: center;
    justify-content: space-between;
  }
  .filters-container .ant-select-selector {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
    border: ${(props) => props.theme.borders.border5};
  }
  .ant-select-arrow {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-select-dropdown {
    background: ${(props) => props.theme.colors.white};
    border: none;
  }
  .ant-select-dropdown {
    background: ${(props) => props.theme.colors.white};
  }
  .rc-virtual-list-holder {
    background: ${(props) => props.theme.colors.white};
  }
  .orders-filter {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    button {
      padding: 0;
      background: transparent;
      border: none;
      height: 20px;
      &.active {
      outline: 1px solid #3094EA;
      }

      &:focus-visible {
        outline: 1px solid #3094EA; 
      }

    }
  }
  .orders-container {
    background: ${(props) => props.theme.colors.whiteBlack};
  }
  .orders-container .ask-row .price {
  color: rgb(219, 85, 65) !important;
   }

  .orders-container  .bid-row .price-bids {
   color: rgb(0, 133, 99) !important;
   }

  .orders-head {
    display: flex;
    padding: 16px 16px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .orders-row.orders-total {
    padding: 4px 0;
    display: flex;
    flex-wrap: wrap;
    color: ${(props) => props.theme.colors.grey.semiDark};
    gap: 8px;
    justify-content: flex-start !important;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.grey.light};
    border-left: 0;
    border-right: 0;
    .market-up-value {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.marketUp};
    }
  }
  .orders-body > .orders-row {
    background-image: linear-gradient(
      rgba(219, 85, 65, 0.06),
      rgba(219, 85, 65, 0.06)
    );
    background-position: 100% 0;
    background-repeat: no-repeat;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .price {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: ${(props) => props.theme.colors.marketDown};
    }
    .price-bids {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: rgb(18, 179, 114);
    }
    .value {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: ${(props) => props.theme.colors.grey.dark};
    }
  }
  .orders-body > .orders-bids {
    background-image: linear-gradient(
      rgba(14, 173, 152, 0.06),
      rgba(14, 173, 152, 0.06)
    );
    background-position: 100% 0;
    background-repeat: no-repeat;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .price {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: ${(props) => props.theme.colors.marketDown};
    }
    .price-bids {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: rgb(18, 179, 114);
    }
    .value {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: ${(props) => props.theme.colors.grey.dark};
    }
  }

  .orders-head > span {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
`;

export const StyledLastTradesContainer = styled.div`
  .last-trades-container {
    background: transparent !important;
  }
  .price-bids {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: rgb(18, 179, 114);
  }
  .last-trades-head {
    display: flex;
    padding: 16px 16px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .last-trades-row.last-trades-total {
    padding: 4px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start !important;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.grey.light};
    border-left: 0;
    border-right: 0;
    .market-up-value {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.marketUp};
    }
  }
  .last-trades-body {
    overflow-y: auto;
    height: 1000px;
  }
  .last-trades-body::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  .last-trades-body::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.grey.white};
  }

  /* Handle */
  .last-trades-body::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.grey.light};
  }
  .last-trades-body > .last-trades-row {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .price {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: ${(props) => props.theme.colors.marketDown};
    }
    .value {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.subText2};
      line-height: ${(props) => props.theme.typography.subText4};
      color: ${(props) => props.theme.colors.black};
    }
  }

  .last-trades-head > span {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
`;

export const HistoryContainer = styled.div`
  .ant-steps-item-title {
    width: 100% !important;
  }
  .bot-table {
    .ant-table-wrapper .ant-table-thead >tr>th {
      padding-top: 20px !important;
    }
  } 
  .ant-table-cell {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-table-wrapper .ant-table-tbody >tr >td  {
    background: ${(props) => props.theme.colors.white} !important;
  }
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td {
    background: ${(props) => props.theme.colors.tableHover} !important;
  }
  button.active {
    color: ${(props) => props.theme.colors.blue.dark};
    border: ${(props) => `1px solid ${props.theme.colors.blue.dark}`};
  }
  .ant-pagination .ant-pagination-item-active {
    background-color: transparent !important;
  }
  .ant-pagination {
    text-align: center !important;
  }
  .ant-pagination .ant-pagination-item-link {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-pagination .ant-pagination-item a {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-steps .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
    color: ${(props) => props.theme.colors.black};
  }
  .single-filter > div:first-child {
    background-color: ${(props) => props.theme.colors.white};
  }
  .side-label {
    @media (${deviceQuery.tabletM}) {
      font-size: ${(props) => props.theme.typography.subText1};
    }
  }
  .otp-input {
    background: ${(props) => props.theme.colors.withdrawContainer} !important;
    border-radius: 8px !important;
    min-width: 20px !important;
  }
  .cWqbtf {
    background: ${(props) => props.theme.colors.white} !important;
  }
  .step-container {
    display: flex;
    gap: 20px;
    @media (${deviceQuery.tabletM}) {
      flex-direction: column !important;
    }
  }
  .d-none-container {
    @media (${deviceQuery.tabletM}) {
      display: none;
    }
  }
  .ant-select-single {
    background: ${(props) => props.theme.colors.white} !important;
  }
  .otp-btn {
    background: ${(props) => props.theme.colors.withdrawContainer};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.grey.dark};
    padding: 5px 10px;
  }
  .Withdraw-btn {
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 8px !important;
    font-size: 16px;
    text-align: center;
    height: 40px;
    color: white;
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 50px;
    border: none;
  }
  .Withdraw-btn:hover {
    color: white !important;
  }
  .otp-active {
    background: rgba(48, 148, 234, 0.2);
    border-radius: 4px;
    color: ${(props) => props.theme.colors.blue.dark};
    padding: 5px 10px;
  }
  .transfer-container {
    color: ${(props) => props.theme.colors.black};
  }
  .transfer-container div:last-child {
    display: flex;
    gap: 20px;
    margin-top: 10px;
  }
  .transfer-active {
    background: ${(props) => props.theme.colors.withdrawContainer};
    padding: 5px 10px;
    border: 1px solid ${(props) => props.theme.colors.blue.dark};
    border-radius: 8px;
    color: ${(props) => props.theme.colors.blue.dark};
    cursor: pointer;
  }
  .justify-between {
    display: flex;
    justify-content: space-between;
  }
  .transfer-type {
    background: ${(props) => props.theme.colors.withdrawContainer};
    padding: 5px 10px;
    border: 1px solid ${(props) => props.theme.colors.withdrawContainer};
    border-radius: 8px;
    cursor: pointer;
  }
  .flex-box {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .theme-text {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .coin-row {
    display: flex;
    justify-content: space-between;
  }
  .withdraw-input-container {
    background: ${(props) => props.theme.colors.withdrawContainer} !important;
    border: 1px solid rgba(123, 116, 133, 0.2);
    margin-top: 10px;
    border-radius: 4px;
    padding: 15px 20px;
  }
  .withdraw-input {
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.colors.withdrawContainer} !important;
    border: 8px;
  }
  .withdraw-input input {
    @media (${deviceQuery.mobileSMT}) {
      width: 150px;
    }
  }
  .generate-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .generate-container div:last-child {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: ${(props) => props.theme.colors.blue.dark};
    cursor: pointer;
  }
  .scratch-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    background: white;
    border-radius: 50%;
    svg {
      font-size: 20px;
    }
  }
  .scratch-decoded {
    background: ${(props) => props.theme.colors.blue.extraLight};
    border-color: ${(props) => props.theme.colors.black};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .qr-code {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      flex-wrap: wrap;
      word-break: break-all;
      text-align: center;
      }
    }
  }
  .scratch-btn {
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 8px !important;
    font-size: 16px;
    text-align: center;
    height: 40px;
    color: ${(props) => props.theme.colors.grey.semiDark};
    background: rgba(123, 116, 133, 0.05);
    border-radius: 50px;
    border: none;
  }
  .scratch-box {
    background: ${(props) => props.theme.colors.white};
    border: 1px dashed ${(props) => props.theme.colors.grey.semiDark};
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .scratch-heading {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
  }
  .scratch-orange {
    color: ${(props) => props.theme.colors.rating};
  }
  .coin-label div {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: ${(props) => props.theme.colors.grey.semiDark};
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .coin-label label {
    cursor: pointer;
  }
  .coin-header div {
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    text-align: center;
    color: ${(props) => props.theme.colors.blackOnly};
    margin-bottom: 5px;
  }
  .font-bold {
    font-weight: bold;
    color: ${(props) => props.theme.colors.black};
  }
  .single-filter {
    display: flex !important;
    justify-content: flex-start !important;
  }
  .font-blue {
    color: ${(props) => props.theme.colors.blue.dark};
    cursor: pointer;
  }
  .gap-20 {
    display: flex !important;
    margin-top: 10px;
  }
  .gap-20 div:first-child {
    width: 150px;
  }
  .step-heading {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: rgba(123, 116, 133, 0.1);
    font-weight: bold;
    border-radius: 50%;
    padding: 5px 10px;
    border: 1px solid transparent;
  }
  .step-heading-active {
    color: ${(props) => props.theme.colors.blue.dark} !important;
    border-color: ${(props) => props.theme.colors.blue.dark} !important;
  }
  .withdraw-step {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: start;
    padding: 20px;
    background: rgba(123, 116, 133, 0.02);
    border: 1px solid rgba(123, 116, 133, 0.2);
    border-radius: 4px;
  }
  .ant-card-body {
    margin-bottom: 20px;
  }
  .withdraw-step-container {
    display: flex;
    gap: 10px;
  }
  .withdraw-step-container svg {
    color: ${(props) => props.theme.colors.black};
  }
  .withdraw-step-container > div {
    flex: 1;
  }

  .filters {
    text-align: left;
    background: ${(props) => props.theme.colors.white};
    border-radius: 8px;
    border: none;
    .ant-select > .ant-select-arrow {
      color: ${(props) => props.theme.colors.black};
    }
    & > .ant-card-head > .ant-card-head-wrapper > .ant-card-head-title {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.black};
    }
  }
  .ant-card-head-wrapper {
    border: none;
  }
  .ant-card-head {
    border-bottom: ${(props) => props.theme.borders.border4};
  }
  .filters-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 30px;
  }
  .filters-container .ant-select-selector {
    background: transparent;
    color: ${(props) => props.theme.colors.black};
  }
  .filters-container .ant-select-selection-item {
    color: ${(props) => props.theme.colors.semiDark} !important
  }
  .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-select-show-arrow .ant-select-selector {
    color: ${(props) => props.theme.colors.black};
  }
  .single-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    & > label {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.black};
      opacity: 0.8;
    }
  }
  .single-filter .ant-picker {
    background: ${(props) => props.theme.colors.white};
  }
  .single-filter .ant-picker .ant-picker-input input {
    color: ${(props) => props.theme.colors.black};
  }
  .single-filter .ant-picker .ant-picker-input input::placeholder {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .cancel-all-btn {
    border: none;
    background: transparent;
    box-shadow: none;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.black};
    opacity: 0.8;
  }
  .order-type-btn {
    border-radius: 0;
    background: transparent;
    color: ${(props) => props.theme.colors.black};
    border: 1px solid ${(props) => props.theme.borders.border4};
  }
  .time-filter-btn {
    border-radius: 0;
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
    border: 1px solid ${(props) => props.theme.borders.border4};
  }
  .range-picker {
    border-radius: 0;
    border: 1px solid ${(props) => props.theme.borders.border4};
  }
  .order-table {
    overflow: auto;
    .ant-card-body {
      margin-bottom: 20px;
    }
    & .ant-table-thead > tr > .ant-table-cell {
      background: ${(props) => props.theme.colors.white};
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.grey.semiDark};
      padding-top: 0;
      border-color: ${(props) => props.theme.colors.grey.lightTransparent};
    }
    & .ant-table-thead > tr > .ant-table-cell:before {
      display: none;
    }
    & .ant-table-tbody .ant-table-placeholder .ant-table-cell {
      background: ${(props) => props.theme.colors.white};
      border-color: ${(props) => props.theme.colors.grey.lightTransparent};
    }
    .ant-empty-description {
      color: ${(props) => props.theme.colors.black};
    }
  }
  .ant-select-selector {
    border: 1px solid ${(props) => props.theme.borders.border4} !important;
    color: ${(props) => props.theme.colors.black};
  }
  .ant-select-selection-search input {
    color: ${(props) => props.theme.colors.black} !important;
  }
`;

export const OpenOrdersAndHistoryTabs = styled(Tabs)`
  background: ${(props) => props.theme.colors.whiteBlack};
  padding: 0 20px;
  &
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab-active
    > .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  &
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-ink-bar {
    background: ${(props) => props.theme.colors.blue.dark};
  }
  &
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-list
    > .ant-tabs-tab
    > .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-tabs-nav
    .ant-tabs-nav-wrap
    .ant-tabs-nav-list
    .ant-tabs-tab
    .ant-tabs-tab-active
    .ant-tabs-tab-btn {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
`;

export const OrdersContainer = styled.div`
  text-align: left;
  .ant-table-wrapper .ant-table-tbody > tr > td {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .ant-table-wrapper .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: ${(props) => props.theme.colors.tableHover} !important;
  }
  .flex-space-between{
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    svg {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .order-table {
    overflow: auto;
    margin-top: 20px;
    .ant-card-body {
      margin-bottom: 20px;
    }
    & .ant-table-thead > tr > .ant-table-cell {
      background: ${(props) => props.theme.colors.white};
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.grey.semiDark};
      padding-top: 0;
      border-color: ${(props) => props.theme.colors.grey.lightTransparent};
    }
    & .ant-table-thead > tr > .ant-table-cell:before {
      display: none;
    }
    & .ant-table-tbody .ant-table-placeholder .ant-table-cell {
      background: ${(props) => props.theme.colors.white};
      border-color: ${(props) => props.theme.colors.grey.lightTransparent};
    }
    .ant-empty-description {
      color: ${(props) => props.theme.colors.black};
    }
  }
  .ant-select-selector {
    border: 1px solid ${(props) => props.theme.borders.border4} !important;
    color: ${(props) => props.theme.colors.black};
  }
  .ant-select-selection-search input {
    color: ${(props) => props.theme.colors.black} !important;
  }
  .btns-container {
      display: flex;
      gap: 10px;
      overflow: scroll;
      button {
        border: none;
        font-weight: ${(props) => props.theme.fontWeight.bold};
        box-shadow: none;
        color: ${(props) => props.theme.colors.grey.semiDark};
        background: ${(props) => props.theme.colors.blue.extraLight};
      }
      button.active {
        color: ${(props) => props.theme.colors.blue.dark};
      }
  }
  .btns-container::-webkit-scrollbar {
    display: none;
  }
  
  / Hide scrollbar for IE, Edge and Firefox /
  .btns-container {
    -ms-overflow-style: none;  / IE and Edge /
    scrollbar-width: none;  / Firefox /
  }
  & > .orders-container-table {
    margin-top: 20px;
    overflow-x: auto;
    .ant-table-thead > tr > .ant-table-cell {
      background: ${(props) => props.theme.colors.whiteBlack};
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      color: ${(props) => props.theme.colors.grey.semiDark};
    }
    .ant-table-tbody .ant-table-placeholder .ant-table-cell {
      background: ${(props) => props.theme.colors.whiteBlack};
      border-color: ${(props) => props.theme.colors.grey.lightTransparent};
    }
    .ant-empty-description {
      color: ${(props) => props.theme.colors.black};
    }
    .ant-table-thead > tr > .ant-table-cell:before {
      display: none;
    }
  }
`;

export const FeesContainer = styled.div`
  margin-top: 10px;
  color: ${(props) => props.theme.colors.grey.semiDark};
  font-size: 16px;

  span {
    border: 1px solid ${(props) => props.theme.colors.grey.semiDark};
    color: ${(props) => props.theme.colors.grey.semiDark};
    padding: 0px 2px;
    font-weight: bold;
    ${"" /* font-size: 12px; */}
    margin-right: 5px;
  }
`;
export const FiltersDropdownContainer = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;

  & > div {
    cursor: pointer;
    padding: 5px 10px;
    text-align: center;
  }
  & > div:hover {
    background: ${(props) => props.theme.colors.blue.extraLight};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  padding: 6px 0px;
`;

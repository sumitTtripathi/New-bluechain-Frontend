import { Menu, Select, Table } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const MainMarketPageContainer = styled.div`
  background: ${(props) => props.theme.colors.blue.extraLight};

  .market-overview-btn {
    display: flex;
    padding: 0 20px;
    gap: 8px;
    justify-content: flex-end;
    align-items: center;

    img,
    span {
      cursor: pointer;
    }
  }

  .ant-table-column-sorter,
  .ant-table-column-sorter:hover {
    color: ${(props) => props.theme.colors.black} !important;
  }

  .ant-table-tbody > .ant-table-row > .ant-table-cell {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.black};
    background: transparent;
  }

  .ant-table-cell {
    background: transparent !important;
  }

  .table-filter-bar {
    margin-top: 30px;
    .ant-menu-overflow {
      background: transparent;
    }
  }

  .ant-table-thead {
    .ant-table-cell {
      border-radius: none !important;
    }
    border-radius: none !important;
  }

  .market-overview-btn > span {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text1};
    line-height: ${(props) => props.theme.typography.subTitle1};
    color: ${(props) => props.theme.colors.blue.dark};
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 26px;
    padding: 20px;
    margin: 16px 0 25px;
  }

  .coins-table-container {
    padding: 56px 47px 0;
    background: ${(props) =>
      props.currentTheme === "light"
        ? props.theme.colors.white
        : props.theme.colors.blue.extraLight};

    .table-header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ant-select-selector {
        border: none;
      }

      @media (${deviceQuery.mobileM}) {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }

    .table-name {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.title1};
      line-height: ${(props) => props.theme.typography.title3};
      color: ${(props) => props.theme.colors.blue.dark};
    }
  }

  @media (${deviceQuery.tabletM}) {
    .cards-container {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 20px;
    }
  }

  @media (${deviceQuery.mobileM}) {
    .cards-container {
      grid-template-columns: 1fr;
    }
  }

  .ant-table-wrapper .ant-table-thead th,
  .ant-table-wrapper .ant-table-thead th:hover {
    background: transparent;
  }

  .ant-table-cell .ant-table-column-has-sorters:before {
    display: none !important;
  }

  .pagination {
    .ant-pagination-prev,
    .ant-pagination-next {
      button {
        color: ${(props) => props.theme.colors.black};
      }
    }

    .ant-pagination-item > a {
      color: ${(props) => props.theme.colors.black};
    }

    .ant-pagination-item-active {
      background: ${(props) => props.theme.colors.white};

      > a {
        color: ${(props) => props.theme.colors.black};
      }
    }

    .ant-pagination-jump-next
      > .ant-pagination-item-link
      > .ant-pagination-item-container
      > .ant-pagination-item-ellipsis,
    .ant-pagination-jump-prev
      > .ant-pagination-item-link
      > .ant-pagination-item-container
      > .ant-pagination-item-ellipsis {
      color: ${(props) => props.theme.colors.black};
    }
  }
`;


export const CoinCardContainer = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 15px;
  padding: ${(props) => (props.isGraphCard ? "16px 0 0" : "16px 0 16px")};
  flex: 1;
  min-width: 300px;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-shadow: ${(props) =>
    props.currentTheme === "light"
      ? "0px 16px 6px rgba(207,207,211,0.01), 0px 9px 5px rgba(207,207,211,0.05), 0px 4px 4px rgba(207,207,211,0.09), 0px 1px 2px rgba(207,207,211,0.1)"
      : "0px 4px 4px rgba(0,0,0,0.25)"};

  .card-title {
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: 14px;
    color: ${(props) =>
      props.currentTheme === "dark" ? "#FFFFFF" : props.theme.colors.black};
    margin: 0;
    text-align: left;
    padding: 0 16px;
  }

  .divider {
    margin: 8px 0;
    background: ${(props) =>
      props.currentTheme === "dark"
        ? "#333333"
        : props.theme.colors.grey.light};
  }

  .card-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .coin-details-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: ${(props) => (props.isGraphCard ? "0" : "30px")};
  }

  .coin-number {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: 24px;
    color: ${(props) =>
      props.currentTheme === "dark" ? "#FFFFFF" : props.theme.colors.black};
    margin: 0;
  }

  .coin-count {
    font-size: 42px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .coin-subtitle {
    color: #a0a0a0;
    font-size: 14px;
  }

  .coin-icons {
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
  }

  .coin-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .coin-icon:first-child {
    background-color: #3498db;
    margin-right: -10px;
    z-index: 2;
  }

  .coin-icon:last-child {
    background-color: #ecf0f1;
    z-index: 1;
  }

  .price-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 16px;
    align-items: center;
  }

  .price-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .price-value {
    font-weight: 700;
    font-size: 24px;
    display: flex;
    align-items: center;
    margin-bottom: 45px;
    color: ${(props) =>
      props.currentTheme === "dark" ? "#FFFFFF" : props.theme.colors.black};
  }

  .price-label {
    color: #a0a0a0;
    font-size: 14px;
  }

  .up-arrow {
    color: #2ecc71;
    margin-right: 10px;
  }

  .down-arrow {
    color: #e74c3c;
    margin-right: 10px;
  }

  .progress-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 5px solid #1c1f26;
    border-top: 5px solid #3498db;
    margin-top: 20px;
  }

  .card-content {
    position: relative;
  }

  .desc {
    font-size: 14px;
    margin: 0;
    text-align: left;
    padding: 0 16px;
    color: ${(props) =>
      props.currentTheme === "dark"
        ? "#AAAAAA"
        : props.theme.colors.grey.dark};
  }

  .desc1 {
    font-size: 12px;
    margin: 0;
    text-align: left;
    padding: 0 16px;
    color: ${(props) =>
      props.currentTheme === "dark"
        ? "#AAAAAA"
        : props.theme.colors.grey.dark};
  }

  .price-change-container {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: 24px;
      color: ${(props) =>
        props.currentTheme === "dark"
          ? "#FFFFFF"
          : props.theme.colors.black};
    }
  }

  .percent-container {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .market-perc-up {
    color: ${(props) => (props.up ? "#00C853" : "#FF3D00")};
    font-size: 14px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    margin: 0;
  }

  /* Override Ant Design Progress styles */
  .ant-progress-circle-trail {
    stroke: ${(props) =>
      props.currentTheme === "dark" ? "#333333" : "#f5f5f5"} !important;
  }

  .circular-progress .ant-progress-text {
    display: none;
    font-size: 12px !important;
    color: ${(props) =>
      props.currentTheme === "dark"
        ? "#FFFFFF"
        : props.theme.colors.black} !important;
  }
`;

export const StyledSearchInput = styled(Select)`
  border-radius: 8px;
  width: 250px;
  border-color: ${(props) => props.theme.colors.grey.semiDark};
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};

  .ant-select-selector {
    background: ${(props) => props.theme.colors.white} !important;
    color: ${(props) => props.theme.colors.black} !important;
  }

  .ant-select-arrow {
    color: ${(props) => props.theme.colors.black};
  }

  .ant-select-selector > .ant-select-selection-placeholder {
    font-family: "Helvetica";
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.subText2};
    line-height: ${(props) => props.theme.typography.subText4};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
`;

export const StyledMenu = styled(Menu)`
  background: ${(props) => props.theme.colors.white};

  .ant-menu-item-selected > span > .menu-item {
    background: ${(props) => props.theme.colors.blue.gradient};
    border-radius: 4px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text};
    color: ${(props) => props.theme.colors.blue.dark};
  }

  .menu-item {
    padding: 6px 10px;
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.black};
  }

  &.ant-menu-horizontal {
    border-bottom: none;
    > .ant-menu-item::after,
    > .ant-menu-submenu::after {
      border-bottom: none !important;
      transition: none !important;
    }
  }

  &.active {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-thead {
    background: ${(props) => props.theme.colors.marketTableHeadGradient};
  }

  .ant-table-thead > tr > th,
  .ant-table-thead > tr > td {
    background: transparent;
    color: rgb(127, 127, 127);
  }

  .ant-table-column-sorter,
  .ant-table-column-sorter:hover {
    color: ${(props) => props.theme.colors.black} !important;
  }

  .ant-pagination-prev button,
  .ant-pagination-next button {
    color: ${(props) => props.theme.colors.black};

    &:hover {
      color: ${(props) => props.theme.colors.black};
    }
  }

  .ant-table-thead > tr > .ant-table-cell,
  .ant-table-tbody > tr > .ant-table-cell {
    border-color: ${(props) => props.theme.colors.white};
  }

  .ant-table-thead > tr > .ant-table-cell:before {
    display: none;
  }

  .ant-table-tbody > tr > .ant-table-cell {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text2};
    color: ${(props) => props.theme.colors.black};
    background: transparent;

    &:hover {
      background: transparent;

      .ant-empty > .ant-empty-description {
        color: ${(props) => props.theme.colors.black};
      }
    }
  }

  .ant-table-tbody > tr {
    background: transparent;
    cursor: pointer;

    &:hover .ant-table-cell.ant-table-cell-row-hover {
      background: ${(props) => props.theme.hovers.hover2};
    }
  }

  .ant-pagination-item {
    background: ${(props) => props.theme.colors.pagination};
    border-radius: 2px;
  }

  .ant-table-column-sorters .ant-tooltip-open {
    border: none;
  }

  .ant-pagination-item-active {
    background: ${(props) => props.theme.colors.blue.dark};
    border-radius: 2px;

    > a {
      font-weight: 400;
      font-size: ${(props) => props.theme.typography.text};
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

export const GradientEffect = styled.div`
  width: 100%;
  height: 30px;
  background: ${(props) => props.theme.colors.blue.gradient4};
`;

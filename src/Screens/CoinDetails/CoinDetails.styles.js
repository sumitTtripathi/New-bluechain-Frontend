import { Button, Input, Menu, Table } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const CoinDetailsContainer = styled.div`
  .top {
    background-color: ${(props) => props.theme.colors.blue.extraLight};
    padding: 0 48px 50px 48px;
    padding-top: 17px;
  }

  .ant-select > .ant-select-arrow {
    color: ${(props) => props.theme.colors.black};
  }
  .ant-progress > .ant-progress-text {
    color: ${(props) => props.theme.colors.black};
  }
  .highcharts-background {
    fill: ${(props) => props.theme.colors.white};
  }
  .ant-select .ant-select-selector {
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }

  .ant-select .ant-select-selector .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }
  .mini-nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 23px;
    justify-content: space-between;
    .breadcrumbs > .ant-breadcrumb > ol > li,
    .breadcrumbs > .ant-breadcrumb > ol > li > span > a {
      color: ${(props) => props.theme.colors.black};
    }
  }
  .coin-details-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .right {
      width: 55%;
      text-align: left;
      .coin-market-details {
        display: flex;
        /* margin-top: 60px; */
        flex-wrap: wrap;
        .single-container {
          padding: 0 20px 40px 0px;
          height: 89px;
          .value {
            margin-top: 16px;
            font-weight: ${(props) => props.theme.fontWeight.bold};
            font-size: ${(props) => props.theme.typography.text1};
            line-height: ${(props) => props.theme.typography.text2};
            color: ${(props) => props.theme.colors.black};
          }
          .label {
            font-weight: ${(props) => props.theme.fontWeight.semiLight};
            font-size: ${(props) => props.theme.typography.text};
            line-height: ${(props) => props.theme.typography.text1};
            color: ${(props) => props.theme.colors.grey.dark};
          }
        }
        .single-container.progress {
          min-width: 200px;
        }
        .single-container:not(:first-child) {
          padding-left: 20px;
        }
      }
      .ant-select-selector {
        border: none;
        outline: none;
      }
      .ant-select-selection-item {
        color: ${(props) => props.theme.colors.black};
      }
      .latest-price-label {
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.text};
        line-height: ${(props) => props.theme.typography.text1};
        color: ${(props) => props.theme.colors.grey.semiDark};
        margin-bottom: 18px;
      }
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .market-perc {
          background: ${(props) =>
            props?.marketUp
              ? props.theme.colors.marketUp
              : props.theme.colors.marketDown};
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          width: 128px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: ${(props) => props.theme.fontWeight.semiLight};
          font-size: ${(props) => props.theme.typography.text};
          line-height: ${(props) => props.theme.typography.text2};
          color: ${(props) => props.theme.colors.whiteOnly};
        }
        .price {
          font-weight: ${(props) => props.theme.fontWeight.bold};
          font-size: ${(props) => props.theme.typography.title7};
          line-height: ${(props) => props.theme.typography.title8};
          color: ${(props) => props.theme.colors.black};
        }
        .row-left,
        .row-right {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          .ant-progress-text {
            display: none;
          }
          .currency {
            color: ${(props) => props.theme.colors.black};
          }
          .price-value {
            font-weight: ${(props) => props.theme.fontWeight.bold};
            font-size: ${(props) => props.theme.typography.text};
            line-height: ${(props) => props.theme.typography.text1};
            color: ${(props) => props.theme.colors.black};
          }
        }
        .row-right > .price-deposit-btn {
          background: ${(props) => props.theme.colors.blue.gradient};
          font-weight: ${(props) => props.theme.fontWeight.bold};
          font-size: ${(props) => props.theme.typography.text1};
          line-height: ${(props) => props.theme.typography.text2};
          color: ${(props) => props.theme.colors.blue.dark};
          border-radius: 8px;
          border: none;
          width: 140px;
          height: 40px;
        }
      }
    }
    .left {
      min-width: 350px;
      width: 35%;
      .coin-data {
        text-align: left;
        font-weight: ${(props) => props.theme.fontWeight.semiLight};
        font-size: ${(props) => props.theme.typography.subText4};
        line-height: ${(props) => props.theme.typography.subText5};
        color: ${(props) => props.theme.colors.grey.semiDark};
        p {
          margin-bottom: 16px;
        }
      }
      .links-container {
        display: flex;
        flex-wrap: wrap;
        margin: 24px 0;
        gap: 8px;
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          background: ${(props) => props.theme.colors.white};
          border-radius: 8px;
          color: ${(props) => props.theme.colors.black};
          span {
            font-weight: ${(props) => props.theme.fontWeight.semiLight};
            color: ${(props) => props.theme.colors.grey.semiDark};
          }
        }
      }

      .links-container > a {
        background: ${(props) => props.theme.colors.white};
        border-radius: 8px;
        text-decoration: none;
        color: ${(props) => props.theme.colors.grey.semiDark};
        padding: 8px;
      }
      .tags-container {
        display: flex;
        flex-wrap: wrap;
        margin: 24px 0;
        gap: 8px;
        .tag {
          background: ${(props) => props.theme.colors.blue.gradient};
          color: ${(props) => props.theme.colors.blue.dark};
          border-radius: 8px;
          min-width: 89px;
          height: 30px;
          border: none;
          font-weight: ${(props) => props.theme.fontWeight.semiLight};
          font-size: ${(props) => props.theme.typography.subText2};
          line-height: ${(props) => props.theme.typography.subText4};
        }
      }
      .coin-img-container {
        display: flex;
        gap: 20px;
        .coin-name-container {
          display: flex;
          gap: 20px;
        }
        .rating {
          font-weight: ${(props) => props.theme.fontWeight.semiLight};
          font-size: ${(props) => props.theme.typography.subTitle1};
          color: ${(props) => props.theme.colors.rating};
        }
        .coin-name {
          font-weight: ${(props) => props.theme.fontWeight.bold};
          font-size: ${(props) => props.theme.typography.title2};
          color: ${(props) => props.theme.colors.black};
        }
        img {
          height: 96px;
          width: 96px;
        }
      }
    }
    @media (${deviceQuery.tabletL}) {
      .left {
        width: 100%;
      }
      .right {
        width: 100%;
      }
    }
  }

  .chart-container {
    padding: 48px;
    text-align: left;
    background: ${(props) => props.theme.colors.white};
    .chart-title {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.subTitle3};
      line-height: ${(props) => props.theme.typography.subTitle2};
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 25px;
    }
    .charts-filter-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }
    @media (${deviceQuery.tabletL}) {
      .section-container {
        grid-template-columns: 1fr;
      }
    }
  }
  .cet-price-container {
    padding: 50px;
    .cet-title {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 50px;
    }
    .cet-price {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .cet-price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cet-label {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.grey.semiDark};
    }
    .cet-value {
    }
  }
  .coin-intro {
    .label {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.black};
      margin-bottom: 16px;
    }
    .desc {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text1};
      line-height: 150%;
      color: ${(props) => props.theme.colors.grey.semiDark};
      margin-bottom: 24px;
    }
  }
  @media (${deviceQuery.tabletM}) {
    .price-chart {
      display: none;
    }
    .top {
      padding: 0 20px 50px 20px !important;
    }
    .cet-price-container {
      padding: 10px;
    }
    .chart-container {
      padding: 10px;
    }
    .row-right > .price-deposit-btn {
      margin-top: 10px;
    }
  }
`;

export const PriceChangeValue = styled.span`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.typography.text};
  line-height: ${(props) => props.theme.typography.text1};
  color: ${(props) =>
    props?.value > 0
      ? props.theme.colors.marketUp
      : props.theme.colors.marketDown};
`;

export const CoinSearchBar = styled(Input)`
  background: ${(props) => props.theme.colors.white};
  height: 40px;
  width: 280px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  input {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-input-affix-wrapper .ant-input-prefix svg {
    fill: ${(props) => props.theme.colors.black};
  }
`;

export const StyledMenu = styled(Menu)`
  margin-bottom: 20px;
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
    background: ${(props) => props.theme.colors.graphFilter};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .menu-item-default {
    background: ${(props) => props.theme.colors.blue.gradient};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.black};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.blue.dark};
  }
  &.ant-menu-horizontal > .ant-menu-item::after,
  &.ant-menu-horizontal > .ant-menu-submenu::after {
    border-bottom: none !important;
    transition: none !important;
  }
  &.ant-menu-horizontal {
    border-bottom: 0;
  }
  &.active {
    color: ${(props) => props.theme.colors.blue.dark} !important;
  }
`;
export const StyledMarketTable = styled(Table)`
  .ant-table-thead > tr > .ant-table-cell {
    border-radius: 0px !important;
  }
  .ant-table-thead > tr > .ant-table-cell {
    background: ${(props) => props.theme.colors.darkBlack};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-table-thead > tr > .ant-table-cell {
    border-color: ${(props) => props.theme.colors.white};
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

export const TradeButton = styled(Button)`
  outline: none;
  border: none;
  box-shadow: none;
  color: ${(props) => props.theme.colors.blue.dark};
  background-color: transparent;
`;

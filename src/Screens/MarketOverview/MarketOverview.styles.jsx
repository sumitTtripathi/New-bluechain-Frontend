import { Card, Progress, Table } from "antd";
import styled from "styled-components";
import { deviceQuery } from "../../MediaSizes";

export const StyledMarketOverviewContainer = styled.div`
  background-color: ${(props) => props.theme.colors.blue.extraLight};
  padding: 43px;
  .ant-table-tbody > tr {
    &:hover {
      .ant-table-cell.ant-table-cell-row-hover {
        background: ${(props) => props.theme.hovers.hover2};
      }
    }
  }
  .row-container.grid {
    display: flex;
    flex-direction: row;
    gap: 20px;
    > div:first-child {
      width: 40%;
      @media (${deviceQuery.tabletM}) {
        width: 100%;
      }
    }
    > div:last-child {
      width: 60%;
      @media (${deviceQuery.tabletM}) {
        width: 100%;
      }
    }
    ${"" /* gap: 20px; */}
    @media (${deviceQuery.tabletM}) {
      display: flex;
      flex-direction: column;
    }
  }
  .ant-table-content .ant-table-tbody .ant-table-cell {
    background-color: ${(props) => props.theme.colors.cardbg};
    color: ${(props) => props.theme.colors.black};
  }
  .highcharts-container .highcharts-root .highcharts-legend-item text {
    fill: ${(props) => props.theme.colors.grey.semiDark} !important;
  }
  .ant-table-content .ant-table-tbody .ant-table-cell {
    background-color: ${(props) => props.theme.colors.cardbg};
    color: ${(props) => props.theme.colors.black};
  }

  .ant-table-content .ant-table-thead .ant-table-cell {
    // background: ${(props) => props.theme.colors.cardhead};
     background: transparent;
  }
  .back-btn {
    display: flex;
    cursor: pointer;
    max-width: 180px;
    margin-bottom: 46px;
    align-items: center;
    gap: 13px;
    color: ${(props) => props.theme.colors.grey.semiDark};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text2};
    line-height: ${(props) => props.theme.typography.subTitle4};
  }
  .chart-container {
    border-radius: 25px;
    padding: 20px;
    background-color: ${(props) => props.theme.colors.white};
  }
  .highcharts-legend-item > text {
    fill: ${(props) => props.theme.colors.black} !important;
  }
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .title {
    color: ${(props) => props.theme.colors.grey.medium};
    background-color: ${(props) => props.theme.colors.cardbg};
  }
  .ant-select .ant-select-selector {
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }

  .ant-select .ant-select-selector .ant-select-selection-item {
    color: ${(props) => props.theme.colors.black};
  }

  @media (${deviceQuery.tabletM}) {
    .cards-container {
      justify-content: center;
    }
  }
  .row-container {
    margin-top: 50px;
    .title-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  ${
    "" /* .row-container.grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 20px;
  }
  @media (${deviceQuery.laptopL}) {
    .row-container.grid {
      grid-template-columns: 1fr;
      grid-row-gap: 50px;
    }
  } */
  }
  .chart-title-margin {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text2};
    line-height: ${(props) => props.theme.typography.text3};
    color: ${(props) => props.theme.colors.grey.medium};
    text-align: left;
    margin-bottom: 16px;
  }
  .chart-title {
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text2};
    line-height: ${(props) => props.theme.typography.text3};
    color: ${(props) => props.theme.colors.black};
    text-align: left;
  }
  .highcharts-container .highcharts-root .highcharts-legend-item text {
    fill: ${(props) => props.theme.colors.black};
  }

  .highcharts-background {
    fill: ${(props) => props.theme.colors.white};
  }
  .pie-chart {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 25px;
    height: 100%;
    padding: 0 30px 0px 30px;
    position: relative;
    .highcharts-background {
      fill: ${(props) => props.theme.colors.white};
    }
    .highcharts-container {
      margin-top: 32px;
      height: 360px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  }
  .pie-chart
    .highcharts-container
    .highcharts-root
    .highcharts-legend-item
    text {
    fill: ${(props) => props.theme.colors.black};
  }
  .pie-chart.bar {
    .highcharts-legend-item {
      display: none;
    }
    .highcharts-container {
      height: 300px !important;
    }
    padding: 0 30px 0px 30px;
  }
  .price-up-down-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      font-weight: ${(props) => props.theme.fontWeight.semiLight};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text2};
      color: ${(props) => props.theme.colors.grey.semiDark};
      margin-left: 8px;
    }
    .value {
      font-weight: ${(props) => props.theme.fontWeight.bold};
      font-size: ${(props) => props.theme.typography.text};
      line-height: ${(props) => props.theme.typography.text1};
      color: ${(props) => props.theme.colors.black};
    }
  }
  @media (${deviceQuery.mobileL}) {
    padding: 20px !important;
    .pie-chart {
      padding: 0 20px 0px 20px;
    }
    .chart-container {
      padding: 0px;
      padding-top: 10px;
    }
  }
`;

export const CardContainer = styled(Card)`
  &.ant-card {
    background: ${(props) => props.theme.colors.white};
    border-radius: 25px;
    min-width: 350px;
    width: 32% !important;
  }
  @media (${deviceQuery.tabletM}) {
    &.ant-card {
      width: 100% !important;
    }
  }
  &.ant-card > .ant-card-body {
    padding: 0;
  }

  .title {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text2};
    line-height: ${(props) => props.theme.typography.subTitle1};
    color: ${(props) => props.theme.colors.grey.black};
    text-align: left;
    padding: 24px 24px 16px 24px;
  }
`;

export const StyledCardTable = styled(Table)`
  cursor: pointer;
  .ant-table-thead > tr > .ant-table-cell {
    border-radius: 0px !important;
  }
  .ant-table-tbody > tr > .ant-table-cell {
    font-weight: ${(props) => props.theme.fontWeight.bold};
    font-size: ${(props) => props.theme.typography.text1};
    border-color: ${(props) => props.theme.colors.white};
  }
  .ant-table-thead > tr > .ant-table-cell {
    background: ${(props) => props.theme.colors.tableHead};
    font-weight: ${(props) => props.theme.fontWeight.semiLight};
    font-size: ${(props) => props.theme.typography.text};
    line-height: ${(props) => props.theme.typography.text1};
    border-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.grey.semiDark};
  }
  .ant-table-thead > tr > .ant-table-cell:before {
    display: none;
  }
`;

export const StyledProgressBar = styled(Progress)`
  .ant-progress-text {
    display: none;
  }
`;

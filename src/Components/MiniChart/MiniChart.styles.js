import styled from "styled-components";

export const StyledMiniChart = styled.div`
  .highcharts-range-selector-group {
    display: none !important;
  }
  .highcharts-background {
    fill: ${(props) =>
      props.currentTheme === "light" ? "rgba(23, 26, 31, 0)" : "transparent"};
  }
  .highcharts-crosshair.highcharts-crosshair-thin {
    display: none;
  }
  .highcharts-area {
    fill: ${(props) =>
      props.currentTheme === "light" ? "rgba(23, 26, 31, 0)" : "transparent"};
  }
  .highcharts-tracker {
    display: none !important;
  }

  .highcharts-container {
    display: flex;
    align-items: center;
    width: ${(props) => (props.width ? props.width : "75px")} !important;
    margin: auto;
    margin-bottom: -20px;
    margin-left: ${(props) => props.marginLeft};
    height: ${(props) => (props.width ? props.height : "65px")} !important;
  }
`;

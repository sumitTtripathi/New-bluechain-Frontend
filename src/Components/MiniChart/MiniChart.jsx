// import { memo, useMemo } from "react";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts/highstock";
// import { StyledMiniChart } from "./MiniChart.styles";
// import { useTheme } from "styled-components";
// import { useCookies } from "react-cookie";

// const Minichart = ({
//   background,
//   marginLeft,
//   width,
//   height,
//   item,
//   chartData,
// }) => {
//   const [cookies] = useCookies();
//   const theme = useTheme();

//   const options = useMemo(() => {
//     return {
//       credits: {
//         enabled: false,
//       },
//       chart: {
//         type: "area",
//         height: 200,
//         width: 200,
//       },
//       rangeSelector: {
//         enabled: false,
//       },
//       labels: {},

//       xAxis: {
//         visible: false,
//       },
//       yAxis: {
//         visible: false,
//       },
//       tooltip: {
//         enabled: false,
//       },

//       lang: {
//         rangeSelectorZoom: "",
//       },

//       plotOptions: {
//         series: {
//           states: {
//             hover: {
//               enabled: false,
//             },
//           },
//         },
//       },
//       series: [
//         {
//           data: chartData?.map((item) => {
//             return item?.value;
//           }),
//           color: theme.colors.white,
//           lineColor:
//             Number(item) > 0
//               ? theme.colors.marketUp
//               : Number(item) < 0
//               ? theme.colors.marketDown
//               : theme.colors.black,
//           showInLegend: true,
//         },
//       ],
//       legend: {
//         enabled: false,
//       },
//       scrollbar: {
//         enabled: false,
//       },
//       navigator: {
//         enabled: false,
//       },
//     };
//   }, [chartData, item, theme]);

//   return (
//     <>
//       <div>
//         <>
//           {chartData && (
//             <StyledMiniChart
//               background={background}
//               marginLeft={marginLeft}
//               currentTheme={localStorage.getItem("theme")}
//               width={width}
//               height={height}
//             >
//               <div className="highchart">
//                 <HighchartsReact
//                   highcharts={Highcharts}
//                   options={options}
//                   constructorType={"stockChart"}
//                 />
//               </div>
//             </StyledMiniChart>
//           )}
//         </>
//       </div>
//     </>
//   );
// };

// export default memo(Minichart);






import { memo, useMemo } from "react";
import Highcharts from "highcharts/highstock"; // ✅ use highstock bundle instead
import HighchartsReact from "highcharts-react-official";
import { StyledMiniChart } from "./MiniChart.styles";
import { useTheme } from "styled-components";
import { useCookies } from "react-cookie";

const Minichart = ({
  background,
  marginLeft,
  width,
  height,
  item,
  chartData,
}) => {
  const [cookies] = useCookies();
  const theme = useTheme();

  const options = useMemo(() => {
    return {
      credits: { enabled: false },
      chart: { type: "area", height: 200, width: 200 },
      rangeSelector: { enabled: false },
      xAxis: { visible: false },
      yAxis: { visible: false },
      tooltip: { enabled: false },
      lang: { rangeSelectorZoom: "" },
      plotOptions: {
        series: {
          states: {
            hover: { enabled: false },
          },
        },
      },
      series: [
        {
          data: chartData?.map((item) => item?.value),
          color: theme.colors.white,
          lineColor:
            Number(item) > 0
              ? theme.colors.marketUp
              : Number(item) < 0
              ? theme.colors.marketDown
              : theme.colors.black,
          showInLegend: true,
        },
      ],
      legend: { enabled: false },
      scrollbar: { enabled: false },
      navigator: { enabled: false },
    };
  }, [chartData, item, theme]);

  return (
    <>
      <div>
        {chartData && (
          <StyledMiniChart
            background={background}
            marginLeft={marginLeft}
            currentTheme={localStorage.getItem("theme")}
            width={width}
            height={height}
          >
            <div className="highchart">
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
                constructorType={"stockChart"}
              />
            </div>
          </StyledMiniChart>
        )}
      </div>
    </>
  );
};

export default memo(Minichart);





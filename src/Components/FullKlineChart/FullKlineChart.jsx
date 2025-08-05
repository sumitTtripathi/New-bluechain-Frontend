import { init } from "klinecharts";
import React, { useEffect, useState } from "react";

const FullKlineChart = ({
  candleStickMore,
  candleStick,
  setScrollTime,
  isFetching,
  indicators,
}) => {
  const [chartInstance, setChartInstance] = useState("");
  useEffect(() => {
    if (chartInstance) return;
    const chart = init(`kline-chart`);
    chart.setStyles({
      grid: {
        show: false,
      },
    });
    if (!isFetching) {
      chart.subscribeAction("onScroll", () => {
        if (chart.getOffsetRightDistance() <= 0) {
          const chartData = chart?.getDataList();
          setScrollTime(chartData?.[0]?.timestamp);
        }
      });
    }
    setChartInstance(chart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChartInstance, setScrollTime, isFetching]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.createIndicator(indicators);

      if (!candleStick?.updated && candleStick?.data?.length > 0) {
        const newCandleArr = candleStick?.data;
        let candleStickCopy = [...newCandleArr];
        chartInstance.applyNewData(candleStickCopy.reverse());
      } else {
        chartInstance.updateData(candleStick?.data || {});
      }
    }
  }, [candleStick, chartInstance, indicators]);

  useEffect(() => {
    if (chartInstance && candleStickMore?.length > 0) {
      let candleStickCopy = [...candleStickMore];
      chartInstance?.applyMoreData(candleStickCopy.reverse());
    }
  }, [candleStickMore, chartInstance]);
  return (
    <div
      id="kline-chart"
      style={{ width: window?.innerWidth, height: window?.innerHeight }}
    ></div>
  );
};

export default FullKlineChart;

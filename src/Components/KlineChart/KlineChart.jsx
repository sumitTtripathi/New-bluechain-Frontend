import { init } from "klinecharts";
import React, { useEffect, useRef } from "react";
import { KlineContainer } from "./KlineChart.styles";

const KlineChart = ({
  candleStickMore,
  candleStick,
  setScrollTime,
  isFetching,
  indicators,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) {
      const chart = init("kline-chart");
      chart.setStyles({ grid: { show: false } });
      chartRef.current = chart;

      chart.subscribeAction("onScroll", () => {
        if (chart.getOffsetRightDistance() <= 0) {
          const chartData = chart.getDataList();
          setScrollTime(chartData?.[0]?.timestamp);
        }
      });
    }
  }, [setScrollTime]);

  useEffect(() => {
    if (!chartRef.current || !candleStick?.data?.length) return;

    const chart = chartRef.current;

    if (!candleStick.updated) {
      chart.applyNewData([...candleStick.data].reverse());
    } else {
      const lastCandle = candleStick.data[candleStick.data.length - 1];
      chart.updateData(lastCandle);
    }

    if (indicators) {
      chart.createIndicator(indicators);
    }
  }, [candleStick, indicators]);

  useEffect(() => {
    if (!chartRef.current || !candleStickMore?.length) return;
    const chart = chartRef.current;
    chart.applyMoreData([...candleStickMore].reverse());
  }, [candleStickMore]);

  return <KlineContainer id="kline-chart" />;
};

export default KlineChart;

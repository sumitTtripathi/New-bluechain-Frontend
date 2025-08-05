import React, { useState } from "react";
import { useParams } from "react-router";
import Chart from "../Chart/Chart";
import { useGetDepthOrderBookQuery } from "../../Services/Transaction";
import {
  useGetCandleStickMoreQuery,
  useGetCandleStickQuery,
} from "../../Services/Market";

const SpotChart = ({ coinListFilter }) => {
  const { id } = useParams();
  const [scrollTime, setScrollTime] = useState("");
  const [timeZone, setTimezone] = useState("15m");
  const { data: candleStick } = useGetCandleStickQuery({
    symbol: `${String(id)?.toUpperCase()}${coinListFilter}`,
    resolution: timeZone,
    // from: 60 * 60 * 1000,
    // to: 60 * 60 * 2000,
  });
  const { data: candleStickMore, isFetching } = useGetCandleStickMoreQuery(
    {
      symbol: `${String(id)?.toUpperCase()}${coinListFilter}`,
      resolution: timeZone,
      // from: Date.now(),
      to: scrollTime,
      // to: 60 * 60 * 2000,
    },
    { skip: !scrollTime }
  );
  const { data: depthOrderBook } = useGetDepthOrderBookQuery({
    symbol: `${id?.toUpperCase()}${coinListFilter}`,
    limit: 15,
  });

  return (
    <Chart
      timeZone={timeZone}
      setTimezone={setTimezone}
      candleStick={candleStick}
      candleStickMore={candleStickMore}
      isFetching={isFetching}
      depthOrderBook={depthOrderBook}
      setScrollTime={setScrollTime}
    />
  );
};

export default SpotChart;

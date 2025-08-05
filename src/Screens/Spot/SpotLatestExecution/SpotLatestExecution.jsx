import React from "react";
import { useGetLatestExecutionQuery } from "../../../Services/Transaction";
import LatestExecution from "../../../Components/LatestExecution/LatestExecution";

const SpotLatestExecution = ({ id, coinListFilter }) => {
  const limit = 40;
  const { data: latestExecution } = useGetLatestExecutionQuery({
    symbol: `${id?.toUpperCase()}${coinListFilter}`,
    limit: limit,
  });
  return (
    <LatestExecution
      id={id}
      coinListFilter={coinListFilter}
      latestExecution={latestExecution}
    />
  );
};

export default SpotLatestExecution;

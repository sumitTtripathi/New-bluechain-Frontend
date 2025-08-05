import React from "react";
import { useGetLatestExecutionQuery } from "../../../Services/Transaction";
import { tradeType } from "../../../Constants/state";
import LatestExecution from "../../../Components/LatestExecution/LatestExecution";

const SwapLatestExecution = ({ id, coinListFilter }) => {
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

export default SwapLatestExecution;

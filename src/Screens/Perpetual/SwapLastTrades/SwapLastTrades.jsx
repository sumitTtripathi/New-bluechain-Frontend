import LastTrades from "../../../Components/LastTrades/LastTrades";
import { tradeType } from "../../../Constants/state";
import { useGetLatestExecutionQuery } from "../../../Services/Transaction";

const SwapLastTrades = ({ baseAsset, quoteAsset }) => {
  const limit = 40;
  const { data: latestExecution } = useGetLatestExecutionQuery({
    symbol: `${baseAsset?.toUpperCase()}${quoteAsset}`,
    limit: limit,
  });

  return (
    <LastTrades
      baseAsset={baseAsset}
      quoteAsset={quoteAsset}
      latestExecution={latestExecution}
    />
  );
};

export default SwapLastTrades;

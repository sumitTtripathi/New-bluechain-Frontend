import LastTrades from "../../../Components/LastTrades/LastTrades";
import { useGetLatestExecutionQuery } from "../../../Services/Transaction";

const SpotStrategyLastTrades = ({ baseAsset, quoteAsset }) => {
  const limit = 40;
  const { data: latestExecution } = useGetLatestExecutionQuery({
    symbol: `${baseAsset?.toUpperCase()}${quoteAsset}`,
    limit: limit,
  });

  return (
    <LastTrades
      baseAsset={baseAsset}
      quoteAsset={quoteAsset}
      latestExecution={latestExecution?.data}
    />
  );
};

export default SpotStrategyLastTrades;

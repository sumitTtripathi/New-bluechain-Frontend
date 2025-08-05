import LastTrades from "../../../Components/LastTrades/LastTrades";
import { useGetLatestExecutionQuery } from "../../../Services/Transaction";

const SpotLastTrades = ({ baseAsset, quoteAsset }) => {
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

export default SpotLastTrades;

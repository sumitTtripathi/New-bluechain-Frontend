import { useGetLatestExecutionQuery } from "../../../Services/Transaction";
import { StyledLastTradesContainer } from "../Spot.styles";

const LastTrades = ({ baseAsset, quoteAsset }) => {
  const limit = 40;
  const { data: latestExecution } = useGetLatestExecutionQuery({
    symbol: `${baseAsset?.toUpperCase()}${quoteAsset}`,
    limit: limit,
  });

  return (
    <StyledLastTradesContainer>
      <div className="last-trades-container">
        <div className="last-trades-head">
          <span>Price({quoteAsset})</span>
          <span>Amount({baseAsset?.toUpperCase()})</span>
          <span>Total</span>
        </div>
        <div className="last-trades-body">
          {latestExecution?.data?.map((data, i) => {
            return (
              <div className="last-trades-row" key={i}>
                <span className={data?.side === "buy" ? "price-bids" : "price"}>
                  {data?.px}
                </span>
                <span className="value">{data?.sz}</span>
                <span className="value">
                  {Number(Number(data?.px) * Number(data?.sz)).toFixed(4)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </StyledLastTradesContainer>
  );
};

export default LastTrades;

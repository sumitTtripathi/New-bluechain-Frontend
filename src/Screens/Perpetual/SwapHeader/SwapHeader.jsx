import React from "react";
import { useGetHighLowPriceQuery } from "../../../Services/Swap";
import TvBar from "../../../Components/TvBar/TvBar";

const SwapHeader = ({ baseAsset, quoteAsset }) => {
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: `${quoteAsset}`,
    id: baseAsset,
  });

  return (
    <TvBar
      hlCoinPriceData={hlCoinPriceData}
      baseAsset={baseAsset}
      quoteAsset={quoteAsset}
    />
  );
};
export default SwapHeader;

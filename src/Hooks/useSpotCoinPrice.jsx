import { BOT } from "../Enums/Enums";
import { useGetHighLowPriceQuery } from "../Services/Market";

function useSpotCoinPrice(baseAsset, quoteAsset, orderType) {
  const { data: spotCoinData } = useGetHighLowPriceQuery(
    {
      id: baseAsset,
      filter: quoteAsset,
    },
    {
      skip:
        !baseAsset ||
        !quoteAsset ||
        ![BOT.SPOT, BOT.MOON_GRID].includes(orderType),
    }
  );

  return {
    spotCoinData,
  };
}

export default useSpotCoinPrice;

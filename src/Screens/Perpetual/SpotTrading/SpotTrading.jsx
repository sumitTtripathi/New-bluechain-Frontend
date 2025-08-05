import LimitTab from "./LimitTab/LimitTab";
import MarketTab from "./MarketTab/MarketTab";
import { SpotTradingContainer, SpotTradingTabs } from "./SpotTrading.styles";
import AdvancedOrders from "./StopLimit/AdvancedOrders";
import Trigger from "./StopLimit/Trigger";
import TPSL from "./TPSL/TPSL";
import TrailStop from "./TrailStop/trailStop";

const tabItems = (baseAsset, quoteAsset) => {
  return [
    {
      key: "1",
      label: `Limit`,
      children: <LimitTab baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
    {
      key: "2",
      label: `Market`,
      children: <MarketTab baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
    {
      key: "3",
      label: `Advanced-Limit`,
      children: (
        <AdvancedOrders baseAsset={baseAsset} quoteAsset={quoteAsset} />
      ),
    },
    {
      key: "4",
      label: `Trail Stop`,
      children: <TrailStop baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
    {
      key: "5",
      label: `Trigger`,
      children: <Trigger baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
    {
      key: "6",
      label: `TP/SL`,
      children: <TPSL baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
  ];
};
const SpotTrading = ({ baseAsset, quoteAsset }) => {
  return (
    <SpotTradingContainer>
      <SpotTradingTabs
        className="spot-trading"
        items={tabItems(baseAsset, quoteAsset)}
      />
    </SpotTradingContainer>
  );
};

export default SpotTrading;

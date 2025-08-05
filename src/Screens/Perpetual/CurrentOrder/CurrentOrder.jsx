import { memo } from "react";
import { SpotTradingTabs } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import { OrdersContainer } from "../Spot.styles";
import LimitOpenOrder from "./LimitOpenOrder";
import TPSLOpenOrder from "./TPSLOpenOrder";
import AdvancedLimitOpenOrder from "./AdvancedLimitOpenOrder";
import TrailOpenOrder from "./TrailOpenOrder";

const CurrentOrder = ({ baseAsset, quoteAsset }) => {
  const tabItems = () => {
    return [
      { 
        key: "1",
        label: `Limit`,
        children: <LimitOpenOrder type="limit" baseAsset={baseAsset} quoteAsset={quoteAsset}  />,
      },
      {
        key: "2",
        label: `Conditional`,
        children: <TPSLOpenOrder type="conditional" baseAsset={baseAsset} quoteAsset={quoteAsset} />,
      },
      // {
      //   key: "3",
      //   label: `OCO`,
      //   children: <TPSLOpenOrder type="oco" />,
      // },
      // {
      //   key: "4",
      //   label: `Post only`,
      //   children: <AdvancedLimitOpenOrder type="post_only" />,
      // },
      {
        key: "5",
        label: `Trail Stop`,
        children: <TrailOpenOrder type="move_order_stop" baseAsset={baseAsset} quoteAsset={quoteAsset} />,
      },
    ];
  };

  return (
    <OrdersContainer>
      <SpotTradingTabs className="spot-trading" items={tabItems()} />
    </OrdersContainer>
  );
};

export default memo(CurrentOrder);

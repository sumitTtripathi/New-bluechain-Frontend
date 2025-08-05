import { memo } from "react";
import { SpotTradingTabs } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import { OrdersContainer } from "../Spot.styles";
import LimitOpenOrder from "./LimitOpenOrder";
import TPSLOpenOrder from "./TPSLOpenOrder";
import AdvancedLimitOpenOrder from "./AdvancedLimitOpenOrder";
import TrailOpenOrder from "./TrailOpenOrder";

const CurrentOrder = () => {
  const tabItems = () => {
    return [
      {
        key: "1",
        label: `Limit`,
        children: <LimitOpenOrder type="limit" />,
      },
      {
        key: "2",
        label: `Conditional`,
        children: <TPSLOpenOrder type="conditional" />,
      },
      {
        key: "3",
        label: `OCO`,
        children: <TPSLOpenOrder type="oco" />,
      },
      {
        key: "4",
        label: `Post only`,
        children: <AdvancedLimitOpenOrder type="post_only" />,
      },
      {
        key: "5",
        label: `Trail Stop`,
        children: <TrailOpenOrder type="move_order_stop" />,
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

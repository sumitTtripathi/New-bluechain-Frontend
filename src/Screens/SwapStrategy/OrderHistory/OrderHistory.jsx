import { SpotTradingTabs } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import { OrdersContainer } from "../Spot.styles";
import AdvanceLimitHistory from "./AdvanceLimitHistory";
import LimitHistory from "./LimitHistory";
import MarketHistory from "./MarketHistory";

const OrderHistory = () => {
  const tabItems = () => {
    return [
      {
        key: "1",
        label: `Limit`,
        children: <LimitHistory />,
      },
      {
        key: "2",
        label: `Market`,
        children: <MarketHistory />,
      },
      {
        key: "3",
        label: `ICO`,
        children: <AdvanceLimitHistory type="ioc" />,
      },
      {
        key: "4",
        label: `FOK`,
        children: <AdvanceLimitHistory type="fok" />,
      },
      {
        key: "5",
        label: `Post Only`,
        children: <AdvanceLimitHistory type="post_only" />,
      },
      // {
      //   key: "6",
      //   label: `optimal_limit_ioc`,
      //   children: <AdvanceLimitHistory type="optimal_limit_ioc" />,
      // },
    ];
  };

  return (
    <OrdersContainer>
      <SpotTradingTabs className="spot-trading" items={tabItems()} />
    </OrdersContainer>
  );
};

export default OrderHistory;

import { SpotOrdersTabs } from "../Spot.styles";
import BotHistory from "./BotHistory/BotHistory";
import OrderHistory from "./OrderHistory/OrderHistory";

const OPENORDERSANDORDERHISTORYTABS = [
  {
    key: "1",
    label: `Order History`,
    children: <OrderHistory />,
  },
  {
    key: "2",
    label: `Bot History`,
    children: <BotHistory />,
  },
];
const SpotOrders = () => {
  return (
    <SpotOrdersTabs
      items={OPENORDERSANDORDERHISTORYTABS}
      defaultActiveKey="1"
    />
  );
};

export default SpotOrders;

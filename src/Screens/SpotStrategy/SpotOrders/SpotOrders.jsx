import { SpotOrdersTabs } from "../Spot.styles";
import OpenOrders from "./OpenOrders/OpenOrders";
import OrderHistory from "./OrderHistory/OrderHistory";

const OPENORDERSANDORDERHISTORYTABS = [
  {
    key: "1",
    label: `Current Order`,
    children: <OpenOrders />,
  },
  {
    key: "2",
    label: `Order History`,
    children: <OrderHistory />,
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

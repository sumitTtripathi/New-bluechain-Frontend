import { Tabs } from "antd";
import React from "react";
import { useParams } from "react-router";
import SwapOrderBook from "../SwapOrderBook/SwapOrderBook";
import SwapLastTrades from "../SwapLastTrades/SwapLastTrades";
const OrderNLasTrades = ({ coinListFilter, socket }) => {
  const { id } = useParams();
  const ORDERBOOKANDLASTTRADETABS = [
    {
      key: "1",
      label: `Order Book`,
      children: (
        <SwapOrderBook
          socket={socket}
          baseAsset={id}
          quoteAsset={coinListFilter}
        />
      ),
    },
    {
      key: "2",
      label: `Last Trades`,
      children: <SwapLastTrades baseAsset={id} quoteAsset={coinListFilter} />,
    },
  ];
  return (
    <Tabs
      className="orders-tabs"
      defaultActiveKey="1"
      items={ORDERBOOKANDLASTTRADETABS}
    />
  );
};

export default OrderNLasTrades;

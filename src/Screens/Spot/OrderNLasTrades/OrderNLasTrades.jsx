import { Tabs } from "antd";
import React from "react";
import { useParams } from "react-router";
import SpotOrderBook from "../SpotOrderBook/SpotOrderBook";
import SpotLastTrades from "../SpotLastTrades/SpotLastTrades";

const OrderNLasTrades = ({ coinListFilter, socket }) => {
  const { id } = useParams();
  const ORDERBOOKANDLASTTRADETABS = [
    {
      key: "1",
      label: `Order Book`,
      children: (
        <SpotOrderBook
          socket={socket}
          baseAsset={id}
          quoteAsset={coinListFilter}
        />
      ),
    },
    {
      key: "2",
      label: `Last Trades`,
      children: <SpotLastTrades baseAsset={id} quoteAsset={coinListFilter} />,
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

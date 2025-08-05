import { Tabs } from "antd";
import React from "react";
import { useParams } from "react-router";
import SpotStrategyLastTrades from "../SpotStrategyLastTrades/SpotStrategyLastTrades";
import SpotStategyOrderBook from "../SpotStategyOrderBook/SpotStategyOrderBook";

const OrderNLasTrades = ({ coinListFilter }) => {
  const { id } = useParams();
  const ORDERBOOKANDLASTTRADETABS = [
    {
      key: "1",
      label: `Order Book`,
      children: (
        <SpotStategyOrderBook baseAsset={id} quoteAsset={coinListFilter} />
      ),
    },
    {
      key: "2",
      label: `Last Trades`,
      children: (
        <SpotStrategyLastTrades baseAsset={id} quoteAsset={coinListFilter} />
      ),
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

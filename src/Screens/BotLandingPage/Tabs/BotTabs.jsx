import { Tabs } from "antd";
import React from "react";
import MyBot from "../Bots/MyBot";
import DCABot from "../Bots/DCABot";
import GridBot from "../Bots/GridBot";
import ArbitrageBot from "../Bots/ArbitrageBot";
import SlicingBot from "../Bots/SlicingBot";
import { TabHead } from "../BotLandingPage.styles";

const BotTabs = () => {
  const BotTabItems = [
    {
      key: "1",
      label: <TabHead>My bots</TabHead>,
      children: <MyBot />,
    },
    {
      key: "2",
      label: <TabHead>Grid bots</TabHead>,
      children: <GridBot />,
    },
    {
      key: "3",
      label: <TabHead>DCA bots</TabHead>,
      children: <DCABot />,
    },
    {
      key: "4",
      label: <TabHead>Arbitrage bots</TabHead>,
      children: <ArbitrageBot />,
    },
    {
      key: "5",
      label: <TabHead>Slicing bots</TabHead>,
      children: <SlicingBot />,
    },
  ];
  return (
    <Tabs className="orders-tabs" defaultActiveKey="1" items={BotTabItems} />
  );
};

export default BotTabs;

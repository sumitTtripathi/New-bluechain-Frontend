/* eslint-disable */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import HeadButton from "../HeadButton/HeadButton";
import MarketCard from "../MarketCard/MarketCard";
import { Collapse, Pagination, Select, Tabs, theme } from "antd";
import { UserOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useTheme } from "styled-components";
import {
  StyledBotMarketPlace,
  StyledCollapse,
  StyledTab,
} from "./BotMarketPlace.styles";

import HeadDropdowns from "../HeadDropdown/HeadDropdowns";
import { BsCoin } from "react-icons/bs";
import AICard from "../../../../Components/AICard/AICard";
import { Config } from "../../../../Config";
function BotMarketPlace() {
  const theme = useTheme();
  const [cryptoOpen, setCryptoOpen] = useState(false);
  const [runtimeOpen, setRuntimeOpen] = useState(false);
  const [pnlOpen, setPnlOpen] = useState(false);
  const [maxOpen, setMaxOpen] = useState(false);
  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [coinFilter, setCoinFilter] = useState({
    btnfilter: "Favorites",
    dropfilter: "",
  });

  const onChange = (key) => {};

  const allCryptoItems = [
    { key: "1", label: "Test1", value: "TEST1", icon: <BsCoin /> },
    { key: "2", label: "Test2", value: "TEST2", icon: <BsCoin /> },
  ];
  const runtimeItems = [
    { key: "1", label: "Test1", value: "TEST1" },
    { key: "2", label: "Test2", value: "TEST2" },
  ];
  const pnlItems = [
    { key: "1", label: "Test1", value: "TEST1" },
    { key: "2", label: "Test2", value: "TEST2" },
  ];
  const maxItems = [
    { key: "1", label: "Test1", value: "TEST1" },
    { key: "2", label: "Test2", value: "TEST2" },
  ];
  const featuredItems = [
    { key: "1", label: "Test1", value: "TEST1" },
    { key: "2", label: "Test2", value: "TEST2" },
  ];

  const btnData = [
    {
      key: "Favorites",
      label: "Favorites",
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "All",
      label: "All",
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "Future Grid",
      label: "Future Grid",
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "Future DCA(Martingale)",
      label: "Future DCA(Martingale)",
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "Spot DCA(Martingale)",
      label: "Spot DCA(Martingale)",
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "Infinity Grid",
      label: "Infinity Grid",
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "Recurring buy",
      label: "Recurring buy",
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "Smart Portfolio",
      label: "Smart Portfolio",
      // children: `Content of Tab Pane 1`,
    },
  ];

  const data = {
    tradeImg: "",
    category: "Futures DCA(M...",
    categoryOne: "Long",
    categoryTwo: "10.00X",
    count: "235",
    percentage: "+71.56",
    period: "69d 21h",
    title: "BTCUSDT Prep",
    token: "BTC/USDT",
  };
  const text = `
  A customizable crypto bot helps traders to create various automated trading strategies. Compared with traditional manual trading, trading bot can execute orders at a lower risk and costs, and grasp the best trading timings.
`;
  const items = [
    {
      key: "1",
      label: `What’s ${Config.APP_NAME} bot?`,
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header with no arrow icon",
      children: <p>{text}</p>,
    },
  ];

  return (
    <StyledBotMarketPlace>
      <div className="marketplace-container">
        <h2>Trading Bot Marketplace</h2>
        <div className="head-buttons">
          {/* {btnData.map((item) => {
            return <HeadButton key={item.id} btn={item.btn} />;
          })} */}
          <StyledTab defaultActiveKey="1" items={btnData} onChange={onChange} />
        </div>
        <div className="dropdowns">
          <div className="section">
            <Select
              cryptoOpen={cryptoOpen}
              onDropdownVisibleChange={(visible) => setCryptoOpen(visible)}
              placeholder={
                <div className="first-dropdown" style={{ display: "flex" }}>
                  <BsCoin />
                  <span>All Crypto</span>
                </div>
              }
              style={{ minWidth: "200px" }}
              options={items}
              dropdownRender={() => (
                <HeadDropdowns setOpen={setCryptoOpen} menu={allCryptoItems} />
              )}
            />
            <Select
              runtimeOpen={runtimeOpen}
              onDropdownVisibleChange={(visible) => setRuntimeOpen(visible)}
              placeholder={
                <div>
                  <span>Runtime: All</span>
                </div>
              }
              style={{ minWidth: "200px" }}
              options={items}
              dropdownRender={() => (
                <HeadDropdowns setOpen={setRuntimeOpen} menu={runtimeItems} />
              )}
            />

            <Select
              pnlOpen={pnlOpen}
              onDropdownVisibleChange={(visible) => setPnlOpen(visible)}
              placeholder={
                <div>
                  <span>PnL%: All</span>
                </div>
              }
              style={{ minWidth: "200px" }}
              options={items}
              dropdownRender={() => (
                <HeadDropdowns setOpen={setPnlOpen} menu={pnlItems} />
              )}
            />
            <Select
              maxOpen={maxOpen}
              onDropdownVisibleChange={(visible) => setMaxOpen(visible)}
              placeholder={
                <div>
                  <span>Max drawdown: All</span>
                </div>
              }
              style={{ minWidth: "200px" }}
              options={items}
              dropdownRender={() => (
                <HeadDropdowns setOpen={setMaxOpen} menu={maxItems} />
              )}
            />
          </div>
          <div className="section">
            {/* <HeadDropdown item={sortMenu} /> */}
            <Select
              featuredOpen={featuredOpen}
              onDropdownVisibleChange={(visible) => setFeaturedOpen(visible)}
              placeholder={
                <div>
                  <span>
                    Sort by <ArrowDownOutlined /> Featured{" "}
                  </span>
                </div>
              }
              style={{ minWidth: "200px" }}
              options={items}
              dropdownRender={() => (
                <HeadDropdowns setOpen={setFeaturedOpen} menu={featuredItems} />
              )}
            />
          </div>
        </div>
        <div className="market-card">
          {Array.from({ length: 9 }).map((item, i) => {
            return (
              <AICard
                background={theme.colors.white}
                items={item}
                data={data}
                key={i}
                dashboard
              />
            );
          })}
        </div>
        <Pagination
          style={{ alignSelf: "center", marginTop: "60px" }}
          defaultCurrent={6}
          showSizeChanger={false}
          total={500}
        />
      </div>
      <div className="faq-section">
        <h2 className="title">FAQ</h2>
        <StyledCollapse
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        />
      </div>
    </StyledBotMarketPlace>
  );
}

export default BotMarketPlace;

"use client"

import { useState } from "react"
import { Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"
import LimitTab from "./LimitTab/LimitTab"
import MarketTab from "./MarketTab/MarketTab"
import StopTab from "./StopTab/StopTab"
import { SpotTradingContainer, SpotTradingTabs } from "./SpotTrading.styles"

const SpotTrading = ({ baseAsset, quoteAsset }) => {
  const [activeStopType, setActiveStopType] = useState("Stop Limit")

  const stopOrderTypes = ["Stop Limit", "Stop Market", "Trailing Stop"]

  const handleStopTypeChange = (type) => {
    setActiveStopType(type)
  }

  const stopDropdownMenu = (
    <Menu
      style={{
        background: "#1F2229",
        border: "1px solid #3C3C3C",
        borderRadius: "4px",
      }}
    >
      {stopOrderTypes.map((type) => (
        <Menu.Item
          key={type}
          onClick={() => handleStopTypeChange(type)}
          style={{
            color: "#FFFFFF",
            background: activeStopType === type ? "#2B2F36" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{type}</span>
          {activeStopType === type && (
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#0ECB81",
                borderRadius: "50%",
                marginLeft: "8px",
              }}
            />
          )}
        </Menu.Item>
      ))}
    </Menu>
  )

  const tabItems = [
    {
      key: "1",
      label: "Limit",
      children: <LimitTab baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
    {
      key: "2",
      label: "Market",
      children: <MarketTab baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
    // {
    //   key: "3",
    //   label: (
    //     <Dropdown overlay={stopDropdownMenu} trigger={["click"]}>
    //       <span style={{ cursor: "pointer" }}>
    //         {activeStopType} <DownOutlined />
    //       </span>
    //     </Dropdown>
    //   ),
    //   children: <StopTab baseAsset={baseAsset} quoteAsset={quoteAsset} orderType={activeStopType} />,
    // },
  ]

  return (
    <SpotTradingContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "0 4px",
        }}
      >
        <h2
          style={{
            color: "#1890FF",
            fontSize: "18px",
            fontWeight: "500",
            margin: 0,
          }}
        >
          Spot Trading
        </h2>
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid #8C8C8C",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#8C8C8C", fontSize: "14px", fontWeight: "bold" }}>?</span>
        </div>
      </div>
      <SpotTradingTabs className="spot-trading" items={tabItems} defaultActiveKey="1" />
    </SpotTradingContainer>
  )
}

export default SpotTrading

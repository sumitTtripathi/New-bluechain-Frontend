import React from "react";
import { PermissionCardStyle } from "../LandingPage.styles";
const MarginTradingCard = () => {
  return (
    <PermissionCardStyle
      style={{
        background: "url(/Banners/banner3.png)",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="text-container">
        <div className="trading-heading-text">Margin Trading</div>
        <div className="trading-bottom-line">
          <span>Multiply Profits with loans</span>
        </div>
      </div>
      <div>
        <img src={"/Logo/tradingMonitor.svg"} alt="" />
      </div>
    </PermissionCardStyle>
  );
};

export default MarginTradingCard;

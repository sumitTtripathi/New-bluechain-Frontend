import { Button } from "antd";
import React from "react";
import MiniChart from "../../../../Components/MiniChart/MiniChart";
import { StyledMarketCard } from "./MarketCard.styles";

function MarketCard() {
  return (
    <StyledMarketCard>
      <div className="logo-head">
        <img src="./Spot_grid" alt="" />
        <p>BTCUSDT Prep</p>
      </div>
      <div className="head-container">
        <div className="small-head">
          <span>Futures</span>
          <span>Long</span>
          <span>10.00x</span>
        </div>
        <div className="small-head">
          <img src="" alt="" />
          <span>125</span>
        </div>
      </div>

      <div className="main-body">
        <div className="upper-main-body">
          <div className="container">
            <p>+71.56%</p>
            <p>PnL%</p>
            <p>69d21h</p>
            <p>Runtime</p>
          </div>
          <div className="container right">
            <MiniChart />
            <p>19.29%</p>
            <p>Max drawdown</p>
          </div>
        </div>
        <div className="lower-main-body">
          <div className="container">
            <img src="" alt="" />
            <p>BTC/USDT</p>
          </div>
          <div className="container">
            <div className="container last">
              <img src="" alt="" />
              <p>Simson_Joe</p>
            </div>
            <Button>Copy</Button>
          </div>
        </div>
      </div>
    </StyledMarketCard>
  );
}

export default MarketCard;

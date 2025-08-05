import React from "react";
import { useState } from "react";
import { FlexColumn, FlexRow, MyBotContainer } from "../BotLandingPage.styles";
import Card from "./Card";
import DefaultCard from "./DefaultCard";

const ArbitrageBot = () => {
  const [index, setIndex] = useState("");
  const cardDetails = [
    {
      img: "./DcaFuture.svg",
      title: "Smart portfolio",
      key: "Spot_Grid",
    },
    {
      img: "./Bell.svg",
      title: "Dip Sniper",
      key: "Future_Grid",
    },
    {
      img: "./Time.svg",
      title: "Peak Sniper",
      key: "Infinity_Grid",
    },
    {
      img: "./Ring.svg",
      title: "Arbitrage",
      key: "Infinity_Grid",
    },
  ];
  const defaultCardDetails = [
    {
      img: "./Bunch.svg",
      text: "Multi-currency portfolio",
    },
    {
      img: "./Settings.svg",
      text: "Auto-rebalancing",
    },
    {
      img: "./Repeat.svg",
      text: "Smart arbitrage",
    },
  ];
  return (
    <div>
      <MyBotContainer justify="space-between">
        <FlexColumn>
          {index === "" && (
            <>
              <FlexRow>
                <div className="default-card">
                  {defaultCardDetails.map((item) => {
                    return (
                      <DefaultCard
                        key={item.id}
                        img={item.img}
                        text={item.text}
                        longText={item.longText}
                      />
                    );
                  })}
                </div>
              </FlexRow>
              <FlexRow>
                <p>
                  An arbitrage bot buys and sells the same or different assets
                  to profit from changes in the assets price. This strategy
                  exploits the variations in the ...
                </p>
              </FlexRow>
              <FlexRow>Learn more</FlexRow>
            </>
          )}
          {index === "Spot_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Smart Portfolio</p>
                <ul>
                  <li>Hoarding + Earn with bot</li>
                  <li>Multi-currency portfolio, dynamic position</li>
                  <li>
                    Cumulative bot users <span>291,622</span>
                  </li>
                </ul>
              </div>
            </FlexRow>
          )}
          {index === "Future_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Dip Sniper</p>
                <ul>
                  <li>Acquire crypto at discounts</li>
                  <li>Trade at a guaranteed price with 0 fees</li>
                </ul>
              </div>
            </FlexRow>
          )}
          {index === "Infinity_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Peak Sniper</p>
                <ul>
                  <li>Sell crypto at a better-than-market price</li>
                  <li>Trade at a guaranteed price with 0 fees</li>
                </ul>
              </div>
            </FlexRow>
          )}
          {index === "Moon_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Arbitrage</p>
                <ul>
                  <li>Both leg orders grabs arbitrage chance</li>
                  <li>
                    Cumulative bot users <span>291,622</span>
                  </li>
                </ul>
              </div>
            </FlexRow>
          )}
        </FlexColumn>

        <FlexColumn>
          <div className="row-card">
            {cardDetails.map((item) => {
              return (
                <Card
                  key={item.id}
                  img={item.img}
                  title={item.title}
                  index={item.key}
                  setIndex={setIndex}
                />
              );
            })}
          </div>
        </FlexColumn>
      </MyBotContainer>
    </div>
  );
};

export default ArbitrageBot;

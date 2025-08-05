import React from "react";
import { useState } from "react";
import { FlexColumn, FlexRow, MyBotContainer } from "../BotLandingPage.styles";
import Card from "./Card";
import DefaultCard from "./DefaultCard";

const GridBot = () => {
  const [index, setIndex] = useState("");
  const cardDetails = [
    {
      img: "./Spot_grid.svg",
      title: "Spot Grid",
      key: "Spot_Grid",
    },
    {
      img: "./Future_grid.svg",
      title: "Future Grid",
      key: "Future_Grid",
    },
    {
      img: "./Infinity_grid.svg",
      title: "Infinity Grid",
      key: "Infinity_Grid",
    },
    {
      img: "./Moon_grid.svg",
      title: "Moon Grid",
      key: "Moon_Grid",
    },
  ];
  const defaultCardDetails = [
    {
      img: "./Coins.svg",
      text: "Buy low sell high",
    },
    {
      img: "./Graph.svg",
      text: "Volatile markets",
    },
    {
      img: "./Dollar.svg",
      text: "Cyclic arbitrage",
    },
  ];
  return (
    <div>
      <MyBotContainer justify="space-between">
        <FlexColumn>
          {index === "" && (
            <>
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

              {/* </FlexRow> */}
              <FlexRow>
                <p>
                  Grid bot is a simple strategy of buying low and selling high.
                  This strategy seeks to capitalize on normal price volatility
                  in an underlying asset by....
                </p>
              </FlexRow>
              <a href="">Learn more</a>
            </>
          )}
          {index === "Spot_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Spot Grid</p>
                <ul>
                  <li>Buy low sell high in volatile markets</li>
                  <li>Multi Trigger types to grasp the best entry points</li>
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
                <p className="title">Future Grid</p>
                <ul>
                  <li>Multi Trigger types to grasp the best entry points</li>
                  <li>Minimum 50X leverage to use your funds better</li>
                  <li>
                    Cumulative bot users <span>291,622</span>
                  </li>
                </ul>
              </div>
            </FlexRow>
          )}
          {index === "Infinity_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Infinity Grid</p>
                <ul>
                  <li>
                    One investment offers infinite arbitrage opportunities
                  </li>
                  <li>profit harvester in logn-term bul market</li>
                  <li>
                    Cumulative bot users <span>291,622</span>
                  </li>
                </ul>
              </div>
            </FlexRow>
          )}
          {index === "Moon_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Moon Grid</p>
                <ul>
                  <li>Automatic smart backtesting parameters</li>
                  <li>
                    An ultra wide price range without fear of thresholds
                    breaking
                  </li>
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

export default GridBot;

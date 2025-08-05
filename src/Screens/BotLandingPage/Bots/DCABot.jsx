import React from "react";
import { useState } from "react";
import { FlexColumn, FlexRow, MyBotContainer } from "../BotLandingPage.styles";
import Card from "./Card";
import DefaultCard from "./DefaultCard";

const DCABot = () => {
  const [index, setIndex] = useState("");
  const cardDetails = [
    {
      img: "./DcaFuture.svg",
      title: "Futures DCA(Martingale)",
      key: "Spot_Grid",
    },
    {
      img: "./DcaSpot.svg",
      title: "Spot DCA(Martingale)",
      key: "Future_Grid",
    },
    {
      img: "./DcaBuy.svg",
      title: "Recurring buy",
      key: "Infinity_Grid",
    },
  ];
  const defaultCardDetails = [
    {
      img: "./Graph.svg",
      text: "Spread out investments",
    },
    {
      img: "./Pie.svg",
      text: "Dollar-cost averaging",
    },
    {
      img: "./Repeat.svg",
      text: "Profit from reversals",
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
                  DCA, or Dollar Cost Averaging, is a simple trading strategy
                  that helps you build or unwind a position while minimizing
                  market risk. This strategy....
                </p>
              </FlexRow>
              <FlexRow>Learn more</FlexRow>
            </>
          )}
          {index === "Spot_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">Futures DCA (Martingale)</p>
                <ul>
                  <li>
                    Dollar cost averaging helps to profit from rebound markets
                  </li>
                  <li>
                    Trading both directions at the same time , grab every chance
                  </li>
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
                <p className="title">Spot DCA (Martingale)</p>
                <ul>
                  <li>
                    Dollar cost averaging helps to profit from rebound markets
                  </li>
                  <li>Multi trigger types to grasp the best entry points</li>
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
                <p className="title">Recurring buy</p>
                <ul>
                  <li>Multi-currency portfolio with a schedule plan</li>
                  <li>Amortized cost helps long-term investors</li>
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
                  key={item.key}
                  img={item.img}
                  title={item.title}
                  index={item.key}
                  currentIndex={index}
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

export default DCABot;

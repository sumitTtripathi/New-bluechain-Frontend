import React, { useState } from "react";
import { FlexColumn, FlexRow, MyBotContainer } from "../BotLandingPage.styles";
import Card from "./Card";
import DefaultCard from "./DefaultCard";

const SlicingBot = () => {
  const [index, setIndex] = useState("");
  const cardDetails = [
    {
      img: "./Time.svg",
      title: "Spot Grid",
      key: "Spot_Grid",
    },
  ];
  const defaultCardDetails = [
    {
      img: "./Five.svg",
      text: "Split large orders",
    },
    {
      img: "./Settings.svg",
      text: "Reduce Slippage",
    },
    {
      img: "./Batch.svg",
      text: "Best offers",
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
                  A slicing bot helps you lower trading costs by reducing
                  slippage on large orders. The strategy divides larger orders
                  into multiple smaller orders...
                </p>
              </FlexRow>
              <FlexRow>Learn more</FlexRow>
            </>
          )}
          {index === "Spot_Grid" && (
            <FlexRow>
              <div className="rest-container">
                <p className="title">TWAP</p>
                <ul>
                  <li>Slice large order into smaller orders</li>
                  <li>Scheduled order placements, reduce slippage</li>
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

export default SlicingBot;

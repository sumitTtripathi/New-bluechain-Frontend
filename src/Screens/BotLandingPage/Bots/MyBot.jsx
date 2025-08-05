import React from "react";
import {
  FlexColumn,
  FlexRow,
  MyBotContainer,
  OnGoingContainer,
} from "../BotLandingPage.styles";
import ScoreCard from "../cards/ScoreCard";

const MyBot = () => {
  return (
    <MyBotContainer justify="space-between">
      <FlexColumn>
        <ScoreCard score="00.00" scoreTitle="Total Assets (USDT)" />
        <ScoreCard score="00.00" scoreTitle="Total Assets (USDT)" />
      </FlexColumn>
      <FlexColumn width="80%">
        <FlexRow justify="space-between">
          <div className="font-grey">Ongoing bots (0)</div>
          <div className="font-bold">View all</div>
        </FlexRow>
        <OnGoingContainer>
          <div className="font-grey">You don’t have any ongoing bots</div>
        </OnGoingContainer>
      </FlexColumn>
    </MyBotContainer>
  );
};

export default MyBot;

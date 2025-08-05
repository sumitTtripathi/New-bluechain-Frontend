import React from "react";
import { ScoreLayer } from "../BotLandingPage.styles";

const ScoreCard = ({ score, scoreTitle }) => {
  return (
    <ScoreLayer>
      <h2>{score}</h2>
      <p>{scoreTitle}</p>
    </ScoreLayer>
  );
};

export default ScoreCard;

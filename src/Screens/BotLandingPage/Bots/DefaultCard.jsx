import React from "react";
import { FlexRow } from "../BotLandingPage.styles";

function DefaultCard({ img, text }) {
  return (
    <FlexRow>
      <div className="head-container">
        <div className="head-row">
          <img style={{ width: 20, height: 20 }} src={img} alt="" />
          <div className="text-wrap">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </FlexRow>
  );
}

export default DefaultCard;

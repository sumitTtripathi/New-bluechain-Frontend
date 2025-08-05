import { Button } from "antd";
import React from "react";
import { FlexRow } from "../BotLandingPage.styles";

function Card({ img, title, index, currentIndex, setIndex, key }) {
  return (
    <div>
      <FlexRow currentIndex={currentIndex} index={index}>
        <div className="card-container" onClick={() => setIndex(index)}>
          <div className="left-container">
            <img src={img} alt="" />
            {title}
          </div>
          <div>
            <Button>Create</Button>
          </div>
        </div>
      </FlexRow>
    </div>
  );
}

export default Card;

import React from "react";
import { StyledHistoryContainer } from "./HistoryContainer.styles";

function HistoryContainer({ time, profit, action }) {
  return (
    <StyledHistoryContainer>
      <div className="container-first">
        <p className="label">Filled</p>
        <p className="label">{time}</p>
      </div>
      <div className="container-middle">
        <p className="label">Grid profit</p>
        <p>{profit}</p>
      </div>
      <div className="container-last">
        <p className="label">Action</p>
        <p className="label-def cursor">{action}</p>
      </div>
    </StyledHistoryContainer>
  );
}

export default HistoryContainer;

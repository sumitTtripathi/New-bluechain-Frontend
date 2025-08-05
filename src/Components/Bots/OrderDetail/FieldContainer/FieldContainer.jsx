import React from "react";
import { StyledFieldContainer } from "./FieldContainer.styles";

function FieldContainer({ label, value, sell }) {
  return (
    <StyledFieldContainer>
      <label className="label">{label}</label>
      <p className="value">
        {sell && label === "Side" ? (
          <span style={{ color: "#DB5541" }}>Sell</span>
        ) : (
          value
        )}
      </p>
    </StyledFieldContainer>
  );
}

export default FieldContainer;

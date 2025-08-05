import React from "react";
import { LabelValueContainer } from "../AdvancedCalculatorModal.style";

const ValueLabel = ({ label, value }) => {
  return (
    <LabelValueContainer>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </LabelValueContainer>
  );
};

export default ValueLabel;

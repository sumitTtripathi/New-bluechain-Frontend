import React from "react";
import { ContainerMinMax } from "./TPSL.style";

const ValueLabel = ({ value, label }) => {
  return (
    <ContainerMinMax>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </ContainerMinMax>
  );
};

export default ValueLabel;

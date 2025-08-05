import React from "react";

const LabelValue = ({ label, value }) => {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default LabelValue;

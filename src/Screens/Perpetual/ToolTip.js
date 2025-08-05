import React from "react";

const ToolTip = ({ heading, content }) => {
  return (
    <div>
      <div
        style={{ fontWeight: "bold", marginBottom: "10px" }}
        className="toolTip-heading"
      >
        {heading}
      </div>
      <div className="toolTip-content">{content}</div>
    </div>
  );
};

export default ToolTip;

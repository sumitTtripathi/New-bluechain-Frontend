import React from "react";
import lodash from "lodash";
const MaxNCost = ({
  availableText,
  balance,
  sideText,
  sideTextValue,
  asset,
}) => {
  return (
    <>
      <div className="available-container">
        <div>
          <span className="label">{availableText}</span>
          <span className="value">
            ~~ {balance} {asset}
          </span>
        </div>
      </div>
      <div className="available-container">
        <div>
          <span className="label">{sideText}:</span>
          <span className="value">
            ~~ ₮ {!lodash.isNaN(Number(sideTextValue)) ? sideTextValue : ""}
          </span>
        </div>
      </div>
    </>
  );
};

export default MaxNCost;

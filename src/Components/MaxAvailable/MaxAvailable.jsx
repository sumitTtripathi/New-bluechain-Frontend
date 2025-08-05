import React from "react";
import lodash from "lodash";

const MaxAvailable = ({
  sideText,
  balance,
  asset,
  sideTextValue,
  sideAsset,
}) => {
  return (
    <>
      <div className="available-container">
        <div>
          <span className="label">Available</span>
          <span className="value">
            ~~ {balance?.[0]?.free} {asset}
          </span>
        </div>
      </div>
      <div className="available-container">
        <div>
          <span className="label">{sideText}:</span>
          <span className="value">
            ~~ {!lodash.isNaN(Number(sideTextValue)) ? sideTextValue : ""}{" "}
            {sideAsset}
          </span>
        </div>
      </div>
    </>
  );
};

export default MaxAvailable;

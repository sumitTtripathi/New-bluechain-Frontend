import React from "react";

const MaxSell = ({ balance, asset }) => {
  return (
    <>
      <div className="available-container">
        <div>
          <span className="label">Available:</span>
          <span className="value">
            ~~ {balance?.[0]?.availBal} {asset}
          </span>
        </div>
      </div>
    </>
  );
};

export default MaxSell;

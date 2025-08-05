import React from "react";

const MaxSell = ({ balance, asset }) => {
  return (
    <>
      <div className="available-container">
        <div>
          <span className="label">Max Sell</span>
          <span className="value">
            ~~ {balance && balance[0]?.locked} {asset}
          </span>
        </div>
        <img src="/Logo/Icons/exchange.svg" alt="" />
      </div>
      <div className="available-container">
        <div>
          <span className="label">Available:</span>
          <span className="value">
            {balance && balance[0]?.free} {asset}
          </span>
        </div>
      </div>
    </>
  );
};

export default MaxSell;

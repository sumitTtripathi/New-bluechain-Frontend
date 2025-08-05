/* eslint-disable */
// import React, { useState, useEffect } from "react";
// import { useGetMarkPriceQuery } from "../../../Services/Swap";
// import { useGetLeverageQuery } from "../../../Services/Transaction";

const MarginLevelCol = ({ row }) => {
  // const [baseSymbol, quoteSymbol] = String(item).split("-");

  // const { data: leverageData } = useGetLeverageQuery({
  //   instId: row?.instId,
  //   mgnMode: String(leverageMode).toLowerCase(),
  // });
  // const { data: markPrice } = useGetMarkPriceQuery({
  //   instId: row?.instId,
  // });
  // console.log("leverageData is here", leverageData);
  // const [margin, setMargin] = useState(row?.mmr);

  // useEffect(() => {
  //   setMargin(
  //     (Number(row?.availPos) * Number(markPrice?.data?.markPx)) /
  //       Number(leverageData?.[0]?.lever)
  //   );
  // }, [markPrice, leverageData]);
  return (
    <div className="small-text self-bottom">
      <div className="value-info">
        <div className="fixed-width">Margin level</div>
        <div>{Number(row?.mgnRatio).toFixed(2)} %</div>
      </div>
      <div className="value-info">
        <div className="fixed-width">Est.liq. price</div>
        <div>{row?.liqPx ? `₮ ${Number(row?.liqPx).toFixed(2)}` : ""}</div>
      </div>
    </div>
  );
};

export default MarginLevelCol;

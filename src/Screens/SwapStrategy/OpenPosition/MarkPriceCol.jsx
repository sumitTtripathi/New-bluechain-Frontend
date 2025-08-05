/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  useGetContractValueQuery,
  useGetMarkPriceQuery,
} from "../../../Services/Swap";
import { useGetLeverageQuery } from "../../../Services/Transaction";
import lodash from "lodash";
import { useSelector } from "react-redux";

const MarkPriceCol = ({ row, leverageMode }) => {
  const [baseSymbol, quoteSymbol] = String(row?.instId).split("-");
  const { data: ctVal } = useGetContractValueQuery({
    instId: row?.instId,
  });
  const token = useSelector((state) => state.global.token);
  const { data: leverageData } = useGetLeverageQuery(
    {
      instId: row?.instId,
      mgnMode: String(leverageMode).toLowerCase(),
    },
    {
      skip: token ? false : true,
    }
  );
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: row?.instId,
  });
  const [margin, setMargin] = useState(row?.mmr);

  useEffect(() => {
    setMargin(
      (Number(row?.availPos) *
        Number(ctVal?.ctVal) *
        Number(markPrice?.data?.markPx)) /
        Number(leverageData?.leverage || 3)
    );
  }, [markPrice, leverageData, ctVal]);
  return (
    <div className="small-text self-bottom">
      <div className="value-info">
        <div className="fixed-width">Margin</div>
        <div>
          {!lodash.isNaN(Number(margin)) ? Number(margin).toFixed(2) : ""}{" "}
          {baseSymbol}
        </div>
      </div>
      <div className="value-info">
        <div className="fixed-width">Mark price</div>
        <div>₮ {Number(markPrice?.data?.markPx || row?.markPx)}</div>
      </div>
    </div>
  );
};

export default MarkPriceCol;

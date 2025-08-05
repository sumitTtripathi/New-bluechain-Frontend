/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import {
  useGetContractValueQuery,
  useGetMarkPriceQuery,
} from "../../../Services/Swap";
import { useGetLeverageQuery } from "../../../Services/Transaction";
import { useSelector } from "react-redux";

const PNLCol = ({ row, leverageMode }) => {
  const theme = useTheme();
  const [baseSymbol, quoteSymbol] = String(row?.instId).split("-");
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
  const { data: ctVal } = useGetContractValueQuery({
    instId: row?.instId,
  });
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: row?.instId,
  });
  const [pnl, setPnl] = useState(row?.uplLastPx);
  const [margin, setMargin] = useState(row?.mmr);
  const [pnlRatio, setPnlRatio] = useState(row?.uplRatioLastPx);

  useEffect(() => {
    if (row?.posSide === "long") {
      setPnl(
        (Number(markPrice?.data?.markPx) - Number(row?.avgPx)) *
          (Number(row?.availPos) * Number(ctVal?.ctVal))
      );
    } else {
      setPnl(
        (Number(row?.avgPx) - Number(markPrice?.data?.markPx)) *
          (Number(row?.availPos) * Number(ctVal?.ctVal))
      );
    }
    setMargin(
      (Number(row?.availPos) *
        Number(ctVal?.ctVal) *
        Number(markPrice?.data?.markPx)) /
        Number(leverageData?.leverage || 3)
    );
  }, [markPrice, ctVal, leverageData]);

  useEffect(() => {
    setPnlRatio((Number(pnl) / Number(margin)) * 100);
  }, [pnl, margin]);
  return (
    <div className="small-text self-bottom">
      <div className="value-info">
        <div className="fixed-width">PnL</div>
        <div
          style={{
            color:
              Number(pnl) > 0 ? theme.colors.marketUp : theme.colors.marketDown,
          }}
        >
          {Number(pnl).toFixed(2)} {baseSymbol}
        </div>
      </div>
      <div className="value-info">
        <div className="fixed-width">PnL%</div>
        <div
          style={{
            color:
              Number(pnlRatio) > 0
                ? theme.colors.marketUp
                : theme.colors.marketDown,
          }}
        >
          {Number(pnlRatio).toFixed(2)} %
        </div>
      </div>
    </div>
  );
};

export default PNLCol;

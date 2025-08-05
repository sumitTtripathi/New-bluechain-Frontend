import React, { useEffect, useState } from "react";
import coinJson from "../../../Constants/Coin.json";
import {
  useGetContractValueQuery,
  useGetHighLowPriceQuery,
} from "../../../Services/Swap";
import { useSelector } from "react-redux";
import { getAsset } from "../../../Constants/state";
import TPSLAdvanceModal from "./TPSLAdvanceModal";
import { useGetLeverageQuery } from "../../../Services/Transaction";

const AddTPSL = ({ item, row, leverageMode }) => {
  const [baseSymbol, quoteSymbol] = String(item).split("-");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: ctVal } = useGetContractValueQuery({
    instId: item,
  });
  const currency = useSelector((state) => state.global.perpAmountDropdown);
  const { data: coinPairCurrentPrice } = useGetHighLowPriceQuery({
    id: baseSymbol,
    filter: quoteSymbol,
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
  const [amount, setAmount] = useState(row?.availPos);
  const [dynamicSymbol, setDynamicSymbol] = useState("");
  useEffect(() => {
    if (["Crypto", "BTC"]?.includes(currency?.label)) {
      setAmount(ctVal?.ctVal * row?.availPos);
    } else if (currency?.label === "Cont") {
      setAmount(row?.availPos);
    } else {
      setAmount(
        (Number(ctVal?.ctVal) * Number(row?.availPos)) /
          Number(coinPairCurrentPrice?.price)
      );
    }
    setDynamicSymbol(getAsset(currency?.label, baseSymbol, quoteSymbol));
  }, [currency, coinPairCurrentPrice]);

  return (
    <div className="flex-col">
      <div className="symbol-info">
        <div className="symbol-info">
          <img className="table-icon" src={coinJson[baseSymbol]} alt="icon" />{" "}
          <p className="text-element">{`${baseSymbol}-${quoteSymbol} Perpetual`}</p>
        </div>
        <div className="small-text symbol-info">
          <span className="perp">{row?.mgnMode}</span>
          <span className="perp">
            {row?.posSide === "long" ? "Buy" : "Sell"}{" "}
            {Number(row?.lever).toFixed(2)}x
          </span>
        </div>
      </div>
      <div className="small-text">
        <div className="value-info">
          <div className="fixed-width">Size</div>
          <div>
            {amount} {dynamicSymbol}
          </div>
        </div>
        <div className="value-info">
          <div className="fixed-width">Entry price</div>
          <div>₮ {Number(row?.avgPx).toFixed(2)}</div>
        </div>
        <div className="value-info">
          <div className="fixed-width">TP/SL</div>
          <span
            className="small-text close-btn"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add +
          </span>
        </div>
      </div>
      <TPSLAdvanceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={
          <div>
            <div>TP | SL</div>
            <div className="sub-header">
              {baseSymbol}
              {quoteSymbol} Perpetual {leverageMode}{" "}
              {row?.posSide === "long" ? "Buy" : "Sell"}{" "}
              {Number(leverageData?.leverage).toFixed(2)}x
            </div>
          </div>
        }
        lastPrice={coinPairCurrentPrice?.price}
        row={row}
        leverage={leverageData?.leverage || 3}
        quoteAsset={quoteSymbol}
        baseAsset={baseSymbol}
      />
    </div>
  );
};

export default AddTPSL;

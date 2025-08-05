import { Divider } from "antd";
import React, { memo, useMemo } from "react";
import { ColoredValue } from "../OrderDetail.styles";
import { useGetHighLowPriceQuery } from "../../../../Services/Swap";
import ClosePosition from "./ClosePosition";
import coinJson from "../../../../Constants/Coin.json";
import { BOT } from "../../../../Enums/Enums";
import { useTheme } from "styled-components";
const OpenPosition = ({
  baseAsset,
  quoteAsset,
  contractPositionDetails,
  orderDetails,
}) => {
  const theme = useTheme();
  const { data: coinPairCurrentPrice } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const OPEN_POSITIONS = useMemo(() => {
    return [
      {
        label: "Position size",
        value: contractPositionDetails?.pos,
      },
      {
        label: "Entry price",
        value: contractPositionDetails?.avgPx,
      },
      {
        label: "PnL",
        value: contractPositionDetails?.upl,
        color:
          Number(contractPositionDetails?.upl) > 0
            ? theme.colors.marketUp
            : theme.colors.marketDown,
      },
      {
        label: "PnL%",
        value: (
          <span>{`${Number(contractPositionDetails?.uplRatio * 100).toFixed(
            4
          )}%`}</span>
        ),
        color:
          Number(contractPositionDetails?.uplRatio) > 0
            ? theme.colors.marketUp
            : theme.colors.marketDown,
      },
      {
        label: "Margin Ratio",
        value: contractPositionDetails?.mgnRatio,
      },
      {
        label: "Est. liq. price",
        value: contractPositionDetails?.liqPx,
      },
      {
        label: "Mark price",
        value: contractPositionDetails?.markPx,
      },
    ];
  }, [contractPositionDetails, theme]);

  return (
    <div className="details">
      <div className="details-container">
        <p className="heads">Open Positions</p>
        <Divider
          type="horizontal"
          style={{
            height: "2px",
            backgroundColor: "#E6E5E9",
            width: "98%",
            margin: "auto",
            marginBottom: "10px",
          }}
        />
        <div className="holdings">
          <img src={coinJson[baseAsset]} alt={"Icon"} />{" "}
          <p>{contractPositionDetails?.instId}</p>
          <ColoredValue color={"green"}>
            {coinPairCurrentPrice?.price}
          </ColoredValue>
        </div>
        <div className="d-flex">
          <div className="open-positions">
            {OPEN_POSITIONS?.map((item, i) => {
              return (
                <div key={i} className="fields">
                  <label>{item?.label}</label>
                  <ColoredValue color={item?.color}>{item?.value}</ColoredValue>
                </div>
              );
            })}
          </div>
          {[BOT.NO_CLOSE_POSITION].includes(orderDetails?.state) && (
            <ClosePosition
              baseAsset={baseAsset}
              quoteAsset={quoteAsset}
              row={contractPositionDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(OpenPosition);

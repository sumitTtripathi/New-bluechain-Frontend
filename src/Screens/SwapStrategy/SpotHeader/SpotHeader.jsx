import { Popover } from "antd";
import React from "react";
import { AiFillFileText } from "react-icons/ai";
import { useTheme } from "styled-components";
import CoinJson from "../../../Constants/Coin.json";
import AboutCoinPopover from "../AboutCoinPopover/AboutCoinPopover";
import { Helmet } from "react-helmet";
import { formatNumberDecimal } from "../../../Common/Common";
import { convertExponentialToDecimal } from "../../../Utils/common";
import { Config } from "../../../Config";
import CurrencyFormat from "react-currency-format";
import { useGetHighLowPriceQuery } from "../../../Services/Swap";

const SpotHeader = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: `${quoteAsset}`,
    id: baseAsset,
  });

  return (
    <div className="coin-nav">
      <Helmet>
        <title>{`${
          convertExponentialToDecimal(hlCoinPriceData?.price) ||
          config?.APP_NAME
        }-${baseAsset}/${quoteAsset}`}</title>
      </Helmet>
      <div className="coin-details-container">
        <div className="coin-popover-container">
          <div className="logo-container">
            <img className="coin-icon" src={CoinJson[baseAsset]} />
            <span
              style={{ marginLeft: "0px" }}
              className="coin-name"
            >{`${baseAsset}/${quoteAsset} PERP`}</span>
            <span className="price">
              <CurrencyFormat
                value={convertExponentialToDecimal(hlCoinPriceData?.price)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </span>
          </div>
          <div className="price-container">
            <div>
              <p className="label">24H Change</p>
              <p
                className="value"
                style={{
                  color:
                    hlCoinPriceData?.percentChange24hrs > 0
                      ? theme.colors.marketUp
                      : theme.colors.marketDown,
                }}
              >
                {Number(hlCoinPriceData?.percentChange24hrs) > 0 ? "+ " : "- "}
                {hlCoinPriceData?.percentChange24hrs
                  ? Number(
                      Math.abs(hlCoinPriceData?.percentChange24hrs)
                    )?.toFixed(2)
                  : 0}
                %
              </p>
            </div>
            <div>
              <p className="label">24H Highest</p>
              <p className="value">
                {" "}
                {hlCoinPriceData?.high24h ? (
                  <CurrencyFormat
                    value={Number(hlCoinPriceData?.high24h).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                ) : (
                  0
                )}
              </p>
            </div>
            <div>
              <p className="label">24H Lowest</p>
              <p className="value">
                {" "}
                {hlCoinPriceData?.low24h ? (
                  <CurrencyFormat
                    value={Number(hlCoinPriceData?.low24h).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                ) : (
                  0
                )}
              </p>
            </div>
            <div>
              <p className="label">24H Value</p>
              <p className="value">
                {hlCoinPriceData?.vol24h
                  ? formatNumberDecimal(hlCoinPriceData?.vol24h, 2)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
        <Popover
          className="about-coin-popover"
          getPopupContainer={(triggerNode) => triggerNode}
          content={<AboutCoinPopover />}
          placement="bottom"
        >
          <div className="about">
            <AiFillFileText size={20} color={theme.colors.blue.dark} />
            <span>About {`${baseAsset}/${quoteAsset}`}</span>
          </div>
        </Popover>
      </div>
    </div>
  );
};
export default SpotHeader;

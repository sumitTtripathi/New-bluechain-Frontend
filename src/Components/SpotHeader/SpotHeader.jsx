import { Popover } from "antd";
import React, { useState, useEffect } from "react";
import { AiFillFileText } from "react-icons/ai";
import { useTheme } from "styled-components";
import CoinJson from "../../Constants/Coin.json";
import { Helmet } from "react-helmet";
import { formatNumberDecimal } from "../../Common/Common";
import { convertExponentialToDecimal } from "../../Utils/common";
import CurrencyFormat from "react-currency-format";
import AboutCoinPopover from "../AboutCoinPopover/AboutCoinPopover";
// import config from "../../Config";
import { Config } from "../../Config";
import { useGetHighLowPriceQuery } from "../../Services/Market";

const SpotHeader = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const [priceColor, setPriceColor] = useState("rgb(0, 133, 99)");
  const [lastPrice, setLastPrice] = useState(null);

  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });

  useEffect(() => {
    if (!hlCoinPriceData?.price) return;

    const currentPrice = parseFloat(hlCoinPriceData.price);

    if (lastPrice !== null) {
      const newColor =
        currentPrice > lastPrice
          ? "rgb(0, 133, 99)"
          : currentPrice < lastPrice
          ? "rgb(219, 85, 65)"
          : priceColor;
      setPriceColor(newColor);
    }

    setLastPrice(currentPrice);
  }, [hlCoinPriceData?.price]);

  const percentChange = parseFloat(hlCoinPriceData?.percentChange24hrs || "0");
  const changeColor =
    percentChange > 0 ? "rgb(0, 133, 99)" : "rgb(219, 85, 65)";

  return (
    <div className="coin-nav">
      <Helmet>
        <title>{`${convertExponentialToDecimal(hlCoinPriceData?.price) || Config?.APP_NAME}-${baseAsset}/${quoteAsset}`}</title>
      </Helmet>

      <div className="coin-details-container">
        <div className="coin-popover-container">
          <div className="logo-container">
            <img className="coin-icon" src={CoinJson[baseAsset]} />
            <span className="coin-name" style={{ marginLeft: "0px" }}>
              {`${baseAsset}/${quoteAsset}`}
            </span>

            <span className="price">
              <CurrencyFormat
                value={convertExponentialToDecimal(hlCoinPriceData?.price)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <div style={{ color: priceColor, transition: "color 0.3s ease" }}>
                    {value}
                  </div>
                )}
              />
            </span>
          </div>

          <div className="price-container">
            <div>
              <p className="label">24H Change</p>
              <p className="value" style={{ color: changeColor }}>
                {hlCoinPriceData?.price && lastPrice && (
                  <>
                    {/* {`${(hlCoinPriceData.price - lastPrice).toFixed(2)} `} */}
                    {percentChange > 0 ? "+" : ""}
                    {percentChange.toFixed(2)}%
                  </>
                )}
              </p>
            </div>

            <div>
              <p className="label">24H Highest</p>
              <p className="value">
                <CurrencyFormat
                  value={Number(hlCoinPriceData?.high24h || 0).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </p>
            </div>

            <div>
              <p className="label">24H Lowest</p>
              <p className="value">
                <CurrencyFormat
                  value={Number(hlCoinPriceData?.low24h || 0).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              </p>
            </div>

            <div>
              <p className="label">24H Volume ({baseAsset})</p>
              <p className="value">
                {hlCoinPriceData?.vol24h
                  ? formatNumberDecimal(hlCoinPriceData.vol24h, 2)
                  : "0"}
              </p>
            </div>

            <div>
              <p className="label">24H Value ({quoteAsset})</p>
              <p className="value">
                {hlCoinPriceData?.vol24h && hlCoinPriceData?.price
                  ? formatNumberDecimal(
                      hlCoinPriceData.vol24h * hlCoinPriceData.price,
                      2
                    )
                  : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default SpotHeader;

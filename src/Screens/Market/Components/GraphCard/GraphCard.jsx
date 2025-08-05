import { Divider } from "antd";
import { CoinCardContainer } from "../../Market.styles";
import convertToInternationalCurrencySystem from "../../../../Utils/common";
import CurrencyFormat from "react-currency-format";

const GraphCard = ({ up, data, marketCap, title }) => {
  const currentTheme = localStorage.getItem("theme") || "light";

  return (
    <CoinCardContainer currentTheme={currentTheme} up={up} isGraphCard={true}>
      <p className="card-title">{title}</p>
      <Divider className="divider" />
      <div className="card-details">
        <div className="coin-details-container">
          <p className="coin-number">
            {marketCap ? (
              convertToInternationalCurrencySystem(data?.tmc) || 0
            ) : (
              // <CurrencyFormat
              //   value={data}
              //   displayType={"text"}
              //   thousandSeparator={true}
              //   renderText={(value) => <>{value}</>}
              // />
              convertToInternationalCurrencySystem(data) || 0
            )}
          </p>
        </div>
        <div className="desc1">
          {title !== "Total Value" && (
            <div className="percent-container">
              <p className="market-perc-up">
                {(marketCap && data?.percentChange?.toFixed(2)) || 0}%
              </p>
              <img
                src={
                  up ? "/Logo/Icons/graphup.svg" : "/Logo/Icons/graphdown.svg"
                }
                alt={up ? "graph-up" : "graph-down"}
              />
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: "-35px",
          }}
        >
          <img
            style={{width: "100%"}}
            src={up ? "/Logo/Icons/marketUpGraph.svg" : "/Logo/Icons/marketDownGraph.svg"}
            alt={up ? "graph-up" : "graph-down"}
          />
        </div>
      </div>
    </CoinCardContainer>
  );
};

export default GraphCard;

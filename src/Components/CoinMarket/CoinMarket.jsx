import { useState } from "react";
import { StyledMenuFilters } from "../../Screens/Spot/Spot.styles";
import PerpMarket from "./PerpMarket";
import SpotMarket from "./SpotMarket";
import { spotHeader, swapHeader } from "../../Constants/state";
const filterTabItems = [
  { label: "Spot", key: "spot" },
  { label: "Perpetual", key: "swap" },
];

const CoinMarket = ({
  coinListFilter,
  setCoinListFilter,
  tradeType,
  setTradeType,
}) => {
  const [apiFilter, setApiFilter] = useState(
    sessionStorage.getItem("selectedQuote") || "USDT"
  );

  const items = (filterTabItems, setTradeType) => {
    return filterTabItems?.map((item) => {
      return {
        label: (
          <span
            onClick={() => {
              if (
                (tradeType === "swap" && !swapHeader?.includes(item?.key)) ||
                (tradeType === "spot" && !spotHeader?.includes(item?.key))
              ) {
                setApiFilter("USDT");
                sessionStorage.setItem("selectedQuote", "USDT");
              } else {
                setApiFilter(sessionStorage.getItem("selectedQuote"));
              }
              setTradeType(item?.key);
            }}
            className="menu-item"
          >
            {item?.label}
          </span>
        ),
        key: item?.key,
      };
    });
  };
  return (
    <>
      <p className="title">Markets</p>
      {/* <StyledMenuFilters
        mode="horizontal"
        defaultSelectedKeys={tradeType}
        items={items(filterTabItems, setTradeType)}
      /> */}
      {tradeType === "spot" && (
        <SpotMarket
          coinListFilter={coinListFilter}
          setCoinListFilter={setCoinListFilter}
          trade={tradeType}
          apiFilter={apiFilter}
          setApiFilter={setApiFilter}
        />
      )}
      {tradeType === "swap" && (
        <PerpMarket
          coinListFilter={coinListFilter}
          setCoinListFilter={setCoinListFilter}
          trade={tradeType}
          apiFilter={apiFilter}
          setApiFilter={setApiFilter}
        />
      )}
    </>
  );
};

export default CoinMarket;

import {
  CoinPopover,
  OpenOrdersAndHistoryTabs,
  SpotTradingTab,
  StyledSpotContainer,
} from "./Spot.styles";
import { memo, useState } from "react";
import { useScrollTop } from "../../Hooks/useScrollTop";
import SpotTrading from "./SpotTrading/SpotTrading";
import CurrentOrder from "./CurrentOrder/CurrentOrder";
import OrderHistory from "./OrderHistory/OrderHistory";
import { useParams } from "react-router";
import LatestExecution from "./LatestExecution/LatestExecution";
import CoinMarket from "../../Components/CoinMarket/CoinMarket";
import OrderNLasTrades from "./OrderNLasTrades/OrderNLasTrades";
import TradeType from "../../Components/TradeType/TradeType";
import { ROUTES } from "../../Constants/Routes";
import OrderBots from "../../Components/Bots/OrderBots/OrderBots";
import SpotHeader from "../../Components/SpotHeader/SpotHeader";
import SpotChart from "../../Components/SpotChart/SpotChart";

const TABITEMS = (baseAsset, quoteAsset) => {
  return [
    {
      key: "1",
      label: `Spot Trading`,
      children: <SpotTrading baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
  ];
};

const Spot = () => {
  useScrollTop();
  const { id } = useParams();
  const [coinListFilter, setCoinListFilter] = useState(
    sessionStorage.getItem("selectedQuote") || "USDT"
  );
  const [tradeValue, setTradeValue] = useState(
    sessionStorage.getItem("trade") || "spot"
  );
  const OPENORDERSANDORDERHISTORYTABS = (baseAsset, quoteAsset) => {
    return [
      {
        key: "1",
        label: `Open Orders`,
        children: (
          <CurrentOrder baseAsset={baseAsset} quoteAsset={quoteAsset} />
        ),
      },
      {
        key: "2",
        label: `Order History`,
        children: (
          <OrderHistory baseAsset={baseAsset} quoteAsset={quoteAsset} />
        ),
      },
      {
        key: "3",
        label: `Bots`,
        children: <OrderBots />,
      },
    ];
  };

  const filterTrade = [
    { label: "Manual trading", key: `${ROUTES.SPOT}/${id}` },
    // { label: "Trading bots", key: `${ROUTES.STRATEGY}/${id}` },
  ];
  return (
    <>
      <StyledSpotContainer>
        <SpotHeader
          id={id?.toUpperCase()}
          baseAsset={id?.toUpperCase()}
          quoteAsset={coinListFilter}
        />
        <div className="main-container">
          <div className="markets-container">
            {/* <TradeType
              filterTrade={filterTrade}
              keyValue={`${ROUTES.SPOT}/${id}`}
              asset={id}
            /> */}
            <CoinMarket
              coinListFilter={coinListFilter}
              setCoinListFilter={setCoinListFilter}
              tradeType={tradeValue}
              setTradeType={setTradeValue}
            />
            <LatestExecution
              id={id?.toUpperCase()}
              coinListFilter={coinListFilter}
            />
          </div>
          <div className="markets-container">
            <SpotChart coinListFilter={coinListFilter} />
            <div className="question-img-container">
              <CoinPopover
                placement="bottom"
                trigger="click"
                content={
                  "Spot trading is the method of buying and selling assets at the current market rate – called the spot price"
                }
                className="time-popover"
              >
                <img
                  className="question"
                  src="/Logo/Icons/questionMark.svg"
                  alt=""
                />
              </CoinPopover>
              <SpotTradingTab
                defaultActiveKey="1"
                items={TABITEMS(id?.toUpperCase(), coinListFilter)}
              />
            </div>
          </div>

          <div className="markets-container">
            <OrderNLasTrades coinListFilter={coinListFilter} />
          </div>
        </div>
        <OpenOrdersAndHistoryTabs
          className="open-orders"
          items={OPENORDERSANDORDERHISTORYTABS(
            id?.toUpperCase(),
            coinListFilter
          )}
          defaultActiveKey="1"
        />
      </StyledSpotContainer>
    </>
  );
};

export default memo(Spot);

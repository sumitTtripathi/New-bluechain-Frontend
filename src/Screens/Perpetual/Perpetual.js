import {
  CoinPopover,
  OpenOrdersAndHistoryTabs,
  SpotTradingTab,
  StyledSpotContainer,
} from "./Spot.styles";
import { memo, useState } from "react";
import { useScrollTop } from "../../Hooks/useScrollTop";
import CurrentOrder from "./CurrentOrder/CurrentOrder";
import OrderHistory from "./OrderHistory/OrderHistory";
import { useParams } from "react-router";
import CoinMarket from "../../Components/CoinMarket/CoinMarket";
import OrderNLasTrades from "./OrderNLasTrades/OrderNLasTrades";
import PerpetualTrading from "../../Components/PerpetualTrading/PerpetualTrading";
import OpenPosition from "./OpenPosition/OpenPosition";
import AdvancedTradeHeader from "../../Components/AdvancedTradeHeader/AdvancedTradeHeader";
import PositionHistory from "./PositionHistory/PositionHistory";
import { useGetLeverageQuery } from "../../Services/Transaction";
import { TAB_OPTION, tradeType } from "../../Constants/state";
import { useSelector } from "react-redux";
import ToolTip from "./ToolTip";
import { SWAP } from "../../Constants/Messages";
import SwapLatestExecution from "./SwapLatestExecution/SwapLatestExecution";
import TradeType from "../../Components/TradeType/TradeType";
import { ROUTES } from "../../Constants/Routes";
import OrderBots from "../../Components/Bots/OrderBots/OrderBots";
import SwapHeader from "./SwapHeader/SwapHeader";
import SwapChart from "../../Components/SwapChart/SwapChart";
const Perpetual = () => {
  useScrollTop();
  const selectedTab = useSelector((state) => state.global.selectedTab);
  const { id } = useParams();
  const [coinListFilter, setCoinListFilter] = useState(
    sessionStorage.getItem("selectedQuote") || "USDT"
  );
  const [apiFilter, setApiFilter] = useState("USDT");
  const [tradeValue, setTradeValue] = useState(
    sessionStorage.getItem("trade") || "swap"
  );
  const [leverageMode, setLeverageMode] = useState(
    localStorage.getItem("mgnMode") || "Cross"
  );
  const token = useSelector((state) => state.global.token);
  const { data: leverageData } = useGetLeverageQuery(
    {
      symbol: `${id}${coinListFilter}`,
      mgnMode: String(leverageMode).toLowerCase(),
    },
    {
      skip: !token,
    }
  );

  const geDefaultLeverage = (value) => {
    if (value) {
      return value;
    }
    return 3;
  };
  const TABITEMS = (baseAsset, quoteAsset) => {
    return [
      {
        key: "1",
        children: (
          <PerpetualTrading
            leverage={leverageData?.leverage || 3}
            leverageMode={String(leverageMode).toLowerCase()}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
          />
        ),
      },
    ];
  };
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
      // {
      //   key: "3",
      //   label: `Open position`,
      //   children: (
      //     <OpenPosition
      //       baseAsset={baseAsset}
      //       quoteAsset={quoteAsset}
      //       leverageMode={leverageMode}
      //       leverage={leverageData?.leverage || 3}
      //     />
      //   ),
      // },
      // {
      //   key: "4",
      //   label: `Position History`,
      //   children: (
      //     <PositionHistory baseAsset={baseAsset} quoteAsset={quoteAsset} />
      //   ),
      // },
      // {
      //   key: "5",
      //   label: `Bots`,
      //   children: <OrderBots />,
      // },
    ];
  };
  const filterTrade = [
    { label: "Manual trading", key: `${ROUTES.PERPETUAL}/${id}` },
    // { label: "Trading bots", key: `${ROUTES.SWAP_STRATEGY}/${id}` },
  ];
  return (
    <>
      <StyledSpotContainer>
        <SwapHeader
          id={id?.toUpperCase()}
          baseAsset={id?.toUpperCase()}
          quoteAsset={coinListFilter}
        />
        <div className="main-container">
          <div className="markets-container">
            <TradeType
              filterTrade={filterTrade}
              keyValue={`${ROUTES.PERPETUAL}/${id}`}
              asset={id}
            />
            <CoinMarket
              coinListFilter={coinListFilter}
              setCoinListFilter={setCoinListFilter}
              setApiFilter={setApiFilter}
              apiFilter={apiFilter}
              tradeType={tradeValue}
              setTradeType={setTradeValue}
            />
            {/* <SwapLatestExecution
              id={id?.toUpperCase()}
              coinListFilter={coinListFilter}
            /> */}
          </div>
          <div className="markets-container">
            <SwapChart coinListFilter={coinListFilter} />
            <div style={{ marginTop: "50px" }}>
              <AdvancedTradeHeader
                leverage={leverageData?.leverage || 3}
                quoteAsset={coinListFilter}
                baseAsset={id}
                leverageMode={leverageMode}
                setLeverageMode={setLeverageMode}
              />
            </div>
            <div className="question-img-container">
              <CoinPopover
                placement="bottom"
                trigger="click"
                content={
                  <ToolTip
                    heading={TAB_OPTION[selectedTab]}
                    content={SWAP[selectedTab]}
                  />
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

export default memo(Perpetual);

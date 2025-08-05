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
import SpotHeader from "./SpotHeader/SpotHeader";
import CoinMarket from "../../Components/CoinMarket/CoinMarket";
import OrderNLasTrades from "./OrderNLasTrades/OrderNLasTrades";
import OpenPosition from "./OpenPosition/OpenPosition";
import { LeftOutlined } from "@ant-design/icons";
import PositionHistory from "./PositionHistory/PositionHistory";
import { TAB_OPTION, tradeType } from "../../Constants/state";
import { useDispatch, useSelector } from "react-redux";
import ToolTip from "./ToolTip";
import { SWAP } from "../../Constants/Messages";
import SwapLatestExecution from "./SwapLatestExecution/SwapLatestExecution";
import TradeType from "../../Components/TradeType/TradeType";
import { ROUTES } from "../../Constants/Routes";
import SpotGridForm from "../SpotStrategy/Forms/SpotGrid/SpotGridForm";
import FutureGridForm from "../SpotStrategy/Forms/FutureGrid/FutureGridForm";
import MoonGridForm from "../SpotStrategy/Forms/MoonGridForm/MoonGridForm";
import { TradeTypeTabs } from "../SpotStrategy/Spot.styles";
import SelectBot from "../../Components/SelectBot/SelectBot";
import { setBotOptions } from "../../Services/Auth";
import OrderBots from "../../Components/Bots/OrderBots/OrderBots";
import { BOT } from "../../Enums/Enums";
import SwapChart from "../../Components/SwapChart/SwapChart";

export const SELECT_BOT_DATA = {
  spot_grid: {
    title: BOT.grid,
    percent: "21,596.73",
    img: "/Logo/Icons/BotIcons/SpotGrid.svg",
    desc: "Buy low sell high / Trade uptrends / Short, medium and long term",
    url: `${ROUTES.STRATEGY}`,
    formComponent: ({ baseAsset, quoteAsset, aiCardCopyOpen, ref }) => (
      <SpotGridForm
        baseAsset={baseAsset}
        quoteAsset={quoteAsset}
        aiCardCopyOpen={aiCardCopyOpen}
        ref={ref}
      />
    ),
  },
  future_grid: {
    title: BOT.contract_grid,
    percent: "21,596.73",
    img: "/Logo/Icons/BotIcons/FutureGrid.svg",
    desc: "Cyclic arbitrage / Leveraged trading / For both bull and bear markets /  Short and medium terms ",
    url: `${ROUTES.SWAP_STRATEGY}`,
    formComponent: ({ baseAsset, quoteAsset, ref }) => (
      <FutureGridForm baseAsset={baseAsset} quoteAsset={quoteAsset} ref={ref} />
    ),
  },
  moon_grid: {
    title: BOT.moon_grid,
    img: "/Logo/Icons/BotIcons/MoonGrid.svg",
    percent: "21,596.73",
    desc: "One-time investment / Infinite arbitrage / Long bull market",
    url: `${ROUTES.STRATEGY}`,
    formComponent: ({ baseAsset, quoteAsset, ref }) => (
      <MoonGridForm baseAsset={baseAsset} quoteAsset={quoteAsset} ref={ref} />
    ),
  },
};

const SelectTradeItems = (setActiveTab, baseAsset) => {
  return [
    {
      key: "1",
      label: "Select bot",
      children: (
        <>
          {Object.keys(SELECT_BOT_DATA).map((item) => {
            return (
              <>
                <SelectBot
                  item={item}
                  imgPath={SELECT_BOT_DATA[item].img}
                  percentage={SELECT_BOT_DATA[item].percent}
                  tradeType={SELECT_BOT_DATA[item].title}
                  desc={SELECT_BOT_DATA[item].desc}
                  setActiveTab={setActiveTab}
                  url={`${SELECT_BOT_DATA[item].url}/${baseAsset}`}
                />
              </>
            );
          })}
        </>
      ),
    },
  ];
};
const cardData = {
  title: "BTCUSDT Prep",
  tradeImg: "/Logo/Icons/spotGrid.svg",
  count: "125",
  category: "Spot Grid",
  percentage: "71.56",
  type: "PnL",
  period: "1-2 months",
  paxDrawDown: "43.14%",
  token: "BTC",
};
const SwapStrategy = () => {
  useScrollTop();
  const selectedTab = useSelector((state) => state.global.selectedTab);
  const selectedBotOption = useSelector((state) => state.global.botOptions);
  const [activeTab, setActiveTab] = useState("2");

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

  const SelectTradingOption = () => {
    let tradeOption = [];

    tradeOption.push({
      key: "2",
      label: "",
      children: SELECT_BOT_DATA?.[selectedBotOption]?.formComponent({
        baseAsset: id,
        quoteAsset: coinListFilter,
      }),
    });
    return [...tradeOption];
  };

  const SelectedTradeItems = () => {
    const dispatch = useDispatch();
    return [
      {
        key: "1",
        label: (
          <div>
            <LeftOutlined
              onClick={() => {
                dispatch(setBotOptions(null));
                localStorage.removeItem("botOption");
              }}
            />
            <span className="font-blue font-bold">
              {SELECT_BOT_DATA[selectedBotOption]?.title}
            </span>
          </div>
        ),
        children: (
          <TradeTypeTabs
            className="tradeTab"
            defaultActiveKey="1"
            activeKey={activeTab}
            items={SelectTradingOption()}
            onChange={(key) => {
              setActiveTab(key);
              // adjustParamRef?.current?.setAdjustForm(false);
            }}
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
      {
        key: "3",
        label: `Open position`,
        children: <OpenPosition leverageMode={leverageMode} />,
      },
      {
        key: "4",
        label: `Position History`,
        children: (
          <PositionHistory baseAsset={baseAsset} quoteAsset={quoteAsset} />
        ),
      },
      {
        key: "5",
        label: `Bots`,
        children: <OrderBots />,
      },
    ];
  };

  const filterTrade = [
    { label: "Manual trading", key: `${ROUTES.PERPETUAL}/${id}` },
    { label: "Trading bots", key: `${ROUTES.SWAP_STRATEGY}/${id}` },
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
            <TradeType
              filterTrade={filterTrade}
              keyValue={`${ROUTES.SWAP_STRATEGY}/${id}`}
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
            <SwapLatestExecution
              id={id?.toUpperCase()}
              coinListFilter={coinListFilter}
            />
          </div>
          <div className="markets-container">
            <SwapChart coinListFilter={coinListFilter} />
            <div
              style={{ marginTop: "50px" }}
              className="question-img-container"
            >
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
                activeKey={"1"}
                items={
                  selectedBotOption
                    ? SelectedTradeItems()
                    : SelectTradeItems(setActiveTab, id)
                }
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

export default memo(SwapStrategy);

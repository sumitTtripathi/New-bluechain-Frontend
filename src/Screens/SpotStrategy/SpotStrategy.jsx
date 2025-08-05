import {
  CoinPopover,
  OpenOrdersAndHistoryTabs,
  SpotTradingTab,
  StyledSpotContainer,
  TradeTypeTabs,
} from "./Spot.styles";
import { memo, useEffect, useRef, useState } from "react";
import { useScrollTop } from "../../Hooks/useScrollTop";
import CurrentOrder from "./CurrentOrder/CurrentOrder";
import OrderHistory from "./OrderHistory/OrderHistory";
import { useParams } from "react-router";
import LatestExecution from "./LatestExecution/LatestExecution";
import OrderNLasTrades from "./OrderNLasTrades/OrderNLasTrades";
import { ROUTES } from "../../Constants/Routes";
import TradeType from "../../Components/TradeType/TradeType";
import { useDispatch, useSelector } from "react-redux";
import SpotGridForm from "./Forms/SpotGrid/SpotGridForm";
import { LeftOutlined } from "@ant-design/icons";
import { setBotOptions } from "../../Services/Auth";
import CoinMarket from "../../Components/CoinMarket/CoinMarket";
import OrderBots from "../../Components/Bots/OrderBots/OrderBots";
import MoonGridForm from "./Forms/MoonGridForm/MoonGridForm";
import SelectBot from "../../Components/SelectBot/SelectBot";
import FutureGridForm from "./Forms/FutureGrid/FutureGridForm";
import SpotHeader from "../../Components/SpotHeader/SpotHeader";
import { BOT } from "../../Enums/Enums";
import SpotChart from "../../Components/SpotChart/SpotChart";
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
      <MoonGridForm
        baseAsset={baseAsset}
        url={`${ROUTES.STRATEGY}/${baseAsset}`}
        quoteAsset={quoteAsset}
        ref={ref}
      />
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

const SpotStrategy = () => {
  useScrollTop();
  const adjustParamRef = useRef();
  const { id } = useParams();
  const [coinListFilter, setCoinListFilter] = useState("USDT");
  const [aiCardCopyOpen, setAICardCopyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("2");
  const [tradeValue, setTradeValue] = useState(
    sessionStorage.getItem("trade") || "spot"
  );
  const dispatch = useDispatch();
  const selectedBotOption = useSelector((state) => state.global.botOptions);
  useEffect(() => {
    dispatch(setBotOptions(JSON.parse(localStorage.getItem("botOption"))));
  }, [dispatch]);
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

  const SelectTradingOption = () => {
    let tradeOption = [];

    // if (selectedBotOption === "spot_grid") {
    //   tradeOption.push({
    //     key: "1",
    //     label: <span className="font-blue font-bold w-full">AI strategy</span>,
    //     children: (
    //       <div className="flex-row">
    //         <AICard
    //           data={cardData}
    //           aiCardCopyOpen={aiCardCopyOpen}
    //           setAICardCopyOpen={setAICardCopyOpen}
    //           setActiveTab={setActiveTab}
    //         />
    //         <AICard
    //           data={cardData}
    //           aiCardCopyOpen={aiCardCopyOpen}
    //           setAICardCopyOpen={setAICardCopyOpen}
    //         />
    //         <AICard
    //           data={cardData}
    //           aiCardCopyOpen={aiCardCopyOpen}
    //           setAICardCopyOpen={setAICardCopyOpen}
    //         />
    //       </div>
    //     ),
    //   });
    // }
    tradeOption.push({
      key: "2",
      label: "",
      children: SELECT_BOT_DATA?.[selectedBotOption]?.formComponent({
        baseAsset: id,
        quoteAsset: coinListFilter,
        aiCardCopyOpen,
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
              adjustParamRef?.current?.setAdjustForm(false);
            }}
          />
        ),
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
            <TradeType
              filterTrade={filterTrade}
              keyValue={`${ROUTES.STRATEGY}/${id}`}
              asset={id}
            />
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

export default memo(SpotStrategy);

import { Breadcrumb, Button, Divider, Table } from "antd";
import {
  CoinDetailsContainer,
  CoinHeader,
  OrderContainer,
  SummaryContainer,
} from "./OrderDetail.styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import {
  useGetCoinDetailsDataQuery,
  useGetPriceChangeQuery,
} from "../../../Services/Market";
import FadeLoader from "../../FadeLoader/FadeLoader";
import {
  convertExponentialToDecimal,
  capitalizeWord,
} from "../../../Utils/common";
import { Helmet } from "react-helmet";
import coinJson from "../../../Constants/Coin.json";
import moment from "moment";
import { config } from "../../../config";
import LabelValue from "./LabelValue";
import FieldContainer from "./FieldContainer/FieldContainer";
import {
  useContractGridPositionsQuery,
  useGetFilledSubOrderQuery,
  useGetSubOrderQuery,
  useOrderDetailsQuery,
} from "../../../Services/Bot";
import RSIModal from "../Common/RSIModal/RSIModal";
import TpslModal from "../Common/TpslModal/TpslModal";
import StopButtonModal from "./StopButtonModal/StopButtonModal";
import DetailsModal from "./DetailsModal/DetailsModal";
import EventsModal from "./EventsModal/EventsModal";
import { BOT } from "../../../Enums/Enums";
import useSpotCoinPrice from "../../../Hooks/useSpotCoinPrice";
import useSwapCoinPrice from "../../../Hooks/useSwapCoinPrice";
import RunTime from "./Components/RunTime";
import OpenPosition from "./Components/OpenPosition";
import { useTheme } from "styled-components";

const OrderDetail = () => {
  useScrollTop();
  const navigate = useNavigate();
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  // const [selectedRow, setSelectedRow] = useState("")
  const [isTpslModalOpen, setIsTpslModalOpen] = useState(false);
  const [baseAsset, setBaseAsset] = useState("");
  const [quoteAsset, setQuoteAsset] = useState("");

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [stopButtonModal, setStopButtonModal] = useState(false);
  const [selectedDetailsRow, setSelectedDetailsRow] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const theme = useTheme();
  const algoOrderName = location?.state?.selectedAlgoOrder;
  const selectedFilter = location?.state?.selectedFilter;
  const { data: orderDetails } = useOrderDetailsQuery({
    algoOrdType: algoOrderName,
    algoId: id,
  });

  const { data: contractGridPositions } = useContractGridPositionsQuery(
    {
      algoOrdType: algoOrderName,
      algoId: id,
    }
    // {
    //   skip:
    //     (!!orderDetails &&
    //       orderDetails?.result?.data?.[0]?.state === "stopped") ||
    //     !(algoOrderName === "contract-grid"),
    // }
  );
  const contractPositionDetails = contractGridPositions?.result?.data?.[0];

  useEffect(() => {
    if (!location?.state?.instId || !id) {
      navigate("/");
    } else {
      setBaseAsset(orderDetails?.result?.data?.[0]?.instId?.split("-")?.[0]);

      setQuoteAsset(orderDetails?.result?.data?.[0]?.instId?.split("-")?.[1]);
    }
  }, [orderDetails, location, id, navigate]);
  const { data: liveData } = useGetSubOrderQuery(
    {
      algoOrdType: location?.state?.selectedAlgoOrder,
      algoId: id,
      type: "live",
    },
    {
      skip: selectedFilter === "History",
    }
  );

  const { data: getFilledSubOrder } = useGetFilledSubOrderQuery({
    algoOrdType: location?.state?.selectedAlgoOrder,
    algoId: id,
    type: "filled",
  });

  const { data: coinDetails, isLoading: coinDetailsLoading } =
    useGetCoinDetailsDataQuery(baseAsset?.toUpperCase());

  const { data: priceChangeDetails, isLoading: priceChangeDetailsLoading } =
    useGetPriceChangeQuery(baseAsset?.toUpperCase());

  // const [baseAsset, quoteAsset] =
  //   orderDetails?.result?.data?.[0]?.instId?.split("-");
  // const { data: spotCoinData } = useGetHighLowPriceQuery(
  //   {
  //     id: orderDetails?.result?.data?.[0]?.instId?.split("-")?.[0],
  //     filter: orderDetails?.result?.data?.[0]?.instId?.split("-")?.[1],
  //   },
  //   {
  //     skip: !orderDetails,
  //   }
  const { spotCoinData } = useSpotCoinPrice(
    baseAsset,
    quoteAsset,
    location?.state?.selectedAlgoOrder
  );
  const { swapCoinData } = useSwapCoinPrice(
    baseAsset,
    quoteAsset,
    location?.state?.selectedAlgoOrder
  );
 
  const detailsData = orderDetails?.result?.data?.[0];
  //handle scrolling to show sticky navbar

  const items = [
    { label: BOT[orderDetails?.result?.data?.[0]?.algoOrdType], key: -1 }, // remember to pass the key prop
    { label: "Order details", key: null },
  ];

  const data = [
    {
      key: "1",
      label: "Price range",
      value: `${detailsData?.maxPx} - ${detailsData?.minPx} USDT`,
    },
    {
      key: "2",
      label: "Grid quantity",
      value: detailsData?.gridNum,
    },
    {
      key: "3",
      label: "Grid mode",
      value: `${detailsData?.runType === "1" ? "Arithmetic" : "Geometric"}`,
    },
    {
      key: "4",
      label: "Amount per grid",
      value: detailsData?.singleAmt,
    },
    {
      key: "5",
      label: "Estimated PnL% per grid",
      value: (
        <span>
          {`${Number(detailsData?.perMaxProfitRate * 100).toFixed(4)}% -
            ${Number(detailsData?.perMinProfitRate * 100).toFixed(4)}%
            `}
        </span>
      ),
    },
    {
      key: "6",
      label: "Entry price",
      value: detailsData?.runPx,
    },
    // {
    //   key: "7",
    //   label: "Reference period",
    //   value: "3",
    // },
    {
      key: "8",
      label: "Start condition",
      value: (
        <div>
          <span>
            {capitalizeWord(
              detailsData?.triggerParams?.[0]?.triggerStrategy
                ? detailsData?.triggerParams?.[0]?.triggerStrategy
                : "--"
            )}
          </span>
        </div>
      ),
    },
    {
      key: "9",
      label: "Stop condition",
      value: (
        <span>
          {capitalizeWord(
            detailsData?.triggerParams?.[0]?.triggerStrategy
              ? detailsData?.triggerParams?.[0]?.triggerStrategy
              : "--"
          )}
          {/* <LiaEditSolid
            className="cursor"
            onClick={() => setIsStopModalOpen(true)}
          /> */}
        </span>
      ),
    },
    // {
    //   key: "10",
    //   label: "Trailing up",
    //   value: "Yes",
    // },
    // {
    //   key: "11",
    //   label: "Trailing down",
    //   value: "No",
    // },
    {
      key: "12",
      label: "Sell all once bot stops",
      value: detailsData?.stopType === "1" ? "Yes" : "No",
    },
    {
      key: "13",
      label: "TP price",
      value: (
        <div>
          <span>
            {detailsData?.tpTriggerPx ? detailsData?.tpTriggerPx : "--"}
          </span>
          {selectedFilter === "Ongoing" && (
            <img
              src="/tpsl.svg"
              className="cursor"
              onClick={() => setIsTpslModalOpen(true)}
            />
          )}
        </div>
      ),
    },
    {
      key: "14",
      label: "SL price",
      value: (
        <div>
          <span>
            {detailsData?.slTriggerPx ? detailsData?.slTriggerPx : "--"}
          </span>
          {selectedFilter === "Ongoing" && (
            <img
              src="/tpsl.svg"
              className="cursor"
              onClick={() => setIsTpslModalOpen(true)}
            />
          )}
        </div>
      ),
    },
    {
      key: "15",
      label: "Executions",
      value: getFilledSubOrder?.result?.data?.length,
    },
    {
      key: "16",
      label: "Total arbitrage",
      value: detailsData?.arbitrageNum,
    },
    // {
    //   key: "17",
    //   label: "Events history",
    //   value: (
    //     <span
    //       className="cursor"
    //       style={{ color: "#3094EA" }}
    //       onClick={() => {
    //         setIsEventsModalOpen(true);
    //       }}
    //     >
    //       View <RightOutlined style={{ fontSize: "8px" }} />
    //     </span>
    //   ),
    // },
  ];

  const HISTORY_COLUMNS = [
    {
      key: "uTime",
      dataIndex: "uTime",
      title: "Filled",
      render: (item, row) => {
        const openTime = moment.duration(row?.uTime);
        return (
          <div className="small-text self-bottom">
            <span>
              {moment(Number(openTime)).format("MM/DD/YYYY, HH:MM:SS")}
            </span>
          </div>
        );
      },
    },
    {
      key: "gridProfit",
      dataIndex: "gridProfit",
      title: "Grid Profit",
      render: (item, row) => {
        return <>{row?.gridProfit || "--"}</>;
      },
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: (item, row) => {
        return (
          <>
            <span
              style={{
                color: "blue",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsDetailsModalOpen(true);
                setSelectedDetailsRow(row);
              }}
            >
              Details
            </span>
          </>
        );
      },
    },
  ];

  // const historyData = [
  //   {
  //     key: "1",
  //     time: "07/12/2023, 06:49:02",
  //     profit: "--",
  //     action: <span onClick={() => setIsDetailsModalOpen(true)}>Details</span>,
  //   },
  // ];

  const columns = useMemo(() => {
    return [
      {
        title: "No.",
        dataIndex: "no",
        key: "no",
        render: (_, row, index) => {
          return <span className="marketUp">Buy {index + 1}</span>;
        },
      },
      {
        title: "Order price",
        dataIndex: "px",
        key: "px",
      },
      {
        title: "Filled after rise",
        dataIndex: "rise",
        key: "rise",
        render: (_, row) => {
          const coinValue = [BOT.SPOT, BOT.MOON_GRID].includes(
            location?.state?.selectedAlgoOrder
          )
            ? spotCoinData?.price
            : swapCoinData?.price;
          return (
            <div>
              {row?.px - coinValue > 0 ? "+" : ""}
              {Number(
                ((row?.px - coinValue) / parseFloat(coinValue)) * 100
              ).toFixed(2)}
              %
            </div>
          );
        },
      },
    ];
  }, [liveData, spotCoinData, swapCoinData]);

  const sellColumns = useMemo(() => {
    return [
      {
        title: "Filled after fall",
        dataIndex: "fall",
        key: "fall",
        render: (_, row) => {
          const coinValue = [BOT.SPOT, BOT.MOON_GRID].includes(
            location?.state?.selectedAlgoOrder
          )
            ? spotCoinData?.price
            : swapCoinData?.price;
          return (
            <div>
              {row?.px - coinValue > 0 ? "+" : ""}
              {Number(
                ((row?.px - coinValue) / parseFloat(coinValue)) * 100
              ).toFixed(2)}
              %
            </div>
          );
        },
      },
      {
        title: "Order Price",
        dataIndex: "px",
        key: "px",
      },
      {
        title: "No.",
        dataIndex: "no",
        key: "noloss",
        render: (_, row, index) => {
          return <span className="marketDown">Sell {index + 1}</span>;
        },
      },
    ];
  }, [liveData, spotCoinData, swapCoinData]);

  const calculateBuySellPercentage = () => {
    let buy =
      (Number(liveData?.buyCount) /
        (Number(liveData?.buyCount) + Number(liveData?.sellCount))) *
      100;
    let sell =
      (Number(liveData?.sellCount) /
        (Number(liveData?.sellCount) + Number(liveData?.buyCount))) *
      100;

    return {
      buy,
      sell,
    };
  };

  return (
    <CoinDetailsContainer
      marketUp={
        priceChangeDetails?.data?.["percentChange24hrs"]?.toFixed(2) > 0
      }
    >
      <Helmet>
        <title>{`${
          convertExponentialToDecimal(
            [BOT.SPOT, BOT.MOON_GRID].includes(
              location?.state?.selectedAlgoOrder
            )
              ? spotCoinData?.price
              : swapCoinData?.price
          ) || config?.APP_NAME
        }-${baseAsset}/${quoteAsset}`}</title>
      </Helmet>
      {(coinDetailsLoading || priceChangeDetailsLoading) && <FadeLoader />}
      <div className="top">
        <div className="mini-nav">
          <div className="breadcrumbs">
            <Breadcrumb separator=">">
              {items?.map((item, i) => {
                return (
                  <Breadcrumb.Item key={i}>
                    <span
                      onClick={() => {
                        if (item?.key) navigate(item?.key);
                      }}
                    >
                      {item.label}
                    </span>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
        </div>
        <CoinHeader>
          <img src={coinJson[baseAsset] || "/BTC.svg"} alt="coin" />
          <div className="icon-head">
            <img src="/Logo/Icons/spotGrid.svg" alt="icon" />{" "}
            <span>{`${baseAsset}/${quoteAsset}`}</span>
          </div>
        </CoinHeader>
        <div className="coin-details-container">
          <RunTime
            orderDetails={orderDetails}
            setStopButtonModal={setStopButtonModal}
            selectedAlgoOrder={location?.state?.selectedAlgoOrder}
          />
          {orderDetails?.result?.data?.[0]?.state !== "no_close_position" &&
            (orderDetails?.result?.data?.[0]?.state !== "stopped" ? (
              <Button
                className="stop-btn"
                onClick={() => setStopButtonModal(true)}
              >
                {orderDetails?.result?.data?.[0]?.state === "running"
                  ? "Stop"
                  : "Cancel"}
              </Button>
            ) : (
              <Button
                disabled
                style={{
                  color: theme.colors.grey.semiDark,
                }}
              >
                {orderDetails?.result?.data?.[0]?.state === "stopping"
                  ? "Stopped (Trigger Indicator)"
                  : "Stopped manually"}
              </Button>
            ))}
        </div>
        <SummaryContainer>
          <div className="w-full">
            <div className="flex">
              <LabelValue value={detailsData?.totalPnl} label={"Total PnL"} />
                <LabelValue
                value={`${Number(detailsData?.pnlRatio) * 100}%`}
                label={"PnL %"}
              />
            </div>
            <div className="flex">
              <LabelValue
                value={detailsData?.gridProfit}
                label={"Grid Profit"}
              />
              <LabelValue
                value={detailsData?.totalPnl}
                label={"Floating PnL"}
              />
              <LabelValue
                value={detailsData?.investment}
                label={"Investment amount"}
              />
              <LabelValue
                value={`${
                  detailsData?.rebateTrans?.[0]?.rebate
                    ? detailsData?.rebateTrans?.[0]?.rebate
                    : "--"
                } ${
                  detailsData?.rebateTrans?.[0]?.rebateCcy
                    ? detailsData?.rebateTrans?.[0]?.rebateCcy
                    : "--"
                } | ${
                  detailsData?.rebateTrans?.[1]?.rebate
                    ? detailsData?.rebateTrans?.[1]?.rebate
                    : "--"
                } ${
                  detailsData?.rebateTrans?.[1]?.rebateCcy
                    ? detailsData?.rebateTrans?.[1]?.rebateCcy
                    : "--"
                }`}
                label={"Fee rebate"}
              />
            </div>
          </div>
        </SummaryContainer>
      </div>
      {algoOrderName === "contract_grid" &&
        ![BOT.STOPPED, BOT.STOPPING].includes(
          orderDetails?.result?.data?.[0]?.state
        ) && (
          <OpenPosition
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            contractPositionDetails={contractPositionDetails}
            orderDetails={orderDetails?.result?.data?.[0]}
          />
        )}

      <div className="details">
        <div className="details-container">
          <p className="heads">Details</p>
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
            <p>
              Current holdings
              <span>{` ${detailsData?.curBaseSz}  ${baseAsset}`}</span>{" "}
              <span>{`${detailsData?.curQuoteSz}  ${quoteAsset}`}</span>{" "}
            </p>
            <p>
              Initial holdings{" "}
              <span> {` ${detailsData?.baseSz}  ${baseAsset}`}</span>{" "}
              <span>{` ${detailsData?.quoteSz}  ${quoteAsset}`}</span>{" "}
            </p>
          </div>
          <div className="ranges">
            {data?.map((item, i) => {
              return (
                <FieldContainer label={item.label} value={item.value} key={i} />
              );
            })}
          </div>
        </div>
      </div>
      {![BOT.STOPPED, BOT.NO_CLOSE_POSITION, BOT.STOPPING].includes(
        orderDetails?.result?.data?.[0]?.state
      ) && (
        <div className="grid">
          <div className="grid-container">
            <p className="heads">Grid order</p>
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
            <div className="space-between">
              <p>
                <span className="text-grey">Last Price</span>{" "}
                <span className="bold">
                  {[BOT.SPOT, BOT.MOON_GRID].includes(
                    location?.state?.selectedAlgoOrder
                  )
                    ? spotCoinData?.price
                    : swapCoinData?.price}
                </span>
              </p>
              <p>
                <span className="text-grey">Amount per grid</span>{" "}
                <span className="bold">
                  {orderDetails?.result?.data?.[0]?.singleAmt}
                </span>
              </p>
            </div>
            <OrderContainer calculations={calculateBuySellPercentage()}>
              <div>Buy order {liveData?.buyCount}</div>
              <div>Sell order {liveData?.sellCount}</div>
            </OrderContainer>
            <div className="grid-table">
              <Table
                dataSource={liveData?.buy || []}
                columns={columns}
                pagination={false}
                scroll={{ x: 800 }}
              />
              <Table
                dataSource={liveData?.sell || []}
                columns={sellColumns}
                pagination={false}
                scroll={{ x: 800 }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="history">
        <div className="history-container">
          <p className="heads">History</p>
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
          <div className="history-data">
            <Table
              dataSource={getFilledSubOrder?.result?.data || []}
              columns={HISTORY_COLUMNS}
              pagination={false}
              scroll={{ x: 800 }}
            />
          </div>
        </div>
        <RSIModal
          isStopModalOpen={isStopModalOpen}
          setIsStopModalOpen={setIsStopModalOpen}
        />
        <TpslModal
          isTpslModalOpen={isTpslModalOpen}
          setIsTpslModalOpen={setIsTpslModalOpen}
          row={orderDetails?.result?.data?.[0]}
        />

        <EventsModal
          isEventsModalOpen={isEventsModalOpen}
          setIsEventsModalOpen={setIsEventsModalOpen}
        />
        <StopButtonModal
          stopButtonModal={stopButtonModal}
          row={orderDetails?.result?.data?.[0]}
          setStopButtonModal={setStopButtonModal}
          selectedAlgoOrder={location?.state?.selectedAlgoOrder}
          isNoClose={[BOT.NO_CLOSE_POSITION, BOT.STOPPING].includes(
            orderDetails?.result?.data?.[0]?.state
          )}
        />
        <DetailsModal
          isDetailsModalOpen={isDetailsModalOpen}
          setIsDetailsModalOpen={setIsDetailsModalOpen}
          row={selectedDetailsRow}
          baseAsset={baseAsset}
          quoteAsset={quoteAsset}
        />
      </div>
    </CoinDetailsContainer>
  );
};

export default OrderDetail;

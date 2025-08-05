import { Button, Card, Pagination, Select, Table, DatePicker } from "antd";
import moment from "moment";
import { useGetAllCoinsSpotQuery } from "../../../../Services/Market";
import { useEffect, useMemo, useRef, useState } from "react";
import ExcelExport from "../../../../Components/ExcelExport/ExcelExport";
import { CopyOutlined } from "@ant-design/icons";
import { useBotOrderHistoryQuery } from "../../../../Services/Bot";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../Constants/Routes";
import { BOT } from "../../../../Enums/Enums";
import { capitalizeWord } from "../../../../Utils/common";
import { HistoryContainer } from "../../Spot.styles";

const { RangePicker } = DatePicker;
const columns = [
  {
    title: "Trading Pair",
    dataIndex: "instId",
    key: "symbol",
  },
  {
    title: "Time",
    dataIndex: "cTime",
    key: "time",
    render: (item) => {
      const duration = moment.duration(item);
      return (
        <span>{moment(Number(duration)).format("YYYY-MM-DD HH:MM:SS")}</span>
      );
    },
  },

  {
    title: "Side",
    dataIndex: "side",
    key: "side",
  },
  {
    title: "Price",
    dataIndex: "avgPx",
    key: "price",
    render: (item, row) => {
      return <span>{row?.avgPx || row?.px}</span>;
    },
  },
  {
    title: "Quantity",
    dataIndex: "sz",
    key: "Quantity",
  },
  {
    title: "Type",
    dataIndex: "ordType",
    key: "type",
  },

  {
    title: "State",
    dataIndex: "state",
    key: "status",
  },
];
const excelColumns = [
  "S.no",
  "Symbol",
  "Order time",
  "Start condition",
  "Stopped",
  "Stop condition",
  "Price range",
  "Grid quantity",
  "Investment",
  "Total PnL",
  "PnL%",
  "Arbitrages",
  "Status",
];
const DEFAULT_ALL = { value: "ALL", label: "ALL" };
const BUTTON_DATA = [
  {
    label: "Spot grid",
    value: "grid",
  },
  {
    label: "Futures grid",
    value: "contract_grid",
  },
  {
    label: "Moon grid",
    value: "moon_grid",
  },
];
const BotHistory = () => {
  const [market, setMarket] = useState(DEFAULT_ALL);
  const [selectedAlgoOrder, setSelectedAlgoOrder] = useState({
    label: "Spot grid",
    value: "grid",
  });
  const [skipStatus, setSkipStatus] = useState(true);
  const [excelData, setExcelData] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [time, setTime] = useState("ALL");
  const [date, setDate] = useState();
  const [side, setSide] = useState({ value: "", label: "ALL" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [marketOption, setMarketOption] = useState([]);
  const { data: coinList } = useGetAllCoinsSpotQuery({ filter: "USDT" });
  const [isStartBotModal, setIsStartBotModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editRef = useRef();
  const { data: botFilterOrders, isFetching: botFilterOrdersLoading } =
    useBotOrderHistoryQuery({
      algoOrdType:
        selectedAlgoOrder?.value === "ALL" ? "" : selectedAlgoOrder?.value,
      instId: market?.value === "ALL" ? "" : market?.value,
      start,
      end,
      page,
      limit,
    });
  const navigate = useNavigate();

  const SPOT_GRID_COLUMNS = useMemo(() => {
    return [
      {
        title: "Symbol",
        width: 80,
        dataIndex: "instId",
        key: "symbol",
        fixed: "left",
      },
      {
        title: "Order time",
        width: 100,
        dataIndex: "orderTime",
        key: "orderTime",
        render: (item, row) => {
          const openTime = moment.duration(row?.cTime);
          return (
            <div className="small-text self-bottom">
              <div>{moment(Number(openTime)).format("MM/DD/YYYY")}</div>
              <div>{moment(Number(openTime)).format("HH:MM:SS")}</div>
            </div>
          );
        },
      },
      {
        title: "Start condition",
        width: 100,
        dataIndex: "startCondition",
        key: "startCondition",
        render: (item, row) => {
          return (
            <>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span>
                  {capitalizeWord(row?.triggerParams?.[0]?.triggerStrategy)}
                </span>
              </div>
            </>
          );
        },
      },
      {
        title: "Stopped",
        width: 100,
        dataIndex: "Stopped",
        key: "Stopped",
        render: (item, row) => {
          const openTime = moment.duration(row?.uTime);
          return (
            <div className="small-text self-bottom">
              <div>{moment(Number(openTime)).format("MM/DD/YYYY")}</div>
              <div>{moment(Number(openTime)).format("HH:MM:SS")}</div>
            </div>
          );
        },
      },
      {
        title: "Stop condition",
        width: 100,
        dataIndex: "stopType",
        key: "stopCondition",
        render: (item, row) => (
          <>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span>
                {capitalizeWord(row?.triggerParams?.[1]?.triggerStrategy)}
              </span>
            </div>
          </>
        ),
      },
      {
        title: "Price range",
        width: 100,
        dataIndex: `priceRange`,
        key: "priceRange",
        render: (item, row) => {
          return <>{`${row.maxPx} - ${row.minPx}`}</>;
        },
      },
      {
        title: "Grid quantity",
        width: 100,
        dataIndex: "gridNum",
        key: "gridQuantity",
      },

      {
        title: "Investment",
        width: 100,
        dataIndex: "investment",
        key: "investment",
      },
      {
        title: "Total PnL",
        width: 100,
        dataIndex: "totalPnl",
        key: "totalPnl",
      },
      {
        title: "PnL%",
        width: 100,
        dataIndex: "pnlRatio",
        key: "pnl",
      },
      {
        title: "Arbitrages",
        width: 100,
        dataIndex: "arbitrageNum",
        key: "arbitrages",
      },

      {
        title: "Status",
        width: 120,
        dataIndex: "status",
        key: "status",
        render: (item, row) => {
          return (
            <>
              <span>{BOT[row?.state]}</span>
            </>
          );
        },
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (item, row) => (
          <>
            <div className="right-active-btn">
              <Button
                className="cursor"
                onClick={() => {
                  navigate(`${ROUTES.ORDER_DETAIL}/${row?.algoId}`, {
                    state: {
                      selectedAlgoOrder: selectedAlgoOrder?.value,
                      instId: row?.instId,
                    },
                  });
                }}
              >
                <CopyOutlined />
              </Button>
            </div>
          </>
        ),
      },
    ];
  }, [isModalOpen, selectedAlgoOrder, botFilterOrders]);
  const FUTURE_GRID = useMemo(() => {
    return [
      {
        title: "Symbol",
        width: 120,
        dataIndex: "instId",
        key: "symbol",
        fixed: "left",
        render: (item, row) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <p>{row?.instId}</p>
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <span>long</span>
                <span>5.00X</span>
              </div>
            </div>
          );
        },
      },
      {
        title: "Order time",
        width: 100,
        dataIndex: "orderTime",
        key: "orderTime",
        render: (item, row) => {
          const openTime = moment.duration(row?.cTime);
          return (
            <div className="small-text self-bottom">
              <div>{moment(Number(openTime)).format("MM/DD/YYYY")}</div>
              <div>{moment(Number(openTime)).format("HH:MM:SS")}</div>
            </div>
          );
        },
      },
      {
        title: "Start condition",
        width: 100,
        dataIndex: "startCondition",
        key: "startCondition",
        render: (item, row) => {
          return (
            <>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span>
                  {capitalizeWord(row?.triggerParams?.[0]?.triggerStrategy) ===
                  "Price"
                    ? `${capitalizeWord(
                        row?.triggerParams?.[0]?.triggerStrategy
                      )} | ${row?.triggerParams?.[0]?.triggerPx}`
                    : capitalizeWord(row?.triggerParams?.[0]?.triggerStrategy)}
                </span>
              </div>
            </>
          );
        },
      },
      {
        title: "Stop condition",
        width: 100,
        dataIndex: "stopType",
        key: "stopCondition",
        render: (item, row) => (
          <>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span>
                {capitalizeWord(row?.triggerParams?.[1]?.triggerStrategy) ===
                "Price"
                  ? `${capitalizeWord(
                      row?.triggerParams?.[1]?.triggerStrategy
                    )} | ${row?.triggerParams?.[1]?.triggerPx}`
                  : capitalizeWord(row?.triggerParams?.[1]?.triggerStrategy)}
              </span>
            </div>
          </>
        ),
      },
      {
        title: "Price range",
        width: 100,
        dataIndex: `priceRange`,
        key: "priceRange",
        render: (item, row) => {
          return <>{`${row.maxPx} - ${row.minPx}`}</>;
        },
      },
      {
        title: "Grid quantity",
        width: 100,
        dataIndex: "gridNum",
        key: "gridQuantity",
      },

      {
        title: "Initial Investment",
        width: 100,
        dataIndex: "investment",
        key: "investment",
      },
      {
        title: "PnL(ROI)",
        width: 100,
        dataIndex: "totalPnl",
        key: "totalPnl",
      },
      {
        title: "Grid profits",
        width: 100,
        dataIndex: "gridProfit",
        key: "gridProfit",
        render: (item, row) => {
          return (
            <>
              <span>{row?.gridProfit ? row?.gridProfit : "--"}</span>
            </>
          );
        },
      },
      {
        title: "Floating PnL",
        width: 100,
        dataIndex: "floatingPnL",
        key: "floatingPnL",
      },
      {
        title: "Est. Liquidation Price",
        width: 100,
        dataIndex: "liqPx",
        key: "liqPx",
        render: (item, row) => {
          return (
            <>
              <span>{item || "--"}</span>
            </>
          );
        },
      },

      {
        title: "Arbitrages",
        width: 100,
        dataIndex: "arbitrageNum",
        key: "arbitrages",
        render: (item, row) => {
          return (
            <>
              <span>{row?.arbitrageNum ? row?.arbitrageNum : "--"}</span>
            </>
          );
        },
      },

      {
        title: "TP | SL",
        width: 100,
        dataIndex: "tpsl",
        key: "tpsl",
        render: (item, row) => (
          <>
            {row?.tpTriggerPx ? (
              <span>{`${row?.tpTriggerPx} | ${row?.slTriggerPx}`}</span>
            ) : (
              <span> --|-- </span>
            )}
          </>
        ),
      },

      {
        title: "Status",
        width: 120,
        dataIndex: "status",
        key: "status",
        render: (item, row) => {
          return (
            <>
              <span>{BOT[row?.state]}</span>
            </>
          );
        },
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (item, row) => (
          <>
            <div className="right-active-btn">
              <Button
                className="cursor"
                onClick={() => {
                  navigate(`${ROUTES.ORDER_DETAIL}/${row?.algoId}`, {
                    state: {
                      selectedAlgoOrder: selectedAlgoOrder?.value,
                      instId: row?.instId,
                    },
                  });
                }}
              >
                <CopyOutlined />
              </Button>
            </div>
          </>
        ),
      },
    ];
  }, [isModalOpen, selectedAlgoOrder, botFilterOrders]);
 
  const MOON_GRID = useMemo(() => {
    return [
      {
        title: "Symbol",
        width: 60,
        dataIndex: "instId",
        key: "symbol",
        fixed: "left",
      },
      {
        title: "Order time",
        width: 100,
        dataIndex: "orderTime",
        key: "orderTime",
        render: (item, row) => {
          const openTime = moment.duration(row?.cTime);
          return (
            <div className="small-text self-bottom">
              <div>{moment(Number(openTime)).format("MM/DD/YYYY")}</div>
              <div>{moment(Number(openTime)).format("HH:MM:SS")}</div>
            </div>
          );
        },
      },
      {
        title: "Price range",
        width: 100,
        dataIndex: `priceRange`,
        key: "priceRange",
        render: (item, row) => {
          return <>{`${row.maxPx} - ${row.minPx}`}</>;
        },
      },
      {
        title: "Grid quantity",
        width: 100,
        dataIndex: "gridNum",
        key: "gridQuantity",
      },

      {
        title: "Investment",
        width: 100,
        dataIndex: "investment",
        key: "investment",
      },
      {
        title: "Total PnL",
        width: 100,
        dataIndex: "totalPnl",
        key: "totalPnl",
      },
      {
        title: "Pnl%",
        width: 100,
        dataIndex: "pnlRatio",
        key: "pnl",
      },
      {
        title: "Arbitrages",
        width: 100,
        dataIndex: "arbitrageNum",
        key: "arbitrages",
      },
      {
        title: "Status",
        width: 120,
        dataIndex: "status",
        key: "status",
        render: (item, row) => {
          return (
            <>
              <span>{BOT[row?.state]}</span>
            </>
          );
        },
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: (item, row) => (
          <>
            <div className="right-active-btn">
              <Button
                className="cursor"
                onClick={() => {
                  navigate(`${ROUTES.ORDER_DETAIL}/${row?.algoId}`, {
                    state: {
                      selectedAlgoOrder: selectedAlgoOrder?.value,
                      instId: row?.instId,
                    },
                  });
                }}
              >
                <CopyOutlined />
              </Button>
            </div>
          </>
        ),
      },
    ];
  }, [isModalOpen, selectedAlgoOrder, botFilterOrders]);

  const getColumns = () => {
    if ([BOT.SPOT, "ALL"].includes(selectedAlgoOrder?.value)) {
      return SPOT_GRID_COLUMNS;
    }
    if ([BOT.FUTURE_GRID, "ALL"].includes(selectedAlgoOrder?.value)) {
      return FUTURE_GRID;
    }
    if ([BOT.MOON_GRID, "ALL"].includes(selectedAlgoOrder?.value)) {
      return MOON_GRID;
    }
  };
  useEffect(() => {
    setExcelData(
      botFilterOrders?.result?.history?.map((item, index) => {
        const duration = moment.duration(item?.cTime);
        const stoppedTime = moment.duration(item?.uTime);
        return [
          (index + 1)?.toString(),
          `${item?.instId}`,
          moment(Number(duration)).format("YYYY-MM-DD HH:MM:SS"),
          capitalizeWord(item?.triggerParams?.[0]?.triggerStrategy),
          moment(Number(stoppedTime)).format("YYYY-MM-DD HH:MM:SS"),
          capitalizeWord(item?.triggerParams?.[1]?.triggerStrategy),
          `${item.maxPx} - ${item.minPx}`,
          item?.gridNum,
          item?.investment,
          item?.totalPnl,
          item?.pnlRatio,
          item?.arbitrageNum,
          item?.arbitrageNum,
          item?.Status,
        ];
      })
    );
  }, [botFilterOrders]);
  useEffect(() => {
    if (coinList?.data?.data?.length > 0) {
      setMarketOption(
        coinList?.data?.data?.map((item) => {
          const symbolArr = item?.symbol?.split("/");
          return {
            value: `${symbolArr[0]}-${symbolArr[1]}`,
            label: item?.symbol,
          };
        })
      );
    }
  }, [coinList]);

  useEffect(() => {
    setSkipStatus(false);
    if (time === "last30") {
      setStart(moment().subtract(30, "days").valueOf());
      setEnd(moment().valueOf());
    } else if (time === "last60") {
      setStart(moment().subtract(60, "days").valueOf());
      setEnd(moment().valueOf());
    } else if (time === "last90") {
      setStart(moment().subtract(90, "days").valueOf());
      setEnd(moment().valueOf());
    } else if (time === "date" && date?.[0]?.["$d"] && date?.[1]?.["$d"]) {
      setStart(moment(date?.[0]?.["$d"]).valueOf());
      setEnd(moment(date?.[1]?.["$d"]).valueOf());
    } else {
      setStart("");
      setEnd("");
    }
  }, [time, date]);

  return (
    <HistoryContainer>
      <Card
        className="filters"
        style={{
          width: "100%",
        }}
      >
        <div className="filters-container">
          <div className="single-filter">
            <label>Market</label>
            <Select
              value={market}
              style={{
                width: 120,
              }}
              options={[...marketOption, DEFAULT_ALL]}
              onChange={(e) => setMarket({ value: e, label: e })}
            />
          </div>
          <div className="single-filter">
            <label>Order Type</label>
            <Select
              value={selectedAlgoOrder}
              style={{
                width: 120,
              }}
              options={[...BUTTON_DATA, DEFAULT_ALL]}
              onChange={(e) => setSelectedAlgoOrder({ value: e, label: e })}
            />
          </div>
          <div className="single-filter">
            <label>Time</label>
            <Button
              size="small"
              className={`${time === "last30" ? "active" : ""} time-filter-btn`}
              onClick={() => setTime("last30")}
            >
              Last 30 days
            </Button>
            <Button
              size="small"
              className={`${time === "last60" ? "active" : ""} time-filter-btn`}
              onClick={() => setTime("last60")}
            >
              Last 60 days
            </Button>
            <Button
              size="small"
              className={`${time === "last90" ? "active" : ""} time-filter-btn`}
              onClick={() => setTime("last90")}
            >
              Last 90 days
            </Button>
            <Button
              size="small"
              className={`${time === "ALL" ? "active" : ""} time-filter-btn`}
              onClick={() => setTime("ALL")}
            >
              All
            </Button>
            <RangePicker
              value={date}
              onChange={(e) => {
                setTime("date");
                setDate(e);
              }}
              size="small"
              className="range-picker"
            />
            <ExcelExport
              columns={excelColumns || []}
              rowData={excelData || []}
            />
          </div>
        </div>
      </Card>
      <div className="table bot-table">
        <Table
          className="order-table "
          columns={getColumns()}
          dataSource={botFilterOrders?.result?.history || []}
          scroll={{
            x: 1600,
          }}
          loading={botFilterOrdersLoading}
          pagination={false}
        />
        <Pagination
          total={botFilterOrders?.result?.pagination?.totalItems}
          showSizeChanger={false}
          defaultPageSize={limit}
          className="pagination"
          current={page}
          onChange={(e) => {
            setPage(e);
          }}
        />
      </div>
    </HistoryContainer>
  );
};

export default BotHistory;

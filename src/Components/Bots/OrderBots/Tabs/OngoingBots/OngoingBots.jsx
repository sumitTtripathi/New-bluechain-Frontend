import moment from "moment";
import { capitalizeWord } from "../../../../../Utils/common";
import { LiaEditSolid } from "react-icons/lia";
import StartBotModal from "../../../Common/StartBotModal/StartBotModal";

import StopModal from "../../../Common/StopModal/StopModal";
import StopButtonModal from "../../../OrderDetail/StopButtonModal/StopButtonModal";

import TpslModal from "../../../Common/TpslModal/TpslModal";
import { Table, Button } from "antd";
import { ROUTES } from "../../../../../Constants/Routes";
import { CopyOutlined } from "@ant-design/icons";
import { useMemo, useRef, useState } from "react";
import {
  useBotFilterOrdersQuery,
  useInstantOrderPlaceMutation,
} from "../../../../../Services/Bot";
import ButtonsHead from "../../../Common/ButtonsHead";
import { useNavigate } from "react-router";
import { BOT } from "../../../../../Enums/Enums";

const BUTTON_DATA = [
  {
    key: "SpotGrid",
    label: "Spot grid",
    value: "grid",
  },
  {
    key: "FuturesGrid",
    label: "Futures grid",
    value: "contract_grid",
  },
  {
    key: "moonGrid",
    label: "Moon grid",
    value: "moon_grid",
  },
  // {
  //   key: "FuturesDCA",
  //   label: "Futures DCA (Martingale)",
  // },
  // {
  //   key: "SpotDCA",
  //   label: "Spot DCA (Martingale)",
  // },
  // {
  //   key: "infinityGrid",
  //   label: "Infinity grid",
  // },

  // {
  //   key: "recurringBuy",
  //   label: "Recurring buy",
  // },
  // {
  //   key: "smartPortfolio",
  //   label: "Smart portfolio",
  // },
  // {
  //   key: "dipSniper",
  //   label: "Dip Sniper",
  // },
  // {
  //   key: "peakSniper",
  //   label: "Peak Sniper",
  // },
  // {
  //   key: "arbitrage",
  //   label: "Arbitrage",
  // },
  // {
  //   key: "iceberg",
  //   label: "Iceberg",
  // },
  // {
  //   key: "twap",
  //   label: "TWAP",
  // },
];

export const OngoingBots = ({
  selectedFilter,
  selectedAlgoOrder,
  setSelectedAlgoOrder,
}) => {
  const [isStartBotModal, setIsStartBotModal] = useState(false);
  const { data: botFilterOrders, isFetching: botFilterOrdersLoading } =
    useBotFilterOrdersQuery(
      {
        selectedFilter,
        algoOrdType: selectedAlgoOrder,
      },
      {
        skip: !selectedAlgoOrder,
      }
    );
  const editRef = useRef();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTpslModalOpen, setIsTpslModalOpen] = useState(false);
  const [stopButtonModal, setStopButtonModal] = useState(false);

  const [instantOrderPlace, { isLoading: instantOrderPlaceLoading }] =
    useInstantOrderPlaceMutation();

  const onStartClick = async (row) => {
    try {
      const data = {
        algoId: row.algoId,
      };

      await instantOrderPlace(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
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
                  {capitalizeWord(row?.triggerParams?.[0]?.triggerStrategy) ===
                  "Price"
                    ? `${capitalizeWord(
                        row?.triggerParams?.[0]?.triggerStrategy
                      )} | ${row?.triggerParams?.[0]?.triggerPx}`
                    : capitalizeWord(row?.triggerParams?.[0]?.triggerStrategy)}
                </span>
                {row?.triggerParams[0]?.triggerStrategy === "price" && (
                  <button
                    onClick={() => {
                      setIsStartBotModal(true);
                      setSelectedRow(row);
                    }}
                    ref={editRef}
                    style={{ background: "transparent", border: "none" }}
                  >
                    {/* <LiaEditSolid className="cursor" /> */}
                  </button>
                )}
                <StartBotModal
                  setIsStartBotModal={setIsStartBotModal}
                  isStartBotModal={isStartBotModal}
                  row={selectedRow}
                />
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
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedRow(row);
                }}
                ref={editRef}
                style={{ background: "transparent", border: "none" }}
              >
                {/* <LiaEditSolid className="cursor" /> */}
              </button>
              <StopModal
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                ref={editRef}
                item={selectedRow}
                selectedAlgoOrder={selectedAlgoOrder}
              />
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
            <img
              src="/tpsl.svg"
              className="cursor"
              onClick={() => {
                setSelectedRow(row);
                setIsTpslModalOpen(true);
              }}
            />
            <TpslModal
              setIsTpslModalOpen={setIsTpslModalOpen}
              isTpslModalOpen={isTpslModalOpen}
              selectedAlgoOrder={selectedAlgoOrder}
              row={selectedRow}
            />
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
              <>
                <Button
                  disabled={row?.state != "pending_signal"}
                  onClick={() => onStartClick(row)}
                  loading={instantOrderPlaceLoading}
                >
                  Start
                </Button>
                <Button
                  onClick={() => {
                    setSelectedRow(row);

                    setStopButtonModal(true);
                  }}
                >
                  Stop
                </Button>
              </>
              <Button
                className="cursor"
                onClick={() => {
                  navigate(`${ROUTES.ORDER_DETAIL}/${row?.algoId}`, {
                    state: {
                      selectedAlgoOrder: selectedAlgoOrder,
                      selectedFilter: selectedFilter,
                      instId: row?.instId,
                    },
                  });
                }}
              >
                <CopyOutlined />
              </Button>
              <StopButtonModal
                row={selectedRow}
                selectedAlgoOrder={selectedAlgoOrder}
                setStopButtonModal={setStopButtonModal}
                stopButtonModal={stopButtonModal}
              />
            </div>
          </>
        ),
      },
    ];
  }, [
    isModalOpen,
    selectedFilter,
    isStartBotModal,
    selectedAlgoOrder,
    isTpslModalOpen,
    selectedRow,
    stopButtonModal,
  ]);
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
                <span>{capitalizeWord(row?.direction)}</span>
                <span>{`${row?.lever}X`}</span>
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
                {row?.triggerParams[0]?.triggerStrategy === "price" && (
                  <button
                    onClick={() => {
                      setSelectedRow(row);

                      setIsStartBotModal(true);
                    }}
                    ref={editRef}
                    style={{ background: "transparent", border: "none" }}
                  >
                    {/* <LiaEditSolid className="cursor" /> */}
                  </button>
                )}
                <StartBotModal
                  setIsStartBotModal={setIsStartBotModal}
                  isStartBotModal={isStartBotModal}
                  row={selectedRow}
                />
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
              <button
                onClick={() => {
                  setSelectedRow(row);

                  setIsModalOpen(true);
                }}
                ref={editRef}
                style={{ background: "transparent", border: "none" }}
              >
                {/* <LiaEditSolid className="cursor" />  */}
              </button>
              <StopModal
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                ref={editRef}
                item={selectedRow}
                selectedAlgoOrder={selectedAlgoOrder}
              />
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
      },

      {
        title: "Arbitrages",
        width: 100,
        dataIndex: "arbitrageNum",
        key: "arbitrages",
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
            <img
              src="/tpsl.svg"
              className="cursor"
              onClick={() => {
                setSelectedRow(row);

                setIsTpslModalOpen(true);
              }}
            />
            <TpslModal
              setIsTpslModalOpen={setIsTpslModalOpen}
              isTpslModalOpen={isTpslModalOpen}
              selectedAlgoOrder={selectedAlgoOrder}
              row={selectedRow}
            />
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
              <>
                <Button
                  disabled={
                    row?.triggerParams[0]?.triggerStrategy == "instant" ||
                    row?.state == "no_close_position"
                  }
                  onClick={() => onStartClick(row)}
                  loading={instantOrderPlaceLoading}
                >
                  Start
                </Button>
                <Button
                  disabled={row?.state == "no_close_position"}
                  onClick={() => {
                    setSelectedRow(row);

                    setStopButtonModal(true);
                  }}
                >
                  Stop
                </Button>
              </>
              <Button
                className="cursor"
                onClick={() => {
                  navigate(`${ROUTES.ORDER_DETAIL}/${row?.algoId}`, {
                    state: {
                      selectedAlgoOrder: row?.algoOrdType,
                      selectedFilter: selectedFilter,
                      instId: row?.instId,
                    },
                  });
                }}
              >
                <CopyOutlined />
              </Button>
              <StopButtonModal
                row={selectedRow}
                setStopButtonModal={setStopButtonModal}
                stopButtonModal={stopButtonModal}
              />
            </div>
          </>
        ),
      },
    ];
  }, [
    isModalOpen,
    selectedFilter,
    isStartBotModal,
    isTpslModalOpen,
    stopButtonModal,
    selectedAlgoOrder,
    selectedRow,
  ]);

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
              <>
                <Button
                  onClick={() => {
                    setSelectedRow(row);

                    setStopButtonModal(true);
                  }}
                >
                  Stop
                </Button>
              </>
              <Button
                className="cursor"
                onClick={() => {
                  navigate(`${ROUTES.ORDER_DETAIL}/${row?.algoId}`, {
                    state: {
                      selectedAlgoOrder: BOT.MOON_GRID,
                      selectedFilter: selectedFilter,
                      instId: row?.instId,
                    },
                  });
                }}
              >
                <CopyOutlined />
              </Button>
              <StopButtonModal
                row={selectedRow}
                setStopButtonModal={setStopButtonModal}
                stopButtonModal={stopButtonModal}
              />
            </div>
          </>
        ),
      },
    ];
  }, [
    isModalOpen,
    selectedFilter,
    isStartBotModal,
    isTpslModalOpen,
    stopButtonModal,
    selectedAlgoOrder,
    selectedRow,
  ]);
  const getColumns = () => {
    if (selectedAlgoOrder === "grid") {
      return SPOT_GRID_COLUMNS;
    }
    if (selectedAlgoOrder === "contract_grid") {
      return FUTURE_GRID;
    }
    if (selectedAlgoOrder === "moon_grid") {
      return MOON_GRID;
    }
  };

  return (
    <>
      <div className="btn-section">
        {BUTTON_DATA?.map((item, i) => {
          return (
            <ButtonsHead
              key={i}
              label={item?.label}
              value={item?.value}
              setSelectedAlgoOrder={setSelectedAlgoOrder}
              selectedAlgoOrder={selectedAlgoOrder}
            />
          );
        })}
      </div>
      <div className="table">
        <Table
          columns={getColumns()}
          loading={botFilterOrdersLoading}
          dataSource={botFilterOrders?.result?.data}
          scroll={{
            x: 1600,
          }}
        />
      </div>
    </>
  );
};

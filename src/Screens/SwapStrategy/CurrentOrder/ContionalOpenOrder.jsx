import { Popconfirm, Table } from "antd";
import { memo, useMemo, useState } from "react";
import { OrdersContainer } from "../Spot.styles";
import {
  useCancelAdvanceAlgoOrderMutation,
  useCancelAlgoOrderMutation,
  useCancelOrderMutation,
  useGetOpenOrdersQuery,
} from "../../../Services/Transaction";
import { toast } from "react-toastify";
import moment from "moment";
import { FiRefreshCcw } from "react-icons/fi";
import { INST_TYPE } from "../../../Constants/state";
import { useSelector } from "react-redux";
import TPSLModal from "../OrderHistory/TPSLModal";
import coinJson from "../../../Constants/Coin.json";
import { useTheme } from "styled-components";

const CancelOpenOrder = ({ row, selectedFilter }) => {
  const [cancelOrder] = useCancelOrderMutation();
  const [cancelAlgoOrder] = useCancelAlgoOrderMutation();
  const [cancelAdvanceAlgoOrder] = useCancelAdvanceAlgoOrderMutation();
  const cancelOrderType = async (data, orderType) => {
    let response = {};
    if (["limit", "market", "ioc", "post_only", "fok"].includes(orderType)) {
      const formData = {
        ordId: data?.ordId,
        instId: data?.instId,
      };
      response = await cancelOrder(formData).unwrap();
    } else if (orderType === "move_order_stop") {
      const formData = {
        data: [
          {
            algoId: data?.algoId,
            instId: data?.instId,
          },
        ],
      };
      response = await cancelAdvanceAlgoOrder(formData).unwrap();
    } else if (["conditional", "trigger", "oco"]?.includes(orderType)) {
      const formData = {
        data: [
          {
            algoId: data?.algoId,
            instId: data?.instId,
          },
        ],
      };
      response = await cancelAlgoOrder(formData).unwrap();
    }
    return response;
  };
  return (
    <Popconfirm
      title="Sure to cancel?"
      className="self-bottom"
      onConfirm={async () => {
        try {
          const response = await cancelOrderType(row, selectedFilter);
          if (response?.data?.data[0]?.ordId) {
            toast.success("Order is cancelled.");
          }
        } catch (error) {
          toast.error(error?.data?.message);
        }
      }}
    >
      <a className="self-bottom">Cancel</a>
    </Popconfirm>
  );
};

const ContionalOpenOrder = ({ type }) => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const [selectedRow, setSelectedRow] = useState({});
  const token = useSelector((state) => state.global.token);
  const {
    data: openOrders,
    isLoading: isLoadingOrder,
    isFetching: isRefetchingOrder,
    refetch,
  } = useGetOpenOrdersQuery(
    {
      instType: INST_TYPE.swap,
      ordType: type,
    },
    {
      skip: !token,
    }
  );

  const columns = useMemo(() => {
    return [
      {
        dataIndex: "instId",
        title: "Symbol",
        key: "symbol",
        render: (item, row) => {
          const [baseSymbol, quoteSymbol] = String(item).split("-");
          return (
            <div className="flex-col">
              <div className="symbol-info">
                <div className="symbol-info">
                  <img
                    className="table-icon"
                    src={coinJson[baseSymbol]}
                    alt="icon"
                  />{" "}
                  <p className="text-element">{`${baseSymbol}-${quoteSymbol} Perpetual`}</p>
                </div>
              </div>
              <div className="small-text symbol-info">
                <span className="perp">{row?.tdMode}</span>
                <span className="perp">{row?.lever}x</span>
              </div>
            </div>
          );
        },
      },
      {
        dataIndex: "cTime",
        title: "Order Time",
        key: "time",
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
        dataIndex: "posSide",
        title: "Side",
        key: "time",
        render: (item) => {
          return (
            <div
              className="small-text self-bottom"
              style={{
                color:
                  item === "long"
                    ? theme.colors.marketUp
                    : theme.colors.marketDown,
              }}
            >
              {item === "long" ? "Buy" : "Sell"}
            </div>
          );
        },
      },
      {
        dataIndex: "posSide",
        title: "Fill | Order price",
        key: "time",
        render: (item, row) => {
          return (
            <>
              <div className="small-text self-bottom">
                {row?.fillPx || "--"} {row?.rebateCcy}
              </div>
              <div className="small-text">
                {row?.px} {row?.rebateCcy}
              </div>
            </>
          );
        },
      },
      {
        dataIndex: "posSide",
        title: "Filled | Total",
        key: "time",
        render: (item, row) => {
          return (
            <div className="small-text self-bottom">
              <div>{row?.fillSz} Cont</div>
              <div>{row?.sz} Cont</div>
            </div>
          );
        },
      },
      {
        dataIndex: "posSide",
        title: "Filled | Order value",
        key: "time",
        render: (item, row) => {
          return (
            <div className="small-text self-bottom">
              <div>$ {row?.px || "--"}</div>
              <div>$ {row?.fillPx || "--"}</div>
            </div>
          );
        },
      },
      {
        title: "PnL | PnL%",
        dataIndex: "state",
        align: "bottom",
        key: "status",
        render: (_, row) => {
          return (
            <div className="small-text self-bottom">
              <div className="value-info">
                <div className="fixed-width">PnL</div>
                <div
                  style={{
                    color:
                      Number(row?.pnl).toFixed(2) > 0
                        ? theme.colors.marketUp
                        : theme.colors.marketDown,
                  }}
                >
                  {Number(row?.pnl).toFixed(2)}
                </div>
              </div>
              <div className="value-info">
                <div className="fixed-width">PnL%</div>
                <div
                  style={{
                    color:
                      Number(row?.pnl).toFixed(2) > 0
                        ? theme.colors.marketUp
                        : theme.colors.marketDown,
                  }}
                >
                  {Number(Number(row?.pnl) / Number(row?.lever)).toFixed(2)}%
                </div>
              </div>
            </div>
          );
        },
      },
      {
        dataIndex: "fee",
        title: "Order options",
        key: "side",
        render: (_, row) => {
          return (
            <div className="small-text self-bottom">
              <div>{String(row?.ordType).toUpperCase()}</div>
            </div>
          );
        },
      },
      {
        dataIndex: "fee",
        title: "Order options",
        key: "side",
        render: (_, row) => {
          return (
            <div className="small-text self-bottom">
              {(row?.slTriggerPx || row?.tpTriggerPx) && (
                <div
                  className="standard-text"
                  onClick={() => {
                    setSelectedRow(row);
                    setIsModalOpen(true);
                  }}
                >
                  View
                </div>
              )}
              {!row?.slTriggerPx && !row?.tpTriggerPx && <div>~~</div>}
            </div>
          );
        },
      },
      {
        dataIndex: "fee",
        title: "Fee",
        key: "side",
        render: (item, row) => {
          return (
            <div className="small-text self-bottom">
              <div>
                {row?.fee} {row?.feeCcy}
              </div>
            </div>
          );
        },
      },
      {
        dataIndex: "fee",
        title: "Reduce-only",
        key: "side",
        render: (item, row) => {
          return (
            <div className="small-text self-bottom">
              <div>{row?.reduceOnly} </div>
            </div>
          );
        },
      },
      {
        title: "Cancel",
        dataIndex: "symbol",
        key: "symbol",
        render: (_, row) => (
          <CancelOpenOrder row={row} selectedFilter={selectedFilter} />
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelOrder]);

  return (
    <OrdersContainer>
      <div className="flex-space-between">
        <div className="btns-container"></div>
        <FiRefreshCcw
          onClick={async () => {
            await refetch();
          }}
        />
      </div>
      <Table
        loading={isLoadingOrder || isRefetchingOrder}
        className="orders-container-table"
        dataSource={openOrders?.data || []}
        columns={columns}
      />
      <TPSLModal
        data={selectedRow}
        isModalOpen={isModelOpen}
        title={"TP | SL"}
        setIsModalOpen={setIsModalOpen}
      />
    </OrdersContainer>
  );
};

export default memo(ContionalOpenOrder);

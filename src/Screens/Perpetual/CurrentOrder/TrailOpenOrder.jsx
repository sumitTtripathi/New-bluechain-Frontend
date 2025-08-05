import { Popconfirm, Table } from "antd";
import { memo, useMemo } from "react";
import { OrdersContainer } from "../Spot.styles";
import {
  useCancelAlgoOrderMutation,
  useGetOpenOrdersQuery,
} from "../../../Services/Transaction";
import { toast } from "react-toastify";
import moment from "moment";
import { FiRefreshCcw } from "react-icons/fi";
import { INST_TYPE } from "../../../Constants/state";
import { useSelector } from "react-redux";
import coinJson from "../../../Constants/Coin.json";
import { useTheme } from "styled-components";

const TrailOpenOrder = ({ type }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);
  const {
    data: openOrders,
    isLoading: isLoadingOrder,
    isFetching: isRefetchingOrder,
    refetch,
  } = useGetOpenOrdersQuery(
    {
      symbol: INST_TYPE.swap,
      ordType: type,
    },
    {
      skip: !token,
    }
  );
  const [cancelAlgoOrder] = useCancelAlgoOrderMutation();

  const cancelOrderType = async (data) => {
    const formData = {
      data: [
        {
          algoId: data?.algoId,
          instId: data?.instId,
        },
      ],
    };
    const response = await cancelAlgoOrder(formData).unwrap();
    return response;
  };

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
        title: "Amount",
        key: "time",
        render: (_, row) => {
          return <div className="small-text self-bottom">{row?.sz} Cont</div>;
        },
      },
      {
        dataIndex: "posSide",
        title: "Variance",
        key: "time",
        render: (_, row) => {
          const [baseSymbol, quoteSymbol] = String(row?.instId).split("-");
          return (
            <div className="small-text self-bottom">
              {row?.callbackRatio && (
                <div>{`${Number(row?.callbackRatio) * 100} %`}</div>
              )}
              {row?.callbackSpread && (
                <div>{`${Number(row?.callbackSpread).toFixed(
                  2
                )} ${quoteSymbol}`}</div>
              )}
            </div>
          );
        },
      },
      {
        dataIndex: "activePx",
        title: "Activation price",
        key: "time",
        render: (item, row) => {
          const [_, quoteSymbol] = String(row?.instId).split("-");
          return (
            <div className="small-text self-bottom">
              {`${item || "~~"}  ${quoteSymbol}`}
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
        dataIndex: "fee",
        title: "Status",
        key: "side",
        render: (item, row) => {
          return (
            <div className="small-text self-bottom">
              <div>{row?.state} </div>
            </div>
          );
        },
      },
      {
        title: "Cancel",
        dataIndex: "symbol",
        key: "symbol",
        render: (_, row) => (
          <div className="small-text self-bottom">
            <Popconfirm
              title="Sure to cancel?"
              className="self-bottom"
              onConfirm={async () => {
                try {
                  const response = await cancelOrderType(row);
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
          </div>
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelAlgoOrder]);

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
    </OrdersContainer>
  );
};

export default memo(TrailOpenOrder);

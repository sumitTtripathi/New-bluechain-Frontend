import { Table } from "antd";
import { memo, useMemo } from "react";
import { OrdersContainer } from "../Spot.styles";
import { useGetOpenOrdersQuery } from "../../../Services/Transaction";
import moment from "moment";
import { FiRefreshCcw } from "react-icons/fi";
import { INST_TYPE } from "../../../Constants/state";
import { useSelector } from "react-redux";
import coinJson from "../../../Constants/Coin.json";
import { useTheme } from "styled-components";
import ModifyAlgoOrder from "./ModifyAlgoOrder";

const TPSLOpenOrder = ({ type, baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const token = useSelector((state) => state.global.token);
  const {
    data: openOrders,
    isLoading: isLoadingOrder,
    isFetching: isRefetchingOrder,
    refetch,
  } = useGetOpenOrdersQuery(
    {
      symbol: `${baseAsset}${quoteAsset}`,   
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
        title: "Amount",
        key: "time",
        render: (_, row) => {
          return <div className="small-text self-bottom">{row?.sz} Cont</div>;
        },
      },
      {
        dataIndex: "posSide",
        title: "Trigger price	",
        key: "time",
        render: (item, row) => {
          const [_, quoteSymbol] = String(row?.instId).split("-");
          return (
            <div className="small-text self-bottom">
              <div>
                {row?.tpTriggerPx
                  ? `TP ${row?.tpTriggerPx} ${quoteSymbol} (${row?.tpTriggerPxType})`
                  : "~~"}{" "}
              </div>
              <div>
                {row?.slTriggerPx
                  ? `SL ${row?.slTriggerPx} ${quoteSymbol} (${row?.slTriggerPxType})`
                  : "~~"}{" "}
              </div>
            </div>
          );
        },
      },
      {
        dataIndex: "posSide",
        title: "Order price",
        key: "time",
        render: (_, row) => {
          const [baseSymbol, quoteSymbol] = String(row?.instId).split("-");
          return (
            <div className="small-text self-bottom">
              {row?.tpOrdPx && (
                <div>
                  TP{" "}
                  {Number(row?.tpOrdPx) === -1
                    ? "Market"
                    : `${row?.tpOrdPx} ${quoteSymbol}`}{" "}
                </div>
              )}
              {!row?.tpOrdPx && <div>~~</div>}
              {row?.slOrdPx && (
                <div>
                  SL{" "}
                  {Number(row?.slOrdPx) === -1
                    ? "Market"
                    : `${row?.slOrdPx} ${quoteSymbol}`}{" "}
                </div>
              )}
              {!row?.slOrdPx && <div>~~</div>}
            </div>
          );
        },
      },
      {
        dataIndex: "posSide",
        title: "Order value	",
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
        render: (_, row) => <ModifyAlgoOrder row={row} />,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openOrders]);

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

export default memo(TPSLOpenOrder);

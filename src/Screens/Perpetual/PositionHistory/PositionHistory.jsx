/* eslint-disable */
import { Table } from "antd";
import { memo, useMemo } from "react";
import { OrdersContainer } from "../Spot.styles";
import coinJson from "../../../Constants/Coin.json";
import { useGetPositionHistoryQuery } from "../../../Services/Transaction";
import { BiEdit } from "react-icons/bi";
import moment from "moment";
import { useTheme } from "styled-components";
import { FiRefreshCcw } from "react-icons/fi";

const PositionHistory = ({ baseAsset, quoteAsset }) => {
  const {
    data: positionHistory,
    isLoading: isLoadingOrder,
    isFetching: isRefetchingOrder,
    refetch,
  } = useGetPositionHistoryQuery({
    instType: `SWAP`,
  });
  const theme = useTheme();
  const columns = useMemo(() => {
    return [
      {
        title: "",
        dataIndex: "instId",
        key: "symbol",
        render: (item, row) => {
          const [baseSymbol, quoteSymbol] = String(item).split("-");
          const openTime = moment.duration(row?.cTime);
          const closeTime = moment.duration(row?.uTime);
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
                <div className="small-text symbol-info">
                  <span className="perp">{row?.mgnMode}</span>
                  <span className="perp">
                    {row?.direction === "long" ? "Buy" : "Sell"} {row?.lever}x{" "}
                    <BiEdit size={13} />
                  </span>
                </div>
              </div>
              <div className="small-text">
                <div className="value-info">
                  <div className="fixed-width">Time opened</div>
                  <div>
                    {moment(Number(openTime)).format("MM/DD/YYYY HH:MM:SS")}
                  </div>
                </div>
                <div className="value-info">
                  <div className="fixed-width">Time closed</div>
                  <div>
                    {moment(Number(closeTime)).format("MM/DD/YYYY, HH:MM:SS")}
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        title: "",
        dataIndex: "cTime",
        key: "time",
        render: (item, row) => {
          return (
            <div className="small-text self-bottom">
              <div className="value-info">
                <div className="fixed-width">Entry price</div>
                <div>₮ {row?.openAvgPx}</div>
              </div>
              <div className="value-info">
                <div className="fixed-width">Close price</div>
                <div>₮ {row?.closeAvgPx}</div>
              </div>
            </div>
          );
        },
      },
      {
        title: "",
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
                      Number(row?.pnlRatio).toFixed(2) > 0
                        ? theme.colors.marketUp
                        : theme.colors.marketDown,
                  }}
                >
                  {Number(row?.pnlRatio).toFixed(2)}%
                </div>
              </div>
            </div>
          );
        },
      },
      {
        title: "",
        dataIndex: "side",
        key: "side",
        render: (item, row) => {
          return (
            <div className="small-text self-bottom">
              <div className="value-info">
                <div className="fixed-width">Opened</div>
                <div>{row?.openMaxPos} Cont</div>
              </div>
              <div className="value-info">
                <div className="fixed-width">Closed</div>
                {row?.closeTotalPos} Cont
              </div>
            </div>
          );
        },
      },
    ];
  }, [positionHistory]);

  return (
    <OrdersContainer>
      <div className="flex-space-between">
        <div></div>
        <FiRefreshCcw
          onClick={async () => {
            await refetch();
          }}
        />
      </div>
      <Table
        loading={isLoadingOrder || isRefetchingOrder}
        className="orders-container-table t-head-none"
        dataSource={positionHistory?.data || []}
        columns={columns}
      />
    </OrdersContainer>
  );
};

export default memo(PositionHistory);

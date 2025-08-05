import { Button, Card, Pagination, Select, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetAllCoinsSpotQuery } from "../../../../Services/Market";
import {
  useCancelOrderMutation,
  useGetAllFilterOrdersQuery,
} from "../../../../Services/Transaction";
import { HistoryContainer } from "../../Spot.styles";

const OpenOrders = () => {
  const [tradeType, setTradeType] = useState({
    value: "spot",
    label: "SPOT",
  });
  const [market, setMarket] = useState({
    value: "",
    label: "ALL",
  });
  const [ordType, setOrdType] = useState("limit");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [cancelOrder] = useCancelOrderMutation();
  const [side, setSide] = useState({ value: "", label: "ALL" });
  const [marketOption, setMarketOption] = useState([]);
  const { data: coinList } = useGetAllCoinsSpotQuery({ filter: "USDT" });
  const { data: orderHistory } = useGetAllFilterOrdersQuery({
    instId: market?.value,
    side: side?.value,
    page: filters?.page,
    limit: filters?.limit,
    orderType: ordType,
    state: "open",
  });

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

  const columns = [
    {
      title: "Order Time",
      dataIndex: "cTime",
      key: "orderTime",
      render: (item) => {
        const duration = moment.duration(item);
        return (
          <span>
            {moment
              .utc(duration.asMilliseconds())
              .format("YYYY-MM-DD HH:mm:ss")}
          </span>
        );
      },
    },
    {
      title: "Trading Pair",
      dataIndex: "instId",
      key: "tradingPair",
    },
    {
      title: "Order Type",
      dataIndex: "ordType",
      key: "orderType",
    },
    {
      title: "Side",
      dataIndex: "side",
      key: "side",
    },
    {
      title: "Price",
      dataIndex: "px",
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "sz",
      key: "amount",
    },
    {
      title: "Avg. Price",
      dataIndex: "avgPx",
      key: "avgPrice",
    },
    {
      title: "Operation",
      dataIndex: "ordId",
      key: "symbol",
      render: (item, row) => {
        return (
          <Button
            onClick={async () => {
              try {
                const data = {
                  ordId: row?.ordId,
                  instId: row?.instId,
                };
                const response = await cancelOrder(data).unwrap();
                if (response?.data?.data[0]?.ordId) {
                  toast.success("Order is cancelled.");
                }
              } catch (error) {
                toast.error(error?.data?.message);
              }
            }}
            type="link"
          >
            Cancel
          </Button>
        );
      },
    },
  ];
  return (
    <HistoryContainer>
      <Card
        className="filters"
        title="Current Order"
        style={{
          width: "100%",
        }}
      >
        <div className="filters-container">
          <div className="single-filter">
            <label>Trading Type</label>
            <Select
              style={{
                width: 120,
              }}
              value={tradeType}
              options={[
                {
                  value: "SPOT",
                  label: "SPOT",
                },
              ]}
              onChange={(e) => setTradeType({ value: e, label: e })}
            />
          </div>
          <div className="single-filter">
            <label>Order Type</label>
            <Button
              onClick={() => setOrdType("limit")}
              className={`${
                ordType === "limit" ? "active" : ""
              } order-type-btn`}
            >
              Limit
            </Button>
            <Button
              onClick={() => setOrdType("market")}
              className={`${
                ordType === "market" ? "active" : ""
              } order-type-btn`}
            >
              Market
            </Button>
            <Button
              onClick={() => setOrdType("ioc")}
              className={`${ordType === "ioc" ? "active" : ""} order-type-btn`}
            >
              IOC
            </Button>
            <Button
              onClick={() => setOrdType("post_only")}
              className={`${
                ordType === "post_only" ? "active" : ""
              } order-type-btn`}
            >
              Post only
            </Button>
            <Button
              onClick={() => setOrdType("fok")}
              className={`${ordType === "fok" ? "active" : ""} order-type-btn`}
            >
              FOK
            </Button>
            <Button
              onClick={() => setOrdType("oco")}
              className={`${ordType === "oco" ? "active" : ""} order-type-btn`}
            >
              OCO
            </Button>
            <Button
              onClick={() => setOrdType("move_order_stop")}
              className={`${
                ordType === "move_order_stop" ? "active" : ""
              } order-type-btn`}
            >
              Trail
            </Button>
            <Button
              onClick={() => setOrdType("trigger")}
              className={`${
                ordType === "trigger" ? "active" : ""
              } order-type-btn`}
            >
              Trigger
            </Button>
            <Button
              onClick={() => setOrdType("conditional")}
              className={`${
                ordType === "conditional" ? "active" : ""
              } order-type-btn`}
            >
              Conditional
            </Button>
          </div>
          <div className="single-filter">
            <label>Market</label>
            <Select
              value={market}
              style={{
                width: 120,
              }}
              options={[...marketOption, { value: "", label: "ALL" }]}
              onChange={(e) => setMarket({ value: e, label: e })}
            />
          </div>
          <div className="single-filter">
            <label>Side</label>
            <Select
              style={{
                width: 120,
              }}
              value={side}
              onChange={(e) => setSide({ value: e, label: e })}
              options={[
                {
                  value: "",
                  label: "ALL",
                },
                {
                  value: "buy",
                  label: "BUY",
                },
                {
                  value: "sell",
                  label: "SELL",
                },
              ]}
            />
          </div>
        </div>
      </Card>
      <Card
        className="filters"
        title={null}
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Table
          className="order-table"
          dataSource={orderHistory?.data?.history || []}
          columns={columns}
          pagination={false}
        />
        <Pagination
          total={orderHistory?.data?.pagination?.totalItems}
          showSizeChanger={false}
          defaultPageSize={filters?.limit}
          className="pagination"
          current={filters?.page}
          onChange={(e) => {
            setFilters((prev) => {
              return {
                ...prev,
                page: e,
              };
            });
          }}
        />
      </Card>
    </HistoryContainer>
  );
};

export default OpenOrders;

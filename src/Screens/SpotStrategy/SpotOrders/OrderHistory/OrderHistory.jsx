import { Button, Card, Pagination, Select, Table, DatePicker } from "antd";
import { HistoryContainer } from "../../Spot.styles";
import moment from "moment";
import { useGetAllCoinsSpotQuery } from "../../../../Services/Market";
import { useEffect, useState } from "react";
import { useGetAllFilterOrdersQuery } from "../../../../Services/Transaction";
import ExcelExport from "../../../../Components/ExcelExport/ExcelExport";

const { RangePicker } = DatePicker;
const columns = [
  {
    title: "Trading Pair",
    dataIndex: "instId",
    key: "symbol",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (item) => {
      const duration = moment.duration(item);
      return (
        <span>
          {moment.utc(duration.asMilliseconds()).format("YYYY-MM-DD HH:mm:ss")}
        </span>
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
  "Trading Pair",
  "Time",
  "Side",
  "Price",
  "Quantity",
  "Order Type",
  "state",
];

const OrderHistory = () => {
  const [tradeType, setTradeType] = useState({
    value: "SPOT",
    label: "SPOT",
  });
  const [market, setMarket] = useState({
    value: "",
    label: "ALL",
  });
  const [ordType, setOrdType] = useState("limit");
  const [skipStatus, setSkipStatus] = useState(true);
  const [excelData, setExcelData] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [time, setTime] = useState("last30");
  const [date, setDate] = useState();
  const [side, setSide] = useState({ value: "", label: "ALL" });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [marketOption, setMarketOption] = useState([]);
  const {
    data: coinList,
    // isLoading: allCoinsLoading,
    // isFetching: isFetchingCoins,
  } = useGetAllCoinsSpotQuery({ filter: "USDT" });
  const { data: orderHistory } = useGetAllFilterOrdersQuery(
    {
      start,
      end,
      instId: market?.value,
      side: side?.value,
      page: filters?.page,
      limit: filters?.limit,
      orderType: ordType,
    },
    { skip: skipStatus }
  );
  useEffect(() => {
    setExcelData(
      orderHistory?.data?.history?.map((item, index) => {
        const duration = moment.duration(item?.cTime);
        return [
          (index + 1)?.toString(),
          `${item?.instId}`,
          moment.utc(duration.asMilliseconds()).format("YYYY-MM-DD HH:mm:ss"),
          item?.side,
          item?.avgPx,
          item?.sz,
          item?.ordType,
          item?.state,
        ];
      })
    );
  }, [orderHistory]);
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
    } else if (time === "date") {
      setStart(moment(date[0]?.["$d"]).valueOf());
      setEnd(moment(date[1]?.["$d"]).valueOf());
    } else {
      setStart("");
      setEnd("");
    }
  }, [time, date]);

  return (
    <HistoryContainer>
      <Card
        className="filters"
        title="Order History"
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

export default OrderHistory;

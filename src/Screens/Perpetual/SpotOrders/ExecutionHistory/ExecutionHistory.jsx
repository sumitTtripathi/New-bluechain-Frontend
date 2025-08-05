import { Button, Card, Pagination, Select, Table } from "antd";
import { HistoryContainer } from "../../Spot.styles";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useGetExecutionHistoryQuery } from "../../../../Services/Transaction";
import { useGetAllCoinsSpotQuery } from "../../../../Services/Market";
import moment from "moment";
import ExcelExport from "../../../../Components/ExcelExport/ExcelExport";
const { RangePicker } = DatePicker;
const excelColumns = [
  "S.no",
  "Execution Time",
  "Trading Pair",
  "Side",
  "Exec. Price",
  "Executed Amount",
  "Fees",
  "Executed Type",
  "",
];

const columns = [
  {
    title: "Execution Time",
    dataIndex: "executionTime",
    key: "executionTime",
  },
  {
    title: "Trading Pair",
    dataIndex: "tradingPair",
    key: "tradingPair",
  },
  {
    title: "Side",
    dataIndex: "side",
    key: "side",
  },
  {
    title: "Exec. Price",
    dataIndex: "execPrice",
    key: "execPrice",
  },
  {
    title: "Executed Amount",
    dataIndex: "execAmount",
    key: "execAmount",
  },
  {
    title: "Fees",
    dataIndex: "fees",
    key: "fees",
  },
  {
    title: "Executed Type",
    dataIndex: "execType",
    key: "execType",
  },
];
const ExecutionHistory = () => {
  const [tradeType, setTradeType] = useState({
    value: "SPOT",
    label: "SPOT",
  });
  const [market, setMarket] = useState({ value: "", label: "ALL" });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [ordType, setOrdType] = useState("normal");
  const [start, setStart] = useState("");
  const [skipStatus, setSkipStatus] = useState(true);
  const [end, setEnd] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [time, setTime] = useState("last30");
  const [date, setDate] = useState();
  const [side, setSide] = useState({ value: "", label: "ALL" });
  const [marketOption, setMarketOption] = useState([]);
  const { data: coinList } = useGetAllCoinsSpotQuery({ filter: "USDT" });
  const { data: orderHistory } = useGetExecutionHistoryQuery(
    {
      start,
      end,
      instId: market?.value,
      side: side?.value,
      page: filters?.page,
      limit: filters?.limit,
    },
    { skip: skipStatus }
  );

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
    setExcelData(
      orderHistory?.data?.history?.map((item, index) => {
        const duration = moment.duration(item?.executionTime);
        return [
          (index + 1)?.toString(),
          moment.utc(duration.asMilliseconds()).format("YYYY-MM-DD HH:mm:ss"),
          `${item?.tradingPair}`,
          item?.side,
          item?.execPrice,
          item?.execAmount,
          item?.fees,
          item?.execType,
        ];
      })
    );
  }, [orderHistory]);
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
        title="Execution History"
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
              onClick={() => setOrdType("normal")}
              className={`${
                ordType === "normal" ? "active" : ""
              } order-type-btn`}
            >
              Normal Order
            </Button>
            <Button
              onClick={() => setOrdType("stop")}
              className={`${ordType === "stop" ? "active" : ""} order-type-btn`}
            >
              Stop Order
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
          dataSource={orderHistory?.data?.history}
          columns={columns}
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

export default ExecutionHistory;

import { DatePicker, Button, Card, Pagination, Select, Table } from "antd";
import { BsStack } from "react-icons/bs";
import { HistoryContainer } from "../../Spot/Spot.styles";
import {
  useGetCurrencyInfoQuery,
  useGetWithdrawHistoryQuery,
} from "../../../Services/Transaction";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import moment from "moment";
import ExcelExport from "../../../Components/ExcelExport/ExcelExport";
const { RangePicker } = DatePicker;

const excelColumns = [
  "S.no",
  "Trading Pair",
  "Network",
  "Withdraw Address",
  "Withdraw Id",
  "Remark",
  "Time",
];

const AssetWithdraw = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [time, setTime] = useState("last30");
  const [date, setDate] = useState();
  const [excelData, setExcelData] = useState([]);
  const [skipStatus, setSkipStatus] = useState(true);
  const [market, setMarket] = useState({
    value: "",
    label: "ALL",
  });
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("10");
  const { data: currencyInfo } = useGetCurrencyInfoQuery();
  const [marketOption, setMarketOption] = useState([]);
  const { data: withdrawHistory } = useGetWithdrawHistoryQuery(
    {
      start,
      end,
      page,
      limit,
      instId: market?.value,
    },
    { skip: skipStatus }
  );
  const theme = useTheme();
  const columns = useMemo(() => {
    return [
      {
        title: "Trading Pair",
        dataIndex: "coin",
        key: "coin",
      },
      {
        title: "Network",
        dataIndex: "network",
        key: "network",
      },
      {
        title: "Withdraw Address",
        dataIndex: "address",
        key: "address",
        render: (item) => {
          return `${item?.slice(0, 6)}...${item?.slice(item.length)}`;
        },
      },
      {
        title: "Withdraw Id",
        dataIndex: "withdraw_id",
        key: "withdraw_id",
        render: (item) => {
          return `${item?.slice(0, 6)}...${item?.slice(item.length)}`;
        },
      },
      {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
      },
      {
        title: "Time",
        dataIndex: "timestamp",
        key: "timestamp",
      },
    ];
  }, []);
  useEffect(() => {
    const filteredArr = [];
    currencyInfo?.map((item) => {
      if (!filteredArr?.includes(item?.ccy)) {
        filteredArr.push(item?.ccy);
      }
      return item?.ccy;
    });
    const requiredArr = filteredArr?.map((item) => {
      return { label: item, value: item };
    });
    setMarketOption(requiredArr);
  }, [currencyInfo]);

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

  useEffect(() => {
    setExcelData(
      withdrawHistory?.data?.history?.map((item, index) => {
        const duration = moment.duration(item?.timestamp);
        return [
          (index + 1)?.toString(),
          item?.coin,
          item?.network,
          item?.address,
          item?.withdraw_id,
          item?.remark,
          moment(Number(duration)).format("YYYY-MM-DD HH:MM:SS"),
        ];
      })
    );
  }, [withdrawHistory]);

  return (
    <HistoryContainer>
      <div
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
        className="profile-container"
      >
        <BsStack color={theme.colors.blue.dark} />
        <h1 style={{ color: theme.colors.black }}>Withdraw Records</h1>
      </div>
      <Card
        className="filters"
        style={{
          width: "100%",
          background: "transparent",
        }}
      >
        <div className="filters-container">
          <div className="single-filter">
            <label>Asset</label>
            <Select
              value={market}
              style={{
                width: 120,
                background: theme.colors.blue.white,
              }}
              options={[...marketOption, { value: "", label: "ALL" }]}
              onChange={(e) => setMarket({ value: e, label: e })}
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
            {/* <Button size="small" className="time-filter-btn">
              Export
            </Button> */}
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
          dataSource={withdrawHistory?.data?.history}
          columns={columns}
        />
        <Pagination
          total={withdrawHistory?.data?.pagination?.totalItems}
          showSizeChanger={false}
          defaultPageSize={limit}
          className="pagination"
          current={page}
          onChange={(e) => {
            setPage(e);
          }}
        />
      </Card>
    </HistoryContainer>
  );
};

export default AssetWithdraw;

import { Button, Card, Pagination, Select, Table, DatePicker } from "antd";
import { BsStack } from "react-icons/bs";
import { HistoryContainer } from "../../Spot/Spot.styles";
import {
  useGetCurrencyInfoQuery,
  useGetDepositHistoryQuery,
} from "../../../Services/Transaction";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import moment from "moment";
import { depositState } from "../../../Constants/state";
import ExcelExport from "../../../Components/ExcelExport/ExcelExport";
const { RangePicker } = DatePicker;

const excelColumns = [
  "S.no",
  "Time",
  "Currency",
  "Amount",
  "Network",
  "Block Confirmation",
  "Deposit Address",
  "Transaction Id",
  "Deposit Id",
  "State",
];

const AssetDeposit = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    start: "",
    end: "",
  });
  const [time, setTime] = useState("ALL");
  const [excelData, setExcelData] = useState([]);
  const [date, setDate] = useState();
  const [skipStatus, setSkipStatus] = useState(true);
  const { data: currencyInfo } = useGetCurrencyInfoQuery();
  const [market, setMarket] = useState({
    value: "",
    label: "ALL",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [marketOption, setMarketOption] = useState([]);
  const { data: depositHistory } = useGetDepositHistoryQuery(
    {
      ...filters,
      ...pagination,
      instId: market?.value,
    },
    { skip: skipStatus }
  );

  const columns = useMemo(() => {
    return [
      {
        title: "Time",
        dataIndex: "ts",
        key: "ts",
        render: (item) => {
          const duration = moment.duration(item);
          return (
            <span>
              {moment(Number(duration)).format("YYYY-MM-DD HH:MM:SS")}
            </span>
          );
        },
      },
      {
        title: "Currency",
        dataIndex: "ccy",
        key: "coin",
      },
      {
        title: "Amount",
        dataIndex: "amt",
        key: "amount",
      },
      {
        title: "Network",
        dataIndex: "chain",
        key: "network",
      },
      {
        title: "Block Confirmation",
        dataIndex: "actualDepBlkConfirm",
        key: "Block Confirmation",
      },
      {
        title: "Deposit Address",
        dataIndex: "to",
        key: "to",
        render: (item) => {
          return `${item?.slice(0, 6)}...${item?.slice(item?.length)}`;
        },
      },
      {
        title: "Transaction Id",
        dataIndex: "txId",
        key: "txId",
        render: (item) => {
          return `${item?.slice(0, 6)}...${item?.slice(item?.length)}`;
        },
      },
      {
        title: "Deposit Id",
        dataIndex: "depId",
        key: "deposit id",
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        render: (item) => {
          return <span>{depositState[item]}</span>;
        },
      },
    ];
  }, []);

  useEffect(() => {
    const filteredArr = [];
    currencyInfo?.map((item) => {
      if (!filteredArr?.includes(item?.ccy)) {
        filteredArr?.push(item?.ccy);
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
      setFilters((prev) => {
        return {
          ...prev,
          start: moment().subtract(30, "days").valueOf(),
          end: new Date().getTime(),
        };
      });
    } else if (time === "last60") {
      setFilters((prev) => {
        return {
          ...prev,
          start: moment().subtract(60, "days").valueOf(),
          end: moment().valueOf(),
        };
      });
    } else if (time === "last90") {
      setFilters((prev) => {
        return {
          ...prev,
          start: moment().subtract(90, "days").valueOf(),
          end: moment().valueOf(),
        };
      });
    } else if (time === "date" && date?.[0]?.["$d"] && date?.[1]?.["$d"]) {
      setFilters((prev) => {
        return {
          ...prev,
          start: moment(date?.[0]?.["$d"]).valueOf(),
          end: moment(date?.[1]?.["$d"]).valueOf(),
        };
      });
    } else {
      setFilters((prev) => {
        return {
          ...prev,
          start: "",
          end: "",
        };
      });
    }
  }, [time, date]);

  useEffect(() => {
    setExcelData(
      depositHistory?.data?.history?.map((item, index) => {
        const duration = moment.duration(item?.ts);
        return [
          (index + 1)?.toString(),
          moment(Number(duration)).format("YYYY-MM-DD HH:MM:SS"),
          `${item?.ccy}`,
          item?.amt,
          item?.chain,
          item?.actualDepBlkConfirm,
          item?.to,
          item?.txId,
          item?.depId,
          item?.state,
        ];
      })
    );
  }, [depositHistory]);

  return (
    <HistoryContainer>
      <div
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
        className="profile-container"
      >
        <BsStack color={theme.colors.blue.dark} />
        <h1 style={{ color: theme.colors.black }}>Deposit Records</h1>
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
          dataSource={depositHistory?.data?.history}
          columns={columns}
        />
        <Pagination
          total={depositHistory?.data?.pagination?.totalItems}
          showSizeChanger={false}
          defaultPageSize={filters?.limit}
          className="pagination"
          current={filters?.page}
          onChange={(e) => {
            setPagination((prev) => {
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

export default AssetDeposit;

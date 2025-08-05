import { Breadcrumb, Button, Divider, Dropdown, Progress } from "antd";
import {
  CoinDetailsContainer,
  PriceChangeValue,
  StyledMarketTable,
  StyledMenu,
  TradeButton,
} from "./CoinDetails.styles";
import { BiChevronDown } from "react-icons/bi";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useTheme } from "styled-components";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useCallback, useEffect, useMemo, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import StickyNav from "./StickyNav/StickyNav";
import { useScrollTop } from "../../Hooks/useScrollTop";
import {
  useGetChartDataQuery,
  useGetCoinDetailsDataQuery,
  useGetHighLowPriceQuery,
  useGetPriceChangeQuery,
  useGetSearchMarketDataQuery,
  useIncrementSearchMutation,
} from "../../Services/Market";
import { ROUTES } from "../../Constants/Routes";
import FadeLoader from "../../Components/FadeLoader/FadeLoader";
import { StyledSearchInput } from "../Market/Market.styles";
import { convertExponentialToDecimal } from "../../Utils/common";
import { Helmet } from "react-helmet";
import moment from "moment";
import { formatNumber, formatNumberDecimal } from "../../Common/Common";
import { config } from "../../config";
import CurrencyFormat from "react-currency-format";

// Price Chart Configuration
const defaultOption = {
  credits: {
    enabled: false,
  },
  chart: {
    type: "area",
  },
  legend: {
    enabled: false,
  },
  title: null,
  subtitle: null,
  xAxis: {
    type: "datetime", // Specify that X-axis values are timestamps
    labels: {
      formatter: function () {
        // 'this.value' contains the timestamp value
        const date = new Date(this.value);
        return Highcharts.dateFormat("%Y-%m-%d", date); // Format the timestamp as desired
      },
    },
  },
  yAxis: {
    title: null,
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  // tooltip: {
  //   pointFormat:
  //     "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}",
  // },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: [0, 0, 0, 300],
        stops: [
          [
            0,
            Highcharts.color(Highcharts.getOptions().colors[0])
              .setOpacity(0.3)
              .get("rgba"),
          ],
          [
            1,
            Highcharts.color(Highcharts.getOptions().colors[0])
              .setOpacity(0.1)
              .get("rgba"),
          ],
        ],
      },
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
  },
  series: [
    {
      data: [],
    },
  ],
};

const CoinDetails = () => {
  const theme = useTheme();
  useScrollTop();
  const { id } = useParams();
  const [optionSetting, setOptionSetting] = useState(defaultOption);
  const [filter, setFilter] = useState("+7D");
  const { data: coinDetails, isLoading: coinDetailsLoading } =
    useGetCoinDetailsDataQuery(id?.toUpperCase());
  const [incrementSearch] = useIncrementSearchMutation();
  const [searchValue, setSearchValue] = useState();
  const { data: searchMarketData } = useGetSearchMarketDataQuery(
    { search: searchValue, quote_asset: "USDT" },
    {
      skip: searchValue?.length <= 0,
    }
  );
  const columns = [
    {
      title: "Market",
      dataIndex: "market",
    },
    {
      title: "Price",
      align: "center",
      dataIndex: "price",
    },
    {
      title: "24H Change",
      align: "center",
      dataIndex: "change",
    },
    {
      title: "24H Lowest",
      responsive: ["md"],
      align: "center",
      dataIndex: "lowest",
    },
    {
      title: "24H Highest",
      align: "center",
      responsive: ["md"],
      dataIndex: "highest",
    },
    {
      title: "24H Volume",
      responsive: ["md"],
      align: "center",
      dataIndex: "volume",
    },
    {
      title: "24H Value",
      align: "center",
      responsive: ["md"],
      dataIndex: "value",
    },
    {
      title: "",
      responsive: ["md"],
      align: "center",
      dataIndex: "trade-btn",
      render: (_, row) => {
        return (
          <TradeButton
            onClick={() => navigate(`${ROUTES.SPOT}/${row?.market}`)}
          >
            Trade
          </TradeButton>
        );
      },
    },
  ];

  const { data: priceChangeDetails, isLoading: priceChangeDetailsLoading } =
    useGetPriceChangeQuery(id?.toUpperCase());
  let stickyNavOffset = 300;
  const [showStickyNav, setShowStickyNav] = useState(false);
  const { data: coinDetailsChartData, isLoading: coinDetailsChartDataLoading } =
    useGetChartDataQuery({
      symbol: id?.toUpperCase(),
      filter,
    });
  const navigate = useNavigate();

  const [hlPriceFilter] = useState("1D");
  const { data: hlCoinPriceData, isLoading: hlCoinPriceDataLoading } =
    useGetHighLowPriceQuery({
      filter: hlPriceFilter,
      id: id?.toUpperCase(),
    });
  //handle scrolling to show sticky navbar
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY; // => scroll position
    // const [coinFilter, setCoinFilter] = useState("ALL");
    if (stickyNavOffset <= scrollPosition) {
      !showStickyNav && // to limit setting state only the first time
        setShowStickyNav(true);
    } else {
      setShowStickyNav(false);
    }
  }, [showStickyNav, stickyNavOffset]);

  const priceChange = useMemo(() => {
    return [
      {
        label: "24H",
        key: "percentChange24hrs",
      },
      {
        label: "7 Days",
        key: "percentChange7d",
      },
      {
        label: "30 Days",
        key: "percentChange30d",
      },
      {
        label: "90 Days",
        key: "percentChange90d",
      },
      {
        label: "180 Days",
        key: "percentChange180d",
      },
      {
        label: "All",
        key: "percentChangeAll",
      },
    ];
  }, []);

  useEffect(() => {
    setOptionSetting((prev) => ({
      ...prev,
      series: [
        {
          data:
            coinDetailsChartData?.data?.map((item) => [
              item.timestamp,
              item.value,
            ]) || [],
        },
      ],
    }));
  }, [coinDetailsChartData]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const filterTabItems = useMemo(() => {
    return [
      { label: "1D", key: "1D" },
      { label: "7D", key: "7D" },
      { label: "30D", key: "30D" },
      { label: "90D", key: "90D" },
      { label: "180D", key: "180D" },
      { label: "365D", key: "365D" },
      { label: "All", key: "ALL" },
    ];
  }, []);

  const filterMenuitems = () => {
    return filterTabItems?.map((item) => {
      return {
        label: (
          <span
            className={`menu-item ${
              filter === item?.key ? "menu-item-default" : ""
            }`}
            onClick={() => setFilter(item?.key)}
          >
            {item?.label}
          </span>
        ),
        key: item?.to,
      };
    });
  };

  const getExplorerItems = () => {
    return coinDetails?.data?.data?.explorer?.map((item, i) => {
      return {
        key: i,
        label: (
          <a target="_blank" rel="noopener noreferrer" href={item}>
            {item}
          </a>
        ),
      };
    });
  };
  const items = [
    { label: "Coin List", key: ROUTES.MARKET }, // remember to pass the key prop
    { label: id, key: `/info/${id}` },
  ];
  return (
    <CoinDetailsContainer
      marketUp={
        priceChangeDetails?.data?.["percentChange24hrs"]?.toFixed(2) > 0
          ? true
          : false
      }
    >
      <Helmet>
        <title>{`${
          convertExponentialToDecimal(coinDetails?.data?.cl?.current_price) ||
          config?.APP_NAME
        }-${id}/${"USDT"}`}</title>
      </Helmet>
      {(coinDetailsLoading ||
        priceChangeDetailsLoading ||
        coinDetailsChartDataLoading ||
        hlCoinPriceDataLoading) && <FadeLoader />}
      {showStickyNav && <StickyNav />}
      <div className="top">
        <div className="mini-nav">
          <div className="breadcrumbs">
            <Breadcrumb separator="|">
              {items?.map((item, i) => {
                return (
                  <Breadcrumb.Item key={item?.key}>
                    <NavLink to={item?.key}>{item.label}</NavLink>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
          <div>
            <StyledSearchInput
              size="large"
              showSearch
              value={searchValue}
              placeholder="Search by coin/ token"
              suffixIcon={<AiOutlineSearch style={{ fontSize: "16px" }} />}
              onChange={async (value) => {
                await incrementSearch(value).unwrap();
                navigate(`${ROUTES.COINDETAILS?.replace(":id", value)}`);
                setSearchValue();
              }}
              onSearch={(value) => setSearchValue(value?.toLowerCase())}
              options={searchMarketData}
            />
          </div>
        </div>
        <div className="coin-details-container">
          <div className="left">
            <div className="coin-img-container">
              <img
                src={coinDetails?.data?.data?.logo || "/coin.png"}
                alt="coin"
              />
              <p className="coin-name">{coinDetails?.data?.data?.name}</p>
            </div>
            <div className="tags-container">
              <Button className="tag">
                {coinDetails?.data?.data?.name || "null"}
              </Button>
              <Button className="tag">Coin</Button>
              {/* <Button className="tag">Margin</Button> */}
            </div>
            <div className="coin-data">
              <p className="issue-date">
                Date of Issue:{" "}
                {moment(coinDetails?.data?.data?.date_launched)?.format(
                  "MMMM Do YYYY, h:mm:ss a"
                ) || "null"}
              </p>
              <p>{coinDetails?.data?.data?.description || "null"}</p>
            </div>
            <div className="links-container">
              <a href={coinDetails?.data?.data?.website?.[0]}>
                {coinDetails?.data?.data?.name}{" "}
                <FaExternalLinkAlt size={12} className="link-icon" />
              </a>
              <Dropdown
                menu={{
                  items:
                    getExplorerItems()?.length > 0 ? getExplorerItems() : [],
                }}
                placement="bottom"
              >
                <Button>
                  Block Explorer <BiChevronDown />
                </Button>
              </Dropdown>

              <a href={coinDetails?.data?.data?.whitepaper?.[0]}>
                Whitepaper <FaExternalLinkAlt size={12} className="link-icon" />
              </a>
              <a href={coinDetails?.data?.data?.source_code?.[0]}>
                Source Code{" "}
                <FaExternalLinkAlt size={12} className="link-icon" />
              </a>
            </div>
          </div>
          <div className="right">
            <p className="latest-price-label">
              {coinDetails?.data?.data?.name || "null"} Latest Price
            </p>
            <div className="row">
              <div className="row-left">
                <span className="price">
                  {
                    <CurrencyFormat
                      value={convertExponentialToDecimal(
                        coinDetails?.data?.cl?.current_price
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <div>{value}</div>}
                    />
                  }
                </span>
                <span className="currency">USD</span>
                <div className="market-perc">
                  {priceChangeDetails?.data["percentChange24hrs"] > 0 ? (
                    <RxTriangleUp color={theme.colors.whiteOnly} />
                  ) : (
                    <RxTriangleDown color={theme.colors.whiteOnly} />
                  )}
                  <span>
                    {priceChangeDetails?.data?.["percentChange24hrs"]?.toFixed(
                      2
                    ) || 0}
                    %
                  </span>
                </div>
              </div>
              <div className="row-right">
                <Button
                  onClick={() => navigate(ROUTES.DEPOSIT)}
                  className="price-deposit-btn"
                >
                  Deposit
                </Button>
              </div>
            </div>
            <div style={{ marginTop: 30, alignItems: "start" }} className="row">
              <div className="row-left">
                <span style={{ margin: 0 }} className="latest-price-label">
                  Lowest Price
                </span>
                <span className="price-value">
                  <CurrencyFormat
                    value={convertExponentialToDecimal(
                      coinDetails?.data?.cl?.low24h
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </span>
                <Progress
                  percent={hlCoinPriceData?.data?.progressPercent || 0}
                  strokeWidth={5}
                  strokeColor={theme?.colors?.grey?.semiDark}
                />
              </div>
              <div className="row-right">
                <div className="row-left">
                  <span style={{ margin: 0 }} className="latest-price-label">
                    Highest Price
                  </span>
                  <span className="price-value">
                    <CurrencyFormat
                      value={convertExponentialToDecimal(
                        coinDetails?.data?.cl?.high24h
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <div>{value}</div>}
                    />
                  </span>
                  {/* <Select
                    defaultValue={hlPriceFilter}
                    className="filter-select"
                    onChange={(e) => setHLPriceFilter(e)}
                    style={{
                      width: 120,
                    }}
                    options={[
                      {
                        value: "1D",
                        label: "1D",
                      },
                      {
                        value: "7D",
                        label: "7D",
                      },
                      {
                        value: "30D",
                        label: "30D",
                      },
                      {
                        value: "365D",
                        label: "365D",
                      },
                      {
                        value: "ALL",
                        label: "ALL",
                      },
                    ]}
                  /> */}
                </div>
              </div>
              <div className="coin-market-details">
                <div className="single-container">
                  <span className="label">24H Value(USD)</span>
                  <p className="value">
                    <CurrencyFormat
                      value={formatNumber(
                        coinDetails?.data?.cl?.vol24h
                          ? coinDetails?.data?.cl?.vol24h
                          : 0,
                        2
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <div>{value}</div>}
                    />
                  </p>
                </div>
                <Divider style={{ height: 89 }} type="vertical" />
                <div className="single-container">
                  <span className="label">Total Market Cap(USD)</span>
                  <p className="value">
                    {
                      <CurrencyFormat
                        value={formatNumberDecimal(
                          coinDetails?.data?.cl?.market_cap
                            ? coinDetails?.data?.cl?.market_cap
                            : 0,
                          2
                        )}
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value) => <div>{value}</div>}
                      />
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <p className="chart-title">Price</p>
        <div className="section-container">
          <div className="price-chart">
            <div className="table-filter-bar">
              <StyledMenu mode="horizontal" items={filterMenuitems()} />
            </div>
            <HighchartsReact
              immutable={true}
              highcharts={Highcharts}
              options={optionSetting}
            />
          </div>
          <div className="cet-price-container">
            <p className="cet-title">Price Charge</p>
            <div className="cet-price">
              {priceChange?.map((item, i) => {
                return (
                  <div key={item?.key} className="cet-price-row">
                    <span className="cet-label">{item?.label}</span>
                    <PriceChangeValue
                      value={priceChangeDetails?.data?.[item?.key]}
                      className="cet-value"
                    >
                      {priceChangeDetails?.data?.[item?.key]?.toFixed(2)}%
                    </PriceChangeValue>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <p className="chart-title">Markets</p>
        <StyledMarketTable
          pagination={false}
          columns={columns}
          dataSource={[
            {
              key: "1",
              market: coinDetails?.data?.data?.symbol,
              price: convertExponentialToDecimal(
                coinDetails?.data?.cl?.current_price
              ),
              change: `${
                priceChangeDetails?.data?.["percentChange24hrs"]?.toFixed(2) ||
                0
              }%`,
              lowest: coinDetails?.data?.cl?.low24h,
              highest: coinDetails?.data?.cl?.high24h,
              // volume: -1.07,
              // value: -1.07,
            },
          ]}
        />
      </div>
      <div className="chart-container">
        <p className="chart-title">Coin introduction</p>
        <div className="coin-intro">
          <p className="desc">
            {coinDetails?.data?.data?.description || "null"}
          </p>
        </div>
      </div>
    </CoinDetailsContainer>
  );
};

export default CoinDetails;

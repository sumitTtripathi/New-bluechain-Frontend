import { useNavigate } from "react-router";
import Minichart from "../../../Components/MiniChart/MiniChart";
import { ROUTES } from "../../../Constants/Routes";
import CoinCard from "../Components/CoinCard/CoinCard";
import GraphCard from "../Components/GraphCard/GraphCard";
import PriceChange from "../Components/PriceChange/PriceChange";
import FadeLoader from "../../../Components/FadeLoader/FadeLoader";
import CoinJson from "../../../Constants/Coin.json";

import {
  MainMarketPageContainer,
  StyledMenu,
  StyledSearchInput,
} from "../Market.styles";
import { StyledTableSpan } from "../../../GlobalStyles";
import {
  useGetCoinListQuery,
  useGetFavTokensQuery,
  useGetMarketCardsQuery,
  useGetSearchMarketDataQuery,
  useIncrementSearchMutation,
  useSetFavTokenMutation,
} from "../../../Services/Market";
import { Pagination } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineSearch, AiFillStar } from "react-icons/ai";
import { convertExponentialToDecimal } from "../../../Utils/common";
import { useScrollTop } from "../../../Hooks/useScrollTop";
import { Helmet } from "react-helmet";
import { Config } from "../../../Config";
import CurrencyFormat from "react-currency-format";
import CryptoTable from "../../../Components/CryptoTable/CryptoTable";
import { useGetUserQuery } from "../../../Services/Auth";
import { useSelector } from "react-redux";
import TitleCol from "../Components/Columns/TitleCol";

const Main = () => {
  useScrollTop();

  const [filters, setFilters] = useState({
    currentPage: 1,
    limit: 10,
    sort: "market_cap",
    sortOrder: "desc",
    quote_asset: null,
  });

  const handleStarClick = () => {
    setFilters((prev) => {
      return {
        ...prev,
        quote_asset: prev.quote_asset === "star" ? null : "star",
      };
    });
  };

  const { data: marketCardsData } = useGetMarketCardsQuery();
  const [incrementSearch, { isLoading: incrementLoading }] =
    useIncrementSearchMutation();

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [coinListDataValue, setCoinListDataValue] = useState({});
  const token = useSelector((state) => state.global.token);
  const { data: user } = useGetUserQuery(
    {},
    {
      skip: !token,
    }
  );
  const [setFavToken, { isFetching: setFavTokenLoading }] =
    useSetFavTokenMutation();
  const { data: searchMarketData, isLoading: searchLoading } =
    useGetSearchMarketDataQuery(
      { search: searchValue, quote_asset: "USDT" },
      {
        skip: searchValue?.length <= 0,
      }
    );
  const { data: favTokens } = useGetFavTokensQuery(user?.user?.email, {
    skip: !token || !user?.user?.email,
  });
  const {
    data: coinListData,
    isLoading: coinListDataLoading,
    isFetching,
  } = useGetCoinListQuery({ ...filters, email: user?.user?.email });
  const columns = useMemo(() => {
    return [
      {
        title: "#",
        dataIndex: "index",
        render: (row, item) => (
          <div style={{
            display: "flex",
            alignItems: "center"
          }}>
            <TitleCol
              item={item}
              row={row}
              favTokens={favTokens}
              setFavToken={setFavToken}
            />
            <span style={{paddingLeft: "20px"}}><StyledTableSpan>{item?.index + 1}</StyledTableSpan></span>
          </div>
        ),
      },
      {
        title: "Coin",
        dataIndex: "name",
        render: (coin, item) => {
          return (
            <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
              <img
                style={{ height: "30px", width: "30px" }}
                src={CoinJson[item?.symbol?.split("/")?.[0]]}
                alt="crypto-icon"
              />
              <StyledTableSpan>{item?.symbol?.split("/")?.[0]}</StyledTableSpan>
            </div>
          );
        },
      },
      {
        title: "Price(USD)",
        dataIndex: "value",
        align: "left",
        sorter: true,
        render: (item) => (
          <StyledTableSpan>{convertExponentialToDecimal(item)}</StyledTableSpan>
        ),
      },
      {
        title: "24H | 30D Change",
        dataIndex: "change",
        responsive: ["sm"],
        render: (_, data) => (
          <>
            <StyledTableSpan item={data?.percentChange24hrs}>
              {!data?.percentChange24hrs
                ? 0
                : `${
                    data?.percentChange24hrs > 0 ? "+" : ""
                  } ${data?.percentChange24hrs?.toFixed(2)}`}
              %
            </StyledTableSpan>{" "}
            |{" "}
            <StyledTableSpan item={data?.percentChange30d}>
              {!data?.percentChange30d
                ? 0
                : `${
                    data?.percentChange30d > 0 ? "+" : ""
                  } ${data?.percentChange30d?.toFixed(2)}`}
              %
            </StyledTableSpan>
          </>
        ),
      },
      {
        title: "24H value (USD)",
        dataIndex: "value24hr",
        responsive: ["md"],
        sorter: true,
        render: (value) => {
          return (
            <StyledTableSpan>
              {
                <CurrencyFormat
                  value={value?.toFixed(2) || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => <div>{value}</div>}
                />
              }
            </StyledTableSpan>
          );
        },
      },
      {
        title: "7-Day (price) Trend",
        dataIndex: "trend",
        responsive: ["lg"],
        render: (item, row) => (
          <Minichart item={row?.percentChange24hrs} chartData={item} />
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favTokens, user?.user?.email, setFavToken, filters]);
  const filterTabItems = useMemo(() => {
    return [
      { label: "Holdings", key: "holdings" },
      { label: "Selected", key: "selected" },
      { label: "All", key: "all" },
      { label: "AMM", key: "amm" },
      { label: "Margin", key: "margin" },
      { label: "AI & Big Data", key: "ai&big" },
      { label: "Arbitrum", key: "arbitrum" },
      { label: "DeFi", key: "defi" },
      { label: "Solana", key: "solana" },
      { label: "MEME", key: "meme" },
      { label: "NFT", key: "nft" },
    ];
  }, []);

  const items = useCallback(() => {
    return filterTabItems?.map((item) => {
      return {
        label: <span className="menu-item">{item?.label}</span>,
        key: item?.to,
      };
    });
  }, [filterTabItems]);

  useEffect(() => {
    setTimeout(() => {
      setCoinListDataValue(coinListData);
    }, 1000);
  }, [coinListData]);
  return (
    <MainMarketPageContainer currentTheme={localStorage.getItem("theme")}>
      {(coinListDataLoading || incrementLoading || searchLoading) && (
        <FadeLoader />
      )}
      <Helmet>
        <title>{CoinCardonfig?.APP_NAME}</title>
      </Helmet>
      <div className="market-overview-btn">
        <img
          onClick={() => navigate(ROUTES.MARKETOVERVIEW)}
          src="/Logo/Icons/marketOverview.svg"
          alt="arrow-up"
        />
        <span onClick={() => navigate(ROUTES.MARKETOVERVIEW)}>
          Markets Overview
        </span>
      </div>
      <div className="cards-container">
        <CoinCard data={marketCardsData?.data?.firstCard} />
        <PriceChange data={marketCardsData?.data?.secondCard} />
        <GraphCard
          data={marketCardsData?.data?.thirdCard}
          title="Total Market Cap (USD)"
          marketCap
          up={marketCardsData?.data?.thirdCard?.percentChange > 0}
        />
        <GraphCard
          data={marketCardsData?.data?.fourthCard}
          title="24H value (USD)"
          up={false}
        />
      </div>

      <div className="coins-table-container">
        <div className="table-header-container">
          <p className="table-name">Coin List</p>
          <StyledSearchInput
            size="large"
            placeholder="Search by coin/ token"
            showSearch
            suffixIcon={<AiOutlineSearch />}
            onChange={async (value) => {
              await incrementSearch(value).unwrap();
              navigate(`${ROUTES.COINDETAILS?.replace(":id", value)}`);
            }}
            onSearch={(value) => setSearchValue(value?.toLowerCase())}
            options={searchMarketData}
          />
        </div>
        <div className="table-filter-bar">
          <StyledMenu mode="horizontal" items={items()} />
        </div>
        <div className="myTable">
          <CryptoTable
            columns={columns}
            loading={isFetching || setFavTokenLoading}
            onChange={(pagination, filters, sorter) => {
              setFilters((prev) => {
                return {
                  ...prev,
                  sort:
                    sorter?.field === "value"
                      ? "current_price"
                      : sorter?.field === "value24hr"
                      ? "vol24h"
                      : "market_cap",
                  sortOrder: sorter.order === "descend" ? "desc" : "asc",
                };
              });
            }}
            pagination={false}
            onRow={(item) => {
              return {
                onClick: () => {
                  navigate(ROUTES.COINDETAILS.replace(":id", item?.symbol));
                },
              };
            }}
            dataSource={coinListDataValue?.data?.data}
          />
          <Pagination
            total={coinListDataValue?.data?.pagination?.totalItems}
            showSizeChanger={false}
            defaultPageSize={50}
            style={{ margin: "10px 0px" }}
            pageSize={50}
            className="pagination"
            current={filters?.currentPage}
            onChange={(e) => {
              setFilters((prev) => {
                return {
                  ...prev,
                  currentPage: e,
                };
              });
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </MainMarketPageContainer>
  );
};

export default Main;

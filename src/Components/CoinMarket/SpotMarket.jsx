  import React, { useCallback, useEffect, useRef, useState } from "react";
  import { AiFillStar, AiOutlineSearch } from "react-icons/ai";
  import { useNavigate } from "react-router";
  import CurrencyFormat from "react-currency-format";
  import { StyledSearchInput } from "../../Screens/Market/Market.styles";
  import {
    useGetAllCoinsSpotQuery,
    useGetFavTokensQuery,
    useGetSearchMarketDataQuery,
    useSetFavTokenMutation,
  } from "../../Services/Market";
  import { useGetUserQuery } from "../../Services/Auth";
  import {
    StyledMenuFilters,
    StyledTable,
    StyledTableSpan,
  } from "../../Screens/Spot/Spot.styles";
  import { getRoute } from "../../Constants/state";
  import { ROUTES } from "../../Constants/Routes";
  import FadeLoader from "../FadeLoader/FadeLoader";
  import { useTheme } from "styled-components";
  import { convertExponentialToDecimal } from "../../Utils/common";
  import { useDispatch, useSelector } from "react-redux";
  import { checkIfLogin } from "../../Common/Common";
  import { transactionApi } from "../../Services/Transaction";
  import { BOT } from "../../Enums/Enums";
  import TitleCol from "./Components/Columns/TitleCol";

  const filterSubTabItems = [
    { label: <AiFillStar />, key: "star" },
    { label: "USDT", key: "USDT" },
    { label: "USDC", key: "USDC" },
    { label: "BTC", key: "BTC" },
    { label: "ETH", key: "ETH" },
    { label: "DAI", key: "DAI" },
    { label: "DOT", key: "DOT" },
    { label: "OKB", key: "OKB" },
    { label: "EURT", key: "EURT" },
  ];

  const SpotMarket = ({ setCoinListFilter, trade, apiFilter, setApiFilter }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.global.token);
    const { data: user } = useGetUserQuery(
      {},
      {
        skip: !token,
      }
    );
    const [favMenu, setFavMenu] = useState(null);
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);
    const limit = 20;
    const {
      data: coinList,
      isLoading: allCoinsLoading,
      isFetching: isFetchingCoins,
    } = useGetAllCoinsSpotQuery({
      filter: `${favMenu || apiFilter}`,
      trade,
      page,
      limit,
      email: user?.user?.email,
    });
    const { data: favTokens } = useGetFavTokensQuery(user?.user?.email, {
      skip: !token || !user?.user?.email,
    });
    const [setFavToken] = useSetFavTokenMutation();
    const [searchValue, setSearchValue] = useState(null);
    const { data: searchMarketData, isLoading: searchMarketLoading } =
      useGetSearchMarketDataQuery(
        {
          search: String(searchValue).toUpperCase(),
          quote_asset: apiFilter,
        },
        {
          skip: !searchValue,
        }
      );

    const handleScroll = useCallback(() => {
      const container = containerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage((prev) => prev + 1);
      }
    }, []);

    useEffect(() => {
      if (!checkIfLogin()) dispatch(transactionApi.util.resetApiState());
    }, [dispatch, searchMarketData]);
    // Table columns
    const marketColumns = [
      {
        title: "",
        dataIndex: "",
        width: 20,
        align: "left",
        render: (item, row) => {
          return (
            <TitleCol row={row} favTokens={favTokens} setFavToken={setFavToken} />
          );
        },
      },
      {
        title: "Market",
        dataIndex: "symbol",
        key: "baseAsset",
        width: 120,
        render: (item) => {
          return (
            <span className="logo-span">
              {item}{" "}
              {trade === "swap" && (
                <img src="/Logo/Icons/Perpetual.svg" alt="icon" />
              )}
            </span>
          );
        },
      },
      {
        title: "Price",
        dataIndex: "price",
        align: "center",
        // sorter: true,
        key: "currentPrice",
        render: (item) => (
          <StyledTableSpan item={item}>
            <CurrencyFormat
              value={convertExponentialToDecimal(item)}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <div>{value}</div>}
            />
          </StyledTableSpan>
        ),
      },
      {
        title: "24H Change",
        dataIndex: "percentChange24hrs",
        align: "center",
        key: "percent24Hr",
        render: (item) => (
          <StyledTableSpan item={item}>
            {item ? `${item > 0 ? "+" : ""} ${item?.toFixed(2)}` : "0"}%
          </StyledTableSpan>
        ),
      },
    ];
    const items = (filterTabItems, setApiFilter) => {
      return filterTabItems?.map((item) => {
        return {
          label: (
            <span
              onClick={() => {
                if (item?.key === "star") {
                  setFavMenu("star");
                } else {
                  setFavMenu(null);
                  setApiFilter(item?.key);
                }

                setPage(1);
              }}
              className="menu-item"
            >
              {item?.label}
            </span>
          ),
          key: item?.key,
        };
      });
    };
    // useEffect(() => {
    //   let container;
    //   if (!favMenu) {
    //     container = containerRef?.current;
    //     container?.addEventListener("scroll", handleScroll);
    //   } else {
    //     container?.removeEventListener("scroll", handleScroll);
    //   }

    //   return () => {
    //     container?.removeEventListener("scroll", handleScroll);
    //   };
    // }, [handleScroll, favMenu]);
    return (
      <>
        {searchMarketLoading && <FadeLoader />}

        <div className="input-container">
          <StyledSearchInput
            size="large"
            className="market-input"
            placeholder="Search"
            showSearch
            value={searchValue}
            prefix={<AiOutlineSearch color={theme.colors.black} />}
            onChange={async (value) => {
              sessionStorage.setItem("selectedQuote", apiFilter);
              setCoinListFilter(apiFilter);
              navigate(
                [BOT.MANUAL]?.includes(sessionStorage.getItem("tradeType"))
                  ? `${ROUTES.SPOT}/${value}`
                  : `${ROUTES.SPOT}/${value}`
              );
              setSearchValue(null);
            }}
            onSearch={(value) => setSearchValue(value?.toLowerCase())}
            options={searchMarketData}
          />
        </div>
        <StyledMenuFilters
          selectedKeys={favMenu || apiFilter}
          mode="horizontal"
          items={items(filterSubTabItems, setApiFilter)}
        />
        <StyledTable
          ref={containerRef}
          loading={isFetchingCoins || allCoinsLoading}
          style={{ height: "500px", overflowY: "scroll" }}
          onRow={(record) => {
            const symbolArr = record?.symbol?.split("/");
            return {
              onClick: () => {
                sessionStorage.setItem("selectedQuote", apiFilter);
                setCoinListFilter(symbolArr[1]);
                navigate(
                  [BOT.MANUAL]?.includes(sessionStorage.getItem("tradeType"))
                    ? `${getRoute[trade]}/${symbolArr[0]}`
                    : `${ROUTES.SPOT}/${symbolArr[0]}`
                );
              },
            };
          }}
          pagination={false}
          columns={marketColumns}
          dataSource={coinList?.data?.data}
        />
      </>
    );
  };

  export default SpotMarket;

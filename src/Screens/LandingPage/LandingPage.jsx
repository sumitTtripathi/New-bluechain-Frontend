import { Button, Input } from "antd";
import {
  GradientEffect,
  LandingPageContainer,
  StyledCardsContainer,
  StyledForm,
  StyledLandingPage,
} from "./LandingPage.styles";
import CoinJson from "../../Constants/Coin.json";
import CustomCarousel from "../../Components/CustomCarousel/CustomCarousel";
import { useTranslation } from "react-i18next";
import CryptoCarouselItem from "../../Components/CryptoCarouselItem/CryptoCarouselItem";
import CryptoTable from "../../Components/CryptoTable/CryptoTable";
import MiniChart from "../../Components/MiniChart/MiniChart";
import { useScrollTop } from "../../Hooks/useScrollTop";
import { AiOutlineRight } from "react-icons/ai";
import { Config } from "../../Config";
import {
  capitalizeWord,
  convertExponentialToDecimal,
} from "../../Utils/common";
import MoreServices from "../../Components/MoreServices/MoreServices";
import LandingPageTabs from "../../Components/LandingPageTabs/LandingPageTabs";
import { StyledTableSpan } from "../../GlobalStyles";
import { useSelector } from "react-redux";
import { useGetCoinListQuery } from "../../Services/Market";
import { ROUTES } from "../../Constants/Routes";
import FadeLoader from "../../Components/FadeLoader/FadeLoader";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { StyledFadeLoader } from "../../Components/FadeLoader/FadeLoader.styles";
// settings for horizontal carousel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  arrows: false,
  slidesToScroll: 3,
};

// settings for vertical carousel
const verticalCarouselSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  autoplay: true,
  slidesToScroll: 1,
  arrows: false,
  vertical: true,
  verticalSwiping: true,
};

// Table columns
const columns = [
  {
    title: "Coin",
    key: "name",
    dataIndex: "name",
    render: (coin, item) => {
      return (
        <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <img
            style={{ height: "30px" }}
            src={CoinJson[item?.symbol]}
            alt="crypto-icon"
          />
          <StyledTableSpan>{item?.symbol}</StyledTableSpan>
        </div>
      );
    },
  },
  {
    title: "Price(USD)",
    dataIndex: "value",
    align: "left",
    sorter: true,
    key: "price",
    render: (item) => (
      <StyledTableSpan>{convertExponentialToDecimal(item)}</StyledTableSpan>
    ),
  },
  {
    title: "24H Change",
    align: "center",
    key: "24hchange",
    dataIndex: "change",
    responsive: ["sm"],
    render: (_, data) => (
      <>
        <StyledTableSpan item={data?.percentChange24hrs}>
          {data?.percentChange24hrs > 0
            ? `+${data?.percentChange24hrs?.toFixed(2)}`
            : `${data?.percentChange24hrs?.toFixed(2)}`}
          %
        </StyledTableSpan>
      </>
    ),
  },
  {
    title: "Market Cap (USD)",
    align: "center",
    dataIndex: "market_cap",
    key: "market_cap",
    responsive: ["md"],
    render: (item) => (
      <StyledTableSpan>
        <CurrencyFormat
          value={item?.toFixed(2) || 0}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <div>{value}</div>}
        />
      </StyledTableSpan>
    ),
  },
  // {
  //   title: "Market ",
  //   align: "center",
  //   dataIndex: "trend",
  //   key: "market",
  //   responsive: ["md"],
  //   render: (item, row) => (
  //     <MiniChart item={row?.percentChange24hrs} chartData={item} />
  //   ),
  // },
];

const LandingPage = () => {
  // hook that automatic scroll to top
  useScrollTop();
  const [filters, setFilters] = useState({
    currentPage: 1,
    sort: "market_cap",
    sortOrder: "desc",
  });

  const { t } = useTranslation();
  const [verticalCarouselItems, setVerticalCarouselItems] = useState(5);
  const token = useSelector((state) => state.global.token);
  const {
    data: coinListData,
    isLoading: coinListDataLoading,
    isFetching,
  } = useGetCoinListQuery(filters);

  console.log("---------useGetCoinListQuery---------", coinListData);
  

  const navigate = useNavigate();
  const returnCard = (index) => {
    if (parseInt(index) === 0) {
      return <img key={index} src="/Logo/flyer1.svg" alt="" />;
    }
    if (parseInt(index) === 1) {
      return <img key={index} src="/Logo/flyer2.png" alt="" />;
    }
    if (parseInt(index) === 2) {
      return <img key={index} src="/Logo/flyer3.png" alt="" />;
    }
    if (parseInt(index) === 3) {
      return <img key={index} src="/Logo/flyer1.svg" alt="" />;
    }
    if (parseInt(index) === 4) {
      return <img key={index} src="/Logo/flyer2.png" alt="" />;
    }
    if (parseInt(index) === 5) {
      return <img key={index} src="/Logo/flyer3.png" alt="" />;
    }
  };
  const checkResize = useCallback(() => {
    if (window.innerWidth > 1000) {
      verticalCarouselItems !== 5 && setVerticalCarouselItems(5);
    } else if (window.innerWidth <= 1000 && window.innerWidth > 800) {
      verticalCarouselItems !== 4 && setVerticalCarouselItems(4);
    } else if (window.innerWidth <= 800 && window.innerWidth > 600) {
      verticalCarouselItems !== 3 && setVerticalCarouselItems(3);
    } else if (window.innerWidth <= 600) {
      verticalCarouselItems !== 2 && setVerticalCarouselItems(2);
    }
  }, [verticalCarouselItems]);
  useEffect(() => {
    checkResize();
    window.addEventListener("resize", checkResize);
  }, [verticalCarouselItems, checkResize]);
  return (
    <LandingPageContainer currentTheme={localStorage.getItem("theme")}>
      {coinListDataLoading && <FadeLoader />}
      <StyledLandingPage>
        <h1 className="title main">
          {t("The Global Cryptocurrency Exchange")}
        </h1>
        <p className="subtitle">{t("Making Crypto Trading Easier")}</p>
        <StyledForm currentTheme={localStorage.getItem("theme")}>
          {!token && (
            <Input
              autocomplete="off"
              // disabled  
              placeholder={t("Email Account")}
              className="input"
            />
          )}
          <Button
            onClick={() =>
              token ? navigate(`${ROUTES.SPOT}/BTC`) : navigate(ROUTES.SIGNUP)
            }
            className="register-button"
          >
            {token ? "Trade Now" : t("Register Now")}
          </Button>
        </StyledForm>

        {/* Vertical carousel */}
        <CustomCarousel
          style={{ marginTop: "80px" }}
          render={() => {
            const coinList = coinListData?.data?.data?.slice(0, 10);
            if (!coinListDataLoading && coinList?.length > 0) {
            let updatedArray;
            if (verticalCarouselItems === 3) {
              updatedArray = [
                coinList?.slice(0, verticalCarouselItems),
                coinList?.slice(
                  verticalCarouselItems,
                  verticalCarouselItems + 3
                ),
                coinList?.slice(
                  verticalCarouselItems + 3,
                  verticalCarouselItems + 6
                ),
              ];
            } else if (verticalCarouselItems === 4) {
              updatedArray = [
                coinList?.slice(0, verticalCarouselItems),
                coinList?.slice(
                  verticalCarouselItems,
                  verticalCarouselItems + 4
                ),
              ];
            } else if (verticalCarouselItems === 2) {
              updatedArray = [
                coinList?.slice(0, verticalCarouselItems),
                coinList?.slice(
                  verticalCarouselItems,
                  verticalCarouselItems + 2
                ),
                coinList?.slice(
                  verticalCarouselItems + 2,
                  verticalCarouselItems + 4
                ),
                coinList?.slice(
                  verticalCarouselItems + 4,
                  verticalCarouselItems + 6
                ),
                coinList?.slice(verticalCarouselItems + 6),
              ];
            } else {
              updatedArray = [
                coinList?.slice(0, verticalCarouselItems),
                coinList?.slice(verticalCarouselItems),
              ];
            }

            return updatedArray?.map((item, i) => {
              return <CryptoCarouselItem item={item} key={item?.symbol} />;
            });
          }
          }}
          settings={verticalCarouselSettings}
        />

        {/* Horizontal carousel */}
        <CustomCarousel
          style={{ marginTop: "40px" }}
          settings={settings}
          render={() => {
            return Array(6)
              .fill("6")
              ?.map((_, i) => returnCard(i));
          }}
        />

        {/* Crypto Table Title */}
        <div className="table-title">
          <div>
            <p className="market-title">Market Trend</p>
            <p className="market-subtitle">Crypto market leaderboard express</p>
          </div>
          <div onClick={() => navigate(ROUTES.MARKET)} className="more-icon">
            <span>More</span>
            <AiOutlineRight />
          </div>
        </div>
      </StyledLandingPage>
      {localStorage.getItem("theme") === "light" && <GradientEffect />}
      <CryptoTable
        scroll={{
          y: 350,
        }}
        loading={isFetching}
        onChange={(pagination, filters, sorter) => {
          setFilters((prev) => {
            return {
              ...prev,
              sort: sorter?.field === "value" ? "current_price" : "market_cap",
              sortOrder: sorter.order === "descend" ? "desc" : "asc",
            };
          });
        }}
        pagination={false}
        columns={columns}
        onRow={(item) => {
          return {
            onClick: () => {
              navigate(ROUTES.COINDETAILS.replace(":id", item?.symbol));
            },
          };
        }}
        dataSource={coinListData?.data?.data?.slice(0, 11)}
      />
      <StyledCardsContainer>
        <p className="card-title">
          In {capitalizeWord(Config.APP_NAME)}, Trade With Safety and
          Convenience 
        </p>
        <p className="card-subtitle">
          Delivering crypto trading services to 200+ countries and regions
        </p>
        <div className="cards">
          <div className="images-container">
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("theme") === "light"
                  ? "/Banners/banner4.svg"
                  : "/Banners/banner4Dark.png"
              }
              alt="dummy"
            />
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("theme") === "light"
                  ? "/Banners/banner5.svg"
                  : "/Banners/banner5Dark.svg"
              }
              alt="dummy"
            />
          </div>
          <div className="images-container-reverse">
            <img
              style={{ width: "100%", height: "92%" }}
              src="/Banners/banner6.png"
              alt="dummy"
            />
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("theme") === "light"
                  ? "/Banners/banner7.svg"
                  : "/Banners/banner7Dark.svg"
              }
              alt="dummy"
            />
          </div>
        </div>
      </StyledCardsContainer>

      <LandingPageTabs />

      {/* More Services Section */}
      <MoreServices />

      {/* Explore Section */}
      <div className="explore">
        <div className="background">
          <p className="title" style={{ marginBottom: "56px" }}>
            Explore the Crypto World with {Config.APP_NAME}
          </p>
          <Button
            onClick={() =>
              token ? navigate(`${ROUTES.SPOT}/BTC`) : navigate(ROUTES.SIGNUP)
            }
            className="register-btn"
            type="primary"
          >
            {token ? "Trade Now" : t("Register Now")}
          </Button>
        </div>
      </div>
    </LandingPageContainer>
  );
};

export default LandingPage;

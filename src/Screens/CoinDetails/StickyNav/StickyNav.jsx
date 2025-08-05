import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import { StyledStickyNav } from "./StickyNav.styles";
import { useTheme } from "styled-components";
import { Button } from "antd";
import {
  useGetCoinDetailsDataQuery,
  useGetPriceChangeQuery,
} from "../../../Services/Market";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "../../../Constants/Routes";
import { convertExponentialToDecimal } from "../../../Utils/common";
import CurrencyFormat from "react-currency-format";

const StickyNav = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { data: priceChangeDetails } = useGetPriceChangeQuery(
    id?.toUpperCase()
  );
  const { data: coinDetails } = useGetCoinDetailsDataQuery(id?.toUpperCase());
  const navigate = useNavigate();
  return (
    <StyledStickyNav
      marketUp={
        priceChangeDetails?.data?.["percentChange24hrs"]?.toFixed(2) > 0
      }
    >
      <div className="coin-img-container">
        <img src={coinDetails?.data?.data?.logo} alt="coin" />
        <p className="coin-name">{coinDetails?.data?.data?.name}</p>
        <span className="rating">No. 1</span>
      </div>
      <div className="right">
        <p className="latest-price-label">
          {coinDetails?.data?.data?.name || "null"} Latest Price
        </p>
        <div className="row">
          <div className="row-left">
            <span className="price">
              <CurrencyFormat
                value={convertExponentialToDecimal(
                  coinDetails?.data?.cl?.current_price
                )}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </span>
            <span className="currency">USD</span>
            <div className="market-perc">
              {priceChangeDetails?.data?.["percentChange24hrs"] ? (
                <RxTriangleUp color={theme.colors.white} />
              ) : (
                <RxTriangleDown color={theme.colors.white} />
              )}
              <span>
                {priceChangeDetails?.data?.["percentChange24hrs"]?.toFixed(2) ||
                  0}
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
      </div>
    </StyledStickyNav>
  );
};

export default StickyNav;

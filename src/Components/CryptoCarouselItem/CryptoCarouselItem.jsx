import {
  StyledCryptoCarouselItem,
  StyledSingleCryptoCard,
} from "./CryptoCarouselItem.styles";
import CoinJson from "../../Constants/Coin.json";
import { useNavigate } from "react-router";
import { ROUTES } from "../../Constants/Routes";
import { convertExponentialToDecimal } from "../../Utils/common";
import CurrencyFormat from "react-currency-format";

const SingleCryptoCard = ({ className, data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${ROUTES.SPOT}/${data?.symbol}`)}
      className={className}
    >
      <StyledSingleCryptoCard percentage={data?.percentChange24hrs}>
        <div className="card-first-row">
          <div className="crypto-details">
            <img
              src={CoinJson[data?.symbol]}
              className="crypto-icon"
              alt="crypto-icon"
            />
            <span className="crypto-name">{data?.symbol}</span>
          </div>
          <span className="percentage">
            {data?.percentChange24hrs?.toFixed(2)}%
          </span>
        </div>
        <div>
          <p className="price">{convertExponentialToDecimal(data?.value)}</p>
          <div className="price-layer-container">
            <img alt="price-layer" src="/Logo/Icons/pricelayer.svg" />
            <span>
              {" "}
              <CurrencyFormat
                value={data?.value24hr?.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </span>
          </div>
        </div>
      </StyledSingleCryptoCard>
      <img
        src="/Logo/Icons/breakline.svg"
        className="break-line"
        alt="breakline"
      />
    </div>
  );
};

const CryptoCarouselItem = ({ item }) => {
  return (
    <StyledCryptoCarouselItem className="my-outer-card-container">
      {item?.map((data, i) => {
        return (
          <SingleCryptoCard key={item?.symbol} data={data} className="test" />
        );
      })}
    </StyledCryptoCarouselItem>
  );
};

export default CryptoCarouselItem;

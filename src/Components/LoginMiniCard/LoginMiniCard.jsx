import Minichart from "../MiniChart/MiniChart";
import { StyledLoginMiniContainer } from "./LoginMiniCard.styles";
import CoinJson from "../../Constants/Coin.json";
import { StyledTableSpan } from "../../GlobalStyles";
import CurrencyFormat from "react-currency-format";

const LoginMiniCard = ({ item }) => {
  return (
    <StyledLoginMiniContainer>
      <div className="first-row">
        <div className="coin-details">
          <img
            className="coin-icon"
            src={CoinJson[item?.symbol]}
            alt="bitcoin"
          />
          <span className="coin-name">{item?.symbol}</span>
        </div>
        <div>
          <Minichart
            background="extraLight"
            chartData={item?.trend}
            marginLeft="8px"
            width="50px"
            item={item?.percentChange24hrs}
            height="40px"
          />
        </div>
      </div>
      <div className="market-details">
        <StyledTableSpan
          style={{ fontWeight: 400 }}
          item={item?.percentChange24hrs}
        >
          <CurrencyFormat
            value={item?.value}
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value) => <div>{value}</div>}
          />
        </StyledTableSpan>
        <StyledTableSpan
          style={{ fontWeight: 400 }}
          item={item?.percentChange24hrs}
        >
          {item?.percentChange24hrs > 0
            ? `+${item?.percentChange24hrs?.toFixed(2)}`
            : `${item?.percentChange24hrs?.toFixed(2)}`}
          %
        </StyledTableSpan>
      </div>
    </StyledLoginMiniContainer>
  );
};

export default LoginMiniCard;

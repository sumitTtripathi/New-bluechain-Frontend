import { useNavigate } from "react-router";
import { ROUTES } from "../../../Constants/Routes";
import { StyledTableSpan } from "../../../GlobalStyles";
import { CardContainer, StyledCardTable } from "../MarketOverview.styles";
import CoinJson from "../../../Constants/Coin.json";
import { convertExponentialToDecimal } from "../../../Utils/common";
import CurrencyFormat from "react-currency-format";

const columns = [
  {
    title: "Coin",
    dataIndex: "token",
    render: (coin) => {
      return (
        <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <img
            style={{ height: "20px", width: "20px" }}
            src={CoinJson[coin]}
            alt="crypto-icon"
          />
          <StyledTableSpan>{coin}</StyledTableSpan>
        </div>
      );
    },
  },
  {
    title: "Price(USD)",
    align: "center",
    dataIndex: "currentPrice",
    render: (item) => {
      return (
        <CurrencyFormat
          value={convertExponentialToDecimal(item)}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => <div>{value}</div>}
        />
      );
    },
  },
  {
    title: "24H Change",
    align: "center",
    dataIndex: "percentChange24hrs",
    render: (item) => (
      <StyledTableSpan item={item}>
        {item > 0 ? `+${item?.toFixed(2)}` : `${item?.toFixed(2)}`}%
      </StyledTableSpan>
    ),
  },
];

const Card = ({ title, data }) => {
  const navigate = useNavigate();
  return (
    <CardContainer bordered={false}>
      <p className="title">{title}</p>
      <StyledCardTable
        onRow={(item) => {
          return {
            onClick: () => {
              navigate(ROUTES.COINDETAILS.replace(":id", item?.token));
            },
          };
        }}
        pagination={false}
        columns={columns}
        dataSource={data}
      />
    </CardContainer>
  );
};

export default Card;

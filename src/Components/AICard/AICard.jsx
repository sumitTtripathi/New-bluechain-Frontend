import MiniChart from "../MiniChart/MiniChart";
import { AICardContainer } from "./AICard.style";
import { Button } from "antd";

const AICard = ({ data, dashboard, setAICardCopyOpen, setActiveTab }) => {
  const chartData = [
    { time: "12:00 AM", value: 100 },
    { time: "3:00 AM", value: 120 },
    { time: "6:00 AM", value: 90 },
    { time: "9:00 AM", value: 110 },
    { time: "12:00 PM", value: 80 },
    { time: "3:00 PM", value: 100 },
    { time: "6:00 PM", value: 130 },
    { time: "9:00 PM", value: 150 },
    { time: "12:00 AM", value: 120 },
  ];
  const item = {
    percentChange24hrs: -5, // Sample percentage change value for the last 24 hours (can be positive or negative)
    symbol: "XYZ", // Sample symbol or name associated with the data
    currency: "USD", // Sample currency in which the data is represented
  };

  return (
    <AICardContainer>
      <div className="row">
        <img className="" src={data?.tradeImg} alt="icon" />
        <span className="ai-title">{data?.title}</span>
      </div>
      <div className="people-row">
        <span className="cartegory-btn">{data?.category}</span>
        {dashboard && (
          <>
            <span className="cartegory-btn">{data?.categoryOne}</span>
            <span className="cartegory-btn">{data?.categoryTwo}</span>
          </>
        )}
        <div className="row">
          <img className="people-img" src="/Logo/Icons/people.svg" alt="icon" />
          <div className="ai-title">{data?.count}</div>
        </div>
      </div>
      <div className="graph-row">
        <div>
          <div className="percentage green">{data?.percentage}%</div>
          <div>PnL %</div>
        </div>
        <MiniChart
          background="extraLight"
          chartData={chartData}
          marginLeft="8px"
          width="100px"
          item={item?.percentChange24hrs}
          height="60px"
        />
      </div>
      <div className="graph-row">
        <div>
          <div className="percentage">{data?.period}</div>
          <div className="font-grey">Suggested Period</div>
        </div>
        <div>
          <div className="percentage">{data?.percentage}%</div>
          <div className="font-grey">Max drawdown</div>
        </div>
      </div>
      <div className="graph-row">
        <div className="graph-row">
          <img className="" src={data?.tradeImg} alt="icon" />
          <div className="font-grey">{data?.token}</div>
        </div>
        <div>
          <Button
            className="copy-btn"
            onClick={() => {
              setAICardCopyOpen(true);
              setActiveTab("2");
            }}
          >
            Copy
          </Button>
        </div>
      </div>
    </AICardContainer>
  );
};

export default AICard;

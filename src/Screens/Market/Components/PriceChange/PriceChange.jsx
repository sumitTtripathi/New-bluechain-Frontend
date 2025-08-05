import { Divider, Progress } from "antd";
import { CoinCardContainer } from "../../Market.styles";

const PriceChange = ({ data }) => {
  const currentTheme = localStorage.getItem("theme") || "light";
  const upPercentage = isNaN(
    Number((data?.up / (data?.down + data?.up)) * 100)?.toFixed(0)
  )
    ? 0
    : Number((data?.up / (data?.down + data?.up)) * 100)?.toFixed(0);

  return (
    <CoinCardContainer currentTheme={currentTheme}>
      <h2 class="card-title">24H Price Change</h2>
      <Divider className="divider" />
        <div class="price-stats">
          <div class="price-column">
            <div class="price-value">
              <span class="up-arrow">
                <img src="/Logo/Icons/priceup.svg" alt="price-up" />
              </span>
              {data?.up}
            </div>
            <div class="price-label">Price up</div>
          </div>
          <div class="price-column">
            <div class="price-value">
              <span class="down-arrow">
                {" "}
                <img src="/Logo/Icons/pricedown.svg" alt="price-down" />
              </span>
              {data?.down}
            </div>
            <div class="price-label">Price down</div>
          </div>
          <Progress
            className="circular-progress"
            type="circle"
            percent={upPercentage}
            width={47}
            strokeWidth={10}
            strokeColor="#3094EA"
          />
        </div>
    </CoinCardContainer>
  );
};

export default PriceChange;

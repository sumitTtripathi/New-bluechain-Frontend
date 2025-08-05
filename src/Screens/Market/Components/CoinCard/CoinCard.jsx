import { Divider } from "antd"
import { CoinCardContainer } from "../../Market.styles"

const CoinCard = ({ data }) => {
  const currentTheme = localStorage.getItem("theme") || "light"

  return (
    <CoinCardContainer currentTheme={currentTheme}>
      <p className="card-title">Coins</p>
      <Divider className="divider" />
      <div className="card-details">
        <div className="coin-details-container">
          <p className="coin-number">{data}</p> 
          <img src="/Logo/Icons/sphere.svg" alt="sphere" />
        </div>
        <p className="desc">Listed Cryptos</p>
      </div>
    </CoinCardContainer>
  )
}

export default CoinCard

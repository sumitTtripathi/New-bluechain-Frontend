import coinJson from "../../Constants/Coin.json";
import { leverages } from "../../Constants/state";
import { Input } from "antd";
import { useState } from "react";
import lodash from "lodash";
import {
  LogoInfo,
  ModalContainer,
} from "../AdvancedTradeHeader/AdvancedTradeHeader.style";
const LeverageModal = ({
  title,
  leverageMode,
  leverage,
  setLeverage,
  isModalOpen,
  setIsModalOpen,
  baseAsset,
  quoteAsset,
}) => {
  const [leverageValue, setLeverageValue] = useState(leverage);
  const [cautionMessage, setCautionMessage] = useState("");
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  return (
    <ModalContainer
      title={<div className="t-header">{title}</div>}
      open={isModalOpen}
      onOk={() => {
        setLeverage(leverageValue);
        setIsModalOpen(false);
      }}
      okText={"Confirm"}
      onCancel={() => {
        setLeverageValue(leverage);
        setIsModalOpen(false);
      }}
    >
      <div className="body-container">
        <LogoInfo>
          <img src={coinJson[baseAsset]} />
          <div className="standard-black">
            {baseAsset} {quoteAsset} Perpetual
          </div>
        </LogoInfo>
        <div className="standard-black">Leverage</div>
        <div>
          <Input
            className="lev-field"
            autocomplete="off"
            type="number"
            value={leverageValue}
            onChange={(e) => {
              if (e.target.value <= 0) {
                setError({
                  isError: true,
                  message: "Enter valid leverage",
                });
                setLeverageValue("");
                return;
              } else if (e.target.value > 125) {
                setLeverageValue(125);
              } else {
                setLeverageValue(e.target.value);
              }
              if (e.target.value >= 20) {
                setCautionMessage("High leverage. Please trade with caution");
              } else {
                setCautionMessage("");
              }
              setError({
                isError: false,
                message: "",
              });
            }}
          />
          {error?.isError && <div className="error-text">{error?.message}</div>}
        </div>
        <div className="tab-wrapper">
          {leverages?.map((item) => (
            <div
              onClick={() => {
                setLeverageValue(Number(item).toFixed(2));
                setError({
                  isError: false,
                  message: "",
                });
              }}
              key={item}
              className="tab-wrapper-item"
            >
              {item}x
            </div>
          ))}
        </div>
        {cautionMessage && <div className="error-text">{cautionMessage}</div>}
        <div className="label">
          Be aware of leverage management to mitigate liquidation risk for your
          bot
        </div>
      </div>
    </ModalContainer>
  );
};

export default LeverageModal;

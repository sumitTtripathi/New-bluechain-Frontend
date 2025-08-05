import { LogoInfo, ModalContainer } from "./AdvancedTradeHeader.style";
import coinJson from "../../Constants/Coin.json";
import { leverages, tradeType } from "../../Constants/state";
import { Input } from "antd";
import { useState } from "react";
import { useSetLeverageMutation } from "../../Services/Transaction";
import { toast } from "react-toastify";
import lodash from "lodash";
const LeverageModal = ({
  title,
  leverageMode,
  leverage,
  isModalOpen,
  setIsModalOpen,
  baseAsset,
  quoteAsset,
}) => {
  const [leverageValue, setLeverageValue] = useState(leverage);
  const [setLeverage, { isLoading }] = useSetLeverageMutation();
  const [cautionMessage, setCautionMessage] = useState("");
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  return (
    <ModalContainer
      title={<div className="t-header">{title}</div>}
      open={isModalOpen}
      onOk={async () => {
        try {
          const formObj = {};
          if (leverageMode === "Isolated") {
            formObj.posSide = "long";
          }
          await setLeverage({
            symbol: `${baseAsset}${quoteAsset}`,
            leverage: parseInt(leverageValue).toString(),
            // mgnMode: String(leverageMode).toLowerCase(),
            ...formObj,
          }).unwrap();
          setIsModalOpen(false);
        } catch (e) {
          toast.error(e?.data?.message);
        }
      }}
      okText={"Confirm"}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      confirmLoading={isLoading}
    >
      <div className="body-container">
        <LogoInfo>
          <img src={coinJson[baseAsset]} />
          <div>
            {baseAsset} {quoteAsset} Perp
          </div>
          <div className="mode">{leverageMode || "Cross"}</div>
        </LogoInfo>
        <div className="standard-black">Leverage</div>
        <div>
          <Input
            className="lev-field"
            autocomplete="off"
            value={leverageValue}
            onChange={(e) => {
              if (lodash.isNaN(Number(e.target.value))) {
                setLeverageValue("");
                return;
              }
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
      </div>
    </ModalContainer>
  );
};

export default LeverageModal;

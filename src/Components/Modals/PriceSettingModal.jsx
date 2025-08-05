import { useState } from "react";
import RadioText from "../Radio/RadioText";
import { ModalContainer } from "../PerpetualTrading/SpotTrading.styles";

const PriceSettingModal = ({
  priceSetting,
  setPriceSetting,
  title,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [value, setValue] = useState("price");
  return (
    <ModalContainer
      title={<div className="t-header">{title}</div>}
      className="price-modal"
      open={isModalOpen}
      onOk={() => {
        setPriceSetting(value);
        setIsModalOpen(false);
      }}
      okText={"Confirm"}
      onCancel={() => {
        setIsModalOpen(false);
        setValue(priceSetting);
      }}
    >
      <RadioText
        selected={value === "price"}
        onChange={() => {
          setValue("price");
        }}
        text={
          "Set TP/SL trigger price based on increase/decrease relative to the contract order price"
        }
        label={"Price"}
        group={"trigger"}
      />
      <RadioText
        selected={value === "PnL"}
        onChange={() => {
          setValue("PnL");
        }}
        text={"Set TP/SL trigger price based on estimated PnL"}
        label={"PnL"}
        group={"trigger"}
      />
      <RadioText
        selected={value === "PnL%"}
        onChange={() => {
          setValue("PnL%");
        }}
        text={"Set TP/SL trigger price based on estimated PnL%"}
        label={"PnL%"}
        group={"trigger"}
      />
    </ModalContainer>
  );
};

export default PriceSettingModal;

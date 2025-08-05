import { Modal, Tabs } from "antd";
import React from "react";
import PnLTab from "./CalculatorTabs/PnLTab";
import TargetPrice from "./CalculatorTabs/TargetPrice";
import LiquidationPrice from "./CalculatorTabs/LiquidationPrice";
import AvgOpenPrice from "./CalculatorTabs/AvgOpenPrice";
import { StyledCalculatorModal } from "./AdvancedCalculatorModal.style";
const AdvancedCaculatorModal = ({
  isModalOpen,

  setIsModalOpen,
  baseAsset,
  quoteAsset,
}) => {
  const MODAL_ITEMS = [
    {
      key: "1",
      label: `PnL`,
      children: <PnLTab baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
    {
      key: "2",
      label: `Target price`,
      children: <TargetPrice baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },

    {
      key: "3",
      label: `Liquidation price`,
      children: (
        <LiquidationPrice baseAsset={baseAsset} quoteAsset={quoteAsset} />
      ),
    },
    {
      key: "4",
      label: `Avg open price`,
      children: <AvgOpenPrice baseAsset={baseAsset} quoteAsset={quoteAsset} />,
    },
  ];
  return (
    <StyledCalculatorModal
      title=""
      className="calculator-modal"
      width={900}
      open={isModalOpen}
      footer={null}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <Tabs className="orders-tabs" defaultActiveKey="1" items={MODAL_ITEMS} />
    </StyledCalculatorModal>
  );
};

export default AdvancedCaculatorModal;

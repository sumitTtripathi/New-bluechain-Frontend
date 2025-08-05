import { Dropdown } from "antd";
import React, { useState } from "react";
import { AdvancedTradeHeaderContainer } from "./AdvancedTradeHeader.style";
import { BiChevronDown } from "react-icons/bi";
import LeverageModal from "./LeverageModal";

const AdvancedTradeHeader = ({
  quoteAsset,
  baseAsset,
  leverage,
  leverageMode,
  setLeverageMode,
}) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const []

  const handleMenuClick = (e) => {
    setLeverageMode(e.key);
    localStorage.setItem("mgnMode", e.key);
    setOpen(false);
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  const items = [
    {
      label: "Cross",
      key: "Cross",
    },
    {
      label: "Isolated",
      key: "Isolated",
    },
  ];
  return (
    <AdvancedTradeHeaderContainer>
      <div className="w-half">
        <Dropdown
          menu={{
            items,
            onClick: handleMenuClick,
          }}
          onOpenChange={handleOpenChange}
          open={open}
        >
          <a className="item-center" onClick={(e) => e.preventDefault()}>
            {leverageMode} <BiChevronDown size={20} />
          </a>
        </Dropdown>
      </div>
      <div onClick={() => setIsModalOpen(true)} className="w-half">
        {Number(leverage).toFixed(2)}x
      </div>
      <LeverageModal
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={"Adjust leverage"}
        leverage={leverage}
        leverageMode={leverageMode}
        // setLeverage={setLeverage}
      />
    </AdvancedTradeHeaderContainer>
  );
};

export default AdvancedTradeHeader;

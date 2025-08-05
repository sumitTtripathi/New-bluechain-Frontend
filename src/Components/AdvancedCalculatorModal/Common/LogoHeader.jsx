import React, { useState } from "react";
import { LogoContainer } from "./AdvancedCalculatorModal.style";
import CoinJson from "../../Constants/Coin.json";
import { Dropdown } from "antd";
import { BiChevronDown } from "react-icons/bi";
import SearchBar from "./SearchBar";

const LogoHeader = ({ baseAsset, quoteAsset }) => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  const items = [
    {
      label: <SearchBar />,
      key: "1",
    },
  ];

  return (
    <LogoContainer>
      <img className="logo" src={CoinJson[baseAsset]} alt="icon" />
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        onOpenChange={handleOpenChange}
        open={open}
      >
        <a className="title" onClick={(e) => e.preventDefault()}>
          {baseAsset} {quoteAsset} PERP <BiChevronDown />
        </a>
      </Dropdown>
    </LogoContainer>
  );
};

export default LogoHeader;

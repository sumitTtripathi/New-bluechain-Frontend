import React, { useState } from "react";
import FormInput from "./FormInput";
import FormInputSelect from "./FormInputSelect";
import {
  ManualTradingContainer,
  FlexColumn,
  FlexRow,
  TextBlack,
} from "./ManualTrading.style";
import { StyledSlider } from "../../Screens/Spot/SpotTrading/SpotTrading.styles";
import { useTheme } from "styled-components";
import { marks } from "../../Constants/state";
import MaxSell from "../MaxSell/MaxSell";
import ActionButton from "../ActionButton/ActionButton";
import { Collapse } from "antd";
import AdvancedManualTrading from "./AdvancedManualTrading";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";

const MODE_OPTION = [
  {
    value: "Geometric",
    label: "Geometric",
  },
  {
    value: "Arithmetic",
    label: "Arithmetic",
  },
];

const ManualTrading = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const [menu, setMenu] = useState("");
  const [mode, setMode] = useState("Arithmetic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const MENUITEMS = [
    {
      key: "1",
      label: "Advanced settings",
      children: (
        <AdvancedManualTrading baseAsset={baseAsset} quoteAsset={quoteAsset} />
      ),
    },
  ];
  const INVESTMENT_OPTION = [
    {
      value: baseAsset,
      label: baseAsset,
    },
    {
      value: quoteAsset,
      label: quoteAsset,
    },
    {
      value: `${baseAsset} + ${quoteAsset}`,
      label: `${baseAsset} + ${quoteAsset}`,
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleOpenSuccess = () => {
    setSuccessModalOpen(true);
  };
  const handleCancelSuccess = () => {
    setSuccessModalOpen(false);
  };
  return (
    <ManualTradingContainer>
      <FlexColumn>
        <FlexRow>
          <TextBlack>1. Price range </TextBlack>
          <TextBlack>Trading up</TextBlack>
        </FlexRow>
        <FormInput prefix="Lower Limit" asset={quoteAsset} />
        <FormInput prefix="Upper Limit" asset={quoteAsset} />
      </FlexColumn>
      <FlexColumn>
        <FlexRow>
          <TextBlack>2. Grid mode and quantity</TextBlack>
        </FlexRow>
        <FormInputSelect
          selectValue={mode}
          setSelectValue={setMode}
          selectOption={MODE_OPTION}
        />
        <FormInput prefix="Quantity" asset="Grids" />
        <div className="small-text font-grey">Profit per grid --</div>
      </FlexColumn>
      <FlexColumn>
        <FlexRow>
          <TextBlack>3. Investment amount</TextBlack>
        </FlexRow>
        <FormInputSelect
          selectValue={{}}
          setSelectValue={() => {}}
          selectOption={INVESTMENT_OPTION}
        />
        <FormInput prefix="Investment Amount" asset={baseAsset} />
      </FlexColumn>
      <StyledSlider
        up={true}
        trackStyle={{ background: theme.colors.marketUp }}
        className="slider"
        railStyle={{ background: theme.colors.grey.sliderTrack }}
        marks={marks}
        step={1}
        onChange={() => {}}
      />
      <MaxSell balance={0} asset={quoteAsset} />
      <Collapse
        showArrow={false}
        expandIcon={() => false}
        activeKey={menu}
        className="my-collapse"
        items={MENUITEMS}
        onChange={() => {
          setMenu((prevState) => (!prevState ? "1" : ""));
        }}
      />
      <ActionButton
        user={""}
        isPlacingOrder={false}
        handleOpen={handleOpen}
        buttonLabel="Create"
      />
      <ConfirmationModal
        handleOk={() => {}}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        handleOpenSuccess={handleOpenSuccess}
      />
      <SuccessModal
        handleOk={() => {}}
        handleCancel={handleCancelSuccess}
        isModalOpen={successModalOpen}
      />
    </ManualTradingContainer>
  );
};

export default ManualTrading;

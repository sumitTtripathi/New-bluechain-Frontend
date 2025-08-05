import React from "react";
import FormInput from "./FormInput";
import FormInputSelect from "./FormInputSelect";
import {
  ManualTradingContainer,
  FlexColumn,
  FlexRow,
  TextBlack,
} from "./ManualTrading.style";
import { Checkbox } from "antd";

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

const AdvancedManualTrading = ({ baseAsset, quoteAsset }) => {
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

  return (
    <ManualTradingContainer>
      <FlexColumn>
        <FlexRow>
          <TextBlack>1. Trailing settings</TextBlack>
        </FlexRow>
        <Checkbox>Trailing up</Checkbox>
        <FormInput prefix={"Trailing up limit"} asset={quoteAsset} />
        <Checkbox>Trailing Down</Checkbox>
        <FormInput prefix={"Trailing down limit"} asset={quoteAsset} />

        <FormInput prefix="Upper Limit" asset={quoteAsset} />
      </FlexColumn>
      <FlexColumn>
        <FlexRow>
          <TextBlack>2. Start condition</TextBlack>
        </FlexRow>
        <FormInputSelect
          selectValue={{}}
          setSelectValue={() => {}}
          selectOption={MODE_OPTION}
        />
      </FlexColumn>
      <FlexColumn>
        <FlexRow>
          <TextBlack>3. Stop condition</TextBlack>
        </FlexRow>
        <FormInputSelect
          selectValue={{}}
          setSelectValue={() => {}}
          selectOption={INVESTMENT_OPTION}
        />
        <Checkbox>Sell all once bot stops</Checkbox>
      </FlexColumn>
    </ManualTradingContainer>
  );
};

export default AdvancedManualTrading;

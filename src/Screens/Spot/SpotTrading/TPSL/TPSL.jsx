import { TabContainer } from "../SpotTrading.styles";
import { AdvancedContainer } from "../../Spot.styles";
import { useState } from "react";
import DropDown from "./DropDown";
import OCO from "./OCO/OCO";
import Conditional from "./Conditional";
const TPSL = ({ baseAsset, quoteAsset }) => {
  const [advancedBuyValue, setAdvanceBuydValue] = useState("conditional");
  return (
    <>
      <AdvancedContainer>
        <span>Advanced : </span>
        <DropDown
          advancedValue={advancedBuyValue}
          setAdvancedValue={setAdvanceBuydValue}
        />
      </AdvancedContainer>
      <TabContainer>
        {advancedBuyValue === "conditional" && (
          <Conditional baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )}
        {advancedBuyValue === "oco" && (
          <OCO baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )}
      </TabContainer>
    </>
  );
};

export default TPSL;

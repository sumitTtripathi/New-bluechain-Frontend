import { TabContainer } from "../SpotTrading.styles";
import { AdvancedContainer, FeesContainer } from "../../Spot.styles";
import { useState } from "react";
import Conditional from "./Conditional";
import DropDown from "./DropDown";
import Trigger from "./Trigger";
import TrailStop from "./TrailStop";

const AdvancedMarketOrders = ({ baseAsset, quoteAsset }) => {
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
        {advancedBuyValue === "Trigger" && (
          <Trigger baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )}
        {advancedBuyValue === "Trail" && (
          <TrailStop baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )}
        <FeesContainer>
          <span>%</span>
          Fees
        </FeesContainer>
      </TabContainer>
    </>
  );
};

export default AdvancedMarketOrders;

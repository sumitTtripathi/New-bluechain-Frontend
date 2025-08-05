import { TabContainer } from "../SpotTrading.styles";
import { AdvancedContainer } from "../../Spot.styles";
import { useState } from "react";
import DropDown from "./DropDown";
import TrailStop from "./TrailStop";
import AdvancedLimit from "./AdvancedLimit";
const ORDER_TYPE = {
  FOK: "fok",
  "Post Only": "post_only",
  IOC: "ioc",
};
const AdvancedOrders = ({ baseAsset, quoteAsset }) => {
  const [advancedBuyValue, setAdvanceBuydValue] = useState("IOC");
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
        {advancedBuyValue === "Trail" && (
          <TrailStop baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )}
        {["FOK", "Post Only", "IOC"].includes(advancedBuyValue) && (
          <AdvancedLimit
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            orderType={ORDER_TYPE[advancedBuyValue]}
          />
        )}
      </TabContainer>
    </>
  );
};

export default AdvancedOrders;

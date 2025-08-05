import { TabContainer } from "../SpotTrading.styles";
import { AdvancedContainer } from "../../Spot.styles";
import { useState } from "react";
// import Conditional from "./Conditional";
import DropDown from "./DropDown";
// import Trigger from "./Trigger";
import TrailStop from "./TrailStop";
import AdvancedLimit from "./AdvancedLimit";
const ORDER_TYPE = {
  FOK: "fok",
  "Post Only": "post_only",
  IOC: "ioc",
  LIMIT: "limit",
  MARKET: "market",
  STOP_LOSS: "stop_loss",
  STOP_LOSS_LIMIT: "stop_loss_limit",
  TAKE_PROFIT: "take_profit",
  TAKE_PROFIT_LIMIT: "take_profit_limit",
  LIMIT_MAKER: "limit_maker",
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
        {/* {advancedBuyValue === "conditional" && (
 ,l,ll,l          <Conditional baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )} */}
        {/* {advancedBuyValue === "Trigger" && (
          <Trigger baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )} */}
        {advancedBuyValue === "Trail" && (
          <TrailStop baseAsset={baseAsset} quoteAsset={quoteAsset} />
        )}
        {[
          "FOK",
          "Post Only",
          "IOC",
          "LIMIT",
          "MARKET",
          "STOP_LOSS",
          "STOP_LOSS_LIMIT",
          "TAKE_PROFIT",
          "TAKE_PROFIT_LIMIT",
          "LIMIT_MAKER",
        ].includes(advancedBuyValue) && (
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

import { TabContainer } from "../SpotTrading.styles";
import { useState, useEffect } from "react";
import DropDown from "./DropDown";
import AdvancedLimit from "./AdvancedLimit";
import { AdvancedContainer } from "../../../Screens/Spot/Spot.styles";
import { setSelectedTab } from "../../../Services/Auth";
import { useDispatch } from "react-redux";
const ORDER_TYPE = {
  FOK: "fok",
  "Post Only": "post_only",
  IOC: "ioc",
};
const AdvancedOrders = ({ baseAsset, quoteAsset, leverageMode, leverage }) => {
  const dispatch = useDispatch();
  const [advancedBuyValue, setAdvanceBuydValue] = useState("IOC");
  useEffect(() => {
    dispatch(setSelectedTab("advancedLimit"));
  }, []);
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
        <AdvancedLimit
          leverageMode={leverageMode}
          baseAsset={baseAsset}
          leverage={leverage}
          quoteAsset={quoteAsset}
          orderType={ORDER_TYPE[advancedBuyValue]}
        />
      </TabContainer>
    </>
  );
};

export default AdvancedOrders;

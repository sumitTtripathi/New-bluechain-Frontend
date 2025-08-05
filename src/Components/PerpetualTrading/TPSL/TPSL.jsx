import { TabContainer } from "../SpotTrading.styles";
import { useState, useEffect } from "react";
import DropDown from "./DropDown";
import OCO from "./OCO/OCO";
import Conditional from "./Conditional";
import { AdvancedContainer } from "../../../Screens/Spot/Spot.styles";
import { setSelectedTab } from "../../../Services/Auth";
import { useDispatch } from "react-redux";
const TPSL = ({ baseAsset, quoteAsset, leverageMode, leverage }) => {
  const dispatch = useDispatch();
  const [advancedBuyValue, setAdvanceBuydValue] = useState("conditional");
  useEffect(() => {
    dispatch(setSelectedTab("TPSL"));
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
        {advancedBuyValue === "conditional" && (
          <Conditional
            leverageMode={leverageMode}
            leverage={leverage}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
          />
        )}
        {advancedBuyValue === "oco" && (
          <OCO
            leverage={leverage}
            leverageMode={leverageMode}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
          />
        )}
      </TabContainer>
    </>
  );
};

export default TPSL;

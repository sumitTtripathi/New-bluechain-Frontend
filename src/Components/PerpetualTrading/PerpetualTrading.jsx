import { useState } from "react";
import LimitTab from "./LimitTab/LimitTab";
import MarketTab from "./MarketTab/MarketTab";
import {
  CalContainer,
  SpotTradingContainer,
  SpotTradingTabs,
} from "./SpotTrading.styles";
import AdvancedOrders from "./StopLimit/AdvancedOrders";
import TPSL from "./TPSL/TPSL";
import TrailStop from "./TrailStop/TrailStop";
import { AiOutlineCalculator } from "react-icons/ai";
import AdvancedCaculatorModal from "../AdvancedCalculatorModal/AdvancedCalculatorModal";
import { useTheme } from "styled-components";
const tabItems = (baseAsset, quoteAsset, leverage, leverageMode) => {
  return [
    {
      key: "1",
      label: `Limit`,
      children: (
        <LimitTab
          baseAsset={baseAsset}
          quoteAsset={quoteAsset}
          leverage={leverage}
          leverageMode={leverageMode}
        />
      ),
    },
    {
      key: "2",
      label: `Market`,
      children: (
        <MarketTab
          baseAsset={baseAsset}
          quoteAsset={quoteAsset}
          leverage={leverage}
          leverageMode={leverageMode}
        />
      ),
    },
    // {
    //   key: "3",
    //   label: `Advanced-Limit`,
    //   children: (
    //     <AdvancedOrders
    //       baseAsset={baseAsset}
    //       quoteAsset={quoteAsset}
    //       leverage={leverage}
    //       leverageMode={leverageMode}
    //     />
    //   ),
    // },
    // {
    //   key: "4",
    //   label: `Trail Stop`,
    //   children: (
    //     <TrailStop
    //       baseAsset={baseAsset}
    //       quoteAsset={quoteAsset}
    //       leverage={leverage}
    //       leverageMode={leverageMode}
    //     />
    //   ),
    // },
    // {
    //   key: "5",
    //   label: `TP/SL`,
    //   children: (
    //     <TPSL
    //       baseAsset={baseAsset}
    //       quoteAsset={quoteAsset}
    //       leverage={leverage}
    //       leverageMode={leverageMode}
    //     />
    //   ),
    // },
  ];
};
const PerpetualTrading = ({
  leverageMode,
  leverage,
  baseAsset,
  quoteAsset,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  return (
    <>
      <SpotTradingContainer>
        <SpotTradingTabs
          className="spot-trading"
          items={tabItems(baseAsset, quoteAsset, leverage, leverageMode)}
        />
        <AdvancedCaculatorModal
          baseAsset={baseAsset}
          quoteAsset={quoteAsset}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </SpotTradingContainer>
      <CalContainer>
        <AiOutlineCalculator
          onClick={() => setIsModalOpen(true)}
          size={20}
          style={{ color: theme.colors.black }}
        />
        <span
          onClick={() => setIsModalOpen(true)}
          style={{ margin: "3px", color: theme.colors.black }}
        >
          Calculator
        </span>
      </CalContainer>
    </>
  );
};

export default PerpetualTrading;

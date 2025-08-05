import React from "react";
import { PartialTabs } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import StopOrder from "./StopOrder";
import AdvanceTrailStop from "./AdvanceTrailStop";

const PartialPosition = ({ row, baseAsset, quoteAsset, setIsModalOpen }) => {
  const TABITEMS = () => {
    return [
      {
        key: "1",
        label: "Stop",
        children: (
          <StopOrder
            row={row}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            setIsModalOpen={setIsModalOpen}
          />
        ),
      },
      {
        key: "2",
        label: "Trailing stop",
        children: (
          <AdvanceTrailStop
            row={row}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            setIsModalOpen={setIsModalOpen}
          />
        ),
      },
    ];
  };
  return (
    <PartialTabs
      className="spot-trading"
      items={TABITEMS()}
      defaultActiveKey="1"
    />
  );
};

export default PartialPosition;

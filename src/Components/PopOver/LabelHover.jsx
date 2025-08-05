import React from "react";
import { CoinPopover } from "../../Screens/Perpetual/Spot.styles";

const LabelHover = ({ label, content }) => {
  return (
    <CoinPopover
      placement="bottom"
      getPopupContainer={(triggerNode) => triggerNode}
      content={content}
      className="standard-popover"
    >
      {label}
    </CoinPopover>
  );
};

export default LabelHover;

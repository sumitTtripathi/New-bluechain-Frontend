import React, { useState } from "react";
import ValueLabel from "../../ValueLabel/ValueLabel";
import { BiEdit } from "react-icons/bi";
import { RSIContainer } from "../ManualTrading.style";
import RSIModal from "../../Bots/Common/RSIModal/RSIModal";

const RSIInfo = ({ timeframe, thold, triggerCond, timePeriod, form }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [threshold, setThreshHold] = useState("10");
  const [resolution, setResolution] = useState("3m");
  const [level, setLevel] = useState("Cross");
  return (
    <RSIContainer>
      <div
        className="set-rsi"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <BiEdit className="standard-text" size={13} />
        <div className="standard-text">Set RSI indicator</div>
      </div>
      <ValueLabel label={"Indicator period"} value={"14"} />
      <ValueLabel label={"Trigger condition"} value={level} />
      <ValueLabel label={"Trigger threshold"} value={threshold} />
      <ValueLabel label={"Chart timeframe"} value={resolution} />
      <RSIModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        timeframe={timeframe}
        thold={thold}
        triggerCond={triggerCond}
        timePeriod={timePeriod}
        threshold={threshold}
        setThreshHold={setThreshHold}
        resolution={resolution}
        setResolution={setResolution}
        level={level}
        setLevel={setLevel}
        form={form}
      />
    </RSIContainer>
  );
};

export default RSIInfo;

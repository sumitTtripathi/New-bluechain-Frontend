import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { BOT } from "../../../../Enums/Enums";

const RunTime = ({ orderDetails, setStopButtonModal, selectedAlgoOrder }) => {
  const [timer, setTimer] = useState("");
  const orderState = orderDetails?.result?.data?.[0];
  const [isRunningBot, setIsRunningBot] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isNoClose, setIsNoClose] = useState(false);
  useEffect(() => {
    setIsRunningBot([BOT.STARTING, BOT.RUNNING].includes(orderState?.state));
    setIsStopped([BOT.STOPPED, BOT.STOPPING].includes(orderState?.state));
    setIsPending([BOT.PENDING_SIGNAL].includes(orderState?.state));
    setIsNoClose([BOT.NO_CLOSE_POSITION].includes(orderState?.state));
  }, [orderDetails]);
  useEffect(() => {
    let interval = "";
    const startTime = moment(Number(orderState?.cTime));
    if (isRunningBot || isPending) {
      interval = setInterval(() => {
        const endTime = moment();
        const timeDifferenceMilliseconds = endTime.diff(Number(startTime));
        setTimer(moment.duration(Number(timeDifferenceMilliseconds)));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [orderDetails, isRunningBot, isPending]);
  return (
    <>
      <div className="run-time">
        <input type="radio" id="selected" checked={isRunningBot || isPending} />
        <label htmlFor="selected">
          {(isRunningBot || isPending) && timer && (
            <span>
              Runtime{" "}
              {`${timer?._data?.days}D ${timer?._data?.hours}h ${timer?._data?.minutes}m ${timer?._data?.seconds}s `}
            </span>
          )}
          {!isRunningBot && <>{BOT[orderState?.state]}</>}
          <span>
            , Created{" "}
            {moment(Number(orderState?.cTime)).format("MM/DD/YYYY, HH:MM:SS")}
          </span>
          )
        </label>
      </div>
    </>
  );
};

export default memo(RunTime);

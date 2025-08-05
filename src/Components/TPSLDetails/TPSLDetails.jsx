import React from "react";
import { DetailContainer } from "./TPSLDetails.style";

const TPSLDetails = ({
  tpTriggerPxType,
  slTriggerPxType,
  slTriggerPx,
  tpTriggerPx,
  tpOrderPx,
  slOrderPx,
  asset,
}) => {
  return (
    <>
      {(tpTriggerPx || slTriggerPx) && (
        <DetailContainer>
          {tpTriggerPx && (
            <>
              <div className="justify-between">
                <div>TP Trigger</div>
                <div className="flex">
                  <div>{tpTriggerPxType}</div>
                  <div>
                    {tpTriggerPx} {asset}
                  </div>
                </div>
              </div>
              <div className="justify-between">
                <div>TP Order</div>
                <div className="flex">
                  <div>{tpOrderPx || "Market"}</div>
                </div>
              </div>
            </>
          )}
          {slTriggerPx && (
            <>
              <div className="justify-between">
                <div>SL Trigger</div>
                <div className="flex">
                  <div>{slTriggerPxType}</div>
                  <div>
                    {slTriggerPx} {asset}
                  </div>
                </div>
              </div>
              <div className="justify-between">
                <div>SL Order</div>
                <div className="flex">
                  <div>{slOrderPx || "Market"}</div>
                </div>
              </div>
            </>
          )}
        </DetailContainer>
      )}
    </>
  );
};

export default TPSLDetails;

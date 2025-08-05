import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import FormInput from "./FormInput";
import { FlexColumn, FlexRow, TextBlack } from "./ManualTrading.style";
import { Checkbox, Form, Select } from "antd";
import RSIInfo from "./Components/RSIInfo";
import { validInput } from "../../Constants/state";
import { MESSAGES } from "../../Constants/Messages";
import { useGetHighLowPriceWSQuery } from "../../Services/Market";

const START_OPTION = [
  {
    value: "Instant",
    label: "Instant",
  },
  {
    value: "Price",
    label: "Price",
  },
  {
    value: "RSI",
    label: "RSI",
  },
];
const STOP_OPTION = [
  {
    value: "Instant",
    label: "Instant",
  },
  {
    value: "Price",
    label: "Price",
  },
  {
    value: "RSI",
    label: "RSI",
  },
];
const AdvancedManualTrading = forwardRef(
  ({ baseAsset, quoteAsset, spotForm }, ref) => {
    const [isTrailUp, setIsTrailUp] = useState(false);
    const [isTrailDown, setIsTrailDown] = useState(false);
    const [startValue, setStartValue] = useState("Instant");
    const [tpslCheck, setTpslCheck] = useState(false);
    const [stopValue, setStopValue] = useState("Instant");
    const [sellCheck, setSellCheck] = useState(false);
    const { data: coinPairCurrentPrice } = useGetHighLowPriceWSQuery({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
    });
    useImperativeHandle(ref, () => {
      return (ref.current = {
        setStartValue: setStartValue,
        setStopValue: setStopValue,
      });
    });
    useEffect(() => {
      spotForm.setFieldValue("stopType", sellCheck ? "1" : "2");
    }, [sellCheck, spotForm]);

    return (
      <>
        <FlexColumn>
          <FlexRow>
            <TextBlack>1. Start condition</TextBlack>
          </FlexRow>
          <Form.Item name="startValue">
            <Select
              onChange={(e) => {
                setStartValue(e);
              }}
              value={startValue}
              options={START_OPTION}
            />
          </Form.Item>
          {startValue === "Price" && (
            <>
              <FormInput
                name="startTriggerPx"
                prefix={"Trigger price"}
                asset={quoteAsset}
                rules={[
                  ...validInput(startValue === "Price"),
                  {
                    validator: (_, value) => {
                      if (parseFloat(value) === 0) {
                        return Promise.reject(MESSAGES.VALIDATE_ZERO);
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
              <FormInput
                name="startTimeDelay"
                prefix={"Start time delay"}
                asset={"s"}
                rules={[...validInput(startValue === "Price")]}
              />
            </>
          )}
          {startValue === "RSI" && (
            <>
              <RSIInfo
                timeframe={"startTimeframe"}
                thold={"startThold"}
                triggerCond={"startTriggerCond"}
                timePeriod={"startTimePeriod"}
                form={spotForm}
              />
              <FormInput
                name="startTimeDelay"
                prefix={"Start time delay"}
                asset={"s"}
                rules={[...validInput(startValue === "Price")]}
              />
            </>
          )}
        </FlexColumn>
        <FlexColumn>
          <FlexRow>
            <TextBlack>2. Stop condition</TextBlack>
          </FlexRow>
          <Form.Item name="stopValue">
            <Select
              onChange={(e) => {
                setStopValue(e);
              }}
              value={stopValue}
              options={STOP_OPTION}
            />
          </Form.Item>
          {stopValue === "Price" && (
            <>
              <FormInput
                name="stopTriggerPx"
                prefix={"Trigger price"}
                asset={quoteAsset}
                rules={[
                  ...validInput(stopValue === "Price"),
                  {
                    validator: (_, value) => {
                      if (parseFloat(value) === 0) {
                        return Promise.reject(MESSAGES.VALIDATE_ZERO);
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
              <FormInput
                name="stopTimeDelay"
                prefix={"Stop time delay"}
                asset={"s"}
                rules={[...validInput(stopValue === "Price")]}
              />
            </>
          )}
          {stopValue === "RSI" && (
            <>
              <RSIInfo
                timeframe={"stopTimeframe"}
                thold={"stopThold"}
                triggerCond={"stopTriggerCond"}
                timePeriod={"stopTimePeriod"}
                form={spotForm}
              />
              <FormInput
                name="stopTimeDelay"
                prefix={"Stop time delay"}
                asset={"s"}
                rules={[...validInput(stopValue === "Price")]}
              />
            </>
          )}
          <Form.Item name="stopType">
            <Checkbox
              onChange={() => {
                setSellCheck((prevState) => {
                  return !prevState;
                });
              }}
              className="standard-text"
              value={sellCheck}
            >
              Sell all once bot stops
            </Checkbox>
          </Form.Item>
        </FlexColumn>
        <FlexColumn>
          <Checkbox
            value={tpslCheck}
            onChange={() => {
              setTpslCheck((prevState) => !prevState);
            }}
          >
            TP/SL
          </Checkbox>
          {tpslCheck && (
            <>
              <FormInput
                name="tpTriggerPx"
                prefix={"TP price"}
                asset={quoteAsset}
                rules={[
                  ...validInput(false),
                  {
                    validator: (_, value) => {
                      const maxPx = spotForm.getFieldValue("maxPx");
                      if (parseFloat(value) === 0) {
                        return Promise.reject(MESSAGES.VALIDATE_ZERO);
                      }
                      if (parseFloat(value) <= parseFloat(maxPx)) {
                        return Promise.reject(MESSAGES.VALID_TP);
                      }
                      if (
                        parseFloat(value) <=
                        parseFloat(coinPairCurrentPrice.price)
                      ) {
                        return Promise.reject(MESSAGES.TP_LARGER);
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
              <FormInput
                name="slTriggerPx"
                prefix={"SL price"}
                asset={quoteAsset}
                rules={[
                  ...validInput(false),
                  {
                    validator: (_, value) => {
                      const minPx = spotForm.getFieldValue("minPx");
                      if (parseFloat(value) === 0) {
                        return Promise.reject(MESSAGES.VALIDATE_ZERO);
                      }
                      if (parseFloat(value) >= parseFloat(minPx)) {
                        return Promise.reject(MESSAGES.VALID_SL);
                      }
                      if (
                        parseFloat(value) >=
                        parseFloat(coinPairCurrentPrice.price)
                      ) {
                        return Promise.reject(MESSAGES.SL_LOWER);
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
            </>
          )}
        </FlexColumn>
      </>
    );
  }
);

AdvancedManualTrading.displayName = "AdvancedManualTrading";

export default AdvancedManualTrading;

// later use

// <FlexColumn>
//         <FlexRow>
//           <TextBlack>1. Trailing settings</TextBlack>
//         </FlexRow>
//         <Checkbox
//           value={isTrailUp}
//           onChange={() => {
//             setIsTrailUp((prevState) => !prevState);
//           }}
//         >
//           Trailing up
//         </Checkbox>
//         {isTrailUp && (
//           <FormInput
//             rules={[
//               ...validInput(isTrailUp),
//               {
//                 validator: (_, value) => {
//                   if (parseFloat(value) === 0) {
//                     return Promise.reject(MESSAGES.VALIDATE_ZERO);
//                   }
//                   return Promise.resolve();
//                 },
//               },
//             ]}
//             name="trailUpPx"
//             prefix={"Trailing up limit"}
//             asset={quoteAsset}
//           />
//         )}
//         <Checkbox
//           value={isTrailDown}
//           onChange={() => {
//             setIsTrailDown((prevState) => !prevState);
//           }}
//         >
//           Trailing Down
//         </Checkbox>
//         {isTrailDown && (
//           <FormInput
//             name="trailDownPx"
//             prefix={"Trailing down limit"}
//             asset={quoteAsset}
//             rules={[
//               ...validInput(isTrailDown),
//               {
//                 validator: (_, value) => {
//                   if (parseFloat(value) === 0) {
//                     return Promise.reject(MESSAGES.VALIDATE_ZERO);
//                   }
//                   return Promise.resolve();
//                 },
//               },
//             ]}
//           />
//         )}
//       </FlexColumn>

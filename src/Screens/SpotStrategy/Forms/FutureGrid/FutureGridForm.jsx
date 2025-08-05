import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  FlexColumn,
  FlexRow,
  LeverageInput,
  StyledSpotGridForm,
  TextBlack,
} from "./FutureGridForm.styles";
import { isNaN, stubTrue } from "lodash";
import FormInput from "../Common/FormInput";
import FormInputSelect from "../Common/FormInputSelect";
import { StyledSlider } from "../../../Spot/SpotTrading/SpotTrading.styles";
import MaxSell from "../../../../Components/MaxSell/MaxSell";
import { Checkbox, Collapse, Form } from "antd";
import ActionButton from "../../../../Components/ActionButton/ActionButton";
import { useTheme } from "styled-components";
import {
  INST_TYPE,
  InitialRSIValue,
  MODE_OPTION,
  marks,
  validInput,
} from "../../../../Constants/state";
import { useForm } from "antd/es/form/Form";
import AICopyCard from "../AICopyCard/AICopyCard";
import { useGetAccountInfoQuery } from "../../../../Services/Transaction";
import { useSelector } from "react-redux";
import { MESSAGES } from "../../../../Constants/Messages";
import { convertIntoDecimal } from "../../../../Utils/common";
import { useGetHighLowPriceWSQuery } from "../../../../Services/Market";
import FutureGridButtons from "../../../../Components/FutureGridButtons/FutureGridButtons";
import { BOT } from "../../../../Enums/Enums";
import SwapManualTrading from "../../../../Components/ManualTrading/SwapManualTrading";
import { useGetUserQuery } from "../../../../Services/Auth";
const SwapLeverageModal = React.lazy(() =>
  import("../../../../Components/SwapLeverageModal/SwapLeverageModal")
);
const SuccessModal = React.lazy(() => import("../Common/SuccessModal"));
const ConfirmationModal = React.lazy(() =>
  import("../Common/ConfirmationModal")
);

const INITIAL_VALUES = {
  maxPx: "",
  minPx: "",
  gridNum: "",
  quoteSz: "",
  baseSz: "",
  mode: "Arithmetic",
  investCurrency: "",
  startTriggerStrategy: "",
  stopTriggerStrategy: "",
  startValue: "Instant",
  stopValue: "Instant",
  reduceOnly: "",
  startTriggerPx: "",
  stopTriggerPx: "",
  startTimeframe: "3m",
  startThold: "10",
  startTriggerCond: "cross",
  startTimePeriod: "14",
  stopTimeframe: "3m",
  stopThold: "10",
  stopTriggerCond: "cross",
  stopTimePeriod: "14",
  startTimeDelay: "",
  stopTimeDelay: "",
  trailDownPx: "",
  investment_amount: "",
  trailUpPx: "",
  stopType: "2",
  slTriggerPx: "",
  tpTriggerPx: "",
};
const FutureGridForm = forwardRef(
  ({ baseAsset, quoteAsset, aiCardCopyOpen }, ref) => {
    const swapRef = useRef();
    const [spotForm] = useForm();
    const [adjustForm, setAdjustForm] = useState(false);
    const theme = useTheme();
    const [basePos, setBasePos] = useState(true);
    const [menu, setMenu] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLevModalOpen, setIsLevModalOpen] = useState(false);
    const [active, setActive] = useState("long");
    const [total, setTotal] = useState("");
    const [slider, setSlider] = useState("");
    const [investCurrency, setInvestCurrency] = useState("quoteAsset");
    const [leverage, setLeverage] = useState("5");
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const token = useSelector((state) => state.global.token);
    const [balanceInfo, setBalanceInfo] = useState({});
    const { data: coinPairCurrentPrice } = useGetHighLowPriceWSQuery({
      base_asset: baseAsset,
      quote_asset: quoteAsset,
    });
    const { data: accountInfo } = useGetAccountInfoQuery(
      {},
      {
        skip: !token,
      }
    );
    const { data: user } = useGetUserQuery(
      {},
      {
        skip: !token,
      }
    );
    const [formObject, setFormObject] = useState({});
    useImperativeHandle(
      ref,
      () => {
        return {
          adjustForm,
          setAdjustForm,
        };
      },
      []
    );

    useEffect(() => {
      const coinBal = accountInfo?.data?.filter((item) => {
        const currencyValue =
          investCurrency === "baseAsset" ? baseAsset : quoteAsset;
        return item?.ccy === currencyValue ? item : "";
      });
      setBalanceInfo(coinBal);
    }, [
      accountInfo,
      baseAsset,
      quoteAsset,
      coinPairCurrentPrice,
      investCurrency,
    ]);

    const MENUITEMS = [
      {
        key: "1",
        label: "Advanced settings",
        children: (
          <SwapManualTrading
            spotForm={spotForm}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            ref={swapRef}
          />
        ),
      },
    ];
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleOpen = () => {
      setIsModalOpen(true);
    };
    const handleOpenSuccess = () => {
      setSuccessModalOpen(true);
    };
    const handleCancelSuccess = () => {
      setSuccessModalOpen(false);
    };
    const onSubmit = async (values) => {
      let formObj = {};
      if (values?.startValue && menu) {
        if (values.startValue === "Price") {
          const startIndicator = {
            triggerStrategy: String(values.startValue).toLowerCase(),
            triggerAction: "start",
            delaySeconds: values.startTimeDelay,
            triggerPx: values.startTriggerPx,
          };
          formObj["triggerParams"] = [startIndicator];
        } else if (values.startValue === "RSI") {
          let startIndicator = {};
          if (!values.startThold) {
            startIndicator = {
              triggerStrategy: String(values.startValue).toLowerCase(),
              triggerAction: "start",
              delaySeconds: values.startTimeDelay,
              ...InitialRSIValue,
            };
          } else {
            startIndicator = {
              triggerStrategy: String(values.startValue).toLowerCase(),
              triggerAction: "start",
              thold: values.startThold,
              timePeriod: values.startTimePeriod,
              timeframe: values.startTimeframe,
              triggerCond: values.startTriggerCond,
              delaySeconds: values.startTimeDelay,
            };
          }
          formObj["triggerParams"] = [startIndicator];
        } else {
          const startIndicator = {
            triggerStrategy: String(values.startValue).toLowerCase(),
            triggerAction: "start",
          };
          formObj["triggerParams"] = [startIndicator];
        }
      }
      if (values?.stopValue && menu) {
        if (values.stopValue === "Price") {
          const stopIndicator = {
            indicator: String(values.stopValue).toLowerCase(),
            triggerStrategy: String(values.stopValue).toLowerCase(),
            triggerAction: "stop",
            delaySeconds: values.stopTimeDelay,
            triggerPx: values.stopTriggerPx,
            stopType: values.stopType,
          };
          if (formObj["triggerParams"]) {
            formObj["triggerParams"] = [
              ...formObj["triggerParams"],
              stopIndicator,
            ];
          } else {
            formObj["triggerParams"] = [stopIndicator];
          }
        } else if (values.stopValue === "RSI") {
          let stopIndicator = {};
          if (!values.stopThold) {
            stopIndicator = {
              triggerStrategy: String(values.stopValue).toLowerCase(),
              triggerAction: "stop",
              stopType: values.stopType,
              delaySeconds: values.stopTimeDelay,
              ...InitialRSIValue,
            };
          } else {
            stopIndicator = {
              triggerStrategy: String(values.stopValue).toLowerCase(),
              triggerAction: "stop",
              thold: values.stopThold,
              timePeriod: values.stopTimePeriod,
              timeframe: values.stopTimeframe,
              triggerCond: values.stopTriggerCond,
              stopType: values.stopType,
              delaySeconds: values.stopTimeDelay,
            };
          }
          if (formObj["triggerParams"]) {
            formObj["triggerParams"] = [
              ...formObj["triggerParams"],
              stopIndicator,
            ];
          } else {
            formObj["triggerParams"] = [stopIndicator];
          }
        } else {
          const stopIndicator = {
            triggerStrategy: String(values.stopValue).toLowerCase(),
            triggerAction: "stop",
            stopType: values.stopType,
          };
          if (formObj["triggerParams"]) {
            formObj["triggerParams"] = [
              ...formObj["triggerParams"],
              stopIndicator,
            ];
          } else {
            formObj["triggerParams"] = [stopIndicator];
          }
        }
      }
      formObj = {
        ...formObj,
        instId: `${baseAsset}${quoteAsset}-${INST_TYPE.swap}`,
        runType: values.mode === "Arithmetic" ? "1" : "2",
        algoOrdType: BOT.FUTURE_GRID,
        maxPx: values.maxPx,
        direction: active,
        lever: leverage,
        basePos: String(basePos),
        minPx: values.minPx,
        gridNum: values.gridNum,
        slTriggerPx: values.slTriggerPx,
        tpTriggerPx: values.tpTriggerPx,
        sz: String(values.investment_amount),
      };
      setFormObject(formObj);
      handleOpen();
    };

    const onSliderChange = (value, asset) => {
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === asset ? item : ""
      );
      setSlider(value);
      if (availableBal?.[0]?.availBal) {
        spotForm.setFieldsValue({
          investment_amount: convertIntoDecimal(
            availableBal[0].availBal * (value / 100)
          ),
        });
      }
    };

    const handleChange = (e) => {
      const asset = investCurrency === "quoteAsset" ? quoteAsset : baseAsset;
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === asset ? item : ""
      );
      const [key] = Object.keys(e);
      if (key === "investment_amount") {
        setTotal(parseFloat(e["investment_amount"]) * parseFloat(leverage));
        const value = convertIntoDecimal(
          (parseFloat(e["investment_amount"]) /
            parseFloat(availableBal?.[0]?.availBal)) *
            100
        );
        setSlider(isNaN(value) ? "0" : value);
      }
    };
    return (
      <StyledSpotGridForm>
        <FutureGridButtons active={active} setActive={setActive} />
        <Form
          form={spotForm}
          onValuesChange={handleChange}
          initialValues={INITIAL_VALUES}
          onFinish={onSubmit}
        >
          {aiCardCopyOpen && !adjustForm ? (
            <AICopyCard setAdjustForm={setAdjustForm} />
          ) : (
            <div>
              <FlexColumn>
                <FlexRow>
                  <TextBlack>1. Price range </TextBlack>
                  <TextBlack>Trading up</TextBlack>
                </FlexRow>
                <FormInput
                  name="minPx"
                  className="input"
                  prefix="Lower Limit"
                  asset={quoteAsset}
                  rules={[
                    ...validInput(true),
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
                  name="maxPx"
                  className="input"
                  prefix="Upper Limit"
                  asset={quoteAsset}
                  rules={[
                    ...validInput(true),
                    {
                      validator: (_, value) => {
                        const minPx = spotForm.getFieldValue("minPx");
                        if (parseFloat(value) === 0) {
                          return Promise.reject(MESSAGES.VALIDATE_ZERO);
                        } else if (parseFloat(value) <= parseFloat(minPx)) {
                          return Promise.reject(MESSAGES.VALID_UPPER_LIMIT);
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                />
              </FlexColumn>
              <FlexColumn>
                <FlexRow>
                  <TextBlack>2. Grid mode and quantity</TextBlack>
                </FlexRow>
                <FormInputSelect
                  name="mode"
                  data={"Arithmetic"}
                  selectOption={MODE_OPTION}
                  prefix="Mode"
                />
                <FormInput
                  name="gridNum"
                  className="input"
                  rules={[
                    ...validInput(true),
                    {
                      validator: (_, value) => {
                        if (parseFloat(value) === 0) {
                          return Promise.reject(MESSAGES.VALIDATE_ZERO);
                        } else if (
                          parseFloat(value) < 2 &&
                          parseFloat(value) > 300
                        ) {
                          return Promise.reject(MESSAGES.VALID_GRID);
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  prefix="Quantity"
                  asset="Grids"
                />
              </FlexColumn>
            </div>
          )}

          <FlexColumn>
            <FlexRow>
              <TextBlack>3. Leverage and margin</TextBlack>
            </FlexRow>
            <LeverageInput
              onClick={() => {
                setIsLevModalOpen(true);
              }}
            >
              <div>Leverage</div>
              <div className="standard-text">
                {Number(leverage).toFixed(2)} x
              </div>
            </LeverageInput>
            <FormInput
              name="investment_amount"
              className="input"
              prefix="Invested margin"
              asset={investCurrency === "baseAsset" ? baseAsset : quoteAsset}
              rules={[
                ...validInput(true),
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
          </FlexColumn>
          <StyledSlider
            up={true}
            trackStyle={{ background: theme.colors.marketUp }}
            className="slider"
            railStyle={{ background: theme.colors.grey.sliderTrack }}
            marks={marks}
            step={1}
            value={slider}
            onChange={(e) => {
              onSliderChange(
                e,
                investCurrency === "quoteAsset" ? quoteAsset : baseAsset
              );
            }}
          />
          <MaxSell
            balance={balanceInfo}
            asset={investCurrency === "quoteAsset" ? quoteAsset : baseAsset}
          />
          <div className="d-flex">
            <div className="small-text font-grey">Total</div>
            <div>{total || "--"}</div>
          </div>
          <Checkbox
            checked={basePos}
            onChange={() => {
              setBasePos((prevState) => !prevState);
            }}
            style={{ marginTop: "10px" }}
            defaultChecked
          >
            Open a position on creation
          </Checkbox>
          <Collapse
            showArrow={false}
            expandIcon={() => false}
            activeKey={menu}
            className="my-collapse"
            items={MENUITEMS}
            onChange={() => {
              setMenu((prevState) => (!prevState ? "1" : ""));
            }}
            style={{ color: "blue" }}
          />
          <ActionButton
            user={user}
            isPlacingOrder={false}
            buttonLabel="Create"
            htmlType="submit"
          />
          <ConfirmationModal
            handleOk={() => {}}
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
            handleOpenSuccess={handleOpenSuccess}
            data={formObject}
            investCurrency={investCurrency}
            setData={setFormObject}
            form={spotForm}
            reference={swapRef}
          />
          <SuccessModal
            handleOk={() => {}}
            handleCancel={handleCancelSuccess}
            isModalOpen={successModalOpen}
          />
          <SwapLeverageModal
            title={"Adjust leverage"}
            leverage={leverage}
            setLeverage={setLeverage}
            isModalOpen={isLevModalOpen}
            setIsModalOpen={setIsLevModalOpen}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
          />
        </Form>
      </StyledSpotGridForm>
    );
  }
);
FutureGridForm.displayName = "FutureGridForm";

export default FutureGridForm;

import React, { useState } from "react";
import {
  FieldContainer,
  FlexContainer,
  InfoContainer,
} from "../AdvancedCalculatorModal.style";
import PeriodButtons from "../Common/PeriodButtons";
import { tradeType } from "../../../Constants/state";
import ValueLabel from "../Common/ValueLabel";
import { Button, Form, Input } from "antd"; 
import { useForm } from "antd/es/form/Form";
import { pnlCalculate } from "../Common/Calculation";
import { useTheme } from "styled-components";
import { useGetContractValueQuery } from "../../../Services/Swap";
import CoinJson from "../../../Constants/Coin.json";
import { useSelector } from "react-redux";

const TargetPrice = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const [showInput, setShowInput] = useState(false);
  const [active, setActive] = useState("long");
  const { data: getContractValue } = useGetContractValueQuery({
    instId: `${baseAsset}${quoteAsset}`,
  });

  const [updatedValues, setUpdatedValues] = useState({
    closePrice: "--",
    closePricePercent: "--",
  });                                                     
  const [pnlform] = useForm();
  const onFinish = (values) => {
    pnlCalculate({
      values,
      getContractValue,
      setUpdatedValues,
      active,
      perpAmountDropdown,
    });
  };
  const perpAmountDropdown = useSelector(
    (state) => state.global.perpAmountDropdown
  );

  const cryptoVaidator = () => ({
    validator(_, value) {
      if (perpAmountDropdown?.key === "crypto") {
        const amount =
          value *
          (Math.ceil(value / getContractValue?.ctVal) /
            (value / getContractValue?.ctVal));
        if (!value || value == amount) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error(`Amount should be equal to ${amount} ${baseAsset}`)
          );
        }
      } else {
        return Promise.resolve();
      }
    },
  });
  const contractVaidator = () => ({
    validator(_, value) {
      if (perpAmountDropdown?.key === "cont") {
        if (!value || value % 1 === 0) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error("Contract should be a whole number"));
        }
      } else {
        return Promise.resolve();
      }
    },
  });
  const validateAmount = () => {
    return [
      {
        required: true,
        meassage: "please enter the field",
      },
      cryptoVaidator,
      contractVaidator,
    ];
  };

  const pnlForm = (BTCvalues, BTCusdt, contValues) => {
    return (
      <>
        <div className="field-container">
          <div className="label-head">Open Amount</div>
          <Form.Item
            name="amount"
            className="formItem"
            rules={validateAmount()}
          >
            <Input
              quoteAsset="BTC"
              type="number"
              suffix={<span>{perpAmountDropdown?.value}</span>}
              min={0}
              autocomplete="off"
            />
          </Form.Item>
          {perpAmountDropdown?.key === "crypto" ? (
            <div className="label">{BTCvalues || "--"} cont</div>
          ) : perpAmountDropdown?.key === "cont" ? (
            <div className="label">
              {contValues || "--"} {baseAsset}
            </div>
          ) : perpAmountDropdown?.key === "usdt" ? (
            <div className="label">
              {BTCusdt || "--"} {baseAsset}
            </div>
          ) : (
            <div className="label">--{baseAsset}</div>
          )}
        </div>
        <div className="field-container">
          <div className="label-head">PnL</div>
          <Form.Item
            name="pnl"
            className="formItem"
            rules={[
              {
                required: true,
                message: "please enter the field",
              },
            ]}
          >
            <Input
              type="number"
              suffix={<span>{quoteAsset}</span>}
              min={0}
              autocomplete="off"
            />
          </Form.Item>
        </div>
      </>
    );
  };
  const pnlPercentForm = () => {
    return (
      <div className="field-container">
        <div className="label-head">PnL%</div>
        <Form.Item
          name="pnlPercent"
          className="formItem"
          rules={[
            {
              required: true,
              message: "please enter the field",
            },
          ]}
        >
          <Input
            type="number"
            autocomplete="off"
            suffix={<span>%</span>}
            min={0}
          />
        </Form.Item>
      </div>
    );
  };
  const getFormItem = (formInstance) => {
    const openAmount = formInstance.getFieldValue("amount");
    const openPrice = formInstance.getFieldValue("open");
    let BTCusdt;
    if (!openAmount || !openPrice) {
      BTCusdt = "";
    } else {
      BTCusdt = (Number(openAmount) / Number(openPrice)).toFixed(3);
    }

    const BTCvalues = openAmount / getContractValue?.ctVal;

    const contValues = Number(openAmount) * Number(getContractValue?.ctVal);

    return (
      <>
        <div className="field-container">
          <div className="label-head">Leverage</div>

          <Form.Item
            name="leverage"
            className="formItem"
            rules={[
              {
                required: true,
                message: "please enter the field",
              },
              () => ({
                validator(_, value) {
                  if (!value || (value >= 0.01 && value <= 125)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error("Leverage should be between 0.01 and 125")
                    );
                  }
                },
              }),
            ]}
          >
            <Input
              placeHolder="Enter Leverage from 0.01 up to 125"
              type="number"
              min={0}
              autocomplete="off"
            />
          </Form.Item>
          {/* <div className="label">
            Max position size at current leverage 0.00BTC
          </div> */}
        </div>
        <div className="field-container">
          <div className="label-head">Open price</div>
          <Form.Item
            name="open"
            className="formItem"
            rules={[
              {
                required: true,
                messsage: "please enter the field",
              },
            ]}
          >
            {/* <InputField value="" quoteAsset="USDT" /> */}
            <Input
              type="number"
              suffix={<span>{quoteAsset}</span>}
              min={0}
              autocomplete="off"
            />
          </Form.Item>
        </div>
        {!showInput
          ? pnlForm(BTCvalues, BTCusdt, contValues)
          : pnlPercentForm()}
        <div
          className="standard-font"
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          {!showInput ? "Switch to PnL%" : "Switch to PnL"}
        </div>
        {/* <CaculateButton /> */}
        <Button className="caculate" type="primary" htmlType="submit">
          Calculate
        </Button>
      </>
    );
  };

  return (
    <>
      <div
        className="logo-container"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <img
          className="coin-icon"
          src={CoinJson[baseAsset]}
          style={{ height: "30px", width: "30px" }}
        />
        <span
          style={{
            color: theme.colors.black,
            fontSize: "20px",
            fontWeight: "700",
          }}
          className="coin-name"
        >{`${baseAsset}/${quoteAsset} PERP`}</span>
      </div>
      <FlexContainer>
        <FieldContainer>
          <PeriodButtons active={active} setActive={setActive} />
          <Form
            name="pnlform"
            initialValues={{
              remember: true,
            }}
            validateTrigger={["onChange", "onBlur"]}
            form={pnlform}
            onFinish={onFinish}
          >
            {(values, formInstance) => {
              return getFormItem(formInstance);
            }}
          </Form>
        </FieldContainer>
        <div className="flex-between">
          <InfoContainer>
            <div className="title">Result</div>
            <ValueLabel
              label={"Close price"}
              value={
                !showInput
                  ? `${
                      !isNaN(updatedValues?.closePrice)
                        ? updatedValues?.closePrice
                        : "--"
                    } ${quoteAsset}`
                  : `${
                      !isNaN(updatedValues?.closePricePercent)
                        ? updatedValues?.closePricePercent
                        : "--"
                    } ${quoteAsset}`
              }
            />
          </InfoContainer>
          <div className="label">Calculations are for your reference only</div>
        </div>
      </FlexContainer>
    </>
  );
};

export default TargetPrice;

/* eslint-disable */
import React, { useState } from "react";
import {
  FieldContainer,
  FlexContainer,
  InfoContainer,
} from "../AdvancedCalculatorModal.style";
import PeriodButtons from "../Common/PeriodButtons";
import CoinJson from "../../../Constants/Coin.json";
import ValueLabel from "../Common/ValueLabel";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useGetContractValueQuery } from "../../../Services/Swap";
import { tradeType } from "../../../Constants/state";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { pnlCalculate } from "../Common/Calculation";

const PnLTab = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const [active, setActive] = useState("long");
  const { data: getContractValue } = useGetContractValueQuery({
    instId: `${baseAsset}${quoteAsset}`,
  });

  const [updatedValues, setUpdatedValues] = useState({
    marginValue: "--",
    pnlValue: "--",
    pnlRatio: "--",
    makerPrice: "--",
    takerPrice: "--",
  });

  const perpAmountDropdown = useSelector(
    (state) => state.global.perpAmountDropdown
  );
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

  const cryptoValidator = () => ({
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

  const contractValidator = () => ({
    validator(_, value) {
      if (perpAmountDropdown?.key === "cont") {
        if (value % 1 === 0) {
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
        message: "please enter the field",
      },
      cryptoValidator,
      contractValidator,
    ];
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
                message: "please enter the field",
              },
            ]}
          >
            <Input
              quoteAsset={quoteAsset}
              type="number"
              suffix={<span>{quoteAsset}</span>}
              min={0}
              autocomplete="off"
            />
          </Form.Item>
        </div>
        <div className="field-container">
          <div className="label-head">Close price</div>
          <Form.Item
            name="close"
            className="formItem"
            rules={[
              {
                required: true,
                message: "please enter the field",
              },
            ]}
          >
            <Input
              quoteAsset={quoteAsset}
              type="number"
              suffix={<span>{quoteAsset}</span>}
              min={0}
              autocomplete="off"
            />
          </Form.Item>
        </div>
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
        </div>
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

        {/* <CaculateButton submit={"submit"}/> */}
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
            style={{
              maxWidth: "100%",
            }}
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
              label={"Margin"}
              value={`${updatedValues?.marginValue} ${quoteAsset}`}
            />
            <ValueLabel
              label={"PnL"}
              value={`${updatedValues?.pnlValue} ${quoteAsset}`}
            />
            <ValueLabel
              label={"PnL ratio"}
              value={`${updatedValues?.pnlRatio} %`}
            />
            <ValueLabel
              label={"Maker fee"}
              value={`${updatedValues?.makerPrice} ${quoteAsset}`}
            />
            <ValueLabel
              label={"Taker fee"}
              value={`${updatedValues?.takerPrice} ${quoteAsset}`}
            />
          </InfoContainer>
          <div className="label">Calculations are for your reference only</div>
        </div>
      </FlexContainer>
    </>
  );
};

export default PnLTab;

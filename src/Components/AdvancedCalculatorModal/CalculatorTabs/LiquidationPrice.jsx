import React, { useEffect, useState } from "react";
import {
  FieldContainer,
  FlexContainer,
  InfoContainer,
  SelectStyled,
} from "../AdvancedCalculatorModal.style";
import PeriodButtons from "../Common/PeriodButtons";
import CoinJson from "../../../Constants/Coin.json";
import ValueLabel from "../Common/ValueLabel";
import { Button, Form, Input } from "antd";
import { useTheme } from "styled-components";
import { useGetContractValueQuery } from "../../../Services/Swap";
import { tradeType } from "../../../Constants/state";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import { pnlCalculate } from "../Common/Calculation";

const LiquidationPrice = ({ baseAsset, quoteAsset }) => {
  const [active, setActive] = useState("long");
  const theme = useTheme();
  const [pnlform] = useForm();
  const { data: getContractValue } = useGetContractValueQuery({
    instId: `${baseAsset}${quoteAsset}`,
  });
  const [updatedValues, setUpdatedValues] = useState({
    liquidationPrice: "--",
  });

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

  useEffect(() => {
    pnlform.setFieldValue("marginMode", "isolated");
    pnlform.setFieldValue("additionalMargin", 0);
  }, []);

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
          <div className="label-head">Margin Mode</div>
          <Form.Item className="formItem" name="marginMode">
            <SelectStyled
              defaultValue="Isolated"
              // onChange={handleChange}
              options={[
                {
                  value: "isolated",
                  label: "Isolated",
                },
                {
                  value: "cross",
                  label: "Cross",
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="field-container">
          <div className="label-head">Leverage</div>
          <Form.Item
            className="formItem"
            name="leverage"
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
              name="leverage"
              autocomplete="off"
            />
          </Form.Item>
        </div>
        <div className="field-container">
          <div className="label-head">Open price</div>
          <Form.Item
            className="formItem"
            name="open"
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
              suffix={<span>{quoteAsset}</span>}
            />
          </Form.Item>
        </div>
        <div className="field-container">
          <div className="label-head">Open Amount</div>
          <Form.Item
            className="formItem"
            name="amount"
            rules={validateAmount()}
          >
            <Input
              type="number"
              suffix={<span>{perpAmountDropdown?.value}</span>}
              autocomplete="off"
              min={0}
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
          <div className="label-head">Additional margin</div>
          <Form.Item className="formItem" name="additionalMargin">
            <Input type="number" autocomplete="off" defaultValue={0} min={0} />
          </Form.Item>
        </div>
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
          <PeriodButtons setActive={setActive} active={active} />
          <Form
            name="pnlform"
            initialValues={{
              remember: true,
            }}
            validateTrigger={["onChange", "onBlur"]}
            form={pnlform}
            onFinish={onFinish}
          >
            {(values, formInstance) => getFormItem(formInstance)}
          </Form>
        </FieldContainer>
        <div className="flex-between">
          <InfoContainer>
            <div className="title">Result</div>
            <ValueLabel
              label={"Liquidation price"}
              value={updatedValues?.liquidationPrice}
            />
          </InfoContainer>
          <div className="label">
            Calculations are for your reference only. Is is not based on real
            market data
          </div>
        </div>
      </FlexContainer>
    </>
  );
};

export default LiquidationPrice;

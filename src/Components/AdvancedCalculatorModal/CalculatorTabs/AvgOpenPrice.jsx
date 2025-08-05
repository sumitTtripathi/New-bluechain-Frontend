/* eslint-disable */
import React, { useState } from "react";
import {
  FieldContainer,
  FlexContainer,
  InfoContainer,
} from "../AdvancedCalculatorModal.style";
import PeriodButtons from "../Common/PeriodButtons";
import ValueLabel from "../Common/ValueLabel";
import CoinJson from "../../../Constants/Coin.json";
import { Button, Form, Input } from "antd";
import { useGetContractValueQuery } from "../../../Services/Swap";
import { tradeType } from "../../../Constants/state";
import { useTheme } from "styled-components";
import { AiFillDelete } from "react-icons/ai";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { pnlCalculate } from "../Common/Calculation";

const AvgOpenPrice = ({ baseAsset, quoteAsset }) => {
  const [active, setActive] = useState("long");
  const theme = useTheme();
  const perpAmountDropdown = useSelector(
    (state) => state.global.perpAmountDropdown
  );
  const { data: getContractValue } = useGetContractValueQuery({
    instId: `${baseAsset}${quoteAsset}`,
  });
  const [updatedValues, setUpdatedValues] = useState({
    avgOpenPrice: "--",
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
  const validateCrypto = () => ({
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
  const validateCont = () => ({
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
  const getRules = () => {
    return [
      {
        required: true,
        message: "Please enter input",
      },
      validateCrypto,
      validateCont,
    ];
  };

  const getFormList = (fields, { add, remove }, formInstance) => {
    return (
      <>
        {fields.map(
          ({ key, name, ...restField }, i) => {
            const openAmount = formInstance.getFieldValue("price")?.[i]?.amount;
            const openPrice = formInstance.getFieldValue("price")?.[i]?.open;
            const values = {
              cryto: {
                eval: openAmount / getContractValue?.ctVal,
                asset: "cont",
              },
              cont: {
                eval: Number(openAmount) * Number(getContractValue?.ctVal),
                asset: baseAsset,
              },
              usdt: {
                eval:
                  openAmount && openPrice
                    ? (Number(openAmount) / Number(openPrice)).toFixed(3)
                    : "",
                asset: baseAsset,
              },
            };
            return (
              <>
                <div style={{ margin: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <label className="label-head">Open Price</label>
                    <AiFillDelete
                      className="label-head"
                      onClick={() => remove(name)}
                    />
                  </div>

                  <Form.Item
                    className="formItem"
                    {...restField}
                    name={[name, "open"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter input",
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
                </div>{" "}
                <div style={{ margin: "5px" }}>
                  <label className="label-head">Open Amount</label>
                  <Form.Item
                    {...restField}
                    name={[name, "amount"]}
                    className="formItem"
                    rules={getRules()}
                  >
                    <Input
                      type="number"
                      suffix={<span>{perpAmountDropdown?.value}</span>}
                      min={0}
                      autocomplete="off"
                    />
                  </Form.Item>
                </div>
                <div className="label">
                  {values[perpAmountDropdown?.key].eval || "--"}{" "}
                  {values[perpAmountDropdown?.key].asset}
                </div>
              </>
            );
          }

          // </Space>
        )}
        <Form.Item>
          <Button
            className="add-field-btn"
            onClick={() => add()}
            block
            icon={<PlusCircleOutlined />}
          >
            Add field
          </Button>
        </Form.Item>
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
          <div className="form-container">
            <Form
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              validateTrigger={["onChange", "onBlur"]}
              style={{
                maxWidth: 600,
              }}
              autocomplete="off"
            >
              {(getFieldValue, formInstance) => {
                return (
                  <>
                    {" "}
                    <Form.List
                      name="price"
                      initialValue={[
                        {
                          open: "",
                          amount: "",
                        },
                      ]}
                    >
                      {(fields, { add, remove }) => {
                        return getFormList(
                          fields,
                          { add, remove },
                          formInstance
                        );
                      }}
                    </Form.List>
                    <Form.Item>
                      <Button
                        className="caculate"
                        type="primary"
                        htmlType="submit"
                      >
                        Calculate
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form>
          </div>
        </FieldContainer>
        <div className="flex-between">
          <InfoContainer>
            <div className="title">Result</div>
            <ValueLabel
              label={"Avg open price"}
              value={`${updatedValues?.avgOpenPrice} ${quoteAsset}`}
            />
          </InfoContainer>
          <div className="label">For reference only.</div>
        </div>
      </FlexContainer>
    </>
  );
};

export default AvgOpenPrice;

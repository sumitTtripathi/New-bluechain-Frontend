import { Button, Checkbox, Divider, Form, Input } from "antd";
import React, { useState } from "react";
import VarianceDropDown from "../../../Components/PerpetualTrading/AdvancedMarketOrders/VarianceDropDown";
import { StyledSlider } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import { useTheme } from "styled-components";
import { marks } from "../../../Constants/state";
import { useGetHighLowPriceQuery } from "../../../Services/Swap";
import { toast } from "react-toastify";
import { usePlaceAdvancedOrderMutation } from "../../../Services/Transaction";
import lodash from "lodash";

import {
  convertIntoDecimal,
  getDecimalFromLength,
} from "../../../Utils/common";

const INITIAL_VALUE = {
  variance: "",
  sz: "",
  activePx: "",
};
const AdvanceTrailStop = ({ baseAsset, quoteAsset, setIsModalOpen, row }) => {
  const [buyVarianceValue, setBuyVarianceValue] = useState("percentage");
  const [activationCheck, setActivationCheck] = useState(false);
  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
    usePlaceAdvancedOrderMutation();
  const [form] = Form.useForm();
  const [sliderValue, setSliderValue] = useState("");
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    id: baseAsset,
    filter: quoteAsset,
  });
  const theme = useTheme();

  const onSliderChange = (value) => {
    setSliderValue(value);
    form.setFieldsValue({
      sz: convertIntoDecimal(parseInt(row?.availPos * (value / 100))),
    });
  };

  const handleSubmit = async (values) => {
    try {
      const formObj = {
        instId: row?.instId,
        tdMode: String(row?.mgnMode).toLowerCase(),
        ordType: "move_order_stop",
        side: row?.posSide === "long" ? "sell" : "buy",
        posSide: row?.posSide === "long" ? "short" : "long",
        sz: String(values.sz),
        callbackRatio: String(
          buyVarianceValue === "percentage" ? Number(values.variance) / 100 : ""
        ),
        callbackSpread: String(
          buyVarianceValue === "percentage" ? "" : values.variance
        ),
        activePx: activationCheck ? values.activePx : "",
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
      form.resetFields();
    }
  };

  return (
    <>
      <Form onFinish={handleSubmit} initialValues={INITIAL_VALUE} form={form}>
        <VarianceDropDown
          varianceValue={buyVarianceValue}
          setVarianceValue={setBuyVarianceValue}
        />
        <Form.Item
          name="variance"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            //   {
            //     validator: (_, value) => {
            //       if (parseFloat(value) === 0) {
            //         return Promise.reject("Value cannot be zero.");
            //       } else if (
            //         (parseFloat(value) < 0 || parseFloat(value) > 100) &&
            //         buyVarianceValue === "percentage"
            //       ) {
            //         return Promise.reject("Invalid Value.");
            //       } else if (
            //         (Number(value) < Number(hlCoinPriceData?.price) / 100 ||
            //           Number(value) > Number(hlCoinPriceData?.price)) &&
            //         buyVarianceValue === "cont"
            //       ) {
            //         return Promise.reject(
            //           `The variance range is ${hlCoinPriceData?.price / 100} - ${
            //             hlCoinPriceData?.price
            //           }`
            //         );
            //       }
            //       return Promise.resolve();
            //     },
            //   },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            className="input"
            suffix={
              <>
                <span className="label">
                  {buyVarianceValue === "percentage" ? "%" : quoteAsset}
                </span>
              </>
            }
            prefix={
              <>
                <span className="label">Trail Variance</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <Form.Item
          name="sz"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            {
              validator: (_, value) => {
                if (parseFloat(value) > parseFloat(row?.availPos)) {
                  return Promise.reject(
                    "Value exceeding the maximum available position."
                  );
                } else if (parseFloat(value) === 0) {
                  return Promise.reject("Value cannot be zero.");
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            className="input"
            suffix={
              <>
                <span className="label">Cont</span>
              </>
            }
            onChange={(e) => {
              setSliderValue(
                convertIntoDecimal(
                  (Number(e.target.value) / Number(row?.availPos)) * 100
                )
              );
              if (!lodash.isNaN(Number(e.target.value)) && e.target.value) {
                form.setFieldValue("sz", parseInt(e.target.value));
              } else {
                form.setFieldValue("sz", "");
              }
            }}
            prefix={
              <>
                <span className="label">Amount</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={activationCheck}
            onClick={() => {
              setActivationCheck((prevState) => !prevState);
            }}
          >
            Activation Price
          </Checkbox>
        </div>
        {activationCheck && (
          <>
            <Form.Item
              name="activePx"
              rules={[
                {
                  required: activationCheck,
                  message: "Please enter the value.",
                },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
                {
                  validator: (_, value) => {
                    const decimalArr = String(hlCoinPriceData?.price)?.split(
                      "."
                    );
                    const decimalValue = decimalArr[1]?.length;
                    if (parseFloat(value) === 0) {
                      return Promise.reject("Value cannot be zero.");
                    } else if (
                      decimalValue &&
                      value < getDecimalFromLength(decimalValue)
                    ) {
                      return Promise.reject(
                        `Value must be greater than equal to ${getDecimalFromLength(
                          decimalValue
                        )}.`
                      );
                    } else if (!decimalValue && value < 1) {
                      return Promise.reject(
                        `Value must be greater than equal to 1.`
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger="onChange"
            >
              <Input
                autocomplete="off"
                className="input"
                suffix={
                  <>
                    <span className="label">{quoteAsset}</span>
                  </>
                }
              />
            </Form.Item>
          </>
        )}
        <StyledSlider
          up={true}
          trackStyle={{ background: theme.colors.marketUp }}
          className="slider"
          railStyle={{ background: theme.colors.grey.sliderTrack }}
          marks={marks}
          step={1}
          onChange={onSliderChange}
          value={sliderValue}
        />
        <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
          <Button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={isPlacingOrder}>
            Confirm
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AdvanceTrailStop;

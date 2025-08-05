import { useTheme } from "styled-components";
import { Divider, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAccountInfoQuery,
  usePlaceAdvancedOrderMutation,
} from "../../../../Services/Transaction";
import {
  convertExponentialToDecimal,
  convertIntoDecimal,
} from "../../../../Utils/common";
import MaxSell from "../../MaxSell";
import { useGetUserQuery } from "../../../../Services/Auth";
import { useGetHighLowPriceQuery } from "../../../../Services/Market";
import { StyledSlider } from "../SpotTrading.styles";
import SellButton from "../Component/SellButton";
import BuyButton from "../Component/BuyButton";
import { useSelector } from "react-redux";

const marks = {
  0: "0",
  25: "25",
  50: "50",
  75: "75",
  100: "100",
};

const defaultValues = {
  stopPrice: "",
  price: "",
  type: "",
  amount: "",
  orderType: "",
  amountType: "total",
};

const Conditional = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const [buySlider, setBuySlider] = useState(0);
  const [sellSlider, setSellSlider] = useState(0);
  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
    usePlaceAdvancedOrderMutation();
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const token = useSelector((state) => state.global.token);

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
  const [form] = Form.useForm();
  const [side, setSide] = useState("");
  const [sellForm] = Form.useForm();
  const onQuantityChange = () => {
    const quantityVal = form.getFieldValue("amount");
    if (quantityVal < 0) {
      form.setFieldValue("amount", "");
      return;
    }
    if (quantityVal) {
      const availableBal = accountInfo?.data?.filter((item) => {
        return item.ccy === quoteAsset ? item : "";
      });
      setBuySlider(
        convertIntoDecimal((quantityVal / availableBal?.[0]?.availBal) * 100)
      );
    } else {
      setBuySlider(0);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setSide("buy");
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "buy",
        tdMode: "cash",
        ordType: "conditional",
        sz: String(values.amount),
      };
      if (
        values.stopPrice > convertExponentialToDecimal(hlCoinPriceData?.price)
      ) {
        formObj.slTriggerPx = String(values.stopPrice);
        formObj.slTriggerPxType = "last";
        formObj.slOrdPx = String(-1);
      } else {
        formObj.tpTriggerPx = String(values.stopPrice);
        formObj.tpTriggerPxType = "last";
        formObj.tpOrdPx = String(-1);
      }
      if (values.amountType === "amount") {
        formObj.tgtCcy = "base_ccy";
      }
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const onSliderChange = (value, type) => {
    if (type === "buy") {
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === quoteAsset ? item : ""
      );
      setBuySlider(value);
      if (availableBal?.[0]?.availBal) {
        form.setFieldsValue({
          amount: convertIntoDecimal(availableBal[0].availBal * (value / 100)),
        });
      }
    } else {
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === baseAsset ? item : ""
      );
      setSellSlider(value);
      if (availableBal?.[0]?.availBal) {
        sellForm.setFieldsValue({
          amount: convertIntoDecimal(
            availableBal?.[0]?.availBal * (value / 100)
          ),
        });
      }
    }
  };
  const handleSellSubmit = async (values) => {
    try {
      setSide("buy");
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "sell",
        tdMode: "cash",
        ordType: "conditional",
        sz: String(values.amount),
      };
      if (
        values.stopPrice < convertExponentialToDecimal(hlCoinPriceData?.price)
      ) {
        formObj.slTriggerPx = String(values.stopPrice);
        formObj.slTriggerPxType = "last";
        formObj.slOrdPx = String(-1);
      } else {
        formObj.tpTriggerPx = String(values.stopPrice);
        formObj.tpTriggerPxType = "last";
        formObj.tpOrdPx = String(-1);
      }
      if (values.amountType === "amount") {
        formObj.tgtCcy = "base_ccy";
      }
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.algoId) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const onSellQuantityChange = () => {
    const quantityVal = sellForm.getFieldValue("amount");
    if (quantityVal < 0) {
      sellForm.setFieldValue("amount", "");
      return;
    }
    if (quantityVal) {
      const availableBal = accountInfo?.data?.filter((item) => {
        return item.ccy === baseAsset ? item : "";
      });
      setSellSlider(
        convertIntoDecimal((quantityVal / availableBal?.[0]?.availBal) * 100)
      );
    } else {
      setSellSlider(0);
    }
  };
  return (
    <>
      <Form
        onFinish={handleSubmit}
        initialValues={defaultValues}
        form={form}
        onValuesChange={onQuantityChange}
        className="left"
      >
        <Form.Item
          name="stopPrice"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            {
              validator: (_, value) => {
                if (parseFloat(value) === 0) {
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
                <span className="label">{quoteAsset}</span>
              </>
            }
            prefix={
              <>
                <span className="label">Stop</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <Form.Item name="price" validateTrigger="onChange">
          <Input
            autocomplete="off"
            // defaultValue={-1}
            className="input"
            style={{ color: "transparent !important" }}
            placeholder="Best Market Price"
            disabled
            suffix={
              <>
                <span className="label">Market</span>
              </>
            }
            prefix={
              <>
                <span className="label">Price</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            {
              validator: (_, value) => {
                const availableBal = accountInfo?.data?.filter((item) =>
                  item.ccy === quoteAsset ? item : ""
                );
                if (parseFloat(value) === 0) {
                  return Promise.reject("Value cannot be zero.");
                } else if (
                  !availableBal?.[0]?.availBal ||
                  availableBal?.[0]?.availBal < value
                ) {
                  return Promise.reject("Insufficient Balance.");
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            // defaultValue={-1}
            className="input"
            style={{ color: "transparent !important" }}
            suffix={
              <>
                <span className="label">{quoteAsset}</span>
              </>
            }
            prefix={
              <>
                <span className="label">Amount</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <StyledSlider
          up={true}
          trackStyle={{ background: theme.colors.marketUp }}
          className="slider"
          railStyle={{ background: theme.colors.grey.sliderTrack }}
          marks={marks}
          step={1}
          value={buySlider}
          onChange={(e) => onSliderChange(e, "buy")}
        />
        <MaxSell
          balance={accountInfo?.data?.filter(
            (item) => item?.ccy === quoteAsset
          )}
          asset={quoteAsset}
        />
        <Divider style={{ margin: "10px 0" }} />
        <BuyButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
      </Form>
      <Form
        onFinish={handleSellSubmit}
        initialValues={defaultValues}
        form={sellForm}
        className="left"
        onValuesChange={onSellQuantityChange}
      >
        <Form.Item
          name="stopPrice"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            {
              validator: (_, value) => {
                if (parseFloat(value) === 0) {
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
                <span className="label">{quoteAsset}</span>
              </>
            }
            prefix={
              <>
                <span className="label">Stop</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <Form.Item name="price" validateTrigger="onChange">
          <Input
            autocomplete="off"
            placeholder="Best Market Price"
            suffix={
              <>
                <span className="label">Market</span>
              </>
            }
            className="input"
            prefix={
              <>
                <span className="label">Price</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
            {
              validator: (_, value) => {
                const availableBal = accountInfo?.data?.filter((item) =>
                  item.ccy === baseAsset ? item : ""
                );
                if (parseFloat(value) === 0) {
                  return Promise.reject("Value cannot be zero.");
                } else if (
                  !availableBal?.[0]?.availBal ||
                  availableBal?.[0]?.availBal < value
                ) {
                  return Promise.reject("Insufficient Balance.");
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            autocomplete="off"
            // defaultValue={-1}
            className="input"
            style={{ color: "transparent !important" }}
            suffix={
              <>
                <span className="label">{baseAsset}</span>
              </>
            }
            prefix={
              <>
                <span className="label">Amount</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <StyledSlider
          up={false}
          trackStyle={{ background: theme.colors.marketDown }}
          className="slider"
          railStyle={{ background: theme.colors.grey.sliderTrack }}
          marks={marks}
          step={1}
          value={sellSlider}
          onChange={(e) => onSliderChange(e, "sell")}
        />
        <MaxSell
          balance={accountInfo?.data?.filter((item) => item?.ccy === baseAsset)}
          asset={baseAsset}
        />
        <Divider style={{ margin: "10px 0" }} />
        <SellButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
      </Form>
    </>
  );
};

export default Conditional;

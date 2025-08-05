import { useTheme } from "styled-components";
import { StyledSlider } from "../SpotTrading.styles";
import { Checkbox, Divider, Form, Input } from "antd";
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
import VarianceDropDown from "./VarianceDropDown";
import { useGetUserQuery } from "../../../../Services/Auth";
import { useGetHighLowPriceQuery } from "../../../../Services/Market";
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
};

const TrailStop = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const [buyVarianceValue, setBuyVarianceValue] = useState("ratio");
  const [sellVarianceValue, setSellVarianceValue] = useState("ratio");
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
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const [buySlider, setBuySlider] = useState(0);
  const [buyActivationCheck, setBuyActivationCheck] = useState(false);
  const [sellActivationCheck, setSellActivationCheck] = useState(false);
  const [sellSlider, setSellSlider] = useState(0);
  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
    usePlaceAdvancedOrderMutation();
  const [form] = Form.useForm();
  const [side, setSide] = useState("");
  const [sellForm] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setSide("buy");
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "buy",
        tdMode: "cash",
        ordType: "move_order_stop",
        posSide: "net",
        currentPrice: convertExponentialToDecimal(hlCoinPriceData?.price),
        sz: String(values.amount),
        callbackRatio:
          buyVarianceValue === "ratio" ? Number(values.price) / 100 : "",
        callbackSpread: buyVarianceValue === "ratio" ? "" : values.price,
        activePx: buyActivationCheck ? values.activePx : "",
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.algoId) {
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
      const priceVal = form.getFieldValue("price");
      if (availableBal?.[0]?.availBal && priceVal) {
        form.setFieldsValue({
          amount: convertIntoDecimal(
            (availableBal[0].availBal * (value / 100)) / priceVal
          ),
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
        ordType: "move_order_stop",
        posSide: "net",
        currentPrice: convertExponentialToDecimal(hlCoinPriceData?.price),
        sz: String(values.amount),
        callbackRatio:
          sellVarianceValue === "ratio" ? Number(values.price) / 100 : "",
        callbackSpread: sellVarianceValue === "ratio" ? "" : values.price,
        activePx: sellActivationCheck ? values.activePx : "",
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.algoId) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <Form
        onFinish={handleSubmit}
        initialValues={defaultValues}
        form={form}
        className="left"
      >
        <VarianceDropDown
          varianceValue={buyVarianceValue}
          setVarianceValue={setBuyVarianceValue}
        />
        <Form.Item
          name="price"
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
                } else if (
                  (parseFloat(value) < 0 || parseFloat(value) > 100) &&
                  buyVarianceValue === "ratio"
                ) {
                  return Promise.reject("Invalid Value.");
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            className="input"
            suffix={
              <>
                <span className="label">
                  {buyVarianceValue === "ratio" ? "%" : quoteAsset}
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
          name="amount"
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
            className="input"
            placeholder=""
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
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={buyActivationCheck}
            onClick={() => {
              setBuyActivationCheck((prevState) => !prevState);
            }}
          >
            Activation Price
          </Checkbox>
        </div>
        {buyActivationCheck && (
          <>
            <Form.Item
              name="activePx"
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
        <BuyButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
      </Form>
      <Form
        onFinish={handleSellSubmit}
        initialValues={defaultValues}
        form={sellForm}
        className="left"
      >
        <VarianceDropDown
          varianceValue={sellVarianceValue}
          setVarianceValue={setSellVarianceValue}
        />
        <Form.Item
          name="price"
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
                } else if (
                  (parseFloat(value) < 0 || parseFloat(value) > 100) &&
                  sellVarianceValue === "ratio"
                ) {
                  return Promise.reject("Invalid Value.");
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onChange"
        >
          <Input
            suffix={
              <>
                <span className="label">
                  {sellVarianceValue === "ratio" ? "%" : quoteAsset}
                </span>
              </>
            }
            className="input"
            prefix={
              <>
                <span className="label">Trail Variance</span>
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
            className="input"
            placeholder=""
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
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={sellActivationCheck}
            onClick={() => {
              setSellActivationCheck((prevState) => !prevState);
            }}
          >
            Activation Price
          </Checkbox>
        </div>
        {sellActivationCheck && (
          <>
            <Form.Item
              name="activePx"
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
        <SellButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
      </Form>
    </>
  );
};

export default TrailStop;

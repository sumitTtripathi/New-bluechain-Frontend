import { useTheme } from "styled-components";
import { StyledSlider, TabContainer } from "../SpotTrading.styles";
import { Divider, Input, Form, Checkbox } from "antd";
import { toast } from "react-toastify";
import MaxSell from "../../MaxSell";
import {
  useGetAccountInfoQuery,
  usePlaceOrderMutation,
} from "../../../../Services/Transaction";
import { memo, useEffect, useState } from "react";
import { useGetHighLowPriceWSQuery } from "../../../../Services/Market";
import { convertIntoDecimal } from "../../../../Utils/common";
import { useGetUserQuery } from "../../../../Services/Auth";
import BuyButton from "../Component/BuyButton";
import SellButton from "../Component/SellButton";
import { useSelector } from "react-redux";

const marks = {
  0: "0",
  25: "25",
  50: "50",
  75: "75",
  100: "100",
};

const defaultValues = {
  price: "",
  quantity: "",
  total: "",
  slTriggerPx: "",
  slOrdPx: "",
  tpTriggerPx: "",
  tpOrdPx: "",
};

const LimitTab = ({ baseAsset, quoteAsset }) => {
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [form] = Form.useForm();
  const [side, setSide] = useState("");
  const [buySlider, setBuySlider] = useState(0);
  const [buyLossCheck, setBuyLossCheck] = useState(false);
  const [sellLossCheck, setSellLossCheck] = useState(false);
  const [buyProfitCheck, setBuyProfitCheck] = useState(false);
  const [sellProfitCheck, setSellProfitCheck] = useState(false);
  const [sellSlider, setSellSlider] = useState(0);
  const [sellForm] = Form.useForm();
  const theme = useTheme();
  const { data: coinPairCurrentPrice } = useGetHighLowPriceWSQuery({
    base_asset: baseAsset,
    quote_asset: quoteAsset,
  });
  const token = useSelector((state) => state.global.token);
  const { data: user } = useGetUserQuery(
    {},
    {
      skip: !token,
    }
  );

  const { data: accountInfo } = useGetAccountInfoQuery(
    {},
    {
      skip: !token,
    }
  );
  useEffect(() => {
    const quantityBuy = form.getFieldValue("quantity");
    const quantitySell = sellForm.getFieldValue("quantity");

    form.setFieldValue("price", coinPairCurrentPrice?.price);
    sellForm.setFieldValue("price", coinPairCurrentPrice?.price);
    sellForm.setFieldValue(
      "total",
      quantitySell ? coinPairCurrentPrice?.price * quantitySell : ""
    );
    form.setFieldValue(
      "total",
      quantityBuy ? coinPairCurrentPrice?.price * quantityBuy : ""
    );
  }, [coinPairCurrentPrice, form, sellForm]);

  const setBuyFormField = (availableBal, value) => {
    if (availableBal?.[0]?.availBal) {
      const priceVal = form.getFieldValue("price");
      form.setFieldsValue({
        quantity: convertIntoDecimal(
          (availableBal[0].availBal * (value / 100)) / priceVal
        ),
      });
      const quantityVal = form.getFieldValue("quantity");
      if (!!priceVal && !!quantityVal) {
        form.setFieldValue("total", convertIntoDecimal(quantityVal * priceVal));
      } else {
        form.setFieldValue("total", "");
      }
    }
  };
  const setSellFormField = (availableBal, value) => {
    if (availableBal?.[0]?.availBal) {
      const priceVal = sellForm.getFieldValue("price");
      sellForm.setFieldsValue({
        quantity: convertIntoDecimal(
          availableBal?.[0]?.availBal * (value / 100)
        ),
      });
      const quantityVal = sellForm.getFieldValue("quantity");
      if (!!priceVal && !!quantityVal) {
        sellForm.setFieldValue(
          "total",
          convertIntoDecimal(quantityVal * priceVal)
        );
      } else {
        sellForm.setFieldValue("total", "");
      }
    }
  };
  const onSliderChange = (value, type) => {
    if (type === "buy") {
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === quoteAsset ? item : ""
      );
      setBuySlider(value);
      setBuyFormField(availableBal, value);
    } else {
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === baseAsset ? item : ""
      );
      setSellSlider(value);
      setSellFormField(availableBal, value);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSide("buy");
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === quoteAsset ? item : ""
      );
      const inputBal = values.total;
      if (
        !availableBal?.[0]?.availBal ||
        convertIntoDecimal(availableBal?.[0]?.availBal) <
          convertIntoDecimal(inputBal)
      ) {
        toast.error("Insufficient Balance!");
        return;
      }
      let profitLossFields = {};
      if (buyProfitCheck) {
        profitLossFields["tpTriggerPx"] = values?.tpTriggerPx;
        profitLossFields["tpOrdPx"] = values?.tpOrdPx;
        profitLossFields["tpTriggerPxType"] = values?.tpTriggerPxType;
      }
      if (buyLossCheck) {
        profitLossFields["slTriggerPx"] = values?.slTriggerPx;
        profitLossFields["slOrdPx"] = values?.slOrdPx;
        profitLossFields["slTriggerPxType"] = values?.slTriggerPxType;
      }
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "buy",
        tdMode: "cash",
        ordType: "limit",
        sz: String(values.quantity),
        px: String(values.price),
        ...profitLossFields,
      };
      const response = await placeOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.ordId) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const onQuantityChange = () => {
    const priceVal = form.getFieldValue("price");
    const quantityVal = form.getFieldValue("quantity");
    if (priceVal < 0) {
      form.setFieldValue("price", "");
      return;
    }
    if (quantityVal < 0) {
      form.setFieldValue("quantity", "");
      return;
    }
    if (!!priceVal && !!quantityVal) {
      form.setFieldValue("total", convertIntoDecimal(quantityVal * priceVal));
      const availableBal = accountInfo?.data?.filter((item) => {
        return item.ccy === quoteAsset ? item : "";
      });
      setBuySlider(
        convertIntoDecimal(
          ((quantityVal * priceVal) / availableBal?.[0]?.availBal) * 100
        )
      );
    } else {
      form.setFieldValue("total", "");
    }
  };
  const onSellQuantityChange = () => {
    const priceVal = sellForm.getFieldValue("price");
    const quantityVal = sellForm.getFieldValue("quantity");
    if (priceVal < 0) {
      sellForm.setFieldValue("price", "");
      return;
    }
    if (quantityVal < 0) {
      sellForm.setFieldValue("quantity", "");
      return;
    }
    if (!!priceVal && !!quantityVal) {
      sellForm.setFieldValue(
        "total",
        convertIntoDecimal(quantityVal * priceVal)
      );
      const availableBal = accountInfo?.data?.filter((item) => {
        return item.ccy === baseAsset ? item : "";
      });
      setSellSlider(
        convertIntoDecimal((quantityVal / availableBal?.[0]?.availBal) * 100)
      );
    } else {
      sellForm.setFieldValue("total", "");
    }
  };
  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === baseAsset ? item : ""
      );
      if (
        !availableBal?.[0]?.availBal ||
        Number(availableBal?.[0]?.availBal) < Number(values?.quantity)
      ) {
        toast.error("Insufficient Balance!");
        return;
      }
      let profitLossFields = {};
      if (sellProfitCheck) {
        profitLossFields["tpTriggerPx"] = values?.tpTriggerPx;
        profitLossFields["tpOrdPx"] = values?.tpOrdPx;
        profitLossFields["tpTriggerPxType"] = values?.tpTriggerPxType;
      }
      if (sellLossCheck) {
        profitLossFields["slTriggerPx"] = values?.slTriggerPx;
        profitLossFields["slOrdPx"] = values?.slOrdPx;
        profitLossFields["slTriggerPxType"] = values?.slTriggerPxType;
      }
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "sell",
        ordType: "limit",
        tdMode: "cash",
        sz: String(values.quantity),
        px: String(values.price),
        ...profitLossFields,
      };
      const response = await placeOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.ordId) {
        toast.success("Order is placed.");
      }
      sellForm.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <TabContainer>
      <Form
        onFinish={handleSubmit}
        initialValues={defaultValues}
        form={form}
        onValuesChange={onQuantityChange}
        className="left"
      >
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
            // type="number"
            suffix={
              <>
                <span className="label">{quoteAsset}</span>
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
          name="quantity"
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
            // type="number"
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
        <Form.Item name="total">
          <Input
            autocomplete="off"
            disabled
            className="input"
            // type="number"
            suffix={
              <>
                <span className="label">{quoteAsset}</span>
              </>
            }
            prefix={
              <>
                <span className="label">Total</span>
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
          onChange={(e) => onSliderChange(e, "buy")}
          value={buySlider}
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
            checked={buyProfitCheck}
            onClick={() => {
              setBuyProfitCheck((prevState) => !prevState);
            }}
          >
            Take Profit
          </Checkbox>
          <Checkbox
            className="label"
            checked={buyLossCheck}
            onClick={() => {
              setBuyLossCheck((prevState) => !prevState);
            }}
          >
            Stop Loss
          </Checkbox>
        </div>
        {buyProfitCheck && (
          <>
            <Form.Item
              name="tpTriggerPx"
              rules={[
                { required: true, message: "Please enter the value." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
                {
                  validator: (_, value) => {
                    const price = form.getFieldValue("price");
                    if (parseFloat(value) === 0) {
                      return Promise.reject("Value cannot be zero.");
                    } else if (price > value) {
                      return Promise.reject(
                        "Take Profit value must be grater than order price."
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
                prefix={
                  <>
                    <span className="label">TP Trigger Price</span>
                    <Divider type="vertical" />
                  </>
                }
              />
            </Form.Item>
            <Form.Item
              name="tpOrdPx"
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
                    <span className="label">TP Order Price</span>
                    <Divider type="vertical" />
                  </>
                }
              />
            </Form.Item>
          </>
        )}
        {buyLossCheck && (
          <>
            <Form.Item
              name="slTriggerPx"
              rules={[
                { required: true, message: "Please enter the value." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
                {
                  validator: (_, value) => {
                    const price = form.getFieldValue("price");
                    if (parseFloat(value) === 0) {
                      return Promise.reject("Value cannot be zero.");
                    } else if (price < value) {
                      return Promise.reject(
                        "Stop Loss value must be lower than order price."
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
                prefix={
                  <>
                    <span className="label">SL Trigger Price</span>
                    <Divider type="vertical" />
                  </>
                }
              />
            </Form.Item>
            <Form.Item
              name="slOrdPx"
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
                    <span className="label">SL Order Price</span>
                    <Divider type="vertical" />
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
        onValuesChange={onSellQuantityChange}
      >
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
            prefix={
              <>
                <span className="label">Price</span>
                <Divider type="vertical" />
              </>
            }
            suffix={
              <>
                <span className="label">{quoteAsset}</span>
              </>
            }
          />
        </Form.Item>
        <Form.Item
          name="quantity"
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
        <Form.Item name="total">
          <Input
            autocomplete="off"
            className="input"
            // type="number"
            disabled
            suffix={
              <>
                <span className="label">{quoteAsset}</span>
              </>
            }
            prefix={
              <>
                <span className="label">Total</span>
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
          onChange={(e) => onSliderChange(e, "sell")}
          value={sellSlider}
        />
        <MaxSell
          balance={accountInfo?.data?.filter((item) => item?.ccy === baseAsset)}
          asset={baseAsset}
        />
        <Divider style={{ margin: "10px 0" }} />
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={sellProfitCheck}
            onClick={() => {
              setSellProfitCheck((prevState) => !prevState);
            }}
          >
            Take Profit
          </Checkbox>
          <Checkbox
            className="label"
            checked={sellLossCheck}
            onClick={() => {
              setSellLossCheck((prevState) => !prevState);
            }}
          >
            Stop Loss
          </Checkbox>
        </div>
        {sellProfitCheck && (
          <>
            <Form.Item
              name="tpTriggerPx"
              rules={[
                { required: true, message: "Please enter the value." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
                {
                  validator: (_, value) => {
                    const price = sellForm.getFieldValue("price");
                    if (parseFloat(value) === 0) {
                      return Promise.reject("Value cannot be zero.");
                    } else if (price < value) {
                      return Promise.reject(
                        "Take Profit value must be lower than order price."
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
                prefix={
                  <>
                    <span className="label">TP Trigger Price</span>
                    <Divider type="vertical" />
                  </>
                }
              />
            </Form.Item>
            <Form.Item
              name="tpOrdPx"
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
                    <span className="label">TP Order Price</span>
                    <Divider type="vertical" />
                  </>
                }
              />
            </Form.Item>
          </>
        )}
        {sellLossCheck && (
          <>
            <Form.Item
              name="slTriggerPx"
              rules={[
                { required: true, message: "Please enter the value." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
                {
                  validator: (_, value) => {
                    const price = sellForm.getFieldValue("price");
                    if (parseFloat(value) === 0) {
                      return Promise.reject("Value cannot be zero.");
                    } else if (price > value) {
                      return Promise.reject(
                        "Stop Loss value must be greater than order price."
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
                prefix={
                  <>
                    <span className="label">SL Trigger Price</span>
                    <Divider type="vertical" />
                  </>
                }
              />
            </Form.Item>
            <Form.Item
              name="slOrdPx"
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
                    <span className="label">SL Order Price</span>
                    <Divider type="vertical" />
                  </>
                }
              />
            </Form.Item>
          </>
        )}
        <SellButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
      </Form>
    </TabContainer>
  );
};

export default memo(LimitTab);

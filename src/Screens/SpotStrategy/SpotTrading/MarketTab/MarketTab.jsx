import { useTheme } from "styled-components";
import {
  StyledInputSelectPrefix,
  StyledSlider,
  TabContainer,
} from "../SpotTrading.styles";
import { Divider, Checkbox, Form, Input } from "antd";
import { toast } from "react-toastify";
import MaxSell from "../../MaxSell";
import {
  useGetAccountInfoQuery,
  usePlaceOrderMutation,
} from "../../../../Services/Transaction";
import { useState, useEffect } from "react";
import { useGetHighLowPriceQuery } from "../../../../Services/Market";
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

const InputSelectPrefix = ({
  coinValue,
  setCoinValue,
  baseAsset,
  quoteAsset,
  form,
  sellOption,
}) => {
  let optionArr = [
    {
      value: baseAsset,
      label: baseAsset,
    },
    {
      value: quoteAsset,
      label: quoteAsset,
    },
  ];
  if (sellOption) {
    optionArr = [
      {
        value: baseAsset,
        label: baseAsset,
      },
    ];
  }
  return (
    <StyledInputSelectPrefix
      size="small"
      value={coinValue}
      onChange={(e) => {
        setCoinValue({ value: e, label: e });
        form.setFieldsValue({
          total: "",
          quantity: "",
        });
      }}
      style={{
        width: 120,
      }}
      options={optionArr}
    />
  );
};

const MarketTab = ({ baseAsset, quoteAsset }) => {
  const [buySlider, setBuySlider] = useState(0);
  const [sellSlider, setSellSlider] = useState(0);
  const [buyLossCheck, setBuyLossCheck] = useState(false);
  const [sellLossCheck, setSellLossCheck] = useState(false);
  const [buyProfitCheck, setBuyProfitCheck] = useState(false);
  const [sellProfitCheck, setSellProfitCheck] = useState(false);
  const [side, setSide] = useState("");
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const theme = useTheme();
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
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [form] = Form.useForm();
  const [coinValue, setCoinValue] = useState({
    label: quoteAsset,
    value: quoteAsset,
  });
  const [coinSellValue, setCoinSellValue] = useState({
    label: baseAsset,
    value: baseAsset,
  });
  const [sellForm] = Form.useForm();
  const initialValues = {
    quantity: "",
  };

  useEffect(() => {
    setCoinValue((prevState) => {
      if (prevState?.value !== baseAsset) {
        return {
          value: quoteAsset,
          label: quoteAsset,
        };
      } else {
        return {
          value: baseAsset,
          label: baseAsset,
        };
      }
    });
    setCoinSellValue((prevState) => {
      if (prevState?.value !== baseAsset) {
        return {
          value: quoteAsset,
          label: quoteAsset,
        };
      } else {
        return {
          value: baseAsset,
          label: baseAsset,
        };
      }
    });
  }, [quoteAsset, baseAsset]);
  useEffect(() => {
    const buyQty = form.getFieldValue("quantity");
    const sellQty = sellForm.getFieldValue("quantity");
    form.setFieldsValue({
      total:
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(buyQty / hlCoinPriceData?.price)
          : convertIntoDecimal(buyQty * hlCoinPriceData?.price),
    });
    const availableBuyBal = accountInfo?.data?.filter((item) => {
      return item.ccy === quoteAsset ? item : "";
    });
    setBuySlider(
      coinValue?.value === quoteAsset
        ? Number((buyQty / availableBuyBal?.[0]?.availBal) * 100)
        : Number(
            ((buyQty * hlCoinPriceData?.price) /
              availableBuyBal?.[0]?.availBal) *
              100
          )
    );
    sellForm.setFieldsValue({
      total:
        coinSellValue?.value === quoteAsset
          ? convertIntoDecimal(sellQty / hlCoinPriceData?.price)
          : convertIntoDecimal(sellQty * hlCoinPriceData?.price),
    });
    const availableSellBal = accountInfo?.data?.filter((item) => {
      return item.ccy === baseAsset ? item : "";
    });
    setSellSlider(
      coinSellValue?.value === baseAsset
        ? Number((sellQty / availableSellBal?.[0]?.availBal) * 100)
        : Number(
            (sellQty /
              hlCoinPriceData?.price /
              availableSellBal?.[0]?.availBal) *
              100
          )
    );
  }, [hlCoinPriceData]);

  const setBuyFormField = (availableBal, value) => {
    if (availableBal?.[0]?.availBal) {
      form.setFieldsValue({
        quantity:
          coinValue?.value === quoteAsset
            ? convertIntoDecimal(availableBal?.[0]?.availBal * (value / 100))
            : convertIntoDecimal(
                (availableBal?.[0]?.availBal / hlCoinPriceData?.price) *
                  (value / 100)
              ),
      });
      const quantityVal = form.getFieldValue("quantity");
      form.setFieldValue(
        "total",
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(quantityVal / hlCoinPriceData?.price)
          : convertIntoDecimal(quantityVal * hlCoinPriceData?.price)
      );
    }
  };
  const setSellFormField = (availableBal, value) => {
    if (availableBal?.[0]?.availBal) {
      sellForm.setFieldsValue({
        quantity:
          coinSellValue?.value === quoteAsset
            ? convertIntoDecimal(
                availableBal?.[0]?.availBal *
                  hlCoinPriceData?.price *
                  (value / 100)
              )
            : convertIntoDecimal(availableBal?.[0]?.availBal * (value / 100)),
      });
      const quantityVal = sellForm.getFieldValue("quantity");

      sellForm.setFieldsValue({
        total:
          coinSellValue?.value === quoteAsset
            ? convertIntoDecimal(quantityVal / hlCoinPriceData?.price)
            : convertIntoDecimal(quantityVal * hlCoinPriceData?.price),
      });
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
  const onQuantityChange = () => {
    const quantityVal = form.getFieldValue("quantity");
    if (quantityVal < 0) {
      form.setFieldValue("quantity", "");
      return;
    }
    if (quantityVal) {
      form.setFieldValue(
        "total",
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(quantityVal / hlCoinPriceData?.price)
          : convertIntoDecimal(quantityVal * hlCoinPriceData?.price)
      );
      const availableBal = accountInfo?.data?.filter((item) => {
        return item.ccy === quoteAsset ? item : "";
      });
      setBuySlider(
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(
              (quantityVal / availableBal?.[0]?.availBal) * 100
            )
          : convertIntoDecimal(
              ((quantityVal * hlCoinPriceData?.price) /
                availableBal?.[0]?.availBal) *
                100
            )
      );
    } else {
      form.setFieldValue("total", "");
      setBuySlider(0);
    }
  };
  const onSellQuantityChange = () => {
    const quantityVal = sellForm.getFieldValue("quantity");
    if (quantityVal < 0) {
      sellForm.setFieldValue("quantity", "");
      return;
    }
    if (quantityVal) {
      sellForm.setFieldValue(
        "total",
        coinSellValue?.value === quoteAsset
          ? convertIntoDecimal(quantityVal / hlCoinPriceData?.price)
          : convertIntoDecimal(quantityVal * hlCoinPriceData?.price)
      );
      const availableBal = accountInfo?.data?.filter((item) => {
        return item.ccy === baseAsset ? item : "";
      });
      setSellSlider(
        coinSellValue?.value === baseAsset
          ? convertIntoDecimal(
              (quantityVal / availableBal?.[0]?.availBal) * 100
            )
          : convertIntoDecimal(
              (quantityVal /
                hlCoinPriceData?.price /
                availableBal?.[0]?.availBal) *
                100
            )
      );
    } else {
      sellForm.setFieldValue("total", "");
      setSellSlider(0);
    }
  };
  const handleSubmit = async (values) => {
    try {
      setSide("buy");
      const availableBal = accountInfo?.data?.filter((item) => {
        return item.ccy === quoteAsset ? item : "";
      });
      const inputBal =
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(values.quantity)
          : convertIntoDecimal(values.quantity * hlCoinPriceData?.price);
      if (
        !availableBal?.[0]?.availBal ||
        Number(availableBal?.[0]?.availBal) < Number(inputBal)
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
        symbol: `${baseAsset}${quoteAsset}`,
        side: "buy",
        type: "market",
        tdMode: "cash",
        // tgtCcy: coinValue?.value === quoteAsset ? "quote_ccy" : "base_ccy",
        quantity: Number(values.quantity),
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
  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === baseAsset ? item : ""
      );
      const inputBal =
        coinSellValue?.value === quoteAsset
          ? convertIntoDecimal(values.quantity / hlCoinPriceData?.price)
          : convertIntoDecimal(values.quantity);
      if (
        !availableBal?.[0]?.availBal ||
        Number(availableBal?.[0]?.availBal) < Number(inputBal)
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
        symbol: `${baseAsset}${quoteAsset}`,
        side: "sell",
        ordType: "market",
        tdMode: "cash",
        // tgtCcy: coinValue?.value === baseAsset ? "base_ccy" : "quote_ccy",
        sz: String(values.quantity),
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
        initialValues={initialValues}
        form={form}
        className="left"
        onValuesChange={onQuantityChange}
      >
        <Form.Item name="price">
          <Input
            className="input"
            // type="number"
            disabled
            placeholder={hlCoinPriceData?.price}
            value={hlCoinPriceData?.price}
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

        <div className="input-with-select">
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
          >
            <Input
              id="input-select"
              // type="number"
              className="input"
              prefix={
                <>
                  <span className="label">
                    {coinValue?.value === quoteAsset ? "Total" : "Amount"}
                  </span>
                  <Divider type="vertical" />
                </>
              }
            />
          </Form.Item>
          <InputSelectPrefix
            coinValue={coinValue}
            setCoinValue={setCoinValue}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            form={form}
          />
        </div>
        <Form.Item name="total">
          <Input
            className="input"
            // type="number"
            disabled
            suffix={
              <>
                <span className="label">
                  {coinValue?.value === baseAsset ? quoteAsset : baseAsset}
                </span>
              </>
            }
            prefix={
              <>
                <span className="label">
                  {coinValue?.value === baseAsset ? "Total" : "Amount"}
                </span>
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
        initialValues={initialValues}
        form={sellForm}
        className="left"
        onValuesChange={onSellQuantityChange}
      >
        <Form.Item name="price">
          <Input
            placeholder={hlCoinPriceData?.price}
            // type="number"
            className="input"
            disabled
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
        <div className="input-with-select">
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
          >
            <Input
              id="input-select"
              className="input"
              // type="number"
              // suffix={
              //   <>
              //     <span className="label">
              //       {coinValue?.value === "Total" ? quoteAsset : baseAsset}
              //     </span>
              //   </>
              // }
              prefix={
                <>
                  <span className="label">
                    {coinSellValue?.value === quoteAsset ? "Total" : "Amount"}
                  </span>
                  <Divider type="vertical" />
                </>
              }
            />
          </Form.Item>
          <InputSelectPrefix
            coinValue={coinSellValue}
            setCoinValue={setCoinSellValue}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            form={sellForm}
            sellOption
          />
        </div>
        <Form.Item name="total">
          <Input
            className="input"
            // type="number"
            disabled
            suffix={
              <>
                <span className="label">
                  {coinSellValue?.value === baseAsset ? quoteAsset : baseAsset}
                </span>
              </>
            }
            prefix={
              <>
                <span className="label">
                  {coinSellValue?.value === baseAsset ? "Total" : "Amount"}
                </span>
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

export default MarketTab;

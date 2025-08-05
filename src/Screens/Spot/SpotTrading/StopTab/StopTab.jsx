import { useTheme } from "styled-components";
import {
  StyledInputSelectPrefix,
  StyledSlider,
  TabContainer,
} from "../SpotTrading.styles";
import { Divider, Checkbox, Form, Input, Select } from "antd";
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

const StopTab = ({ baseAsset, quoteAsset, orderType }) => {
  const [buySlider, setBuySlider] = useState(0);
  const [sellSlider, setSellSlider] = useState(0);
  const [buyLossCheck, setBuyLossCheck] = useState(false);
  const [sellLossCheck, setSellLossCheck] = useState(false);
  const [buyProfitCheck, setBuyProfitCheck] = useState(false);
  const [activationCheck, setActivationCheck] = useState(false);
  const [sellProfitCheck, setSellProfitCheck] = useState(false);
  const [side, setSide] = useState("");
  const [trailingDelta, setTrailingDelta] = useState("1%");
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const theme = useTheme();

  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [buyForm] = Form.useForm();
  const [sellForm] = Form.useForm();
  const [coinValue, setCoinValue] = useState({
    label: quoteAsset,
    value: quoteAsset,
  });
  const [coinSellValue, setCoinSellValue] = useState({
    label: baseAsset,
    value: baseAsset,
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
  const initialValues = {
    quantity: "",
    trailingDelta: "1%",
  };

  useEffect(() => {
    setCoinValue({
      value: quoteAsset,
      label: quoteAsset,
    });
    setCoinSellValue({
      value: baseAsset,
      label: baseAsset,
    });
  }, [quoteAsset, baseAsset]);

  useEffect(() => {
    const buyQty = buyForm.getFieldValue("quantity");
    const sellQty = sellForm.getFieldValue("quantity");

    if (buyQty) {
      buyForm.setFieldsValue({
        total:
          coinValue?.value === quoteAsset
            ? convertIntoDecimal(buyQty / hlCoinPriceData?.price)
            : convertIntoDecimal(buyQty * hlCoinPriceData?.price),
      });
      const availableBuyBal = accountInfo?.data?.find(
        (item) => item.ccy === quoteAsset
      );
      setBuySlider(
        coinValue?.value === quoteAsset
          ? Number((buyQty / availableBuyBal?.availBal) * 100)
          : Number(
              ((buyQty * hlCoinPriceData?.price) / availableBuyBal?.availBal) *
                100
            )
      );
    }

    if (sellQty) {
      sellForm.setFieldsValue({
        total:
          coinSellValue?.value === quoteAsset
            ? convertIntoDecimal(sellQty / hlCoinPriceData?.price)
            : convertIntoDecimal(sellQty * hlCoinPriceData?.price),
      });
      const availableSellBal = accountInfo?.data?.find(
        (item) => item.ccy === baseAsset
      );
      setSellSlider(
        coinSellValue?.value === baseAsset
          ? Number((sellQty / availableSellBal?.availBal) * 100)
          : Number(
              (sellQty / hlCoinPriceData?.price / availableSellBal?.availBal) *
                100
            )
      );
    }
  }, [
    hlCoinPriceData,
    buyForm,
    sellForm,
    coinValue,
    coinSellValue,
    accountInfo?.data,
  ]);

  const setBuyFormField = (availableBal, value) => {
    if (availableBal?.availBal) {
      buyForm.setFieldsValue({
        quantity:
          coinValue?.value === quoteAsset
            ? convertIntoDecimal(availableBal.availBal * (value / 100))
            : convertIntoDecimal(
                (availableBal.availBal / hlCoinPriceData?.price) * (value / 100)
              ),
      });
      const quantityVal = buyForm.getFieldValue("quantity");
      buyForm.setFieldValue(
        "total",
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(quantityVal / hlCoinPriceData?.price)
          : convertIntoDecimal(quantityVal * hlCoinPriceData?.price)
      );
    }
  };

  const setSellFormField = (availableBal, value) => {
    if (availableBal?.availBal) {
      sellForm.setFieldsValue({
        quantity:
          coinSellValue?.value === quoteAsset
            ? convertIntoDecimal(
                availableBal.availBal * hlCoinPriceData?.price * (value / 100)
              )
            : convertIntoDecimal(availableBal.availBal * (value / 100)),
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
      const availableBal = accountInfo?.data?.find(
        (item) => item.ccy === quoteAsset
      );
      setBuySlider(value);
      setBuyFormField(availableBal, value);
    } else {
      const availableBal = accountInfo?.data?.find(
        (item) => item.ccy === baseAsset
      );
      setSellSlider(value);
      setSellFormField(availableBal, value);
    }
  };

  const onQuantityChange = () => {
    const quantityVal = buyForm.getFieldValue("quantity");
    if (quantityVal < 0) {
      buyForm.setFieldValue("quantity", "");
      return;
    }
    if (quantityVal) {
      buyForm.setFieldValue(
        "total",
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(quantityVal / hlCoinPriceData?.price)
          : convertIntoDecimal(quantityVal * hlCoinPriceData?.price)
      );
      const availableBal = accountInfo?.data?.find(
        (item) => item.ccy === quoteAsset
      );
      setBuySlider(
        coinValue?.value === quoteAsset
          ? convertIntoDecimal((quantityVal / availableBal?.availBal) * 100)
          : convertIntoDecimal(
              ((quantityVal * hlCoinPriceData?.price) /
                availableBal?.availBal) *
                100
            )
      );
    } else {
      buyForm.setFieldValue("total", "");
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
      const availableBal = accountInfo?.data?.find(
        (item) => item.ccy === baseAsset
      );
      setSellSlider(
        coinSellValue?.value === baseAsset
          ? convertIntoDecimal((quantityVal / availableBal?.availBal) * 100)
          : convertIntoDecimal(
              (quantityVal / hlCoinPriceData?.price / availableBal?.availBal) *
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
      const availableBal = accountInfo?.data?.find(
        (item) => item.ccy === quoteAsset
      );
      const inputBal =
        coinValue?.value === quoteAsset
          ? convertIntoDecimal(values.quantity)
          : convertIntoDecimal(values.quantity * hlCoinPriceData?.price);

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

      let formObj = {
        symbol: `${baseAsset}${quoteAsset}`,
        side: "BUY",
        type: "STOP_LOSS",
        quantity: Number(values.quantity),
        ...profitLossFields,
      };

      switch (orderType) {
        case "Stop Limit":
          formObj = {
            ...formObj,
            type: "STOP_LOSS_LIMIT",
            stopPrice: values.stop,
            price: values.limit,
            timeInForce: "GTC",
          };
          break;
        case "Stop Market":

          formObj = {
            ...formObj,
            type: "STOP_LOSS",
            stopPrice: values.stop,
          };
          break;
        case "Trailing Stop":
          formObj = {
            ...formObj,
            type: "TAKE_PROFIT_LIMIT",
            trailingDelta: parseFloat(100),
            price: values.limit,
            activationPrice: values.activationPrice,
            timeInForce: "GTC",
          };
          break;
        case "OCO":
          formObj = {
            ...formObj,
            type: "oco",
            stopPrice: values.stop,
            price: values.limit,
            stopLimitPrice: values.slLimit,
          };
          break;
        default:
          break;
      }

      console.log("formObj", {
        ...formObj,
      });

      const response = await placeOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.ordId) {
        toast.success("Order is placed.");
      }
      buyForm.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      // const availableBal = accountInfo?.data?.find(
      //   (item) => item.ccy === baseAsset
      // );
      // const inputBal =
      //   coinSellValue?.value === quoteAsset
      //     ? convertIntoDecimal(values.quantity / hlCoinPriceData?.price)
      //     : convertIntoDecimal(values.quantity);

      // let profitLossFields = {};
      // if (sellProfitCheck) {
      //   profitLossFields["tpTriggerPx"] = values?.tpTriggerPx;
      //   profitLossFields["tpOrdPx"] = values?.tpOrdPx;
      //   profitLossFields["tpTriggerPxType"] = values?.tpTriggerPxType;
      // }
      // if (sellLossCheck) {
      //   profitLossFields["slTriggerPx"] = values?.slTriggerPx;
      //   profitLossFields["slOrdPx"] = values?.slOrdPx;
      //   profitLossFields["slTriggerPxType"] = values?.slTriggerPxType;
      // }

      let formObj = {
        symbol: `${baseAsset}${quoteAsset}`,
        side: "sell",
        quantity: String(values.quantity),
        // ...profitLossFields,
      };

       switch (orderType) {
        case "Stop Limit":
          formObj = {
            ...formObj,
            type: "STOP_LOSS_LIMIT",
            stopPrice: values.stop,
            price: values.limit,
            timeInForce: "GTC",
          };
          break;
        case "Stop Market":

          formObj = {
            ...formObj,
            type: "STOP_LOSS",
            stopPrice: values.stop,
          };
          break;
        case "Trailing Stop":
          formObj = {
            ...formObj,
            type: "TAKE_PROFIT_LIMIT",
            trailingDelta: parseFloat(100),
            price: values.limit,
            activationPrice: values.activationPrice,
            timeInForce: "GTC",
          };
          break;
        case "OCO":
          formObj = {
            ...formObj,
            type: "oco",
            stopPrice: values.stop,
            price: values.limit,
            stopLimitPrice: values.slLimit,
          };
          break;
        default:
          break;
      }


      const response = await placeOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.ordId) {
        toast.success("Order is placed.");
      }
      sellForm.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    console.log("Form values:", buyForm.getFieldsValue());
  }, [buyForm]);

  const renderOrderTypeFields = (isBuy = true) => {
    const form = isBuy ? buyForm : sellForm;

    switch (orderType) {
      case "Stop Limit":
        return (
          <>
            <Form.Item
              name="stop"
              rules={[
                { required: true, message: "Please enter stop price." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
              ]}
            >
              <Input
                autocomplete="off"
                className="input"
                prefix={
                  <>
                    <span className="label">Stop</span>
                    <Divider type="vertical" />
                  </>
                }
                suffix={<span className="label">{quoteAsset}</span>}
              />
            </Form.Item>
            <Form.Item
              name="limit"
              rules={[
                { required: true, message: "Please enter limit price." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
              ]}
            >
              <Input
                autocomplete="off"
                className="input"
                prefix={
                  <>
                    <span className="label">Limit</span>
                    <Divider type="vertical" />
                  </>
                }
                suffix={<span className="label">{quoteAsset}</span>}
              />
            </Form.Item>
          </>
        );
      case "Stop Market":
        return (
          <>
            <Form.Item
              name="stop"
              rules={[
                { required: true, message: "Please enter stop price." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
              ]}
            >
              <Input
                autocomplete="off"
                className="input"
                prefix={
                  <>
                    <span className="label">Stop</span>
                    <Divider type="vertical" />
                  </>
                }
                suffix={<span className="label">{quoteAsset}</span>}
              />
            </Form.Item>
            <Form.Item name="price">
              <Input
                autocomplete="off"
                placeholder={hlCoinPriceData?.price}
                value={hlCoinPriceData?.price}
                className="input"
                disabled
                prefix={
                  <>
                    <span className="label">Price</span>
                    <Divider type="vertical" />
                  </>
                }
                suffix={<span className="label">{quoteAsset}</span>}
              />
            </Form.Item>
          </>
        );
      case "Trailing Stop":
        return (
          <>
            <Form.Item name="trailingDelta">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Input
                  autocomplete="off"
                  className="input"
                  prefix={
                    <>
                      <span className="label">Trailing Delta</span>
                      <Divider type="vertical" />
                    </>
                  }
                  // suffix={<span className="label">{trailingDelta}</span>}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {["1%", "2%"].map((percent) => (
                    <div
                      key={percent}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        // background: trailingDelta === percent ? theme.colors.primary : 'transparent',
                        cursor: "pointer",
                        border:
                          form.getFieldValue("trailingDelta") === percent
                            ? "1px solid #fff"
                            : theme.colors.white,
                        color:
                          form.getFieldValue("trailingDelta") === percent
                            ? "#fff"
                            : theme.colors.white,
                      }}
                      onClick={() => {
                        form.setFieldsValue({ trailingDelta: percent });
                      }}
                    >
                      {percent}
                    </div>
                  ))}
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name="limit"
              rules={[
                { required: true, message: "Please enter limit price." },
                {
                  pattern: /^[+]?\d+(\.\d+)?$/,
                  message: "Please enter a valid number.",
                },
              ]}
            >
              <Input
                autocomplete="off"
                className="input"
                prefix={
                  <>
                    <span className="label">Limit</span>
                    <Divider type="vertical" />
                  </>
                }
                suffix={<span className="label">{quoteAsset}</span>}
              />
            </Form.Item>
          </>
        );
      case "OCO":
        return (
          <>
            <div>
              <Form.Item
                name="tpTriggerPrice"
                rules={[
                  { required: true, message: "Please enter TP trigger price." },
                  { pattern: /^[+]?\d+(\.\d+)?$/, message: "Invalid number." },
                ]}
              >
                <Input
                  autocomplete="off"
                  className="input"
                  prefix={<span className="label">TP Limit</span>}
                  suffix={<span className="label">{quoteAsset}</span>}
                />
              </Form.Item>
              <Form.Item
                name="tpTriggerPrice"
                rules={[
                  { required: true, message: "Please enter TP trigger price." },
                  { pattern: /^[+]?\d+(\.\d+)?$/, message: "Invalid number." },
                ]}
              >
                <Input
                  autocomplete="off"
                  className="input"
                  prefix={<span className="label">SL Trigger</span>}
                  suffix={<span className="label">{quoteAsset}</span>}
                />
              </Form.Item>
              <Form.Item
                name="tpLimitPrice"
                rules={[
                  { required: true, message: "Please enter TP limit price." },
                  { pattern: /^[+]?\d+(\.\d+)?$/, message: "Invalid number." },
                ]}
              >
                <Input
                  autocomplete="off"
                  className="input"
                  prefix={<span className="label">Limit</span>}
                  suffix={<span className="label">{quoteAsset}</span>}
                />
              </Form.Item>
            </div>

            <Form.Item name="slMarketPrice">
              <Input
                autocomplete="off"
                className="input"
                disabled
                prefix={<span className="label">SL Market</span>}
                suffix={<span className="label">{quoteAsset}</span>}
              />
            </Form.Item>
            <Form.Item
              name="amount"
              rules={[
                { required: true, message: "Please enter amount." },
                { pattern: /^[+]?\d+(\.\d+)?$/, message: "Invalid number." },
                {
                  validator: (_, value) =>
                    value > 0
                      ? Promise.resolve()
                      : Promise.reject("Amount must be positive"),
                },
              ]}
            >
              <Input
                autocomplete="off"
                className="input"
                prefix={<span className="label">Amount</span>}
                suffix={<span className="label">{baseAsset}</span>}
              />
            </Form.Item>

            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span className="label">Avbl</span>
              <span className="label">Max.Buy</span>
              <span className="label">Est. Fee</span>
            </div> */}
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="label">0.00000000 {quoteAsset}</span>
              <span className="label">0 {baseAsset}</span>
              <span className="label">0 {quoteAsset}</span>
            </div> */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <TabContainer>
      <Form
        onFinish={handleSubmit}
        initialValues={initialValues}
        form={buyForm}
        className="left"
        onValuesChange={onQuantityChange}
      >
        {renderOrderTypeFields(true)}

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
              autocomplete="off"
              id="input-select"
              className="input"
              prefix={
                <>
                  <span className="label">{"Amount"}</span>
                  <Divider type="vertical" />
                </>
              }
            />
          </Form.Item>
          {/* <InputSelectPrefix
            coinValue={coinValue}
            setCoinValue={setCoinValue}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            form={buyForm}
          /> */}
        </div>

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
        <Checkbox
          className="label"
          checked={activationCheck}
          onClick={() => {
            setActivationCheck((prevState) => !prevState);
          }}
        >
          Activation Price
        </Checkbox>
        {/* <Divider style={{ margin: "10px 0" }} /> */}
        {activationCheck && (
          <Form.Item
            name="activationPrice"
            rules={[
              { required: true, message: "Please enter activation price." },
              {
                pattern: /^[+]?\d+(\.\d+)?$/,
                message: "Please enter a valid number.",
              },
            ]}
          >
            <Input
              autocomplete="off"
              className="input"
              prefix={
                <>
                  <span className="label">Activation Price</span>
                  <Divider type="vertical" />
                </>
              }
              suffix={<span className="label">{quoteAsset}</span>}
            />
          </Form.Item>
        )}

        {/* <div className="checkbox-container">
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
        </div> */}
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
                autocomplete="off"
                className="input"
                suffix={<span className="label">{quoteAsset}</span>}
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
                suffix={<span className="label">{quoteAsset}</span>}
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
                autocomplete="off"
                className="input"
                suffix={<span className="label">{quoteAsset}</span>}
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
                suffix={<span className="label">{quoteAsset}</span>}
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
        {/* {orderType !== "Trailing Stop" && (
          <Form.Item name="price">
            <Input
              autocomplete="off"
              placeholder={hlCoinPriceData?.price}
              className="input"
              disabled
              prefix={
                <>
                  <span className="label">Price</span>
                  <Divider type="vertical" />
                </>
              }
              suffix={<span className="label">{quoteAsset}</span>}
            />
          </Form.Item>
        )} */}

        {renderOrderTypeFields(false)}

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
              autocomplete="off"
              id="input-select"
              className="input"
              prefix={
                <>
                  <span className="label">{"Amount"}</span>
                  <Divider type="vertical" />
                </>
              }
            />
          </Form.Item>
          {/* <InputSelectPrefix
            coinValue={coinSellValue}
            setCoinValue={setCoinSellValue}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            form={sellForm}
            sellOption
          /> */}
        </div>

        {/* <Form.Item name="total">
          <Input
            autocomplete="off"
            className="input"
            disabled
            suffix={
              <span className="label">
                {coinSellValue?.value === baseAsset ? quoteAsset : baseAsset}
              </span>
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
        </Form.Item> */}

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
        {/* <Divider style={{ margin: "10px 0" }} />
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
        </div> */}
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
                autocomplete="off"
                className="input"
                suffix={<span className="label">{quoteAsset}</span>}
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
                suffix={<span className="label">{quoteAsset}</span>}
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
        <Checkbox
          className="label"
          checked={activationCheck}
          onClick={() => {
            setActivationCheck((prevState) => !prevState);
          }}
        >
          Activation Price
        </Checkbox>
        {/* <Divider style={{ margin: "10px 0" }} /> */}
        {activationCheck && (
          <Form.Item
            name="activationPrice"
            rules={[
              { required: true, message: "Please enter activation price." },
              {
                pattern: /^[+]?\d+(\.\d+)?$/,
                message: "Please enter a valid number.",
              },
            ]}
          >
            <Input
              autocomplete="off"
              className="input"
              prefix={
                <>
                  <span className="label">Activation Price</span>
                  <Divider type="vertical" />
                </>
              }
              suffix={<span className="label">{quoteAsset}</span>}
            />
          </Form.Item>
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
                autocomplete="off"
                className="input"
                suffix={<span className="label">{quoteAsset}</span>}
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
                suffix={<span className="label">{quoteAsset}</span>}
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

export default StopTab;

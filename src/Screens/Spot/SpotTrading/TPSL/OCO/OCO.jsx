import { useTheme } from "styled-components";
import {
  OCOInputSelectPrefix,
  StyledInputSelectPrefix,
  StyledSlider,
} from "../../SpotTrading.styles";
import { Divider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAccountInfoQuery,
  usePlaceAdvancedOrderMutation,
} from "../../../../../Services/Transaction";
import { convertIntoDecimal } from "../../../../../Utils/common";
import { useGetHighLowPriceQuery } from "../../../../../Services/Market";
import { useGetUserQuery } from "../../../../../Services/Auth";
import BuyButton from "../../Component/BuyButton";
import SellButton from "../../Component/SellButton";
import MaxSell from "../../../MaxSell";
import { useSelector } from "react-redux";

const marks = {
  0: "0",
  25: "25",
  50: "50",
  75: "75",
  100: "100",
};

const defaultValues = {
  slOrdPx: "",
  slTriggerPx: "",
  tpOrdPx: "",
  tpTriggerPx: "",
  orderType: "",
  sz: "",
};

const orderTypeOption = [
  {
    value: "Market",
    label: "Market",
  },
  {
    value: "Limit",
    label: "Limit",
  },
];
const InputSelectSuffix = ({
  coinValue,
  setCoinValue,
  baseAsset,
  quoteAsset,
  form,
  setSlider,
  sellOption,
}) => {
  const selectOption = sellOption
    ? [
        {
          value: baseAsset,
          label: baseAsset,
        },
      ]
    : [
        {
          value: baseAsset,
          label: baseAsset,
        },
        {
          value: quoteAsset,
          label: quoteAsset,
        },
      ];
  return (
    <StyledInputSelectPrefix
      size="small"
      value={coinValue}
      onChange={(e) => {
        setCoinValue({ value: e, label: e });
        form.setFieldsValue({
          sz: "",
        });
        setSlider(0);
      }}
      style={{
        width: 120,
      }}
      options={selectOption}
    />
  );
};
const InputSelectPrefix = ({ coinValue, setCoinValue, form }) => {
  return (
    <OCOInputSelectPrefix
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
      options={orderTypeOption}
    />
  );
};

const defaultLimitValue = {
  value: "Market",
  label: "Market",
};
const OCO = ({ baseAsset, quoteAsset }) => {
  const theme = useTheme();
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const [buySlider, setBuySlider] = useState(0);
  const [buyTpLimit, setBuyTpLimit] = useState(defaultLimitValue);
  const [sellTpLimit, setSellTpLimit] = useState(defaultLimitValue);
  const [buySlLimit, setBuySelLimit] = useState(defaultLimitValue);
  const [sellSlLimit, setSellSlLimit] = useState(defaultLimitValue);
  const [sellSlider, setSellSlider] = useState(0);
  const [coinValue, setCoinValue] = useState({
    value: quoteAsset,
    label: quoteAsset,
  });
  const [coinSellValue, setCoinSellValue] = useState({
    value: baseAsset,
    label: baseAsset,
  });

  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
    usePlaceAdvancedOrderMutation();
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

  useEffect(() => {
    if (sellTpLimit?.value === "Market") {
      sellForm.setFieldsValue({ tpOrdPx: "" });
    }
  }, [sellTpLimit]);
  useEffect(() => {
    if (buyTpLimit?.value === "Market") {
      form.setFieldsValue({ tpOrdPx: "" });
    }
  }, [buyTpLimit]);
  useEffect(() => {
    if (sellSlLimit?.value === "Market") {
      sellForm.setFieldsValue({ slOrdPx: "" });
    }
  }, [sellSlLimit]);
  useEffect(() => {
    if (buySlLimit?.value === "Market") {
      form.setFieldsValue({ slOrdPx: "" });
    }
  }, [buySlLimit]);

  const handleSubmit = async (values) => {
    try {
      setSide("buy");
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === quoteAsset ? item : ""
      );
      const inputBal = values.total;
      if (
        !availableBal?.[0]?.availBal ||
        convertIntoDecimal(availableBal?.[0]?.availBal) < coinValue?.value ===
          quoteAsset
          ? convertIntoDecimal(inputBal)
          : convertIntoDecimal(inputBal * hlCoinPriceData?.price)
      ) {
        toast.error("Insufficient Balance!");
        return;
      }
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "buy",
        tdMode: "cash",
        tpOrdPx: values.tpOrdPx || "-1", // here -1 means we are placing marketOrder
        tpTriggerPx: String(values.tpTriggerPx),
        tpTriggerPxType: "last",
        slTriggerPxType: "last",
        ordType: "oco",
        slTriggerPx: String(values.slTriggerPx),
        slOrdPx: values.slOrdPx || "-1", // here -1 means we are placing marketOrder
        sz: String(values.sz),
        tgtCcy: coinValue?.value === quoteAsset ? "quote_ccy" : "base_ccy",
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

  const onSellQuantityChange = () => {
    const quantityVal = sellForm.getFieldValue("sz");
    if (quantityVal < 0) {
      sellForm.setFieldValue("sz", "");
      return;
    }
    if (quantityVal) {
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
      setSellSlider(0);
    }
  };
  const onQuantityChange = () => {
    const quantityVal = form.getFieldValue("sz");
    if (quantityVal < 0) {
      form.setFieldValue("sz", "");
      return;
    }
    if (quantityVal) {
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
      setBuySlider(0);
    }
  };

  const setBuyFormField = (availableBal, value, asset) => {
    if (availableBal?.[0]?.availBal) {
      if (coinValue?.value === asset) {
        form.setFieldsValue({
          sz: convertIntoDecimal(availableBal[0].availBal * (value / 100)),
        });
      } else {
        form.setFieldsValue({
          sz: convertIntoDecimal(
            (availableBal[0].availBal * (value / 100)) / hlCoinPriceData?.price
          ),
        });
      }
    }
  };
  const setSellFormField = (availableBal, value, asset) => {
    if (availableBal?.[0]?.availBal) {
      if (coinSellValue?.value === asset) {
        sellForm.setFieldsValue({
          sz: convertIntoDecimal(availableBal?.[0]?.availBal * (value / 100)),
        });
      } else {
        sellForm.setFieldsValue({
          sz:
            convertIntoDecimal(availableBal?.[0]?.availBal * (value / 100)) *
            hlCoinPriceData?.price,
        });
      }
    }
  };
  const onSliderChange = (value, type) => {
    if (type === "buy") {
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === quoteAsset ? item : ""
      );
      setBuySlider(value);
      setBuyFormField(availableBal, value, quoteAsset);
    } else {
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === baseAsset ? item : ""
      );
      setSellSlider(value);
      setSellFormField(availableBal, value, baseAsset);
    }
  };
  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      const availableBal = accountInfo?.data?.filter((item) =>
        item.ccy === baseAsset ? item : ""
      );
      const inputBal = values.sz;
      if (
        !availableBal?.[0]?.availBal ||
        convertIntoDecimal(availableBal?.[0]?.availBal) <
          (coinSellValue?.value === baseAsset
            ? convertIntoDecimal(inputBal)
            : convertIntoDecimal(inputBal / hlCoinPriceData?.price))
      ) {
        toast.error("Insufficient Balance!");
        return;
      }
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "sell",
        tdMode: "cash",
        tpOrdPx: values.tpOrdPx || "-1", // here -1 means we are placing marketOrder
        tpTriggerPx: String(values.tpTriggerPx),
        tpTriggerPxType: "last",
        slTriggerPxType: "last",
        ordType: "oco",
        slTriggerPx: String(values.slTriggerPx),
        slOrdPx: values.slOrdPx || "-1", // here -1 means we are placing marketOrder
        sz: String(values.sz),
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
        onValuesChange={onQuantityChange}
      >
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
                } else if (Number(hlCoinPriceData?.price) < Number(value)) {
                  return Promise.reject(
                    "Take Profit value must be lower than current price."
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
        <div className="input-oco-select">
          <Form.Item
            name="tpOrdPx"
            rules={[
              {
                required: buyTpLimit?.value === "Limit" ? true : false,
                message: "Please enter the value.",
              },
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
              // type="number"
              className="input"
              disabled={buyTpLimit?.value === "Market"}
              placeholder={
                buyTpLimit?.value === "Market" ? "Best Market Price" : ""
              }
              suffix={
                <>
                  <Divider type="vertical" />
                  <span className="label">{quoteAsset}</span>
                </>
              }
              prefix={<span style={{ width: "85px" }}></span>}
            />
          </Form.Item>
          <InputSelectPrefix
            coinValue={buyTpLimit}
            setCoinValue={setBuyTpLimit}
            form={form}
          />
        </div>
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
                } else if (Number(hlCoinPriceData?.price) > Number(value)) {
                  return Promise.reject(
                    "Stop loss value must be greater than current price."
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
        <div className="input-oco-select">
          <Form.Item
            name="slOrdPx"
            rules={[
              {
                required: buySlLimit?.value === "Limit" ? true : false,
                message: "Please enter the value.",
              },
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
              // type="number"
              className="input"
              disabled={buySlLimit?.value === "Market"}
              placeholder={
                buySlLimit?.value === "Market" ? "Best Market Price" : ""
              }
              suffix={
                <>
                  <Divider type="vertical" />
                  <span className="label">{quoteAsset}</span>
                </>
              }
              prefix={<span style={{ width: "85px" }}></span>}
            />
          </Form.Item>
          <InputSelectPrefix
            coinValue={buySlLimit}
            setCoinValue={setBuySelLimit}
            form={form}
          />
        </div>
        <div className="input-with-select">
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
                    {coinValue?.value === quoteAsset ? "Total" : "Amount"}
                  </span>
                  <Divider type="vertical" />
                </>
              }
            />
          </Form.Item>
          <InputSelectSuffix
            coinValue={coinValue}
            setCoinValue={setCoinValue}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            form={form}
            setSlider={setBuySlider}
          />
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
                } else if (Number(hlCoinPriceData?.price) > Number(value)) {
                  return Promise.reject(
                    "Take profit value must be greater than current price."
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

        <div className="input-oco-select">
          <Form.Item
            name="tpOrdPx"
            rules={[
              {
                required: sellTpLimit?.value === "Limit" ? true : false,
                message: "Please enter the value.",
              },
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
              // type="number"
              className="input"
              disabled={sellTpLimit?.value === "Market"}
              placeholder={
                sellTpLimit?.value === "Market" ? "Best Market Price" : ""
              }
              suffix={
                <>
                  <Divider type="vertical" />
                  <span className="label">{quoteAsset}</span>
                </>
              }
              prefix={<span style={{ width: "85px" }}></span>}
            />
          </Form.Item>
          <InputSelectPrefix
            coinValue={sellTpLimit}
            setCoinValue={setSellTpLimit}
            form={sellForm}
          />
        </div>
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
                } else if (Number(hlCoinPriceData?.price) < Number(value)) {
                  return Promise.reject(
                    "Stop loss value must be lower than current price."
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
            suffix={
              <>
                <span className="label">{quoteAsset}</span>
              </>
            }
            className="input"
            prefix={
              <>
                <span className="label">SL Trigger Price</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <div className="input-with-select">
          <Form.Item
            name="slOrdPx"
            rules={[
              {
                required: sellSlLimit?.value === "Limit" ? true : false,
                message: "Please enter the value.",
              },
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
              disabled={sellSlLimit?.value === "Market"}
              placeholder={
                sellSlLimit?.value === "Market" ? "Best Market Price" : ""
              }
              suffix={<span className="label">{quoteAsset}</span>}
              prefix={
                <>
                  <span style={{ width: "85px" }}></span>
                </>
              }
            />
          </Form.Item>
          <InputSelectPrefix
            coinValue={sellSlLimit}
            setCoinValue={setSellSlLimit}
            form={sellForm}
          />
        </div>
        <div className="input-with-select">
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
          <InputSelectSuffix
            coinValue={coinSellValue}
            setCoinValue={setCoinSellValue}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            form={sellForm}
            setSlider={setSellSlider}
            sellOption
          />
        </div>
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

export default OCO;

import { useTheme } from "styled-components";
import { Checkbox, Divider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAccountInfoQuery,
  useFeaturePlaceOrderMutation,
} from "../../../Services/Transaction";
import {
  convertExponentialToDecimal,
  convertIntoDecimal,
} from "../../../Utils/common";
import { useGetUserQuery } from "../../../Services/Auth";
import {
  AbsoluteSelect,
  OCOInputSelectPrefix,
  StyledSlider,
} from "../SpotTrading.styles";
import SellButton from "../Component/SellButton";
import BuyButton from "../Component/BuyButton";
import { SWAP_FEE, priceTypeOption, tradeType } from "../../../Constants/state";
import MaxAvailable from "../../MaxAvailable/MaxAvailable";
import {
  useGetContractValueQuery,
  useGetHighLowPriceQuery,
  useGetHighLowPriceWSQuery,
} from "../../../Services/Swap";
import ValueLabel from "./ValueLabel";
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
const PriceOption = {
  value: "Market",
  label: "Market",
};
const SelectSuffix = ({ value, setValue, optionArr }) => {
  return (
    <AbsoluteSelect
      size="small"
      value={value}
      onChange={(e, key) => {
        setValue(e);
      }}
      style={{
        width: 120,
      }}
      options={optionArr}
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
const Conditional = ({ baseAsset, quoteAsset, leverageMode, leverage }) => {
  const theme = useTheme();
  const [buySlider, setBuySlider] = useState(0);
  const [buyPrice, setBuyPrice] = useState(PriceOption);
  const [sellPrice, setSellPrice] = useState(PriceOption);
  const [buyPxType, setBuyPxType] = useState("Mark");
  const { data: ctVal } = useGetContractValueQuery({
    instId: `${baseAsset}${quoteAsset}`,
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sellPxType, setSellPxType] = useState("Mark");
  const [buyReduceOnly, setBuyReduceOnly] = useState(false);
  const [maxBuyValue, setMaxBuyValue] = useState(false);
  const [maxSellValue, setMaxSellValue] = useState(false);
  const [sellReduceOnly, setSellReduceOnly] = useState(false);
  const [sellSlider, setSellSlider] = useState(0);
  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
  useFeaturePlaceOrderMutation();
  const { data: hlCoinPriceData } = useGetHighLowPriceQuery({
    filter: quoteAsset,
    id: baseAsset,
  });
  const { data: coinPairCurrentPrice } = useGetHighLowPriceWSQuery({
    base_asset: baseAsset,
    quote_asset: quoteAsset,
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
    // if (quantityVal) {
    //   const availableBal = accountInfo?.data?.filter((item) => {
    //     return item.ccy === quoteAsset ? item : "";
    //   });
    //   setBuySlider(
    //     convertIntoDecimal((quantityVal / availableBal?.[0]?.availBal) * 100)
    //   );
    // } else {
    //   setBuySlider(0);
    // }
    setBuySlider(0);
  };
  useEffect(() => {
    const availableBal = accountInfo?.data?.filter((item) =>
      item.asset === quoteAsset ? item : ""
    );
    const contValue =
      (Number(availableBal?.[0]?.free) * Number(leverage)) /
      Number(coinPairCurrentPrice?.price);
    setMaxBuyValue(contValue);
    setMaxSellValue(contValue);
  }, [leverage, coinPairCurrentPrice, accountInfo]);
  const handleSubmit = async (values) => {
    console.log(values, "values---------------");
    try {
      setSide("buy");
      const formObj = {
        // instId: `${baseAsset}${quoteAsset}${tradeType?.swap}`,
        // side: "buy",
        // posSide: "long",
        // tdMode: String(leverageMode).toLowerCase(),
        // ordType: "conditional",
        // reduceOnly: String(buyReduceOnly),
        // sz: String(values.amount),
        symbol: `${baseAsset}${quoteAsset}`,
        side: "BUY",
        timeInForce: "GTC",
        type: "TAKE_PROFIT",
        quantity: String(values.amount),
        timestamp: Date.now(),
        price: values.Price,
        stopPrice: values.stopPrice,
      };
      // if (
      //   values.stopPrice > convertExponentialToDecimal(hlCoinPriceData?.price)
      // ) {
      //   formObj.slTriggerPx = String(values.stopPrice);
      //   formObj.slTriggerPxType = String(buyPxType).toLowerCase();
      //   formObj.slOrdPx =
      //     buyPrice.value === "Market" ? String(-1) : values.Price;
      // } else {
      //   formObj.tpTriggerPx = String(values.stopPrice);
      //   formObj.tpTriggerPxType = String(buyPxType).toLowerCase();
      //   formObj.tpOrdPx =
      //     buyPrice.value === "Market" ? String(-1) : values.Price;
      // }
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
      form.resetFields();
    }
  };

  useEffect(() => {
    setMinPrice(
      Number(
        Number(hlCoinPriceData?.price) -
          Number(hlCoinPriceData?.price) * Number(SWAP_FEE?.maker)
      ).toFixed(2)
    );
    setMaxPrice(
      Number(
        Number(hlCoinPriceData?.price) * Number(SWAP_FEE?.maker) +
          Number(hlCoinPriceData?.price)
      ).toFixed(2)
    );
  }, [hlCoinPriceData]);
  const onSliderChange = (value, type) => {
    if (type === "buy") {
      setBuySlider(value);
      form.setFieldsValue({
        amount: convertIntoDecimal(maxBuyValue * (value / 100)),
      });
    } else {
      setSellSlider(value);
      sellForm.setFieldsValue({
        amount: convertIntoDecimal(maxSellValue * (value / 100)),
      });
    }
  };
  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      const formObj = {
        // instId: `${baseAsset}${quoteAsset}${tradeType?.swap}`,
        // side: "sell",
        // posSide: "short",
        // tdMode: String(leverageMode).toLowerCase(),
        // reduceOnly: String(sellReduceOnly),
        // ordType: "conditional",
        // sz: String(values.amount),
        symbol: `${baseAsset}${quoteAsset}`,
        side: "SELL",
        timeInForce: "GTC",
        type: "TAKE_PROFIT",
        quantity: String(values.amount),
        timestamp: Date.now(),
        price: values.Price,
        stopPrice: values.stopPrice,
      };
      // if (
      //   values.stopPrice < convertExponentialToDecimal(hlCoinPriceData?.price)
      // ) {
      //   formObj.slTriggerPx = String(values.stopPrice);
      //   formObj.slTriggerPxType = String(sellPxType).toLowerCase();
      //   formObj.slOrdPx =
      //     sellPrice.value === "Market" ? String(-1) : values.Price;
      // } else {
      //   formObj.tpTriggerPx = String(values.stopPrice);
      //   formObj.tpTriggerPxType = String(sellPxType).toLowerCase();
      //   formObj.tpOrdPx =
      //     sellPrice.value === "Market" ? String(-1) : values.Price;
      // }
      // if (values.amountType === "amount") {
      //   formObj.tgtCcy = "base_ccy";
      // }
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      sellForm.resetFields();
    } catch (error) {
      toast.error(error?.data?.message);
      sellForm.resetFields();
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
        return item.asset === baseAsset ? item : "";
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
        <div className="relative-container">
          <Form.Item>
            <Input
              autocomplete="off"
              disabled
              className="input-color"
              placeholder={"Trigger Price Type"}
            />
          </Form.Item>
          <SelectSuffix
            value={buyPxType}
            setValue={setBuyPxType}
            optionArr={priceTypeOption}
          />
        </div>
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
                <span className="label">Trigger Price</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <div className="input-oco-select">
          <Form.Item
            name="Price"
            rules={[
              {
                required: buyPrice?.value === "Limit" ? true : false,
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
              disabled={buyPrice?.value === "Market"}
              placeholder={
                buyPrice?.value === "Market" ? "Best Market Price" : ""
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
            coinValue={buyPrice}
            setCoinValue={setBuyPrice}
            form={form}
          />
        </div>
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+?$/,
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
            style={{ color: "transparent !important" }}
            placeholder={`Single contract value ${ctVal?.ctVal} ${baseAsset}`}
            suffix={
              <>
                <span className="label">Cont</span>
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
        <MaxAvailable
          balance={accountInfo?.data?.filter(
            (item) => item?.asset === quoteAsset
          )}
          asset={quoteAsset}
          sideText={"Max buy"}
          sideTextValue={maxBuyValue}
          sideAsset={"Cont"}
        />
        <Divider style={{ margin: "10px 0" }} />
        <div className="checkbox-container">
          <Checkbox
            className="label"
            onClick={() => {
              setBuyReduceOnly((prevState) => !prevState);
            }}
          >
            Reduce Only
          </Checkbox>
        </div>
        <BuyButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
        <ValueLabel value={maxPrice} label="Max Price :" />
      </Form>
      <Form
        onFinish={handleSellSubmit}
        initialValues={defaultValues}
        form={sellForm}
        className="left"
        onValuesChange={onSellQuantityChange}
      >
        <div className="relative-container">
          <Form.Item>
            <Input
              autocomplete="off"
              disabled
              className="input-color"
              placeholder={"Trigger Price Type"}
            />
          </Form.Item>
          <SelectSuffix
            value={sellPxType}
            setValue={setSellPxType}
            optionArr={priceTypeOption}
          />
        </div>
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
                <span className="label">Trigger Price</span>
                <Divider type="vertical" />
              </>
            }
          />
        </Form.Item>
        <div className="input-oco-select">
          <Form.Item
            name="Price"
            rules={[
              {
                required: sellPrice?.value === "Limit" ? true : false,
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
              disabled={sellPrice?.value === "Market"}
              placeholder={
                sellPrice?.value === "Market" ? "Best Market Price" : ""
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
            coinValue={sellPrice}
            setCoinValue={setSellPrice}
            form={sellForm}
          />
        </div>
        <Form.Item
          name="amount"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+?$/,
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
            style={{ color: "transparent !important" }}
            placeholder={`Single contract value ${ctVal?.ctVal} ${baseAsset}`}
            suffix={
              <>
                <span className="label">Cont</span>
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
        <MaxAvailable
          balance={accountInfo?.data?.filter(
            (item) => item?.asset === quoteAsset
          )}
          asset={quoteAsset}
          sideText={"Max Sell"}
          sideTextValue={maxSellValue}
          sideAsset={"Cont"}
        />
        <Divider style={{ margin: "10px 0" }} />
        <div className="checkbox-container">
          <Checkbox
            className="label"
            onClick={() => {
              setSellReduceOnly((prevState) => !prevState);
            }}
          >
            Reduce Only
          </Checkbox>
        </div>
        <SellButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
        <ValueLabel value={minPrice} label="Min Price :" />
      </Form>
    </>
  );
};

export default Conditional;

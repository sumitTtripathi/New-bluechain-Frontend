/* eslint-disable */
import { useTheme } from "styled-components";
import {
  AbsoluteSelect,
  StyledInputSelectPrefix,
  StyledSlider,
} from "../SpotTrading.styles";
import { Divider, Input, Form, Checkbox } from "antd";
import lodash from "lodash";
import { toast } from "react-toastify";
import {
  useGetAccountInfoQuery,
  usePlaceOrderMutation,
} from "../../../Services/Transaction";
import { memo, useEffect, useState } from "react";
import BuyButton from "../Component/BuyButton";
import SellButton from "../Component/SellButton";
import { setPerpAmountDropdown, useGetUserQuery } from "../../../Services/Auth";
import { useGetHighLowPriceWSQuery } from "../../../Services/Market";
import { convertIntoDecimal, evaluateValue } from "../../../Utils/common";
import MaxNCost from "../../MaxNCost/MaxNCost";
import {
  AmountOption,
  SWAP_FEE,
  getAsset,
  priceTypeOption,
  tradeType,
} from "../../../Constants/state";
import LimitBuyAdvancedModal from "../Modals/LimitBuyAdvancedModal";
import LimitSellAdvancedModal from "../Modals/LimitSellAdvancedModal";
import MaxAvailable from "../../MaxAvailable/MaxAvailable";
import TPSLDetails from "../../TPSLDetails/TPSLDetails";
import {
  useGetContractValueQuery,
  useGetMarkPriceQuery,
} from "../../../Services/Swap";
import { SWAP } from "../../../Constants/Messages";
import LabelHover from "../../PopOver/LabelHover";
import { useDispatch, useSelector } from "react-redux";

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
  PnLP: "",
  PnL: "",
  slOrdPx: "",
  tdMode: "",
  slPercent: "",
  tpPercent: "",
  reduceOnly: "",
  tpTriggerPx: "",
  tpOrdPx: "",
};

const InputSelectPrefix = ({ value, setValue, optionArr }) => {
  return (
    <StyledInputSelectPrefix
      size="small"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
      style={{
        width: 120,
      }}
      options={optionArr}
    />
  );
};
const SelectSuffix = ({ value, setValue, optionArr, form, setSlider }) => {
  const dispatch = useDispatch();

  return (
    <AbsoluteSelect
      size="small"
      value={value}
      onChange={(e, key) => {
        setValue(key.label);
        form.setFieldValue("quantity", "");
        setSlider("");
        dispatch(setPerpAmountDropdown(key));
      }}
      style={{
        width: 120,
      }}
      options={optionArr}
    />
  );
};
const AdvancedLimit = ({
  baseAsset,
  quoteAsset,
  orderType,
  leverageMode,
  leverage,
}) => {
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [form] = Form.useForm();
  const [side, setSide] = useState("");
  const perpAmountDropdown = useSelector(
    (state) => state.global.perpAmountDropdown
  );
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [buyCost, setBuyCost] = useState("");
  const [sellCost, setSellCost] = useState("");
  const [buySlider, setBuySlider] = useState(0);
  const [buyReduceOnly, setBuyReduceOnly] = useState(false);
  const [buySlPxType, setBuySlPxType] = useState("Mark");
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: `${baseAsset}${quoteAsset}`,
  });
  const [buyTPSLDetail, setBuyTPSLDetail] = useState({
    state: false,
    update: "",
  });
  const [sellTPSLDetail, setSellTPSLDetail] = useState({
    state: false,
    update: "",
  });
  const [buyTpPxType, setBuyTpPxType] = useState("Mark");
  const [lossMarket, setLossMarket] = useState(true);
  const [profitMarket, setProfitMarket] = useState(true);
  const [sellSlPxType, setSellSlPxType] = useState("Mark");
  const [buyCurrency, setBuyCurrency] = useState("Cont");
  const [sellCurrency, setSellCurrency] = useState("Cont");
  const [sellTpPxType, setSellTpPxType] = useState("Mark");
  const [sellReduceOnly, setSellReduceOnly] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [buyTpPnl, setBuyTpPnl] = useState("");
  const [buySlPnl, setBuySlPnl] = useState("");
  const [maxBuyValue, setMaxBuyValue] = useState("");
  const [maxSellValue, setMaxSellValue] = useState("");
  const [sellTpPnl, setSellTpPnl] = useState("");
  const [sellSlPnl, setSellSlPnl] = useState("");
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [buyTPSL, setBuyTPSL] = useState(false);
  const [sellTPSL, setSellTPSL] = useState(false);
  const [sellSlider, setSellSlider] = useState(0);
  const [sellForm] = Form.useForm();
  const theme = useTheme();
  const { data: coinPairCurrentPrice } = useGetHighLowPriceWSQuery({
    base_asset: baseAsset,
    quote_asset: quoteAsset,
  });
  const { data: ctVal } = useGetContractValueQuery({
    instId: `${baseAsset}${quoteAsset}`,
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

  useEffect(() => {
    setMinPrice(
      Number(
        Number(coinPairCurrentPrice?.price) -
          Number(coinPairCurrentPrice?.price) * Number(SWAP_FEE?.maker)
      ).toFixed(2)
    );
    setMaxPrice(
      Number(
        Number(coinPairCurrentPrice?.price) * Number(SWAP_FEE?.maker) +
          Number(coinPairCurrentPrice?.price)
      ).toFixed(2)
    );
  }, [coinPairCurrentPrice]);
  const onSliderChange = (value, type) => {
    if (type === "buy") {
      setBuySlider(value);
      form.setFieldsValue({
        quantity:
          perpAmountDropdown?.label === "Cont"
            ? convertIntoDecimal(parseInt(maxBuyValue * (value / 100)))
            : convertIntoDecimal(maxBuyValue * (value / 100)),
      });
    } else {
      setSellSlider(value);
      sellForm.setFieldsValue({
        quantity:
          perpAmountDropdown?.label === "Cont"
            ? convertIntoDecimal(parseInt(maxSellValue * (value / 100)))
            : convertIntoDecimal(maxSellValue * (value / 100)),
      });
    }
  };

  useEffect(() => {
    setBuyCurrency(perpAmountDropdown?.label);
    setSellCurrency(perpAmountDropdown?.label);
  }, [perpAmountDropdown]);

  const handleSubmit = async (values) => {
    try {
      setSide("buy");
      let profitLossFields = {};
      if (values?.tpTriggerPx) {
        profitLossFields = {
          tpTriggerPxType: String(buyTpPxType).toLowerCase(),
          tpTriggerPx: values?.tpTriggerPx,
          tpOrdPx: values?.tpOrdPx || "-1",
        };
      }
      if (values?.slTriggerPx) {
        profitLossFields = {
          ...profitLossFields,
          slTriggerPxType: String(buySlPxType).toLowerCase(),
          slTriggerPx: values?.slTriggerPx,
          slOrdPx: values?.slOrdPx || "-1",
        };
      }
      const eVal = evaluateValue(
        values.quantity,
        ctVal?.ctVal,
        String(buyCurrency).toLowerCase(),
        coinPairCurrentPrice?.price
      );
      if (eVal < 0 || eVal === 0) {
        toast.error("Amount is lower than minimum for order.");
        return;
      }
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "buy",
        tdMode: leverageMode,
        ordType: orderType,
        posSide: "long",
        reduceOnly: String(buyReduceOnly),
        sz: String(eVal),
        px: String(values.price),
        ...profitLossFields,
      };
      const response = await placeOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      form.resetFields();
      form.setFieldValue("price", coinPairCurrentPrice?.price);
    } catch (error) {
      toast.error(error?.data?.message);
      form.resetFields();
      form.setFieldValue("price", coinPairCurrentPrice?.price);
    }
  };
  const onQuantityChange = (e) => {
    const priceVal = form.getFieldValue("price");
    const quantityVal = form.getFieldValue("quantity");
    const tpTriggerPx = form.getFieldValue("tpTriggerPx");
    const slTriggerPx = form.getFieldValue("slTriggerPx");

    if (!slTriggerPx) {
      form.setFieldValue("slPercent", "");
    }
    if (!tpTriggerPx) {
      form.setFieldValue("tpPercent", "");
    }
    if (priceVal < 0) {
      form.setFieldValue("price", "");
      return;
    }
    if (quantityVal < 0) {
      form.setFieldValue("quantity", "");
      return;
    }
    const tpPx = form.getFieldValue("tpTriggerPx");
    setBuyTpPnl(tpPx - coinPairCurrentPrice?.price);
    const slPx = form.getFieldValue("slTriggerPx");
    setBuySlPnl(slPx - coinPairCurrentPrice?.price);
  };
  const onSellQuantityChange = () => {
    const priceVal = sellForm.getFieldValue("price");
    const quantityVal = sellForm.getFieldValue("quantity");
    const tpTriggerPx = sellForm.getFieldValue("tpTriggerPx");

    if (priceVal < 0) {
      sellForm.setFieldValue("price", "");
      return;
    }
    if (quantityVal < 0) {
      sellForm.setFieldValue("quantity", "");
      return;
    }

    if (!tpTriggerPx) {
      sellForm.setFieldValue("tpPercent", "");
    }
    const tpPx = sellForm.getFieldValue("tpOrdPx");
    setSellTpPnl(tpPx - coinPairCurrentPrice?.price);
    const slPx = sellForm.getFieldValue("slOrdPx");
    setSellSlPnl(slPx - coinPairCurrentPrice?.price);
  };
  const handleSellSubmit = async (values) => {
    try {
      setSide("sell");
      let profitLossFields = {};
      if (values?.tpTriggerPx) {
        profitLossFields = {
          tpTriggerPxType: String(sellTpPxType).toLowerCase(),
          tpTriggerPx: values?.tpTriggerPx,
          tpOrdPx: values?.tpOrdPx || "-1",
        };
      }
      if (values?.slTriggerPx) {
        profitLossFields = {
          ...profitLossFields,
          slTriggerPxType: String(sellSlPxType).toLowerCase(),
          slTriggerPx: values?.slTriggerPx,
          slOrdPx: values?.slOrdPx || "-1",
        };
      }
      const eVal = evaluateValue(
        values.quantity,
        ctVal?.ctVal,
        String(sellCurrency).toLowerCase(),
        coinPairCurrentPrice?.price
      );
      if (eVal < 0 || eVal === 0) {
        toast.error("Amount is lower than minimum for order.");
        return;
      }
      const formObj = {
        instId: `${baseAsset}${quoteAsset}`,
        side: "sell",
        ordType: orderType,
        reduceOnly: String(sellReduceOnly),
        posSide: "short",
        sz: String(eVal),
        px: String(values.price),
        tdMode: leverageMode,
        ...profitLossFields,
      };
      const response = await placeOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      sellForm.resetFields();
      sellForm.setFieldValue("price", coinPairCurrentPrice?.price);
    } catch (error) {
      toast.error(error?.data?.message);
      sellForm.resetFields();
      sellForm.setFieldValue("price", coinPairCurrentPrice?.price);
    }
  };

  // useEffect(() => {
  //   setMaxBuyValue(
  //     maxBuy(
  //       maxSize?.maxBuy,
  //       String(buyCurrency).toLowerCase(),
  //       ctVal?.ctVal,
  //       coinPairCurrentPrice?.price
  //     )
  //   );
  //   setMaxSellValue(
  //     maxBuy(
  //       maxSize?.maxSell,
  //       String(sellCurrency).toLowerCase(),
  //       ctVal?.ctVal,
  //       coinPairCurrentPrice?.price
  //     )
  //   );
  // }, [ctVal, sellCurrency, buyCurrency, coinPairCurrentPrice, maxSize]);

  useEffect(() => {
    const availableBal = accountInfo?.data?.filter((item) =>
      item.ccy === quoteAsset ? item : ""
    );
    const contValue =
      (Number(availableBal?.[0]?.availEq) * Number(leverage)) /
      Number(coinPairCurrentPrice?.price);
    if (buyCurrency === "Crypto") {
      setMaxBuyValue(
        (Number(availableBal?.[0]?.availEq) * Number(leverage)) /
          Number(coinPairCurrentPrice?.price)
      );
    } else if (buyCurrency === "USD") {
      setMaxBuyValue(Number(availableBal?.[0]?.availEq) * Number(leverage));
    } else {
      setMaxBuyValue(contValue);
    }
    if (sellCurrency === "Crypto") {
      setMaxSellValue(
        (Number(availableBal?.[0]?.availEq) * Number(leverage)) /
          Number(coinPairCurrentPrice?.price)
      );
    } else if (sellCurrency === "USD") {
      setMaxSellValue(Number(availableBal?.[0]?.availEq) * Number(leverage));
    } else {
      setMaxSellValue(contValue);
    }
  }, [leverage, coinPairCurrentPrice, accountInfo, buyCurrency, sellCurrency]);

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
            className="input"
            autocomplete="off"
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
        <div className="relative-container">
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
                  if (
                    buyCurrency === "Cont" &&
                    !lodash.isNaN(Number(value)) &&
                    value
                  ) {
                    form.setFieldValue("quantity", parseInt(value));
                  }
                  return Promise.resolve();
                },
              },
            ]}
            validateTrigger="onChange"
          >
            <Input
              className="input"
              autocomplete="off"
              placeholder={
                buyCurrency === "Cont"
                  ? `Single contract value ${ctVal?.ctVal} ${baseAsset}`
                  : ""
              }
              onChange={(e) => {
                setBuySlider("");
                if (buyCurrency === "Crypto") {
                  setBuyCost(
                    (Number(markPrice?.data?.markPx) * Number(e.target.value)) /
                      Number(leverage)
                  );
                } else if (buyCurrency === "Cont") {
                  setBuyCost(
                    (Number(markPrice?.data?.markPx) *
                      Number(e.target.value) *
                      Number(ctVal?.ctVal)) /
                      Number(leverage)
                  );
                } else if (buyCurrency === "USD") {
                  setBuyCost(
                    (Number(e.target.value) * Number(ctVal?.ctVal)) /
                      Number(leverage)
                  );
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
          <SelectSuffix
            value={buyCurrency}
            setValue={setBuyCurrency}
            optionArr={AmountOption(baseAsset, quoteAsset)}
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
          onChange={(e) => onSliderChange(e, "buy")}
          value={buySlider}
        />
        <MaxAvailable
          balance={accountInfo?.data?.filter(
            (item) => item?.ccy === quoteAsset
          )}
          asset={quoteAsset}
          sideText={"Max buy"}
          sideTextValue={maxBuyValue}
          sideAsset={getAsset(buyCurrency, baseAsset, quoteAsset)}
        />
        <Divider style={{ margin: "10px 0" }} />
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={buyReduceOnly}
            onClick={() => {
              setBuyReduceOnly((prevState) => !prevState);
              setBuyTPSL(false);
            }}
          >
            <LabelHover label={"Reduce Only"} content={SWAP.reduceOnly} />
          </Checkbox>
        </div>
        <div className="row-container">
          <Checkbox
            className="label checkbox"
            checked={buyTPSL}
            onClick={() => {
              setBuyTPSL((prevState) => !prevState);
              setBuyReduceOnly(false);
            }}
          >
            <LabelHover label={"TP/SL"} content={SWAP.tpslCheckInfo} />
          </Checkbox>
          {buyTPSL && (
            <div
              onClick={() => {
                const amount = form.getFieldValue("quantity");
                const isError = form.getFieldError("quantity");
                if (!amount || isError?.length > 0) {
                  toast.error("Please enter Amount");
                  return;
                }
                setIsBuyModalOpen(true);
              }}
            >
              Advanced
            </div>
          )}
        </div>
        {buyTPSL && !buyTPSLDetail.state && (
          <>
            <div className="input-with-select">
              <Form.Item
                name="tpTriggerPx"
                rules={[
                  { required: buyTPSL, message: "Please enter the value." },
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
                          "Take Profit value must be higher than order price."
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                validateTrigger="onChange"
              >
                <Input
                  className="input"
                  onChange={(e) => {
                    form.setFieldValue(
                      "tpPercent",
                      Number(
                        (Number(e.target.value) /
                          Number(markPrice?.data?.markPx) -
                          1) *
                          100
                      ).toFixed(2)
                    );
                  }}
                  autocomplete="off"
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
              <InputSelectPrefix
                value={buyTpPxType}
                setValue={setBuyTpPxType}
                optionArr={priceTypeOption}
              />
            </div>
            <div className="input-with-select">
              <Form.Item
                name="slTriggerPx"
                rules={[
                  { required: buyTPSL, message: "Please enter the value." },
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
                  className="input"
                  onChange={(e) => {
                    form.setFieldValue(
                      "slPercent",
                      Number(
                        (Number(e.target.value) /
                          Number(markPrice?.data?.markPx) -
                          1) *
                          100
                      ).toFixed(2)
                    );
                  }}
                  autocomplete="off"
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
              <InputSelectPrefix
                value={buySlPxType}
                setValue={setBuySlPxType}
                optionArr={priceTypeOption}
              />
            </div>
          </>
        )}
        {buyTPSLDetail.state && (
          <TPSLDetails
            tpTriggerPxType={buyTpPxType}
            slTriggerPxType={buySlPxType}
            slTriggerPx={form.getFieldValue("slTriggerPx")}
            tpTriggerPx={form.getFieldValue("tpTriggerPx")}
            tpOrderPx={form.getFieldValue("tpOrdPx")}
            slOrderPx={form.getFieldValue("slOrdPx")}
            asset={quoteAsset}
          />
        )}
        <MaxNCost
          balance={buyCost}
          asset={quoteAsset}
          sideText={"Max price"}
          sideTextValue={maxPrice}
          availableText={"Cost"}
        />
        <BuyButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
        <LimitBuyAdvancedModal
          title={"PnL"}
          isModalOpen={isBuyModalOpen}
          setIsModalOpen={setIsBuyModalOpen}
          setBuyTPSL={setBuyTPSL}
          quoteAsset={quoteAsset}
          baseAsset={baseAsset}
          slPnl={buySlPnl}
          leverage={leverage}
          tpPnl={buyTpPnl}
          slPxType={buySlPxType}
          setTPSLDetail={setBuyTPSLDetail}
          form={form}
          setSlPxType={setBuySlPxType}
          lastPrice={coinPairCurrentPrice?.price}
          tpPxType={buyTpPxType}
          setTpPxType={setBuyTpPxType}
          lossMarket={lossMarket}
          setLossMarket={setLossMarket}
          profitMarket={profitMarket}
          setProfitMarket={setProfitMarket}
        />
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
        <div className="relative-container">
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
                  if (
                    sellCurrency === "Cont" &&
                    !lodash.isNaN(Number(value)) &&
                    value
                  ) {
                    sellForm.setFieldValue("quantity", parseInt(value));
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
              placeholder={
                sellCurrency === "Cont"
                  ? `Single contract value ${ctVal?.ctVal} ${baseAsset}`
                  : ""
              }
              onChange={(e) => {
                setSellSlider("");
                if (sellCurrency === "Crypto") {
                  setSellCost(
                    (Number(markPrice?.data?.markPx) * Number(e.target.value)) /
                      Number(leverage)
                  );
                } else if (sellCurrency === "Cont") {
                  setSellCost(
                    (Number(markPrice?.data?.markPx) *
                      Number(e.target.value) *
                      Number(ctVal?.ctVal)) /
                      Number(leverage)
                  );
                } else if (sellCurrency === "USD") {
                  setSellCost(
                    (Number(ctVal?.ctVal) * Number(e.target.value)) /
                      Number(leverage)
                  );
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
          <SelectSuffix
            value={sellCurrency}
            setValue={setSellCurrency}
            optionArr={AmountOption(baseAsset, quoteAsset)}
            form={sellForm}
            setSlider={setSellSlider}
          />
        </div>
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
        <MaxAvailable
          balance={accountInfo?.data?.filter(
            (item) => item?.ccy === quoteAsset
          )}
          asset={quoteAsset}
          sideText={"Max sell"}
          sideTextValue={maxSellValue}
          sideAsset={getAsset(sellCurrency, baseAsset, quoteAsset)}
        />
        <Divider style={{ margin: "10px 0" }} />
        <div className="checkbox-container">
          <Checkbox
            className="label"
            checked={sellReduceOnly}
            onClick={() => {
              setSellReduceOnly((prevState) => !prevState);
              setSellTPSL(false);
            }}
          >
            <LabelHover label={"Reduce Only"} content={SWAP.reduceOnly} />
          </Checkbox>
        </div>
        <div className="row-container">
          <Checkbox
            className="label checkbox"
            checked={sellTPSL}
            onClick={() => {
              setSellTPSL((prevState) => !prevState);
              setSellReduceOnly(false);
            }}
          >
            <LabelHover label={"TP/SL"} content={SWAP.tpslCheckInfo} />
          </Checkbox>
          {sellTPSL && (
            <div
              onClick={() => {
                const amount = sellForm?.getFieldValue("quantity");
                const isError = sellForm.getFieldError("quantity");
                if (!amount || isError?.length > 0) {
                  toast.error("Please enter Amount");
                  return;
                }
                setIsSellModalOpen(true);
              }}
            >
              Advanced
            </div>
          )}
        </div>
        {sellTPSL && !sellTPSLDetail?.state && (
          <>
            <div className="input-with-select">
              <Form.Item
                name="tpTriggerPx"
                rules={[
                  { required: sellTPSL, message: "Please enter the value." },
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
                  onChange={(e) => {
                    sellForm.setFieldValue(
                      "tpPercent",
                      Number(
                        (Number(e.target.value) /
                          Number(markPrice?.data?.markPx) -
                          1) *
                          100
                      ).toFixed(2)
                    );
                  }}
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
              <InputSelectPrefix
                value={sellTpPxType}
                setValue={setSellTpPxType}
                optionArr={priceTypeOption}
              />
            </div>
            <div className="input-with-select">
              <Form.Item
                name="slTriggerPx"
                rules={[
                  { required: sellTPSL, message: "Please enter the value." },
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
                  onChange={(e) => {
                    sellForm.setFieldValue(
                      "slPercent",
                      Number(
                        (Number(e.target.value) /
                          Number(markPrice?.data?.markPx) -
                          1) *
                          100
                      ).toFixed(2)
                    );
                  }}
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
              <InputSelectPrefix
                value={sellSlPxType}
                setValue={setSellSlPxType}
                optionArr={priceTypeOption}
              />
            </div>
          </>
        )}

        {sellTPSLDetail?.state && (
          <TPSLDetails
            tpTriggerPxType={sellTpPxType}
            slTriggerPxType={sellSlPxType}
            slTriggerPx={sellForm.getFieldValue("slTriggerPx")}
            tpTriggerPx={sellForm.getFieldValue("tpTriggerPx")}
            tpOrderPx={sellForm.getFieldValue("tpOrdPx")}
            slOrderPx={sellForm.getFieldValue("slOrdPx")}
            asset={quoteAsset}
          />
        )}
        <MaxNCost
          balance={sellCost}
          asset={quoteAsset}
          sideText={"Min price"}
          sideTextValue={minPrice}
          availableText={"Cost"}
        />
        <SellButton user={user} isPlacingOrder={isPlacingOrder} side={side} />
        <LimitSellAdvancedModal
          title={"PnL"}
          isModalOpen={isSellModalOpen}
          form={sellForm}
          markPrice={markPrice?.data?.markPx}
          slPnl={sellSlPnl}
          setSellTPSL={setSellTPSL}
          tpPnl={sellTpPnl}
          setIsModalOpen={setIsSellModalOpen}
          quoteAsset={quoteAsset}
          slPxType={sellSlPxType}
          setTPSLDetail={setSellTPSLDetail}
          setSlPxType={setSellSlPxType}
          lastPrice={coinPairCurrentPrice?.price}
          tpPxType={sellTpPxType}
          setTpPxType={setSellTpPxType}
          lossMarket={lossMarket}
          setLossMarket={setLossMarket}
          profitMarket={profitMarket}
          setProfitMarket={setProfitMarket}
        />
      </Form>
    </>
  );
};
export default memo(AdvancedLimit);

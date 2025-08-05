import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
  StyledInputSelect,
  StyledSlider,
} from "../../../Components/PerpetualTrading/SpotTrading.styles";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { BiChevronDown } from "react-icons/bi";
import { SWAP } from "../../../Constants/Messages";
import { marks, priceTypeOption } from "../../../Constants/state";
import {
  useGetHighLowPriceQuery,
  useGetMarkPriceQuery,
} from "../../../Services/Swap";
import { usePlaceAdvancedOrderMutation } from "../../../Services/Transaction";
import { toast } from "react-toastify";
import { convertIntoDecimal } from "../../../Utils/common";
import lodash from "lodash";
const InputSelectPrefix = ({ value, setValue, optionArr }) => {
  return (
    <StyledInputSelect
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

const INITIAL_VALUE = {
  sz: "",
  tpTriggerPx: "",
  tpOrdPx: "",
  slTriggerPx: "",
  slOrdPx: "",
  tpPercent: "",
  slPercent: "",
};

const StopOrder = ({
  baseAsset,
  quoteAsset,
  leverageMode,
  row,
  setIsModalOpen,
  tpPnl,
  slPnl,
}) => {
  const theme = useTheme();
  const [profitCheck, setProfitCheck] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
    usePlaceAdvancedOrderMutation();
  const [lossCheck, setLossCheck] = useState(true);
  const [tpnl, setTpnl] = useState({
    price: "",
  });
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [slider, setSlider] = useState("");
  const [form] = Form.useForm();
  const [priceSetting, setPriceSetting] = useState("price");
  const { data: lastPrice } = useGetHighLowPriceQuery({
    id: baseAsset,
    filter: quoteAsset,
  });
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: row?.instId,
  });
  const [buyTPSL, setBuyTPSL] = useState(true);
  const [tpPxType, setTpPxType] = useState("Mark");
  const [slPxType, setSlPxType] = useState("Mark");
  const [pnlRatio, setPnlRatio] = useState({
    price: "",
    pnl: "",
  });
  const [profitMarket, setProfitMarket] = useState(true);
  const [lossMarket, setLossMarket] = useState(true);
  const [tpnlValue, setTPnlValue] = useState({
    price: "",
    pnl: "",
    pnlRation: "",
  });
  const [slpnlValue, setSLPnlValue] = useState({
    price: "",
    pnl: "",
    pnlRation: "",
  });
  useEffect(() => {
    if (!profitCheck && !lossCheck) {
      setBuyTPSL(false);
    } else {
      setBuyTPSL(true);
    }
  }, [profitCheck, lossCheck]);

  const onSliderChange = (value) => {
    setSlider(value);
    form.setFieldsValue({
      sz: convertIntoDecimal(parseInt(row?.availPos * (value / 100))),
    });
  };
  const onQuantityChange = (e) => {
    const tpTriggerPx = form.getFieldValue("tpTriggerPx");
    const slTriggerPx = form.getFieldValue("slTriggerPx");
    if (slTriggerPx && markPrice?.data?.markPx) {
      setSLPnlValue({
        price: Number(
          Number(markPrice?.data?.markPx) - Number(slTriggerPx)
        ).toFixed(2),
        pnl: "",
        pnlRatio: "",
      });
    }
    if (tpTriggerPx && markPrice) {
      setTPnlValue({
        price: Number(
          Number(markPrice?.data?.markPx) - Number(tpTriggerPx)
        ).toFixed(2),
        pnl: "",
        pnlRatio: "",
      });
    }
    if (tpTriggerPx && markPrice) {
      form.setFieldValue(
        "tpPercent",
        Number(
          (Number(tpTriggerPx) / Number(markPrice?.data?.markPx) - 1) * 100
        ).toFixed(2)
      );
    }
    if (!tpTriggerPx) {
      form.setFieldValue("tpPercent", "");
    }
    if (slTriggerPx && markPrice) {
      form.setFieldValue(
        "slPercent",
        Number(
          (Number(slTriggerPx) / Number(markPrice?.data?.markPx) - 1) * 100
        ).toFixed(2)
      );
    }
    if (!slTriggerPx) {
      form.setFieldValue("slPercent", "");
    }
  };

  const handleSubmit = async (values) => {
    try {
      let profitLossFields = {};
      if (profitCheck && lossCheck) {
        profitLossFields.ordType = "oco";
      } else {
        profitLossFields.ordType = "conditional";
      }
      if (profitCheck) {
        profitLossFields["tpTriggerPx"] = values?.tpTriggerPx;
        profitLossFields["tpOrdPx"] = values?.tpOrdPx || "-1";
        profitLossFields["tpTriggerPxType"] = String(tpPxType).toLowerCase();
      }
      if (lossCheck) {
        profitLossFields["slTriggerPx"] = values?.slTriggerPx;
        profitLossFields["slOrdPx"] = values?.slOrdPx || "-1";
        profitLossFields["slTriggerPxType"] = String(slPxType).toLowerCase();
      }
      const formObj = {
        instId: row?.instId,
        side: row?.posSide === "long" ? "sell" : "buy",
        posSide: row?.posSide === "long" ? "short" : "long",
        tdMode: String(row?.mgnMode).toLowerCase(),
        // ordType: ,
        reduceOnly: "true",
        sz: String(values.sz),
        // px: markPrice?.data?.markPx,
        ...profitLossFields,
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.algoId) {
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
      <Form
        onFinish={handleSubmit}
        initialValues={INITIAL_VALUE}
        form={form}
        onValuesChange={onQuantityChange}
      >
        <div
          className="flex"
          onClick={() => {
            setPriceModalOpen(true);
          }}
        >
          TP/SL price settings Price <BiChevronDown size={20} />
        </div>
        {showMessage && (
          <div className="flex-message">
            <div>{SWAP.stop}</div>
            <div
              className="cross"
              onClick={() => {
                setShowMessage(false);
              }}
            >
              X
            </div>
          </div>
        )}
        <div className="space-between">
          <Checkbox
            checked={profitCheck}
            onChange={() => {
              setProfitCheck((prevState) => !prevState);
            }}
          >
            Take Profit
          </Checkbox>
          <InputSelectPrefix
            value={tpPxType}
            setValue={setTpPxType}
            optionArr={priceTypeOption}
          />
        </div>
        {profitCheck && (
          <>
            {priceSetting === "price" && (
              <>
                <div className="input-with-select">
                  <Form.Item
                    name="tpTriggerPx"
                    rules={[
                      {
                        required: profitCheck,
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
                          } else if (
                            Number(row?.avgPx) > value &&
                            row?.posSide === "long"
                          ) {
                            return Promise.reject(
                              "Take Profit value must be greater than order price."
                            );
                          } else if (
                            Number(row?.avgPx) < value &&
                            row?.posSide === "short"
                          ) {
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
                    name="tpPercent"
                    className="w-30"
                    // rules={[
                    //   {
                    //     pattern: /^[+]?\d+(\.\d+)?$/,
                    //     message: "Please enter a valid number.",
                    //   },
                    //   {
                    //     validator: (_, value) => {
                    //       if (parseFloat(value) < 0) {
                    //         return Promise.reject("Invalid value.");
                    //       }
                    //       return Promise.resolve();
                    //     },
                    //   },
                    // ]}
                    validateTrigger="onChange"
                  >
                    <Input
                      autocomplete="off"
                      placeholder="Increase"
                      suffix={
                        <>
                          <span className="label">%</span>
                        </>
                      }
                    />
                  </Form.Item>
                </div>
                <div className="input-with-select">
                  <Form.Item
                    name="tpOrdPx"
                    rules={[
                      // {
                      //   required: !profitMarket && TPSL,
                      //   message: "Please enter the value.",
                      // },
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
                      disabled={profitMarket}
                      suffix={
                        <>
                          <span className="label">{quoteAsset}</span>
                        </>
                      }
                      prefix={
                        <>
                          <span className="label">Tp Order Price</span>
                          <Divider type="vertical" />
                        </>
                      }
                    />
                  </Form.Item>
                  <Form.Item name="" className="w-30">
                    <Button
                      onClick={() => {
                        setProfitMarket((prevState) => !prevState);
                        form.setFieldValue("tpOrdPx", "");
                      }}
                      className={profitMarket ? "active" : ""}
                      style={{ width: "100%" }}
                    >
                      Market
                    </Button>
                  </Form.Item>
                </div>
              </>
            )}
            {priceSetting === "PnL" && (
              <Form.Item
                name="PnL"
                rules={[
                  // {
                  //   required: priceSetting === "PnL" && TPSL,
                  //   message: "Please enter the value.",
                  // },
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
                  autocomplete="off"
                  className="input"
                  suffix={
                    <>
                      <span className="label">{quoteAsset}</span>
                    </>
                  }
                  onChange={(e) => {
                    // const pnl = Number(
                    //   (Number(markPrice?.data?.markPx) / Number(leverage)) *
                    //     (Number(e.target.value) / Number(100)) +
                    //     Number(markPrice?.data?.markPx)
                    // ).toFixed(2);
                    // const pnl = Number(
                    //   Number(
                    //     (parseFloat(markPrice?.data?.markPx) / 1000) *
                    //       (parseFloat(e.target.value) / 100)
                    //   ).toFixed(2)
                    // ).toFixed(2);
                    // setTPnlValue({
                    //   price: 0,
                    //   pnl: pnl,
                    // });
                  }}
                  prefix={
                    <>
                      <span className="label">TP PnL</span>
                      <Divider type="vertical" />
                    </>
                  }
                />
              </Form.Item>
            )}
            {priceSetting === "PnL%" && (
              <Form.Item
                name="PnLP"
                rules={[
                  // {
                  //   required: priceSetting === "PnL%" && TPSL,
                  //   message: "Please enter the value.",
                  // },
                  {
                    pattern: /^[+]?\d+(\.\d+)?$/,
                    message: "Please enter a valid number.",
                  },
                ]}
                validateTrigger="onChange"
              >
                <Input
                  autocomplete="off"
                  className="input"
                  suffix={
                    <>
                      <span className="label">%</span>
                    </>
                  }
                  onChange={(e) => {
                    const price = Number(
                      Number(markPrice?.data?.markPx) *
                        (Number(e.target.value) / 100) +
                        Number(markPrice?.data?.markPx)
                    ).toFixed(2);
                    const pnl = Number(
                      Number(
                        (parseFloat(markPrice?.data?.markPx) / 1000) *
                          (parseFloat(e.target.value) / 100)
                      ).toFixed(2)
                    ).toFixed(2);
                    // setPnlRatio({
                    //   price,
                    //   pnl: pnl,
                    // });
                  }}
                  prefix={
                    <>
                      <span className="label">TP PnL%</span>
                      <Divider type="vertical" />
                    </>
                  }
                />
              </Form.Item>
            )}
          </>
        )}
        {profitCheck && priceSetting === "price" && (
          <div className="label">
            When price reaches {lastPrice?.price}, it will trigger a Limit
            order, and the estimated PnL will be{" "}
            <span
              style={{
                color:
                  tpnlValue.price > 0
                    ? theme.colors.marketUp
                    : theme.colors.marketDown,
              }}
            >
              {Number(tpnlValue?.price).toFixed(2) || "--"}
            </span>
          </div>
        )}
        {profitCheck && priceSetting === "PnL%" && (
          <div className="label">
            When price reaches {pnlRatio?.price}, it will trigger a Limit order,
            and the estimated PnL will be{" "}
            <span
              style={{
                color:
                  pnlRatio?.pnl > 0
                    ? theme.colors.marketUp
                    : theme.colors.marketDown,
              }}
            >
              {Number(pnlRatio?.pnl).toFixed(2) || "--"}
            </span>
          </div>
        )}
        {profitCheck && priceSetting === "PnL" && (
          <div className="label">
            When price reaches {tpnlValue?.pnl}, it will trigger a Limit order,
            and the estimated PnL will be{" "}
            <span
              style={{
                color:
                  tpnlValue?.pnl > 0
                    ? theme.colors.marketUp
                    : theme.colors.marketDown,
              }}
            >
              {Number(tpnlValue?.pnl).toFixed(2) || "--"}
            </span>
          </div>
        )}
        <div className="space-between">
          <Checkbox
            checked={lossCheck}
            onChange={() => {
              setLossCheck((prevState) => !prevState);
            }}
          >
            Stop loss
          </Checkbox>
          <InputSelectPrefix
            value={slPxType}
            setValue={setSlPxType}
            optionArr={priceTypeOption}
          />
        </div>
        {lossCheck && (
          <>
            {priceSetting === "price" && (
              <>
                <div className="input-with-select">
                  <Form.Item
                    name="slTriggerPx"
                    rules={[
                      {
                        required: lossCheck,
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
                          } else if (
                            Number(row?.avgPx) < value &&
                            row?.posSide === "long"
                          ) {
                            return Promise.reject(
                              "Stop Loss value must be lower than order price."
                            );
                          } else if (
                            Number(row?.avgPx) > value &&
                            row?.posSide === "short"
                          ) {
                            return Promise.reject(
                              "Stop Loss value must be higher than order price."
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
                    name="slPercent"
                    className="w-30"
                    // rules={[
                    //   {
                    //     pattern: /^[+]?\d+(\.\d+)?$/,
                    //     message: "Please enter a valid number.",
                    //   },
                    // ]}
                    validateTrigger="onChange"
                  >
                    <Input
                      autocomplete="off"
                      placeholder="Decrease"
                      suffix={
                        <>
                          <span className="label">%</span>
                        </>
                      }
                    />
                  </Form.Item>
                </div>
                <div className="input-with-select">
                  <Form.Item
                    name="slOrdPx"
                    rules={[
                      // {
                      //   required: !lossMarket && TPSL,
                      //   message: "Please enter the value.",
                      // },
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
                      disabled={lossMarket}
                      onChange={(e) => {
                        form.setFieldValue("slOrdPx", e.target.value);
                      }}
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
                  <Form.Item name="orderType" className="w-30">
                    <Button
                      className={lossMarket ? "active" : ""}
                      style={{ width: "100%" }}
                      onClick={() => {
                        setLossMarket((prevState) => !prevState);
                        form.setFieldValue("slOrdPx", "");
                      }}
                    >
                      Market
                    </Button>
                  </Form.Item>
                </div>
              </>
            )}
            {priceSetting === "PnL" && (
              <Form.Item
                name="slTriggerPx"
                rules={[
                  // {
                  //   required: priceSetting === "PnL" && TPSL,
                  //   message: "Please enter the value.",
                  // },
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
                      <span className="label">TP Trigger Price</span>
                      <Divider type="vertical" />
                    </>
                  }
                />
              </Form.Item>
            )}
            {priceSetting === "PnL%" && (
              <Form.Item
                name="slTriggerPx"
                rules={[
                  // {
                  //   required: priceSetting === "PnL%" && TPSL,
                  //   message: "Please enter the value.",
                  // },
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
                      <span className="label">%</span>
                    </>
                  }
                  onChange={(e) => {
                    // setPnlRatio()
                  }}
                  prefix={
                    <>
                      <span className="label">TP Trigger Price</span>
                      <Divider type="vertical" />
                    </>
                  }
                />
              </Form.Item>
            )}
          </>
        )}

        {lossCheck && priceSetting === "price" && (
          <div className="label">
            When price reaches {lastPrice?.price}, it will trigger a Market
            order, and the estimated PnL will be
            <span
              style={{
                color:
                  slpnlValue?.price > 0
                    ? theme.colors.marketUp
                    : theme.colors.marketDown,
              }}
            >
              {Number(slpnlValue?.price).toFixed(2) || "--"}
            </span>
          </div>
        )}
        {lossCheck && priceSetting === "PnL%" && (
          <div className="label">
            When price reaches {pnlRatio?.price}, it will trigger a Limit order,
            and the estimated PnL will be{" "}
            <span
              style={{
                color:
                  pnlRatio?.pnl > 0
                    ? theme.colors.marketUp
                    : theme.colors.marketDown,
              }}
            >
              {Number(pnlRatio?.pnl).toFixed(2) || "--"}
            </span>
          </div>
        )}
        {lossCheck && priceSetting === "PnL" && (
          <div className="label">
            When price reaches {tpnlValue?.price}, it will trigger a Limit
            order, and the estimated PnL will be{" "}
            <span
              style={{
                color:
                  tpnlValue?.pnl > 0
                    ? theme.colors.marketUp
                    : theme.colors.marketDown,
              }}
            >
              {Number(tpnlValue?.pnl).toFixed(2) || "--"}
            </span>
          </div>
        )}
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
              setSlider(
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
        <StyledSlider
          up={true}
          trackStyle={{ background: theme.colors.marketUp }}
          className="slider"
          railStyle={{ background: theme.colors.grey.sliderTrack }}
          marks={marks}
          step={1}
          onChange={(e) => onSliderChange(e)}
          value={slider}
        />
        <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
          <Button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isPlacingOrder || (!profitCheck && !lossCheck)}
          >
            Confirm
          </Button>
        </div>
      </Form>
    </>
  );
};

export default StopOrder;

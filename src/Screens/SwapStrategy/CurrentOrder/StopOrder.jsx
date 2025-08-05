import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { toast } from "react-toastify";
import lodash from "lodash";
import { useAmendOrderMutation } from "../../../Services/Transaction";
import {
  useGetHighLowPriceQuery,
  useGetMarkPriceQuery,
} from "../../../Services/Swap";
import { StyledInputSelect } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import { priceTypeOption } from "../../../Constants/state";
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

const StopOrder = ({ baseAsset, quoteAsset, row, setIsModalOpen }) => {
  const theme = useTheme();
  const [profitCheck, setProfitCheck] = useState(true);
  const [amendOrder, { isLoading: isPlacingOrder }] = useAmendOrderMutation();
  const [lossCheck, setLossCheck] = useState(true);
  const INITIAL_VALUE = {
    sz: row?.sz,
    tpTriggerPx: row?.tpTriggerPx,
    tpOrdPx: Number(row?.tpOrdPx) === -1 ? "" : row?.tpOrdPx,
    slTriggerPx: row?.slTriggerPx,
    slOrdPx: Number(row?.slOrdPx) === -1 ? "" : row?.slOrdPx,
    newPx: row?.px,
  };
  const [form] = Form.useForm();
  const { data: lastPrice } = useGetHighLowPriceQuery({
    id: baseAsset,
    filter: quoteAsset,
  });
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: row?.instId,
  });
  const [buyTPSL, setBuyTPSL] = useState(true);
  const [tpPxType, setTpPxType] = useState(row?.tpTriggerPxType || "Mark");
  const [slPxType, setSlPxType] = useState(row?.slTriggerPxType || "Mark");
  const [profitMarket, setProfitMarket] = useState(row?.tpOrdPx ? false : true);
  const [lossMarket, setLossMarket] = useState(row?.slOrdPx ? false : true);
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
      if (profitCheck) {
        profitLossFields["newTpTriggerPx"] = values?.tpTriggerPx;
        profitLossFields["newTpOrdPx"] = values?.tpOrdPx || "-1";
        profitLossFields["newTpTriggerPxType"] = String(tpPxType).toLowerCase();
      }
      if (lossCheck) {
        profitLossFields["newSlTriggerPx"] = values?.slTriggerPx;
        profitLossFields["newSlOrdPx"] = values?.slOrdPx || "-1";
        profitLossFields["newSlTriggerPxType"] = String(slPxType).toLowerCase();
      }
      const formObj = {
        instId: row?.instId,
        // tdMode: String(row?.tdMode).toLowerCase(),
        newPx: String(values.newPx),
        ordId: row?.ordId,
        newSz: String(values.sz),
        ...profitLossFields,
      };

      const response = await amendOrder({ ...formObj }).unwrap();
      if (response?.data?.data[0]?.algoId) {
        toast.success("Order is placed.");
      }
      form.setFieldsValue({
        sz: values?.sz,
        tpTriggerPx: values?.tpTriggerPx,
        tpOrdPx: values?.tpOrdPx,
        slTriggerPx: values?.slTriggerPx,
        slOrdPx: values?.slOrdPx,
        newPx: values?.newPx,
      });

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
        <Form.Item
          name="newPx"
          rules={[
            { required: true, message: "Please enter the value." },
            {
              pattern: /^[+]?\d+(\.\d+)?$/,
              message: "Please enter a valid number.",
            },
          ]}
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
                <span className="label">Limit Price</span>
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
                      Number(lastPrice?.price) > value &&
                      row?.posSide === "long"
                    ) {
                      return Promise.reject(
                        "Take Profit value must be higher than order price."
                      );
                    } else if (
                      Number(lastPrice?.price) < value &&
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
                    form.setFieldValue(
                      "tpOrdPx",
                      Number(row?.tpOrdPx) === -1 ? "" : row?.tpOrdPx
                    );
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
        {profitCheck && (
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
                      Number(lastPrice?.price) < value &&
                      row?.posSide === "long"
                    ) {
                      return Promise.reject(
                        "Stop Loss value must be lower than order price."
                      );
                    } else if (
                      Number(lastPrice?.price) > value &&
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
                    form.setFieldValue(
                      "slOrdPx",
                      Number(row?.slOrdPx) === -1 ? "" : row?.slOrdPx
                    );
                  }}
                >
                  Market
                </Button>
              </Form.Item>
            </div>
          </>
        )}

        {lossCheck && (
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

export default StopOrder;

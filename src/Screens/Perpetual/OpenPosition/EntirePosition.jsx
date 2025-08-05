import React, { useState } from "react";
import { useTheme } from "styled-components";
import { StyledInputSelect } from "../../../Components/PerpetualTrading/SpotTrading.styles";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import {
  useGetHighLowPriceQuery,
  useGetMarkPriceQuery,
} from "../../../Services/Swap";
import { usePlaceAdvancedOrderMutation } from "../../../Services/Transaction";
import { toast } from "react-toastify";

const InputSelectPrefix = ({ value, setValue, tpPnl, form }) => {
  let optionArr = [
    {
      value: "MARK",
      label: "MARK",
    },
    {
      value: "INDEX",
      label: "INDEX",
    },
    {
      value: "LAST",
      label: "LAST",
    },
  ];
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
  tpTriggerPx: "",
  tpTriggerPxType: "",
  tpOrdPx: "",
  slTriggerPx: "",
  slTriggerPxType: "",
  slOrdPx: "",
  tpPercent: "",
  slPercent: "",
};
const EntirePosition = ({ setIsModalOpen, baseAsset, quoteAsset, row }) => {
  const theme = useTheme();
  const [profitCheck, setProfitCheck] = useState(true);
  const [lossCheck, setLossCheck] = useState(true);
  const [form] = Form.useForm();
  const { data: lastPrice } = useGetHighLowPriceQuery({
    id: baseAsset,
    filter: quoteAsset,
  });
  const [placeAdvancedOrder, { isLoading: isPlacingOrder }] =
    usePlaceAdvancedOrderMutation();
  const [tpnlValue, setTPnlValue] = useState("");
  const { data: markPrice } = useGetMarkPriceQuery({
    instId: row?.instId,
  });
  const [slpnlValue, setSLPnlValue] = useState("");
  const [tpPxType, setTpPxType] = useState("Mark");
  const [slPxType, setSlPxType] = useState("Mark");

  const onQuantityChange = (e) => {
    const tpTriggerPx = form.getFieldValue("tpTriggerPx");
    const slTriggerPx = form.getFieldValue("slTriggerPx");
    if (slTriggerPx) {
      setSLPnlValue(
        Number(Number(slTriggerPx) - Number(row?.avgPx)).toFixed(2)
      );
    }
    if (tpTriggerPx) {
      setTPnlValue(Number(Number(tpTriggerPx) - Number(row?.avgPx)).toFixed(2));
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
        profitLossFields["tpOrdPx"] = "-1";
        profitLossFields["tpTriggerPxType"] = String(tpPxType).toLowerCase();
      }
      if (lossCheck) {
        profitLossFields["slTriggerPx"] = values?.slTriggerPx;
        profitLossFields["slOrdPx"] = "-1";
        profitLossFields["slTriggerPxType"] = String(slPxType).toLowerCase();
      }
      const formObj = {
        instId: row?.instId,
        side: row?.posSide === "long" ? "sell" : "buy",
        posSide: row?.posSide,
        tdMode: String(row?.mgnMode).toLowerCase(),
        reduceOnly: "true",
        sz: row?.availPos,
        cxlOnClosePos: "true",
        ...profitLossFields,
      };
      const response = await placeAdvancedOrder({ ...formObj }).unwrap();
      if (response?.data) {
        toast.success("Order is placed.");
      }
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
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
        <div className="space-between">
          <Checkbox
            checked={profitCheck}
            onChange={() => {
              setProfitCheck((prevState) => {
                if (prevState) {
                  form.setFieldsValue({
                    tpTriggerPx: "",
                    tpOrdPx: "",
                  });
                }
                return !prevState;
              });
            }}
          >
            Take Profit
          </Checkbox>
          <InputSelectPrefix value={tpPxType} setValue={setTpPxType} />
        </div>
        <div className="input-with-select">
          <Form.Item
            name="tpTriggerPx"
            rules={[
              // { required: TPSL, message: "Please enter the value." },
              {
                pattern: /^[+]?\d+(\.\d+)?$/,
                message: "Please enter a valid number.",
              },
              {
                validator: (_, value) => {
                  if (parseFloat(value) === 0) {
                    return Promise.reject("Value cannot be zero.");
                  } else if (
                    Number(row?.avgPx) > Number(value) &&
                    row?.posSide === "long"
                  ) {
                    return Promise.reject(
                      "Take Profit value must be higher than order price."
                    );
                  } else if (
                    Number(row?.avgPx) < Number(value) &&
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
        <div className="label">
          When price reaches {lastPrice?.price}, it will trigger a Limit order,
          and the estimated PnL will be{" "}
          <span
            style={{
              color:
                tpnlValue > 0 ? theme.colors.marketUp : theme.colors.marketDown,
            }}
          >
            {Number(tpnlValue).toFixed(2) || "--"}
          </span>
        </div>
        <div className="space-between">
          <Checkbox
            checked={lossCheck}
            onChange={() => {
              setLossCheck((prevState) => {
                if (prevState) {
                  form.setFieldsValue({
                    slTriggerPx: "",
                    slOrdPx: "",
                  });
                }
                return !prevState;
              });
            }}
          >
            Stop loss
          </Checkbox>
          <InputSelectPrefix value={slPxType} setValue={setSlPxType} />
        </div>
        <div className="input-with-select">
          <Form.Item
            name="slTriggerPx"
            rules={[
              // { required: TPSL, message: "Please enter the value." },
              {
                pattern: /^[+]?\d+(\.\d+)?$/,
                message: "Please enter a valid number.",
              },
              {
                validator: (_, value) => {
                  if (parseFloat(value) === 0) {
                    return Promise.reject("Value cannot be zero.");
                  } else if (
                    Number(row?.avgPx) < Number(value) &&
                    row?.posSide === "long"
                  ) {
                    return Promise.reject(
                      "Stop Loss value must be lower than order price."
                    );
                  } else if (
                    Number(row?.avgPx) > Number(value) &&
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

        <div className="label">
          When price reaches {lastPrice?.price}, it will trigger a Market order,
          and the estimated PnL will be
          <span
            style={{
              color:
                slpnlValue > 0
                  ? theme.colors.marketUp
                  : theme.colors.marketDown,
            }}
          >
            {Number(slpnlValue).toFixed(2) || "--"}
          </span>
        </div>
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

export default EntirePosition;

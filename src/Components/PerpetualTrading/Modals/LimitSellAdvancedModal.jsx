import ValueLabel from "../../ValueLabel/ValueLabel";
import { BiChevronDown } from "react-icons/bi";
import { ModalContainer, StyledInputSelect } from "../SpotTrading.styles";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import PriceSettingModal from "../../Modals/PriceSettingModal";

const InputSelectPrefix = ({ value, setValue }) => {
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
const LimitSellAdvancedModal = ({
  slPxType,
  setSlPxType,
  tpPxType,
  lastPrice,
  setTpPxType,
  setSellTPSL,
  title,
  leverage,
  form,
  setTPSLDetail,
  isModalOpen,
  setIsModalOpen,
  profitMarket,
  lossMarket,
  slPnl,
  tpPnl,
  markPrice,
  setProfitMarket,
  setLossMarket,
  quoteAsset,
  baseAsset,
}) => {
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [priceSetting, setPriceSetting] = useState("price");
  const [pnlRatio, setPnlRatio] = useState({
    price: "",
    pnl: "",
  });
  const [pnlValue, setPnlValue] = useState({
    price: "",
    pnl: "",
  });
  const theme = useTheme();
  const [profitCheck, setProfitCheck] = useState(true);
  const [lossCheck, setLossCheck] = useState(true);
  useEffect(() => {
    if (!profitCheck && !lossCheck) {
      setSellTPSL(false);
    } else {
      setSellTPSL(true);
    }
  }, [profitCheck, lossCheck]);
  return (
    <ModalContainer
      title={<div className="t-header">{title}</div>}
      open={isModalOpen}
      onOk={() => {
        setIsModalOpen(false);
      }}
      okText={"Confirm"}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <ValueLabel label={"last price"} value={`$${lastPrice}`} />
      <ValueLabel label={"Mark price"} value={`$${markPrice}`} />
      <div
        className="flex"
        onClick={() => {
          setPriceModalOpen(true);
        }}
        style={{ color: theme.colors.black }}
      >
        TP/SL price settings Price <BiChevronDown size={20} />
      </div>
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
            setTPSLDetail({ state: true, update: Math.random() });
          }}
        >
          Take Profit
        </Checkbox>
        <InputSelectPrefix value={tpPxType} setValue={setTpPxType} />
      </div>
      {profitCheck && (
        <>
          {priceSetting === "price" && (
            <>
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
                        const price = form.getFieldValue("price");
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
                      form.setFieldValue(
                        "tpPercent",
                        Number(
                          (Number(e.target.value) / Number(markPrice) - 1) * 100
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
                <Form.Item
                  name="tpPercent"
                  className="w-30"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Input
                    autocomplete="off"
                    placeholder="Increase"
                    onChange={(e) => {
                      form.setFieldValue(
                        "tpTriggerPx",
                        Number(
                          Number(markPrice) * (Number(e.target.value) / 100)
                        ).toFixed(2)
                      );
                      form.validateFields(["tpTriggerPx"]);
                    }}
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
                onChange={(e) => {
                  const pnl = Number(
                    (Number(markPrice) / Number(leverage)) *
                      (Number(e.target.value) / Number(100)) +
                      Number(markPrice)
                  ).toFixed(2);
                  setPnlValue({
                    price: 0,
                    pnl: pnl,
                  });
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
                    Number(markPrice) * (Number(e.target.value) / 100) +
                      Number(markPrice)
                  ).toFixed(2);
                  const pnl = Number(
                    Number(
                      (parseFloat(markPrice) / 1000) *
                        (parseFloat(e.target.value) / 100)
                    ).toFixed(2)
                  ).toFixed(2);
                  setPnlRatio({
                    price,
                    pnl: pnl,
                  });
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
          When price reaches {lastPrice}, it will trigger a Limit order, and the
          estimated PnL will be{" "}
          <span
            style={{
              color:
                tpPnl > 0 ? theme.colors.marketUp : theme.colors.marketDown,
            }}
          >
            {Number(tpPnl).toFixed(2) || "--"}
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
          When price reaches {pnlValue?.price}, it will trigger a Limit order,
          and the estimated PnL will be{" "}
          <span
            style={{
              color:
                pnlValue?.pnl > 0
                  ? theme.colors.marketUp
                  : theme.colors.marketDown,
            }}
          >
            {Number(pnlValue?.pnl).toFixed(2) || "--"}
          </span>
        </div>
      )}
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
            setTPSLDetail({ state: true, update: Math.random() });
          }}
        >
          Stop loss
        </Checkbox>
        <InputSelectPrefix value={slPxType} setValue={setSlPxType} />
      </div>
      {lossCheck && (
        <>
          {priceSetting === "price" && (
            <>
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
                        // const price = form.getFieldValue("price");
                        // if (parseFloat(value) === 0) {
                        //   return Promise.reject("Value cannot be zero.");
                        // } else if (price > value) {
                        //   return Promise.reject(
                        //     "Stop Loss value must be higher than order price."
                        //   );
                        // }
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
                      form.setFieldValue(
                        "slPercent",
                        Number(
                          (Number(e.target.value) / Number(markPrice) - 1) * 100
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
                        <span className="label">SL Trigger Price</span>
                        <Divider type="vertical" />
                      </>
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="slPercent"
                  className="w-30"
                  validateTrigger="onChange"
                >
                  <Input
                    autocomplete="off"
                    placeholder="Decrease"
                    onChange={(e) => {
                      form.setFieldValue(
                        "slTriggerPx",
                        Number(
                          Number(markPrice) * (Number(e.target.value) / 100)
                        ).toFixed(2)
                      );
                      form.validateFields(["slTriggerPx"]);
                    }}
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
                    } else if (price > value) {
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
                    } else if (price > value) {
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
          When price reaches {lastPrice}, it will trigger a Market order, and
          the estimated PnL will be
          <span
            style={{
              color:
                slPnl > 0 ? theme.colors.marketUp : theme.colors.marketDown,
            }}
          >
            {Number(slPnl).toFixed(2) || "--"}
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
          When price reaches {pnlValue?.price}, it will trigger a Limit order,
          and the estimated PnL will be{" "}
          <span
            style={{
              color:
                pnlValue?.pnl > 0
                  ? theme.colors.marketUp
                  : theme.colors.marketDown,
            }}
          >
            {Number(pnlValue?.pnl).toFixed(2) || "--"}
          </span>
        </div>
      )}
    </ModalContainer>
  );
};
export default LimitSellAdvancedModal;

// <PriceSettingModal
//   title={"TP/SL price settings"}
//   isModalOpen={priceModalOpen}
//   setIsModalOpen={setPriceModalOpen}
//   priceSetting={priceSetting}
//   setPriceSetting={setPriceSetting}
// />

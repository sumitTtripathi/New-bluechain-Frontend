import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { forwardRef, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";

import RSIModal from "../RSIModal/RSIModal";
import { StyledStopModal } from "./StopModal.styles";
import {
  useAmendGridBotMutation,
  useOpenBotOrdersQuery,
} from "../../../../Services/Bot";
import { BOT } from "../../../../Enums/Enums";

const StopModal = forwardRef(({ setIsModalOpen, isModalOpen, item }, ref) => {
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [amendGridBot] = useAmendGridBotMutation();
  const [options, setOptions] = useState();
  const onConfirmClick = async (values) => {
    try {
      const data = {
        algoId: item?.algoId,
        instId: item?.instId,
        triggerParams: [
          {
            triggerAction: "stop",
            triggerStrategy: values.triggerStrategy,
            ...(values.triggerPx && {
              triggerPx: values.triggerPx,
            }),
            ...(values.delaySeconds && {
              delaySeconds: values.delaySeconds,
            }),
          },
        ],
      };

      await amendGridBot(data).unwrap();
      // use Toaster message here
      setIsModalOpen(false);
      // dispatch(transactionApi.util.resetApiState());
    } catch (error) {
      // use Toaster message here
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setOptions(value);
  };
  return (
    <StyledStopModal
      getContainer={() => ref?.current || document.body}
      title="Stop condition"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <div className="modal-head">
        {/* <img src="/BTC.svg" alt="" /> */}
        <span>{item?.instId}</span>
        <span className="second">{BOT[item?.algoOrdType]}</span>
      </div>
      <Form
        name="basic"
        validateTrigger={["onBlur", "onChange"]}
        onFinish={onConfirmClick}
      >
        {(values, formInstance) => {
          return (
            <>
              <Form.Item name="triggerStrategy">
                <Select
                  defaultValue="Manual"
                  style={{
                    width: "100%",
                    textAlign: "right",
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "manual",
                      label: "Manual",
                    },
                    {
                      value: "price",
                      label: "Price",
                    },
                    {
                      value: "rsi",
                      label: "RSI",
                    },
                  ]}
                />
              </Form.Item>
              {options === "price" && (
                <>
                  <Form.Item name="triggerPx">
                    <Input type="number" suffix="USDT" className="arrow" />
                  </Form.Item>
                  <Form.Item name="delaySeconds">
                    <Input type="number" suffix="s" className="arrow" />
                  </Form.Item>
                </>
              )}
              {options === "rsi" && (
                <>
                  <div className="box">
                    <div
                      className="rsi-indicator"
                      onClick={() => setIsStopModalOpen(true)}
                    >
                      <LiaEditSolid className="cursor" />
                      <a>Set RSI indicator</a>
                    </div>
                    <div className="container">
                      <div className="left">
                        <span>Indicator Period</span>
                        <span>Trigger Condition</span>
                        <span>Trigger threshold</span>
                        <span>Chart timeframe</span>
                      </div>
                      <div className="right">
                        <span>14</span>
                        <span>{item?.triggerParams?.[1]?.triggerCond}</span>
                        <span>{item?.triggerParams?.[1]?.thold}</span>
                        <span>{item?.triggerParams?.[1]?.timeframe}</span>
                      </div>
                    </div>
                  </div>

                  <Form.Item name="delaySeconds">
                    <Input type="number" suffix="s" className="arrow" />
                  </Form.Item>
                </>
              )}
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Set all once bot stops</Checkbox>
              </Form.Item>
              <div
                style={{
                  textAlign: "right",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button key="submit" htmlType="submit" type="primary">
                  Confirm
                </Button>
              </div>
            </>
          );
        }}
      </Form>
      <RSIModal
        item={item}
        isModalOpen={isStopModalOpen}
        setIsModalOpen={setIsStopModalOpen}
      />
    </StyledStopModal>
  );
});

StopModal.displayName = "StopModal";

export default StopModal;

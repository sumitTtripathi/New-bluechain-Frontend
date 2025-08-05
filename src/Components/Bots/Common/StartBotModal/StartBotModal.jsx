import { Button, Checkbox, Form, Input, Select } from "antd";
import React from "react";
import { useAmendGridBotMutation } from "../../../../Services/Bot";
import { StyledStartButtonModal } from "./StartBotModal.styles";

function StartBotModal({ isStartBotModal, setIsStartBotModal, row }) {
  const [amendGridBot] = useAmendGridBotMutation();
  const handleCancel = () => {
    setIsStartBotModal(false);
  };
  const onConfirmClick = async (values) => {
    try {
      const data = {
        algoId: row?.algoId,
        instId: row?.instId,
        triggerParams: [
          {
            triggerAction: "start",
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

      const response = await amendGridBot(data).unwrap();
      // use Toaster message here
      // setIsModalOpen(false);
    } catch (error) {
      // use Toaster message here
    }
  };
  return (
    <StyledStartButtonModal
      title="Start condition"
      open={isStartBotModal}
      footer={null}
      onCancel={handleCancel}
    >
      <div className="modal-head">
        <img src="/BTC.svg" alt="" />
        <span>BTC/USDT</span>
        <span className="second">Spot grid</span>
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
                  defaultValue="Price"
                  style={{
                    width: "100%",
                    textAlign: "right",
                  }}
                  // onChange={handleChange}
                  disabled
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
              <Form.Item name="delaySeconds">
                <Input type="number" suffix="s" className="arrow" disabled />
              </Form.Item>
              <Form.Item name="triggerPx">
                <Input type="number" suffix="USDT" className="arrow" />
              </Form.Item>

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
    </StyledStartButtonModal>
  );
}

export default StartBotModal;

import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { StyledTpslModal } from "./TpslModal.styles";
import {
  useAmendGridBotMutation,
  useOpenBotOrdersQuery,
} from "../../../../Services/Bot";

function TpslModal({
  setIsTpslModalOpen,
  isTpslModalOpen,
  selectedAlgoOrder,
  row,
}) {
  const [amendGridBot, { isLoading: amendGridBotLoading }] =
    useAmendGridBotMutation();
  const { data: openBotOrders } = useOpenBotOrdersQuery(
    {
      algoOrdType: selectedAlgoOrder,
    },
    {
      skip: !selectedAlgoOrder,
    }
  );
  const [tpslForm] = useForm();
  const handleCancel = () => {
    setIsTpslModalOpen(false);
  };

  useEffect(() => {
    tpslForm.setFieldValue("tpTriggerPx", row?.tpTriggerPx);
    tpslForm.setFieldValue("slTriggerPx", row?.slTriggerPx);
  }, [openBotOrders, row]);

  const onConfirmClick = async (values) => {
    try {
      const data = {
        algoId: row?.algoId,
        instId: row?.instId,
        tpTriggerPx: values.tpTriggerPx,
        slTriggerPx: values.slTriggerPx,
      };

      await amendGridBot(data).unwrap();
      toast.success("Values has been updated");
      setIsTpslModalOpen(false);
    } catch (error) {
      toast.error(error?.data?.message);
      // use toast message here
    }
  };
  return (
    <StyledTpslModal
      open={isTpslModalOpen}
      title="TP | SL"
      onCancel={handleCancel}
      footer={[null]}
    >
      <Form form={tpslForm} onFinish={onConfirmClick}>
        <div className="field-container">
          <label>TP price(USDT)</label>
          <Form.Item
            name="tpTriggerPx"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (value > Number(row?.maxPx) && value >= 0)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error(
                        `Amount should be greater than ${Number(
                          row?.maxPx
                        )} and greater or equal to 0`
                      )
                    );
                  }
                },
              }),
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </div>
        <div className="field-container">
          <label>SL price(USDT)</label>
          <Form.Item
            name="slTriggerPx"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (value < Number(row?.minPx) && value >= 0)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error(
                        `Amount should be lesser than ${Number(
                          row?.minPx
                        )} and greater or equal to 0`
                      )
                    );
                  }
                },
              }),
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </div>
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
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={amendGridBotLoading}
          >
            Confirm
          </Button>
        </div>
      </Form>
    </StyledTpslModal>
  );
}

export default TpslModal;

import { Button, Form, Select } from "antd";
import React from "react";
import { StyledCoolingModal } from "./CoolingModal.styles";

function CoolingModal({ coolingModal, setCoolingModal }) {
  // const handleOk = () => {
  // setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOpen(false);
  //   }, 3000);
  // };
  const handleCancel = () => {
    setCoolingModal(false);
  };
  return (
    <StyledCoolingModal
      title="Cooling-Off Period"
      open={coolingModal}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" style={{ width: "100%" }}>
          Enable
        </Button>,
      ]}
    >
      <div className="field-container">
        <p>
          Once enabled, perpetual and futures trading will be restricted during
          the cooling-off period. You wont be able to end the cooling-off period
          early.
        </p>
      </div>
      <div className="field-container">
        <p>
          During the cooling-off period, you can reduce, close, or adjust the
          margin and the leverage of your current positions. But you cant
          increase positions or open a new one.
        </p>
      </div>
      <div className="field-conatiner">
        <label>Period</label>
        <Form>
          <Select
            defaultValue="1 Day"
            style={{
              width: "100%",
            }}
            allowClear
            options={[
              {
                value: "1 Day",
                label: "1 Day",
              },
              {
                value: "3 Days",
                label: "one",
              },
              {
                value: "7 Days",
                label: "one",
              },
              {
                value: "14 Days",
                label: "one",
              },
              {
                value: "30 Days",
                label: "one",
              },
            ]}
          />
        </Form>
      </div>
    </StyledCoolingModal>
  );
}

export default CoolingModal;

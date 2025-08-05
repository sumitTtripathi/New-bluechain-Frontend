import { Button, Form, Input, Select } from "antd";
import { StyledRsiModal } from "./RSIModal.styles";

function RSIModal({
  isModalOpen,
  setIsModalOpen,
  timeframe,
  thold,
  triggerCond,
  timePeriod,
  threshold,
  resolution,
  setThreshHold,
  setResolution,
  level,
  setLevel,
  form,
}) {
  const handleCancel = () => {
    form.setFieldValue(timeframe, resolution);
    form.setFieldValue(thold, threshold);
    form.setFieldValue(triggerCond, level);
    setIsModalOpen(false);
  };
  const handleSubmit = () => {
    setResolution(form.getFieldValue(timeframe));
    setThreshHold(form.getFieldValue(thold));
    setLevel(form.getFieldValue(triggerCond));
    setIsModalOpen(false);
  };
  return (
    <StyledRsiModal
      open={isModalOpen}
      title="RSI"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <div>
        <img src="" />
        <p>
          {" "}
          <span>Relative Strength Index (RSI)</span> is a momentum indicator
          that gauges the speed of price movements. Generally, RSI uses 30 as
          the oversold threshold, which describes the price of an asset in
          relation to its fair value. A value lower than the oversold threshold
          suggests the short-term decline is coming to an end and a rebound
          could be imminent, so it would be ideal for starting a long position
          of spot grid.
        </p>
      </div>
      <div className="basic">
        <div className="field-container">
          <Form.Item name={timePeriod}>
            <Select
              defaultValue="14days"
              style={{
                width: "100%",
                textAlign: "right",
              }}
              options={[
                {
                  value: "10",
                  label: "10",
                },
                {
                  value: "20",
                  label: "20",
                },
                {
                  value: "30",
                  label: "30",
                },
              ]}
              disabled
              placeholder="Indicator period"
            />
          </Form.Item>
          <Form.Item name={triggerCond}>
            <Select
              value={level}
              style={{
                width: "100%",
                textAlign: "right",
              }}
              options={[
                {
                  value: "above",
                  label: "Above",
                },
                {
                  value: "below",
                  label: "Below",
                },
                {
                  value: "cross",
                  label: "Cross",
                },
                {
                  value: "cross_down",
                  label: "Cross below",
                },
                {
                  value: "cross_up",
                  label: "Cross above",
                },
              ]}
              placeholder="Trigger condition"
            />
          </Form.Item>
        </div>
        <div className="field-container">
          <Form.Item name={thold}>
            <Input
              type="number"
              value={threshold}
              placeholder="Trigger threshold"
            />
          </Form.Item>
          <Form.Item name={timeframe}>
            <Select
              style={{
                width: "100%",
                textAlign: "right",
              }}
              options={[
                {
                  value: "3m",
                  label: "3m",
                },
                {
                  value: "5m",
                  label: "5m",
                },
                {
                  value: "15m",
                  label: "15m",
                },
                {
                  value: "30m",
                  label: "30m",
                },
                {
                  value: "1H",
                  label: "1H",
                },
                {
                  value: "4H",
                  label: "4H",
                },
                {
                  value: "1D",
                  label: "1D",
                },
              ]}
              placeholder="Chart timeframe"
            />
          </Form.Item>
        </div>
      </div>
    </StyledRsiModal>
  );
}

export default RSIModal;

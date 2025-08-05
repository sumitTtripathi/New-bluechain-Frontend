import { Button, Radio } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useStopOrderMutation } from "../../../../Services/Bot";
import { transactionApi } from "../../../../Services/Transaction";
import { StyledButtonModal } from "./StopButtonModal.styles";

function StopButtonModal({
  setStopButtonModal,
  stopButtonModal,
  row,
  selectedAlgoOrder,
}) {
  const [stopOrder, { isLoading: stopOrderLoading }] = useStopOrderMutation();
  const [modalValues, setModalValues] = useState("1");
  const dispatch = useDispatch();

  const handleCancel = () => {
    setStopButtonModal(false);
  };
  const handleOk = () => {
    setStopButtonModal(false);
  };
  const onSubmitClick = async () => {
    try {
      const data = {
        data: [
          {
            algoId: row?.algoId,
            instId: row?.instId,
            stopType: modalValues,
            algoOrdType: row?.algoOrdType,
          },
        ],
      };

      const response = await stopOrder(data).unwrap();
      toast.success(response?.message);
      setStopButtonModal(false);
      dispatch(transactionApi.util.resetApiState());
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <StyledButtonModal
      title={
        selectedAlgoOrder === "grid"
          ? `Stop ${row?.instId} Spot grid`
          : `Stop ${row?.instId} Contract grid`
      }
      open={stopButtonModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onSubmitClick}
          loading={stopOrderLoading}
        >
          Submit
        </Button>,
      ]}
    >
      <>
        <Radio.Group
          value={modalValues}
          onChange={(e) => {
            setModalValues(e.target.value);
          }}
          name="sell"
        >
          <div className="container">
            <Radio className="big-text" value={"1"}>
              {selectedAlgoOrder === "grid" || selectedAlgoOrder === "moon_grid"
                ? `Stop the bot and sell the ${row?.instId}`
                : `Stop the bot and close all`}
            </Radio>
            <span className="small-text">
              {selectedAlgoOrder === "grid" || selectedAlgoOrder === "moon_grid"
                ? `Sell ${row?.instId} at the best market price but might experience price
              fluctuations`
                : `Close all positions at market place. The price may experience fluctuations in real time.`}
            </span>
          </div>
          <div className="container">
            <Radio className="big-text" value={"2"}>
              {selectedAlgoOrder === "grid" || selectedAlgoOrder === "moon_grid"
                ? `Stop the bot without selling the ${row?.instId}`
                : `Stop the bot and keep positions`}
            </Radio>
            <span className="small-text">
              Keep all your positions open after the bot stops
            </span>
          </div>
        </Radio.Group>
      </>
    </StyledButtonModal>
  );
}

export default StopButtonModal;

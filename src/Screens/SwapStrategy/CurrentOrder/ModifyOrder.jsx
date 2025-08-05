import { Popconfirm } from "antd";
import React from "react";
import { useCancelOrderMutation } from "../../../Services/Transaction";
import { toast } from "react-toastify";

const ModifyOrder = ({ row }) => {
  const [cancelOrder] = useCancelOrderMutation();

  const cancelOrderType = async (data) => {
    let response = {};
    const formData = {
      ordId: data?.ordId,
      instId: data?.instId,
    };
    response = await cancelOrder(formData).unwrap();
    return response;
  };
  return (
    <div className="flex-container small-text self-bottom">
      <div className="standar-color">Modify</div>
      <Popconfirm
        title="Sure to cancel?"
        onConfirm={async () => {
          try {
            const response = await cancelOrderType(row);
            if (response?.data?.data[0]?.ordId) {
              toast.success("Order is cancelled.");
            }
          } catch (error) {
            toast.error(error?.data?.message);
          }
        }}
      >
        <a className="standar-color">Cancel</a>
      </Popconfirm>
    </div>
  );
};

export default ModifyOrder;

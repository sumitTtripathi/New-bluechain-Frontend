import { Popconfirm } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGetHighLowPriceQuery } from "../../../Services/Swap";
import { useCancelAlgoOrderMutation } from "../../../Services/Transaction";
import TPSLAdvanceAlgoModal from "./TPSLAdvanceAlgoModal";

const ModifyAlgoOrder = ({ row }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [baseSymbol, quoteSymbol] = String(row?.instId).split("-");

  const { data: coinPairCurrentPrice } = useGetHighLowPriceQuery({
    id: baseSymbol,
    filter: quoteSymbol,
  });
  const [cancelAlgoOrder] = useCancelAlgoOrderMutation();

  const cancelOrderType = async (data) => {
    const formData = {
      data: [
        {
          algoId: data?.algoId,
          instId: data?.instId,
        },
      ],
    };
    const response = await cancelAlgoOrder(formData).unwrap();
    return response;
  };

  return (
    <div className="flex-container small-text self-bottom">
      <div
        className="standard-color"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Modify
      </div>
      <Popconfirm
        title="Sure to cancel?"
        onConfirm={async () => {
          try {
            const response = await cancelOrderType(row);
            if (response?.data?.data[0]?.algoId) {
              toast.success("Order is cancelled.");
            }
          } catch (error) {
            toast.error(error?.data?.message);
          }
        }}
      >
        <a className="standard-color">Cancel</a>
      </Popconfirm>
      <TPSLAdvanceAlgoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={
          <div>
            <div>Modify order</div>
            <div className="sub-header">
              {baseSymbol}
              {quoteSymbol} Perpetual {row?.tdMode}{" "}
              {row?.posSide === "long" ? "Buy" : "Sell"}{" "}
              {Number(row?.lever).toFixed(2)}x
            </div>
          </div>
        }
        lastPrice={coinPairCurrentPrice?.price}
        row={row}
        leverage={row?.lever}
        quoteAsset={quoteSymbol}
        baseAsset={baseSymbol}
      />
    </div>
  );
};

export default ModifyAlgoOrder;

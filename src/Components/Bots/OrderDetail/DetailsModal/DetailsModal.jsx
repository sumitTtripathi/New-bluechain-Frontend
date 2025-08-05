import { Button, Divider } from "antd";
import { toUpper } from "lodash";
import moment from "moment";
import React from "react";
import { capitalizeWord } from "../../../../Utils/common";
import FieldContainer from "../FieldContainer/FieldContainer";
import { StyledDetailsModal } from "./DetailsModal.styles";

function DetailsModal({
  isDetailsModalOpen,
  setIsDetailsModalOpen,
  row,
  baseAsset,
  quoteAsset,
}) {
  const handleCancel = () => {
    setIsDetailsModalOpen(false);
  };
  const data = [
    {
      key: "1",
      label: "Order Time",
      value: (
        <span>
          {moment(Number(row?.cTime)).format("MM/DD/YYYY")}{" "}
          {moment(Number(row?.cTime)).format("HH:MM:SS")}
        </span>
      ),
    },
    {
      key: "2",
      label: "Filled",
      value: (
        <span>
          {moment(Number(row?.uTime)).format("MM/DD/YYYY")}{" "}
          {moment(Number(row?.uTime)).format("HH:MM:SS")}
        </span>
      ),
    },
    {
      key: "3",
      label: "Side",
      value: (
        <span style={{ color: row?.side === "buy" ? "#008563" : "red" }}>
          {capitalizeWord(row?.side)}
        </span>
      ),
    },
    {
      key: "4",
      label: "Filled Amount",
      value: (
        <span>
          {(row?.sz * row?.avgPx).toFixed(6)} {quoteAsset}
        </span>
      ),
    },
    {
      key: "5",
      label: "Fill Price",
      value: (
        <span>
          {capitalizeWord(row?.avgPx)} {quoteAsset}
        </span>
      ),
    },
    {
      key: "6",
      label: "Filled Amount",
      value: (
        <span>
          {(row?.sz && row?.sz) || "-"} {baseAsset}
        </span>
      ),
    },
    {
      key: "7",
      label: "Total Amount",
      value: (
        <span>
          {(row?.sz && row?.sz) || "-"} {baseAsset}
        </span>
      ),
    },
    {
      key: "8",
      label: "Order Price",
      value: <span>{capitalizeWord(row?.avgPx)}</span>,
    },
    {
      key: "9",
      label: "Fee",
      value: <span>{capitalizeWord(row?.fee)}</span>,
    },
    {
      key: "10",
      label: "Fee Rebate",
      value: (
        <span>
          {capitalizeWord(row?.rebate)} {row?.rebateCcy.toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <StyledDetailsModal
      open={isDetailsModalOpen}
      onCancel={handleCancel}
      footer={null}
      title="Trade details for"
    >
      <div className="data-modal">
        <div className="data-modal-container">
          {data.map((item, i) => {
            return (
              <>
                <FieldContainer key={i} label={item.label} value={item.value} />
              </>
            );
          })}
        </div>
        {/* <Divider
          type="horizontal"
          style={{
            height: "2avgPx",
            backgroundColor: "#E6E5E9",
            width: "98%",
            margin: "auto",
            marginBottom: "10avgPx",
          }}
        />
        <div className="data-modal-container">
          {data.map((item, i) => {
            return (
              <>
                <FieldContainer
                  sell
                  key={i}
                  label={item.label}
                  value={item.value}
                />
              </>
            );
          })}
        </div> */}
      </div>
    </StyledDetailsModal>
  );
}

export default DetailsModal;

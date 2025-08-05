import React from "react";
import { StyledLastTradesContainer } from "../../Screens/Perpetual/Spot.styles";
import { StyledCellSpan, StyledTable } from "../../Screens/Spot/Spot.styles";

const LastTrades = ({ baseAsset, quoteAsset, latestExecution }) => {
  const tradeColumns = [
    {
      title: `Price (${quoteAsset?.toUpperCase()})`,
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (item, row) => (
        <StyledCellSpan side={row?.side} item={item}>
          {item}
        </StyledCellSpan>
      ),
    },
    {
      title: `Amount (${baseAsset?.toUpperCase()})`,
      dataIndex: "qty",
      align: "center",
      key: "qty",
    },
    {
      title: "Time",
      dataIndex: "time",
      align: "center",
      key: "time",
      render: (_, row) => {
        return (
          <span className="value">
            {/* {Number(Number(row?.px) * Number(row?.sz)).toFixed(4)} */}
            {row.time}
          </span>
        );
      },
    },
  ];
  return (
    <StyledLastTradesContainer>
      <div className="last-trades-container">
        <StyledTable
          style={{ border: "none" }}
          className="execution-table"
          pagination={false}
          columns={tradeColumns}
          dataSource={latestExecution?.data ?? []}
        />
      </div>
    </StyledLastTradesContainer>
  );
};

export default LastTrades;

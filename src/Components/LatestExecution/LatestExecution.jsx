import moment from "moment";
import React from "react";
import { StyledCellSpan, StyledTable } from "../../Screens/Spot/Spot.styles";

const LatestExecution = ({ id, coinListFilter, latestExecution }) => {
  const executionColumns = [
    {
      title: `Price (${coinListFilter?.toUpperCase()})`,
      dataIndex: "px",
      key: "price",
      width: 120,
      render: (item, row) => (
        <StyledCellSpan side={row?.side} item={item}>
          {item}
        </StyledCellSpan>
      ),
    },
    {
      title: `Amount (${id?.toUpperCase()})`,
      dataIndex: "sz",
      align: "center",
      key: "amount",
    },
    {
      title: "Time",
      dataIndex: "ts",
      align: "center",
      key: "time",
      render: (item) => {
        const duration = moment.duration(item);
        return <span>{moment(Number(duration)).format("HH:MM:SS")}</span>;
      },
    },
  ];
  return (
    <>
      <p className="title execution">Latest Executions</p>
      <StyledTable
        style={{ border: "none" }}
        scroll={{
          y: 400,
        }}
        className="execution-table"
        pagination={false}
        columns={executionColumns}
        dataSource={latestExecution?.data ?? []}
      />
    </>
  );
};

export default LatestExecution;

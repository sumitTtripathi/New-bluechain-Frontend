import moment from "moment";
import React from "react";
import { useGetLatestExecutionQuery } from "../../../Services/Transaction";
import { StyledCellSpan, StyledTable } from "../Spot.styles";

const LatestExecution = ({ id, coinListFilter }) => {
  const limit = 40;
  const { data: latestExecution } = useGetLatestExecutionQuery({
    symbol: `${id?.toUpperCase()}${coinListFilter}`,
    limit: limit,
  });
  const executionColumns = [
    {
      title: `Price (${coinListFilter?.toUpperCase()})`,
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (item, row) => {
      
        if (!item) {
          return <span>No Price Available</span>;
        }
      
        return (
          <StyledCellSpan side={row?.side} item={item}>
            {Number(item) > 0 ? `${item}` : `${item}`}
          </StyledCellSpan>
        );
      },      
    },
    {
      title: `Amount (${id?.toUpperCase()})`,
      dataIndex: "qty",
      align: "center",
      key: "amount",
    },
    {
      title: "Time",
      dataIndex: "time",
      align: "center",
      key: "time",
      render: (item) => {
        const duration = moment.duration(item);
        return (
          <span>{moment(duration.asMilliseconds()).format("HH:mm:ss")}</span>
        );
      },
    },
  ];
  return (
    <>
      <p className="title execution">
        Latest Executions
        {/* <span className="mine-check">
          <input type="checkbox" />
          <span>Mine</span>
        </span> */}
      </p>
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

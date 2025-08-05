import { Button } from "antd";
import React from "react";

const ExcelExport = ({ columns, rowData }) => {
  const content = [columns, ...rowData];
  const csvContent =
    "data:text/csv;charset=utf-8," + content.map((e) => e.join(",")).join("\n");

  return (
    <div>
      <Button
        onClick={() => {
          window.open(encodeURI(csvContent));
        }}
        size="small"
        className="time-filter-btn"
      >
        Export
      </Button>
    </div>
  );
};

export default ExcelExport;

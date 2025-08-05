import { Button, Table } from "antd";
import { OrdersContainer } from "../Spot.styles";
import { useState } from "react";
import { useGetAllOrdersQuery } from "../../../Services/Transaction";
import moment from "moment";
import { FiRefreshCcw } from "react-icons/fi";

const columns = [
  {
    title: "Trading Pair",
    dataIndex: "orderId",
    key: "symbol",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (item) => {
      const duration = moment.duration(item);
      return (
        <span>{moment(Number(duration)).format("YYYY-MM-DD HH:MM:SS")}</span>
      );
    },
  },

  {
    title: "Side",
    dataIndex: "side",
    key: "side",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (item, row) => {
      return <span>{row?.price}</span>;
    },
  },
  {
    title: "Quantity",
    dataIndex: "origQty",
    key: "Quantity",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },

  // {
  //   title: "State",
  //   dataIndex: "state",
  //   key: "status",
  // },
];

const OrderHistory = ({ baseAsset, quoteAsset }) => {
  const [selected, setSelected] = useState("normal");
  const {
    data: allOrders,
    isLoading: isLoadingOrder,
    isFetching: isRefetchingOrder,
    refetch,
  } = useGetAllOrdersQuery({
    symbol: `${baseAsset}${quoteAsset}`,
  });

  return (
    <OrdersContainer>
      <div className="flex-space-between">
        <div className="btns-container">
          <Button
            className={selected === "normal" ? "active" : ""}
            size="medium"
            onClick={() => setSelected("normal")}
          >
            Normal Order
          </Button>
          <Button
            className={selected === "stop" ? "active" : ""}
            size="medium"
            onClick={() => setSelected("stop")}
          >
            Stop Order
          </Button>
        </div>
        <FiRefreshCcw
          onClick={async () => {
            await refetch();
          }}
        />
      </div>
      <Table
        loading={isLoadingOrder || isRefetchingOrder}
        className="orders-container-table"
        dataSource={allOrders?.data}
        columns={columns}
      />
    </OrdersContainer>
  );
};

export default OrderHistory;

import { Button, Table } from "antd";
import { OrdersContainer } from "../Spot.styles";
// import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { useGetAllOrdersQuery } from "../../../Services/Transaction";
import moment from "moment";
// const FilterDropdown = ({ items }) => {
//   return (
//     <FiltersDropdownContainer>
//       {items?.map((item, i) => {
//         return (
//           <div key={i}>
//             <span>{item.text}</span>
//           </div>
//         );
//       })}
//     </FiltersDropdownContainer>
//   );
// };
const columns = [
  {
    title: "Trading Pair",
    dataIndex: "instId",
    key: "symbol",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (item) => {
      const duration = moment.duration(item);
      return (
        <span>
          {moment.utc(duration.asMilliseconds()).format("YYYY-MM-DD HH:mm:ss")}
        </span>
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
    dataIndex: "avgPx",
    key: "price",
    render: (item, row) => {
      return <span>{row?.avgPx || row?.px}</span>;
    },
  },
  {
    title: "Quantity",
    dataIndex: "sz",
    key: "Quantity",
  },
  {
    title: "Type",
    dataIndex: "ordType",
    key: "type",
  },

  {
    title: "State",
    dataIndex: "state",
    key: "status",
  },
];
const OrderHistory = ({ baseAsset, quoteAsset }) => {
  const [selected, setSelected] = useState("normal");
  const { data: allOrders } = useGetAllOrdersQuery({
    symbol : `${baseAsset}${quoteAsset}`
  } );

  return (
    <OrdersContainer>
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
      <Table
        className="orders-container-table"
        dataSource={allOrders?.data}
        columns={columns}
      />
    </OrdersContainer>
  );
};

export default OrderHistory;

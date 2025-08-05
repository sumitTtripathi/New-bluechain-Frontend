// import { Table } from "antd";
// import { OrdersContainer } from "../Spot.styles";
// import { useMemo, useState } from "react";
// import { useGetAllOrdersQuery } from "../../../Services/Transaction";
// import moment from "moment";
// import { INST_TYPE, leverageDecimal } from "../../../Constants/state";
// import { FiRefreshCcw } from "react-icons/fi";
// import coinJson from "../../../Constants/Coin.json";
// import { useTheme } from "styled-components";
// import TPSLModal from "./TPSLModal";

// const LimitHistory = () => {
//   const [selectedFilter, setSelectedFilter] = useState("limit");
//   const [isModelOpen, setIsModalOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState({});
//   const theme = useTheme();
//   const {
//     data: allOrders,
//     isLoading: isLoadingOrder,
//     isFetching: isRefetchingOrder,
//     refetch,
//   } = useGetAllOrdersQuery({
//     instType: INST_TYPE.swap,
//     ordType: selectedFilter,
//   });

//   const columns = useMemo(() => {
//     return [
//       {
//         //title: "",
//         dataIndex: "instId",
//         title: "Symbol",
//         key: "symbol",
//         render: (item, row) => {
//           const [baseSymbol, quoteSymbol] = String(item).split("-");
//           return (
//             <div className="flex-col">
//               <div className="symbol-info">
//                 <div className="symbol-info">
//                   <img
//                     className="table-icon"
//                     src={coinJson[baseSymbol]}
//                     alt="icon"
//                   />{" "}
//                   <p className="text-element">{`${baseSymbol}-${quoteSymbol} Perpetual`}</p>
//                 </div>
//               </div>
//               <div className="small-text symbol-info">
//                 <span className="perp">{row?.tdMode}</span>
//                 <span className="perp">{row?.lever}x</span>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         title: "",
//         dataIndex: "cTime",
//         title: "Order Time",
//         key: "time",
//         render: (item, row) => {
//           const openTime = moment.duration(row?.cTime);
//           return (
//             <div className="small-text self-bottom">
//               <div>{moment(Number(openTime)).format("MM/DD/YYYY")}</div>
//               <div>{moment(Number(openTime)).format("HH:MM:SS")}</div>
//             </div>
//           );
//         },
//       },
//       {
//         title: "",
//         dataIndex: "posSide",
//         title: "Side",
//         key: "time",
//         render: (item) => {
//           return (
//             <div
//               className="small-text self-bottom"
//               style={{
//                 color:
//                   item === "long"
//                     ? theme.colors.marketUp
//                     : theme.colors.marketDown,
//               }}
//             >
//               {item === "long" ? "Buy" : "Sell"}
//             </div>
//           );
//         },
//       },
//       {
//         title: "",
//         dataIndex: "posSide",
//         title: "Fill | Order price",
//         key: "time",
//         render: (item, row) => {
//           return (
//             <>
//               <div className="small-text self-bottom">
//                 {row?.fillPx} {row?.rebateCcy}
//               </div>
//               <div className="small-text">
//                 {row?.px} {row?.rebateCcy}
//               </div>
//             </>
//           );
//         },
//       },
//       {
//         // title: "",
//         dataIndex: "posSide",
//         title: "Filled | Total",
//         key: "time",
//         render: (item, row) => {
//           return (
//             <div className="small-text self-bottom">
//               <div>{row?.fillSz} Cont</div>
//               <div>{row?.accFillSz} Cont</div>
//             </div>
//           );
//         },
//       },
//       {
//         // title: "",
//         dataIndex: "posSide",
//         title: "Filled | Order value",
//         key: "time",
//         render: (item, row) => {
//           return (
//             <div className="small-text self-bottom">
//               <div>$ {row?.px}</div>
//               <div>$ {row?.fillPx}</div>
//             </div>
//           );
//         },
//       },
//       {
//         title: "PnL | PnL%",
//         dataIndex: "state",
//         align: "bottom",
//         key: "status",
//         render: (_, row) => {
//           return (
//             <div className="small-text self-bottom">
//               <div className="value-info">
//                 <div className="fixed-width">PnL</div>
//                 <div
//                   style={{
//                     color:
//                       Number(row?.pnl).toFixed(2) > 0
//                         ? theme.colors.marketUp
//                         : theme.colors.marketDown,
//                   }}
//                 >
//                   {Number(row?.pnl).toFixed(2)}
//                 </div>
//               </div>
//               <div className="value-info">
//                 <div className="fixed-width">PnL%</div>
//                 <div
//                   style={{
//                     color:
//                       Number(row?.pnl).toFixed(2) > 0
//                         ? theme.colors.marketUp
//                         : theme.colors.marketDown,
//                   }}
//                 >
//                   {Number(Number(row?.pnl) / Number(row?.lever)).toFixed(2)}%
//                 </div>
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         // title: "",
//         dataIndex: "fee",
//         title: "Fee",
//         key: "side",
//         render: (item, row) => {
//           return (
//             <div className="small-text self-bottom">
//               <div>
//                 {row?.fee} {row?.feeCcy}
//               </div>
//             </div>
//           );
//         },
//       },
//       {
//         // title: "",
//         dataIndex: "fee",
//         title: "TP | SL",
//         key: "side",
//         render: (item, row) => {
//           return (
//             <div className="small-text self-bottom">
//               {(row?.slTriggerPx || row?.tpTriggerPx) && (
//                 <div
//                   className="standard-text"
//                   onClick={() => {
//                     setSelectedRow(row);
//                     setIsModalOpen(true);
//                   }}
//                 >
//                   View
//                 </div>
//               )}
//               {!row?.slTriggerPx && !row?.tpTriggerPx && <div>~~</div>}
//             </div>
//           );
//         },
//       },
//       {
//         // title: "",
//         dataIndex: "fee",
//         title: "Reduce-only",
//         key: "side",
//         render: (item, row) => {
//           return (
//             <div className="small-text self-bottom">
//               <div>{row?.reduceOnly} </div>
//             </div>
//           );
//         },
//       },
//       {
//         // title: "",
//         dataIndex: "fee",
//         title: "Status",
//         key: "side",
//         render: (item, row) => {
//           return (
//             <div className="small-text self-bottom">
//               <div>{row?.state} </div>
//             </div>
//           );
//         },
//       },
//     ];
//   }, [allOrders]);

//   return (
//     <OrdersContainer>
//       <div className="flex-space-between">
//         <div className="btns-container"></div>
//         <FiRefreshCcw
//           onClick={async () => {
//             await refetch();
//           }}
//         />
//       </div>
//       <Table
//         loading={isLoadingOrder || isRefetchingOrder}
//         className="orders-container-table"
//         dataSource={allOrders?.data}
//         columns={columns}
//       />
//       <TPSLModal
//         data={selectedRow}
//         isModalOpen={isModelOpen}
//         title={"TP | SL"}
//         setIsModalOpen={setIsModalOpen}
//       />
//     </OrdersContainer>
//   );
// };

// export default LimitHistory;















import { Table } from "antd";
import { OrdersContainer } from "../Spot.styles";
import { useMemo, useState } from "react";
import { useGetAllOrdersQuery } from "../../../Services/Transaction";
import moment from "moment";
import { INST_TYPE, leverageDecimal } from "../../../Constants/state";
import { FiRefreshCcw } from "react-icons/fi";
import coinJson from "../../../Constants/Coin.json";
import { useTheme } from "styled-components";
import TPSLModal from "./TPSLModal";

const LimitHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState("limit");
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const theme = useTheme();
  const {
    data: allOrders,
    isLoading: isLoadingOrder,
    isFetching: isRefetchingOrder,
    refetch,
  } = useGetAllOrdersQuery({
    instType: INST_TYPE.swap,
    ordType: selectedFilter,
  });

 
   
       
  const columns = useMemo(() => {
  return [
    {
      dataIndex: "instId",
      title: "Symbol",
      key: "symbol",
      render: (item, row) => {
        const [baseSymbol, quoteSymbol] = String(item).split("-");
        return (
          <div className="flex-col">
            <div className="symbol-info">
              <div className="symbol-info">
                <img className="table-icon" src={coinJson[baseSymbol]} alt="icon" />
                <p className="text-element">{`${baseSymbol}-${quoteSymbol} Perpetual`}</p>
              </div>
            </div>
            <div className="small-text symbol-info">
              <span className="perp">{row?.tdMode}</span>
              <span className="perp">{row?.lever}x</span>
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "cTime",
      title: "Order Time",
      key: "time",
      render: (item, row) => {
        const openTime = moment.duration(row?.cTime);
        return (
          <div className="small-text self-bottom">
            <div>{moment(Number(openTime)).format("MM/DD/YYYY")}</div>
            <div>{moment(Number(openTime)).format("HH:MM:SS")}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "posSide",
      title: "Side",
      key: "side1",
      render: (item) => {
        return (
          <div
            className="small-text self-bottom"
            style={{
              color: item === "long" ? theme.colors.marketUp : theme.colors.marketDown,
            }}
          >
            {item === "long" ? "Buy" : "Sell"}
          </div>
        );
      },
    },
    {
      dataIndex: "posSide",
      title: "Fill | Order price",
      key: "price",
      render: (item, row) => {
        return (
          <>
            <div className="small-text self-bottom">
              {row?.fillPx} {row?.rebateCcy}
            </div>
            <div className="small-text">
              {row?.px} {row?.rebateCcy}
            </div>
          </>
        );
      },
    },
    {
      dataIndex: "posSide",
      title: "Filled | Total",
      key: "filled",
      render: (item, row) => {
        return (
          <div className="small-text self-bottom">
            <div>{row?.fillSz} Cont</div>
            <div>{row?.accFillSz} Cont</div>
          </div>
        );
      },
    },
    {
      dataIndex: "posSide",
      title: "Filled | Order value",
      key: "orderValue",
      render: (item, row) => {
        return (
          <div className="small-text self-bottom">
            <div>$ {row?.px}</div>
            <div>$ {row?.fillPx}</div>
          </div>
        );
      },
    },
    {
      title: "PnL | PnL%",
      dataIndex: "state",
      align: "bottom",
      key: "pnl",
      render: (_, row) => {
        const isProfit = Number(row?.pnl).toFixed(2) > 0;
        return (
          <div className="small-text self-bottom">
            <div className="value-info">
              <div className="fixed-width">PnL</div>
              <div style={{ color: isProfit ? theme.colors.marketUp : theme.colors.marketDown }}>
                {Number(row?.pnl).toFixed(2)}
              </div>
            </div>
            <div className="value-info">
              <div className="fixed-width">PnL%</div>
              <div style={{ color: isProfit ? theme.colors.marketUp : theme.colors.marketDown }}>
                {Number(Number(row?.pnl) / Number(row?.lever)).toFixed(2)}%
              </div>
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "fee",
      title: "Fee",
      key: "fee",
      render: (item, row) => {
        return (
          <div className="small-text self-bottom">
            <div>
              {row?.fee} {row?.feeCcy}
            </div>
          </div>
        );
      },
    },
    {
      dataIndex: "fee",
      title: "TP | SL",
      key: "tpsl",
      render: (item, row) => {
        return (
          <div className="small-text self-bottom">
            {(row?.slTriggerPx || row?.tpTriggerPx) ? (
              <div
                className="standard-text"
                onClick={() => {
                  setSelectedRow(row);
                  setIsModalOpen(true);
                }}
              >
                View
              </div>
            ) : (
              <div>~~</div>
            )}
          </div>
        );
      },
    },
    {
      dataIndex: "fee",
      title: "Reduce-only",
      key: "reduceOnly",
      render: (item, row) => {
        return (
          <div className="small-text self-bottom">
            <div>{row?.reduceOnly}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "fee",
      title: "Status",
      key: "status",
      render: (item, row) => {
        return (
          <div className="small-text self-bottom">
            <div>{row?.state}</div>
          </div>
        );
      },
    },
  ];
}, [allOrders]);
  



  return (
    <OrdersContainer>
      <div className="flex-space-between">
        <div className="btns-container"></div>
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
      <TPSLModal
        data={selectedRow}
        isModalOpen={isModelOpen}
        title={"TP | SL"}
        setIsModalOpen={setIsModalOpen}
      />
    </OrdersContainer>
  );
};

export default LimitHistory;
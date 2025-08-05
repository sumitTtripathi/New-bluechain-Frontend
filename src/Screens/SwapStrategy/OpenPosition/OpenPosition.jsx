import { Table } from "antd";
import { memo, useMemo } from "react";
import { OrdersContainer } from "../Spot.styles";
import {
  transactionApi,
  useCancelOrderMutation,
  useGetOpenPositionQuery,
} from "../../../Services/Transaction";
import FormComponent from "./FormComponent";
import AddTPSL from "./AddTPSL";
import MarkPriceCol from "./MarkPriceCol";
import MarginLevelCol from "./MarginLevelCol";
import PNLCol from "./PNLCol";
import styled from "styled-components";
import { FiRefreshCcw } from "react-icons/fi";
import { useDispatch } from "react-redux";

const StyledTable = styled(Table)`
  overflow-x: scroll;
`;
const OpenPosition = ({ leverageMode }) => {
  const {
    data: openOrders,
    isLoading: isLoadingOrder,
    isFetching: isRefetchingOrder,
    refetch,
  } = useGetOpenPositionQuery({ instType: "SWAP" });
  const [cancelOrder] = useCancelOrderMutation();
  const dispatch = useDispatch();
  const columns = useMemo(() => {
    return [
      {
        title: "",
        dataIndex: "instId",
        key: "symbol",

        render: (item, row) => {
          return <AddTPSL item={item} row={row} leverageMode={leverageMode} />;
        },
      },
      {
        title: "",
        dataIndex: "cTime",
        key: "time",

        render: (_, row) => {
          return <MarkPriceCol leverageMode={leverageMode} row={row} />;
        },
      },
      {
        title: "",
        dataIndex: "side",
        key: "side",

        render: (_, row) => {
          return <MarginLevelCol row={row} />;
        },
      },
      {
        title: "",
        dataIndex: "state",
        key: "status",

        render: (_, row) => {
          return <PNLCol row={row} leverageMode={leverageMode} />;
        },
      },
      {
        title: "",
        dataIndex: "symbol",
        key: "symbol",

        render: (_, row) => {
          return <FormComponent leverageMode={leverageMode} row={row} />;
        },
      },
    ];
  }, [cancelOrder]);

  return (
    <OrdersContainer>
      <div className="flex-space-between">
        <div></div>
        <FiRefreshCcw
          onClick={async () => {
            dispatch(transactionApi.util.resetApiState());
            // dispatch(
            //   transactionApi.util.invalidateTags(["CLOSE_POSITION", "ORDER"])
            // );
            await refetch();
          }}
        />
      </div>
      <StyledTable
        loading={isLoadingOrder || isRefetchingOrder}
        className="orders-container-table t-head-none"
        dataSource={openOrders?.data || []}
        columns={columns}
      />
    </OrdersContainer>
  );
};

export default memo(OpenPosition);

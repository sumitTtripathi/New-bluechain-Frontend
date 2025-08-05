import { Button, Popconfirm, Table } from "antd";
import { memo, useMemo, useState } from "react";
import { OrdersContainer } from "../Spot.styles";
import {
  useCancelAdvanceAlgoOrderMutation,
  useCancelAlgoOrderMutation,
  useCancelOrderMutation,
  useGetOpenOrdersQuery,
} from "../../../Services/Transaction";
import { toast } from "react-toastify";
import moment from "moment";

const CurrentOrder = ({ baseAsset, quoteAsset }) => {
  const [selectedFilter, setSelectedFilter] = useState("limit");
  const { data: openOrders } = useGetOpenOrdersQuery({
    symbol: `${baseAsset}${quoteAsset}`,
    ordType: selectedFilter,
  });
  const [cancelOrder] = useCancelOrderMutation();
  const [cancelAlgoOrder] = useCancelAlgoOrderMutation();
  const [cancelAdvanceAlgoOrder] = useCancelAdvanceAlgoOrderMutation();

  const cancelOrderType = async (data, orderType) => {
    let response = {};
    if (["limit", "market", "ioc", "post_only", "fok"].includes(orderType)) {
      const formData = {
        orderId: data?.orderId,
        symbol: data?.symbol,
      };
      response = await cancelOrder(formData).unwrap();
    } else if (orderType === "move_order_stop") {
      const formData = [
        {
          algoId: data?.algoId,
          symbol: data?.symbol,
        },
      ];
      response = await cancelAdvanceAlgoOrder(formData).unwrap();
    } else if (["conditional", "trigger", "oco"]?.includes(orderType)) {
      const formData = [
        {
          algoId: data?.algoId,
          symbol: data?.symbol,
        },
      ];
      response = await cancelAlgoOrder(formData).unwrap();
    }
    return response;
  };
  const columns = useMemo(() => {
    const addtional = [];

    if (
      ["limit", "market", "ioc", "post_only", "fok"].includes(selectedFilter)
    ) {
      addtional.push({
        title: "Price",
        dataIndex: "px",
        key: "price",
      });
    } else {
      addtional.push({
        title: "Trigger Price",
        dataIndex: "slTriggerPx",
        key: "price",
        render: (item, row) => {
          return (
            <span>
              {row?.callbackRatio ||
                row?.callbackSpread ||
                row?.slTriggerPx ||
                row?.tpTriggerPx}
            </span>
          );
        },
      });
    }
    return [
      {
        title: "Trading Pair",
        dataIndex: "symbol",
        key: "symbol",
      },
      {
        title: "Time",
        dataIndex: "cTime",
        key: "time",
        render: (item) => {
          const duration = moment.duration(item);
          return (
            <span>
              {moment(duration.asMilliseconds()).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          );
        },
      },

      {
        title: "Side",
        dataIndex: "side",
        key: "side",
      },
      ...addtional,
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
      {
        title: "Cancel",
        dataIndex: "symbol",
        key: "symbol",
        render: (_, row) => (
          <Popconfirm
            title="Sure to cancel?"
            onConfirm={async () => {
              try {
                const response = await cancelOrderType(row, selectedFilter);
                if (response?.data?.data[0]?.ordId) {
                  toast.success("Order is cancelled.");
                }
              } catch (error) {
                toast.error(error?.data?.message);
              }
            }}
          >
            <a>Cancel Order</a>
          </Popconfirm>
        ),
      },
    ];
  }, [cancelOrder, selectedFilter]);

  const currentOrderFilters = useMemo(() => {
    return [
      {
        label: "Limit",
        value: "limit",
      },
      {
        label: "Market",
        value: "market",
      },
      {
        label: "FOK",
        value: "fok",
      },
      {
        label: "IOC",
        value: "ioc",
      },
      {
        label: "Post only",
        value: "post_only",
      },
      {
        label: "Conditional",
        value: "conditional",
      },
      {
        label: "Oco",
        value: "oco",
      },
      {
        label: "Trigger",
        value: "trigger",
      },
      {
        label: "Trail",
        value: "move_order_stop",
      },
    ];
  }, []);

  return (
    <OrdersContainer>
      <div className="btns-container">
        {currentOrderFilters?.map((item, i) => {
          return (
            <Button
              key={i}
              className={selectedFilter === item?.value ? "active" : ""}
              size="medium"
              onClick={() => setSelectedFilter(item?.value)}
            >
              {item?.label}
            </Button>
          );
        })}

        {/* <Button
          className={selected === "stop" ? "active" : ""}
          size="medium"
          onClick={() => setSelected("stop")}
        >
          Stop Order(0)
        </Button> */}
      </div>
      <Table
        className="orders-container-table"
        dataSource={openOrders?.data || []}
        columns={columns}
      />
    </OrdersContainer>
  );
};

export default memo(CurrentOrder);

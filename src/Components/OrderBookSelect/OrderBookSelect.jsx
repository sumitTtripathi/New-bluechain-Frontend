import {
  forwardRef,
  memo,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useGetOrderBookWithoutSocketQuery } from "../../Services/Transaction";
import { getDecimalFromLength } from "../../Utils/common";
import { Select } from "antd";

export const OrderBookSelect = forwardRef(
  ({ limit, baseAsset, quoteAsset }, ref) => {
    const [filter, setFilter] = useState({ value: 1, label: "1" });
    const { data: orderBookWithoutSocket } = useGetOrderBookWithoutSocketQuery({
      symbol: `${baseAsset?.toUpperCase()}${quoteAsset}`,
      limit: limit,
    });

    useImperativeHandle(
      ref,
      () => {
        return {
          filter,
        };
      },
      [filter]
    );

    const selectOptions = useMemo(() => {
      setFilter(() => {
        if (
          orderBookWithoutSocket?.decimalLength <= 1 ||
          !orderBookWithoutSocket?.decimalLength
        ) {
          return {
            value: orderBookWithoutSocket?.decimalLength,
            label: "0.1",
          };
        } else {
          return {
            value: orderBookWithoutSocket?.decimalLength,
            label: getDecimalFromLength(orderBookWithoutSocket?.decimalLength),
          };
        }
      });
      if (
        orderBookWithoutSocket?.decimalLength <= 2 ||
        !orderBookWithoutSocket?.decimalLength
      ) {
        return [
          {
            value: 2,
            label: "0.01",
          },
          {
            value: 1,
            label: "0.1",
          },
        ];
      } else if (orderBookWithoutSocket?.decimalLength > 2) {
        return [
          {
            value: orderBookWithoutSocket?.decimalLength,
            label: getDecimalFromLength(orderBookWithoutSocket?.decimalLength),
          },
          {
            value: orderBookWithoutSocket?.decimalLength - 1,
            label: getDecimalFromLength(
              orderBookWithoutSocket?.decimalLength - 1
            ),
          },
          {
            value: orderBookWithoutSocket?.decimalLength - 2,
            label: getDecimalFromLength(
              orderBookWithoutSocket?.decimalLength - 2
            ),
          },
          {
            value: orderBookWithoutSocket?.decimalLength - 3,
            label: getDecimalFromLength(
              orderBookWithoutSocket?.decimalLength - 3
            ),
          },
        ];
      }
    }, [orderBookWithoutSocket]);

    return (
      <Select
        className="select"
        value={filter?.value}
        style={{
          width: 120,
        }}
        onChange={(e, item) => {
          setFilter({ value: item?.value, label: item?.label });
        }}
        options={selectOptions}
      />
    );
  }
);

OrderBookSelect.displayName = "OrderBookSelect";

export default memo(OrderBookSelect);

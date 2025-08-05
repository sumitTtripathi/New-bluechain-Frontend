import { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import CurrencyFormat from "react-currency-format";
import { StyledOrderBookContainer } from "../../Screens/Perpetual/Spot.styles";
import OrderBookSelect from "../OrderBookSelect/OrderBookSelect";
import { tradeType } from "../../Constants/state";
import { useSelector } from "react-redux";
import { StyledTable } from "../../Screens/Spot/Spot.styles";

const OrderBook = ({
  baseAsset,
  quoteAsset,
  hlCoinPriceData,
  orderBook,
  limit,
  setLimit,
}) => {
  const [maxBuyNumber, setMaxBuyNumber] = useState("");
  const [maxSellNumber, setMaxSellNumber] = useState("");
  const orderBookSelectRef = useRef();
  const [filterType, setFilterType] = useState("both");
  const themeValue = useSelector((state) => state.global.themeValue);

  const getSize = (item, side) => {
    const amount = Number(item[1]);
    const max = side === "bid" ? maxBuyNumber : maxSellNumber;

    if (!max || max === 0) return "0% 100%";

    const percent = Math.floor((amount * 100) / max);
    return `${percent}% 100%`;
  };

  //  useEffect(() => {
  //   // Initialize max_value to a very small number
  //   let max_buy = "";
  //   let max_sell = "";

  //   // Iterate through the sub-arrays
  //   if (orderBook?.asks) {
  //     for (const subArray of orderBook.asks) {
  //       // Convert the first element of the sub-array to a float
  //       const firstElement = parseFloat(subArray[1]);
  //       // Update max_value if a larger value is found
  //       if (firstElement > max_sell) {
  //         max_sell = firstElement;
  //       }
  //     }
  //     for (const subArray of orderBook.bids) {
  //       // Convert the first element of the sub-array to a float
  //       const firstElement = parseFloat(subArray[1]);
  //       // Update max_value if a larger value is found
  //       if (firstElement > max_buy) {
  //         max_buy = firstElement;
  //       }
  //     }
  //     setMaxBuyNumber(max_buy);
  //     setMaxSellNumber(max_sell);
  //   }
  // }, [orderBook]);

  useEffect(() => {
    let max_buy = 0;
    let max_sell = 0;

    if (orderBook?.asks?.length || orderBook?.bids?.length) {
      for (const subArray of orderBook.asks || []) {
        const value = parseFloat(subArray[1]);
        if (value > max_sell) max_sell = value;
      }

      for (const subArray of orderBook.bids || []) {
        const value = parseFloat(subArray[1]);
        if (value > max_buy) max_buy = value;
      }

      setMaxBuyNumber(max_buy);
      setMaxSellNumber(max_sell);
    }
  }, [orderBook]);

  const precision = orderBookSelectRef?.current?.filter?.value ?? 2;

  const formatNumber = (value, fixed) =>
    Number(Number(value).toFixed(fixed)).toFixed(fixed);

  const formatRow = (item, side) => {
    const price = item[0];
    const amount = item[1];
    const total = Number(price) * Number(amount);
    const formattedPrice =
      precision === 10 && price % 10 === 0
        ? formatNumber(price, 0)
        : formatNumber(price, precision);

    const sideType = side === "ask" ? "ask" : "bid";
    const backgroundSize = getSize(item, sideType);

    return {
      key: `${side}-${price}-${amount}`,
      price: formattedPrice,
      amount,
      total:
        precision === 10 && price % 10 === 0
          ? formatNumber(total, 0)
          : formatNumber(total, precision),
      backgroundSize,
      side: sideType,
    };
  };

  const asks =
    (filterType === "both" || filterType === "ask") &&
    orderBook?.asks?.map((item) => formatRow(item, "ask"));

  const bids =
    (filterType === "both" || filterType === "bid") &&
    orderBook?.bids?.map((item) => formatRow(item, "bid"));

  const columns = [
    {
      title: `Price (${quoteAsset})`,
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (value, row) => (
        <div className={row.side === "ask" ? "price" : "price-bids"}>
          {value}
        </div>
      ),
    },
    {
      title: `Amount (${baseAsset})`,
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: (value) => <span>{value}</span>,
    },
  ];

  const dataSource = [...(asks || []), ...(bids || [])];

  return (
    <StyledOrderBookContainer>
      <div className="filters-container">
        <div className="orders-filter">
          <Button
            onClick={() => {
              setFilterType("both");
              setLimit(15);
            }}
            className={filterType === "both" && "active"}
          >
            <img
              src={
                themeValue === "light"
                  ? "/Logo/Icons/orders.svg"
                  : "/Logo/Icons/DarkOrders.svg"
              }
              alt="orders"
            />
          </Button>
          <Button
            onClick={() => {
              setFilterType("bid");
              setLimit(35);
            }}
            className={filterType === "bid" && "active"}
          >
            <img
              src={
                themeValue === "light"
                  ? "/Logo/Icons/ask.svg"
                  : "/Logo/Icons/DarkAsk.svg"
              }
              alt="bids"
            />
          </Button>
          <Button
            onClick={() => {
              setFilterType("ask");
              setLimit(35);
            }}
            className={filterType === "ask" && "active"}
          >
            <img
              src={
                themeValue === "light"
                  ? "/Logo/Icons/bid.svg"
                  : "/Logo/Icons/DarkBid.svg"
              }
              alt="asks"
            />
          </Button>
        </div>
        <div>
          <OrderBookSelect
            baseAsset={baseAsset}
            quoteAsset={`${quoteAsset}`}
            limit={limit}
            ref={orderBookSelectRef}
          />
        </div>
      </div>

      <div className="orders-container">
        <StyledTable
          pagination={false}
          showHeader
          columns={columns}
          dataSource={dataSource}
          style={{ height: "1020px", overflowY: "scroll" }}
          rowClassName={(record) =>
            record.side === "ask" ? "ask-row" : "bid-row"
          }
          rowKey="key"
          rowStyle={(record) => ({
            backgroundImage:
              record.side === "ask"
                ? `linear-gradient(to left, rgba(255, 0, 0, 0.15) ${record.backgroundSize}, transparent 0%)`
                : `linear-gradient(to right, rgba(0, 255, 0, 0.15) ${record.backgroundSize}, transparent 0%)`,
          })}
        />

        {filterType === "both" && hlCoinPriceData?.price && (
          <div className="current-price">
            <CurrencyFormat
              value={hlCoinPriceData?.price}
              displayType="text"
              thousandSeparator={true}
              renderText={(value) => <div>{value}</div>}
            />
          </div>
        )}
      </div>
    </StyledOrderBookContainer>
  );
};

export default OrderBook;

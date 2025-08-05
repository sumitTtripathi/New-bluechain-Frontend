/* eslint-disable */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config, connectSocket } from "../Config";
import { WebsocketEvent } from "../Constants/WebsocketEvents";
import { tradeType } from "../Constants/state";
import { rtkBaseQueryWithEncryption } from "../BaseQuery";

// Define a service using a base URL and expected endpoints

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  tagTypes: ["ORDERS", "WITHDRAW"],
  // baseQuery: fetchBaseQuery({
  //   baseUrl: config.TRANSACTION_BASE_URL,
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
  //     }
  //     return headers;
  //   },
  //   // fetchFn:
  // }),
  baseQuery: rtkBaseQueryWithEncryption,
  endpoints: (builder) => ({
    getCurrentPairWSPrice: builder.query({
      query: ({ symbol }) => {
        return {
          url: `/orders-api/v1/pairs/fetch/single`,
          params: {
            symbol: symbol,
          },
        };
      },
      transform: (response) => {
        return response?.data?.data;
      },
    }),
    getDepositAddress: builder.query({
      query: ({ selectedCurrency }) => {
        return {
          url: `/orders-api/v1/deposit-address`,
          params: {
            ccy: selectedCurrency,
          },
        };
      },
      transformResponse: (response) => {
        return response?.data;
      },
    }),
    getLeverage: builder.query({
      query: (filter) => {
        return {
          url: `/orders-api/v1/get-leverage`,
          params: filter,
        };
      },
      transformResponse: (response) => {
        return response?.data;
      },
      providesTags: ["LEVERAGE"],
    }),
    getLatestExecution: builder.query({
      query: ({ symbol, limit }) => {
        return {
          url: `/orders-api/v1/recent-trades?symbol=${symbol}&limit=${limit}`,
        };
      },
      // Only have one cache entry because the arg always maps to one string
      transformResponse: (response) => {
        return response;
      },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const isPerp = arg?.symbol?.includes(tradeType.swap);
        const socket = connectSocket(
          isPerp ? Config.PERP_WEBSOCKET_BASE_URL : Config.WEBSOCKET_BASE_URL
        );

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const listener = async (event, cData) => {
            const eventData = JSON.parse(event);
            const myData = await cData;

            updateCachedData((draft) => {
              const previous = Array.isArray(myData?.data) ? myData.data : [];
              draft.data = [eventData, ...previous];
            });
          };

          socket.on(`${WebsocketEvent.LATEST_EXECUTION}${arg?.symbol}`, (e) => {
            listener(e, cacheDataLoaded);
          });

          await cacheEntryRemoved;

          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(
            `${WebsocketEvent.LATEST_EXECUTION}${arg?.symbol}`,
            () => {}
          );

          socket.removeAllListeners();
          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
      },
    }),
    getPositionHistory: builder.query({
      query: (filter) => {
        return {
          url: `/orders-api/v1/positions-history`,
          params: filter,
        };
      },
    }),
    getAccountLevel: builder.query({
      query: () => {
        return {
          url: `/orders-api/v1/get-account-level`,
        };
      },
      providesTags: ["ACCOUNTMODE"],
    }),
    getOrderBook: builder.query({
      query: ({ symbol, limit }) => {
        return {
          url: `/orders-api/v1/order-book`,
          params: {
            symbol: symbol,
            // sz: limit,
          },
          // url: `/orders-api/v1/pairs/order-book?symbol=BTC-USDT&sz=${limit}`,
        };
      },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        if (!arg?.symbol) {
          console.error("Symbol is undefined");
          return;
        }

        const isPerp = arg?.symbol?.includes(tradeType.swap);
        const socket = connectSocket(
          isPerp ? Config.PERP_WEBSOCKET_BASE_URL : Config.WEBSOCKET_BASE_URL
        );

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // let myData = cacheDataLoaded?.data
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = async (event, cData) => {
            const eventData = JSON.parse(event);
            // console.log("eventData", eventData)
            const myData = await cData;
            updateCachedData((draft) => {
              const eventAsksArr = eventData?.asks?.filter((item) => {
                return Number(item[1]) !== 0
                  ? item?.map((data) => Number(data))
                  : "";
              });
              // console.log("eventAsksArr", eventAsksArr)
              const eventBidsArr = eventData?.bids?.filter((item) => {
                return Number(item[1]) !== 0
                  ? item?.map((data) => Number(data))
                  : "";
              });

              // console.log("eventAsksArr", eventAsksArr);
              // console.log("eventBidsArr", eventBidsArr);
              if (eventData?.bids && eventData?.asks) {
                const bidsArr = [
                  ...(myData?.bids || []),
                  ...eventBidsArr,
                ].slice(-arg?.limit);
                const asksArr = [
                  ...(myData?.asks || []),
                  ...eventAsksArr,
                ].slice(-arg?.limit);

                bidsArr.sort((a, b) => b[0] - a[0]);
                asksArr.sort((a, b) => b[0] - a[0]);
                draft = {
                  bids: bidsArr,
                  asks: asksArr,
                  decimalLength: myData.decimalLength,
                };
                // console.log("draft", draft)
                return draft;
              }
            });
          };
          socket.on(`order_book@BTCUSDT`, (e) => {
            listener(e, cacheDataLoaded);
          });

          await cacheEntryRemoved;

          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(`${WebsocketEvent.ORDER_BOOK}BTCUSDT`, () => {});
          socket.removeAllListeners();
          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
      },
      transformResponse: (response) => {
        const decimalLength = response?.data?.asks[0]?.[0]
          ?.toString()
          ?.split(".")[1]?.length;

        return {
          ...response?.data,
          asks: response?.data?.asks?.reverse(),
          decimalLength: decimalLength,
        };
      },
    }),
    getOrderBookWithoutSocket: builder.query({
      query: ({ symbol, limit }) => {
        return {
          url: `/orders-api/v1/order-book`,
          params: {
            symbol: symbol,
            // sz: limit,
          },
        };
      },
      transformResponse: (response) => {
        const orderBook =
          Array.isArray(response?.data) && response.data.length > 0
            ? response.data[0]
            : { asks: [], bids: [] };

        const firstAskPrice = orderBook?.asks?.[0]?.[0];

        const decimalLength =
          typeof firstAskPrice === "number" || typeof firstAskPrice === "string"
            ? firstAskPrice.toString().split(".")[1]?.length || 0
            : 0;

        return {
          ...orderBook,
          asks: orderBook.asks?.slice().reverse() || [],
          decimalLength,
        };
      },
    }),
    getOpenPosition: builder.query({
      query: ({ instType }) => {
        return {
          url: `/orders-api/v1/positions`,
          params: { instType: instType },
        };
      },
      providesTags: ["CLOSE_POSITION", "LEVERAGE"],
    }),
    getDepthOrderBook: builder.query({
      query: ({ symbol, limit }) => {
        return {
          url: `/orders-api/v1/order-book`,
          params: {
            symbol: symbol,
            // sz: limit,
          },
        };
      },
      transformResponse: (response) => {
        const askArr =
          response?.data?.asks?.map((askItem) =>
            askItem?.map((innerAsk) => Number(innerAsk))
          ) || [];

        const bidArr =
          response?.data?.bids?.map((bidItem) =>
            bidItem?.map((innerBid) => Number(innerBid))
          ) || [];

        return {
          asks: askArr,
          bids: bidArr,
        };
      },
    }),
    getSpotTradingAllowed: builder.query({
      query: (symbol) => {
        return {
          url: `/orders-api/v1/tx/isSpotTradingAllowed`,
          params: {
            symbol,
          },
        };
      },
    }),

    getAccountInfo: builder.query({
      query: () => {
        return {
          url: `/orders-api/v1/trading-balance`,
        };
      },
      providesTags: ["ORDERS", "WITHDRAW", "CLOSE_POSITION", "LEVERAGE"],
    }),
    getOpenOrders: builder.query({
      query: (params) => {
        return {
          url: `/orders-api/v1/open-orders`,
          params: params,
        };
      },
      providesTags: ["ORDERS"],
    }),
    getAllOrders: builder.query({
      query: (params) => {
        return {
          url: `/orders-api/v1/orders-history`,
          params: params,
        };
      },
      providesTags: ["ORDERS"],
    }),
    getAllFilterOrders: builder.query({
      query: (filters) => {
        const cleanData = Object.entries(filters)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/orders-api/v1/orders-history-archive`,
          params: cleanData,
        };
      },
    }),
    getExecutionHistory: builder.query({
      query: (filters) => {
        const cleanData = Object.entries(filters)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/orders-api/v1/execution-history-archive`,
          params: cleanData,
        };
      },
    }),
    getMaxSize: builder.query({
      query: (filter) => {
        return {
          url: `/orders-api/v1/max-size`,
          params: filter,
        };
      },
      transformResponse: (response) => {
        return response?.data?.[0];
      },
    }),
    getOpenFilterOrders: builder.query({
      query: (filters) => {
        const cleanData = Object.entries(filters)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/orders-api/v1/open-orders-archive`,
          params: cleanData,
        };
      },
      providesTags: ["ORDERS"],
    }),
    getWithdrawOrders: builder.query({
      query: (symbol) => {
        return {
          url: `/orders-api/v1/withdraw-history`,
          params: { symbol },
        };
      },
      providesTags: ["WITHDRAW"],
    }),
    getChartData: builder.query({
      query: ({ symbol, timeZone }) => {
        // const tillTime = new Date()
        return {
          url: `/orders-api/v1/trading-view/history`,
          params: {
            symbol,
            resolution: timeZone,
            from: `1653627551&to=${1684846894}`,
          },
        };
      },
      transformResponse: (response) => {
        const data = response?.t?.map((item, index) => {
          return {
            timestamp: response.t[index],
            volume: response.v[index],
            open: response.o[index],
            high: response.h[index],
            low: response.l[index],
            close: response.c[index],
          };
        });
        return data;
      },
    }),
    placeOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/new-order`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    featurePlaceOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/new-future-order`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    amendOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/amend-order`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    amendAlgoOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/amend-algo-order`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    placeAdvancedOrder: builder.mutation({
      query: (data) => {
        const cleanData = Object.entries(data)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/orders-api/v1/algo-orders`,
          method: "POST",
          body: cleanData,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    withdraw: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/withdraw`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["WITHDRAW"],
    }),
    addCoin: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/pairs/favToken`,
          method: "POST",
          body: data,
        };
      },
    }),
    cancelOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/cancel-order`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    cancelAlgoOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/cancel-algo-orders`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    cancelAdvanceAlgoOrder: builder.mutation({
      query: (data) => {
        return {
          url: `v1/cancel-advance-algo-orders`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["ORDERS", "CLOSE_POSITION"],
    }),
    closePosition: builder.mutation({
      query: (data) => {
        return {
          url: `v1/close-position`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["CLOSE_POSITION"],
    }),
    generateDespositAddress: builder.mutation({
      query: (data) => {
        return {
          url: `/orders-api/v1/generate-deposit-address`,
          method: "POST",
          body: data,
        };
      },
    }),
    getDepositHistory: builder.query({
      query: (filters) => {
        const cleanData = Object.entries(filters)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/orders-api/v1/deposit-history`,
          params: { ...cleanData },
        };
      },
    }),
    getWithdrawHistory: builder.query({
      query: (filters) => {
        const cleanData = Object.entries(filters)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/orders-api/v1/withdraw-history`,
          params: { ...cleanData },
        };
      },
      providesTags: ["WITHDRAW"],
    }),
    getCurrencyInfo: builder.query({
      query: () => {
        return {
          url: `/orders-api/v1/currencies`,
        };
      },
      transformResponse: (response) => {
        return response?.data;
      },
    }),
    getAllAssets: builder.query({
      query: () => {
        return { url: `/orders-api/v1/assets/fetch` };
      },
    }),
    getOrderDistributionChart: builder.query({
      query: (filter) => {
        return {
          url: `/orders-api/v1/orders-distribution-chart`,
          params: {
            filter,
          },
        };
      },
    }),
    accountUpgrade: builder.mutation({
      query: (body) => {
        return {
          url: `/orders-api/v1/set-account-level`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["ACCOUNTMODE"],
    }),
    setLeverage: builder.mutation({
      query: (body) => {
        return {
          url: `/orders-api/v1/set-leverage`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["LEVERAGE"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPositionHistoryQuery,
  useGetLatestExecutionQuery,
  useGetOrderBookQuery,
  useGetDepositAddressQuery,
  useGetSpotTradingAllowedQuery,
  useGetAccountInfoQuery,
  useGetOpenOrdersQuery,
  useGetAllOrdersQuery,
  useGetCurrencyInfoQuery,
  useGetWithdrawOrdersQuery,
  useGetAllAssetsQuery,
  useGetDepositHistoryQuery,
  useGetOpenPositionQuery,
  useGetAllFilterOrdersQuery,
  useGetMaxSizeQuery,
  useGetExecutionHistoryQuery,
  useGetOpenFilterOrdersQuery,
  useGetAccountLevelQuery,
  useGetWithdrawHistoryQuery,
  useGetChartDataQuery,
  useGetLeverageQuery,
  useGetDepthOrderBookQuery,
  useGetOrderDistributionChartQuery,
  useGetCurrentPairWSPriceQuery,
  useGenerateDespositAddressMutation,
  usePlaceOrderMutation,
  useFeaturePlaceOrderMutation,
  useAmendOrderMutation,
  useAmendAlgoOrderMutation,
  usePlaceAdvancedOrderMutation,
  useCancelOrderMutation,
  useCancelAlgoOrderMutation,
  useCancelAdvanceAlgoOrderMutation,
  useAddCoinMutation,
  useGetOrderBookWithoutSocketQuery,
  useWithdrawMutation,
  useClosePositionMutation,
  useAccountUpgradeMutation,
  useSetLeverageMutation,
} = transactionApi;

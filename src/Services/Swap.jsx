/*eslint-disable*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config, connectSocket } from "../Config";
import { WebsocketEvent } from "../Constants/WebsocketEvents";
import { tradeType } from "../Constants/state";
import { current } from "@reduxjs/toolkit";
import { rtkBaseQueryWithEncryption } from "../BaseQuery";

// Define a service using a base URL and expected endpoints

export const swapApi = createApi({
  reducerPath: "swapApi", 
  tagTypes: ["TOKENS"],
  baseQuery: rtkBaseQueryWithEncryption,

  endpoints: (builder) => ({
    getPriceChange: builder.query({
      query: (id) => {
        return {
          url: `/swap-market-api/v1/fetch/price-change`,
          params: { symbol: id },
        };
      },
    }),
    getCoinDetailsData: builder.query({
      query: (id) => {
        return {
          url: `/swap-market-api/v1/fetch/coin-details`,
          params: {
            symbol: id,
          },
        };
      },
      providesTags: ["TOKENS"],
    }),
    getCoinDetailsChartData: builder.query({
      query: (params) => {
        return {
          url: `/swap-market-api/v1/fetch/chart-data`,
          params: {
            symbol: params?.symbol,
            filter: params?.filter,
          },
        };
      },
      transformResponse: (response) => {
        const updatedResponse = response?.data?.map((item) => {
          return [item?.timestamp, Number(item?.value)];
        });

        return updatedResponse;
      },
    }),
    getContractValue: builder.query({
      query: (filter) => {
        return {
          url: `swap-market-api/v1/fetch/instruments`,
          params: filter,
        };
      },
      transformResponse: (response) => {
        return response?.data;
      },
    }),
    getCoinList: builder.query({
      query: (filters) => {
        return {
          url: `/swap-market-api/v1/fetch/coin-list`,
          params: {
            page: filters?.currentPage,
            sort: filters?.sort,
            sortType: filters?.sortOrder,
          },
        };
      },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        try {
          const socket = connectSocket(Config.PERP_WEBSOCKET_BASE_URL);
          // wait for the initial query to resolve before proceeding
          const cacheData = await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = JSON.parse(event);
            updateCachedData((draft) => {
              if (data?.[0]?.instId?.includes("-USDT")) {
                draft = {
                  ...draft,
                  data: {
                    ...draft.data,
                    data: draft?.data?.data?.map((item) => {
                      if (`${item?.symbol}USDT` === data?.[0]?.instId) {
                        return {
                          ...item,
                          value: data?.[0]?.last,
                          price: data?.[0]?.last,
                          percentChange24hrs:
                            ((data?.[0]?.last - data?.[0]?.open24h) /
                              data?.[0]?.open24h) *
                            100,
                        };
                      } else {
                        return item;
                      }
                    }),
                  },
                };
              }
              return draft;
            });
          };

          cacheData?.data?.data?.data?.map((item) => {
            socket.on(
              `${WebsocketEvent.TICKERS}@${item?.symbol}USDT`,
              listener
            );
          });

          await cacheEntryRemoved;
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.disconnect();
          socket.close();
          socket.off();
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
    getAllCoinsSpot: builder.query({
      query: ({ filter, page, limit, email }) => {
        return {
          url: `/swap-market-api/v1/fetch/tv-coins-list`,
          params: {
            quote_asset: filter,
            page: page,
            limit: limit,
            email,
          },
        };
      },
      providesTags: ["TOKENS"],

      // Only have one cache entry because the arg always maps to one string
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // // Always merge incoming data to the cache entry
      // merge: (currentCache, newItems, { arg }) => {
      //   const { page } = arg;
      //   if (page > 1) {
      //     currentCache.data.data.push(...newItems.data.data);
      //   } else {
      //     currentCache.data.data = newItems.data.data;
      //   }
      // },
      // // Refetch when the page arg changes
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        try {
          const socket = connectSocket(Config.PERP_WEBSOCKET_BASE_URL);
          // wait for the initial query to resolve before proceeding
          const cacheData = await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = async (event) => {
            const socketData = JSON.parse(event);
            const { s: symbolRaw, c: lastPrice, o: openPrice } = socketData[0];

            // if (!symbolRaw || !lastPrice || !openPrice) return;

            const baseAsset = symbolRaw.replace(arg.filter, "");
            const symbol = `${baseAsset}/${arg.filter}`;

            updateCachedData((draft) => {
              draft = {
                ...draft,
                data: {
                  ...draft?.data,
                  data: draft?.data?.data?.map((item) => {
                    if (item.symbol === symbol) {
                      return {
                        ...item,
                        price: parseFloat(lastPrice),
                        percentChange24hrs:
                          ((parseFloat(lastPrice) - parseFloat(openPrice)) /
                            parseFloat(openPrice)) *
                          100,
                      };
                    } else {
                      return current(item);
                    }
                  }),
                },
              };
              return draft;
            });
          };
          cacheData?.data?.data?.data?.forEach((coin) => {
            const baseAsset = coin.symbol.split("/")[0];
            const socketKey = `${WebsocketEvent.TICKERS}@${baseAsset}${arg.filter}`;
            socket.on(socketKey, listener);
          });

          await cacheEntryRemoved;
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.disconnect();
          socket.close();
          socket.off();
          socket.removeAllListeners();
          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch {
          //     // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          //     // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
      },
    }),
    getMarketCards: builder.query({
      enabled: false,
      query: () => {
        return {
          url: `/swap-market-api/v1/fetch/market-cards`,
        };
      },
    }),
    getHighLowPrice: builder.query({
      query: ({ id, filter }) => {
        return {
          url: `/swap-market-api/v1/fetch/tv-bar`,
          params: {
            base_asset: id,
            quote_asset: filter,
          },
        };
      },
      transformResponse: (response) => {
        return response?.data;
      },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          const socket = connectSocket(Config.PERP_WEBSOCKET_BASE_URL);
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = JSON.parse(event);
            updateCachedData((draft) => {
              draft.price = parseFloat(data[0]?.c);
              draft.percentChange24hrs = parseFloat(data[0]?.P);
              draft.vol24h = parseFloat(data[0]?.v);
              draft.high24h = parseFloat(data[0]?.h);
              draft.low24h = parseFloat(data[0]?.l);
            });
          };

          socket.on(
            `${WebsocketEvent.TICKERS}@${arg?.id}${arg?.filter}`,
            listener
          );

          await cacheEntryRemoved;
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(
            `${WebsocketEvent.TICKERS}@${arg?.id}-${arg?.filter}`,
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
    getHighLowPriceWS: builder.query({
      query: ({ base_asset, quote_asset }) => {
        return {
          url: `/swap-market-api/v1/fetch/tv-bar`,
          params: {
            base_asset,
            quote_asset,
          },
        };
      },
      transformResponse: (response) => {
        return response?.data;
      },
    }),
    getPriceDistributionChartData: builder.query({
      query: (filter) => {
        return {
          url: `/swap-market-api/v1/fetch/pd-chart-data`,
          params: {
            filter: filter,
          },
        };
      },
    }),
    getMarketOverviewCards: builder.query({
      query: () => {
        return {
          url: `/swap-market-api/v1/fetch/market-overview-cards`,
        };
      },
    }),

    getMarketUp: builder.query({
      query: () => {
        return {
          url: `/swap-market-api/v1/fetch/tmc`,
        };
      },
    }),
    getChartData: builder.query({
      query: (params) => {
        return {
          url: `/swap-market-api/v1/fetch/chart-data`,
          params: {
            symbol: `${params?.symbol}`,
            filter: params?.filter,
          },
        };
      },
      transformResponse: (response) => {
        const timestamp = response?.data?.map((item) => {
          return item?.timestamp;
        });
        const data = response?.data?.map((item) => {
          return item?.value;
        });
        return { timestamp, data };
      },
    }),
    getCurrentPrice: builder.query({
      query: (id) => {
        return {
          url: `/swap-market-api/v1/fetch/current-price`,
          params: {
            symbol: id,
          },
        };
      },
    }),
    getSearchMarketData: builder.query({
      query: (search) => {
        return {
          url: `/swap-market-api/v1/fetch/search`,
          params: search,
        };
      },
      transformResponse: (response) => {
        const updatedResponse = response?.data?.map((item) => {
          return { ...item, label: item?.base_asset, value: item?.base_asset };
        });
        return updatedResponse;
      },
    }),
    incrementSearch: builder.mutation({
      query: (symbol) => {
        return {
          method: "PUT",
          url: `/swap-market-api/v1/inc-searches`,
          params: {
            symbol,
          },
        };
      },
    }),
    getCandleStick: builder.query({
      query: (filter) => {
        const cleanData = Object.entries(filter)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/swap-market-api/v1/fetch/tv-chart`,
          params: cleanData,
        };
      },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = connectSocket(Config.CANDLE_STICK_URL);

        try {
          // wait for the initial query to resolve before proceeding
          const cachedData = await cacheDataLoaded;
          // let myData = cacheDataLoaded?.data
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = async (event, cData) => {
            const data = JSON.parse(event);
            const mData = {
              timestamp: +data["T"],
              open: +data["o"],
              high: +data["h"],
              low: +data["l"],
              close: +data["c"],
              volume: Math.ceil(+data["v"]),
            };
            // updateCachedData(() => {
            //   const newData = { data: [...cData.data.data, mData], updated: true };
            //   return newData;
            // });
            updateCachedData((draft) => {
              const lastIndex = draft.data.length - 1;
              const lastCandle = draft.data[lastIndex];

              if (lastCandle && lastCandle.timestamp === mData.timestamp) {
                draft.data[lastIndex] = mData;
              } else if (lastCandle && mData.timestamp > lastCandle.timestamp) {
                draft.data.push(mData);
              }

              draft.updated = true;
            });
          };
          socket.on(
            `${WebsocketEvent.CANDLE}${arg?.symbol.toLowerCase()}@kline_${
              arg?.resolution
            }`,
            (e) => {
              listener(e, cachedData);
            }
          );

          await cacheEntryRemoved;

          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(
            `${WebsocketEvent.CANDLE}${arg?.symbol}@candle${arg?.resolution}`,
            () => {}
          );
          socket.removeAllListeners();
          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch {
          console.log("enter in catch");
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
      },
      transformResponse: (response) => {
        const mydata = response?.data?.map((item) => {
          return {
            timestamp: +item[0],
            open: +item[1],
            high: +item[2],
            low: +item[3],
            close: +item[4],
            volume: Math.ceil(+item[5]),
          };
        });
        return { data: mydata, updated: false };
      },
    }),
    getCandleStickMore: builder.query({
      query: (filter) => {
        const cleanData = Object.entries(filter)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          url: `/swap-market-api/v1/fetch/tv-chart`,
          params: cleanData,
        };
      },
      transformResponse: (response) => {
        const mydata = response?.data?.map((item) => {
          return {
            timestamp: +item["time"],
            open: +item["open"],
            high: +item["high"],
            low: +item["low"],
            close: +item["close"],
            volume: Math.ceil(+item["volume"]),
          };
        });
        return mydata;
      },
    }),
    getMarkPrice: builder.query({
      query: (filter) => {
        return {
          url: `swap-market-api/v1/fetch/mark-price`,
          params: filter,
        };
      },
      transformResponse: (response) => {
        return response;
      },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        try {
          const socket = connectSocket(Config.PERP_WEBSOCKET_BASE_URL);
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = JSON.parse(event);
            updateCachedData(() => {
              return { data: data?.[0] };
            });
          };

          socket.on(`${WebsocketEvent.MARKPRICE}${arg?.instId}`, listener);

          await cacheEntryRemoved;
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(`${WebsocketEvent.ORDER_BOOK}${arg?.symbol}`, () => {});
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
    setFavToken: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/swap-market-api/v1/set/favToken`,
          body: data,
        };
      },
      invalidatesTags: ["TOKENS"],
    }),
    getFavTokens: builder.query({
      query: (email) => {
        return {
          url: `/swap-market-api/v1/fetch/favTokens`,
          params: {
            email,
          },
        };
      },
      providesTags: ["TOKENS"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPriceChangeQuery,
  useGetCoinDetailsDataQuery,
  useGetMarketUpQuery,
  useGetFavTokensQuery,
  useGetAllCoinsSpotQuery,
  useSetFavTokenMutation,
  useGetSearchMarketDataQuery,
  useGetCandleStickMoreQuery,
  useGetCandleStickQuery,
  useGetCoinDetailsChartDataQuery,
  useGetMarketOverviewCardsQuery,
  useGetHighLowPriceQuery,
  useGetMarkPriceQuery,
  useGetHighLowPriceWSQuery,
  useGetCoinListQuery,
  useGetChartDataQuery,
  useGetContractValueQuery,
  useGetCurrentPriceQuery,
  useGetMarketCardsQuery,
  useIncrementSearchMutation,
  useGetPriceDistributionChartDataQuery,
} = swapApi;

/*eslint-disable*/
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config, connectSocket } from "../Config";
import { WebsocketEvent } from "../Constants/WebsocketEvents";
import { current } from "@reduxjs/toolkit";
import { rtkBaseQueryWithEncryption } from "../BaseQuery";

// Define a service using a base URL and expected endpoints
// const socket = connectSocket(config.WEBSOCKET_BASE_URL);
// const socket = connectSocket(Configonfig.WEBSOCKET_BASE_URL, {
//   transports: ["websocket"],
// });
const socket = connectSocket(Config.WEBSOCKET_BASE_URL, {
  transports: ["websocket"],
});
export const marketApi = createApi({
  reducerPath: "marketApi",
  tagTypes: ["TOKENS"],
  baseQuery: rtkBaseQueryWithEncryption,
  endpoints: (builder) => ({
    getPriceChange: builder.query({
      query: (id) => {
        return {
          url: `/market-api/v1/fetch/price-change`,
          params: { symbol: id },
        };
      },
    }),
    getCoinDetailsData: builder.query({
      query: (id) => {
        return {
          url: `/market-api/v1/fetch/coin-details`,
          params: {
            symbol: id,
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
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = JSON.parse(event);
            console.log("data11111", data)
            updateCachedData((draft) => {
              draft = {
                ...draft,
                data: {
                  ...draft?.data,
                  cl: {
                    ...draft?.data?.cl,
                    current_price: data?.c,
                  },
                },
              };
              return draft;
            });
          };

          socket.on(WebsocketEvent.SINGLE_COIN_CURRENT_PRICE(arg), listener);
          // cacheEntryRemoved will resolve when the cache subscription is no longer active
          await cacheEntryRemoved;
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(WebsocketEvent.SINGLE_COIN_CURRENT_PRICE(arg), () => {});
          socket.removeAllListeners();
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
      },
    }),
    getCoinDetailsChartData: builder.query({
      query: (params) => {
        return {
          url: `market-api/v1/fetch/chart-data`,
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
    getCoinList: builder.query({
      query: (filters) => {
        return {
          url: `/market-api/v1/fetch/coin-list`,
          params: {
            page: filters?.currentPage,
            sort: filters?.sort,
            sortType: filters?.sortOrder,
            quote_asset: filters?.quote_asset,
            email: filters?.email,
          },
        };
      },
      keepUnusedDataFor: 1,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // 1. Connect WebSocket
          const socket = connectSocket(Config.WEBSOCKET_BASE_URL);
          const cacheData = await cacheDataLoaded;

          // 2. Define WebSocket message listener
          const listener = (event) => {
            const data = JSON.parse(event);

            updateCachedData((draft) => {
              if (data?.s?.includes("USDT")) {
                draft.data.data = draft?.data?.data?.map((item) => {
                  if (`${item?.symbol}USDT` === data?.s) {
                    // ✅ FIXED: Use correct fields from WebSocket payload
                    const openPrice = parseFloat(data?.o); // Open price 24hrs ago
                    const closePrice = parseFloat(data?.c); // Last close price
                    const percentChange24hrs = !isNaN(data?.P)
                      ? parseFloat(data.P)
                      : !isNaN(openPrice) &&
                        openPrice !== 0 &&
                        !isNaN(closePrice)
                      ? ((closePrice - openPrice) / openPrice) * 100
                      : 0;

                    return {
                      ...item,
                      value: closePrice,
                      price: closePrice,
                      percentChange24hrs,
                    };
                  }
                  return item;
                });
              }
              return draft;
            });
          };

          // 3. Register listeners for all coins in cache
          cacheData?.data?.data?.data?.forEach((item) => {
            const eventName = `${WebsocketEvent.TICKERS}@${item?.symbol}USDT`;
            socket.on(eventName, listener);
          });

          // 4. Cleanup on unsubscribe
          await cacheEntryRemoved;
          socket.disconnect();
          socket.close();
          socket.off();
          socket.removeAllListeners();

          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch (error) {
          console.error("WebSocket error or cache entry removed early", error);
        }
      },
    }),

    getAllCoinsSpot: builder.query({
      query: ({ filter, page, limit, email }) => {
        return {
          url: `/market-api/v1/fetch/tv-coins-list`,
          params: {
            quote_asset: filter,
            page: page,
            limit: limit,
            email,
          },
        };
      },

      // Only have one cache entry because the arg always maps to one string
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // Always merge incoming data to the cache entry
      // merge: (currentCache, newItems, { arg }) => {
      //   const { page } = arg;
      //   if (page > 1) {
      //     currentCache.data.data.push(...newItems.data.data);
      //   } else {
      //     currentCache.data.data = newItems.data.data;
      //   }
      // },
      // Refetch when the page arg changes
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
          // wait for the initial query to resolve before proceeding
          const cacheData = await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = async (event) => {
            const socketData = JSON.parse(event);
            const { s: symbolRaw, c: lastPrice, o: openPrice } = socketData;

            // if (!symbolRaw || !lastPrice || !openPrice) return;

            const baseAsset = symbolRaw.replace(arg.filter, "");
            const symbol = `${baseAsset}/${arg.filter}`;

            updateCachedData((draft) => {
              // if (!draft?.data) return;
              // draft.data = draft.data.map((coin) => {
              //   if (coin.symbol === symbol) {
              //     return {
              //       ...coin,
              //       price: parseFloat(lastPrice),
              //       percentChange24hrs:
              //         ((parseFloat(lastPrice) - parseFloat(openPrice)) /
              //           parseFloat(openPrice)) *
              //         100,
              //     };
              //   }
              //   return coin;
              // });
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

          // cacheEntryRemoved will resolve when the cache subscription is no longer active
          await cacheEntryRemoved;
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(WebsocketEvent.SINGLE_COIN_CURRENT_PRICE(arg), () => {});
          socket.removeAllListeners();
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch {
          //     // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          //     // in which case `cacheDataLoaded` will throw
        }
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
          url: `/market-api/v1/fetch/tv-chart`,
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
            timestamp: +item["time"],
            open: +item["open"],
            high: +item["high"],
            low: +item["low"],
            close: +item["close"],
            volume: Math.ceil(+item["volume"]),
          };
        });
        return { data: mydata.reverse(), updated: false };
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
          url: `/market-api/v1/fetch/tv-chart`,
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
    getMarketCards: builder.query({
      enabled: false,
      query: () => {
        return {
          url: `market-api/v1/fetch/market-cards`,
        };
      },
    }),
    getHighLowPrice: builder.query({
      query: ({ id, filter }) => {
        return {
          url: `/market-api/v1/fetch/tv-bar`,
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
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = JSON.parse(event);
            console.log("data", data)
            updateCachedData((draft) => {
              draft.price = parseFloat(data?.c);
              draft.percentChange24hrs = parseFloat(data?.P);
              draft.vol24h = parseFloat(data?.v);
              draft.high24h = parseFloat(data?.h);
              draft.low24h = parseFloat(data?.l);
            });
          };

          // socket.on(
          //   `${WebsocketEvent.TICKERS}@${arg?.id}-${arg?.filter}`,
          //   listener
          // );
          socket.on(
            `${WebsocketEvent.TICKERS}@${arg?.id}${arg?.filter}`,
            listener
          );
          // cacheEntryRemoved will resolve when the cache subscription is no longer active
          await cacheEntryRemoved;
          socket.disconnect();
          socket.close();
          socket.off();
          socket.off(
            `${WebsocketEvent.TICKERS}@${arg?.id}-${arg?.filter}`,
            () => {}
          );
          socket.removeAllListeners();
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          socket.on("disconnect", () => {
            socket.disconnect();
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // const socket = connectSocket(config.CANDLE_STICK_URL);
        // try {
        //   await cacheDataLoaded;

        //   const listener = (event) => {
        //     const data = JSON.parse(event);
        //     console.log("data", data)
        //     updateCachedData((draft) => {
        //       draft.price = parseFloat(data?.c);
        //       draft.percentChange24hrs = parseFloat(data?.P || 0); 
        //       draft.vol24h = Math.ceil(parseFloat(data?.v));
        //       draft.high24h = parseFloat(data?.h);
        //       draft.low24h = parseFloat(data?.l);
        //     });
        //   };

        //   console.log("arg", arg)

        //   const topic = `${
        //     WebsocketEvent.CANDLE
        //   }${`${arg?.id}${arg?.filter}`}@kline_1m`;
        //   socket.on(topic, listener);

        //   console.log("topic", topic)

        //   await cacheEntryRemoved;

        //   socket.off(topic, listener);
        //   socket.removeAllListeners();
        //   socket.close();
        // } catch (err) {
        //   console.log("Error in getHighLowPrice socket listener", err);
        // }
      },
    }),
    getHighLowPriceWS: builder.query({
      query: ({ base_asset, quote_asset }) => {
        return {
          url: `/market-api/v1/fetch/tv-bar`,
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
          url: `/market-api/v1/fetch/pd-chart-data`,
          params: {
            filter: filter,
          },
        };
      },
    }),
    getMarketOverviewCards: builder.query({
      query: () => {
        return {
          url: `/market-api/v1/fetch/market-overview-cards`,
        };
      },
    }),

    getMarketUp: builder.query({
      query: () => {
        return {
          url: `/market-api/v1/fetch/tmc`,
        };
      },
    }),
    getChartData: builder.query({
      query: (params) => {
        return {
          url: `/market-api/v1/fetch/chart-data`,
          params: {
            symbol: `${params?.symbol}`,
            filter: params?.filter,
          },
        };
      },
    }),
    getCurrentPrice: builder.query({
      query: (id) => {
        return {
          url: `/market-api/v1/fetch/current-price`,
          params: {
            symbol: id,
          },
        };
      },
    }),
    getSearchMarketData: builder.query({
      query: (search) => {
        return {
          url: `market-api/v1/fetch/search`,
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
          url: `/market-api/v1/inc-searches`,
          params: {
            symbol,
          },
        };
      },
    }),
    setFavToken: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/market-api/v1/set/favToken`,
          body: data,
        };
      },
      invalidatesTags: ["TOKENS"],
    }),
    getFavTokens: builder.query({
      query: (email) => {
        return {
          url: `/market-api/v1/fetch/favTokens`,
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
  useGetCoinDetailsChartDataQuery,
  useGetCandleStickMoreQuery,
  useGetCandleStickQuery,
  useGetMarketOverviewCardsQuery,
  useGetHighLowPriceQuery,
  useGetHighLowPriceWSQuery,
  useGetCoinListQuery,
  useGetChartDataQuery,
  useGetCurrentPriceQuery,
  useGetMarketCardsQuery,
  useIncrementSearchMutation,
  useGetPriceDistributionChartDataQuery,
} = marketApi;

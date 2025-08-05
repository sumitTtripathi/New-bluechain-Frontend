import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config, connectSocket } from "../Config";
// import { WebsocketEvent } from "../Constants/WebsocketEvent";

// Define a service using a base URL and expected endpoints

export const botApi = createApi({
  reducerPath: "botApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.BOT_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      }
      return headers;
    },
  }),
  tagTypes: ["STOP", "MUTATE", "INSTANT", "CREATE_BOT", "CANCEL_BOT"],

  endpoints: (builder) => ({
    createBot: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/bots-api/v1/create-grid-bot`,
          body: data,
        };
      },
      invalidatesTags: ["CREATE_BOT"],
    }),
    aiCard: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/bots-api/v1/get-ai-param`,
        };
      },
    }),
    openBotOrders: builder.query({
      query: (params) => {
        return {
          method: "GET",
          url: `/bots-api/v1/open-grid-orders`,
          params: { ...params },
        };
      },
    }),
    getAIParam: builder.query({
      query: (params) => {
        return {
          method: "GET",
          url: `bots-api/v1/get-ai-param`,
          params: { ...params },
        };
      },
    }),
    stopOrder: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `bots-api/v1/stop-grid-bot`,
          body: data,
        };
      },
      invalidatesTags: ["STOP"],
    }),
    botFilterOrders: builder.query({
      query: (params) => {
        const alteredUrl =
          params?.selectedFilter == "Ongoing"
            ? `/bots-api/v1/open-grid-orders`
            : `bots-api/v1/grid-order-history`;
        return {
          method: "GET",
          url: alteredUrl,
          params: { algoOrdType: params?.algoOrdType },
        };
      },
      providesTags: ["STOP", "MUTATE", "INSTANT", "CREATE_BOT"],
    }),

    amendGridBot: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/bots-api/v1/amend-grid-bot",
          body: data,
        };
      },
      invalidatesTags: ["MUTATE"],
    }),
    orderDetails: builder.query({
      query: (param) => {
        return {
          method: "GET",
          url: "/bots-api/v1/grid-order-details",
          params: param,
        };
      },
      providesTags: ["STOP", "MUTATE", "INSTANT", "CANCEL_BOT"],
      // keepUnusedDataFor: 1,
      // async onCacheEntryAdded(
      //   arg,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   const socket = connectSocket(config.BOT_WEBSOCKET_BASE_URL);

      //   try {
      //     // wait for the initial query to resolve before proceeding
      //     await cacheDataLoaded;
      //     const listener = async (event, cData) => {
      //       const eventData = JSON.parse(event);
      //       const alogoId = eventData?.data?.data?.[0]?.algoId;
      //       const myData = await cData;
      //       if (String(alogoId) === String(myData?.result?.data?.[0]?.algoId)) {
      //         updateCachedData((draft) => {
      //           draft = { ...draft, data: [eventData, ...myData.data.data] };
      //           return draft;
      //         });
      //       }
      //     };
      //     socket.on(`${WebsocketEvent.botSocketData}`, (e) => {
      //       listener(e, cacheDataLoaded);
      //     });

      //     await cacheEntryRemoved;

      //     // perform cleanup steps once the `cacheEntryRemoved` promise resolves
      //     socket.disconnect();
      //     socket.close();
      //     socket.off();
      //     socket.off(`${WebsocketEvent.botSocketData}`, () => {});

      //     socket.removeAllListeners();
      //     socket.on("disconnect", () => {
      //       socket.disconnect();
      //     });
      //   } catch {
      //     // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
      //     // in which case `cacheDataLoaded` will throw
      //   }
      //   // cacheEntryRemoved will resolve when the cache subscription is no longer active
      // },
    }),
    getSubOrder: builder.query({
      query: (param) => {
        return {
          method: "GET",
          url: "/bots-api/v1/grid-sub-orders",
          params: param,
        };
      },
      transformResponse: (response) => {
        const buyArr = response?.result?.data?.filter((item) =>
          item?.side === "buy" ? item : ""
        );
        buyArr.sort((a, b) => b.px - a.px);
        const sellArr = response?.result?.data?.filter((item) =>
          item?.side === "sell" ? item : ""
        );
        sellArr.sort((a, b) => a.px - b.px);
        return {
          buy: buyArr,
          sell: sellArr,
          buyCount: buyArr?.length,
          sellCount: sellArr?.length,
        };
      },
    }),
    getFilledSubOrder: builder.query({
      query: (param) => {
        return {
          method: "GET",
          url: "/bots-api/v1/grid-sub-orders",
          params: param,
        };
      },
    }),
    instantOrderPlace: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/bots-api/v1/instant-trigger",
          body: data,
        };
      },
      invalidatesTags: ["INSTANT"],
    }),
    contractGridPositions: builder.query({
      query: (param) => {
        return {
          method: "GET",
          url: "/bots-api/v1/grid-positions",
          params: param,
        };
      },
      providesTags: ["CANCEL_BOT"],
    }),
    cancelBot: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/bots-api/v1/grid-close-position",
          body: data,
        };
      },
      invalidatesTags: ["CANCEL_BOT"],
    }),
    botOrderHistory: builder.query({
      query: (param) => {
        const cleanData = Object.entries(param)
          .filter(([key, value]) => value !== "")
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        return {
          method: "GET",
          url: "bots-api/v1/grid-order-history-archive",
          params: cleanData,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateBotMutation,
  useAiCardQuery,
  useOpenBotOrdersQuery,
  useGetAIParamQuery,
  useStopOrderMutation,
  useBotFilterOrdersQuery,
  useGetSubOrderQuery,
  useAmendGridBotMutation,
  useOrderDetailsQuery,
  useContractGridPositionsQuery,
  useCancelBotMutation,
  useInstantOrderPlaceMutation,
  useBotOrderHistoryQuery,
  useGetFilledSubOrderQuery,
} = botApi;

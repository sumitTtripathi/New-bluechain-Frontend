import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Config } from "../Config";

// Define a service using a base URL and expected endpoints
export const ipApi = createApi({
  reducerPath: "ipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.IP_API,
  }),
  endpoints: (builder) => ({
    getIp: builder.query({
      query: () => {
        return {
          url: ``,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetIpQuery, useGetIpQuery } = ipApi;

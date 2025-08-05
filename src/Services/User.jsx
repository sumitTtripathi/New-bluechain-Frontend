import { createApi } from "@reduxjs/toolkit/query/react";
import { rtkBaseQuery, rtkBaseQueryWithEncryption } from "../BaseQuery";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: rtkBaseQueryWithEncryption,
  endpoints: (builder) => ({
    getLoginHistory: builder.query({
      query: () => {
        return {
          url: `/um-api/v1/user/loginHistory`,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLoginHistoryQuery } = userApi;

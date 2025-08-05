import { createApi } from "@reduxjs/toolkit/query/react";
import { rtkBaseQuery } from "../BaseQuery";

// Define a service using a base URL and expected endpoints
export const geetestApi = createApi({
  reducerPath: "geetestApi",
  baseQuery: rtkBaseQuery,
  endpoints: (builder) => ({
    getGeetestVerification: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/geetest/verify`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGeetestVerificationMutation } = geetestApi;

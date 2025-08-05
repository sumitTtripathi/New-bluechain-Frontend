import { createApi } from "@reduxjs/toolkit/query/react";
import { rtkBaseQueryWithEncryption } from "../BaseQuery";
import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    user: {},
    token: "",
    themeValue: "",
  },
  reducers: {
   setToken: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
      };
    },
    setThemeValue: (state, action) => {
      return {
        ...state,
        themeValue: action.payload,
      };
    },

    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
      };
    },
    setCreatBotResponse: (state, action) => {
      return {
        ...state,
        creatBotResponse: action.payload,
      };
    },
    setParentDrawer: (state, action) => {
      return {
        ...state,
        parentDrawer: action.payload,
      };
    },
    setChildrenDrawer: (state, action) => {
      return {
        ...state,
        childrenDrawer: action.payload,
      };
    },
    setPerpAmountDropdown: (state, action) => {
      return {
        ...state,
        perpAmountDropdown: action.payload,
      };
    },
    setSelectedTab: (state, action) => {
      return {
        ...state,
        selectedTab: action.payload,
      };
    },
    setBotOptions: (state, action) => {
      return {
        ...state,
        botOptions: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setToken,
  setUser,
  setParentDrawer,
  setChildrenDrawer,
  setPerpAmountDropdown,
  setSelectedTab,
  setBotOptions,
  setThemeValue,
} = globalSlice.actions;
export default globalSlice.reducer;

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: rtkBaseQueryWithEncryption,
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/auth/pre-login`,
          method: "POST",
          body: data,
        };
      },
    }),
    postLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/auth/login`,
          method: "POST",
          body: data,
        };
      },
    }),
    validateLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/2fa/validate2fa`,
          method: "POST",
          body: data,
        };
      },
    }),
    signup: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/auth/signup`,
          method: "POST",
          body: data,
        };
      },
    }),
    getUser: builder.query({
      providesTags: ["USER"],
      query: () => {
        return {
          url: `/um-api/v1/user/details`,
        };
      },
    }),
    freezeAccount: builder.mutation({
      query: (email) => {
        return {
          url: `/um-api/v1/user/toggle-freeze`,
          method: "PUT",
          body: { email },
        };
      },
      invalidatesTags: ["USER"],
    }),
    logout: builder.mutation({
      invalidatesTags: ["USER"],
      query: (ip) => {
        return {
          method: "POST",
          url: `/um-api/v1/user/logout`,
          body: {
            ip,
          },
        };
      },
    }),
    emailVerification: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/otp/email-verification`,
          method: "PUT",
          body: data,
        };
      },
    }),
    sendPhoneOtp: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/otp/send-message`,
          method: "POST",
          body: data,
        };
      },
    }),
    verifyPhoneOtp: builder.mutation({
      invalidatesTags: ["USER"],
      query: (data) => {
        return {
          url: `/um-api/v1/otp/phone-verification`,
          method: "PUT",
          body: data,
        };
      },
    }),
    setup2fa: builder.query({
      query: () => {
        return {
          url: `/um-api/v1/2fa/setup2fa`,
        };
      },
    }),
    verify2fa: builder.mutation({
      invalidatesTags: ["USER"],
      query: (data) => {
        return {
          method: "PUT",
          body: data,
          url: `/um-api/v1/2fa/verify2fa`,
        };
      },
    }),
    disable2fa: builder.mutation({
      invalidatesTags: ["USER"],
      query: (data) => {
        return {
          method: "POST",
          body: data,
          url: `/um-api/v1/2fa/disable2fa`,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: `/um-api/v1/auth/forgot-password`,
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: `/um-api/v1/user/reset-password`,
          body: data,
        };
      },
    }),
    resendEmailOtp: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/auth/sendEmailOtp`,
          method: "POST",
          body: data,
        };
      },
    }),
    verifyEmailOtp: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/otp/email-verification`,
          method: "PUT",
          body: data,
        };
      },
    }),
    signUpEmailVerification: builder.mutation({
      query: (data) => {
        return {
          url: `/um-api/v1/otp/signup-email-verification`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useSignupMutation,
  useResendEmailOtpMutation,
  useEmailVerificationMutation,
  useGetUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyPhoneOtpMutation,
  useSendPhoneOtpMutation,
  useFreezeAccountMutation,
  useLazySetup2faQuery,
  useDisable2faMutation,
  useVerify2faMutation,
  usePostLoginMutation,
  useValidateLoginMutation,
  useVerifyEmailOtpMutation,
  useSignUpEmailVerificationMutation
} = authApi;

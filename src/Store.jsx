import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { geetestApi } from "./Services/Geetest";
import globalReducer, { authApi, setToken, setUser } from "./Services/Auth";
import { ipApi } from "./Services/Ip";
import { userApi } from "./Services/User";
import { marketApi } from "./Services/Market";
import { swapApi } from "./Services/Swap";
import { transactionApi } from "./Services/Transaction";
import { botApi } from "./Services/Bot";
import axios from "axios";
import {Config} from "./Config";
import { toast } from "react-toastify";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => async (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  try {
    if (isRejectedWithValue(action)) {
      if (action.payload?.data?.message === "jwt expired") {
        const ipResponse = await axios.get(Config.IP_API);
        await axios.post(`${Config.BASE_URL}um-api/v1/user/logout`, {
          ip: ipResponse?.data?.query,
          email: JSON.parse(localStorage.getItem("email")),
        });
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        api.dispatch(setToken({ token: "" }));
        api.dispatch(setUser({ user: {} }));
      }
    }
  } catch (err) {
    toast.error(err?.data?.message);
  }

  return next(action);
};
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [geetestApi.reducerPath]: geetestApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ipApi.reducerPath]: ipApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // [chartApi.reducerPath]: chartApi.reducer,
    [marketApi.reducerPath]: marketApi.reducer,
    [swapApi.reducerPath]: swapApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [botApi.reducerPath]: botApi.reducer,
    global: globalReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(geetestApi.middleware)
      .concat(authApi.middleware)
      .concat(ipApi.middleware)
      .concat(userApi.middleware)
      .concat(marketApi.middleware)
      .concat(swapApi.middleware)
      .concat(transactionApi.middleware)
      .concat(botApi.middleware)
      .concat(rtkQueryErrorLogger),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

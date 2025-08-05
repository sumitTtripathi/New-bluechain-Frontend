import { AppLogo } from "./Assets/Svg/Applogo";
import Globe from "./Assets/Svg/globe.svg";
import { io } from "socket.io-client";

export const Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_LOGO: (props) => <AppLogo {...props} />,
  LOGIN_LOGO: Globe,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  GEETEST_KEY: import.meta.env.VITE_GEETEST_KEY,
  IP_API: import.meta.env.VITE_IP_API,
  TRANSACTION_BASE_URL: import.meta.env.VITE_TRANSACTION_BASE_URL,
  WEBSOCKET_BASE_URL: import.meta.env.VITE_WEBSOCKET_BASE_URL,
  SWAP_BASE_URL: import.meta.env.VITE_SWAP_BASE_URL,
  PERP_WEBSOCKET_BASE_URL: import.meta.env.VITE_PERP_WEBSOCKET_BASE_URL,
  CANDLE_STICK_URL: import.meta.env.VITE_CANDLESTICK_SOCKET,
  BOT_BASE_URL: import.meta.env.VITE_BOT_BASE_URL,
  BOT_WEBSOCKET_BASE_URL: import.meta.env.VITE_BOT_WEBSOCKET_BASE_URL,
  MARKET_API_BASE_URL: import.meta.env.VITE_MARKET_API_BASE_URL
};

export const connectSocket = (uri) => {
  return io(uri, {
    transports: ["websocket"],
  });
};

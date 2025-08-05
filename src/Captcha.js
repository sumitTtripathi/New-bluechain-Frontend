// import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";

const AES_SECRET_KEY = process.env.REACT_APP_AES_SECRET_KEY || "";

export const rtkBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().global.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const encryptPayload = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    AES_SECRET_KEY
  ).toString();
  return JSON.stringify({ data: ciphertext });
};

export const rtkBaseQueryWithEncryption = async (args, api, extraOptions) => {
  let modifiedArgs = { ...args }; 

  if (args?.body) {
    modifiedArgs.body = encryptPayload(args.body);
  }

  if (!modifiedArgs.headers) {
    modifiedArgs.headers = new Headers({ "Content-Type": "application/json" });
  }

  return rtkBaseQuery(modifiedArgs, api, extraOptions);
};

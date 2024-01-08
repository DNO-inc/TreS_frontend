import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import jwtDecode from "jwt-decode";

import {
  getAccessToken,
  getRefreshToken,
} from "../../shared/functions/getLocalStorageData";
import { endpoints, storage } from "../../constants";
import { clearLocalStorage } from "../../shared/functions";

export interface IJwtDecodeData {
  role: string;
  token_id: string;
  token_type: string;
  user_id: number;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  sub: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: endpoints.BASE_URL,
  prepareHeaders: headers => {
    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (!headers.get("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (headers.get("Content-Type") === "multipart/form-data") {
      headers.delete("Content-Type");
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      const decodeRefreshToken: IJwtDecodeData = jwtDecode(refreshToken);
      const expirationTime = decodeRefreshToken.exp * 1000;

      if (Date.now() >= expirationTime) {
        clearLocalStorage();
      }

      const refreshResult = await axios({
        url: `${endpoints.BASE_URL}auth/token/refresh`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (refreshResult?.data?.access_token) {
        localStorage.setItem(
          storage.ACCESS_TOKEN,
          refreshResult.data.access_token
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        clearLocalStorage(false);
      }
    }
  }
  return result;
};

export default baseQueryWithReauth;

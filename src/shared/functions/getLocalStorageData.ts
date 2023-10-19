import jwtDecode from "jwt-decode";
import { IJwtDecodeData } from "../../store/api/useBaseQuery";

export const getUserName = () => localStorage.getItem("user-name");

export const getUserLogin = () => localStorage.getItem("login");

export const getUserId = () => Number(localStorage.getItem("user-id"));

export const getAccessToken = () => localStorage.getItem("access-token");

export const getRefreshToken = () => localStorage.getItem("refresh-token");

export const getIsTokensExpired = () => {
  let isAccessExpired = true;
  let isRefreshExpired = true;

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (accessToken) {
    const decodeData: IJwtDecodeData = jwtDecode(accessToken);

    if (Date.now() < decodeData.exp * 1000) {
      isAccessExpired = false;
    }
  }

  if (refreshToken) {
    const decodeData: IJwtDecodeData = jwtDecode(refreshToken);

    if (Date.now() < decodeData.exp * 1000) {
      isRefreshExpired = false;
    }
  }

  return isAccessExpired || isRefreshExpired;
};

export const getUserRole = () => localStorage.getItem("role");

export const getUserFacultyId = () =>
  Number(localStorage.getItem("faculty-id"));

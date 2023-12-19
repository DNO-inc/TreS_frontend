import jwtDecode from "jwt-decode";
import { IJwtDecodeData } from "../../store/api/useBaseQuery";

export const getUserName = () => localStorage.getItem("user-name");

export const getUserLogin = () => localStorage.getItem("login");

export const getUserId = () => Number(localStorage.getItem("user-id"));

export const getAccessToken = () => localStorage.getItem("access-token");

export const getRefreshToken = () => localStorage.getItem("refresh-token");

export const getPermissions = () => {
  const permissions = localStorage.getItem("permissions");

  if (!permissions) {
    return [] as string[];
  }

  return permissions;
};

export const getIsTokensExpired = () => {
  let isAccessExpired = true;

  const accessToken = getAccessToken();

  if (accessToken) {
    const decodeData: IJwtDecodeData = jwtDecode(accessToken);

    if (Date.now() < decodeData.exp * 1000) {
      isAccessExpired = false;
    }
  }

  return isAccessExpired;
};

export const getUserRole = () => localStorage.getItem("role");

export const getUserFacultyId = () =>
  Number(localStorage.getItem("faculty-id"));

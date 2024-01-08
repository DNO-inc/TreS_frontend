import jwtDecode from "jwt-decode";
import { IJwtDecodeData } from "../../store/api/useBaseQuery";
import { storage } from "../../constants";

export const getUserName = () => localStorage.getItem(storage.USER_NAME);

export const getUserLogin = () => localStorage.getItem(storage.LOGIN);

export const getUserId = () => Number(localStorage.getItem(storage.USER_ID));

export const getAccessToken = () => localStorage.getItem(storage.ACCESS_TOKEN);

export const getRefreshToken = () =>
  localStorage.getItem(storage.REFRESH_TOKEN);

export const getPermissions = () => {
  const permissions = localStorage.getItem(storage.PERMISSIONS);

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

export const getUserRole = () => localStorage.getItem(storage.ROLE);

export const getUserFacultyId = () =>
  Number(localStorage.getItem(storage.FACULTY_ID));

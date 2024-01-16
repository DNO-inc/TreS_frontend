import { storage } from "../../constants";

const clearLocalStorage = (isRemoveRefreshToken = true) => {
  if (isRemoveRefreshToken) {
    localStorage.removeItem(storage.REFRESH_TOKEN);
  }

  localStorage.removeItem(storage.ACCESS_TOKEN);
  localStorage.removeItem(storage.USER.FIELD_KEY);
};

export { clearLocalStorage };

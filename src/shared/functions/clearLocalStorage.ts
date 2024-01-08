import { storage } from "../../constants";

const clearLocalStorage = (isRemoveRefreshToken = true) => {
  if (isRemoveRefreshToken) {
    localStorage.removeItem(storage.REFRESH_TOKEN);
  }

  localStorage.removeItem(storage.ACCESS_TOKEN);
  localStorage.removeItem(storage.USER_NAME);
  localStorage.removeItem(storage.LOGIN);
  localStorage.removeItem(storage.FACULTY_ID);
  localStorage.removeItem(storage.USER_ID);
  localStorage.removeItem(storage.ROLE);
  localStorage.removeItem(storage.PERMISSIONS);
};

export { clearLocalStorage };

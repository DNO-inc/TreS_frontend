import { getUserRole } from "./getLocalStorageData";

const checkIsAdmin = (role = "ADMIN") => {
  let isAdmin = false;
  const userRole = getUserRole();

  if (userRole?.includes(role)) {
    isAdmin = true;
  }

  return isAdmin;
};

export { checkIsAdmin };

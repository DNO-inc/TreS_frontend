import { getUserRole } from "./getLocalStorageData";
import { roles } from "../../constants";

const checkIsAdmin = (role = roles.ADMIN) => {
  let isAdmin = false;
  const userRole = getUserRole();

  if (userRole?.includes(role)) {
    isAdmin = true;
  }

  return isAdmin;
};

export { checkIsAdmin };

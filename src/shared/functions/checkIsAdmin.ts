import { getUserRole } from "./getLocalStorageData";

const checkIsAdmin = () => {
  let isAdmin = false;
  const role = getUserRole();

  if (role?.includes("ADMIN")) {
    isAdmin = true;
  }

  return isAdmin;
};

export { checkIsAdmin };

import { getUserRole } from "./getLocalStorageData";

const checkIsAdmin = () => {
  const role = getUserRole();

  return role?.includes("ADMIN");
};

export { checkIsAdmin };

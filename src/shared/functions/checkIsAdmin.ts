import { getUserRole } from "./getLocalStorageData";

const checkIsAdmin = () => {
  const role = getUserRole();

  return role === "ADMIN";
};

export { checkIsAdmin };

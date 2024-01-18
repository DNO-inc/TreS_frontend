import { getUser } from "./manipulateLocalStorage";
import { roles } from "constants";

const checkIsAdmin = (role = roles.ADMIN) => {
  let isAdmin = false;

  try {
    const user = getUser();

    if (user?.role?.name?.includes(role)) {
      isAdmin = true;
    }
  } catch (error) {
    console.error(error);
  }

  return isAdmin;
};

export { checkIsAdmin };

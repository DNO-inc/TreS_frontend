import { Navigate, Outlet } from "react-router";

import { endpoints } from "../../constants";
import { getPermissions } from "../../shared/functions/getLocalStorageData";

interface PermissionRoteProps {
  permission: string;
}

const PermissionRote = ({ permission }: PermissionRoteProps) => {
  const userPermissions = getPermissions() || [];
  const isHavePermission = userPermissions.includes(permission);

  return isHavePermission ? (
    <Outlet />
  ) : (
    <Navigate to={endpoints.PERMISSION_DENIED} />
  );
};

export { PermissionRote };

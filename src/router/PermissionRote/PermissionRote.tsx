import { Navigate, Outlet } from 'react-router'

import { endpoints } from 'constants/index'
import { getUserRole } from 'functions/manipulateLocalStorage'

interface PermissionRoteProps {
  permission: string
}

const PermissionRote = ({ permission }: PermissionRoteProps) => {
  const { permissionList } = getUserRole() || []
  const isHavePermission = permissionList.includes(permission)

  return isHavePermission ? (
    <Outlet />
  ) : (
    <Navigate to={endpoints.PERMISSION_DENIED} />
  )
}

export { PermissionRote }

import { Navigate, Outlet } from 'react-router'

import { endpoints } from 'constants/index'
import { checkIsAdmin } from 'functions/index'

const AdminRoute = () => {
  const isAdmin = checkIsAdmin()

  return isAdmin ? <Outlet /> : <Navigate to={endpoints.GENERAL_TICKETS} />
}

export { AdminRoute }

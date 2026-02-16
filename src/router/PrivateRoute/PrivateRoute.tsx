import { Outlet } from 'react-router'

import { general } from 'constants/index'
import { useAuth } from 'context/AuthContext/AuthContext'

const CABINET_AUTH_URL = `https://cabinet.sumdu.edu.ua/index/service/${general.TRES_TOKEN}`

const PrivateRoute = () => {
  const { isAuth } = useAuth()

  if (!isAuth) {
    window.location.href = CABINET_AUTH_URL
    return null
  }

  return <Outlet />
}

export { PrivateRoute }

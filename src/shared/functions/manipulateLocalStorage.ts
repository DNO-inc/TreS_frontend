import jwtDecode from 'jwt-decode'

import { IJwtDecodeData } from 'api/useBaseQuery'
import { storage } from 'constants/index'

export const getUser = () => {
  try {
    const user = localStorage.getItem(storage.USER.FIELD_KEY)

    if (user == null) {
      return {}
    }

    return JSON.parse(user)
  } catch (error) {
    console.error(error)
  }
}

export const getUserRole = () => {
  const user = getUser() ?? {
    role: {
      name: '',
      permissions: [],
      roleId: -1,
    },
  }

  return user?.role
}

export const changeUserField = (fieldName, newValue) => {
  const user = getUser() ?? {}

  user[fieldName] = newValue

  localStorage.setItem(storage.USER.FIELD_KEY, JSON.stringify(user))
}

export const getAccessToken = () => localStorage.getItem(storage.ACCESS_TOKEN)

export const getRefreshToken = () => localStorage.getItem(storage.REFRESH_TOKEN)

export const getIsTokensExpired = () => {
  let isAccessExpired = true

  const accessToken = getAccessToken()

  if (accessToken) {
    const decodeData: IJwtDecodeData = jwtDecode(accessToken)

    if (Date.now() < decodeData.exp * 1000) {
      isAccessExpired = false
    }
  }

  return isAccessExpired
}

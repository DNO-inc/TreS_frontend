import { roles } from 'constants/index'
import { getUser } from './manipulateLocalStorage'

const checkIsAdmin = (role = roles.ADMIN) => {
  let isAdmin = false

  try {
    const user = getUser()

    if (user?.role?.name?.includes(role)) {
      isAdmin = true
    }
  } catch (error) {
    console.error(error)
  }

  return isAdmin
}

export { checkIsAdmin }

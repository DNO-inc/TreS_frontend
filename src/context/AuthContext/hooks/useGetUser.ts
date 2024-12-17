import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { Dispatch, SetStateAction, useCallback } from 'react'

import { useGetProfileMutation } from 'api/profile.api'
import { storage } from 'constants/index'
import { decodeJwt } from 'functions/index'
import { getUser as getLocalStorageUser } from 'functions/manipulateLocalStorage'
import { ILoginInfo } from '../AuthContext'

interface UserInfoProps {
  data?: {
    firstname: string
    lastname: string
    login: string
    faculty: {
      faculty_id: number
      name: string
    }
    group: {
      group_id: number
      name: string
    }
    phone: null
    email: null
    registration_date: string
    role: {
      name: string
      permission_list: string[]
      role_id: number
    }
  }
  error?: FetchBaseQueryError | SerializedError
}

const useGetUser = (setIsAuth: Dispatch<SetStateAction<boolean>>) => {
  const [getProfile] = useGetProfileMutation()

  const getUser = useCallback((loginInfo: ILoginInfo) => {
    try {
      const getUserData = async (accessToken: string) => {
        decodeJwt(accessToken)

        const user = getLocalStorageUser()
        const userId = user?.userId

        const { data: userInfo }: UserInfoProps = await getProfile({
          userId: userId,
        })

        if (userInfo?.faculty?.faculty_id) {
          user[storage.USER.FACULTY_ID] = userInfo.faculty.faculty_id
        }

        if (userInfo?.firstname && userInfo?.lastname) {
          user[storage.USER.NAME] = `${userInfo.firstname} ${userInfo.lastname}`
        }

        if (userInfo?.login) {
          user[storage.USER.LOGIN] = userInfo.login
        }

        if (userInfo?.role) {
          const role = storage.USER.ROLE

          user[role.FIELD_KEY] = {}
          user[role.FIELD_KEY][role.ID] = userInfo.role.role_id
          user[role.FIELD_KEY][role.NAME] = userInfo.role.name
          user[role.FIELD_KEY][role.PERMISSIONS] = userInfo.role.permission_list
        }

        localStorage.setItem(storage.USER.FIELD_KEY, JSON.stringify(user))

        setIsAuth(true)
      }

      if (typeof loginInfo === 'string') {
        getUserData(loginInfo)
      } else if (typeof loginInfo === 'object') {
        if (loginInfo?.refresh_token) {
          localStorage.setItem(storage.REFRESH_TOKEN, loginInfo?.refresh_token)
        }

        if (loginInfo?.access_token) {
          getUserData(loginInfo?.access_token)
        }
      }
    } catch {
      alert('Something went wrong!')
    }
  }, [])

  return getUser
}

export { useGetUser }

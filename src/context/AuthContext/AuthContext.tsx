import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  useCabinetLoginMutation,
  useCabinetLogoutMutation,
  useLoginMutation,
} from 'api/auth.api'
import { general } from 'constants/index'
import { clearLocalStorage } from 'functions/index'
import {
  getAccessToken,
  getIsTokensExpired,
} from 'functions/manipulateLocalStorage'
import { useGetUser } from './hooks/useGetUser'

interface AuthContextProps {
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
  authToken: string | null
  loginUser: ({ login, password }: loginProps) => Promise<boolean>
  logoutUser: () => void
  registerUser: (loginInfo: ILoginInfo) => Promise<boolean>
  language: 'uk' | 'en'
}

interface loginProps {
  login: string
  password: string
}

interface LoginInfoProps {
  data?: {
    access_token: string
    login: string
    refresh_token: string
    user_id: number
  }
  error?: FetchBaseQueryError | SerializedError
}

export type ILoginInfo =
  | {
      access_token: string
      login?: string
      refresh_token: string
      user_id: number
    }
  | undefined
  | string

type ApiResponse = {
  data?: ILoginInfo
  error?: FetchBaseQueryError | SerializedError
}

const AuthContext = createContext({} as AuthContextProps)

export default AuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const cabinetKey = searchParams.get('key')
  const cabinetToken = searchParams.get('token') || general.TRES_TOKEN
  let language

  const IsTokensExpired = getIsTokensExpired()
  const [isAuth, setIsAuth] = useState(!IsTokensExpired)
  const [authToken, setAuthToken] = useState(getAccessToken())

  const [authorization] = useLoginMutation()
  const [cabinetAuth] = useCabinetLoginMutation()
  const [cabinetLogout] = useCabinetLogoutMutation()

  const getUser = useGetUser(setIsAuth)

  const handleCabinetAuth = async () => {
    if (cabinetKey && cabinetToken) {
      try {
        const response: ApiResponse = await cabinetAuth({
          body: JSON.stringify({
            key: cabinetKey,
            token: cabinetToken,
          }),
        })

        const loginInfo = response?.data
        if (loginInfo) {
          getUser(loginInfo)

          fetch(
            `https://cabinet.sumdu.edu.ua/api/getPersonInfo?token=${cabinetToken}&key=${cabinetKey}`,
            {
              method: 'GET',
            }
          )
            .then(response => response.json())
            .then(data => {
              language = data.client_lang
            })
            .catch(error => {
              console.error(
                'There was a problem with the fetch operation:',
                error
              )
            })
        }
      } catch (error) {
        console.error('Cabinet authentication error:', error)
      }
    }
  }

  useEffect(() => {
    handleCabinetAuth()
  }, [])

  const handleUserData = (loginInfo: ILoginInfo | undefined) => {
    if (loginInfo) {
      getUser(loginInfo)
      return true
    }

    return false
  }

  const loginUser = async ({ login, password }: loginProps) => {
    const { data: loginInfo }: LoginInfoProps = await authorization({
      body: JSON.stringify({ login, password }),
    })

    return handleUserData(loginInfo)
  }

  const registerUser = async (loginInfo: ILoginInfo) => {
    return handleUserData(loginInfo)
  }

  const logoutUser = () => {
    cabinetLogout({})
    setAuthToken(null)
    clearLocalStorage()

    setIsAuth(false)

    navigate('/')
  }

  const contextData = {
    isAuth,
    setIsAuth,
    authToken,
    loginUser,
    logoutUser,
    registerUser,
    language,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext)
}

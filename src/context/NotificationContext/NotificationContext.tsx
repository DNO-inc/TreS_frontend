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

import { useGetNotificationsMutation } from 'api/notifications.api'
import { endpoints } from 'constants/index'
import { useAuth } from '../AuthContext/AuthContext'
import { handleWebSocketMessage } from './functions/handleWebSocketMessage'
import { stackCommentNotifications } from './functions/stackCommentNotifications'
import { useWebSocket } from './hooks/useWebSocket'

interface NotificationContextProps {
  notifications: INotification[]
  setNotifications: Dispatch<SetStateAction<INotification[]>>
  countOfNotification: number
}

export interface INotification {
  body: string
  body_ua: string
  ticket_id: number
  user_id: number
  count?: number
}

type ApiResponse = {
  data?: {
    notifications: INotification[]
  }
  error?: FetchBaseQueryError | SerializedError
}

const NotificationContext = createContext({} as NotificationContextProps)

export default NotificationContext

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAuth()
  const [notifications, setNotifications] = useState<INotification[]>([])
  useWebSocket(endpoints.WS_URL, isAuth, data =>
    handleWebSocketMessage(data, setNotifications)
  )

  const [getNotifications] = useGetNotificationsMutation({})

  useEffect(() => {
    isAuth &&
      getNotifications({})
        .then((res: ApiResponse) => {
          const notificationsData = res?.data?.notifications

          if (notificationsData) {
            const stackComments = stackCommentNotifications(notificationsData)

            setNotifications(prevNotifications => [
              ...stackComments,
              ...prevNotifications,
            ])
          }
        })
        .catch(err => {
          console.error(err)
        })
  }, [isAuth])

  const contextData = {
    notifications,
    setNotifications,
    countOfNotification: notifications.length,
  }

  return (
    <NotificationContext.Provider value={contextData}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

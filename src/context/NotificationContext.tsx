import {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import { getAccessToken } from "../shared/functions/getLocalStorageData";
import { useAuth } from "./AuthContext";
import { useGetNotificationsMutation } from "../store/api/notifications/notifications.api";

interface NotificationContextProps {
  notifications: INotification[];
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
  countOfNotification: number;
}

interface INotification {
  body: string;
  body_ua: string;
  ticket_id: number;
  user_id: number;
}

type ApiResponse = {
  data?: {
    notifications: INotification[];
  };
  error?: FetchBaseQueryError | SerializedError;
};

const NotificationContext = createContext({} as NotificationContextProps);

export default NotificationContext;

const wsUrl = import.meta.env.VITE_WS_URL;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const { isAuth } = useAuth();

  const [getNotifications] = useGetNotificationsMutation({});

  useEffect(() => {
    getNotifications({})
      .then((res: ApiResponse) => {
        const notificationsData = res?.data?.notifications;

        if (notificationsData) {
          const reverseNotifications = notificationsData.reverse();

          setNotifications(prevNotifications => [
            ...reverseNotifications,
            ...prevNotifications,
          ]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isAuth && !ws) {
      const newWs = new WebSocket(wsUrl);
      setWs(newWs);

      function ping() {
        if (!newWs) return;
        if (newWs.readyState !== 1) return;
        newWs.send("PING");
        setTimeout(ping, 55000);
      }

      const openConnection = () => {
        const accessToken = getAccessToken() || "";
        newWs.send(accessToken);
        newWs.send("NOTIFICATIONS");
        ping();
      };

      const messageHandler = e => {
        e.data
          .text()
          .then(value => {
            const notification: INotification = JSON.parse(value).data;

            notification.body &&
              setNotifications(prevState => [notification, ...prevState]);
          })
          .catch(() => {});
      };

      newWs.addEventListener("open", openConnection);
      newWs.addEventListener("message", messageHandler);
    } else if (!isAuth && ws) {
      ws.close();
      setWs(null);
    }
  }, [isAuth, ws]);

  const contextData = {
    notifications,
    setNotifications,
    countOfNotification: notifications.length,
  };

  return (
    <NotificationContext.Provider value={contextData}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

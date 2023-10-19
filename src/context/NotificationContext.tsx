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
  count?: number;
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
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const { isAuth } = useAuth();

  const [getNotifications] = useGetNotificationsMutation({});

  const stackCommentNotifications = (notifications: INotification[]) => {
    if (notifications.length < 2) {
      return notifications;
    }

    const reverseNotifications = [...notifications].reverse();
    const stackedComments: INotification[] = [
      { ...reverseNotifications[0], count: 1 },
    ];

    for (let i = 1; i < notifications.length; i++) {
      const lastElement = stackedComments[stackedComments.length - 1];

      if (lastElement.body === reverseNotifications[i].body) {
        if (lastElement?.count) {
          lastElement.count += 1;
        } else {
          const duplicatedNotification = {
            ...lastElement,
            count: 2,
          };

          stackedComments.push(duplicatedNotification);
        }
      } else {
        stackedComments.push(reverseNotifications[i]);
      }
    }

    return stackedComments;
  };

  useEffect(() => {
    getNotifications({})
      .then((res: ApiResponse) => {
        const notificationsData = res?.data?.notifications;

        if (notificationsData) {
          const stackComments = stackCommentNotifications(notificationsData);

          setNotifications(prevNotifications => [
            ...stackComments,
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
        if (isFirstLoad) {
          setTimeout(ping, 25000);
          setIsFirstLoad(false);
        } else {
          setTimeout(ping, 60000);
        }
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
              setNotifications(prevState => {
                if (prevState.length === 0) {
                  return [notification];
                }
                const stackedComments = [...prevState];

                if (notification.body === stackedComments[0].body) {
                  if (stackedComments[0]?.count) {
                    stackedComments[0].count += 1;
                  } else {
                    stackedComments[0].count = 2;
                  }
                } else {
                  stackedComments.unshift(notification);
                }

                return stackedComments;
              });
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

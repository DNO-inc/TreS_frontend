import { Dispatch, SetStateAction } from "react";

import { INotification } from "../NotificationContext";

const handleWebSocketMessage = (
  data: string,
  setNotifications: Dispatch<SetStateAction<INotification[]>>
) => {
  const notification: INotification = JSON.parse(data).data;

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
};

export { handleWebSocketMessage };

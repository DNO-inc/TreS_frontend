import { INotification } from "../NotificationContext";

const stackCommentNotifications = (
  notifications: INotification[]
): INotification[] => {
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

export { stackCommentNotifications };

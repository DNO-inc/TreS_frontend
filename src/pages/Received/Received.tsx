import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetAdminTicketsMutation } from "../../store/api/admin.api";
import { getUserId } from "../../shared/functions/getLocalStorageData";

const Received: FC = () => {
  const [getTickets] = useGetAdminTicketsMutation();

  const userId: boolean | number = getUserId();

  return (
    <MyTicketsLayout
      title={"received"}
      useGetQuery={getTickets}
      option={"tickets"}
      assignee={userId}
    />
  );
};

export { Received };

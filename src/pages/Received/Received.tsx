import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetAdminTicketsMutation } from "../../store/api/admin.api";
import { getUser } from "../../shared/functions/manipulateLocalStorage";

const Received: FC = () => {
  const [getTickets] = useGetAdminTicketsMutation();

  const { userId } = getUser();

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

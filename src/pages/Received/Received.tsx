import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetAdminTicketsMutation } from "../../store/api/admin.api";
import { getUser } from "../../shared/functions/manipulateLocalStorage";

const Received: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetAdminTicketsMutation();

  const { userId } = getUser();

  return (
    <MyTicketsLayout
      title={"received"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"tickets"}
      assignee={userId}
    />
  );
};

export { Received };

import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetAdminTicketsMutation } from "../../store/api/admin/admin.api";
import { getUserId } from "../../shared/functions/getLocalStorageData";

const Received: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetAdminTicketsMutation();

  const userId: boolean | number = getUserId();

  return (
    <MyTicketPage
      title={"received"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"tickets"}
      userId={userId}
    />
  );
};

export { Received };

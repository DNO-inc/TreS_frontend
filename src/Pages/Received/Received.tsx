import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useJwtDecode } from "../../shared/hooks";
import { useGetAdminTicketsMutation } from "../../store/api/admin/admin.api";

const Received: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetAdminTicketsMutation();

  const jwt = useJwtDecode();
  const userId: boolean | number = jwt && jwt?.user_id;

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

import { FC } from "react";

import { MyTicketsLayout } from "layouts/MyTicketsLayout";

import { useGetTicketsMutation } from "api/tickets.api";
import { getUser } from "functions/manipulateLocalStorage";

const Sent: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetTicketsMutation();

  const { userId } = getUser();

  return (
    <MyTicketsLayout
      title={"sent"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"tickets"}
      userId={userId}
    />
  );
};

export { Sent };

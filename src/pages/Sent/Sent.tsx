import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetTicketsMutation } from "../../store/api/tickets.api";
import { getUser } from "../../shared/functions/manipulateLocalStorage";

const Sent: FC = () => {
  const [getTickets] = useGetTicketsMutation();

  const { userId } = getUser();

  return (
    <MyTicketsLayout
      title={"sent"}
      useGetQuery={getTickets}
      option={"tickets"}
      userId={userId}
    />
  );
};

export { Sent };

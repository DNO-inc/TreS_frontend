import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetTicketsMutation } from "../../store/api/tickets.api";
import { getUserId } from "../../shared/functions/getLocalStorageData";

const Sent: FC = () => {
  const [getTickets] = useGetTicketsMutation();

  const userId: null | number = getUserId();

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

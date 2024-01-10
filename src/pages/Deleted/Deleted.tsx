import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetDeletedTicketsMutation } from "../../store/api/tickets.api";

const Deleted: FC = () => {
  const [getTickets] = useGetDeletedTicketsMutation();

  return <MyTicketsLayout title={"deleted"} useGetQuery={getTickets} />;
};

export { Deleted };

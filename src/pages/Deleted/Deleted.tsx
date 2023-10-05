import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetDeletedTicketsMutation } from "../../store/api/tickets/tickets.api";

const Deleted: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetDeletedTicketsMutation();

  return (
    <MyTicketPage
      title={"deleted"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};

export { Deleted };

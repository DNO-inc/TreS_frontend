import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetSavedTicketsMutation } from "../../store/api/tickets/tickets.api";

const Bookmarks: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetSavedTicketsMutation();

  return (
    <MyTicketPage
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};

export { Bookmarks };

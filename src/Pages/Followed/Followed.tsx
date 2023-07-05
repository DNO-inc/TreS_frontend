import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetSavedTicketsMutation } from "../../store/api/tickets/tickets.api";

const Followed: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetSavedTicketsMutation();

  return (
    <MyTicketPage
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"liked"}
    />
  );
};

export { Followed };

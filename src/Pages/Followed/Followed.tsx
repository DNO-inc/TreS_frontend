import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetSavedTicketsMutation } from "../../store/api/tickets/tickets.api";

const Followed: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetSavedTicketsMutation();

  return (
    <MyTicketPage
      title={"followed"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"bookmarked"}
    />
  );
};

export { Followed };

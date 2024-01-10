import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetSavedTicketsMutation } from "../../store/api/tickets.api";

const Followed: FC = () => {
  const [getTickets] = useGetSavedTicketsMutation();

  return (
    <MyTicketsLayout
      title={"followed"}
      useGetQuery={getTickets}
      option={"followed"}
    />
  );
};

export { Followed };

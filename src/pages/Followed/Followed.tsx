import { FC } from "react";

import { MyTicketsLayout } from "layouts/MyTicketsLayout";

import { useGetSavedTicketsMutation } from "api/tickets.api";

const Followed: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetSavedTicketsMutation();

  return (
    <MyTicketsLayout
      title={"followed"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"followed"}
    />
  );
};

export { Followed };

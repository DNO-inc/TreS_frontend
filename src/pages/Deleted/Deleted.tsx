import { FC } from "react";

import { MyTicketsLayout } from "layouts/MyTicketsLayout";

import { useGetDeletedTicketsMutation } from "api/tickets.api";

const Deleted: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetDeletedTicketsMutation();

  return (
    <MyTicketsLayout
      title={"deleted"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};

export { Deleted };

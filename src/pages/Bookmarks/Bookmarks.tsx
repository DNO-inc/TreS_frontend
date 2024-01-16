import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetSavedTicketsMutation } from "../../store/api/tickets.api";

const Bookmarks: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetSavedTicketsMutation();

  return (
    <MyTicketsLayout
      title={"bookmarks"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"bookmarked"}
    />
  );
};

export { Bookmarks };

import { FC } from "react";

import { MyTicketsLayout } from "../../layouts/MyTicketsLayout";

import { useGetSavedTicketsMutation } from "../../store/api/tickets.api";

const Bookmarks: FC = () => {
  const [getTickets] = useGetSavedTicketsMutation();

  return (
    <MyTicketsLayout
      title={"bookmarks"}
      useGetQuery={getTickets}
      option={"bookmarked"}
    />
  );
};

export { Bookmarks };

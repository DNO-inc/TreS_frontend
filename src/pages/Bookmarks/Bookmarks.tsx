import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetSavedTicketsMutation } from "../../store/api/tickets.api";

const Bookmarks: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetSavedTicketsMutation();

  return (
    <MyTicketPage
      title={"bookmarks"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"bookmarked"}
    />
  );
};

export { Bookmarks };

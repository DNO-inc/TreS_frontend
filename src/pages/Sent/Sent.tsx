import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetTicketsMutation } from "../../store/api/tickets.api";
import { getUserId } from "../../shared/functions/getLocalStorageData";

const Sent: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetTicketsMutation();

  const userId: null | number = getUserId();

  return (
    <MyTicketPage
      title={"sent"}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={"tickets"}
      userId={userId}
    />
  );
};

export { Sent };

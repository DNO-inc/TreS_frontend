import { FC } from "react";

import { MyTicketPage } from "../MyTicketPage";

import { useGetTicketsMutation } from "../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../shared/hooks";

const Sent: FC = () => {
  const [getTickets, { isLoading, isSuccess }] = useGetTicketsMutation();

  const jwt = useJwtDecode();
  const userId: boolean | number = jwt && JSON.parse(jwt.sub)?.user_id;

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

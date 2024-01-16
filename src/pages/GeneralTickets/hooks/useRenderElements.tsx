import Grid from "@mui/material/Grid";

import { Ticket } from "../../../components/Ticket/Ticket";
import { SkeletonTicket } from "../../../components/SkeletonTicket";
import { CustomPagination } from "../../../components/CustomPagination";
import { NotFound } from "../../../components/NotFound";
import { ITicket } from "../../../components/Ticket/ticket.interface";

const useRenderElements = (
  ticketsPerRow: number,
  tickets: ITicket[],
  totalPage: number,
  currentPage: number,
  isLoading: boolean
) => {
  const renderSkeletonTickets = () => (
    <Grid container gap={2}>
      {Array.from({ length: ticketsPerRow * 3 }).map((_, index) => (
        <SkeletonTicket ticketsPerRow={ticketsPerRow} key={index} />
      ))}
    </Grid>
  );

  const renderTickets = () => (
    <>
      <Grid container gap={2}>
        {tickets.map(ticket => (
          <Ticket
            ticketsPerRow={ticketsPerRow}
            ticket={ticket}
            key={ticket.ticket_id}
          />
        ))}
      </Grid>
      {tickets.length > 1 && (
        <CustomPagination total={totalPage} current={currentPage} />
      )}
    </>
  );

  const renderNotFound = () => !isLoading && <NotFound withPostscript={true} />;

  return { renderSkeletonTickets, renderTickets, renderNotFound };
};

export { useRenderElements };

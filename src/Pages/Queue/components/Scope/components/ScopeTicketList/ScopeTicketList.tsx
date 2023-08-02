import { FC, useEffect, useState, UIEvent } from "react";

import { Box, Grid, Typography, useTheme } from "@mui/material";

import { SimpleTicket } from "../../../../../../components/SimpleTicket/SimpleTicket";

import { ITicket } from "../../../../../../components/Ticket/ticket.interface";
import IPalette from "../../../../../../theme/IPalette.interface";
import axios from "axios";

interface ScopeTicketListProps {
  filter: number;
}

const ScopeTicketList: FC<ScopeTicketListProps> = ({ filter }) => {
  const { palette }: IPalette = useTheme();

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    if (isFetching) {
      axios
        .post(
          "https://burrito.tres.cyberbydlo.com/tickets/ticket_list",
          {
            status: [filter],
            items_count: Math.floor(window.innerHeight / 200),
            start_page: currentPage,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        )
        .then(function (response) {
          setTickets([...tickets, ...response.data.ticket_list]);
          setCurrentPage(prevState => prevState + 1);
          setTotalCount(response.data.total_pages);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => setIsFetching(false));
    }
  }, [isFetching]);

  const handleScroll = (event: UIEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;

    if (
      target.scrollHeight - (target.scrollTop + window.innerHeight - 450) <
        100 &&
      currentPage <= totalCount
    ) {
      setIsFetching(true);
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      {tickets.length ? (
        <>
          <Grid
            container
            onScroll={handleScroll}
            gap={2}
            sx={{
              alignContent: "start",
              height: "calc(100vh - 380px)",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: palette.grey.border,
                borderRadius: "2px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: palette.grey.active,
              },
            }}
          >
            {tickets.map(ticket => {
              return <SimpleTicket ticket={ticket} key={ticket.ticket_id} />;
            })}
          </Grid>
        </>
      ) : (
        <Typography variant="h1" mt={6}>
          Not found
        </Typography>
      )}
    </Box>
  );
};

export { ScopeTicketList };

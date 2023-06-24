import { useEffect, useState, FC } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Typography, useMediaQuery } from "@mui/material";

import { Loader } from "../../components/Loader";
import { Ticket } from "../../components/Ticket/Ticket";

import { useGetSavedTicketsQuery } from "../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../shared/hooks";

const Followed: FC = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery("(min-width:600px)");

  const [tickets, setTickets] = useState<ITicket[]>([]);

  const jwt = useJwtDecode();

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetSavedTicketsQuery({
      option: "liked",
    });

  useEffect(() => {
    isSuccess && setTickets(data.ticket_list);
  }, [isSuccess, data?.ticket_list]);

  useEffect(() => {
    refetch();
  }, [data?.ticket_list, refetch]);

  return (
    <Grid container>
      <Typography variant="h1">{t("followed.heading")}</Typography>
      <Grid
        container
        gap={2}
        sx={{
          flexDirection: matches ? "row" : "column",
          maxWidth: matches ? "100%" : "600px",
        }}
      >
        {isError ? (
          <Typography variant="h1">Error</Typography>
        ) : (
          <>
            {isLoading && <Loader />}
            {isSuccess && tickets.length ? (
              [...tickets].map(ticket => {
                return (
                  <Ticket
                    ticketsPerRow={matches ? 2 : 1}
                    ticket={ticket}
                    isAuth={!!jwt}
                    key={ticket.ticket_id}
                  />
                );
              })
            ) : (
              <Typography variant="h1" mt={6}>
                Not found
              </Typography>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export { Followed };

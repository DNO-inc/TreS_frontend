import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Typography, useMediaQuery } from "@mui/material";

import { Loader } from "../../components/Loader";
import { Ticket } from "../../components/Ticket/Ticket";

import { useJwtDecode } from "../../shared/hooks";
import { useGetSavedTicketsQuery } from "../../store/api/tickets/tickets.api";

const Bookmarks: FC = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery("(min-width:600px)");

  const [tickets, setTickets] = useState<[]>([]);

  const jwt = useJwtDecode();

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetSavedTicketsQuery({
      option: "bookmarked",
    });

  useEffect(() => {
    isSuccess && setTickets(data.ticket_list);
  }, [isSuccess, data?.ticket_list]);

  useEffect(() => {
    refetch();
  }, [refetch, data?.ticket_list]);

  return (
    <Grid container>
      <Typography variant="h1">{t("bookmarks.heading")}</Typography>
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
              [...tickets].map((ticket: ITicket) => {
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

export { Bookmarks };

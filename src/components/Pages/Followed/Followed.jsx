import { Grid, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetSavedTicketsQuery } from "../../../store/api/tickets/tickets.api";
import { Loader } from "../../Loader";
import { Ticket } from "../../Ticket/Ticket";
import { useEffect, useState } from "react";
import { useJwtDecode } from "../../../shared/hooks";

const Followed = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const matches = useMediaQuery("(min-width:600px)");
  const jwt = useJwtDecode();

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetSavedTicketsQuery({
      option: "liked",
    });

  useEffect(() => {
    isSuccess && setTickets(data.ticket_list);
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, [data?.ticket_list]);

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

Followed.propTypes = {};

export { Followed };

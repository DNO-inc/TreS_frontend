import { useEffect, useState } from "react";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Ticket } from "../../Ticket/Ticket";
import { useGetTicketsMutation } from "../../../store/api/tickets/tickets.api";
import { useJwtDecode } from "../../../shared/hooks";
import { Loader } from "../../Loader";

const GeneralTickets = () => {
  const { t } = useTranslation();
  const [ticketsPerRow, setTicketsPerRow] = useState(2);
  const [tickets, setTickets] = useState([]);
  const jwt = useJwtDecode();
  const matches = useMediaQuery("(min-width:600px)");
  const [geTickets, result] = useGetTicketsMutation();

  const option = jwt ? "tickets" : "anon";

  useEffect(() => {
    geTickets({ option: option, body: JSON.stringify({}) }).then(res => {
      setTickets(res.data.ticket_list);
    });
  }, [option]);

  return (
    <Grid container flexDirection={"column"}>
      <Typography variant="h1">{t("generalTickets.heading")}</Typography>
      <Grid>
        <Button
          onClick={() => {
            setTicketsPerRow(2);
          }}
        >
          2
        </Button>
        <Button
          onClick={() => {
            setTicketsPerRow(3);
          }}
        >
          3
        </Button>
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          flexDirection: matches ? "row" : "column",
          maxWidth: matches ? "100%" : "600px",
        }}
      >
        {result.isLoading && <Loader />}
        {result.isSuccess &&
          [...tickets]
            .reverse()
            .slice(0, 9)
            .map(ticket => {
              return (
                <Ticket
                  ticketsPerRow={matches ? ticketsPerRow : 1}
                  ticket={ticket}
                  isAuth={!!jwt}
                  key={ticket.ticket_id}
                />
              );
            })}
      </Grid>
    </Grid>
  );
};

GeneralTickets.propTypes = {};

export { GeneralTickets };

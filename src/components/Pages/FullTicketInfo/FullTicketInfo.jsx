import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useShowTicketMutation } from "../../../store/api/tickets/tickets.api";
import { Loader } from "../../Loader";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useJwtDecode } from "../../../shared/hooks";
import { Ticket } from "../../Ticket/Ticket";

const FullTicketInfo = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const jwt = useJwtDecode();

  const ticketId = +pathname.split("/")[2];

  const [showTicket, { data, isSuccess, isLoading }] = useShowTicketMutation();

  useEffect(() => {
    showTicket({ body: JSON.stringify({ ticket_id: ticketId }) });
  }, []);

  return (
    <Grid container>
      <Typography variant="h1">{t("fullTicket.heading")}</Typography>
      {isLoading && <Loader />}
      {!isLoading && isSuccess && (
        <Ticket
          ticketsPerRow={1}
          ticket={data}
          isAuth={!!jwt}
          key={data.ticket_id}
          isFullHeight={true}
        />
      )}
    </Grid>
  );
};

FullTicketInfo.propTypes = {};

export { FullTicketInfo };

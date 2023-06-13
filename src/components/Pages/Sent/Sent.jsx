import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ComingSoon } from "../../ComingSoon";
import { NavLink } from "react-router-dom";
import { endpoints } from "../../../constants";

const Sent = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Typography variant="h1">{t("sent.heading")}</Typography>
      <Grid container>
        <NavLink to={endpoints.createTicket}>
          <Button variant="contained">Create ticket</Button>
        </NavLink>
      </Grid>
    </Grid>
  );
};

Sent.propTypes = {};

export { Sent };

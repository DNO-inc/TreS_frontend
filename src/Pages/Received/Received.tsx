import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ComingSoon } from "../../components/ComingSoon";

const Received: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("received.heading")}</Typography>
      </Box>
      <Box></Box>

      <ComingSoon />
    </Grid>
  );
};

export { Received };

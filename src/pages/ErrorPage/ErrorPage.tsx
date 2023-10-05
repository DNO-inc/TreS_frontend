import { FC } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface ErrorPageProps {
  message?: string | undefined;
}

const ErrorPage: FC<ErrorPageProps> = ({ message }) => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Box>
        <Typography variant="h1">{t("common.error")}</Typography>
        {message && <Typography variant="h5">{message}</Typography>}
      </Box>
    </Grid>
  );
};

export { ErrorPage };

import { FC } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import notFound from "../../assets/not_found.svg";
import { NavLink } from "react-router-dom";
import { endpoints } from "../../constants";
import IPalette from "../../theme/IPalette.interface";
import { useMediaQuery, useTheme } from "@mui/material";

interface NotFoundProps {
  size?: number;
  title?: "tickets" | "notifications";
  withPostscript?: boolean;
}

const NotFound: FC<NotFoundProps> = ({
  size = 300,
  title = "tickets",
  withPostscript = false,
}) => {
  const { palette }: IPalette = useTheme();
  const { t } = useTranslation();

  const matches = useMediaQuery("(min-width: 600px)");

  return (
    <Grid
      container
      sx={{
        mt: { xs: 4, sm: 6 },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <img
        src={notFound}
        style={{
          width: matches ? `${size}px` : `${size / 1.5}px`,
          height: matches ? `${size - 30}px` : `${(size - 30) / 1.5}px`,
        }}
      />
      <Typography
        sx={{
          fontSize: { xs: 24, sm: 32 },
          fontWeight: 500,
          ml: 1,
          textAlign: "center",
        }}
      >
        {t(`common.notFound.${title}Title`)}
      </Typography>
      {withPostscript && (
        <>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 18 },
              textAlign: "center",
              color: palette.whiteAlpha.default,
              ml: 1,
            }}
          >
            {t("common.notFound.postscript") + " "}
            <NavLink
              to={endpoints.createTicket}
              style={{
                fontSize: matches ? 18 : 14,
                color: palette.semantic.info,
                textDecoration: "underline",
              }}
            >
              {t("common.notFound.createLink")}
            </NavLink>
          </Typography>
        </>
      )}
    </Grid>
  );
};

export { NotFound };

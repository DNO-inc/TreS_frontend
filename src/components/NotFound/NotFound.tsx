import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import notFound from "../../assets/not_found.svg";
import { dimensions, endpoints } from "../../constants";
import IPalette from "../../theme/IPalette.interface";

interface NotFoundProps {
  size?: number;
  title?: "tickets" | "notifications";
  withPostscript?: boolean;
}

const NotFound: FC<NotFoundProps> = ({
  size = dimensions.NOT_FOUND_SIZE,
  title = "tickets",
  withPostscript = false,
}) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery(
    `(min-width: ${dimensions.BREAK_POINTS.NOT_FOUND}px)`
  );

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
              to={endpoints.CREATE_TICKET}
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

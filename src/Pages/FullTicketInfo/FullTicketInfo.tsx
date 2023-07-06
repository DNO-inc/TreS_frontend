import { useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Loader } from "../../components/Loader";
import { ActionPanel } from "./components/ActionPanel";

import { endpoints } from "../../constants";
import { useShowTicketMutation } from "../../store/api/tickets/tickets.api";
import { checkStatus, formatDate } from "../../shared/functions";
import IPalette from "../../theme/IPalette.interface";
import { VerticalDivider } from "../../components/VerticalDivider";

const FullTicketInfo: FC = () => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const { pathname } = useLocation();

  const ticketId: number = parseInt(pathname.split("/")[2]);

  const [showTicket, { data: ticket, isSuccess, isLoading }] =
    useShowTicketMutation();

  useEffect(() => {
    showTicket({ body: JSON.stringify({ ticket_id: ticketId }) });
  }, [showTicket, ticketId]);

  return (
    <Grid container>
      {isLoading && <Loader />}
      {isSuccess && (
        <Grid
          container
          gap={3}
          sx={{
            pt: 6,
            pb: 10,
            "& > .MuiGrid-root > .MuiTypography-root:not(:first-of-type)": {
              fontSize: 20,
            },
          }}
        >
          <Grid container sx={{ flexDirection: "column" }}>
            <Grid
              container
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: 36,
                  mb: "12px",
                  maxWidth: "70%",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {ticket.subject}
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  p: "4px 12px",
                  bgcolor: checkStatus(ticket.status.name),
                  color:
                    checkStatus(ticket.status.name) === "#FFFFFF"
                      ? palette.common.black
                      : palette.common.white,
                  borderRadius: 1,
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {t(`ticketStatus.${ticket.status.name.toLowerCase()}`)}
              </Box>
            </Grid>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{ticket.queue.scope}</Typography>
              <VerticalDivider height={16} />
              <Typography sx={{ color: palette.whiteAlpha.default }}>
                {ticket.queue.name}
              </Typography>
            </Box>
          </Grid>
          <Grid container>
            <Grid
              sx={{
                width: "100%",
                p: 2,
                bgcolor: palette.grey.card,
                whiteSpace: "pre-line",
              }}
            >
              {ticket.body}
            </Grid>
          </Grid>
          <Grid container>
            <Typography mb={2}>{t("fullTicket.additionalInfo")}</Typography>
            <Grid
              container
              sx={{
                gap: 1,
                "& > .MuiGrid-root": {
                  flexBasis: "calc((100% - 16px) / 3)",
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: palette.grey.card,
                  "& > *": {
                    color: "rgba(255, 255,255, 0.8)",
                  },
                },
              }}
            >
              <Grid>
                <Typography>{t("fullTicket.author")}</Typography>
                <NavLink
                  to={`${endpoints.profile}/${ticket.creator.user_id}`}
                  style={{ color: palette.semantic.info }}
                >
                  @{ticket.creator.login}
                </NavLink>
              </Grid>
              <Grid>
                <Typography>{t("fullTicket.faculty")}</Typography>
                <Box>{ticket.faculty.name}</Box>
              </Grid>
              <Grid>
                <Typography>{t("fullTicket.dateOfCreation")}</Typography>
                <Box>{formatDate(ticket.date)}</Box>
              </Grid>
            </Grid>
          </Grid>
          <ActionPanel />
        </Grid>
      )}
    </Grid>
  );
};

export { FullTicketInfo };

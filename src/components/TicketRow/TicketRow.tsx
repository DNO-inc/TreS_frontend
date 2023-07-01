import { MouseEvent, FC } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, useTheme, Box, Button } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { formatDate, checkStatus } from "../../shared/functions";
import { endpoints } from "../../constants";
import { useCheckScope } from "../../shared/hooks";
import IPalette from "../../theme/IPalette.interface";

interface TicketRowProps {
  ticket: ITicket;
  isAuth: boolean;
}

const TicketRow: FC<TicketRowProps> = ({ ticket, isAuth }) => {
  const { palette }: IPalette = useTheme();

  const navigate = useNavigate();

  const color: string = checkStatus(ticket.status.name);
  const { icon, tooltipText }: { icon: JSX.Element; tooltipText: string } =
    useCheckScope(ticket.queue.scope);
  const formattedDate: string = ticket?.date && formatDate(ticket.date);
  const userId: number | null = ticket.creator?.user_id;

  const handleClick = (event: MouseEvent): void => {
    const { target } = event;

    if (
      target instanceof HTMLElement &&
      target.tagName !== "path" &&
      !target.closest(".evadeItem")
    ) {
      isAuth && navigate(`${endpoints.fullTicket}/${ticket.ticket_id}`);
    }
  };

  return (
    <Grid
      container
      sx={{
        gap: 1,
        flexBasis: "100%",
        flexWrap: "no-wrap",
        width: { xs: "100%" },
        height: 56,
        "& > div, button": {
          bgcolor: palette.grey.card,
          border: `2px solid ${palette.grey.border}`,
          borderRadius: 1,
          overflow: "hidden",
        },
        "& > .MuiGrid-root > .MuiBox-root": {
          p: 2,
        },
      }}
    >
      <Grid
        sx={{
          width: "calc(100% - 40px)",
          height: "100%",
          cursor: isAuth ? "pointer" : "default",
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            gap: 2,
            borderLeft: `8px solid ${color}`,
          }}
        >
          <Box>action</Box>
          <Box>{ticket.subject}</Box>
          <Box>{ticket.body.slice(0, 10)}</Box>
          <Box>action</Box>
          <Box>action</Box>
        </Box>
      </Grid>

      <Button
        color="inherit"
        sx={{
          color: palette.common.white,
          p: 0,
          minWidth: 32,
        }}
      >
        <MoreVertIcon />
      </Button>
    </Grid>
  );
};

export { TicketRow };

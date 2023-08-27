import { ForwardRefExoticComponent, RefAttributes, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { endpoints } from "../../constants";
import { useFormatDate } from "../../shared/hooks";
import IPalette from "../../theme/IPalette.interface";
import { ITicket } from "./ticket.interface";
import { Badge } from "../Badge";

interface SimpleTicketProps {
  ticket: ITicket;
}

const SimpleTicket: ForwardRefExoticComponent<
  Omit<SimpleTicketProps, "ref"> & RefAttributes<HTMLDivElement>
> = forwardRef(({ ticket }, ref) => {
  const { palette }: IPalette = useTheme();
  const navigate = useNavigate();

  const formattedDate: string = ticket?.date && useFormatDate(ticket.date);

  const handleClick = (): void => {
    navigate(`${endpoints.fullTicket}/${ticket.ticket_id}`);
  };

  return (
    <Grid
      ref={ref}
      container
      sx={{
        position: "relative",
        flexDirection: "column",
        height: 200,
        minWidth: 415,
        gap: 2,
        p: 2,
        mr: 1,
        bgcolor: palette.grey.divider,
        borderRadius: 1,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            maxWidth: "70%",
          }}
        >
          <Typography
            component={"h2"}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {ticket.subject}
          </Typography>
        </Box>
        <Badge
          text={ticket.queue.name}
          customStyle={{ bgcolor: "#fff", color: "#000", fontWeight: 500 }}
        />
      </Box>
      <Box
        sx={{
          height: 88,
          overflowY: "hidden",
          whiteSpace: "pre-line",
          "&::after": {
            content: `""`,
            position: "absolute",
            bottom: 56,
            left: 0,
            width: "100%",
            height: "48px",
            background: `linear-gradient(transparent, ${palette.grey.divider})`,
          },
        }}
      >
        <Typography sx={{ color: palette.whiteAlpha.text }}>
          {ticket.body}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ color: palette.whiteAlpha.default }}>
          {ticket.faculty.name}
        </Typography>
        <Typography sx={{ color: palette.whiteAlpha.default }}>
          {formattedDate}
        </Typography>
      </Box>
    </Grid>
  );
});

export { SimpleTicket };

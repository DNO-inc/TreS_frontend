import { ForwardRefExoticComponent, RefAttributes, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

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
    navigate(`${endpoints.FULL_TICKET}/${ticket.ticket_id}`);
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: "inline-flex",
        position: "relative",
        flexDirection: "column",
        height: 200,
        width: "97%",
        gap: 2,
        p: 2,
        bgcolor: palette.grey.divider,
        borderRadius: 1,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            maxWidth: "50%",
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
        {ticket?.queue?.name && (
          <Badge
            text={ticket.queue.name}
            customStyle={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: 500,
            }}
          />
        )}
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
            height: "48px",
            width: "100%",
            background: `linear-gradient(transparent, ${palette.grey.divider})`,
          },
        }}
      >
        <Typography
          sx={{
            color: palette.whiteAlpha.text,

            overflowWrap: "break-word",
          }}
        >
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
    </Box>
  );
});

export { SimpleTicket };

import { MouseEvent, FC, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { TicketActions } from "./components/TicketActions";
import { AdditionalInfo } from "./components/AdditionalInfo";
import { DeletionActions } from "./components/DeletionActions";

import { dimensions, endpoints } from "constants";
import { useCheckScope } from "hooks/index";
import IPalette from "theme/IPalette.interface";
import { ITicket } from "./ticket.interface";
import { useStyles } from "./styles/useStyles";

interface TicketRowProps {
  ticket: ITicket;
  additionalAction?: string;
  isHaveBookmarks?: boolean;
  handleDelete: ((ticketId: number[]) => void) | null;
  handleRestore: ((ticketId: number) => void) | null;
  setDeletedList: Dispatch<SetStateAction<number[]>> | null;
}

const TicketRow: FC<TicketRowProps> = ({
  ticket,
  additionalAction = "",
  isHaveBookmarks = false,
  handleDelete,
  handleRestore,
  setDeletedList,
}) => {
  const { i18n } = useTranslation();
  const { palette }: IPalette = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery(
    `(min-width: ${dimensions.BREAK_POINTS.SIMPLE_TICKET}px)`
  );

  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    ticket.is_bookmarked
  );

  const [ticketRowStyles, gridColumnStyles, tooltipStyles] = useStyles({
    ticketStatus: ticket.status.name,
    isHaveBookmarks,
    matches,
    language: i18n.language,
  });

  const isSent = additionalAction === "sent";
  const isDeleted = additionalAction === "deleted";

  const { icon, tooltipText }: { icon: JSX.Element; tooltipText: string } =
    useCheckScope(ticket.queue?.scope);

  const handleClick = (event: MouseEvent): void => {
    const { target } = event;

    if (
      target instanceof HTMLElement &&
      target.tagName !== "path" &&
      !target.closest(".evadeItem")
    ) {
      navigate(`${endpoints.FULL_TICKET}/${ticket.ticket_id}`);
    }
  };

  return (
    <Grid container sx={ticketRowStyles}>
      <Grid
        sx={{
          width: `calc(100% ${isSent || isDeleted ? "- 40px" : ""} )`,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Box sx={gridColumnStyles}>
          {matches ? (
            <>
              <TicketActions
                isCheckboxVisible={isSent}
                isHaveBookmarks={isHaveBookmarks}
                setDeletedList={setDeletedList}
                ticketId={ticket.ticket_id}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
              />
              <Box>
                <Typography component={"p"}>{ticket.subject}</Typography>
              </Box>
              <Box>
                <Typography
                  component={"p"}
                  sx={{ color: palette.whiteAlpha.text }}
                >
                  {ticket.body}
                </Typography>
              </Box>
              <Tooltip title={tooltipText} arrow>
                <Box sx={tooltipStyles}>{icon}</Box>
              </Tooltip>
              <AdditionalInfo
                facultyName={ticket.faculty.name}
                dateOfCreation={ticket.date}
                matches={matches}
              />
            </>
          ) : (
            <>
              <Box
                sx={{
                  pl: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: isSent || isBookmarked ? 1 : 0,
                  }}
                >
                  <TicketActions
                    isCheckboxVisible={isSent}
                    isHaveBookmarks={isHaveBookmarks}
                    setDeletedList={setDeletedList}
                    ticketId={ticket.ticket_id}
                    isBookmarked={isBookmarked}
                    setIsBookmarked={setIsBookmarked}
                  />
                  <Box
                    sx={{
                      width: `calc(80vw - ${
                        isSent || isDeleted ? "148px" : "48px"
                      })`,
                    }}
                  >
                    <Typography
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      component={"p"}
                    >
                      {ticket.subject}
                    </Typography>
                  </Box>
                </Box>
                <Tooltip title={tooltipText} arrow>
                  <Box sx={tooltipStyles}>{icon}</Box>
                </Tooltip>
              </Box>
              <AdditionalInfo
                facultyName={ticket.faculty.name}
                dateOfCreation={ticket.date}
                matches={matches}
              />
            </>
          )}
        </Box>
      </Grid>
      <DeletionActions
        isSent={isSent}
        isDeleted={isDeleted}
        handleDelete={handleDelete}
        handleRestore={handleRestore}
        ticketId={ticket.ticket_id}
      />
    </Grid>
  );
};

export { TicketRow };

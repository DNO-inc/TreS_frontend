import { MouseEvent, FC, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import { checkStatus } from "../../shared/functions";
import { endpoints } from "../../constants";
import { useCheckScope, useFormatDate } from "../../shared/hooks";
import IPalette from "../../theme/IPalette.interface";
import { ITicket } from "./ticket.interface";
import { useToggleBookmarkMutation } from "../../store/api/tickets.api";
import { useMediaQuery } from "@mui/material";

interface TicketRowProps {
  ticket: ITicket;
  lang: string;
  additionalAction?: string;
  isHaveBookmarks?: boolean;
  handleDelete: ((ticketId: number[]) => void) | null;
  handleRestore: ((ticketId: number) => void) | null;
  setDeletedList: Dispatch<SetStateAction<number[]>> | null;
}

const TicketRow: FC<TicketRowProps> = ({
  ticket,
  lang,
  additionalAction = "",
  isHaveBookmarks = false,
  handleDelete,
  handleRestore,
  setDeletedList,
}) => {
  const { palette }: IPalette = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 750px)");

  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    ticket.is_bookmarked
  );

  const [toggleBookmark] = useToggleBookmarkMutation();

  const isSent = additionalAction === "sent";
  const isDeleted = additionalAction === "deleted";

  const color: string = checkStatus(ticket.status.name);
  const { icon, tooltipText }: { icon: JSX.Element; tooltipText: string } =
    useCheckScope(ticket.queue?.scope);
  const formattedDate: string = ticket?.date && useFormatDate(ticket.date);

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

  const handleToggleBookmark = (): void => {
    const option = !isBookmarked ? "bookmark" : "unbookmark";

    toggleBookmark({
      option: option,
      body: JSON.stringify({ ticket_id: ticket.ticket_id }),
    });

    setIsBookmarked((prevIsBookmarked: boolean) => !prevIsBookmarked);
  };

  const handleSetDeleted = () => {
    if (setDeletedList) {
      setDeletedList(prevState => {
        let newDeletedList = [...prevState];

        if (newDeletedList.includes(ticket.ticket_id)) {
          newDeletedList = newDeletedList.filter(id => id !== ticket.ticket_id);
        } else {
          newDeletedList.push(ticket.ticket_id);
        }

        return newDeletedList;
      });
    }
  };

  return (
    <Grid
      container
      sx={{
        gap: 1,
        flexWrap: "no-wrap",
        "& > div, button": {
          bgcolor:
            ticket.status.name.toLowerCase() === "new"
              ? palette.grey.divider
              : palette.grey.card,
          border: `2px solid ${palette.grey.border}`,
          overflow: "hidden",
        },
        "& > .MuiGrid-root > .MuiBox-root": {
          p: isHaveBookmarks ? "16px" : "16px 16px 16px 8px",
        },
      }}
    >
      <Grid
        sx={{
          width: `calc(100% ${isSent || isDeleted ? "- 40px" : ""} )`,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: matches ? "grid" : "flex",
            flexDirection: "column",
            alignItems: "center",
            gridTemplateColumns:
              lang === "en"
                ? `${
                    isHaveBookmarks ? "48px" : "0px"
                  } minmax(30px, 1fr) minmax(40px, 3fr) 24px 45px 102px`
                : `${
                    isHaveBookmarks ? "48px" : "0px"
                  } minmax(30px, 0.8fr) minmax(40px, 3fr) 24px 45px 118px`,
            gap: 2,
            borderLeft: `8px solid ${color}`,
            "& .MuiTypography-root": {
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          }}
        >
          {matches ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {isSent && (
                  <Checkbox
                    onClick={handleSetDeleted}
                    color="default"
                    className="evadeItem"
                    sx={{
                      width: 32,
                      height: 32,
                      m: "-6px",
                      "& > .MuiSvgIcon-root": { fontSize: "20px" },
                      p: 0,
                      color: palette.common.white,
                    }}
                  />
                )}
                {isHaveBookmarks && (
                  <IconButton
                    onClick={handleToggleBookmark}
                    className="evadeItem"
                    sx={{
                      width: 32,
                      height: 32,
                      m: "-6px",
                      p: 0,
                      border: "none !important",
                      "& > .MuiSvgIcon-root": { fontSize: "20px" },
                    }}
                  >
                    {isBookmarked ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderOutlinedIcon />
                    )}
                  </IconButton>
                )}
              </Box>
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    bgcolor: palette.grey.active,
                    borderRadius: 1,
                    "& > .MuiSvgIcon-root": {
                      fontSize: 16,
                    },
                  }}
                >
                  {icon}
                </Box>
              </Tooltip>
              <Typography
                component={"p"}
                sx={{ color: palette.whiteAlpha.default }}
              >
                {ticket.faculty.name}
              </Typography>
              <Typography
                component={"p"}
                sx={{ color: palette.whiteAlpha.default }}
              >
                {formattedDate}
              </Typography>
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {isSent && (
                      <Checkbox
                        onClick={handleSetDeleted}
                        color="default"
                        className="evadeItem"
                        sx={{
                          width: 32,
                          height: 32,
                          m: "-6px",
                          "& > .MuiSvgIcon-root": { fontSize: "20px" },
                          p: 0,
                          color: palette.common.white,
                        }}
                      />
                    )}
                    {isHaveBookmarks && (
                      <IconButton
                        onClick={handleToggleBookmark}
                        className="evadeItem"
                        sx={{
                          width: 32,
                          height: 32,
                          m: "-6px",
                          p: 0,
                          border: "none !important",
                          "& > .MuiSvgIcon-root": { fontSize: "20px" },
                        }}
                      >
                        {isBookmarked ? (
                          <BookmarkIcon />
                        ) : (
                          <BookmarkBorderOutlinedIcon />
                        )}
                      </IconButton>
                    )}
                  </Box>
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      bgcolor: palette.grey.active,
                      borderRadius: 1,
                      "& > .MuiSvgIcon-root": {
                        fontSize: 16,
                      },
                    }}
                  >
                    {icon}
                  </Box>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  pl: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component={"p"}
                  sx={{ color: palette.whiteAlpha.default }}
                >
                  {ticket.faculty.name}
                </Typography>
                <Typography
                  component={"p"}
                  sx={{ color: palette.whiteAlpha.default }}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Grid>
      {isSent && (
        <Button
          color="inherit"
          onClick={() => handleDelete && handleDelete([ticket.ticket_id])}
          sx={{
            color: palette.common.white,
            p: 0,
            minWidth: 32,
          }}
        >
          <DeleteForeverIcon />
        </Button>
      )}
      {isDeleted && (
        <Button
          color="inherit"
          onClick={() => handleRestore && handleRestore(ticket.ticket_id)}
          sx={{
            color: palette.common.white,
            p: 0,
            minWidth: 32,
          }}
        >
          <RestoreFromTrashIcon />
        </Button>
      )}
    </Grid>
  );
};

export { TicketRow };

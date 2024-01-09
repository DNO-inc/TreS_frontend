import useTheme from "@mui/material/styles/useTheme";
import IPalette from "../../../theme/IPalette.interface";

import { checkStatus } from "../../../shared/functions";
import { statuses } from "../../../constants";

interface StyleProps {
  ticketStatus: string;
  isHaveBookmarks: boolean;
  matches: boolean;
  language: string;
}

const useStyles = ({
  ticketStatus,
  isHaveBookmarks,
  matches,
  language,
}: StyleProps) => {
  const { palette }: IPalette = useTheme();

  const color: string = checkStatus(ticketStatus);

  const ticketRowStyles = {
    gap: 1,
    flexWrap: "no-wrap",
    "& > div, button": {
      bgcolor:
        ticketStatus === statuses.NEW
          ? palette.grey.divider
          : palette.grey.card,
      border: `2px solid ${palette.grey.border}`,
      overflow: "hidden",
    },
    "& > .MuiGrid-root > .MuiBox-root": {
      p: isHaveBookmarks ? "16px" : "16px 16px 16px 8px",
    },
  };

  const gridColumnStyles = {
    display: matches ? "grid" : "flex",
    flexDirection: "column",
    alignItems: "center",
    gridTemplateColumns:
      language === "en"
        ? `${
            isHaveBookmarks ? "48px" : "0px"
          } minmax(30px, 1fr) minmax(40px, 3fr) 25px 45px 100px`
        : `${
            isHaveBookmarks ? "48px" : "0px"
          } minmax(30px, 0.9fr) minmax(40px, 3fr) 25px 45px 115px`,
    gap: 2,
    borderLeft: `8px solid ${color}`,
    "& .MuiTypography-root": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  };

  const tooltipStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    bgcolor: palette.grey.active,
    borderRadius: 1,
    ".MuiSvgIcon-root": {
      fontSize: 16,
    },
  };

  return [ticketRowStyles, gridColumnStyles, tooltipStyles];
};

export { useStyles };

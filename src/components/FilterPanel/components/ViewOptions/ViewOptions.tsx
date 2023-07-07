import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";

import { VerticalDivider } from "../../../VerticalDivider";

import IPalette from "../../../../theme/IPalette.interface";

interface ViewOptionsProps {
  ticketsPerRow: number;
}

const ViewOptions: FC<ViewOptionsProps> = ({ ticketsPerRow }) => {
  const { palette }: IPalette = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (countPerRow: number): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.has("ticket_per_row")) {
      params.set("ticket_per_row", countPerRow.toString());
    } else {
      params.append("ticket_per_row", countPerRow.toString());
    }

    if (params.has("current_page")) {
      params.set("current_page", "1");
    } else {
      params.append("current_page", "1");
    }

    setSearchParams(params);
  };

  return (
    <Grid container sx={{ alignItems: "center", gap: 1 }}>
      <Button
        onClick={() => handleClick(2)}
        sx={{ transform: "rotate(90deg)" }}
      >
        {ticketsPerRow === 2 ? (
          <ViewAgendaIcon />
        ) : (
          <ViewAgendaOutlinedIcon sx={{ color: palette.grey.checkbox }} />
        )}
      </Button>
      <VerticalDivider />
      <Button onClick={() => handleClick(3)}>
        {ticketsPerRow === 3 ? (
          <ViewWeekIcon />
        ) : (
          <ViewWeekOutlinedIcon sx={{ color: palette.grey.checkbox }} />
        )}
      </Button>
    </Grid>
  );
};

export { ViewOptions };

import { FC } from "react";

import { Box, Grid } from "@mui/material";

import { FacultiesFilter } from "./components/FacultiesFilter";
import { StatusCheckboxGroup } from "./components/StatusCheckboxGroup";
import { ViewOptions } from "./components/ViewOptions";

interface FilterPanelProps {
  ticketsPerRow?: number;
  isOneColumn?: boolean;
  isAllStatuses?: boolean;
}

const FilterPanel: FC<FilterPanelProps> = ({
  ticketsPerRow = 1,
  isOneColumn = true,
  isAllStatuses = false,
}) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <StatusCheckboxGroup isAllStatuses={isAllStatuses} />
      <Grid
        item
        sx={{
          display: "flex",

          "& > .MuiGrid-root > .MuiButton-root": { minWidth: 20 },
          gap: 3,
        }}
      >
        {!isOneColumn && <ViewOptions ticketsPerRow={ticketsPerRow} />}
        <Box>
          <FacultiesFilter />
        </Box>
      </Grid>
    </Grid>
  );
};

export { FilterPanel };

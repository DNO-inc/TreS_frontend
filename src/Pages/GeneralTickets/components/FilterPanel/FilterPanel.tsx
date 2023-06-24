import { FC } from "react";

import { Box, Grid } from "@mui/material";

import { FacultiesFilter } from "./components/FacultiesFilter";
import { StatusCheckboxGroup } from "./components/StatusCheckboxGroup";
import { ViewOptions } from "./components/ViewOptions";

interface FilterPanelProps {
  ticketsPerRow: number;
}

const FilterPanel: FC<FilterPanelProps> = ({ ticketsPerRow }) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={3}
    >
      <StatusCheckboxGroup />
      <Grid
        item
        sx={{
          display: "flex",

          "& > .MuiGrid-root > .MuiButton-root": { minWidth: 20 },
          gap: 3,
        }}
      >
        <ViewOptions ticketsPerRow={ticketsPerRow} />
        <Box>
          <FacultiesFilter />
        </Box>
      </Grid>
    </Grid>
  );
};

export { FilterPanel };

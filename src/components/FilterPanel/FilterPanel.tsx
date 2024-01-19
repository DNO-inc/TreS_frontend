import { FC, memo } from "react";

import Grid from "@mui/material/Grid";

import { FacultiesFilter } from "./components/FacultiesFilter";
import { StatusCheckboxGroup } from "./components/StatusCheckboxGroup";

interface FilterPanelProps {
  isAllStatuses?: boolean;
}

const FilterPanel: FC<FilterPanelProps> = memo(({ isAllStatuses = false }) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
        gap: 2,
      }}
    >
      <StatusCheckboxGroup isAllStatuses={isAllStatuses} />
      <FacultiesFilter />
    </Grid>
  );
});

export { FilterPanel };

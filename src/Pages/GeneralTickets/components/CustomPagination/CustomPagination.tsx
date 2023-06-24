import { FC } from "react";

import { Grid, Pagination, useTheme } from "@mui/material";

import IPalette from "../../../../theme/IPalette.interface";

interface CustomPaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const CustomPagination: FC<CustomPaginationProps> = ({
  total,
  current,
  onChange,
}) => {
  const { palette }: IPalette = useTheme();

  return (
    <Grid container justifyContent={"center"} mt={3}>
      <Pagination
        count={total}
        page={current}
        size="large"
        color="primary"
        defaultPage={1}
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        onChange={(event, value) => onChange(value)}
        sx={{
          "& > .MuiPagination-ul > li > .MuiPaginationItem-root": {
            border: `2px solid ${palette.grey.divider}`,
          },
        }}
      />
    </Grid>
  );
};

export { CustomPagination };

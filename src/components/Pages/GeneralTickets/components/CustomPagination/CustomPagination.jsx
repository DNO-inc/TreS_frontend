import { Grid, Pagination } from "@mui/material";

const CustomPagination = ({ total, current, onChange }) => {
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
        onChange={(e, value) => onChange(value)}
      />
    </Grid>
  );
};

CustomPagination.propTypes = {};

export { CustomPagination };

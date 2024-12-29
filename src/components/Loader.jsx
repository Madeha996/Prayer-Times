import { CircularProgress, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <CircularProgress size={"70px"} color="secondary" />
    </Grid>
  );
};

export default Loader;

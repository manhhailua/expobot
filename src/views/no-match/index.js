import { Button, Divider, Grid, Typography } from "@mui/material";
import CardWrapper from "ui-component/CardWrapper";
import FullWidthWrapper from "ui-component/FullWidthWrapper";

const NoMatchPage = () => (
  <FullWidthWrapper>
    <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: "100vh" }}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "calc(100vh - 68px)" }}>
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <CardWrapper>
              <Typography variant={"h1"}>404</Typography>
              <Typography
                variant={"caption"}
                fontSize="14px"
              >Oops! The page you are looking for does not exist.</Typography>
              <Divider sx={{ margin: "20px" }} />
              <Grid container justifyContent="center" alignItems="center">
                <Button href="/">Back to dashboard</Button>
              </Grid>
            </CardWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </FullWidthWrapper>
);

export default NoMatchPage;

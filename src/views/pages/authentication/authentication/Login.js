import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import CardWrapper from "ui-component/CardWrapper";
import AuthLogin from "../auth-forms/AuthLogin";
import Logo from "ui-component/Logo";
import FullWidthWrapper from "ui-component/FullWidthWrapper";

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <FullWidthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: "100vh" }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "calc(100vh - 68px)" }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <CardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Choose a preferred method to sign in to your account
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>
              </CardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FullWidthWrapper>
  );
};

export default Login;

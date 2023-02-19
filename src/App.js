import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Alert, CssBaseline, Snackbar, StyledEngineProvider } from "@mui/material";
import Routes from "routes";
import themes from "themes";
import NavigationScroll from "layout/NavigationScroll";
import { useEffect, useState } from "react";
import { openAI } from "utils/axios";

const App = () => {
  const customization = useSelector((state) => state.customization);
  const apiKey = useSelector((state) => state.user?.openAI?.apiKey);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    openAI.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${apiKey}`;
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    openAI.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      setError(error);
      setOpen(true);
      return Promise.reject(error);
    });
  }, [apiKey]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              {error?.message}
            </Alert>
          </Snackbar>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Routes from "routes";
import themes from "themes";
import NavigationScroll from "layout/NavigationScroll";
import { useEffect } from "react";
import { openAI } from "utils/axios";

const App = () => {
  const customization = useSelector((state) => state.customization);
  const apiKey = useSelector((state) => state.user?.openAI?.apiKey);

  useEffect(() => {
    openAI.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${apiKey}`;
      return config;
    });
  }, [apiKey]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

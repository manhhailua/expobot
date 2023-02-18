import { useRoutes } from "react-router-dom";

import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import NoMatchRoutes from "./NoMatch";

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthRoutes, NoMatchRoutes]);
}

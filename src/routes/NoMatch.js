import { lazy } from "react";
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";

const NoMatchPage = Loadable(lazy(() => import("views/no-match")));

const NoMatchRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "*",
      element: <NoMatchPage />
    }
  ]
};

export default NoMatchRoutes;

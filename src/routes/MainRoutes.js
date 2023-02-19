import { lazy } from "react";

import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

const DashboardDefault = Loadable(lazy(() => import("views/dashboard/Default")));
const FilesPage = Loadable(lazy(() => import("views/files")));
const FineTunesPage = Loadable(lazy(() => import("views/fine-tunes")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />
    },
    {
      path: "dashboard",
      element: <DashboardDefault />
    },
    {
      path: "files",
      element: <FilesPage />
    },
    {
      path: "fine-tunes",
      element: <FineTunesPage />
    }
  ]
};

export default MainRoutes;

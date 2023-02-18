import { lazy } from "react";
import Loadable from "ui-component/Loadable";
import UnAuthLayout from "layout/UnAuthLayout";

const AuthLogin = Loadable(lazy(() => import("views/pages/authentication/authentication/Login")));

const AuthRoutes = {
  path: "/",
  element: <UnAuthLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin />
    }
  ]
};

export default AuthRoutes;

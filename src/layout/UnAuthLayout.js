import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "utils/firebase";
import Loader from "ui-component/Loader";
import { useDispatch } from "react-redux";

const UnAuthLayout = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch.user.setFirebaseProfile(user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [dispatch.user]);

  if (isLoggedIn !== null) {
    return <Outlet />;
  }

  return <Loader />;
};

export default UnAuthLayout;

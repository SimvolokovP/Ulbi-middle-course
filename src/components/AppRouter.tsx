import { Route, Routes, useNavigate } from "react-router-dom";
import { publicRoutes, RouteNames } from "../router";
import { privateRoutes } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useEffect } from "react";

const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth) {
      navigate(RouteNames.LOGIN);
    } else {
      navigate(RouteNames.EVENT);
    }
  }, [isAuth, navigate]);

  return (
    <Routes>
      {isAuth ? (
        <>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              index={route.exact}
            />
          ))}
        </>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
              index={route.exact}
            />
          ))}
        </>
      )}
    </Routes>
  );
};

export default AppRouter;

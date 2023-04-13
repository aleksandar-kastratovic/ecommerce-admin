import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Error404 from "../pages/Error/Error404";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AuthContext from "../store/auth-contex";
import { availableScreens } from "./routes";
import { makeRoute } from "./utils";

/**
 * The main application router that takes the configuration from routes.js.
 *
 * @return {JSX.Element}
 * @constructor
 */
const ApplicationRouter = () => {
  const authContext: { isLoggedIn: boolean, userScreens: [{ screen_code: string }] } = useContext(AuthContext);

  // Get the default screen for the user
  const defaultPath = availableScreens[authContext.userScreens?.find((userScreen) => availableScreens[userScreen.screen_code])?.screen_code]?.path ?? "/login";

  // Unauthorized users
  const unauthorizedRoutes = (
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />}>
        <Route path=":token" element={<ResetPasswordPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/login" />} />
    </>
  );

  // Authorized users
  const authorizedRoutes = (
    <>
      <Route key="" path="" exact element={<Navigate replace to={defaultPath} />} />
      <Route key="/" path="/" exact element={<Navigate replace to={defaultPath} />} />
      {authContext.userScreens?.map((userScreen) => makeRoute(availableScreens[userScreen.screen_code]))}
    </>
  );

  return (
    <Routes>
      {authContext?.isLoggedIn ? authorizedRoutes : unauthorizedRoutes}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default ApplicationRouter;

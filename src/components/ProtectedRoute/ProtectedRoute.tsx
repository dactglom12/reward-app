import * as React from "react";
import { WithReactChildren } from "@typings/shared";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "@routes/constants";
import { AuthenticationContext } from "@contexts/AuthenticationContext";
import { AuthApi } from "@api/authApi";
import { UserBalanceContext } from "@contexts/UserBalanceContext";

interface ProtectedRouteProps extends WithReactChildren {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {
    isAuthenticated,
    authenticate,
    disauthenticate,
    finishLoading,
    startLoading,
    isAuthCheckLoading,
  } = React.useContext(AuthenticationContext);
  const { getUserBalance } = React.useContext(UserBalanceContext);

  React.useEffect(() => {
    startLoading();

    AuthApi.checkAuthentication()
      .then(() => {
        authenticate();
        getUserBalance();
      })
      .catch((err) => {
        console.log(err);
        disauthenticate();
      })
      .finally(() => {
        finishLoading();
      });
  }, [
    authenticate,
    disauthenticate,
    startLoading,
    finishLoading,
    getUserBalance,
  ]);

  if (isAuthCheckLoading) {
    return null;
  }

  if (!isAuthenticated) return <Navigate to={RoutePaths.LOGIN} replace />;

  // TODO: remove any and fix typescript error below
  return children as any;
};

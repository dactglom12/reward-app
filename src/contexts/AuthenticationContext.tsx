import { AuthApi } from "@api/authApi";
import { WithReactChildren } from "@typings/shared";
import * as React from "react";
import { UserBalanceContext } from "./UserBalanceContext";

interface AuthenticationContextValue {
  isAuthenticated: boolean;
  authenticate: () => void;
  disauthenticate: () => void;
  isAuthCheckLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
  logout: () => void;
}

interface AuthenticationProviderProps extends WithReactChildren {
  children: React.ReactNode;
}

export const AuthenticationContext = React.createContext({
  isAuthenticated: false,
} as AuthenticationContextValue);

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthCheckLoading, setIsAuthCheckLoading] = React.useState(true);
  const { getUserBalance } = React.useContext(UserBalanceContext);

  const authenticate = React.useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const disauthenticate = React.useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const startLoading = React.useCallback(() => {
    setIsAuthCheckLoading(true);
  }, []);

  const finishLoading = React.useCallback(() => {
    setIsAuthCheckLoading(false);
  }, []);

  const logout = React.useCallback(() => {
    AuthApi.logout().then(() => {
      disauthenticate();
    });
  }, [disauthenticate]);

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

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      authenticate,
      disauthenticate,
      startLoading,
      finishLoading,
      isAuthCheckLoading,
      logout,
    }),
    [
      isAuthenticated,
      authenticate,
      disauthenticate,
      startLoading,
      finishLoading,
      isAuthCheckLoading,
      logout,
    ]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

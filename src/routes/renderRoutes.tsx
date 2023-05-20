import { ProtectedRoute } from "@components/ProtectedRoute";
import * as React from "react";
import { Route, Routes } from "react-router-dom";

export interface RouteConfig {
  path: string;
  exact?: boolean;
  isProtected?: boolean;
  component: React.ComponentType<any>;
  menuTitle?: string;
  Icon?: React.ComponentType;
}

const renderRoutes = (
  routes: RouteConfig[],
  wrapper?: React.ComponentType<any>
): JSX.Element => {
  const Wrapper = wrapper || React.Fragment;
  return (
    <Wrapper>
      <Routes>
        {routes.map((route, i) => {
          const { path, isProtected = false, component: Component } = route;

          const ProtectionWrapper = isProtected
            ? ProtectedRoute
            : React.Fragment;

          return (
            <Route
              path={path}
              element={
                <ProtectionWrapper>
                  <Component />
                </ProtectionWrapper>
              }
              key={`route-${i}`}
            />
          );
        })}
      </Routes>
    </Wrapper>
  );
};

export { renderRoutes };

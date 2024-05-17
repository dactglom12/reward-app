import { ProtectedRoute } from "@components/ProtectedRoute";
import * as React from "react";
import { Route } from "react-router-dom";

export interface RouteConfig {
  path: string;
  exact?: boolean;
  isProtected?: boolean;
  component: React.ComponentType<any>;
  menuTitle?: string;
  Icon?: React.ComponentType;
  groupId?: string;
}

const renderRoutes = (
  routes: RouteConfig[],
  wrapper?: React.ComponentType<any>
) => {
  const Wrapper = wrapper || React.Fragment;

  return routes.map((route, i) => {
    const { path, isProtected = false, component: Component } = route;

    const ProtectionWrapper = isProtected ? ProtectedRoute : React.Fragment;

    return (
      <Route
        path={path}
        element={
          <ProtectionWrapper>
            <Wrapper>
              <Component />
            </Wrapper>
          </ProtectionWrapper>
        }
        key={`route-${i}`}
      />
    );
  });
};

export { renderRoutes };

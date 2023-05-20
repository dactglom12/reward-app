import React from "react";
import { renderRoutes } from "@routes/index";
import { BrowserRouter } from "react-router-dom";
import { RegularLayout } from "@components/Layouts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EventManagerProvider } from "@contexts/EventManagerContext";
import { routes } from "@routes/constants";
import { AuthenticationProvider } from "@contexts/AuthenticationContext";
import { UserBalanceProvider } from "@contexts/UserBalanceContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <UserBalanceProvider>
          <AuthenticationProvider>
            <EventManagerProvider>
              {renderRoutes(routes, RegularLayout)}
            </EventManagerProvider>
          </AuthenticationProvider>
        </UserBalanceProvider>
      </DndProvider>
    </BrowserRouter>
  );
};

export default App;

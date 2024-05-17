import React from "react";
import { renderRoutes } from "@routes/index";
import { BrowserRouter, Routes } from "react-router-dom";
import { RegularLayout } from "@components/Layouts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EventManagerProvider } from "@contexts/EventManagerContext";
import {
  notFoundPageRoute,
  publicRoutes,
  regularLayoutRoutes,
} from "@routes/constants";
import { AuthenticationProvider } from "@contexts/AuthenticationContext";
import { UserBalanceProvider } from "@contexts/UserBalanceContext";
import { ThemeProvider, createTheme } from "@mui/material";
import { PublicPagesLayout } from "@components/Layouts/PublicPagesLayout";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <UserBalanceProvider>
            <AuthenticationProvider>
              <EventManagerProvider>
                <Routes>
                  {renderRoutes(regularLayoutRoutes, RegularLayout)}
                  {renderRoutes(publicRoutes, PublicPagesLayout)}
                  {renderRoutes([notFoundPageRoute], PublicPagesLayout)}
                </Routes>
              </EventManagerProvider>
            </AuthenticationProvider>
          </UserBalanceProvider>
        </DndProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

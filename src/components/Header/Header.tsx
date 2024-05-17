import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";
import { Sidebar } from "@components/Sidebar";
import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "@contexts/AuthenticationContext";
import { RoutePaths } from "@routes/constants";
import { UserBalance } from "./UserBalance";
import { UserBalanceContext } from "@contexts/UserBalanceContext";

export const Header: React.FC = () => {
  const { isOpen, handleClose, handleOpen } = useOpenCloseToggle();
  const { isAuthenticated, isAuthCheckLoading, logout } = React.useContext(
    AuthenticationContext
  );
  const { balance } = React.useContext(UserBalanceContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const renderControls = () => {
    if (isAuthCheckLoading) return null;

    if (isAuthenticated) {
      return (
        <>
          <UserBalance balance={balance} />
          <Button
            onClick={logout}
            variant="contained"
            color="primary"
            style={{ marginLeft: theme.spacing(1) }}
          >
            Log Out
          </Button>
          <IconButton
            color="inherit"
            aria-label="search"
            style={{ marginLeft: theme.spacing(1) }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="account"
            style={{ marginLeft: theme.spacing(1) }}
          >
            <AccountCircle />
          </IconButton>
        </>
      );
    }

    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(RoutePaths.LOGIN)}
          style={{ marginRight: "10px" }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(RoutePaths.SIGN_UP)}
        >
          Sign Up
        </Button>
      </>
    );
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            onClick={handleOpen}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            My App
          </Typography>

          {renderControls()}
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

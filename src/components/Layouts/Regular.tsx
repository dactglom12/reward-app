import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Sidebar } from "@components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { useOpenCloseToggle } from "@hooks/useOpenCloseToggle";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const ContentContainer = styled(Box)(({ theme }) => ({
  width: "calc(100% - 280px)",
  padding: theme.spacing(4),
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    width: "100%",
  },
}));

export const RegularLayout: React.FC<Props> = ({ children }) => {
  const { spacing, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const {
    isOpen: isSidebarOpen,
    handleOpen,
    handleClose,
  } = useOpenCloseToggle(isMobile ? false : true);
  const location = useLocation();

  useEffect(() => {
    if (isMobile) handleClose();
  }, [location, handleClose, isMobile]);

  useEffect(() => {
    if (isSidebarOpen || isMobile) return;

    handleOpen();
  }, [isSidebarOpen, isMobile, handleOpen]);

  return (
    <Container sx={{ position: "relative" }}>
      {isMobile && (
        <IconButton
          sx={{ position: "absolute", right: spacing(1), top: spacing(1) }}
          onClick={handleOpen}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={handleClose} />
      <ContentContainer>
        {isMobile && <Box sx={{ height: spacing(4), width: "100%" }} />}
        {children}
      </ContentContainer>
    </Container>
  );
};

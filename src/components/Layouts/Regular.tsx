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

interface Props {
  children: React.ReactNode;
}

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const ContentContainer = styled(Box, {
  shouldForwardProp: (propName) => propName !== "isSidebarOpen",
})<{ isSidebarOpen: boolean }>(({ theme, isSidebarOpen }) => ({
  width: isSidebarOpen ? "calc(100% - 280px)" : "100%",
  padding: theme.spacing(4),
  boxSizing: "border-box",
}));

export const RegularLayout: React.FC<Props> = ({ children }) => {
  const { spacing, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));
  const {
    isOpen: isSidebarOpen,
    handleOpen,
    handleClose,
  } = useOpenCloseToggle(isMobile ? false : true);

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
      <ContentContainer isSidebarOpen={isSidebarOpen}>
        {isMobile && <Box sx={{ height: spacing(2), width: "100%" }} />}
        {children}
      </ContentContainer>
    </Container>
  );
};

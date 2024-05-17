import React from "react";
import { Box, styled } from "@mui/material";
import { Sidebar } from "@components/Sidebar";

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
}));

export const RegularLayout: React.FC<Props> = ({ children }) => (
  <Container>
    <Sidebar isOpen onClose={() => null} />
    <ContentContainer>{children}</ContentContainer>
  </Container>
);

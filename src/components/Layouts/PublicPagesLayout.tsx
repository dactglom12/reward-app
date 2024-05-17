import { styled } from "@mui/material";
import { WithReactChildren } from "@typings/shared";
import { Colors } from "constants/styles";
import React from "react";

interface PublicPagesLayoutInterface extends WithReactChildren {}

const Container = styled("div")({
  display: "flex",
  minWidth: "100vw",
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: Colors.AUTH_BACKGROUND_GREY,
});

export const PublicPagesLayout: React.FC<PublicPagesLayoutInterface> = ({
  children,
}) => <Container>{children}</Container>;

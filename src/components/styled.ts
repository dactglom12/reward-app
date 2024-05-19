import { styled } from "@mui/material";

export const Title = styled("p")(({ theme }) => ({
  letterSpacing: "-.025em",
  fontWeight: 800,
  fontSize: "2.4rem",
  fontFamily: theme.typography.fontFamily,
}));
